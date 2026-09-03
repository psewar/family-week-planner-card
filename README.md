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

The card ships a **visual editor**: *Dashboard → Bearbeiten → Karte bearbeiten* shows rows (name
+ color), icons (word + emoji), to-do lists and all options as a form – no YAML needed. Everything
below is the equivalent YAML.

```yaml
type: custom:family-week-planner-card
entity: calendar.your_family_calendar
title: Familienwoche          # optional
row_height: auto              # optional: "auto" (default) fills the viewport height below the card,
                              #   clamped by row_min_height / row_max_height; or a fixed px number
row_min_height: 64            # optional
row_max_height: 420           # optional
icons_entity: input_select.familienplaner_icons   # optional, see "Icons maintained in HA"
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
  One color is enough: give `border: "#1e88e5"` (or `color`) and the rest is derived.
- The **fallback row** (`fallback_person`, default `Rest`) is always present – it is appended
  automatically when missing – so every event or task has a place to land.

### Rows maintained in Home Assistant (optional)

Like the icons, the rows can come from a helper instead of the card config:

```yaml
persons_entity: input_select.familienplaner_zeilen
```

Each option is `Name`, `Name:#rrggbb`, `Name:r,g,b` or `Name:#rrggbb:Label`, in display order
(reorder the options in the helper). When the entity exists and yields at least one entry it
replaces `persons`; the fallback row is appended when missing. Use this if you want to edit rows
from the phone app under *Helfer* – otherwise the visual editor is the simpler place.

### Touch-native dialog

The add/edit dialog uses no native pickers or dropdowns (they are not touch-scrollable on some
kiosk setups and never trigger an on-screen keyboard): person and icon are chips, the date is a
row of weekday chips (plus ± one day), and start/end open **iOS-style scroll wheels** (hour 0–23,
minutes in 5-minute steps, snapping to the highlighted centre row). The wheels scroll natively
(touch, mouse wheel) and also support **drag-to-scroll and tap-to-select** for mouse pointers —
which covers kiosks whose compositor delivers touch as emulated mouse input. Changing the start
keeps the duration (end follows).

### Drag & drop options

```yaml
drag: true                    # optional, default true — long-press/drag events to move them
drop_hours: [6, 22]           # optional, hour range shown in the drop-time panel
drop_minutes_delay: 1600      # optional, ms to rest on an hour row before the minutes flyout opens
drop_minute_step: 5           # optional, minute step of the flyout (5 → :00 :05 … :55)
```

While dragging, the upper/lower half of an hour row picks :00/:30. Rest on the hour for
`drop_minutes_delay` and a minutes column flies out next to it — drop there for an exact time.

### Recurring events

The dialog has a **Wiederholen** row: *Nie · Täglich · Mo–Fr · Wöchentlich · Alle 2 Wochen ·
Monatlich · Jährlich* (plain RFC 5545 rules: `FREQ=DAILY`, `FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR`,
`FREQ=WEEKLY`, `FREQ=WEEKLY;INTERVAL=2`, `FREQ=MONTHLY`, `FREQ=YEARLY`). Occurrences of a series
show a small ↻ marker. Rules written by other clients that don't match a preset are shown as
*Eigene Regel* and left untouched.

Whenever you **save, delete or drag** an occurrence of a series the card asks what the change
applies to:

- **Nur diesen Termin** – only this occurrence (an exception is written, the series stays).
- **Diesen und alle zukünftigen** – the series is split here; earlier occurrences stay as they
  were. Changing the rhythm always applies from this occurrence on.
- **Ganze Serie** (delete only) – removes the series including past occurrences.

An unchanged rhythm is never re-sent, so an `UNTIL`/`COUNT` maintained elsewhere survives edits.
Moving a series to another weekday rewrites a single-weekday `BYDAY` to the new day.

> The backend has to implement the Home Assistant calendar API for recurring events
> (`recurrence_id` / `recurrence_range` on update and delete, `rrule` on create). Local Calendar
> does; for CalDAV use a build of the CalDAV Upgrade integration with recurrence support
> (see [psewar/Home-Assistant-CalDav-Upgrade](https://github.com/psewar/Home-Assistant-CalDav-Upgrade)).
> With a backend that ignores these parameters the card would silently change the whole series.

### Tasks (to-do lists in the grid)

Point the card at one or more Home Assistant **to-do lists** and chores show up in the same
week grid as events, each with a checkbox:

```yaml
todo_entities:
  - entity: todo.familienaufgaben          # titles use the "Person|Icon: Title" convention
  - entity: todo.arbeit                    # an external list (e.g. Microsoft To Do via MS365):
    label: Arbeit                          #   titles carry no prefix -> fixed row + icon
    person: Kay
    icon: Arbeit
    prefix: false
    readonly: false                        # true = show + tick off only, no edit/move/delete
todo_cleanup_days: 7                       # remove completed tasks older than N days (0 = keep)
default_kind: event                        # what a tap on an empty cell creates first: event | task
```

- A task sits in the column of its **due date**. Open tasks that are **overdue** (or have no
  due date) are pulled into **today's** column and marked `!`, so nothing gets lost.
- **Tap the checkbox** to complete a task; tap the text to edit it (title, person, icon, due
  date, repetition); drag it to another day/person to move its due date.
- **Recurring tasks** carry a `↻ …` line in their description – human readable and editable in
  any HA client: `↻ täglich`, `↻ alle 3 Tage`, `↻ wöchentlich`, `↻ alle 2 Wochen`,
  `↻ monatlich`, `↻ jährlich`, `↻ Mo–Fr`, `↻ Mo, Do` (weekday lists), or an RFC 5545
  `FREQ=…` rule. Completing such a task marks it done **and adds the next occurrence**
  (overdue tasks continue from today, so a late tick doesn't create a backlog). Un-ticking
  removes that follow-up again.
- Completed tasks stay visible struck-through on their due day and are removed after
  `todo_cleanup_days`.
- Tasks added by voice ("Füge Katzenklo zu Familienaufgaben hinzu") or in the HA app have no
  prefix and land in the fallback row – drag them to a person or add the prefix later.

### Icons maintained in Home Assistant

Instead of editing the dashboard YAML, keep the `Word:Emoji` icon list in a helper and point the
card at it with `icons_entity`. Two helper types work:

- **Dropdown (`input_select`)** — recommended: each *option* is one entry, e.g. `Sport:🏋️`.
  Edit the list under *Settings → Devices & services → Helpers*. No length limit.
- **Text (`input_text`)** — one string with entries separated by comma or newline
  (`Sport:🏋️, Tanzen:💃`); limited to 255 characters.

When the entity exists and yields at least one entry it **replaces** the built-in / `icons:` map;
the card re-renders as soon as the helper changes. Matching against event titles stays
case-insensitive.

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
