import assert from "node:assert/strict";
import test from "node:test";

import { safeRentalUrl } from "./rental-url.js";

test("accepts Mevo app links", () => {
    assert.equal(
        safeRentalUrl("rowermevo://stations/3848"),
        "rowermevo://stations/3848",
    );
});

test("rejects web, script, data, and unknown app links", () => {
    for (const value of [
        "http://example.com/station/1",
        "https://example.com/station/1",
        "javascript:alert(1)",
        "data:text/html,<script>alert(1)</script>",
        "mevo://station/1",
    ]) {
        assert.equal(safeRentalUrl(value), null, value);
    }
});

test("rejects relative, empty, malformed, and non-string values", () => {
    for (const value of ["/local/card.js", "//example.com", "", " ",
        "http://", null, 42, {}]) {
        assert.equal(safeRentalUrl(value), null, String(value));
    }
});
