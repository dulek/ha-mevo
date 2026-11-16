/** Return a Mevo app link, or null for every other URL scheme. */
export function safeRentalUrl(value) {
    if (typeof value !== "string" || !value.trim()) return null;

    try {
        const url = new URL(value);
        return url.protocol === "rowermevo:"
            ? url.href
            : null;
    } catch {
        return null;
    }
}
