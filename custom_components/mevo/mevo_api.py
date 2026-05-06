ENDPOINT_STATIONS = "https://gbfs.urbansharing.com/rowermevo.pl/station_information.json"
ENDPOINT_STATUS = "https://gbfs.urbansharing.com/rowermevo.pl/station_status.json"


class MevoAPI(object):
    """Mevo API client."""

    def __init__(self, session):
        self._session = session

    async def get_stations(self):
        """Return the full list of station information entries."""
        async with self._session.get(ENDPOINT_STATIONS) as response:
            if response.status != 200:
                raise Exception(
                    f"Failed to fetch stations: {response.status}")
            data = await response.json()
            return data.get("data", {}).get("stations", [])

    async def get_status(self):
        """Return the full list of station status entries."""
        async with self._session.get(ENDPOINT_STATUS) as response:
            if response.status != 200:
                raise Exception(
                    f"Failed to fetch status: {response.status}")
            data = await response.json()
            return data.get("data", {}).get("stations", [])
