"""Tests for the Mevo API client."""
import pytest

from homeassistant.helpers import aiohttp_client

from custom_components.mevo import mevo_api


async def test_get_stations(hass, mock_mevo_feeds):
    session = aiohttp_client.async_get_clientsession(hass)
    api = mevo_api.MevoAPI(session)
    stations = await api.get_stations()
    assert len(stations) == 2
    assert stations[0]["station_id"] == "station-1"
    assert stations[0]["name"] == "GDA001"


async def test_get_status(hass, mock_mevo_feeds):
    session = aiohttp_client.async_get_clientsession(hass)
    api = mevo_api.MevoAPI(session)
    statuses = await api.get_status()
    assert len(statuses) == 2
    assert statuses[0]["num_bikes_available"] == 5


async def test_http_error_raises_mevo_error(hass, aioclient_mock):
    aioclient_mock.get(mevo_api.ENDPOINT_STATIONS, status=500)
    session = aiohttp_client.async_get_clientsession(hass)
    api = mevo_api.MevoAPI(session)
    with pytest.raises(mevo_api.MevoApiError):
        await api.get_stations()
