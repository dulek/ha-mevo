import datetime
import logging

from homeassistant.core import HomeAssistant
from homeassistant.helpers.update_coordinator import (
    DataUpdateCoordinator, UpdateFailed,
)

from . import mevo_api

LOG = logging.getLogger(__name__)

UPDATE_INTERVAL = datetime.timedelta(minutes=5)
STATIONS_TTL = datetime.timedelta(hours=1)


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
        self._station_info_fetched_at: datetime.datetime | None = None

    @property
    def station_info(self) -> dict:
        """Map of station_id to static station info."""
        return self._station_info

    def _stations_stale(self) -> bool:
        if not self._station_info or self._station_info_fetched_at is None:
            return True
        age = datetime.datetime.utcnow() - self._station_info_fetched_at
        return age >= STATIONS_TTL

    async def _async_update_data(self) -> dict:
        try:
            if self._stations_stale():
                stations = await self._api.get_stations()
                self._station_info = {
                    s["station_id"]: s for s in stations
                }
                self._station_info_fetched_at = datetime.datetime.utcnow()
            statuses = await self._api.get_status()
        except mevo_api.MevoApiError as err:
            raise UpdateFailed(f"Mevo API error: {err}") from err
        return {s["station_id"]: s for s in statuses}
