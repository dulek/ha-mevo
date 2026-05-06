"""Tests for Mevo integration setup and unload."""
from homeassistant.config_entries import ConfigEntryState
from homeassistant.core import HomeAssistant
from pytest_homeassistant_custom_component.common import MockConfigEntry

from custom_components.mevo import const


async def test_setup_and_unload_entry(
    hass: HomeAssistant, mock_mevo_feeds) -> None:
    entry = MockConfigEntry(
        domain=const.DOMAIN,
        data={const.CONF_STATIONS: ["station-1"]},
    )
    entry.add_to_hass(hass)

    assert await hass.config_entries.async_setup(entry.entry_id)
    await hass.async_block_till_done()
    assert entry.state == ConfigEntryState.LOADED
    assert entry.entry_id in hass.data[const.DOMAIN]

    assert await hass.config_entries.async_unload(entry.entry_id)
    await hass.async_block_till_done()
    assert entry.state == ConfigEntryState.NOT_LOADED
    assert entry.entry_id not in hass.data[const.DOMAIN]
