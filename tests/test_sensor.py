"""Tests for the Mevo sensor entities."""
from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_registry as er
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.mevo import const


async def _setup_entry(hass: HomeAssistant, station_ids):
    entry = MockConfigEntry(
        domain=const.DOMAIN,
        data={const.CONF_STATIONS: station_ids},
    )
    entry.add_to_hass(hass)
    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    return entry


async def test_sensor_state_and_attributes(
    hass: HomeAssistant, mock_mevo_feeds) -> None:
    await _setup_entry(hass, ["station-1"])

    ent_reg = er.async_get(hass)
    entity_id = ent_reg.async_get_entity_id(
        "sensor", const.DOMAIN, "station-1")
    assert entity_id is not None

    state = hass.states.get(entity_id)
    assert state is not None
    assert state.state == "5"
    assert state.attributes[const.ATTR_BIKES_AVAILABLE] == 2
    assert state.attributes[const.ATTR_EBIKES_AVAILABLE] == 3
    assert state.attributes[const.ATTR_DOCKS_AVAILABLE] == 3
    assert state.attributes[const.ATTR_STATION_ID] == "station-1"
    assert state.attributes[const.ATTR_ADDRESS] == "Długi Targ 1"
    assert state.attributes[const.ATTR_CAPACITY] == 10
    assert state.attributes[const.ATTR_RENTAL_URI] == "mevo://station/1"


async def test_unknown_station_is_skipped(
    hass: HomeAssistant, mock_mevo_feeds) -> None:
    await _setup_entry(hass, ["station-1", "does-not-exist"])

    ent_reg = er.async_get(hass)
    assert ent_reg.async_get_entity_id(
        "sensor", const.DOMAIN, "station-1") is not None
    assert ent_reg.async_get_entity_id(
        "sensor", const.DOMAIN, "does-not-exist") is None
