"""Live tests against the real Mevo GBFS API.

Opt-in: run with ``pytest -m integration``. Excluded from the default
suite and from CI so a flaky upstream cannot break the unit tests.
"""
import aiohttp
import pytest

from custom_components.mevo import mevo_api

pytestmark = pytest.mark.integration


@pytest.fixture
async def real_session(real_network):
    async with aiohttp.ClientSession() as session:
        yield session


async def test_live_get_stations(real_session):
    api = mevo_api.MevoAPI(real_session)
    stations = await api.get_stations()
    assert len(stations) > 0

    sample = stations[0]
    for field in ("station_id", "name", "lat", "lon", "capacity"):
        assert field in sample, f"missing {field} in station info"


async def test_live_get_status(real_session):
    api = mevo_api.MevoAPI(real_session)
    statuses = await api.get_status()
    assert len(statuses) > 0

    sample = statuses[0]
    for field in (
        "station_id", "num_bikes_available",
        "num_docks_available", "vehicle_types_available",
    ):
        assert field in sample, f"missing {field} in station status"


async def test_live_status_matches_stations(real_session):
    api = mevo_api.MevoAPI(real_session)
    stations = await api.get_stations()
    statuses = await api.get_status()

    info_ids = {s["station_id"] for s in stations}
    status_ids = {s["station_id"] for s in statuses}
    assert info_ids & status_ids, "no station_id overlap between feeds"

    seen_types = set()
    for s in statuses:
        for vh in s.get("vehicle_types_available", []):
            seen_types.add(vh.get("vehicle_type_id"))
    assert seen_types & {"bike", "ebike"}, (
        f"expected bike/ebike vehicle_type_id, got {seen_types}")
