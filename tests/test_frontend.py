"""Tests for the bundled dashboard card resource."""

from types import SimpleNamespace
from unittest.mock import AsyncMock, MagicMock, patch

from homeassistant.components.lovelace import LOVELACE_DATA, MODE_STORAGE, MODE_YAML

from custom_components.mevo import frontend


def _make_hass(items, mode=MODE_STORAGE):
    resources = MagicMock()
    resources.async_get_info = AsyncMock(return_value={"resources": len(items)})
    resources.async_items.return_value = items
    resources.async_create_item = AsyncMock()
    resources.async_update_item = AsyncMock()
    resources.async_delete_item = AsyncMock()

    hass = MagicMock()
    hass.http.async_register_static_paths = AsyncMock()
    hass.data = {
        LOVELACE_DATA: SimpleNamespace(resource_mode=mode, resources=resources)
    }
    return hass, resources


async def test_registers_card_as_module_resource():
    hass, resources = _make_hass([])
    integration = SimpleNamespace(manifest={"version": "0.9.3"})

    with patch.object(
        frontend, "async_get_integration", new=AsyncMock(return_value=integration)
    ):
        await frontend.async_register_card(hass)

    hass.http.async_register_static_paths.assert_awaited_once()
    resources.async_get_info.assert_awaited_once()
    resources.async_create_item.assert_awaited_once_with(
        {"url": "/mevo/mevo-card.js?v=0.9.3", "res_type": "module"}
    )


async def test_updates_existing_card_resource():
    hass, resources = _make_hass(
        [{"id": "card", "url": "/mevo/mevo-card.js?v=0.9.2", "type": "module"}]
    )
    integration = SimpleNamespace(manifest={"version": "0.9.3"})

    with patch.object(
        frontend, "async_get_integration", new=AsyncMock(return_value=integration)
    ):
        await frontend.async_register_card(hass)

    resources.async_update_item.assert_awaited_once_with(
        "card", {"url": "/mevo/mevo-card.js?v=0.9.3", "res_type": "module"}
    )
    resources.async_create_item.assert_not_awaited()


async def test_skips_registration_while_separate_card_is_installed():
    hass, resources = _make_hass(
        [
            {
                "id": "old",
                "url": "/hacsfiles/ha-mevo-card/card.js?hacstag=1",
                "type": "module",
            }
        ]
    )

    await frontend.async_register_card(hass)

    resources.async_create_item.assert_not_awaited()
    resources.async_update_item.assert_not_awaited()


async def test_yaml_resources_are_left_to_user():
    hass, resources = _make_hass([], MODE_YAML)

    await frontend.async_register_card(hass)

    hass.http.async_register_static_paths.assert_awaited_once()
    resources.async_get_info.assert_not_awaited()
    resources.async_create_item.assert_not_awaited()


async def test_removes_only_bundled_card_resource():
    hass, resources = _make_hass(
        [
            {"id": "card", "url": "/mevo/mevo-card.js?v=0.9.3"},
            {"id": "other", "url": "/local/other-card.js"},
        ]
    )

    await frontend.async_remove_card(hass)

    resources.async_delete_item.assert_awaited_once_with("card")
