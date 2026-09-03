/**
 * family-week-planner-card
 * Editable person-by-day family week planner for Home Assistant.
 *
 * Rows = persons, columns = days (Mon..Sun). Events come from ONE calendar
 * entity whose event titles follow the convention `Person|Icon: Title`
 * (e.g. "Kay|Sport: Joggen"). The person prefix picks the row, the icon token
 * maps to an emoji. Tap an event to edit/delete it; tap an empty cell to create
 * a new event pre-filled with that day and that row's person prefix.
 *
 * Calendar CRUD uses Home Assistant's public frontend WebSocket API
 * (calendar/event/{create,update,delete}) and the REST endpoint
 * GET /api/calendars/<entity>?start&end — the same surface the built-in
 * calendar panel uses. Modeled on home-assistant/frontend src/data/calendar.ts.
 *
 * MIT License. Copyright (c) 2026 Kay Moosmann (psewar).
 */
import { LitElement, html, css } from "lit";
import { styleMap } from "lit/directives/style-map.js";
import { classMap } from "lit/directives/class-map.js";

const CARD_VERSION = "0.7.0";

const WEEKDAYS = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];

// Neutral placeholder rows. Real household names are provided per-instance via the
// `persons:` config option on the dashboard (kept private), never hard-coded here.
const DEFAULT_PERSONS = [
  { key: "Familie", color: "126,87,194", border: "#7e57c2", text: "#c9b3f0", alpha: 0.13 },
  { key: "Person 1", color: "30,136,229", border: "#1e88e5", text: "#8ecbff", alpha: 0.13 },
  { key: "Person 2", color: "236,64,122", border: "#ec407a", text: "#ff9ec4", alpha: 0.13 },
  { key: "Person 3", color: "0,137,123", border: "#00897b", text: "#5fd4c6", alpha: 0.15 },
  { key: "Person 4", color: "251,140,0", border: "#fb8c00", text: "#ffca7a", alpha: 0.13 },
  { key: "Essen", color: "109,76,65", border: "#6d4c41", text: "#c8b0a4", alpha: 0.16 },
  { key: "Rest", color: "84,110,122", border: "#546e7a", text: "#b0bec5", alpha: 0.14 },
];

// Icon token (as written in the event title) -> emoji. Matching is case-insensitive.
const DEFAULT_ICONS = {
  Tanzen: "💃", Singen: "🎵", Chor: "🎶", Sport: "🏋️", Arzt: "🩺", Schule: "🎒",
  Arbeit: "💼", Auto: "🚗", Hund: "🐕", Geburtstag: "🎂", Ausflug: "🧭", Einkauf: "🛒",
  Mittag: "🍴", Nacht: "🌙", Konzert: "🎸", Biblio: "📚",
};

/* ---------- date helpers (all local time) ---------- */
const pad = (n) => String(n).padStart(2, "0");
const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const hm = (d) => `${pad(d.getHours())}:${pad(d.getMinutes())}`;
const fmtDM = (d) => `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.`;
function addDays(date, n) {
  const x = new Date(date);
  x.setDate(x.getDate() + n);
  return x;
}
function mondayOf(date) {
  const x = new Date(date);
  const day = (x.getDay() + 6) % 7; // 0 = Monday
  x.setDate(x.getDate() - day);
  x.setHours(0, 0, 0, 0);
  return x;
}
function parseDate(str) {
  // Pure date "YYYY-MM-DD" -> construct as local midnight (avoid UTC shift).
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    const [y, m, d] = str.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  return new Date(str);
}
function dayIndex(date, weekStart) {
  const a = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const b = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate());
  return Math.round((a - b) / 86400000);
}

/* ---------- recurrence presets (RFC 5545 RRULE) ---------- */
const RECUR_PRESETS = [
  { key: "daily", label: "Täglich", rrule: "FREQ=DAILY" },
  { key: "weekdays", label: "Mo–Fr", rrule: "FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR" },
  { key: "weekly", label: "Wöchentlich", rrule: "FREQ=WEEKLY" },
  { key: "biweekly", label: "Alle 2 Wochen", rrule: "FREQ=WEEKLY;INTERVAL=2" },
  { key: "monthly", label: "Monatlich", rrule: "FREQ=MONTHLY" },
  { key: "yearly", label: "Jährlich", rrule: "FREQ=YEARLY" },
];
const BYDAY = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];
function parseRRule(rrule) {
  const parts = {};
  for (const p of String(rrule || "").split(";")) {
    const i = p.indexOf("=");
    if (i > 0) parts[p.slice(0, i).trim().toUpperCase()] = p.slice(i + 1).trim().toUpperCase();
  }
  return parts;
}
function serializeRRule(parts) {
  return Object.entries(parts)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${k}=${v}`)
    .join(";");
}
// Map an RRULE to one of our presets. Normalizes what other clients write (INTERVAL=1, WKST,
// a BYDAY equal to the start weekday) and ignores UNTIL/COUNT. "" = not recurring, "custom" =
// a rule we don't offer as a chip (shown read-only, still editable in scope).
function recurKeyFor(rrule, startDate) {
  if (!rrule) return "";
  const { UNTIL: _u, COUNT: _c, WKST: _w, ...rest } = parseRRule(rrule);
  if (rest.INTERVAL === "1") delete rest.INTERVAL;
  if (rest.FREQ === "WEEKLY" && rest.BYDAY && startDate && rest.BYDAY === BYDAY[(startDate.getDay() + 6) % 7]) delete rest.BYDAY;
  const norm = serializeRRule(rest);
  const hit = RECUR_PRESETS.find((r) => serializeRRule(parseRRule(r.rrule)) === norm);
  return hit ? hit.key : "custom";
}
function rruleFor(key) {
  const hit = RECUR_PRESETS.find((r) => r.key === key);
  return hit ? hit.rrule : "";
}
// A series moved to another weekday: a single-weekday BYDAY has to follow the new start,
// otherwise DTSTART would fall outside its own rule. Multi-day rules (Mo–Fr) are kept.
function rruleForNewStart(rrule, newStart) {
  if (!rrule) return rrule;
  const p = parseRRule(rrule);
  if (p.FREQ === "WEEKLY" && p.BYDAY && !p.BYDAY.includes(",")) {
    const wd = BYDAY[(newStart.getDay() + 6) % 7];
    if (p.BYDAY !== wd) {
      p.BYDAY = wd;
      return serializeRRule(p);
    }
  }
  return rrule;
}
function recurLabel(key, rrule) {
  if (!key) return "";
  if (key === "custom") return `eigene Regel (${rrule})`;
  const hit = RECUR_PRESETS.find((r) => r.key === key);
  return hit ? hit.label : key;
}

class FamilyWeekPlannerCard extends LitElement {
  static properties = {
    _weekStart: { state: true },
    _events: { state: true },
    _loading: { state: true },
    _dialog: { state: true },
    _kbShift: { state: true },
    _drag: { state: true },
    _toast: { state: true },
    _rowH: { state: true },
    _scope: { state: true },
  };

  constructor() {
    super();
    this._events = [];
    this._loading = false;
    this._dialog = null;
    this._weekStart = mondayOf(new Date());
    this._hass = null;
    this._lastEntityUpdated = undefined;
    this._iconsUpdated = undefined;
    this._kbShift = false;
    this._drag = null; // active drag: {item, el, x, y, grabDX, grabDY, w, target, hoverT, panelRect}
    this._pending = null; // pointer down, not lifted yet
    this._pressTimer = null;
    this._suppressClickUntil = 0;
    this._toast = null;
    this._scope = null; // pending "this / this and future / all" question for a series
    this._rowH = 210;
    this._onResize = () => {
      clearTimeout(this._resizeT);
      this._resizeT = setTimeout(() => this._computeRowH(), 120);
    };
  }

  connectedCallback() {
    super.connectedCallback();
    this._onKey = (e) => {
      if (e.key !== "Escape") return;
      if (this._scope) this._scope = null;
      else if (this._drag) this._evPointerCancel();
    };
    window.addEventListener("keydown", this._onKey);
    window.addEventListener("resize", this._onResize);
  }
  disconnectedCallback() {
    window.removeEventListener("keydown", this._onKey);
    window.removeEventListener("resize", this._onResize);
    if (window.visualViewport) window.visualViewport.removeEventListener("resize", this._onResize);
    clearInterval(this._tick);
    this._endDrag();
    super.disconnectedCallback();
  }
  firstUpdated() {
    this._computeRowH();
    // second pass once fonts/layout have settled
    setTimeout(() => this._computeRowH(), 350);
    // viewport changes that don't fire window.resize (emulation, HA layout shifts): visualViewport
    // plus a light periodic check against the last measurement.
    if (window.visualViewport) window.visualViewport.addEventListener("resize", this._onResize);
    this._tick = setInterval(() => {
      if (!this.config || this.config.row_height !== "auto" || window.innerHeight < 200) return;
      const m = this._lastMeasure;
      const top = Math.max(0, this.getBoundingClientRect().top);
      if (!m || m.vh !== window.innerHeight || m.vw !== window.innerWidth || Math.abs(m.top - top) > 2) {
        this._computeRowH();
      }
    }, 2000);
  }

  /* ---------- responsive row height: fill the viewport below the card's top edge ---------- */
  _computeRowH() {
    if (!this.config) return;
    if (typeof this.config.row_height === "number") {
      if (this._rowH !== this.config.row_height) this._rowH = this.config.row_height;
      return;
    }
    const sr = this.shadowRoot;
    if (!sr) return;
    if (window.innerHeight < 200) return; // not laid out yet (hidden pane / pre-layout): keep current value
    const hostTop = Math.max(0, this.getBoundingClientRect().top);
    this._lastMeasure = { vh: window.innerHeight, vw: window.innerWidth, top: hostTop };
    const avail = window.innerHeight - hostTop - 12;
    const h = (sel, fallback) => {
      const el = sr.querySelector(sel);
      return el ? el.getBoundingClientRect().height : fallback;
    };
    const fixed = h(".ctitle", 0) + h(".toolbar", 0) + h("thead", 66) + 20; // margins/paddings
    const n = Math.max(1, this._persons().length);
    // A rendered row is taller than the requested td height (cell padding + border): measure it.
    const tr = sr.querySelector("tbody tr");
    const overhead = tr ? Math.max(0, Math.round(tr.getBoundingClientRect().height - this._rowH)) : 15;
    let rowH = Math.floor((avail - fixed) / n) - overhead - 1;
    rowH = Math.max(this.config.row_min_height, Math.min(this.config.row_max_height, rowH));
    if (rowH !== this._rowH) this._rowH = rowH;
  }

  setConfig(config) {
    if (!config || !config.entity) {
      throw new Error("family-week-planner-card: 'entity' (a calendar entity) is required.");
    }
    this.config = {
      title: config.title,
      entity: config.entity,
      persons: Array.isArray(config.persons) && config.persons.length ? config.persons : DEFAULT_PERSONS,
      icons: config.icons && Object.keys(config.icons).length ? config.icons : DEFAULT_ICONS,
      fallback_person: config.fallback_person || "Rest",
      // Row height: a number (px) or "auto" (fill the viewport height, clamped to min/max).
      row_height: config.row_height ?? "auto",
      row_min_height: config.row_min_height ?? 64,
      row_max_height: config.row_max_height ?? 420,
      // Optional HA entity holding the icon map (input_select options or input_text value),
      // each entry "Word:Emoji". When present it replaces `icons`.
      icons_entity: config.icons_entity || null,
      show_toolbar: config.show_toolbar !== false,
      default_icon: config.default_icon || "",
      default_start: config.default_start || "09:00",
      default_end: config.default_end || "10:00",
      // On-screen keyboard for the title field: true / false / "auto" (show on touch devices).
      keyboard: config.keyboard ?? "auto",
      // Drag & drop: long-press (touch) / drag (mouse) an event onto another cell to move it.
      drag: config.drag !== false,
      // Hour range offered in the drop-time panel [first, last].
      drop_hours: Array.isArray(config.drop_hours) && config.drop_hours.length === 2 ? config.drop_hours : [6, 22],
      // While dragging: rest on an hour row this long (ms) to open the minutes flyout (step in minutes).
      drop_minutes_delay: config.drop_minutes_delay ?? 1600,
      drop_minute_step: config.drop_minute_step ?? 5,
    };
  }

  set hass(hass) {
    this._hass = hass;
    if (!this.config || !hass) return;
    const st = hass.states[this.config.entity];
    const lu = st ? st.last_updated : "missing";
    if (this._lastEntityUpdated === undefined) {
      this._lastEntityUpdated = lu;
      this._reload();
    } else if (lu !== this._lastEntityUpdated) {
      this._lastEntityUpdated = lu;
      this._reload();
    }
    // Icon map maintained in HA (input_select / input_text): re-render when it changes.
    if (this.config.icons_entity) {
      const ie = hass.states[this.config.icons_entity];
      const iu = ie ? ie.last_updated : "missing";
      if (iu !== this._iconsUpdated) {
        this._iconsUpdated = iu;
        this.requestUpdate();
      }
    }
  }
  get hass() {
    return this._hass;
  }

  _persons() {
    return this.config.persons;
  }
  _icons() {
    // Prefer an icon map maintained in Home Assistant: an input_select whose options are
    // "Word:Emoji" entries, or an input_text whose value lists them (comma/newline separated).
    const ent = this.config.icons_entity;
    const st = ent && this._hass && this._hass.states[ent];
    if (st) {
      let list = [];
      if (st.attributes && Array.isArray(st.attributes.options)) list = st.attributes.options;
      else if (typeof st.state === "string") list = st.state.split(/[\n,;]+/);
      const map = {};
      for (const raw of list) {
        const m = String(raw).trim().match(/^([^:=]+?)\s*[:=]\s*(.+)$/);
        if (m) map[m[1].trim()] = m[2].trim();
      }
      if (Object.keys(map).length) return map;
    }
    return this.config.icons;
  }
  _iconEmoji(key) {
    if (!key) return "";
    const icons = this._icons();
    const k = Object.keys(icons).find((x) => x.toLowerCase() === String(key).toLowerCase());
    return k ? icons[k] : "";
  }
  _normIconKey(key) {
    if (!key) return "";
    const k = Object.keys(this._icons()).find((x) => x.toLowerCase() === String(key).toLowerCase());
    return k || key;
  }

  async _reload() {
    if (!this._hass || !this.config) return;
    const start = this._weekStart;
    const end = addDays(start, 7);
    this._loading = true;
    try {
      const path = `calendars/${this.config.entity}?start=${encodeURIComponent(
        start.toISOString()
      )}&end=${encodeURIComponent(end.toISOString())}`;
      const events = await this._hass.callApi("GET", path);
      this._events = Array.isArray(events) ? events : [];
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("family-week-planner-card: failed to load events", e);
      this._events = [];
    } finally {
      this._loading = false;
    }
  }

  _parseSummary(summary) {
    const s = String(summary || "");
    const ci = s.indexOf(":");
    let prefix, title;
    if (ci >= 0) {
      prefix = s.slice(0, ci).trim();
      title = s.slice(ci + 1).trim();
    } else {
      prefix = s.trim();
      title = s.trim();
    }
    let personRaw, iconKey;
    if (prefix.includes("|")) {
      const pp = prefix.split("|");
      personRaw = pp[0].trim();
      iconKey = pp[1].trim();
    } else {
      personRaw = prefix;
      iconKey = "";
    }
    const match = this._persons().find((p) => p.key.toLowerCase() === personRaw.toLowerCase());
    const personKey = match ? match.key : this.config.fallback_person;
    return { personKey, iconKey: this._normIconKey(iconKey), title };
  }

  _composeSummary(person, iconKey, title) {
    let prefix = "";
    if (iconKey) prefix = `${person}|${iconKey}`;
    else if (person !== this.config.fallback_person) prefix = person;
    return prefix ? `${prefix}: ${title}` : title;
  }

  _items() {
    // Parse fetched events into {dayOffset, personKey, emoji, time, title, allday, raw}.
    const out = [];
    for (const e of this._events) {
      const startRaw = e.start && (e.start.dateTime || e.start.date);
      if (!startRaw) continue;
      const allday = !!(e.start && e.start.date && !e.start.dateTime);
      const dt = parseDate(startRaw);
      const off = dayIndex(dt, this._weekStart);
      if (off < 0 || off > 6) continue;
      const { personKey, iconKey, title } = this._parseSummary(e.summary);
      out.push({
        dayOffset: off,
        personKey,
        emoji: this._iconEmoji(iconKey),
        time: allday ? "" : hm(dt),
        title,
        allday,
        recurring: !!(e.recurrence_id || e.rrule),
        raw: e,
      });
    }
    // stable-ish sort: all-day first, then by time
    out.sort((a, b) => (a.allday === b.allday ? a.time.localeCompare(b.time) : a.allday ? -1 : 1));
    return out;
  }

  _todayCol() {
    return dayIndex(new Date(), this._weekStart);
  }

  _shiftWeek(delta) {
    this._weekStart = addDays(this._weekStart, delta * 7);
    this._reload();
  }
  _goToday() {
    this._weekStart = mondayOf(new Date());
    this._reload();
  }

  /* ---------- dialog ---------- */
  _openCreate(person, day) {
    this._dialog = {
      mode: "create",
      person: person.key,
      iconKey: this.config.default_icon,
      title: "",
      allday: false,
      date: ymd(day),
      start: this.config.default_start,
      end: this.config.default_end,
      uid: null,
      recurrence_id: null,
      rrule: "",
      recur: "",
      recurOrig: "",
      pick: null,
      saving: false,
      error: "",
    };
  }
  _openEdit(it) {
    const raw = it.raw;
    const startRaw = raw.start.dateTime || raw.start.date;
    const endRaw = raw.end && (raw.end.dateTime || raw.end.date);
    const allday = it.allday;
    const s = parseDate(startRaw);
    const e = endRaw ? parseDate(endRaw) : addDays(s, allday ? 1 : 0);
    const parsed = this._parseSummary(raw.summary);
    this._dialog = {
      mode: "edit",
      person: parsed.personKey,
      iconKey: parsed.iconKey,
      title: parsed.title,
      allday,
      date: ymd(s),
      start: allday ? this.config.default_start : hm(s),
      end: allday ? this.config.default_end : hm(e),
      uid: raw.uid,
      recurrence_id: raw.recurrence_id || null,
      rrule: raw.rrule || "",
      recur: recurKeyFor(raw.rrule, s),
      recurOrig: recurKeyFor(raw.rrule, s),
      pick: null,
      saving: false,
      error: "",
    };
  }
  _set(k, v) {
    this._dialog = { ...this._dialog, [k]: v, error: "" };
  }
  _closeDialog() {
    this._dialog = null;
  }
  _onOverlayClick() {
    this._closeDialog();
  }

  _buildEventPayload() {
    const d = this._dialog;
    const title = (d.title || "").trim();
    if (!title) return { error: "Bitte einen Titel eingeben." };
    const summary = this._composeSummary(d.person, d.iconKey, title);
    let dtstart, dtend;
    if (d.allday) {
      dtstart = d.date;
      dtend = ymd(addDays(parseDate(d.date), 1)); // exclusive next day
    } else {
      if (!d.start || !d.end) return { error: "Bitte Von- und Bis-Zeit eingeben." };
      if (d.end <= d.start) return { error: "Die Bis-Zeit muss nach der Von-Zeit liegen." };
      dtstart = `${d.date} ${d.start}:00`;
      dtend = `${d.date} ${d.end}:00`;
    }
    const event = { summary, dtstart, dtend };
    // Recurrence: only send a rule when the user changed it. An unchanged series keeps its
    // stored RRULE untouched (incl. UNTIL/COUNT written by other clients).
    if (d.recur !== d.recurOrig && d.recur !== "custom") event.rrule = rruleFor(d.recur);
    return { event };
  }

  async _save() {
    const built = this._buildEventPayload();
    if (built.error) {
      this._set("error", built.error);
      return;
    }
    const d = this._dialog;
    if (d.mode === "edit" && d.recurrence_id) {
      // an occurrence of a series: ask what the change applies to
      const recurChanged = "rrule" in built.event;
      this._askScope({
        title: "Serientermin ändern",
        text: recurChanged
          ? "Der Rhythmus wurde geändert – das gilt für diesen und alle zukünftigen Termine."
          : "Wofür soll die Änderung gelten?",
        options: [
          ...(recurChanged ? [] : [{ label: "Nur diesen Termin", range: "" }]),
          { label: "Diesen und alle zukünftigen", sub: "vergangene bleiben unverändert", range: "THISANDFUTURE" },
        ],
        onPick: (range) => this._commitSave(built.event, range),
      });
      return;
    }
    await this._commitSave(built.event, null);
  }

  async _commitSave(event, range) {
    const d = this._dialog;
    if (!d) return;
    this._dialog = { ...d, saving: true, error: "" };
    try {
      if (d.mode === "create") {
        try {
          await this._hass.callWS({
            type: "calendar/event/create",
            entity_id: this.config.entity,
            event,
          });
        } catch (e) {
          // Some CalDAV backends (e.g. the n0tcaldav fork) write the event but
          // then throw a serialization error on the response. Don't fail blindly:
          // read the calendar back and treat it as success only if the event is
          // actually there. A genuine failure still surfaces the error.
          const ok = await this._verifyCreated(event);
          if (!ok) throw e;
        }
      } else {
        const msg = {
          type: "calendar/event/update",
          entity_id: this.config.entity,
          uid: d.uid,
          event,
        };
        if (d.recurrence_id && range !== null) {
          msg.recurrence_id = d.recurrence_id;
          msg.recurrence_range = range; // "" = this occurrence only, "THISANDFUTURE" = split the series here
        }
        await this._hass.callWS(msg);
      }
      this._closeDialog();
      await this._reload();
    } catch (e) {
      this._dialog = { ...this._dialog, saving: false, error: this._errText(e) };
    }
  }

  _askScope(spec) {
    this._scope = spec;
  }
  _renderScope() {
    const s = this._scope;
    if (!s) return "";
    const pick = (o) => {
      this._scope = null;
      s.onPick(o.range);
    };
    return html`<div class="overlay scope" @click=${() => (this._scope = null)}>
      <div class="modal scopebox" @click=${(e) => e.stopPropagation()}>
        <div class="mhead">${s.title}</div>
        ${s.text ? html`<div class="note">${s.text}</div>` : ""}
        <div class="scopeopts">
          ${s.options.map(
            (o) => html`<button class="sopt ${o.cls || ""}" @click=${() => pick(o)}>
              ${o.label}${o.sub ? html`<small>${o.sub}</small>` : ""}
            </button>`
          )}
          <button class="sopt cancel" @click=${() => (this._scope = null)}>Abbrechen</button>
        </div>
      </div>
    </div>`;
  }

  async _verifyCreated(event) {
    // Re-fetch and check whether an event matching what we just sent now exists.
    const startDay = String(event.dtstart).slice(0, 10);
    for (let i = 0; i < 4; i++) {
      await this._reload();
      const hit = this._events.some((e) => {
        const s = (e.start && (e.start.dateTime || e.start.date)) || "";
        return e.summary === event.summary && String(s).slice(0, 10) === startDay;
      });
      if (hit) return true;
      await new Promise((r) => setTimeout(r, 800));
    }
    return false;
  }

  async _delete() {
    const d = this._dialog;
    if (!d.uid) {
      this._set("error", "Dieser Termin hat keine ID und kann nicht gelöscht werden.");
      return;
    }
    if (d.recurrence_id) {
      this._askScope({
        title: "Serientermin löschen",
        text: "Was soll gelöscht werden?",
        options: [
          { label: "Nur diesen Termin", range: "" },
          { label: "Diesen und alle zukünftigen", sub: "vergangene bleiben", range: "THISANDFUTURE" },
          { label: "Ganze Serie", sub: "auch vergangene Termine", range: "ALL", cls: "del" },
        ],
        onPick: (range) => this._commitDelete(range),
      });
      return;
    }
    await this._commitDelete(null);
  }

  async _commitDelete(range) {
    const d = this._dialog;
    if (!d) return;
    this._dialog = { ...d, saving: true, error: "" };
    try {
      const msg = { type: "calendar/event/delete", entity_id: this.config.entity, uid: d.uid };
      if (d.recurrence_id && range !== null && range !== "ALL") {
        msg.recurrence_id = d.recurrence_id;
        msg.recurrence_range = range;
      }
      await this._hass.callWS(msg);
      this._closeDialog();
      await this._reload();
    } catch (e) {
      this._dialog = { ...this._dialog, saving: false, error: this._errText(e) };
    }
  }

  _errText(e) {
    if (!e) return "Unbekannter Fehler.";
    if (typeof e === "string") return e;
    if (e.message) return e.message;
    if (e.error) return e.error;
    try {
      return JSON.stringify(e);
    } catch {
      return "Fehler beim Speichern.";
    }
  }

  /* ---------- drag & drop: move an event to another day / time / person ---------- */
  _evPointerDown(e, it, el) {
    if (!this.config.drag || this._dialog) return;
    if (e.button !== undefined && e.button !== 0) return;
    if (this._drag || this._pending) this._endDrag(); // stale state from a lost pointer -> reset
    const r = el.getBoundingClientRect();
    const p = {
      item: it,
      el,
      pointerId: e.pointerId,
      type: e.pointerType,
      startX: e.clientX,
      startY: e.clientY,
      x: e.clientX,
      y: e.clientY,
      grabDX: e.clientX - r.left,
      grabDY: e.clientY - r.top,
      w: r.width,
      target: null,
      hoverT: null,
      panelRect: null,
    };
    this._pending = p;
    // Listen on window for the rest of the gesture: pointer capture is not reliable for
    // touch on every compositor, and a release outside the card must still end the drag.
    this._attachWin();
    if (e.pointerType !== "mouse") {
      // touch/pen: long-press lifts the card (a quick tap still opens the editor)
      this._pressTimer = setTimeout(() => {
        if (this._pending === p) this._lift();
      }, 320);
    }
  }
  _clearPress() {
    if (this._pressTimer) {
      clearTimeout(this._pressTimer);
      this._pressTimer = null;
    }
  }
  _attachWin() {
    if (this._winAttached) return;
    this._winAttached = true;
    this._onWinMove = (e) => this._evPointerMove(e);
    this._onWinUp = (e) => this._evPointerUp(e);
    this._onWinCancel = () => this._evPointerCancel();
    window.addEventListener("pointermove", this._onWinMove, { capture: true, passive: false });
    window.addEventListener("pointerup", this._onWinUp, { capture: true });
    window.addEventListener("pointercancel", this._onWinCancel, { capture: true });
    window.addEventListener("blur", this._onWinCancel);
  }
  _detachWin() {
    if (!this._winAttached) return;
    this._winAttached = false;
    window.removeEventListener("pointermove", this._onWinMove, { capture: true });
    window.removeEventListener("pointerup", this._onWinUp, { capture: true });
    window.removeEventListener("pointercancel", this._onWinCancel, { capture: true });
    window.removeEventListener("blur", this._onWinCancel);
  }
  _endDrag() {
    this._clearPress();
    this._flyLeave();
    this._pending = null;
    this._drag = null;
    this._detachWin();
  }
  _lift() {
    const p = this._pending;
    if (!p) return;
    this._clearPress();
    this._pending = null;
    this._drag = { ...p };
    this._updateDragTarget(p.x, p.y);
  }
  _evPointerMove(e) {
    const cur = this._drag || this._pending;
    if (!cur || e.pointerId !== cur.pointerId) return;
    if (!this._drag) {
      const p = cur;
      p.x = e.clientX;
      p.y = e.clientY;
      const moved = Math.hypot(e.clientX - p.startX, e.clientY - p.startY);
      if (p.type === "mouse") {
        if (moved > 8) this._lift();
      } else if (moved > 12) {
        this._endDrag(); // finger slipped before the long-press -> no drag
      }
      return;
    }
    e.preventDefault();
    this._drag = { ...this._drag, x: e.clientX, y: e.clientY };
    this._updateDragTarget(e.clientX, e.clientY);
  }
  _evPointerUp(e) {
    const cur = this._drag || this._pending;
    if (!cur || e.pointerId !== cur.pointerId) return;
    const d = this._drag;
    this._endDrag(); // always clean up, wherever the pointer was released
    if (d) {
      e.preventDefault();
      this._suppressClickUntil = Date.now() + 500;
      if (d.target) this._performDrop(d);
    }
  }
  _evPointerCancel() {
    this._endDrag();
  }

  _updateDragTarget(x, y) {
    const d = this._drag;
    if (!d) return;
    const el = this.shadowRoot.elementFromPoint(x, y);
    const closest = (sel) => (el && el.closest ? el.closest(sel) : null);
    let { target, hoverT, panelRect, flyHour } = d;
    const row = closest(".drow");
    if (row) {
      const t = row.dataset.t;
      if (row.classList.contains("fly")) {
        hoverT = t; // exact HH:MM from the minutes flyout
      } else if (t === "keep" || t === "allday") {
        hoverT = t;
        this._flyLeave();
        flyHour = null;
      } else {
        const rr = row.getBoundingClientRect();
        hoverT = `${t}:${y > rr.top + rr.height / 2 ? "30" : "00"}`;
        if (t !== this._flyHoverHour) {
          // entered a (different) hour row: restart the rest timer for the minutes flyout
          this._flyLeave();
          if (flyHour && flyHour !== t) flyHour = null;
          this._flyHoverHour = t;
          this._flyTimer = setTimeout(() => {
            if (this._drag && this._flyHoverHour === t) this._drag = { ...this._drag, flyHour: t };
          }, this.config.drop_minutes_delay);
        }
      }
    } else if (closest(".droppanel")) {
      // over panel chrome (borders/gaps): keep the last choice
    } else {
      this._flyLeave();
      flyHour = null;
      const td = closest("td.cell");
      if (td) {
        const person = td.dataset.person;
        const day = Number(td.dataset.day);
        if (!target || target.person !== person || target.day !== day) {
          target = { person, day };
          panelRect = td.getBoundingClientRect();
        }
        hoverT = "keep";
      } else {
        target = null;
        panelRect = null;
        hoverT = null;
      }
    }
    this._drag = { ...d, target, hoverT, panelRect, flyHour };
  }
  _flyLeave() {
    if (this._flyTimer) {
      clearTimeout(this._flyTimer);
      this._flyTimer = null;
    }
    this._flyHoverHour = null;
  }

  async _performDrop(d) {
    const it = d.item;
    const raw = it.raw;
    const t = d.hoverT || "keep";
    const samePlace = d.target.day === it.dayOffset && d.target.person === it.personKey && t === "keep";
    if (samePlace) return;
    const day = addDays(this._weekStart, d.target.day);
    const s0 = parseDate(raw.start.dateTime || raw.start.date);
    const e0raw = raw.end && (raw.end.dateTime || raw.end.date);
    const e0 = e0raw ? parseDate(e0raw) : addDays(s0, it.allday ? 1 : 0);
    let dtstart, dtend;
    if (t === "allday" || (t === "keep" && it.allday)) {
      const span = it.allday ? Math.max(1, Math.round((e0 - s0) / 86400000)) : 1;
      dtstart = ymd(day);
      dtend = ymd(addDays(day, span));
    } else {
      let H, M;
      if (t === "keep") {
        H = s0.getHours();
        M = s0.getMinutes();
      } else {
        [H, M] = t.split(":").map(Number);
      }
      const dur = it.allday ? 60 * 60000 : Math.max(5 * 60000, e0 - s0);
      const ns = new Date(day.getFullYear(), day.getMonth(), day.getDate(), H, M, 0);
      const ne = new Date(ns.getTime() + dur);
      dtstart = `${ymd(ns)} ${hm(ns)}:00`;
      dtend = `${ymd(ne)} ${hm(ne)}:00`;
    }
    // Dropping onto another person's row re-assigns the event (title prefix changes).
    let summary = raw.summary;
    if (d.target.person !== it.personKey) {
      const parsed = this._parseSummary(raw.summary);
      summary = this._composeSummary(d.target.person, parsed.iconKey, parsed.title);
    }
    const msg = {
      type: "calendar/event/update",
      entity_id: this.config.entity,
      uid: raw.uid,
      event: { summary, dtstart, dtend },
    };
    if (raw.recurrence_id) {
      // an occurrence of a series: ask whether to move just this one or the series from here on
      msg.recurrence_id = raw.recurrence_id;
      const alldayTarget = dtstart.length === 10;
      const when = `${WEEKDAYS[d.target.day]} ${fmtDM(day)}${alldayTarget ? ", ganztags" : " " + dtstart.slice(11, 16)}`;
      this._askScope({
        title: "Serientermin verschieben",
        text: `„${it.title}" → ${when}`,
        options: [
          { label: "Nur diesen Termin", range: "" },
          { label: "Diesen und alle zukünftigen", sub: "vergangene bleiben", range: "THISANDFUTURE" },
        ],
        onPick: (range) => {
          msg.recurrence_range = range;
          if (range === "THISANDFUTURE" && raw.rrule) {
            const rr = rruleForNewStart(raw.rrule, day);
            if (rr !== raw.rrule) msg.event.rrule = rr;
          }
          this._commitMove(msg);
        },
      });
      return;
    }
    await this._commitMove(msg);
  }

  async _commitMove(msg) {
    this._toast = { text: "Verschiebe …" };
    try {
      await this._hass.callWS(msg);
      await this._reload();
      this._toast = null;
    } catch (e) {
      this._toast = { text: "Verschieben fehlgeschlagen: " + this._errText(e), error: true };
      setTimeout(() => (this._toast = null), 4500);
    }
  }

  _isLifted(it) {
    const d = this._drag;
    return !!d && d.item.raw.uid === it.raw.uid && (d.item.raw.recurrence_id || null) === (it.raw.recurrence_id || null);
  }

  _renderGhost() {
    const d = this._drag;
    if (!d) return "";
    const it = d.item;
    let tgt = "Loslassen bricht ab";
    if (d.target) {
      const day = addDays(this._weekStart, d.target.day);
      const person = this._persons().find((p) => p.key === d.target.person);
      const when =
        d.hoverT === "allday"
          ? "ganztags"
          : !d.hoverT || d.hoverT === "keep"
            ? it.allday
              ? "ganztags"
              : `${it.time} (Zeit behalten)`
            : d.hoverT;
      tgt = `→ ${WEEKDAYS[d.target.day].slice(0, 2)} ${fmtDM(day)} · ${person ? person.label || person.key : d.target.person} · ${when}`;
    }
    return html`<div
      class="ghost"
      style=${styleMap({ left: `${d.x - d.grabDX}px`, top: `${d.y - d.grabDY}px`, width: `${d.w}px` })}
    >
      <div>${it.emoji ? html`${it.emoji} ` : ""}${it.time ? html`<b>${it.time}</b> ` : ""}${it.title}</div>
      <div class="gt">${tgt}</div>
    </div>`;
  }

  _renderDropPanel() {
    const d = this._drag;
    if (!d || !d.target || !d.panelRect) return "";
    const [h0, h1] = this.config.drop_hours;
    const hours = [];
    for (let h = h0; h <= h1; h++) hours.push(String(h).padStart(2, "0"));
    const FLYW = 104;
    const W = Math.max(d.panelRect.width, 190) + (d.flyHour ? FLYW : 0);
    const H = 36 + 34 * (1 + hours.length);
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const left = Math.min(Math.max(8, d.panelRect.left), Math.max(8, vw - W - 8));
    const top = Math.min(Math.max(8, d.panelRect.top), Math.max(8, vh - H - 8));
    const day = addDays(this._weekStart, d.target.day);
    const person = this._persons().find((p) => p.key === d.target.person);
    const hot = (t) => d.hoverT === t || (!!d.hoverT && d.hoverT.startsWith(t + ":"));
    // minutes flyout (after resting on an hour row): aligned with that row, kept inside the panel height
    const step = Math.max(1, this.config.drop_minute_step);
    const mins = [];
    for (let m = 0; m < 60; m += step) mins.push(pad(m));
    const flyIdx = d.flyHour ? hours.indexOf(d.flyHour) : -1;
    const flyTop = flyIdx >= 0 ? Math.min(36 + 34 * (1 + flyIdx), Math.max(0, H - 34 * mins.length)) : 0;
    return html`<div class="droppanel" style=${styleMap({ left: `${left}px`, top: `${top}px`, width: `${W}px` })}>
      <div class="dpmain">
        <div class="drow head ${d.hoverT === "keep" ? "hot" : ""}" data-t="keep">
          <span>${WEEKDAYS[d.target.day]} ${fmtDM(day)} · ${person ? person.label || person.key : ""}</span>
          <span class="hint">Zeit behalten</span>
        </div>
        <div class="drow allday ${hot("allday") ? "hot" : ""}" data-t="allday">Ganztags</div>
        ${hours.map(
          (hh) => html`<div class="drow ${d.flyHour === hh ? "open" : ""} ${hot(hh) ? "hot" : ""}" data-t=${hh}>
            <span>${hh}:00</span>${hot(hh) ? html`<span class="sel">${d.hoverT}</span>` : d.flyHour === hh ? html`<span class="sel">›</span>` : ""}
          </div>`
        )}
      </div>
      ${flyIdx >= 0
        ? html`<div class="dpfly" style=${styleMap({ marginTop: `${flyTop}px` })}>
            ${mins.map((mm) => {
              const t = `${d.flyHour}:${mm}`;
              return html`<div class="drow fly ${d.hoverT === t ? "hot" : ""}" data-t=${t}>${t}</div>`;
            })}
          </div>`
        : ""}
    </div>`;
  }

  getCardSize() {
    return this._persons().length * 3 + 2;
  }

  render() {
    if (!this.config) return html``;
    const persons = this._persons();
    const weekStart = this._weekStart;
    const days = [...Array(7)].map((_, i) => addDays(weekStart, i));
    const todayCol = this._todayCol();
    const items = this._items();
    const rowH = `${this._rowH}px`;

    return html`
      <ha-card>
        ${this.config.title ? html`<div class="ctitle">${this.config.title}</div>` : ""}
        ${this.config.show_toolbar ? this._renderToolbar(weekStart, days) : ""}
        <div class="wrap">
          <table>
            <colgroup>
              <col class="pcol" />
              ${days.map(() => html`<col class="dcol" />`)}
            </colgroup>
            <thead>
              <tr>
                <th class="corner"></th>
                ${days.map(
                  (d, i) => html`<th class=${classMap({ today: i === todayCol })}>
                    ${WEEKDAYS[i]}<br /><span class="dnum">${fmtDM(d)}</span>
                  </th>`
                )}
              </tr>
            </thead>
            <tbody>
              ${persons.map(
                (p) => html`<tr>
                  <td
                    class="pname"
                    style=${styleMap({
                      background: `rgba(${p.color},${p.alpha ?? 0.13})`,
                      borderLeftColor: p.border,
                      color: p.text,
                    })}
                  >
                    ${p.label || p.key}
                  </td>
                  ${days.map((d, i) => {
                    const cellItems = items.filter((it) => it.dayOffset === i && it.personKey === p.key);
                    const over = !!this._drag && !!this._drag.target && this._drag.target.person === p.key && this._drag.target.day === i;
                    return html`<td
                      class=${classMap({ today: i === todayCol, cell: true, dropover: over })}
                      style=${styleMap({ height: rowH, background: `rgba(${p.color},${p.alpha ?? 0.13})` })}
                      data-person=${p.key}
                      data-day=${i}
                      @click=${() => {
                        if (Date.now() < this._suppressClickUntil) return;
                        this._openCreate(p, d);
                      }}
                      title="Neuen Termin für ${p.label || p.key} am ${fmtDM(d)} anlegen"
                    >
                      ${cellItems.map(
                        (it) => html`<div
                          class=${classMap({ ev: true, lifted: this._isLifted(it) })}
                          @pointerdown=${(e) => this._evPointerDown(e, it, e.currentTarget)}
                          @dragstart=${(e) => e.preventDefault()}
                          @contextmenu=${(e) => e.preventDefault()}
                          @click=${(e) => {
                            e.stopPropagation();
                            if (Date.now() < this._suppressClickUntil) return;
                            this._openEdit(it);
                          }}
                        >
                          ${it.recurring ? html`<span class="rec" title="Serientermin">↻</span>` : ""}
                          ${it.emoji ? html`${it.emoji} ` : ""}${it.time ? html`<b>${it.time}</b> ` : ""}${it.title}
                        </div>`
                      )}
                    </td>`;
                  })}
                </tr>`
              )}
            </tbody>
          </table>
        </div>
        ${this._dialog ? this._renderDialog() : ""}
        ${this._renderScope()}
        ${this._renderDropPanel()}
        ${this._renderGhost()}
        ${this._toast ? html`<div class="toast ${this._toast.error ? "err" : ""}">${this._toast.text}</div>` : ""}
      </ha-card>
    `;
  }

  _renderToolbar(weekStart, days) {
    const label = `${fmtDM(weekStart)} – ${fmtDM(days[6])}`;
    return html`<div class="toolbar">
      <button class="nav" @click=${() => this._shiftWeek(-1)} title="Vorherige Woche">‹</button>
      <button class="today-btn" @click=${() => this._goToday()}>Heute</button>
      <button class="nav" @click=${() => this._shiftWeek(1)} title="Nächste Woche">›</button>
      <span class="range">${label}</span>
      ${this._loading ? html`<span class="spin">…</span>` : ""}
    </div>`;
  }

  _kbEnabled() {
    const k = this.config.keyboard;
    if (k === true) return true;
    if (k === false) return false;
    return (navigator.maxTouchPoints || 0) > 0; // "auto"
  }

  _kbType(key) {
    const d = this._dialog;
    if (!d) return;
    let title = d.title || "";
    if (key === "back") {
      title = title.slice(0, -1);
    } else if (key === "space") {
      title += " ";
    } else if (key === "shift") {
      this._kbShift = !this._kbShift;
      return;
    } else {
      const isLetter = /^[a-zäöü]$/.test(key);
      title += this._kbShift && isLetter ? key.toUpperCase() : key;
      if (this._kbShift && isLetter) this._kbShift = false;
    }
    this._dialog = { ...d, title, error: "" };
  }

  _renderKeyboard() {
    const rows = [
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      ["q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "ü"],
      ["a", "s", "d", "f", "g", "h", "j", "k", "l", "ö", "ä"],
      ["shift", "y", "x", "c", "v", "b", "n", "m", "ß", "back"],
    ];
    const key = (k) => {
      if (k === "shift")
        return html`<button
          class="key wide ${this._kbShift ? "active" : ""}"
          @click=${() => this._kbType("shift")}
        >⇧</button>`;
      if (k === "back")
        return html`<button class="key wide" @click=${() => this._kbType("back")}>⌫</button>`;
      const isLetter = /^[a-zäöü]$/.test(k);
      const label = this._kbShift && isLetter ? k.toUpperCase() : k;
      return html`<button class="key" @click=${() => this._kbType(k)}>${label}</button>`;
    };
    return html`<div class="kb" @mousedown=${(e) => e.preventDefault()}>
      ${rows.map((row) => html`<div class="kbrow">${row.map(key)}</div>`)}
      <div class="kbrow">
        <button class="key space" @click=${() => this._kbType("space")}>Leerzeichen</button>
      </div>
    </div>`;
  }

  /* ---------- touch-native dialog controls (no native pickers/popups) ---------- */
  _dateLabel(ymdStr) {
    const d = parseDate(ymdStr);
    return `${WEEKDAYS[(d.getDay() + 6) % 7].slice(0, 2)} ${fmtDM(d)}${d.getFullYear()}`;
  }
  _shiftDate(n) {
    this._set("date", ymd(addDays(parseDate(this._dialog.date), n)));
  }
  _setStart(h, m) {
    // Move the start; keep the duration (end follows), clamped to the same day.
    const d = this._dialog;
    const toMin = (s) => {
      const [hh, mm] = String(s || "0:0").split(":").map(Number);
      return hh * 60 + mm;
    };
    const tm = (mins) => `${pad(Math.floor(mins / 60))}:${pad(mins % 60)}`;
    let dur = toMin(d.end) - toMin(d.start);
    if (!(dur > 0)) dur = 60;
    const ns = h * 60 + m;
    let ne = Math.min(ns + dur, 23 * 60 + 45);
    if (ne <= ns) ne = Math.min(ns + 15, 23 * 60 + 45);
    this._dialog = { ...d, start: tm(ns), end: tm(ne), error: "" };
  }
  _setEnd(h, m) {
    this._dialog = { ...this._dialog, end: `${pad(h)}:${pad(m)}`, error: "" };
  }
  // iOS-style drum pickers: scroll-snapping wheels for hour (0-23) and minute (5-min steps).
  _renderTimePick(field) {
    const d = this._dialog;
    const [ch, cm] = String(d[field] || "09:00").split(":").map(Number);
    const hours = [...Array(24).keys()];
    const mins = [];
    for (let m = 0; m < 60; m += 5) mins.push(m);
    const curM = cm - (cm % 5);
    const setH = (h) => (field === "start" ? this._setStart(h, cm) : this._setEnd(h, cm));
    const setM = (m) => (field === "start" ? this._setStart(ch, m) : this._setEnd(ch, m));
    // Wheels scroll natively (touch / mouse wheel); for mouse pointers (incl. compositor
    // mouse-emulated touch) we add drag-to-scroll and tap-to-select.
    const wheel = (kind, values, cur, onChange) => html`<div class="wheelwrap">
      <div
        class="wheel"
        data-kind=${kind}
        @scroll=${(e) => this._wheelScroll(e, values, onChange)}
        @pointerdown=${(e) => this._wheelDown(e)}
        @pointermove=${(e) => this._wheelMove(e)}
        @pointerup=${(e) => this._wheelUp(e, values, onChange)}
        @pointercancel=${(e) => this._wheelUp(e, values, onChange)}
      >
        <div class="wpad"></div>
        ${values.map((v, i) => html`<div class="witem ${v === cur ? "on" : ""}" data-i=${i}>${pad(v)}</div>`)}
        <div class="wpad"></div>
      </div>
    </div>`;
    return html`<div class="tpick wheels">
      <div class="wheelrow">
        <span class="wlabel">${field === "start" ? "Von" : "Bis"}</span>
        ${wheel("h", hours, ch, setH)}
        <div class="wcolon">:</div>
        ${wheel("m", mins, curM, setM)}
      </div>
      <div class="wactions"><button class="chip" @click=${() => this._set("pick", null)}>Fertig</button></div>
    </div>`;
  }
  _wheelScroll(e, values, onChange) {
    const el = e.currentTarget;
    if (el._prog || el._dragging) return; // programmatic positioning / mid-drag, not a settled user scroll
    clearTimeout(el._t);
    el._t = setTimeout(() => {
      const idx = Math.max(0, Math.min(values.length - 1, Math.round(el.scrollTop / 44)));
      onChange(values[idx]);
    }, 140);
  }
  _wheelDown(e) {
    if (e.pointerType !== "mouse" || (e.button !== undefined && e.button !== 0)) return;
    const el = e.currentTarget;
    el._dragging = true;
    el._moved = false;
    el._y0 = e.clientY;
    el._top0 = el.scrollTop;
    el._downItem = e.target && e.target.closest ? e.target.closest(".witem") : null;
    el.classList.add("dragging"); // disables scroll-snap while dragging
    try {
      el.setPointerCapture(e.pointerId);
    } catch (_) {
      /* ignore */
    }
    e.preventDefault();
  }
  _wheelMove(e) {
    const el = e.currentTarget;
    if (!el._dragging) return;
    const dy = e.clientY - el._y0;
    if (Math.abs(dy) > 3) el._moved = true;
    el.scrollTop = el._top0 - dy;
  }
  _wheelUp(e, values, onChange) {
    const el = e.currentTarget;
    if (!el._dragging) return;
    el._dragging = false;
    el.classList.remove("dragging");
    try {
      el.releasePointerCapture(e.pointerId);
    } catch (_) {
      /* ignore */
    }
    let idx = Math.round(el.scrollTop / 44);
    if (!el._moved && el._downItem) idx = Number(el._downItem.dataset.i); // tap on a value selects it
    idx = Math.max(0, Math.min(values.length - 1, idx));
    el._prog = true;
    el.scrollTop = idx * 44;
    setTimeout(() => (el._prog = false), 250);
    onChange(values[idx]);
  }
  updated(changed) {
    super.updated(changed);
    // Auto row height: re-measure whenever viewport or our top offset changed since the last
    // measurement (covers late layout, HA header toggling, emulated viewport changes).
    if (this.config && this.config.row_height === "auto" && window.innerHeight >= 200) {
      const m = this._lastMeasure;
      const top = Math.max(0, this.getBoundingClientRect().top);
      if (!m || m.vh !== window.innerHeight || m.vw !== window.innerWidth || Math.abs(m.top - top) > 2) {
        this._computeRowH();
      }
    }
    // Position the wheels once when a time picker opens (not on every re-render).
    const pick = this._dialog && this._dialog.pick;
    if (!pick) {
      this._wheelKey = null;
      return;
    }
    if (this._wheelKey === pick) return;
    this._wheelKey = pick;
    const [ch, cm] = String(this._dialog[pick] || "09:00").split(":").map(Number);
    const pos = (kind, idx) => {
      const el = this.shadowRoot.querySelector(`.wheel[data-kind="${kind}"]`);
      if (!el) return;
      el._prog = true;
      el.scrollTop = idx * 44;
      setTimeout(() => (el._prog = false), 250);
    };
    pos("h", ch);
    pos("m", Math.floor(cm / 5));
  }
  _renderDatePick() {
    const d = this._dialog;
    const days = [...Array(7)].map((_, i) => addDays(this._weekStart, i));
    return html`<div class="fld">
      <span class="lbl">Datum <b class="val">${this._dateLabel(d.date)}</b></span>
      <div class="daterow">
        <button class="chip nav" @click=${() => this._shiftDate(-1)} title="Ein Tag zurück">‹</button>
        ${days.map(
          (day, i) => html`<button class="chip day ${ymd(day) === d.date ? "on" : ""}" @click=${() => this._set("date", ymd(day))}>
            ${WEEKDAYS[i].slice(0, 2)}<small>${fmtDM(day)}</small>
          </button>`
        )}
        <button class="chip nav" @click=${() => this._shiftDate(1)} title="Ein Tag vor">›</button>
      </div>
    </div>`;
  }

  _renderDialog() {
    const d = this._dialog;
    const persons = this._persons();
    const icons = this._icons();
    const iconKeys = Object.keys(icons);
    return html`
      <div class="overlay" @click=${this._onOverlayClick}>
        <div class="modal wide" @click=${(e) => e.stopPropagation()}>
          <div class="mhead">${d.mode === "create" ? "Neuer Termin" : "Termin bearbeiten"}</div>
          ${d.recurrence_id
            ? html`<div class="note">
                Serientermin (${recurLabel(d.recurOrig, d.rrule) || "wiederkehrend"}) – beim Speichern oder Löschen wirst du
                gefragt, ob nur dieser oder auch alle zukünftigen Termine betroffen sind.
              </div>`
            : ""}
          ${d.error ? html`<div class="err">${d.error}</div>` : ""}

          <div class="fld">
            <span class="lbl">Person</span>
            <div class="chips">
              ${persons.map(
                (p) => html`<button
                  class="chip person ${p.key === d.person ? "on" : ""}"
                  style=${styleMap({
                    borderColor: p.border,
                    background: p.key === d.person ? `rgba(${p.color},0.6)` : `rgba(${p.color},0.16)`,
                  })}
                  @click=${() => this._set("person", p.key)}
                >
                  ${p.label || p.key}
                </button>`
              )}
            </div>
          </div>

          <div class="fld">
            <span class="lbl">Icon</span>
            <div class="chips icons">
              <button class="chip ${!d.iconKey ? "on" : ""}" @click=${() => this._set("iconKey", "")}>–<small>kein</small></button>
              ${iconKeys.map(
                (k) => html`<button class="chip icon ${k === d.iconKey ? "on" : ""}" @click=${() => this._set("iconKey", k)}>
                  ${icons[k]}<small>${k}</small>
                </button>`
              )}
            </div>
          </div>

          <label class="fld"
            >Titel
            <input
              type="text"
              .value=${d.title}
              placeholder="z.B. Joggen"
              @input=${(e) => this._set("title", e.target.value)}
            />
          </label>

          ${this._renderDatePick()}

          <div class="fld">
            <div class="times">
              <button class="chip toggle ${d.allday ? "on" : ""}" @click=${() => this._set("allday", !d.allday)}>
                ${d.allday ? "☑" : "☐"} Ganztags
              </button>
              ${d.allday
                ? ""
                : html`<button
                      class="chip time ${d.pick === "start" ? "on" : ""}"
                      @click=${() => this._set("pick", d.pick === "start" ? null : "start")}
                    >
                      <small>Von</small>${d.start}
                    </button>
                    <button
                      class="chip time ${d.pick === "end" ? "on" : ""}"
                      @click=${() => this._set("pick", d.pick === "end" ? null : "end")}
                    >
                      <small>Bis</small>${d.end}
                    </button>`}
            </div>
            ${!d.allday && d.pick ? this._renderTimePick(d.pick) : ""}
          </div>

          <div class="fld">
            <span class="lbl">Wiederholen ${d.recur ? html`<b class="val">${recurLabel(d.recur, d.rrule)}</b>` : ""}</span>
            <div class="chips recur">
              ${d.recurrence_id
                ? ""
                : html`<button class="chip ${!d.recur ? "on" : ""}" @click=${() => this._set("recur", "")}>Nie</button>`}
              ${RECUR_PRESETS.map(
                (r) => html`<button class="chip ${r.key === d.recur ? "on" : ""}" @click=${() => this._set("recur", r.key)}>
                  ${r.label}
                </button>`
              )}
              ${d.recur === "custom" ? html`<button class="chip on" title=${d.rrule}>Eigene Regel</button>` : ""}
            </div>
          </div>

          ${this._kbEnabled() ? this._renderKeyboard() : ""}

          <div class="actions">
            ${d.mode === "edit"
              ? html`<button class="del" @click=${this._delete} ?disabled=${d.saving}>Löschen</button>`
              : ""}
            <span class="spacer"></span>
            <button @click=${this._closeDialog} ?disabled=${d.saving}>Abbrechen</button>
            <button class="primary" @click=${this._save} ?disabled=${d.saving}>
              ${d.saving ? "…" : "Speichern"}
            </button>
          </div>
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: block;
    }
    ha-card {
      width: 100%;
      max-width: 100%;
      box-shadow: none;
      border: none;
      background: transparent;
      margin: 0;
      padding: 6px 10px;
      box-sizing: border-box;
      position: relative;
    }
    .ctitle {
      font-weight: bold;
      font-size: 16px;
      margin: 2px 2px 8px;
    }
    .toolbar {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 2px 2px 8px;
    }
    .toolbar button {
      background: rgba(255, 255, 255, 0.1);
      color: inherit;
      border: 1px solid rgba(255, 255, 255, 0.18);
      border-radius: 8px;
      padding: 6px 12px;
      font-size: 14px;
      cursor: pointer;
    }
    .toolbar button.nav {
      font-size: 18px;
      line-height: 1;
      padding: 4px 12px;
    }
    .toolbar button:hover {
      background: rgba(255, 255, 255, 0.18);
    }
    .toolbar .range {
      opacity: 0.75;
      font-size: 14px;
      margin-left: 4px;
    }
    .toolbar .spin {
      opacity: 0.6;
    }
    .wrap {
      width: 100%;
      overflow-x: auto;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      table-layout: fixed;
      font-size: 14px;
      line-height: 1.3;
    }
    col.pcol {
      width: 11%;
    }
    col.dcol {
      width: 12.7%;
    }
    th,
    td {
      border: 1px solid rgba(255, 255, 255, 0.1);
      padding: 7px 8px;
      vertical-align: top;
      text-align: left;
    }
    thead th {
      background: rgba(255, 255, 255, 0.18);
      height: 66px;
      border-bottom: 2px solid rgba(255, 255, 255, 0.45);
      font-weight: bold;
      font-size: 15px;
      vertical-align: middle;
    }
    thead th.corner {
      border-top: none;
      border-left: none;
    }
    thead th .dnum {
      font-size: 13px;
      opacity: 0.7;
      font-weight: normal;
    }
    td.pname {
      font-weight: bold;
      border-left: 6px solid transparent;
      white-space: nowrap;
      vertical-align: top;
    }
    td.cell {
      cursor: pointer;
    }
    td.cell:hover {
      outline: 1px solid rgba(255, 255, 255, 0.25);
      outline-offset: -1px;
    }
    .ev {
      background: rgba(0, 0, 0, 0.28);
      border: 1px solid rgba(255, 255, 255, 0.16);
      border-radius: 7px;
      padding: 5px 8px;
      margin-bottom: 6px;
      word-break: break-word;
      cursor: pointer;
    }
    .ev:hover {
      background: rgba(0, 0, 0, 0.42);
      border-color: rgba(255, 255, 255, 0.34);
    }
    .ev .rec {
      float: right;
      margin-left: 4px;
      opacity: 0.6;
      font-size: 12px;
    }

    /* ---- scope prompt (series: this / this and future / all) ---- */
    .overlay.scope {
      z-index: 9999;
    }
    .modal.scopebox {
      max-width: 440px;
    }
    .scopeopts {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 8px;
    }
    .sopt {
      min-height: 54px;
      font-size: 16px;
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.22);
      background: rgba(255, 255, 255, 0.1);
      color: inherit;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      line-height: 1.2;
    }
    .sopt small {
      font-size: 12px;
      opacity: 0.7;
    }
    .sopt:hover {
      background: rgba(255, 255, 255, 0.18);
    }
    .sopt.del {
      color: #ff9a9a;
      border-color: rgba(211, 47, 47, 0.5);
      background: rgba(211, 47, 47, 0.12);
    }
    .sopt.cancel {
      background: transparent;
      opacity: 0.8;
    }
    .chips.recur .chip {
      min-height: 40px;
      font-size: 14px;
    }
    /* today column highlight sits on top of the per-person background */
    thead th.today {
      border-bottom-color: #ffd54f;
    }
    td.today {
      background: rgba(255, 255, 255, 0.13) !important;
    }

    /* ---- dialog ---- */
    .overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.55);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 20;
    }
    .modal {
      background: var(--ha-card-background, var(--card-background-color, #1c1c1c));
      color: var(--primary-text-color, #e1e1e1);
      border: 1px solid rgba(255, 255, 255, 0.14);
      border-radius: 14px;
      padding: 18px 18px 14px;
      width: min(96vw, 640px);
      max-height: 88vh;
      overflow-y: auto;
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5);
    }
    .mhead {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 12px;
    }
    .note {
      font-size: 12px;
      opacity: 0.7;
      margin-bottom: 8px;
    }
    .err {
      background: rgba(211, 47, 47, 0.18);
      border: 1px solid rgba(211, 47, 47, 0.5);
      color: #ff9a9a;
      border-radius: 8px;
      padding: 7px 10px;
      font-size: 13px;
      margin-bottom: 10px;
    }
    .fld {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 13px;
      opacity: 0.95;
      margin-bottom: 10px;
    }
    .fld input,
    .fld select {
      font-size: 15px;
      padding: 8px 10px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.06);
      color: inherit;
    }
    .chk {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 14px;
      margin-bottom: 10px;
      cursor: pointer;
    }
    .chk input {
      width: 18px;
      height: 18px;
    }
    .times {
      display: flex;
      gap: 10px;
    }
    .times .fld {
      flex: 1;
    }
    .actions {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 6px;
    }
    .actions .spacer {
      flex: 1;
    }
    .actions button {
      font-size: 14px;
      padding: 9px 16px;
      border-radius: 9px;
      border: 1px solid rgba(255, 255, 255, 0.2);
      background: rgba(255, 255, 255, 0.08);
      color: inherit;
      cursor: pointer;
    }
    .actions button:hover {
      background: rgba(255, 255, 255, 0.16);
    }
    .actions button.primary {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
      color: #fff;
    }
    .actions button.del {
      color: #ff9a9a;
      border-color: rgba(211, 47, 47, 0.5);
      background: rgba(211, 47, 47, 0.12);
    }
    .actions button[disabled] {
      opacity: 0.5;
      cursor: default;
    }

    /* ---- on-screen keyboard ---- */
    .modal.wide {
      width: min(96vw, 640px);
    }
    .kb {
      margin: 4px 0 12px;
      user-select: none;
      touch-action: manipulation;
    }
    .kbrow {
      display: flex;
      gap: 6px;
      margin-bottom: 6px;
    }
    .kb .key {
      flex: 1 1 0;
      min-width: 0;
      min-height: 46px;
      font-size: 17px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      background: rgba(255, 255, 255, 0.09);
      color: inherit;
      cursor: pointer;
      padding: 0;
    }
    .kb .key:active {
      background: rgba(255, 255, 255, 0.28);
    }
    .kb .key.wide {
      flex: 1.6 1 0;
      font-size: 18px;
    }
    .kb .key.active {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
      color: #fff;
    }
    .kb .key.space {
      flex: 1 1 100%;
      min-height: 44px;
      font-size: 15px;
      letter-spacing: 0.5px;
    }

    /* ---- drag & drop ---- */
    .ev {
      touch-action: none;
      user-select: none;
      -webkit-user-select: none;
    }
    .ev.lifted {
      opacity: 0.35;
    }
    td.cell.dropover {
      outline: 2px solid #ffd54f;
      outline-offset: -2px;
    }
    .ghost {
      position: fixed;
      z-index: 31;
      pointer-events: none;
      background: rgba(28, 31, 36, 0.96);
      border: 1px solid rgba(255, 255, 255, 0.35);
      border-radius: 8px;
      padding: 6px 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
      transform: scale(1.05);
      font-size: 14px;
      line-height: 1.3;
      word-break: break-word;
    }
    .ghost .gt {
      font-size: 12px;
      margin-top: 5px;
      color: #ffd54f;
    }
    .droppanel {
      position: fixed;
      z-index: 30;
      background: #1d2026;
      border: 1px solid rgba(255, 255, 255, 0.28);
      border-radius: 12px;
      box-shadow: 0 14px 40px rgba(0, 0, 0, 0.6);
      overflow: hidden;
      font-size: 14px;
      user-select: none;
    }
    .drow {
      height: 34px;
      line-height: 34px;
      padding: 0 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      display: flex;
      justify-content: space-between;
      align-items: center;
      white-space: nowrap;
    }
    .drow.head {
      height: 36px;
      background: rgba(255, 255, 255, 0.12);
      font-weight: 600;
      font-size: 13px;
      border-top: none;
    }
    .drow.head .hint {
      font-weight: normal;
      opacity: 0.7;
      font-size: 12px;
      margin-left: 8px;
    }
    .drow.allday {
      font-style: italic;
      opacity: 0.9;
    }
    .drow.hot {
      background: var(--primary-color, #03a9f4);
      color: #fff;
      opacity: 1;
    }
    .drow .sel {
      font-weight: 700;
    }
    .toast {
      position: fixed;
      left: 50%;
      bottom: 24px;
      transform: translateX(-50%);
      background: rgba(20, 22, 26, 0.95);
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: 10px;
      padding: 10px 16px;
      z-index: 32;
      font-size: 14px;
    }
    .toast.err {
      border-color: rgba(211, 47, 47, 0.6);
      color: #ff9a9a;
    }

    /* ---- touch-native dialog controls (chips instead of native pickers) ---- */
    .lbl {
      display: block;
      font-size: 13px;
      opacity: 0.9;
      margin-bottom: 6px;
    }
    .lbl .val {
      margin-left: 8px;
      font-size: 14px;
      opacity: 1;
    }
    .chips {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .chip {
      min-height: 44px;
      padding: 0 12px;
      border-radius: 10px;
      border: 1px solid rgba(255, 255, 255, 0.22);
      background: rgba(255, 255, 255, 0.08);
      color: inherit;
      font-size: 15px;
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      line-height: 1.15;
      -webkit-tap-highlight-color: rgba(255, 255, 255, 0.2);
    }
    .chip small {
      font-size: 11px;
      opacity: 0.75;
      font-weight: normal;
    }
    .chip.on {
      background: var(--primary-color, #03a9f4);
      border-color: var(--primary-color, #03a9f4);
      color: #fff;
    }
    .chip.on small {
      opacity: 0.9;
    }
    .chip.person.on {
      color: #fff;
      font-weight: 600;
    }
    .chips.icons {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
    }
    .chips.icons .chip {
      padding: 0 6px;
      min-width: 0;
    }
    .chips.icons .chip.icon {
      font-size: 20px;
    }
    .daterow {
      display: flex;
      gap: 6px;
      align-items: stretch;
    }
    .daterow .chip.day {
      flex: 1;
      min-width: 0;
      padding: 0 4px;
      font-size: 14px;
    }
    .daterow .chip.nav {
      flex: 0 0 40px;
      padding: 0;
      font-size: 22px;
    }
    .chip.toggle {
      flex: 0 0 auto;
      padding: 0 14px;
    }
    .chip.time {
      flex: 1;
      font-size: 20px;
      font-weight: 600;
    }
    .tpick {
      margin-top: 8px;
      padding: 10px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.12);
    }

    /* ---- iOS-style time wheels ---- */
    .wheelrow {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }
    .wlabel {
      font-size: 14px;
      opacity: 0.8;
      width: 36px;
    }
    .wheelwrap {
      position: relative;
      width: 112px;
      height: 220px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.04);
    }
    .wheelwrap::before {
      content: "";
      position: absolute;
      left: 6px;
      right: 6px;
      top: 88px;
      height: 44px;
      border-top: 1px solid rgba(255, 255, 255, 0.35);
      border-bottom: 1px solid rgba(255, 255, 255, 0.35);
      border-radius: 8px;
      pointer-events: none;
    }
    .wheel {
      height: 220px;
      overflow-y: auto;
      scroll-snap-type: y mandatory;
      scrollbar-width: none;
      -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 30%, #000 70%, transparent 100%);
      mask-image: linear-gradient(to bottom, transparent 0, #000 30%, #000 70%, transparent 100%);
    }
    .wheel::-webkit-scrollbar {
      display: none;
    }
    .wheel {
      cursor: grab;
      user-select: none;
      -webkit-user-select: none;
    }
    .wheel.dragging {
      scroll-snap-type: none;
      cursor: grabbing;
    }
    .wpad {
      height: 88px;
    }
    .witem {
      height: 44px;
      line-height: 44px;
      text-align: center;
      font-size: 24px;
      scroll-snap-align: center;
      opacity: 0.5;
      font-variant-numeric: tabular-nums;
    }
    .witem.on {
      opacity: 1;
      font-weight: 700;
    }
    .wcolon {
      font-size: 28px;
      font-weight: 700;
      opacity: 0.8;
    }
    .wactions {
      display: flex;
      justify-content: flex-end;
      margin-top: 8px;
    }

    /* ---- drop panel: minutes flyout ---- */
    .droppanel {
      display: flex;
      align-items: flex-start;
    }
    .dpmain {
      flex: 1;
      min-width: 0;
    }
    .dpfly {
      width: 104px;
      border-left: 1px solid rgba(255, 255, 255, 0.16);
      background: rgba(255, 255, 255, 0.04);
    }
    .drow.fly {
      justify-content: center;
      font-variant-numeric: tabular-nums;
    }
    .drow.open {
      background: rgba(255, 255, 255, 0.1);
    }
    .drow.open.hot {
      background: var(--primary-color, #03a9f4);
    }
  `;
}

customElements.define("family-week-planner-card", FamilyWeekPlannerCard);

window.customCards = window.customCards || [];
window.customCards.push({
  type: "family-week-planner-card",
  name: "Family Week Planner",
  description: "Editable person-by-day family week planner over one calendar entity (Person|Icon: Title events).",
  preview: false,
  documentationURL: "https://github.com/psewar/family-week-planner-card",
});

/**
 * fwp-reload-card — tiny companion card for kiosk dashboards: one tap performs a
 * real full-page reload (location.reload()). Needed because Home Assistant routes
 * same-origin links internally (SPA) and offers no built-in "hard reload" action.
 */
class FwpReloadCard extends LitElement {
  setConfig(config) {
    this._cfg = {
      label: (config && config.label) || "Dashboard neu laden",
      icon: config && config.icon !== undefined ? config.icon : "🔄",
    };
  }
  set hass(h) {
    this._hass = h;
  }
  getCardSize() {
    return 1;
  }
  render() {
    const c = this._cfg || {};
    return html`<ha-card>
      <button class="reload" @click=${() => window.location.reload()}>
        ${c.icon ? html`<span class="ic">${c.icon}</span>` : ""}<span>${c.label}</span>
      </button>
    </ha-card>`;
  }
  static styles = css`
    ha-card {
      background: transparent;
      border: none;
      box-shadow: none;
      padding: 0;
    }
    .reload {
      width: 100%;
      min-height: 64px;
      font-size: 18px;
      font-weight: 600;
      border-radius: 14px;
      border: 1px solid rgba(255, 255, 255, 0.18);
      background: rgba(255, 255, 255, 0.1);
      color: var(--primary-text-color, #e6e6e6);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      -webkit-tap-highlight-color: rgba(255, 255, 255, 0.2);
    }
    .reload:active {
      background: rgba(255, 255, 255, 0.22);
    }
    .ic {
      font-size: 22px;
    }
  `;
}
customElements.define("fwp-reload-card", FwpReloadCard);
window.customCards.push({
  type: "fwp-reload-card",
  name: "FWP Kiosk Reload",
  description: "One-tap full page reload for kiosk dashboards (companion to Family Week Planner).",
  preview: false,
  documentationURL: "https://github.com/psewar/family-week-planner-card",
});

// eslint-disable-next-line no-console
console.info(
  `%c family-week-planner-card %c v${CARD_VERSION} `,
  "color:#fff;background:#7e57c2;border-radius:4px 0 0 4px;padding:2px 4px",
  "color:#7e57c2;background:#eee;border-radius:0 4px 4px 0;padding:2px 4px"
);
