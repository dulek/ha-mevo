# Mevo sensors for Home Assistant

Integrate the Tricity Mevo bike API with Home Assistant to monitor bike counts
at stations. This integration can be installed using the Home Assistant Marketplace
or [HACS](https://hacs.xyz/).

[![Open this repository in Home Assistant](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=dulek&repository=ha-mevo&category=integration)

## Features

- Sensor entities for selected Mevo stations
- Updates every 5 minutes for available bikes, e-bikes, and docks
- Station details: address, location, capacity, rental URI

## Installation

1. Open the repository using the badge above. If it is not in the catalog yet,
   add it as a custom integration when prompted.
2. Install **Mevo** in the Marketplace or HACS.
3. Restart Home Assistant if prompted.

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
