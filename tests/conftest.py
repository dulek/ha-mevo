"""Fixtures for testing."""
import json
import pathlib

import pytest

from custom_components.mevo import mevo_api


FIXTURE_DIR = pathlib.Path(__file__).parent / "fixtures"


def _load(name: str):
    return json.loads((FIXTURE_DIR / name).read_text())


@pytest.fixture(autouse=True)
def auto_enable_custom_integrations(enable_custom_integrations):
    """Enable custom integrations."""
    return


@pytest.fixture
def mock_mevo_feeds(aioclient_mock):
    """Mock both Mevo GBFS endpoints with the bundled fixtures."""
    aioclient_mock.get(
        mevo_api.ENDPOINT_STATIONS, json=_load("station_information.json"))
    aioclient_mock.get(
        mevo_api.ENDPOINT_STATUS, json=_load("station_status.json"))
    return aioclient_mock
