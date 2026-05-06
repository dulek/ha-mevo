# Mevo sensors for Home Assistant

Integrate the Tricity Mevo bike API with Home Assistant to monitor bike counts
at stations. This integration can be installed using [HACS](https://hacs.xyz/).

## Features

- Sensor entities for selected Mevo stations
- Updates every 5 minutes for available bikes, e-bikes, and docks
- Station details: address, location, capacity, rental URI

## Installation

1. Add this repository to HACS as a custom integration.
2. Install the integration via HACS.
3. Restart Home Assistant.

## Configuration

Mevo is configured from the Home Assistant UI. Go to **Settings → Devices &
Services → Add Integration** and search for **Mevo**. The integration will
fetch the live station list from the Mevo API and let you pick the stations
you want to monitor from a dropdown.

To change the set of monitored stations later, open the integration entry
and click **Configure**.

## Sensor Attributes

Each sensor provides:

- `state`: Number of bikes available (both types)
- `docks_available`: Number of docks available (free spaces, not really useful anymore)
- `bikes_available`: Number of regular bikes available
- `ebikes_available`: Number of electric bikes available
- `station_id`: Station ID
- `address`: Station address
- `latitude` / `longitude`: Station location
- `capacity`: Station capacity
- `rental_uri`: URI for bike rental

## Support

For issues or feature requests, open an issue on GitHub.
