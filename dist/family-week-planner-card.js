var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// node_modules/@lit/reactive-element/css-tag.js
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t = globalThis;
var e = t.ShadowRoot && (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype;
var s = Symbol();
var o = /* @__PURE__ */ new WeakMap();
var n = class {
  constructor(t4, e6, o6) {
    if (this._$cssResult$ = true, o6 !== s) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t4, this.t = e6;
  }
  get styleSheet() {
    let t4 = this.o;
    const s4 = this.t;
    if (e && void 0 === t4) {
      const e6 = void 0 !== s4 && 1 === s4.length;
      e6 && (t4 = o.get(s4)), void 0 === t4 && ((this.o = t4 = new CSSStyleSheet()).replaceSync(this.cssText), e6 && o.set(s4, t4));
    }
    return t4;
  }
  toString() {
    return this.cssText;
  }
};
var r = (t4) => new n("string" == typeof t4 ? t4 : t4 + "", void 0, s);
var i = (t4, ...e6) => {
  const o6 = 1 === t4.length ? t4[0] : e6.reduce((e7, s4, o7) => e7 + ((t5) => {
    if (true === t5._$cssResult$) return t5.cssText;
    if ("number" == typeof t5) return t5;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + t5 + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(s4) + t4[o7 + 1], t4[0]);
  return new n(o6, t4, s);
};
var S = (s4, o6) => {
  if (e) s4.adoptedStyleSheets = o6.map((t4) => t4 instanceof CSSStyleSheet ? t4 : t4.styleSheet);
  else for (const e6 of o6) {
    const o7 = document.createElement("style"), n5 = t.litNonce;
    void 0 !== n5 && o7.setAttribute("nonce", n5), o7.textContent = e6.cssText, s4.appendChild(o7);
  }
};
var c = e ? (t4) => t4 : (t4) => t4 instanceof CSSStyleSheet ? ((t5) => {
  let e6 = "";
  for (const s4 of t5.cssRules) e6 += s4.cssText;
  return r(e6);
})(t4) : t4;

// node_modules/@lit/reactive-element/reactive-element.js
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var { is: i2, defineProperty: e2, getOwnPropertyDescriptor: h, getOwnPropertyNames: r2, getOwnPropertySymbols: o2, getPrototypeOf: n2 } = Object;
var a = globalThis;
var c2 = a.trustedTypes;
var l = c2 ? c2.emptyScript : "";
var p = a.reactiveElementPolyfillSupport;
var d = (t4, s4) => t4;
var u = { toAttribute(t4, s4) {
  switch (s4) {
    case Boolean:
      t4 = t4 ? l : null;
      break;
    case Object:
    case Array:
      t4 = null == t4 ? t4 : JSON.stringify(t4);
  }
  return t4;
}, fromAttribute(t4, s4) {
  let i7 = t4;
  switch (s4) {
    case Boolean:
      i7 = null !== t4;
      break;
    case Number:
      i7 = null === t4 ? null : Number(t4);
      break;
    case Object:
    case Array:
      try {
        i7 = JSON.parse(t4);
      } catch (t5) {
        i7 = null;
      }
  }
  return i7;
} };
var f = (t4, s4) => !i2(t4, s4);
var b = { attribute: true, type: String, converter: u, reflect: false, useDefault: false, hasChanged: f };
Symbol.metadata ??= Symbol("metadata"), a.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
var y = class extends HTMLElement {
  static addInitializer(t4) {
    this._$Ei(), (this.l ??= []).push(t4);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t4, s4 = b) {
    if (s4.state && (s4.attribute = false), this._$Ei(), this.prototype.hasOwnProperty(t4) && ((s4 = Object.create(s4)).wrapped = true), this.elementProperties.set(t4, s4), !s4.noAccessor) {
      const i7 = Symbol(), h3 = this.getPropertyDescriptor(t4, i7, s4);
      void 0 !== h3 && e2(this.prototype, t4, h3);
    }
  }
  static getPropertyDescriptor(t4, s4, i7) {
    const { get: e6, set: r4 } = h(this.prototype, t4) ?? { get() {
      return this[s4];
    }, set(t5) {
      this[s4] = t5;
    } };
    return { get: e6, set(s5) {
      const h3 = e6?.call(this);
      r4?.call(this, s5), this.requestUpdate(t4, h3, i7);
    }, configurable: true, enumerable: true };
  }
  static getPropertyOptions(t4) {
    return this.elementProperties.get(t4) ?? b;
  }
  static _$Ei() {
    if (this.hasOwnProperty(d("elementProperties"))) return;
    const t4 = n2(this);
    t4.finalize(), void 0 !== t4.l && (this.l = [...t4.l]), this.elementProperties = new Map(t4.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(d("finalized"))) return;
    if (this.finalized = true, this._$Ei(), this.hasOwnProperty(d("properties"))) {
      const t5 = this.properties, s4 = [...r2(t5), ...o2(t5)];
      for (const i7 of s4) this.createProperty(i7, t5[i7]);
    }
    const t4 = this[Symbol.metadata];
    if (null !== t4) {
      const s4 = litPropertyMetadata.get(t4);
      if (void 0 !== s4) for (const [t5, i7] of s4) this.elementProperties.set(t5, i7);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t5, s4] of this.elementProperties) {
      const i7 = this._$Eu(t5, s4);
      void 0 !== i7 && this._$Eh.set(i7, t5);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(s4) {
    const i7 = [];
    if (Array.isArray(s4)) {
      const e6 = new Set(s4.flat(1 / 0).reverse());
      for (const s5 of e6) i7.unshift(c(s5));
    } else void 0 !== s4 && i7.push(c(s4));
    return i7;
  }
  static _$Eu(t4, s4) {
    const i7 = s4.attribute;
    return false === i7 ? void 0 : "string" == typeof i7 ? i7 : "string" == typeof t4 ? t4.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = false, this.hasUpdated = false, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((t4) => this.enableUpdating = t4), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((t4) => t4(this));
  }
  addController(t4) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(t4), void 0 !== this.renderRoot && this.isConnected && t4.hostConnected?.();
  }
  removeController(t4) {
    this._$EO?.delete(t4);
  }
  _$E_() {
    const t4 = /* @__PURE__ */ new Map(), s4 = this.constructor.elementProperties;
    for (const i7 of s4.keys()) this.hasOwnProperty(i7) && (t4.set(i7, this[i7]), delete this[i7]);
    t4.size > 0 && (this._$Ep = t4);
  }
  createRenderRoot() {
    const t4 = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return S(t4, this.constructor.elementStyles), t4;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(true), this._$EO?.forEach((t4) => t4.hostConnected?.());
  }
  enableUpdating(t4) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((t4) => t4.hostDisconnected?.());
  }
  attributeChangedCallback(t4, s4, i7) {
    this._$AK(t4, i7);
  }
  _$ET(t4, s4) {
    const i7 = this.constructor.elementProperties.get(t4), e6 = this.constructor._$Eu(t4, i7);
    if (void 0 !== e6 && true === i7.reflect) {
      const h3 = (void 0 !== i7.converter?.toAttribute ? i7.converter : u).toAttribute(s4, i7.type);
      this._$Em = t4, null == h3 ? this.removeAttribute(e6) : this.setAttribute(e6, h3), this._$Em = null;
    }
  }
  _$AK(t4, s4) {
    const i7 = this.constructor, e6 = i7._$Eh.get(t4);
    if (void 0 !== e6 && this._$Em !== e6) {
      const t5 = i7.getPropertyOptions(e6), h3 = "function" == typeof t5.converter ? { fromAttribute: t5.converter } : void 0 !== t5.converter?.fromAttribute ? t5.converter : u;
      this._$Em = e6;
      const r4 = h3.fromAttribute(s4, t5.type);
      this[e6] = r4 ?? this._$Ej?.get(e6) ?? r4, this._$Em = null;
    }
  }
  requestUpdate(t4, s4, i7, e6 = false, h3) {
    if (void 0 !== t4) {
      const r4 = this.constructor;
      if (false === e6 && (h3 = this[t4]), i7 ??= r4.getPropertyOptions(t4), !((i7.hasChanged ?? f)(h3, s4) || i7.useDefault && i7.reflect && h3 === this._$Ej?.get(t4) && !this.hasAttribute(r4._$Eu(t4, i7)))) return;
      this.C(t4, s4, i7);
    }
    false === this.isUpdatePending && (this._$ES = this._$EP());
  }
  C(t4, s4, { useDefault: i7, reflect: e6, wrapped: h3 }, r4) {
    i7 && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(t4) && (this._$Ej.set(t4, r4 ?? s4 ?? this[t4]), true !== h3 || void 0 !== r4) || (this._$AL.has(t4) || (this.hasUpdated || i7 || (s4 = void 0), this._$AL.set(t4, s4)), true === e6 && this._$Em !== t4 && (this._$Eq ??= /* @__PURE__ */ new Set()).add(t4));
  }
  async _$EP() {
    this.isUpdatePending = true;
    try {
      await this._$ES;
    } catch (t5) {
      Promise.reject(t5);
    }
    const t4 = this.scheduleUpdate();
    return null != t4 && await t4, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [t6, s5] of this._$Ep) this[t6] = s5;
        this._$Ep = void 0;
      }
      const t5 = this.constructor.elementProperties;
      if (t5.size > 0) for (const [s5, i7] of t5) {
        const { wrapped: t6 } = i7, e6 = this[s5];
        true !== t6 || this._$AL.has(s5) || void 0 === e6 || this.C(s5, void 0, i7, e6);
      }
    }
    let t4 = false;
    const s4 = this._$AL;
    try {
      t4 = this.shouldUpdate(s4), t4 ? (this.willUpdate(s4), this._$EO?.forEach((t5) => t5.hostUpdate?.()), this.update(s4)) : this._$EM();
    } catch (s5) {
      throw t4 = false, this._$EM(), s5;
    }
    t4 && this._$AE(s4);
  }
  willUpdate(t4) {
  }
  _$AE(t4) {
    this._$EO?.forEach((t5) => t5.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = true, this.firstUpdated(t4)), this.updated(t4);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = false;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t4) {
    return true;
  }
  update(t4) {
    this._$Eq &&= this._$Eq.forEach((t5) => this._$ET(t5, this[t5])), this._$EM();
  }
  updated(t4) {
  }
  firstUpdated(t4) {
  }
};
y.elementStyles = [], y.shadowRootOptions = { mode: "open" }, y[d("elementProperties")] = /* @__PURE__ */ new Map(), y[d("finalized")] = /* @__PURE__ */ new Map(), p?.({ ReactiveElement: y }), (a.reactiveElementVersions ??= []).push("2.1.2");

// node_modules/lit-html/lit-html.js
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t2 = globalThis;
var i3 = (t4) => t4;
var s2 = t2.trustedTypes;
var e3 = s2 ? s2.createPolicy("lit-html", { createHTML: (t4) => t4 }) : void 0;
var h2 = "$lit$";
var o3 = `lit$${Math.random().toFixed(9).slice(2)}$`;
var n3 = "?" + o3;
var r3 = `<${n3}>`;
var l2 = document;
var c3 = () => l2.createComment("");
var a2 = (t4) => null === t4 || "object" != typeof t4 && "function" != typeof t4;
var u2 = Array.isArray;
var d2 = (t4) => u2(t4) || "function" == typeof t4?.[Symbol.iterator];
var f2 = "[ 	\n\f\r]";
var v = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g;
var _ = /-->/g;
var m = />/g;
var p2 = RegExp(`>|${f2}(?:([^\\s"'>=/]+)(${f2}*=${f2}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g");
var g = /'/g;
var $ = /"/g;
var y2 = /^(?:script|style|textarea|title)$/i;
var x = (t4) => (i7, ...s4) => ({ _$litType$: t4, strings: i7, values: s4 });
var b2 = x(1);
var w = x(2);
var T = x(3);
var E = Symbol.for("lit-noChange");
var A = Symbol.for("lit-nothing");
var C = /* @__PURE__ */ new WeakMap();
var P = l2.createTreeWalker(l2, 129);
function V(t4, i7) {
  if (!u2(t4) || !t4.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return void 0 !== e3 ? e3.createHTML(i7) : i7;
}
var N = (t4, i7) => {
  const s4 = t4.length - 1, e6 = [];
  let n5, l3 = 2 === i7 ? "<svg>" : 3 === i7 ? "<math>" : "", c4 = v;
  for (let i8 = 0; i8 < s4; i8++) {
    const s5 = t4[i8];
    let a3, u3, d3 = -1, f3 = 0;
    for (; f3 < s5.length && (c4.lastIndex = f3, u3 = c4.exec(s5), null !== u3); ) f3 = c4.lastIndex, c4 === v ? "!--" === u3[1] ? c4 = _ : void 0 !== u3[1] ? c4 = m : void 0 !== u3[2] ? (y2.test(u3[2]) && (n5 = RegExp("</" + u3[2], "g")), c4 = p2) : void 0 !== u3[3] && (c4 = p2) : c4 === p2 ? ">" === u3[0] ? (c4 = n5 ?? v, d3 = -1) : void 0 === u3[1] ? d3 = -2 : (d3 = c4.lastIndex - u3[2].length, a3 = u3[1], c4 = void 0 === u3[3] ? p2 : '"' === u3[3] ? $ : g) : c4 === $ || c4 === g ? c4 = p2 : c4 === _ || c4 === m ? c4 = v : (c4 = p2, n5 = void 0);
    const x2 = c4 === p2 && t4[i8 + 1].startsWith("/>") ? " " : "";
    l3 += c4 === v ? s5 + r3 : d3 >= 0 ? (e6.push(a3), s5.slice(0, d3) + h2 + s5.slice(d3) + o3 + x2) : s5 + o3 + (-2 === d3 ? i8 : x2);
  }
  return [V(t4, l3 + (t4[s4] || "<?>") + (2 === i7 ? "</svg>" : 3 === i7 ? "</math>" : "")), e6];
};
var S2 = class _S {
  constructor({ strings: t4, _$litType$: i7 }, e6) {
    let r4;
    this.parts = [];
    let l3 = 0, a3 = 0;
    const u3 = t4.length - 1, d3 = this.parts, [f3, v2] = N(t4, i7);
    if (this.el = _S.createElement(f3, e6), P.currentNode = this.el.content, 2 === i7 || 3 === i7) {
      const t5 = this.el.content.firstChild;
      t5.replaceWith(...t5.childNodes);
    }
    for (; null !== (r4 = P.nextNode()) && d3.length < u3; ) {
      if (1 === r4.nodeType) {
        if (r4.hasAttributes()) for (const t5 of r4.getAttributeNames()) if (t5.endsWith(h2)) {
          const i8 = v2[a3++], s4 = r4.getAttribute(t5).split(o3), e7 = /([.?@])?(.*)/.exec(i8);
          d3.push({ type: 1, index: l3, name: e7[2], strings: s4, ctor: "." === e7[1] ? I : "?" === e7[1] ? L : "@" === e7[1] ? z : H }), r4.removeAttribute(t5);
        } else t5.startsWith(o3) && (d3.push({ type: 6, index: l3 }), r4.removeAttribute(t5));
        if (y2.test(r4.tagName)) {
          const t5 = r4.textContent.split(o3), i8 = t5.length - 1;
          if (i8 > 0) {
            r4.textContent = s2 ? s2.emptyScript : "";
            for (let s4 = 0; s4 < i8; s4++) r4.append(t5[s4], c3()), P.nextNode(), d3.push({ type: 2, index: ++l3 });
            r4.append(t5[i8], c3());
          }
        }
      } else if (8 === r4.nodeType) if (r4.data === n3) d3.push({ type: 2, index: l3 });
      else {
        let t5 = -1;
        for (; -1 !== (t5 = r4.data.indexOf(o3, t5 + 1)); ) d3.push({ type: 7, index: l3 }), t5 += o3.length - 1;
      }
      l3++;
    }
  }
  static createElement(t4, i7) {
    const s4 = l2.createElement("template");
    return s4.innerHTML = t4, s4;
  }
};
function M(t4, i7, s4 = t4, e6) {
  if (i7 === E) return i7;
  let h3 = void 0 !== e6 ? s4._$Co?.[e6] : s4._$Cl;
  const o6 = a2(i7) ? void 0 : i7._$litDirective$;
  return h3?.constructor !== o6 && (h3?._$AO?.(false), void 0 === o6 ? h3 = void 0 : (h3 = new o6(t4), h3._$AT(t4, s4, e6)), void 0 !== e6 ? (s4._$Co ??= [])[e6] = h3 : s4._$Cl = h3), void 0 !== h3 && (i7 = M(t4, h3._$AS(t4, i7.values), h3, e6)), i7;
}
var R = class {
  constructor(t4, i7) {
    this._$AV = [], this._$AN = void 0, this._$AD = t4, this._$AM = i7;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t4) {
    const { el: { content: i7 }, parts: s4 } = this._$AD, e6 = (t4?.creationScope ?? l2).importNode(i7, true);
    P.currentNode = e6;
    let h3 = P.nextNode(), o6 = 0, n5 = 0, r4 = s4[0];
    for (; void 0 !== r4; ) {
      if (o6 === r4.index) {
        let i8;
        2 === r4.type ? i8 = new k(h3, h3.nextSibling, this, t4) : 1 === r4.type ? i8 = new r4.ctor(h3, r4.name, r4.strings, this, t4) : 6 === r4.type && (i8 = new Z(h3, this, t4)), this._$AV.push(i8), r4 = s4[++n5];
      }
      o6 !== r4?.index && (h3 = P.nextNode(), o6++);
    }
    return P.currentNode = l2, e6;
  }
  p(t4) {
    let i7 = 0;
    for (const s4 of this._$AV) void 0 !== s4 && (void 0 !== s4.strings ? (s4._$AI(t4, s4, i7), i7 += s4.strings.length - 2) : s4._$AI(t4[i7])), i7++;
  }
};
var k = class _k {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(t4, i7, s4, e6) {
    this.type = 2, this._$AH = A, this._$AN = void 0, this._$AA = t4, this._$AB = i7, this._$AM = s4, this.options = e6, this._$Cv = e6?.isConnected ?? true;
  }
  get parentNode() {
    let t4 = this._$AA.parentNode;
    const i7 = this._$AM;
    return void 0 !== i7 && 11 === t4?.nodeType && (t4 = i7.parentNode), t4;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t4, i7 = this) {
    t4 = M(this, t4, i7), a2(t4) ? t4 === A || null == t4 || "" === t4 ? (this._$AH !== A && this._$AR(), this._$AH = A) : t4 !== this._$AH && t4 !== E && this._(t4) : void 0 !== t4._$litType$ ? this.$(t4) : void 0 !== t4.nodeType ? this.T(t4) : d2(t4) ? this.k(t4) : this._(t4);
  }
  O(t4) {
    return this._$AA.parentNode.insertBefore(t4, this._$AB);
  }
  T(t4) {
    this._$AH !== t4 && (this._$AR(), this._$AH = this.O(t4));
  }
  _(t4) {
    this._$AH !== A && a2(this._$AH) ? this._$AA.nextSibling.data = t4 : this.T(l2.createTextNode(t4)), this._$AH = t4;
  }
  $(t4) {
    const { values: i7, _$litType$: s4 } = t4, e6 = "number" == typeof s4 ? this._$AC(t4) : (void 0 === s4.el && (s4.el = S2.createElement(V(s4.h, s4.h[0]), this.options)), s4);
    if (this._$AH?._$AD === e6) this._$AH.p(i7);
    else {
      const t5 = new R(e6, this), s5 = t5.u(this.options);
      t5.p(i7), this.T(s5), this._$AH = t5;
    }
  }
  _$AC(t4) {
    let i7 = C.get(t4.strings);
    return void 0 === i7 && C.set(t4.strings, i7 = new S2(t4)), i7;
  }
  k(t4) {
    u2(this._$AH) || (this._$AH = [], this._$AR());
    const i7 = this._$AH;
    let s4, e6 = 0;
    for (const h3 of t4) e6 === i7.length ? i7.push(s4 = new _k(this.O(c3()), this.O(c3()), this, this.options)) : s4 = i7[e6], s4._$AI(h3), e6++;
    e6 < i7.length && (this._$AR(s4 && s4._$AB.nextSibling, e6), i7.length = e6);
  }
  _$AR(t4 = this._$AA.nextSibling, s4) {
    for (this._$AP?.(false, true, s4); t4 !== this._$AB; ) {
      const s5 = i3(t4).nextSibling;
      i3(t4).remove(), t4 = s5;
    }
  }
  setConnected(t4) {
    void 0 === this._$AM && (this._$Cv = t4, this._$AP?.(t4));
  }
};
var H = class {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t4, i7, s4, e6, h3) {
    this.type = 1, this._$AH = A, this._$AN = void 0, this.element = t4, this.name = i7, this._$AM = e6, this.options = h3, s4.length > 2 || "" !== s4[0] || "" !== s4[1] ? (this._$AH = Array(s4.length - 1).fill(new String()), this.strings = s4) : this._$AH = A;
  }
  _$AI(t4, i7 = this, s4, e6) {
    const h3 = this.strings;
    let o6 = false;
    if (void 0 === h3) t4 = M(this, t4, i7, 0), o6 = !a2(t4) || t4 !== this._$AH && t4 !== E, o6 && (this._$AH = t4);
    else {
      const e7 = t4;
      let n5, r4;
      for (t4 = h3[0], n5 = 0; n5 < h3.length - 1; n5++) r4 = M(this, e7[s4 + n5], i7, n5), r4 === E && (r4 = this._$AH[n5]), o6 ||= !a2(r4) || r4 !== this._$AH[n5], r4 === A ? t4 = A : t4 !== A && (t4 += (r4 ?? "") + h3[n5 + 1]), this._$AH[n5] = r4;
    }
    o6 && !e6 && this.j(t4);
  }
  j(t4) {
    t4 === A ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t4 ?? "");
  }
};
var I = class extends H {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t4) {
    this.element[this.name] = t4 === A ? void 0 : t4;
  }
};
var L = class extends H {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t4) {
    this.element.toggleAttribute(this.name, !!t4 && t4 !== A);
  }
};
var z = class extends H {
  constructor(t4, i7, s4, e6, h3) {
    super(t4, i7, s4, e6, h3), this.type = 5;
  }
  _$AI(t4, i7 = this) {
    if ((t4 = M(this, t4, i7, 0) ?? A) === E) return;
    const s4 = this._$AH, e6 = t4 === A && s4 !== A || t4.capture !== s4.capture || t4.once !== s4.once || t4.passive !== s4.passive, h3 = t4 !== A && (s4 === A || e6);
    e6 && this.element.removeEventListener(this.name, this, s4), h3 && this.element.addEventListener(this.name, this, t4), this._$AH = t4;
  }
  handleEvent(t4) {
    "function" == typeof this._$AH ? this._$AH.call(this.options?.host ?? this.element, t4) : this._$AH.handleEvent(t4);
  }
};
var Z = class {
  constructor(t4, i7, s4) {
    this.element = t4, this.type = 6, this._$AN = void 0, this._$AM = i7, this.options = s4;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t4) {
    M(this, t4);
  }
};
var B = t2.litHtmlPolyfillSupport;
B?.(S2, k), (t2.litHtmlVersions ??= []).push("3.3.3");
var D = (t4, i7, s4) => {
  const e6 = s4?.renderBefore ?? i7;
  let h3 = e6._$litPart$;
  if (void 0 === h3) {
    const t5 = s4?.renderBefore ?? null;
    e6._$litPart$ = h3 = new k(i7.insertBefore(c3(), t5), t5, void 0, s4 ?? {});
  }
  return h3._$AI(t4), h3;
};

// node_modules/lit-element/lit-element.js
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var s3 = globalThis;
var i4 = class extends y {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const t4 = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= t4.firstChild, t4;
  }
  update(t4) {
    const r4 = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t4), this._$Do = D(r4, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(true);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(false);
  }
  render() {
    return E;
  }
};
i4._$litElement$ = true, i4["finalized"] = true, s3.litElementHydrateSupport?.({ LitElement: i4 });
var o4 = s3.litElementPolyfillSupport;
o4?.({ LitElement: i4 });
(s3.litElementVersions ??= []).push("4.2.2");

// node_modules/lit-html/is-server.js
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

// node_modules/lit-html/directive.js
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var t3 = { ATTRIBUTE: 1, CHILD: 2, PROPERTY: 3, BOOLEAN_ATTRIBUTE: 4, EVENT: 5, ELEMENT: 6 };
var e4 = (t4) => (...e6) => ({ _$litDirective$: t4, values: e6 });
var i5 = class {
  constructor(t4) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t4, e6, i7) {
    this._$Ct = t4, this._$AM = e6, this._$Ci = i7;
  }
  _$AS(t4, e6) {
    return this.update(t4, e6);
  }
  update(t4, e6) {
    return this.render(...e6);
  }
};

// node_modules/lit-html/directives/style-map.js
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var n4 = "important";
var i6 = " !" + n4;
var o5 = e4(class extends i5 {
  constructor(t4) {
    if (super(t4), t4.type !== t3.ATTRIBUTE || "style" !== t4.name || t4.strings?.length > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(t4) {
    return Object.keys(t4).reduce((e6, r4) => {
      const s4 = t4[r4];
      return null == s4 ? e6 : e6 + `${r4 = r4.includes("-") ? r4 : r4.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${s4};`;
    }, "");
  }
  update(e6, [r4]) {
    const { style: s4 } = e6.element;
    if (void 0 === this.ft) return this.ft = new Set(Object.keys(r4)), this.render(r4);
    for (const t4 of this.ft) null == r4[t4] && (this.ft.delete(t4), t4.includes("-") ? s4.removeProperty(t4) : s4[t4] = null);
    for (const t4 in r4) {
      const e7 = r4[t4];
      if (null != e7) {
        this.ft.add(t4);
        const r5 = "string" == typeof e7 && e7.endsWith(i6);
        t4.includes("-") || r5 ? s4.setProperty(t4, r5 ? e7.slice(0, -11) : e7, r5 ? n4 : "") : s4[t4] = e7;
      }
    }
    return E;
  }
});

// node_modules/lit-html/directives/class-map.js
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var e5 = e4(class extends i5 {
  constructor(t4) {
    if (super(t4), t4.type !== t3.ATTRIBUTE || "class" !== t4.name || t4.strings?.length > 2) throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.");
  }
  render(t4) {
    return " " + Object.keys(t4).filter((s4) => t4[s4]).join(" ") + " ";
  }
  update(s4, [i7]) {
    if (void 0 === this.st) {
      this.st = /* @__PURE__ */ new Set(), void 0 !== s4.strings && (this.nt = new Set(s4.strings.join(" ").split(/\s/).filter((t4) => "" !== t4)));
      for (const t4 in i7) i7[t4] && !this.nt?.has(t4) && this.st.add(t4);
      return this.render(i7);
    }
    const r4 = s4.element.classList;
    for (const t4 of this.st) t4 in i7 || (r4.remove(t4), this.st.delete(t4));
    for (const t4 in i7) {
      const s5 = !!i7[t4];
      s5 === this.st.has(t4) || this.nt?.has(t4) || (s5 ? (r4.add(t4), this.st.add(t4)) : (r4.remove(t4), this.st.delete(t4)));
    }
    return E;
  }
});

// src/family-week-planner-card.js
var CARD_VERSION = "0.4.0";
var WEEKDAYS = ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
var DEFAULT_PERSONS = [
  { key: "Familie", color: "126,87,194", border: "#7e57c2", text: "#c9b3f0", alpha: 0.13 },
  { key: "Person 1", color: "30,136,229", border: "#1e88e5", text: "#8ecbff", alpha: 0.13 },
  { key: "Person 2", color: "236,64,122", border: "#ec407a", text: "#ff9ec4", alpha: 0.13 },
  { key: "Person 3", color: "0,137,123", border: "#00897b", text: "#5fd4c6", alpha: 0.15 },
  { key: "Person 4", color: "251,140,0", border: "#fb8c00", text: "#ffca7a", alpha: 0.13 },
  { key: "Essen", color: "109,76,65", border: "#6d4c41", text: "#c8b0a4", alpha: 0.16 },
  { key: "Rest", color: "84,110,122", border: "#546e7a", text: "#b0bec5", alpha: 0.14 }
];
var DEFAULT_ICONS = {
  Tanzen: "\u{1F483}",
  Singen: "\u{1F3B5}",
  Chor: "\u{1F3B6}",
  Sport: "\u{1F3CB}\uFE0F",
  Arzt: "\u{1FA7A}",
  Schule: "\u{1F392}",
  Arbeit: "\u{1F4BC}",
  Auto: "\u{1F697}",
  Hund: "\u{1F415}",
  Geburtstag: "\u{1F382}",
  Ausflug: "\u{1F9ED}",
  Einkauf: "\u{1F6D2}",
  Mittag: "\u{1F374}",
  Nacht: "\u{1F319}",
  Konzert: "\u{1F3B8}",
  Biblio: "\u{1F4DA}"
};
var pad = (n5) => String(n5).padStart(2, "0");
var ymd = (d3) => `${d3.getFullYear()}-${pad(d3.getMonth() + 1)}-${pad(d3.getDate())}`;
var hm = (d3) => `${pad(d3.getHours())}:${pad(d3.getMinutes())}`;
var fmtDM = (d3) => `${pad(d3.getDate())}.${pad(d3.getMonth() + 1)}.`;
function addDays(date, n5) {
  const x2 = new Date(date);
  x2.setDate(x2.getDate() + n5);
  return x2;
}
function mondayOf(date) {
  const x2 = new Date(date);
  const day = (x2.getDay() + 6) % 7;
  x2.setDate(x2.getDate() - day);
  x2.setHours(0, 0, 0, 0);
  return x2;
}
function parseDate(str) {
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    const [y3, m2, d3] = str.split("-").map(Number);
    return new Date(y3, m2 - 1, d3);
  }
  return new Date(str);
}
function dayIndex(date, weekStart) {
  const a3 = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const b3 = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate());
  return Math.round((a3 - b3) / 864e5);
}
var FamilyWeekPlannerCard = class extends i4 {
  constructor() {
    super();
    this._events = [];
    this._loading = false;
    this._dialog = null;
    this._weekStart = mondayOf(/* @__PURE__ */ new Date());
    this._hass = null;
    this._lastEntityUpdated = void 0;
    this._kbShift = false;
    this._drag = null;
    this._pending = null;
    this._pressTimer = null;
    this._suppressClickUntil = 0;
    this._toast = null;
  }
  connectedCallback() {
    super.connectedCallback();
    this._onKey = (e6) => {
      if (e6.key === "Escape" && this._drag) this._evPointerCancel();
    };
    window.addEventListener("keydown", this._onKey);
  }
  disconnectedCallback() {
    window.removeEventListener("keydown", this._onKey);
    this._endDrag();
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
      drop_hours: Array.isArray(config.drop_hours) && config.drop_hours.length === 2 ? config.drop_hours : [6, 22]
    };
  }
  set hass(hass) {
    this._hass = hass;
    if (!this.config || !hass) return;
    const st = hass.states[this.config.entity];
    const lu = st ? st.last_updated : "missing";
    if (this._lastEntityUpdated === void 0) {
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
    const k2 = Object.keys(this.config.icons).find((x2) => x2.toLowerCase() === String(key).toLowerCase());
    return k2 ? this.config.icons[k2] : "";
  }
  _normIconKey(key) {
    if (!key) return "";
    const k2 = Object.keys(this.config.icons).find((x2) => x2.toLowerCase() === String(key).toLowerCase());
    return k2 || key;
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
    } catch (e6) {
      console.error("family-week-planner-card: failed to load events", e6);
      this._events = [];
    } finally {
      this._loading = false;
    }
  }
  _parseSummary(summary) {
    const s4 = String(summary || "");
    const ci = s4.indexOf(":");
    let prefix, title;
    if (ci >= 0) {
      prefix = s4.slice(0, ci).trim();
      title = s4.slice(ci + 1).trim();
    } else {
      prefix = s4.trim();
      title = s4.trim();
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
    const match = this._persons().find((p3) => p3.key.toLowerCase() === personRaw.toLowerCase());
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
    const out = [];
    for (const e6 of this._events) {
      const startRaw = e6.start && (e6.start.dateTime || e6.start.date);
      if (!startRaw) continue;
      const allday = !!(e6.start && e6.start.date && !e6.start.dateTime);
      const dt = parseDate(startRaw);
      const off = dayIndex(dt, this._weekStart);
      if (off < 0 || off > 6) continue;
      const { personKey, iconKey, title } = this._parseSummary(e6.summary);
      out.push({
        dayOffset: off,
        personKey,
        emoji: this._iconEmoji(iconKey),
        time: allday ? "" : hm(dt),
        title,
        allday,
        raw: e6
      });
    }
    out.sort((a3, b3) => a3.allday === b3.allday ? a3.time.localeCompare(b3.time) : a3.allday ? -1 : 1);
    return out;
  }
  _todayCol() {
    return dayIndex(/* @__PURE__ */ new Date(), this._weekStart);
  }
  _shiftWeek(delta) {
    this._weekStart = addDays(this._weekStart, delta * 7);
    this._reload();
  }
  _goToday() {
    this._weekStart = mondayOf(/* @__PURE__ */ new Date());
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
      pick: null,
      saving: false,
      error: ""
    };
  }
  _openEdit(it) {
    const raw = it.raw;
    const startRaw = raw.start.dateTime || raw.start.date;
    const endRaw = raw.end && (raw.end.dateTime || raw.end.date);
    const allday = it.allday;
    const s4 = parseDate(startRaw);
    const e6 = endRaw ? parseDate(endRaw) : addDays(s4, allday ? 1 : 0);
    const parsed = this._parseSummary(raw.summary);
    this._dialog = {
      mode: "edit",
      person: parsed.personKey,
      iconKey: parsed.iconKey,
      title: parsed.title,
      allday,
      date: ymd(s4),
      start: allday ? this.config.default_start : hm(s4),
      end: allday ? this.config.default_end : hm(e6),
      uid: raw.uid,
      recurrence_id: raw.recurrence_id || null,
      recurring: !!raw.recurrence_id || !!raw.rrule,
      pick: null,
      saving: false,
      error: ""
    };
  }
  _set(k2, v2) {
    this._dialog = { ...this._dialog, [k2]: v2, error: "" };
  }
  _closeDialog() {
    this._dialog = null;
  }
  _onOverlayClick() {
    this._closeDialog();
  }
  _buildEventPayload() {
    const d3 = this._dialog;
    const title = (d3.title || "").trim();
    if (!title) return { error: "Bitte einen Titel eingeben." };
    const summary = this._composeSummary(d3.person, d3.iconKey, title);
    let dtstart, dtend;
    if (d3.allday) {
      dtstart = d3.date;
      dtend = ymd(addDays(parseDate(d3.date), 1));
    } else {
      if (!d3.start || !d3.end) return { error: "Bitte Von- und Bis-Zeit eingeben." };
      if (d3.end <= d3.start) return { error: "Die Bis-Zeit muss nach der Von-Zeit liegen." };
      dtstart = `${d3.date} ${d3.start}:00`;
      dtend = `${d3.date} ${d3.end}:00`;
    }
    return { event: { summary, dtstart, dtend } };
  }
  async _save() {
    const built = this._buildEventPayload();
    if (built.error) {
      this._set("error", built.error);
      return;
    }
    const d3 = this._dialog;
    this._dialog = { ...this._dialog, saving: true, error: "" };
    try {
      if (d3.mode === "create") {
        try {
          await this._hass.callWS({
            type: "calendar/event/create",
            entity_id: this.config.entity,
            event: built.event
          });
        } catch (e6) {
          const ok = await this._verifyCreated(built.event);
          if (!ok) throw e6;
        }
      } else {
        const msg = {
          type: "calendar/event/update",
          entity_id: this.config.entity,
          uid: d3.uid,
          event: built.event
        };
        if (d3.recurrence_id) {
          msg.recurrence_id = d3.recurrence_id;
          msg.recurrence_range = "";
        }
        await this._hass.callWS(msg);
      }
      this._closeDialog();
      await this._reload();
    } catch (e6) {
      this._dialog = { ...this._dialog, saving: false, error: this._errText(e6) };
    }
  }
  async _verifyCreated(event) {
    const startDay = String(event.dtstart).slice(0, 10);
    for (let i7 = 0; i7 < 4; i7++) {
      await this._reload();
      const hit = this._events.some((e6) => {
        const s4 = e6.start && (e6.start.dateTime || e6.start.date) || "";
        return e6.summary === event.summary && String(s4).slice(0, 10) === startDay;
      });
      if (hit) return true;
      await new Promise((r4) => setTimeout(r4, 800));
    }
    return false;
  }
  async _delete() {
    const d3 = this._dialog;
    if (!d3.uid) {
      this._set("error", "Dieser Termin hat keine ID und kann nicht gel\xF6scht werden.");
      return;
    }
    this._dialog = { ...this._dialog, saving: true, error: "" };
    try {
      const msg = { type: "calendar/event/delete", entity_id: this.config.entity, uid: d3.uid };
      if (d3.recurrence_id) {
        msg.recurrence_id = d3.recurrence_id;
        msg.recurrence_range = "";
      }
      await this._hass.callWS(msg);
      this._closeDialog();
      await this._reload();
    } catch (e6) {
      this._dialog = { ...this._dialog, saving: false, error: this._errText(e6) };
    }
  }
  _errText(e6) {
    if (!e6) return "Unbekannter Fehler.";
    if (typeof e6 === "string") return e6;
    if (e6.message) return e6.message;
    if (e6.error) return e6.error;
    try {
      return JSON.stringify(e6);
    } catch {
      return "Fehler beim Speichern.";
    }
  }
  /* ---------- drag & drop: move an event to another day / time / person ---------- */
  _evPointerDown(e6, it, el) {
    if (!this.config.drag || this._dialog) return;
    if (e6.button !== void 0 && e6.button !== 0) return;
    if (this._drag || this._pending) this._endDrag();
    const r4 = el.getBoundingClientRect();
    const p3 = {
      item: it,
      el,
      pointerId: e6.pointerId,
      type: e6.pointerType,
      startX: e6.clientX,
      startY: e6.clientY,
      x: e6.clientX,
      y: e6.clientY,
      grabDX: e6.clientX - r4.left,
      grabDY: e6.clientY - r4.top,
      w: r4.width,
      target: null,
      hoverT: null,
      panelRect: null
    };
    this._pending = p3;
    this._attachWin();
    if (e6.pointerType !== "mouse") {
      this._pressTimer = setTimeout(() => {
        if (this._pending === p3) this._lift();
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
    this._onWinMove = (e6) => this._evPointerMove(e6);
    this._onWinUp = (e6) => this._evPointerUp(e6);
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
    this._pending = null;
    this._drag = null;
    this._detachWin();
  }
  _lift() {
    const p3 = this._pending;
    if (!p3) return;
    this._clearPress();
    this._pending = null;
    this._drag = { ...p3 };
    this._updateDragTarget(p3.x, p3.y);
  }
  _evPointerMove(e6) {
    const cur = this._drag || this._pending;
    if (!cur || e6.pointerId !== cur.pointerId) return;
    if (!this._drag) {
      const p3 = cur;
      p3.x = e6.clientX;
      p3.y = e6.clientY;
      const moved = Math.hypot(e6.clientX - p3.startX, e6.clientY - p3.startY);
      if (p3.type === "mouse") {
        if (moved > 8) this._lift();
      } else if (moved > 12) {
        this._endDrag();
      }
      return;
    }
    e6.preventDefault();
    this._drag = { ...this._drag, x: e6.clientX, y: e6.clientY };
    this._updateDragTarget(e6.clientX, e6.clientY);
  }
  _evPointerUp(e6) {
    const cur = this._drag || this._pending;
    if (!cur || e6.pointerId !== cur.pointerId) return;
    const d3 = this._drag;
    this._endDrag();
    if (d3) {
      e6.preventDefault();
      this._suppressClickUntil = Date.now() + 500;
      if (d3.target) this._performDrop(d3);
    }
  }
  _evPointerCancel() {
    this._endDrag();
  }
  _updateDragTarget(x2, y3) {
    const d3 = this._drag;
    if (!d3) return;
    const el = this.shadowRoot.elementFromPoint(x2, y3);
    const closest = (sel) => el && el.closest ? el.closest(sel) : null;
    let { target, hoverT, panelRect } = d3;
    const row = closest(".drow");
    if (row) {
      const t4 = row.dataset.t;
      if (t4 === "keep" || t4 === "allday") hoverT = t4;
      else {
        const rr = row.getBoundingClientRect();
        hoverT = `${t4}:${y3 > rr.top + rr.height / 2 ? "30" : "00"}`;
      }
    } else if (closest(".droppanel")) {
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
    this._drag = { ...d3, target, hoverT, panelRect };
  }
  async _performDrop(d3) {
    const it = d3.item;
    const raw = it.raw;
    const t4 = d3.hoverT || "keep";
    const samePlace = d3.target.day === it.dayOffset && d3.target.person === it.personKey && t4 === "keep";
    if (samePlace) return;
    const day = addDays(this._weekStart, d3.target.day);
    const s0 = parseDate(raw.start.dateTime || raw.start.date);
    const e0raw = raw.end && (raw.end.dateTime || raw.end.date);
    const e0 = e0raw ? parseDate(e0raw) : addDays(s0, it.allday ? 1 : 0);
    let dtstart, dtend;
    if (t4 === "allday" || t4 === "keep" && it.allday) {
      const span = it.allday ? Math.max(1, Math.round((e0 - s0) / 864e5)) : 1;
      dtstart = ymd(day);
      dtend = ymd(addDays(day, span));
    } else {
      let H2, M2;
      if (t4 === "keep") {
        H2 = s0.getHours();
        M2 = s0.getMinutes();
      } else {
        [H2, M2] = t4.split(":").map(Number);
      }
      const dur = it.allday ? 60 * 6e4 : Math.max(5 * 6e4, e0 - s0);
      const ns = new Date(day.getFullYear(), day.getMonth(), day.getDate(), H2, M2, 0);
      const ne = new Date(ns.getTime() + dur);
      dtstart = `${ymd(ns)} ${hm(ns)}:00`;
      dtend = `${ymd(ne)} ${hm(ne)}:00`;
    }
    let summary = raw.summary;
    if (d3.target.person !== it.personKey) {
      const parsed = this._parseSummary(raw.summary);
      summary = this._composeSummary(d3.target.person, parsed.iconKey, parsed.title);
    }
    const msg = {
      type: "calendar/event/update",
      entity_id: this.config.entity,
      uid: raw.uid,
      event: { summary, dtstart, dtend }
    };
    if (raw.recurrence_id) {
      msg.recurrence_id = raw.recurrence_id;
      msg.recurrence_range = "";
    }
    this._toast = { text: "Verschiebe \u2026" };
    try {
      await this._hass.callWS(msg);
      await this._reload();
      this._toast = null;
    } catch (e6) {
      this._toast = { text: "Verschieben fehlgeschlagen: " + this._errText(e6), error: true };
      setTimeout(() => this._toast = null, 4500);
    }
  }
  _isLifted(it) {
    const d3 = this._drag;
    return !!d3 && d3.item.raw.uid === it.raw.uid && (d3.item.raw.recurrence_id || null) === (it.raw.recurrence_id || null);
  }
  _renderGhost() {
    const d3 = this._drag;
    if (!d3) return "";
    const it = d3.item;
    let tgt = "Loslassen bricht ab";
    if (d3.target) {
      const day = addDays(this._weekStart, d3.target.day);
      const person = this._persons().find((p3) => p3.key === d3.target.person);
      const when = d3.hoverT === "allday" ? "ganztags" : !d3.hoverT || d3.hoverT === "keep" ? it.allday ? "ganztags" : `${it.time} (Zeit behalten)` : d3.hoverT;
      tgt = `\u2192 ${WEEKDAYS[d3.target.day].slice(0, 2)} ${fmtDM(day)} \xB7 ${person ? person.label || person.key : d3.target.person} \xB7 ${when}`;
    }
    return b2`<div
      class="ghost"
      style=${o5({ left: `${d3.x - d3.grabDX}px`, top: `${d3.y - d3.grabDY}px`, width: `${d3.w}px` })}
    >
      <div>${it.emoji ? b2`${it.emoji} ` : ""}${it.time ? b2`<b>${it.time}</b> ` : ""}${it.title}</div>
      <div class="gt">${tgt}</div>
    </div>`;
  }
  _renderDropPanel() {
    const d3 = this._drag;
    if (!d3 || !d3.target || !d3.panelRect) return "";
    const [h0, h1] = this.config.drop_hours;
    const hours = [];
    for (let h3 = h0; h3 <= h1; h3++) hours.push(String(h3).padStart(2, "0"));
    const W = Math.max(d3.panelRect.width, 190);
    const H2 = 36 + 34 * (1 + hours.length);
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const left = Math.min(Math.max(8, d3.panelRect.left), Math.max(8, vw - W - 8));
    const top = Math.min(Math.max(8, d3.panelRect.top), Math.max(8, vh - H2 - 8));
    const day = addDays(this._weekStart, d3.target.day);
    const person = this._persons().find((p3) => p3.key === d3.target.person);
    const hot = (t4) => d3.hoverT === t4 || !!d3.hoverT && d3.hoverT.startsWith(t4 + ":");
    return b2`<div class="droppanel" style=${o5({ left: `${left}px`, top: `${top}px`, width: `${W}px` })}>
      <div class="drow head ${d3.hoverT === "keep" ? "hot" : ""}" data-t="keep">
        <span>${WEEKDAYS[d3.target.day]} ${fmtDM(day)} · ${person ? person.label || person.key : ""}</span>
        <span class="hint">Zeit behalten</span>
      </div>
      <div class="drow allday ${hot("allday") ? "hot" : ""}" data-t="allday">Ganztags</div>
      ${hours.map(
      (hh) => b2`<div class="drow ${hot(hh) ? "hot" : ""}" data-t=${hh}>
          <span>${hh}:00</span>${hot(hh) ? b2`<span class="sel">${d3.hoverT}</span>` : ""}
        </div>`
    )}
    </div>`;
  }
  getCardSize() {
    return this._persons().length * 3 + 2;
  }
  render() {
    if (!this.config) return b2``;
    const persons = this._persons();
    const weekStart = this._weekStart;
    const days = [...Array(7)].map((_2, i7) => addDays(weekStart, i7));
    const todayCol = this._todayCol();
    const items = this._items();
    const rowH = `${this.config.row_height}px`;
    return b2`
      <ha-card>
        ${this.config.title ? b2`<div class="ctitle">${this.config.title}</div>` : ""}
        ${this.config.show_toolbar ? this._renderToolbar(weekStart, days) : ""}
        <div class="wrap">
          <table>
            <colgroup>
              <col class="pcol" />
              ${days.map(() => b2`<col class="dcol" />`)}
            </colgroup>
            <thead>
              <tr>
                <th class="corner"></th>
                ${days.map(
      (d3, i7) => b2`<th class=${e5({ today: i7 === todayCol })}>
                    ${WEEKDAYS[i7]}<br /><span class="dnum">${fmtDM(d3)}</span>
                  </th>`
    )}
              </tr>
            </thead>
            <tbody>
              ${persons.map(
      (p3) => b2`<tr>
                  <td
                    class="pname"
                    style=${o5({
        background: `rgba(${p3.color},${p3.alpha ?? 0.13})`,
        borderLeftColor: p3.border,
        color: p3.text
      })}
                  >
                    ${p3.label || p3.key}
                  </td>
                  ${days.map((d3, i7) => {
        const cellItems = items.filter((it) => it.dayOffset === i7 && it.personKey === p3.key);
        const over = !!this._drag && !!this._drag.target && this._drag.target.person === p3.key && this._drag.target.day === i7;
        return b2`<td
                      class=${e5({ today: i7 === todayCol, cell: true, dropover: over })}
                      style=${o5({ height: rowH, background: `rgba(${p3.color},${p3.alpha ?? 0.13})` })}
                      data-person=${p3.key}
                      data-day=${i7}
                      @click=${() => {
          if (Date.now() < this._suppressClickUntil) return;
          this._openCreate(p3, d3);
        }}
                      title="Neuen Termin für ${p3.label || p3.key} am ${fmtDM(d3)} anlegen"
                    >
                      ${cellItems.map(
          (it) => b2`<div
                          class=${e5({ ev: true, lifted: this._isLifted(it) })}
                          @pointerdown=${(e6) => this._evPointerDown(e6, it, e6.currentTarget)}
                          @dragstart=${(e6) => e6.preventDefault()}
                          @contextmenu=${(e6) => e6.preventDefault()}
                          @click=${(e6) => {
            e6.stopPropagation();
            if (Date.now() < this._suppressClickUntil) return;
            this._openEdit(it);
          }}
                        >
                          ${it.emoji ? b2`${it.emoji} ` : ""}${it.time ? b2`<b>${it.time}</b> ` : ""}${it.title}
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
        ${this._toast ? b2`<div class="toast ${this._toast.error ? "err" : ""}">${this._toast.text}</div>` : ""}
      </ha-card>
    `;
  }
  _renderToolbar(weekStart, days) {
    const label = `${fmtDM(weekStart)} \u2013 ${fmtDM(days[6])}`;
    return b2`<div class="toolbar">
      <button class="nav" @click=${() => this._shiftWeek(-1)} title="Vorherige Woche">‹</button>
      <button class="today-btn" @click=${() => this._goToday()}>Heute</button>
      <button class="nav" @click=${() => this._shiftWeek(1)} title="Nächste Woche">›</button>
      <span class="range">${label}</span>
      ${this._loading ? b2`<span class="spin">…</span>` : ""}
    </div>`;
  }
  _kbEnabled() {
    const k2 = this.config.keyboard;
    if (k2 === true) return true;
    if (k2 === false) return false;
    return (navigator.maxTouchPoints || 0) > 0;
  }
  _kbType(key) {
    const d3 = this._dialog;
    if (!d3) return;
    let title = d3.title || "";
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
    this._dialog = { ...d3, title, error: "" };
  }
  _renderKeyboard() {
    const rows = [
      ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"],
      ["q", "w", "e", "r", "t", "z", "u", "i", "o", "p", "\xFC"],
      ["a", "s", "d", "f", "g", "h", "j", "k", "l", "\xF6", "\xE4"],
      ["shift", "y", "x", "c", "v", "b", "n", "m", "\xDF", "back"]
    ];
    const key = (k2) => {
      if (k2 === "shift")
        return b2`<button
          class="key wide ${this._kbShift ? "active" : ""}"
          @click=${() => this._kbType("shift")}
        >⇧</button>`;
      if (k2 === "back")
        return b2`<button class="key wide" @click=${() => this._kbType("back")}>⌫</button>`;
      const isLetter = /^[a-zäöü]$/.test(k2);
      const label = this._kbShift && isLetter ? k2.toUpperCase() : k2;
      return b2`<button class="key" @click=${() => this._kbType(k2)}>${label}</button>`;
    };
    return b2`<div class="kb" @mousedown=${(e6) => e6.preventDefault()}>
      ${rows.map((row) => b2`<div class="kbrow">${row.map(key)}</div>`)}
      <div class="kbrow">
        <button class="key space" @click=${() => this._kbType("space")}>Leerzeichen</button>
      </div>
    </div>`;
  }
  /* ---------- touch-native dialog controls (no native pickers/popups) ---------- */
  _dateLabel(ymdStr) {
    const d3 = parseDate(ymdStr);
    return `${WEEKDAYS[(d3.getDay() + 6) % 7].slice(0, 2)} ${fmtDM(d3)}${d3.getFullYear()}`;
  }
  _shiftDate(n5) {
    this._set("date", ymd(addDays(parseDate(this._dialog.date), n5)));
  }
  _setStart(h3, m2) {
    const d3 = this._dialog;
    const toMin = (s4) => {
      const [hh, mm] = String(s4 || "0:0").split(":").map(Number);
      return hh * 60 + mm;
    };
    const tm = (mins) => `${pad(Math.floor(mins / 60))}:${pad(mins % 60)}`;
    let dur = toMin(d3.end) - toMin(d3.start);
    if (!(dur > 0)) dur = 60;
    const ns = h3 * 60 + m2;
    let ne = Math.min(ns + dur, 23 * 60 + 45);
    if (ne <= ns) ne = Math.min(ns + 15, 23 * 60 + 45);
    this._dialog = { ...d3, start: tm(ns), end: tm(ne), error: "" };
  }
  _setEnd(h3, m2) {
    this._dialog = { ...this._dialog, end: `${pad(h3)}:${pad(m2)}`, error: "" };
  }
  _renderTimePick(field) {
    const d3 = this._dialog;
    const [ch, cm] = String(d3[field] || "09:00").split(":").map(Number);
    const hours = [...Array(24).keys()];
    const mins = [0, 15, 30, 45];
    const set = (h3, m2) => field === "start" ? this._setStart(h3, m2) : this._setEnd(h3, m2);
    return b2`<div class="tpick">
      <div class="chips hours">
        ${hours.map((h3) => b2`<button class="chip ${h3 === ch ? "on" : ""}" @click=${() => set(h3, cm)}>${pad(h3)}</button>`)}
      </div>
      <div class="chips mins">
        ${mins.map(
      (m2) => b2`<button
            class="chip ${m2 === cm ? "on" : ""}"
            @click=${() => {
        set(ch, m2);
        this._set("pick", null);
      }}
          >:${pad(m2)}</button>`
    )}
      </div>
    </div>`;
  }
  _renderDatePick() {
    const d3 = this._dialog;
    const days = [...Array(7)].map((_2, i7) => addDays(this._weekStart, i7));
    return b2`<div class="fld">
      <span class="lbl">Datum <b class="val">${this._dateLabel(d3.date)}</b></span>
      <div class="daterow">
        <button class="chip nav" @click=${() => this._shiftDate(-1)} title="Ein Tag zurück">‹</button>
        ${days.map(
      (day, i7) => b2`<button class="chip day ${ymd(day) === d3.date ? "on" : ""}" @click=${() => this._set("date", ymd(day))}>
            ${WEEKDAYS[i7].slice(0, 2)}<small>${fmtDM(day)}</small>
          </button>`
    )}
        <button class="chip nav" @click=${() => this._shiftDate(1)} title="Ein Tag vor">›</button>
      </div>
    </div>`;
  }
  _renderDialog() {
    const d3 = this._dialog;
    const persons = this._persons();
    const icons = this._icons();
    const iconKeys = Object.keys(icons);
    return b2`
      <div class="overlay" @click=${this._onOverlayClick}>
        <div class="modal wide" @click=${(e6) => e6.stopPropagation()}>
          <div class="mhead">${d3.mode === "create" ? "Neuer Termin" : "Termin bearbeiten"}</div>
          ${d3.recurring ? b2`<div class="note">Serientermin – Änderungen betreffen diesen Termin.</div>` : ""}
          ${d3.error ? b2`<div class="err">${d3.error}</div>` : ""}

          <div class="fld">
            <span class="lbl">Person</span>
            <div class="chips">
              ${persons.map(
      (p3) => b2`<button
                  class="chip person ${p3.key === d3.person ? "on" : ""}"
                  style=${o5({
        borderColor: p3.border,
        background: p3.key === d3.person ? `rgba(${p3.color},0.6)` : `rgba(${p3.color},0.16)`
      })}
                  @click=${() => this._set("person", p3.key)}
                >
                  ${p3.label || p3.key}
                </button>`
    )}
            </div>
          </div>

          <div class="fld">
            <span class="lbl">Icon</span>
            <div class="chips icons">
              <button class="chip ${!d3.iconKey ? "on" : ""}" @click=${() => this._set("iconKey", "")}>–<small>kein</small></button>
              ${iconKeys.map(
      (k2) => b2`<button class="chip icon ${k2 === d3.iconKey ? "on" : ""}" @click=${() => this._set("iconKey", k2)}>
                  ${icons[k2]}<small>${k2}</small>
                </button>`
    )}
            </div>
          </div>

          <label class="fld"
            >Titel
            <input
              type="text"
              .value=${d3.title}
              placeholder="z.B. Joggen"
              @input=${(e6) => this._set("title", e6.target.value)}
            />
          </label>

          ${this._renderDatePick()}

          <div class="fld">
            <div class="times">
              <button class="chip toggle ${d3.allday ? "on" : ""}" @click=${() => this._set("allday", !d3.allday)}>
                ${d3.allday ? "\u2611" : "\u2610"} Ganztags
              </button>
              ${d3.allday ? "" : b2`<button
                      class="chip time ${d3.pick === "start" ? "on" : ""}"
                      @click=${() => this._set("pick", d3.pick === "start" ? null : "start")}
                    >
                      <small>Von</small>${d3.start}
                    </button>
                    <button
                      class="chip time ${d3.pick === "end" ? "on" : ""}"
                      @click=${() => this._set("pick", d3.pick === "end" ? null : "end")}
                    >
                      <small>Bis</small>${d3.end}
                    </button>`}
            </div>
            ${!d3.allday && d3.pick ? this._renderTimePick(d3.pick) : ""}
          </div>

          ${this._kbEnabled() ? this._renderKeyboard() : ""}

          <div class="actions">
            ${d3.mode === "edit" ? b2`<button class="del" @click=${this._delete} ?disabled=${d3.saving}>Löschen</button>` : ""}
            <span class="spacer"></span>
            <button @click=${this._closeDialog} ?disabled=${d3.saving}>Abbrechen</button>
            <button class="primary" @click=${this._save} ?disabled=${d3.saving}>
              ${d3.saving ? "\u2026" : "Speichern"}
            </button>
          </div>
        </div>
      </div>
    `;
  }
};
__publicField(FamilyWeekPlannerCard, "properties", {
  _weekStart: { state: true },
  _events: { state: true },
  _loading: { state: true },
  _dialog: { state: true },
  _kbShift: { state: true },
  _drag: { state: true },
  _toast: { state: true }
});
__publicField(FamilyWeekPlannerCard, "styles", i`
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
    .chips.hours {
      display: grid;
      grid-template-columns: repeat(12, 1fr);
    }
    .chips.hours .chip {
      min-height: 40px;
      padding: 0;
      font-size: 14px;
      min-width: 0;
    }
    .chips.mins {
      margin-top: 8px;
    }
    .chips.mins .chip {
      flex: 1;
      min-height: 42px;
    }
  `);
customElements.define("family-week-planner-card", FamilyWeekPlannerCard);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "family-week-planner-card",
  name: "Family Week Planner",
  description: "Editable person-by-day family week planner over one calendar entity (Person|Icon: Title events).",
  preview: false,
  documentationURL: "https://github.com/psewar/family-week-planner-card"
});
var FwpReloadCard = class extends i4 {
  setConfig(config) {
    this._cfg = {
      label: config && config.label || "Dashboard neu laden",
      icon: config && config.icon !== void 0 ? config.icon : "\u{1F504}"
    };
  }
  set hass(h3) {
    this._hass = h3;
  }
  getCardSize() {
    return 1;
  }
  render() {
    const c4 = this._cfg || {};
    return b2`<ha-card>
      <button class="reload" @click=${() => window.location.reload()}>
        ${c4.icon ? b2`<span class="ic">${c4.icon}</span>` : ""}<span>${c4.label}</span>
      </button>
    </ha-card>`;
  }
};
__publicField(FwpReloadCard, "styles", i`
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
  `);
customElements.define("fwp-reload-card", FwpReloadCard);
window.customCards.push({
  type: "fwp-reload-card",
  name: "FWP Kiosk Reload",
  description: "One-tap full page reload for kiosk dashboards (companion to Family Week Planner).",
  preview: false,
  documentationURL: "https://github.com/psewar/family-week-planner-card"
});
console.info(
  `%c family-week-planner-card %c v${CARD_VERSION} `,
  "color:#fff;background:#7e57c2;border-radius:4px 0 0 4px;padding:2px 4px",
  "color:#7e57c2;background:#eee;border-radius:0 4px 4px 0;padding:2px 4px"
);
//# sourceMappingURL=family-week-planner-card.js.map
