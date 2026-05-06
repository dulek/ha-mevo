"""Tests for the Mevo config flow."""
from homeassistant import config_entries, data_entry_flow
from homeassistant.core import HomeAssistant
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.mevo import const, mevo_api


async def test_user_form_creates_entry(
    hass: HomeAssistant, mock_mevo_feeds) -> None:
    result = await hass.config_entries.flow.async_init(
        const.DOMAIN, context={"source": config_entries.SOURCE_USER},
    )
    assert result["type"] == data_entry_flow.FlowResultType.FORM
    assert result["step_id"] == "user"

    result2 = await hass.config_entries.flow.async_configure(
        result["flow_id"], {const.CONF_STATIONS: ["station-1"]},
    )
    assert result2["type"] == data_entry_flow.FlowResultType.CREATE_ENTRY
    assert result2["data"] == {const.CONF_STATIONS: ["station-1"]}


async def test_already_configured_aborts(
    hass: HomeAssistant, mock_mevo_feeds) -> None:
    MockConfigEntry(
        domain=const.DOMAIN,
        data={const.CONF_STATIONS: ["station-1"]},
    ).add_to_hass(hass)

    result = await hass.config_entries.flow.async_init(
        const.DOMAIN, context={"source": config_entries.SOURCE_USER},
    )
    assert result["type"] == data_entry_flow.FlowResultType.ABORT
    assert result["reason"] == "single_instance_allowed"


async def test_cannot_connect(
    hass: HomeAssistant, aioclient_mock) -> None:
    aioclient_mock.get(mevo_api.ENDPOINT_STATIONS, status=500)

    result = await hass.config_entries.flow.async_init(
        const.DOMAIN, context={"source": config_entries.SOURCE_USER},
    )
    assert result["type"] == data_entry_flow.FlowResultType.FORM
    assert result["errors"] == {"base": "cannot_connect"}
