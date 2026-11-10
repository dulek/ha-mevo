"""Serve and register the bundled Mevo dashboard card."""

import logging
from pathlib import Path
from urllib.parse import urlsplit

from homeassistant.components.http import StaticPathConfig
from homeassistant.components.lovelace import LOVELACE_DATA, MODE_STORAGE
from homeassistant.const import CONF_ID, CONF_TYPE, CONF_URL
from homeassistant.core import HomeAssistant
from homeassistant.loader import async_get_integration

from .const import DOMAIN

LOGGER = logging.getLogger(__name__)

CARD_PATH = Path(__file__).parent / "www" / "mevo-card.js"
CARD_URL = "/mevo/mevo-card.js"


def _is_legacy_card_resource(url: str) -> bool:
    """Recognize resources installed from the separate Mevo Card repository."""
    path = urlsplit(url).path
    return path in {
        "/hacsfiles/ha-mevo-card/card.js",
        "/local/community/ha-mevo-card/card.js",
        "/local/mevo-card/card.js",
    }


async def async_register_card(hass: HomeAssistant) -> None:
    """Serve the card and add or update its Lovelace resource."""
    await hass.http.async_register_static_paths(
        [StaticPathConfig(CARD_URL, str(CARD_PATH), cache_headers=False)]
    )

    lovelace = hass.data[LOVELACE_DATA]
    if lovelace.resource_mode != MODE_STORAGE:
        LOGGER.info(
            "Lovelace resources use YAML; add %s as a module resource",
            CARD_URL,
        )
        return

    resources = lovelace.resources
    await resources.async_get_info()  # Load storage before reading or changing it.
    items = resources.async_items()
    if any(_is_legacy_card_resource(item[CONF_URL]) for item in items):
        LOGGER.warning(
            "The separate Mevo Card resource is still installed; remove it "
            "before using the card bundled with Mevo"
        )
        return

    integration = await async_get_integration(hass, DOMAIN)
    versioned_url = f"{CARD_URL}?v={integration.manifest['version']}"
    for item in items:
        if urlsplit(item[CONF_URL]).path != CARD_URL:
            continue
        if item[CONF_URL] != versioned_url or item[CONF_TYPE] != "module":
            await resources.async_update_item(
                item[CONF_ID], {CONF_URL: versioned_url, "res_type": "module"}
            )
        return

    await resources.async_create_item(
        {CONF_URL: versioned_url, "res_type": "module"}
    )


async def async_remove_card(hass: HomeAssistant) -> None:
    """Remove the resource added by this integration."""
    lovelace = hass.data[LOVELACE_DATA]
    if lovelace.resource_mode != MODE_STORAGE:
        return

    resources = lovelace.resources
    await resources.async_get_info()
    for item in resources.async_items():
        if urlsplit(item[CONF_URL]).path == CARD_URL:
            await resources.async_delete_item(item[CONF_ID])
