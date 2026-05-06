import logging

import voluptuous as vol

from homeassistant.config_entries import (
    ConfigEntry, ConfigFlow, ConfigFlowResult, OptionsFlow,
)
from homeassistant.core import callback
from homeassistant.helpers import aiohttp_client
from homeassistant.helpers.selector import (
    SelectSelector, SelectSelectorConfig, SelectSelectorMode,
)

from . import const
from . import mevo_api

LOG = logging.getLogger(__name__)


def _build_schema(stations, current=None):
    options = [
        {
            "value": s["station_id"],
            "label": f"{s.get('name', s['station_id'])}"
            f" — {s.get('address', '')}".strip(" —"),
        }
        for s in sorted(stations, key=lambda s: s.get("name", ""))
    ]
    if current:
        key = vol.Required(const.CONF_STATIONS, default=current)
    else:
        key = vol.Required(const.CONF_STATIONS)
    return vol.Schema({
        key: SelectSelector(
            SelectSelectorConfig(
                options=options,
                multiple=True,
                mode=SelectSelectorMode.DROPDOWN,
            )
        ),
    })


async def _async_fetch_stations(hass):
    session = aiohttp_client.async_get_clientsession(hass)
    api = mevo_api.MevoAPI(session)
    return await api.get_stations()


class MevoConfigFlow(ConfigFlow, domain=const.DOMAIN):
    VERSION = 1

    @staticmethod
    @callback
    def async_get_options_flow(config_entry: ConfigEntry) -> OptionsFlow:
        return MevoOptionsFlow()

    async def async_step_user(self, user_input=None) -> ConfigFlowResult:
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")

        errors: dict[str, str] = {}
        try:
            stations = await _async_fetch_stations(self.hass)
        except mevo_api.MevoApiError:
            LOG.exception("Failed to fetch Mevo stations during config flow")
            errors["base"] = "cannot_connect"
            stations = []

        if user_input is not None and not errors:
            return self.async_create_entry(
                title="Mevo",
                data={const.CONF_STATIONS: user_input[const.CONF_STATIONS]},
            )

        return self.async_show_form(
            step_id="user",
            data_schema=_build_schema(stations),
            errors=errors,
        )


class MevoOptionsFlow(OptionsFlow):
    async def async_step_init(self, user_input=None) -> ConfigFlowResult:
        errors: dict[str, str] = {}
        try:
            stations = await _async_fetch_stations(self.hass)
        except mevo_api.MevoApiError:
            LOG.exception("Failed to fetch Mevo stations during options flow")
            errors["base"] = "cannot_connect"
            stations = []

        if user_input is not None and not errors:
            return self.async_create_entry(
                title="",
                data={const.CONF_STATIONS: user_input[const.CONF_STATIONS]},
            )

        current = self.config_entry.options.get(
            const.CONF_STATIONS,
            self.config_entry.data.get(const.CONF_STATIONS, []),
        )
        return self.async_show_form(
            step_id="init",
            data_schema=_build_schema(stations, current=current),
            errors=errors,
        )
