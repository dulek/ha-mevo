from collections import abc
import logging
import typing

import voluptuous as vol

from homeassistant.components import sensor
from homeassistant import core
from homeassistant.helpers import aiohttp_client
import homeassistant.helpers.config_validation as cv
from homeassistant.helpers import entity
import homeassistant.helpers.typing as ha_typing

import const
import mevo_api

LOG = logging.getLogger(__name__)

PLATFORM_SCHEMA = sensor.PLATFORM_SCHEMA.extend({
    vol.Required(const.CONF_STATIONS): vol.All(cv.ensure_list, [cv.string]),
})


async def async_setup(hass: core.HomeAssistant, config: dict) -> bool:
    """Set up the Mevo component."""
    # @TODO: Add setup code.
    return True

async def async_setup_platform(
    hass: core.HomeAssistant, config: ha_typing.ConfigType,
    async_add_entities: abc.Callable,
    discovery_info: ha_typing.DiscoveryInfoType | None = None) -> None:
    """Set up the sensor platform."""
    session = aiohttp_client.async_get_clientsession(hass)
    mevo = mevo_api.MevoAPI(session)
    # TODO(dulek): What if stations are duplicated? We use ID in as unique_id.
    sensors = [
        MevoSensor(mevo, station) for station in config[const.CONF_STATIONS]]
    async_add_entities(sensors, update_before_add=True)

class MevoSensor(entity.Entity):
    def __init__(self, mevo_api: mevo_api.MevoAPI, station: str):
        super().__init__()
        self.mevo_api = mevo_api
        self.station = station
        self._name = "Stacja " + station
        self._state = None
        self._available = True
        self._attrs: dict[str, typing.Any] = {}
        self._station_info = None
        self._station_id = None

        # Initialize the sensor attributes
        self._attr_icon = "mdi:bike"

    @property
    def name(self) -> str:
        """Return the name of the entity."""
        return self._name

    @property
    def unique_id(self) -> str:
        """Return the unique ID of the sensor."""
        return self.station

    @property
    def available(self) -> bool:
        """Return True if entity is available."""
        return self._available

    @property
    def state(self) -> str | None:
        return self._state

    @property
    def extra_state_attributes(self) -> dict[str, typing.Any]:
        return self._attrs

    def update_station_attrs(self) -> None:
        self._attrs[const.ATTR_STATION_ID] = self._station_info.get(
            "station_id")
        self._attrs[const.ATTR_ADDRESS] = self._station_info.get("address")
        self._attrs[const.ATTR_LATITUDE] = self._station_info.get("lat")
        self._attrs[const.ATTR_LONGITUDE] = self._station_info.get("lon")
        self._attrs[const.ATTR_CAPACITY] = self._station_info.get("capacity")
        # This is simplification, but the ios and android URIs are the same
        self._attrs[const.ATTR_RENTAL_URI] = self._station_info.get(
            "rental_uris", {}).get("android")

    def update_availability_attrs(self, avail) -> None:
        self._attrs[const.ATTR_DOCKS_AVAILABLE] = avail.get(
            "num_docks_available", 0)
        for vh in avail.get("vehicle_types_available", []):
            if vh.get('vehicle_type_id') == "ebike":
                self._attrs[const.ATTR_EBIKES_AVAILABLE] = vh.get('count', 0)
            elif vh.get('vehicle_type_id') == "bike":
                self._attrs[const.ATTR_BIKES_AVAILABLE] = vh.get('count', 0)

    async def async_update(self) -> None:
        """Update all sensors."""
        try:
            # Get station by name and set attributes
            if self._station_info is None:
                self._station_info = await self.mevo_api.get_station_by_name(
                    self.station)

                if self._station_info is not None:
                    self._station_id = self._station_info.get("station_id")
                    self.update_station_attrs()
                else:
                    LOG.error("Station %s not found in Mevo API", self.station)
                    self._available = False
                    return

            # If we have station info, get availability
            availability = await self.mevo_api.get_availability(
                self._station_id)
            if availability is not None:
                self._state = availability.get("num_bikes_available", 0)
                self.update_availability_attrs(availability)
                self._available = True
            else:
                LOG.error("Availability information for station %s not found "
                          "in Mevo API", self.station)
                self._state = 0
                self._available = False
        except Exception:
            self._available = False
            LOG.exception("Error retrieving data from Mevo API for sensor %s",
                          self.name)