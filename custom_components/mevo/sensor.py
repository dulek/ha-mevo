import logging

from homeassistant.components import sensor
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import CoordinatorEntity

from . import const
from . import coordinator as mevo_coordinator

LOG = logging.getLogger(__name__)


async def async_setup_entry(
    hass: HomeAssistant, entry: ConfigEntry,
    async_add_entities: AddEntitiesCallback) -> None:
    coordinator: mevo_coordinator.MevoCoordinator = (
        hass.data[const.DOMAIN][entry.entry_id])

    station_ids = entry.options.get(
        const.CONF_STATIONS, entry.data.get(const.CONF_STATIONS, []))
    sensors = []
    for station_id in station_ids:
        info = coordinator.station_info.get(station_id)
        if info is None:
            LOG.error("Station %s not found in Mevo API", station_id)
            continue
        sensors.append(MevoSensor(coordinator, station_id, info))
    async_add_entities(sensors)


class MevoSensor(CoordinatorEntity[dict], sensor.SensorEntity):
    _attr_icon = "mdi:bike"
    _attr_state_class = sensor.SensorStateClass.MEASUREMENT
    _attr_native_unit_of_measurement = "bikes"
    _attr_has_entity_name = True
    _attr_translation_key = "station"

    def __init__(
        self, coordinator: mevo_coordinator.MevoCoordinator,
        station_id: str, info: dict):
        super().__init__(coordinator)
        self._station_id = station_id
        self._attr_translation_placeholders = {
            "name": info.get("name", station_id),
        }
        self._attr_unique_id = station_id

    @property
    def native_value(self):
        status = self.coordinator.data.get(self._station_id)
        if status is None:
            return None
        return status.get("num_bikes_available", 0)

    @property
    def extra_state_attributes(self) -> dict | None:
        info = self.coordinator.station_info.get(self._station_id, {})
        status = self.coordinator.data.get(self._station_id, {})
        attrs = {
            const.ATTR_STATION_ID: self._station_id,
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
