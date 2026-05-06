import datetime
import logging

from homeassistant.core import HomeAssistant
from homeassistant.helpers.update_coordinator import (
    DataUpdateCoordinator, UpdateFailed,
)

from . import mevo_api

LOG = logging.getLogger(__name__)

UPDATE_INTERVAL = datetime.timedelta(minutes=5)


class MevoCoordinator(DataUpdateCoordinator[dict]):
    """Coordinator that fetches Mevo GBFS feeds once per cycle."""

    def __init__(self, hass: HomeAssistant, api: mevo_api.MevoAPI):
        super().__init__(
            hass,
            LOG,
            name="mevo",
            update_interval=UPDATE_INTERVAL,
        )
        self._api = api
        self._station_info: dict = {}

    @property
    def station_info(self) -> dict:
        """Map of station_id to static station info."""
        return self._station_info

    async def _async_update_data(self) -> dict:
        try:
            if not self._station_info:
                stations = await self._api.get_stations()
                self._station_info = {
                    s["station_id"]: s for s in stations
                }
            statuses = await self._api.get_status()
        except Exception as err:
            raise UpdateFailed(f"Mevo API error: {err}") from err
        return {s["station_id"]: s for s in statuses}
