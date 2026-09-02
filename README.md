# Family Week Planner Card

An **editable** family week planner for Home Assistant Lovelace dashboards.

Unlike the built-in calendar card and the usual HACS calendar cards — which all show a
single-calendar month/week/list *view* — this card lays out **persons as rows and days as
columns** and lets you **create, edit and delete** events directly:

- **Tap an event** → edit or delete it.
- **Tap an empty cell** → create a new event, pre-filled with that day and that row's person.
- **Long-press (touch) or drag (mouse) an event** → it lifts and follows your finger. Over a target
  cell a time panel opens (*keep time* · *all-day* · hourly rows, upper/lower half = :00/:30).
  Release to move the event there; its duration is preserved. Dropping onto another person's
  row re-assigns the event to that person. Release outside any cell (or press Esc) to cancel.

All events live in **one** calendar entity. The person and an optional icon are encoded in the
event title using the convention:

```
Person|Icon: Title      e.g.  Kay|Sport: Joggen
Person: Title           e.g.  Mary: Zahnarzt
Title                   →     lands in the fallback row (default "Rest")
```

The person prefix decides the row; the icon token maps to an emoji shown before the title.

## Requirements

- A calendar entity that supports creating/updating/deleting events
  (`supported_features` includes CREATE/UPDATE/DELETE). A plain read-only calendar will still
  display, but the edit/create actions will fail. The
  [CalDAV Upgrade](https://github.com/TheOddPirate/Home-Assistant-CalDav-Upgrade) integration, for
  example, exposes full CRUD.

## Installation (HACS)

1. HACS → three-dot menu → **Custom repositories** → add `https://github.com/psewar/family-week-planner-card`, category **Dashboard/Lovelace**.
2. Install **Family Week Planner Card** and reload resources when prompted.

## Configuration

```yaml
type: custom:family-week-planner-card
entity: calendar.your_family_calendar
title: Familienwoche          # optional
row_height: 210               # optional, px per person row (portrait screens)
show_toolbar: true            # optional, week navigation + "Heute"
keyboard: auto                # optional: true | false | auto — built-in on-screen keyboard for the
                              #   title field (auto = show on touch devices). Set false if the OS
                              #   already provides a system on-screen keyboard (e.g. squeekboard).
fallback_person: Rest         # optional, row for titles without a known person
persons:                      # optional, defaults are neutral placeholders
  - { key: Familie,  color: "126,87,194", border: "#7e57c2", text: "#c9b3f0" }
  - { key: Person 1, color: "30,136,229", border: "#1e88e5", text: "#8ecbff" }
  - { key: Person 2, color: "236,64,122", border: "#ec407a", text: "#ff9ec4" }
  - { key: Person 3, color: "0,137,123",  border: "#00897b", text: "#5fd4c6" }
  - { key: Person 4, color: "251,140,0",  border: "#fb8c00", text: "#ffca7a" }
  - { key: Essen,    color: "109,76,65",  border: "#6d4c41", text: "#c8b0a4" }
  - { key: Rest,     color: "84,110,122", border: "#546e7a", text: "#b0bec5" }
icons:                        # optional, token -> emoji (case-insensitive match)
  Sport: "🏋️"
  Tanzen: "💃"
  # ...
```

- `key` — matched case-insensitively against the person prefix in event titles.
- `label` — optional display name (defaults to `key`).
- `color` — `"r,g,b"` used as a translucent row background; `border`/`text` accent the row label.

### Touch-native dialog

The add/edit dialog uses no native pickers or dropdowns (they are not touch-scrollable on some
kiosk setups and never trigger an on-screen keyboard): person and icon are chips, the date is a
row of weekday chips (plus ± one day), and start/end open **iOS-style scroll wheels** (hour 0–23,
minutes in 5-minute steps, snapping to the highlighted centre row). Changing the start keeps the
duration (end follows).

### Drag & drop options

```yaml
drag: true                    # optional, default true — long-press/drag events to move them
drop_hours: [6, 22]           # optional, hour range shown in the drop-time panel
drop_minutes_delay: 1600      # optional, ms to rest on an hour row before the minutes flyout opens
drop_minute_step: 10          # optional, minute step of the flyout (10 → :00 :10 … :50)
```

While dragging, the upper/lower half of an hour row picks :00/:30. Rest on the hour for
`drop_minutes_delay` and a minutes column flies out next to it — drop there for an exact time.

## Companion: `fwp-reload-card`

The bundle also registers a tiny **kiosk reload button**. Home Assistant routes same-origin links
internally (single-page app) and has no built-in "hard reload" action, so on a touch-only wall
display there is otherwise no way to force a full page reload (e.g. after a card or HA update).

```yaml
type: custom:fwp-reload-card
label: Dashboard neu laden    # optional
icon: "🔄"                    # optional, "" to hide
```

## Development

```bash
npm install
npm run dev     # esbuild watch + dev server with a mock Home Assistant at /dev/index.html
npm run build   # minified dist/family-week-planner-card.js
```

## Credits

Calendar create/update/delete uses Home Assistant's public frontend WebSocket API
(`calendar/event/*`) and the `GET /api/calendars/<entity>` endpoint — the same surface the
built-in calendar panel uses (modeled on `home-assistant/frontend` `src/data/calendar.ts`).

MIT © 2026 Kay Moosmann
