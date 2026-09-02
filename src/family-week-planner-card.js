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

const CARD_VERSION = "0.1.1";

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
  };

  constructor() {
    super();
    this._events = [];
    this._loading = false;
    this._dialog = null;
    this._weekStart = mondayOf(new Date());
    this._hass = null;
    this._lastEntityUpdated = undefined;
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
                    return html`<td
                      class=${classMap({ today: i === todayCol, cell: true })}
                      style=${styleMap({ height: rowH, background: `rgba(${p.color},${p.alpha ?? 0.13})` })}
                      @click=${() => this._openCreate(p, d)}
                      title="Neuen Termin für ${p.label || p.key} am ${fmtDM(d)} anlegen"
                    >
                      ${cellItems.map(
                        (it) => html`<div
                          class="ev"
                          @click=${(e) => {
                            e.stopPropagation();
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

  _renderDialog() {
    const d = this._dialog;
    const persons = this._persons();
    const iconKeys = Object.keys(this._icons());
    return html`
      <div class="overlay" @click=${this._onOverlayClick}>
        <div class="modal" @click=${(e) => e.stopPropagation()}>
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

// eslint-disable-next-line no-console
console.info(
  `%c family-week-planner-card %c v${CARD_VERSION} `,
  "color:#fff;background:#7e57c2;border-radius:4px 0 0 4px;padding:2px 4px",
  "color:#7e57c2;background:#eee;border-radius:0 4px 4px 0;padding:2px 4px"
);
