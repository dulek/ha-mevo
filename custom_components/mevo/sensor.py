from collections import abc
import logging
import datetime

import voluptuous as vol

from homeassistant.components import sensor
from homeassistant import core
from homeassistant import const as ha_const
from homeassistant.helpers import aiohttp_client
import homeassistant.helpers.config_validation as cv
from homeassistant.helpers import entity
import homeassistant.helpers.typing as ha_typing

from . import const
from . import mevo_api

LOG = logging.getLogger(__name__)

sensor.PLATFORM_SCHEMA = sensor.PLATFORM_SCHEMA.extend({
    vol.Required(const.CONF_STATIONS): vol.All(cv.ensure_list, [cv.string]),
})

SCAN_INTERVAL = datetime.timedelta(minutes=5)

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
        self._attr_name = "Stacja " + station
        self._station_info = None
        self._station_id = None
        self._attr_unique_id = self.station
        self._attr_icon = "mdi:bike"

    def update_station_attrs(self) -> None:
        self._attr_extra_state_attributes.update({
            const.ATTR_STATION_ID: self._station_info.get("station_id"),
            const.ATTR_ADDRESS: self._station_info.get("address"),
            const.ATTR_LATITUDE: self._station_info.get("lat"),
            const.ATTR_LONGITUDE: self._station_info.get("lon"),
            const.ATTR_CAPACITY: self._station_info.get("capacity"),
            # This is simplification, but the ios and android URIs are the same
            const.ATTR_RENTAL_URI: self._station_info.get(
            "rental_uris", {}).get("android")
        })

    def update_availability_attrs(self, avail) -> None:
        d = {
            const.ATTR_DOCKS_AVAILABLE: avail.get("num_docks_available", 0)
        }
        for vh in avail.get("vehicle_types_available", []):
            if vh.get('vehicle_type_id') == "ebike":
                d[const.ATTR_EBIKES_AVAILABLE] = vh.get('count', 0)
            elif vh.get('vehicle_type_id') == "bike":
                d[const.ATTR_BIKES_AVAILABLE] = vh.get('count', 0)
        self._attr_extra_state_attributes.update(d)

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
                    self._attr_available = False
                    self._attr_state = ha_const.STATE_UNKNOWN
                    return

            # If we have station info, get availability
            availability = await self.mevo_api.get_availability(
                self._station_id)
            if availability is not None:
                self._attr_state = availability.get("num_bikes_available", 0)
                self.update_availability_attrs(availability)
                self._attr_available = True
            else:
                LOG.error("Availability information for station %s not found "
                          "in Mevo API", self.station)
                self._attr_available = False
                self._attr_state = ha_const.STATE_UNKNOWN
        except Exception:
            self._attr_available = False
            self._attr_state = ha_const.STATE_UNKNOWN
            LOG.exception("Error retrieving data from Mevo API for sensor %s",
                          self.name)