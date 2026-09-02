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

const CARD_VERSION = "0.3.0";

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

class FamilyWeekPlannerCard extends LitElement {
  static properties = {
    _weekStart: { state: true },
    _events: { state: true },
    _loading: { state: true },
    _dialog: { state: true },
    _kbShift: { state: true },
    _drag: { state: true },
    _toast: { state: true },
  };

  constructor() {
    super();
    this._events = [];
    this._loading = false;
    this._dialog = null;
    this._weekStart = mondayOf(new Date());
    this._hass = null;
    this._lastEntityUpdated = undefined;
    this._kbShift = false;
    this._drag = null; // active drag: {item, el, x, y, grabDX, grabDY, w, target, hoverT, panelRect}
    this._pending = null; // pointer down, not lifted yet
    this._pressTimer = null;
    this._suppressClickUntil = 0;
    this._toast = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this._onKey = (e) => {
      if (e.key === "Escape" && this._drag) this._evPointerCancel();
    };
    window.addEventListener("keydown", this._onKey);
  }
  disconnectedCallback() {
    window.removeEventListener("keydown", this._onKey);
    super.disconnectedCallback();
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
      row_height: config.row_height ?? 210,
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
  }
  get hass() {
    return this._hass;
  }

  _persons() {
    return this.config.persons;
  }
  _icons() {
    return this.config.icons;
  }
  _iconEmoji(key) {
    if (!key) return "";
    const k = Object.keys(this.config.icons).find((x) => x.toLowerCase() === String(key).toLowerCase());
    return k ? this.config.icons[k] : "";
  }
  _normIconKey(key) {
    if (!key) return "";
    const k = Object.keys(this.config.icons).find((x) => x.toLowerCase() === String(key).toLowerCase());
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
      recurring: !!raw.recurrence_id || !!raw.rrule,
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
    return { event: { summary, dtstart, dtend } };
  }

  async _save() {
    const built = this._buildEventPayload();
    if (built.error) {
      this._set("error", built.error);
      return;
    }
    const d = this._dialog;
    this._dialog = { ...this._dialog, saving: true, error: "" };
    try {
      if (d.mode === "create") {
        try {
          await this._hass.callWS({
            type: "calendar/event/create",
            entity_id: this.config.entity,
            event: built.event,
          });
        } catch (e) {
          // Some CalDAV backends (e.g. the n0tcaldav fork) write the event but
          // then throw a serialization error on the response. Don't fail blindly:
          // read the calendar back and treat it as success only if the event is
          // actually there. A genuine failure still surfaces the error.
          const ok = await this._verifyCreated(built.event);
          if (!ok) throw e;
        }
      } else {
        const msg = {
          type: "calendar/event/update",
          entity_id: this.config.entity,
          uid: d.uid,
          event: built.event,
        };
        if (d.recurrence_id) {
          msg.recurrence_id = d.recurrence_id;
          msg.recurrence_range = ""; // this occurrence only
        }
        await this._hass.callWS(msg);
      }
      this._closeDialog();
      await this._reload();
    } catch (e) {
      this._dialog = { ...this._dialog, saving: false, error: this._errText(e) };
    }
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
    this._dialog = { ...this._dialog, saving: true, error: "" };
    try {
      const msg = { type: "calendar/event/delete", entity_id: this.config.entity, uid: d.uid };
      if (d.recurrence_id) {
        msg.recurrence_id = d.recurrence_id;
        msg.recurrence_range = "";
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
    this._clearPress();
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
  _lift() {
    const p = this._pending;
    if (!p) return;
    this._clearPress();
    try {
      p.el.setPointerCapture(p.pointerId);
    } catch (_) {
      /* ignore */
    }
    this._pending = null;
    this._drag = { ...p };
    this._updateDragTarget(p.x, p.y);
  }
  _evPointerMove(e) {
    const p = this._pending;
    if (p && !this._drag) {
      p.x = e.clientX;
      p.y = e.clientY;
      const moved = Math.hypot(e.clientX - p.startX, e.clientY - p.startY);
      if (p.type === "mouse") {
        if (moved > 8) this._lift();
      } else if (moved > 12) {
        this._clearPress(); // finger slipped before the long-press -> no drag
        this._pending = null;
      }
      return;
    }
    if (!this._drag) return;
    e.preventDefault();
    this._drag = { ...this._drag, x: e.clientX, y: e.clientY };
    this._updateDragTarget(e.clientX, e.clientY);
  }
  _evPointerUp(e) {
    this._clearPress();
    if (this._drag) {
      e.preventDefault();
      this._suppressClickUntil = Date.now() + 500;
      const d = this._drag;
      this._drag = null;
      try {
        d.el.releasePointerCapture(d.pointerId);
      } catch (_) {
        /* ignore */
      }
      if (d.target) this._performDrop(d);
    }
    this._pending = null;
  }
  _evPointerCancel() {
    this._clearPress();
    this._pending = null;
    this._drag = null;
  }

  _updateDragTarget(x, y) {
    const d = this._drag;
    if (!d) return;
    const el = this.shadowRoot.elementFromPoint(x, y);
    const closest = (sel) => (el && el.closest ? el.closest(sel) : null);
    let { target, hoverT, panelRect } = d;
    const row = closest(".drow");
    if (row) {
      const t = row.dataset.t;
      if (t === "keep" || t === "allday") hoverT = t;
      else {
        const rr = row.getBoundingClientRect();
        hoverT = `${t}:${y > rr.top + rr.height / 2 ? "30" : "00"}`;
      }
    } else if (closest(".droppanel")) {
      // over panel chrome (borders/gaps): keep the last choice
    } else {
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
    this._drag = { ...d, target, hoverT, panelRect };
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
      msg.recurrence_id = raw.recurrence_id;
      msg.recurrence_range = "";
    }
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
    const W = Math.max(d.panelRect.width, 190);
    const H = 36 + 34 * (1 + hours.length);
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const left = Math.min(Math.max(8, d.panelRect.left), Math.max(8, vw - W - 8));
    const top = Math.min(Math.max(8, d.panelRect.top), Math.max(8, vh - H - 8));
    const day = addDays(this._weekStart, d.target.day);
    const person = this._persons().find((p) => p.key === d.target.person);
    const hot = (t) => d.hoverT === t || (!!d.hoverT && d.hoverT.startsWith(t + ":"));
    return html`<div class="droppanel" style=${styleMap({ left: `${left}px`, top: `${top}px`, width: `${W}px` })}>
      <div class="drow head ${d.hoverT === "keep" ? "hot" : ""}" data-t="keep">
        <span>${WEEKDAYS[d.target.day]} ${fmtDM(day)} · ${person ? person.label || person.key : ""}</span>
        <span class="hint">Zeit behalten</span>
      </div>
      <div class="drow allday ${hot("allday") ? "hot" : ""}" data-t="allday">Ganztags</div>
      ${hours.map(
        (hh) => html`<div class="drow ${hot(hh) ? "hot" : ""}" data-t=${hh}>
          <span>${hh}:00</span>${hot(hh) ? html`<span class="sel">${d.hoverT}</span>` : ""}
        </div>`
      )}
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
    const rowH = `${this.config.row_height}px`;

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
                          @pointermove=${(e) => this._evPointerMove(e)}
                          @pointerup=${(e) => this._evPointerUp(e)}
                          @pointercancel=${() => this._evPointerCancel()}
                          @dragstart=${(e) => e.preventDefault()}
                          @contextmenu=${(e) => e.preventDefault()}
                          @click=${(e) => {
                            e.stopPropagation();
                            if (Date.now() < this._suppressClickUntil) return;
                            this._openEdit(it);
                          }}
                        >
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

  _renderDialog() {
    const d = this._dialog;
    const persons = this._persons();
    const iconKeys = Object.keys(this._icons());
    return html`
      <div class="overlay" @click=${this._onOverlayClick}>
        <div class="modal ${this._kbEnabled() ? "wide" : ""}" @click=${(e) => e.stopPropagation()}>
          <div class="mhead">${d.mode === "create" ? "Neuer Termin" : "Termin bearbeiten"}</div>
          ${d.recurring ? html`<div class="note">Serientermin – Änderungen betreffen diesen Termin.</div>` : ""}
          ${d.error ? html`<div class="err">${d.error}</div>` : ""}

          <label class="fld"
            >Person
            <select @change=${(e) => this._set("person", e.target.value)}>
              ${persons.map(
                (p) => html`<option value=${p.key} ?selected=${p.key === d.person}>${p.label || p.key}</option>`
              )}
            </select>
          </label>

          <label class="fld"
            >Icon
            <select @change=${(e) => this._set("iconKey", e.target.value)}>
              <option value="" ?selected=${!d.iconKey}>(kein)</option>
              ${iconKeys.map(
                (k) => html`<option value=${k} ?selected=${k === d.iconKey}>${this._icons()[k]} ${k}</option>`
              )}
            </select>
          </label>

          <label class="fld"
            >Titel
            <input
              type="text"
              .value=${d.title}
              placeholder="z.B. Joggen"
              @input=${(e) => this._set("title", e.target.value)}
            />
          </label>

          <label class="chk">
            <input type="checkbox" .checked=${d.allday} @change=${(e) => this._set("allday", e.target.checked)} />
            Ganztags
          </label>

          <label class="fld"
            >Datum
            <input type="date" .value=${d.date} @input=${(e) => this._set("date", e.target.value)} />
          </label>

          ${d.allday
            ? ""
            : html`<div class="times">
                <label class="fld"
                  >Von
                  <input type="time" .value=${d.start} @input=${(e) => this._set("start", e.target.value)} />
                </label>
                <label class="fld"
                  >Bis
                  <input type="time" .value=${d.end} @input=${(e) => this._set("end", e.target.value)} />
                </label>
              </div>`}

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
      width: min(92vw, 380px);
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
