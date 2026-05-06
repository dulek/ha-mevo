import asyncio

import aiohttp

ENDPOINT_STATIONS = "https://gbfs.urbansharing.com/rowermevo.pl/station_information.json"
ENDPOINT_STATUS = "https://gbfs.urbansharing.com/rowermevo.pl/station_status.json"

REQUEST_TIMEOUT = 10


class MevoApiError(Exception):
    """Raised when the Mevo GBFS API returns an unexpected response."""


class MevoAPI(object):
    """Mevo API client."""

    def __init__(self, session):
        self._session = session

    async def _fetch(self, url):
        try:
            async with asyncio.timeout(REQUEST_TIMEOUT):
                async with self._session.get(url) as response:
                    if response.status != 200:
                        raise MevoApiError(
                            f"HTTP {response.status} from {url}")
                    return await response.json()
        except asyncio.TimeoutError as err:
            raise MevoApiError(f"Timeout fetching {url}") from err
        except aiohttp.ClientError as err:
            raise MevoApiError(f"Transport error fetching {url}") from err

    async def get_stations(self):
        """Return the full list of station information entries."""
        data = await self._fetch(ENDPOINT_STATIONS)
        return data.get("data", {}).get("stations", [])

    async def get_status(self):
        """Return the full list of station status entries."""
        data = await self._fetch(ENDPOINT_STATUS)
        return data.get("data", {}).get("stations", [])
