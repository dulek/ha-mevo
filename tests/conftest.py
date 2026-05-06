"""Fixtures for testing."""
import json
import pathlib
import socket as _socket

import pytest

from custom_components.mevo import mevo_api


FIXTURE_DIR = pathlib.Path(__file__).parent / "fixtures"

# Capture real socket primitives before pytest-homeassistant-custom-component's
# pytest_runtest_setup patches them away. Live integration tests restore these
# via the real_network fixture.
_REAL_SOCKET = _socket.socket
_REAL_CONNECT = _socket.socket.connect
_REAL_GETADDRINFO = _socket.getaddrinfo
_REAL_GETHOSTBYNAME = _socket.gethostbyname
_REAL_GETHOSTBYNAME_EX = _socket.gethostbyname_ex


def _load(name: str):
    return json.loads((FIXTURE_DIR / name).read_text())


@pytest.fixture(autouse=True)
def auto_enable_custom_integrations(request):
    """Enable custom integrations for non-integration tests."""
    if "integration" in request.keywords:
        return
    request.getfixturevalue("enable_custom_integrations")


@pytest.fixture
def mock_mevo_feeds(aioclient_mock):
    """Mock both Mevo GBFS endpoints with the bundled fixtures."""
    aioclient_mock.get(
        mevo_api.ENDPOINT_STATIONS, json=_load("station_information.json"))
    aioclient_mock.get(
        mevo_api.ENDPOINT_STATUS, json=_load("station_status.json"))
    return aioclient_mock


@pytest.fixture
def real_network():
    """Restore real network primitives for live integration tests."""
    _socket.socket = _REAL_SOCKET
    _socket.socket.connect = _REAL_CONNECT
    _socket.getaddrinfo = _REAL_GETADDRINFO
    _socket.gethostbyname = _REAL_GETHOSTBYNAME
    _socket.gethostbyname_ex = _REAL_GETHOSTBYNAME_EX
    yield
