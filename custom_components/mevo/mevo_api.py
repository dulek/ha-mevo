ENDPOINT_STATIONS = "https://gbfs.urbansharing.com/rowermevo.pl/station_information.json"
ENDPOINT_AVAILABILITY = "https://gbfs.urbansharing.com/rowermevo.pl/station_status.json"

class MevoStation(object):
    pass

class MevoAPI(object):
    """Mevo API client."""

    def __init__(self, session):
        """Initialize the Mevo client."""
        self._session = session
        self._stations = []

    async def get_stations(self):
        """Get the list of stations."""
        async with self._session.get(ENDPOINT_STATIONS) as response:
            if response.status != 200:
                raise Exception(f"Failed to fetch stations: {response.status}")
            data = await response.json()
            # TODO(dulek): I'm not 100% sure it's a good idea to cache
            # stations. We surely need some TTL? Or if user changes the config
            # we'll reload the integration anyway?
            self._stations = data.get("data", {}).get("stations", [])
            return self._stations

    async def get_station_by_name(self, name):
        """Get a station by its name."""
        if not self._stations:
            await self.get_stations()
        for station in self._stations:
            if station.get("name") == name:
                return station
        return None

    async def get_station_by_id(self, station_id):
        """Get a station by its ID."""
        if not self._stations:
            await self.get_stations()
        for station in self._stations:
            if station.get("station_id") == station_id:
                return station
        return None

    async def get_availability(self, station_id):
        """Get the availability of a station."""
        async with self._session.get(ENDPOINT_AVAILABILITY) as response:
            if response.status != 200:
                raise Exception(f"Failed to fetch availability: {response.status}")
            data = await response.json()
            stations = data.get("data", {}).get("stations", [])
            for station in stations:
                if station.get("station_id") == station_id:
                    return station
            return None