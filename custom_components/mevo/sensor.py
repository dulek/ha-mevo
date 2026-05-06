from collections import abc
import logging

import voluptuous as vol

from homeassistant.components import sensor
from homeassistant import core
from homeassistant.helpers import aiohttp_client
import homeassistant.helpers.config_validation as cv
from homeassistant.helpers.update_coordinator import CoordinatorEntity
import homeassistant.helpers.typing as ha_typing

from . import const
from . import coordinator as mevo_coordinator
from . import mevo_api

LOG = logging.getLogger(__name__)

PLATFORM_SCHEMA = sensor.PLATFORM_SCHEMA.extend({
    vol.Required(const.CONF_STATIONS): vol.All(cv.ensure_list, [cv.string]),
})


async def async_setup_platform(
    hass: core.HomeAssistant, config: ha_typing.ConfigType,
    async_add_entities: abc.Callable,
    discovery_info: ha_typing.DiscoveryInfoType | None = None) -> None:
    """Set up the sensor platform."""
    session = aiohttp_client.async_get_clientsession(hass)
    api = mevo_api.MevoAPI(session)
    coordinator = mevo_coordinator.MevoCoordinator(hass, api)
    await coordinator.async_config_entry_first_refresh()

    sensors = [
        MevoSensor(coordinator, station)
        for station in config[const.CONF_STATIONS]
    ]
    async_add_entities(sensors)


class MevoSensor(CoordinatorEntity[dict], sensor.SensorEntity):
    _attr_icon = "mdi:bike"
    _attr_state_class = sensor.SensorStateClass.MEASUREMENT
    _attr_native_unit_of_measurement = "bikes"

    def __init__(
        self, coordinator: mevo_coordinator.MevoCoordinator, station: str):
        super().__init__(coordinator)
        self.station = station
        self._attr_name = "Stacja " + station
        self._attr_unique_id = station

    def _station_id(self) -> str | None:
        for station_id, info in self.coordinator.station_info.items():
            if info.get("name") == self.station:
                return station_id
        return None

    @property
    def available(self) -> bool:
        return super().available and self._station_id() is not None

    @property
    def native_value(self):
        station_id = self._station_id()
        if station_id is None:
            return None
        status = self.coordinator.data.get(station_id)
        if status is None:
            return None
        return status.get("num_bikes_available", 0)

    @property
    def extra_state_attributes(self) -> dict | None:
        station_id = self._station_id()
        if station_id is None:
            return None
        info = self.coordinator.station_info.get(station_id, {})
        status = self.coordinator.data.get(station_id, {})
        attrs = {
            const.ATTR_STATION_ID: station_id,
            const.ATTR_ADDRESS: info.get("address"),
            const.ATTR_LATITUDE: info.get("lat"),
            const.ATTR_LONGITUDE: info.get("lon"),
            const.ATTR_CAPACITY: info.get("capacity"),
            # The ios and android URIs are the same.
            const.ATTR_RENTAL_URI: info.get("rental_uris", {}).get("android"),
            const.ATTR_DOCKS_AVAILABLE: status.get("num_docks_available", 0),
        }
        for vh in status.get("vehicle_types_available", []):
            if vh.get("vehicle_type_id") == "ebike":
                attrs[const.ATTR_EBIKES_AVAILABLE] = vh.get("count", 0)
            elif vh.get("vehicle_type_id") == "bike":
                attrs[const.ATTR_BIKES_AVAILABLE] = vh.get("count", 0)
        return attrs
