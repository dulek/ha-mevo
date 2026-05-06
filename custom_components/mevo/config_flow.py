import logging

import voluptuous as vol

from homeassistant.config_entries import ConfigFlow, ConfigFlowResult
from homeassistant.helpers import aiohttp_client
from homeassistant.helpers.selector import (
    SelectSelector, SelectSelectorConfig, SelectSelectorMode,
)

from . import const
from . import mevo_api

LOG = logging.getLogger(__name__)


class MevoConfigFlow(ConfigFlow, domain=const.DOMAIN):
    VERSION = 1

    async def async_step_user(self, user_input=None) -> ConfigFlowResult:
        if self._async_current_entries():
            return self.async_abort(reason="single_instance_allowed")

        errors: dict[str, str] = {}
        session = aiohttp_client.async_get_clientsession(self.hass)
        api = mevo_api.MevoAPI(session)
        try:
            stations = await api.get_stations()
        except Exception:
            LOG.exception("Failed to fetch Mevo stations during config flow")
            errors["base"] = "cannot_connect"
            stations = []

        if user_input is not None and not errors:
            return self.async_create_entry(
                title="Mevo",
                data={const.CONF_STATIONS: user_input[const.CONF_STATIONS]},
            )

        options = [
            {
                "value": s["station_id"],
                "label": f"{s.get('name', s['station_id'])}"
                f" — {s.get('address', '')}".strip(" —"),
            }
            for s in sorted(stations, key=lambda s: s.get("name", ""))
        ]
        schema = vol.Schema({
            vol.Required(const.CONF_STATIONS): SelectSelector(
                SelectSelectorConfig(
                    options=options,
                    multiple=True,
                    mode=SelectSelectorMode.DROPDOWN,
                )
            ),
        })
        return self.async_show_form(
            step_id="user", data_schema=schema, errors=errors,
        )
