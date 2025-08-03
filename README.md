# Mevo sensors for Home Assistant

Integrate the Tricity Mevo bike API with Home Assistant to monitor bike counts
at stations. This integration can be installed using [HACS](https://hacs.xyz/).

## Features

- Sensor entities for selected Mevo stations
- Real-time updates on available bikes, e-bikes, and docks
- Station details: address, location, capacity, rental URI

## Installation

1. Add this repository to HACS as a custom integration.
2. Install the integration via HACS.
3. Restart Home Assistant.

## Configuration

Add the following to your `configuration.yaml`:

```yaml
sensor:
  - platform: mevo
    stations:
      - "GDAXXX"
      - "SOPYYY"
```

Replace `"Station Name 1"` and `"Station Name 2"` with the names of Mevo
stations you want to monitor. You can find the available station names in the
Mevo app, they're in the form of _GDA020_, _SOP016_.

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
