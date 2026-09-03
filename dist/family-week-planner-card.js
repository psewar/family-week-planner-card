var Kt=Object.defineProperty;var Ft=(n,t,e)=>t in n?Kt(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var q=(n,t,e)=>Ft(n,typeof t!="symbol"?t+"":t,e);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var X=globalThis,Q=X.ShadowRoot&&(X.ShadyCSS===void 0||X.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,ot=Symbol(),wt=new WeakMap,O=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==ot)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Q&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=wt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&wt.set(e,t))}return t}toString(){return this.cssText}},vt=n=>new O(typeof n=="string"?n:n+"",void 0,ot),G=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((i,s,r)=>i+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[r+1],n[0]);return new O(e,n,ot)},xt=(n,t)=>{if(Q)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=X.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,n.appendChild(i)}},at=Q?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return vt(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var{is:Vt,defineProperty:qt,getOwnPropertyDescriptor:Xt,getOwnPropertyNames:Qt,getOwnPropertySymbols:Gt,getPrototypeOf:Zt}=Object,Z=globalThis,kt=Z.trustedTypes,Jt=kt?kt.emptyScript:"",te=Z.reactiveElementPolyfillSupport,N=(n,t)=>n,lt={toAttribute(n,t){switch(t){case Boolean:n=n?Jt:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},St=(n,t)=>!Vt(n,t),At={attribute:!0,type:String,converter:lt,reflect:!1,useDefault:!1,hasChanged:St};Symbol.metadata??=Symbol("metadata"),Z.litPropertyMetadata??=new WeakMap;var A=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=At){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&qt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:r}=Xt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:s,set(o){let a=s?.call(this);r?.call(this,o),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??At}static _$Ei(){if(this.hasOwnProperty(N("elementProperties")))return;let t=Zt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(N("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(N("properties"))){let e=this.properties,i=[...Qt(e),...Gt(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(at(s))}else t!==void 0&&e.push(at(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return xt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let r=(i.converter?.toAttribute!==void 0?i.converter:lt).toAttribute(e,i.type);this._$Em=t,r==null?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let r=i.getPropertyOptions(s),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:lt;this._$Em=s;let a=o.fromAttribute(e,r.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,r){if(t!==void 0){let o=this.constructor;if(s===!1&&(r=this[t]),i??=o.getPropertyOptions(t),!((i.hasChanged??St)(r,e)||i.useDefault&&i.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:r},o){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,r]of this._$Ep)this[s]=r;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,r]of i){let{wrapped:o}=r,a=this[s];o!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,r,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};A.elementStyles=[],A.shadowRootOptions={mode:"open"},A[N("elementProperties")]=new Map,A[N("finalized")]=new Map,te?.({ReactiveElement:A}),(Z.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ft=globalThis,Et=n=>n,J=ft.trustedTypes,Tt=J?J.createPolicy("lit-html",{createHTML:n=>n}):void 0,Ut="$lit$",T=`lit$${Math.random().toFixed(9).slice(2)}$`,zt="?"+T,ee=`<${zt}>`,R=document,I=()=>R.createComment(""),Y=n=>n===null||typeof n!="object"&&typeof n!="function",_t=Array.isArray,ie=n=>_t(n)||typeof n?.[Symbol.iterator]=="function",ct=`[ 	
\f\r]`,W=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ct=/-->/g,Dt=/>/g,D=RegExp(`>|${ct}(?:([^\\s"'>=/]+)(${ct}*=${ct}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Mt=/'/g,Rt=/"/g,Ht=/^(?:script|style|textarea|title)$/i,mt=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),d=mt(1),me=mt(2),be=mt(3),w=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),Pt=new WeakMap,M=R.createTreeWalker(R,129);function Lt(n,t){if(!_t(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Tt!==void 0?Tt.createHTML(t):t}var se=(n,t)=>{let e=n.length-1,i=[],s,r=t===2?"<svg>":t===3?"<math>":"",o=W;for(let a=0;a<e;a++){let l=n[a],h,p,c=-1,u=0;for(;u<l.length&&(o.lastIndex=u,p=o.exec(l),p!==null);)u=o.lastIndex,o===W?p[1]==="!--"?o=Ct:p[1]!==void 0?o=Dt:p[2]!==void 0?(Ht.test(p[2])&&(s=RegExp("</"+p[2],"g")),o=D):p[3]!==void 0&&(o=D):o===D?p[0]===">"?(o=s??W,c=-1):p[1]===void 0?c=-2:(c=o.lastIndex-p[2].length,h=p[1],o=p[3]===void 0?D:p[3]==='"'?Rt:Mt):o===Rt||o===Mt?o=D:o===Ct||o===Dt?o=W:(o=D,s=void 0);let g=o===D&&n[a+1].startsWith("/>")?" ":"";r+=o===W?l+ee:c>=0?(i.push(h),l.slice(0,c)+Ut+l.slice(c)+T+g):l+T+(c===-2?a:g)}return[Lt(n,r+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},B=class n{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0,a=t.length-1,l=this.parts,[h,p]=se(t,e);if(this.el=n.createElement(h,i),M.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=M.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let c of s.getAttributeNames())if(c.endsWith(Ut)){let u=p[o++],g=s.getAttribute(c).split(T),f=/([.?@])?(.*)/.exec(u);l.push({type:1,index:r,name:f[2],strings:g,ctor:f[1]==="."?ht:f[1]==="?"?pt:f[1]==="@"?ut:z}),s.removeAttribute(c)}else c.startsWith(T)&&(l.push({type:6,index:r}),s.removeAttribute(c));if(Ht.test(s.tagName)){let c=s.textContent.split(T),u=c.length-1;if(u>0){s.textContent=J?J.emptyScript:"";for(let g=0;g<u;g++)s.append(c[g],I()),M.nextNode(),l.push({type:2,index:++r});s.append(c[u],I())}}}else if(s.nodeType===8)if(s.data===zt)l.push({type:2,index:r});else{let c=-1;for(;(c=s.data.indexOf(T,c+1))!==-1;)l.push({type:7,index:r}),c+=T.length-1}r++}}static createElement(t,e){let i=R.createElement("template");return i.innerHTML=t,i}};function U(n,t,e=n,i){if(t===w)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,r=Y(t)?void 0:t._$litDirective$;return s?.constructor!==r&&(s?._$AO?.(!1),r===void 0?s=void 0:(s=new r(n),s._$AT(n,e,i)),i!==void 0?(e._$Co??=[])[i]=s:e._$Cl=s),s!==void 0&&(t=U(n,s._$AS(n,t.values),s,i)),t}var dt=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??R).importNode(e,!0);M.currentNode=s;let r=M.nextNode(),o=0,a=0,l=i[0];for(;l!==void 0;){if(o===l.index){let h;l.type===2?h=new j(r,r.nextSibling,this,t):l.type===1?h=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(h=new gt(r,this,t)),this._$AV.push(h),l=i[++a]}o!==l?.index&&(r=M.nextNode(),o++)}return M.currentNode=R,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},j=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=U(this,t,e),Y(t)?t===b||t==null||t===""?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==w&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ie(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==b&&Y(this._$AH)?this._$AA.nextSibling.data=t:this.T(R.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=B.createElement(Lt(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let r=new dt(s,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(t){let e=Pt.get(t.strings);return e===void 0&&Pt.set(t.strings,e=new B(t)),e}k(t){_t(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let r of t)s===e.length?e.push(i=new n(this.O(I()),this.O(I()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=Et(t).nextSibling;Et(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},z=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=b}_$AI(t,e=this,i,s){let r=this.strings,o=!1;if(r===void 0)t=U(this,t,e,0),o=!Y(t)||t!==this._$AH&&t!==w,o&&(this._$AH=t);else{let a=t,l,h;for(t=r[0],l=0;l<r.length-1;l++)h=U(this,a[i+l],e,l),h===w&&(h=this._$AH[l]),o||=!Y(h)||h!==this._$AH[l],h===b?t=b:t!==b&&(t+=(h??"")+r[l+1]),this._$AH[l]=h}o&&!s&&this.j(t)}j(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},ht=class extends z{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===b?void 0:t}},pt=class extends z{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==b)}},ut=class extends z{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=U(this,t,e,0)??b)===w)return;let i=this._$AH,s=t===b&&i!==b||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==b&&(i===b||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},gt=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){U(this,t)}};var re=ft.litHtmlPolyfillSupport;re?.(B,j),(ft.litHtmlVersions??=[]).push("3.3.3");var Ot=(n,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let r=e?.renderBefore??null;i._$litPart$=s=new j(t.insertBefore(I(),r),r,void 0,e??{})}return s._$AI(n),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var bt=globalThis,S=class extends A{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ot(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return w}};S._$litElement$=!0,S.finalized=!0,bt.litElementHydrateSupport?.({LitElement:S});var ne=bt.litElementPolyfillSupport;ne?.({LitElement:S});(bt.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var tt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},et=n=>(...t)=>({_$litDirective$:n,values:t}),H=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Nt="important",oe=" !"+Nt,P=et(class extends H{constructor(n){if(super(n),n.type!==tt.ATTRIBUTE||n.name!=="style"||n.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(n){return Object.keys(n).reduce((t,e)=>{let i=n[e];return i==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(n,[t]){let{style:e}=n.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let i of this.ft)t[i]==null&&(this.ft.delete(i),i.includes("-")?e.removeProperty(i):e[i]=null);for(let i in t){let s=t[i];if(s!=null){this.ft.add(i);let r=typeof s=="string"&&s.endsWith(oe);i.includes("-")||r?e.setProperty(i,r?s.slice(0,-11):s,r?Nt:""):e[i]=s}}return w}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var it=et(class extends H{constructor(n){if(super(n),n.type!==tt.ATTRIBUTE||n.name!=="class"||n.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(n){return" "+Object.keys(n).filter(t=>n[t]).join(" ")+" "}update(n,[t]){if(this.st===void 0){this.st=new Set,n.strings!==void 0&&(this.nt=new Set(n.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(let i in t)t[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(t)}let e=n.element.classList;for(let i of this.st)i in t||(e.remove(i),this.st.delete(i));for(let i in t){let s=!!t[i];s===this.st.has(i)||this.nt?.has(i)||(s?(e.add(i),this.st.add(i)):(e.remove(i),this.st.delete(i)))}return w}});var ae="0.7.0",L=["Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag"],le=[{key:"Familie",color:"126,87,194",border:"#7e57c2",text:"#c9b3f0",alpha:.13},{key:"Person 1",color:"30,136,229",border:"#1e88e5",text:"#8ecbff",alpha:.13},{key:"Person 2",color:"236,64,122",border:"#ec407a",text:"#ff9ec4",alpha:.13},{key:"Person 3",color:"0,137,123",border:"#00897b",text:"#5fd4c6",alpha:.15},{key:"Person 4",color:"251,140,0",border:"#fb8c00",text:"#ffca7a",alpha:.13},{key:"Essen",color:"109,76,65",border:"#6d4c41",text:"#c8b0a4",alpha:.16},{key:"Rest",color:"84,110,122",border:"#546e7a",text:"#b0bec5",alpha:.14}],ce={Tanzen:"\u{1F483}",Singen:"\u{1F3B5}",Chor:"\u{1F3B6}",Sport:"\u{1F3CB}\uFE0F",Arzt:"\u{1FA7A}",Schule:"\u{1F392}",Arbeit:"\u{1F4BC}",Auto:"\u{1F697}",Hund:"\u{1F415}",Geburtstag:"\u{1F382}",Ausflug:"\u{1F9ED}",Einkauf:"\u{1F6D2}",Mittag:"\u{1F374}",Nacht:"\u{1F319}",Konzert:"\u{1F3B8}",Biblio:"\u{1F4DA}"},$=n=>String(n).padStart(2,"0"),k=n=>`${n.getFullYear()}-${$(n.getMonth()+1)}-${$(n.getDate())}`,K=n=>`${$(n.getHours())}:${$(n.getMinutes())}`,E=n=>`${$(n.getDate())}.${$(n.getMonth()+1)}.`;function y(n,t){let e=new Date(n);return e.setDate(e.getDate()+t),e}function Wt(n){let t=new Date(n),e=(t.getDay()+6)%7;return t.setDate(t.getDate()-e),t.setHours(0,0,0,0),t}function C(n){if(/^\d{4}-\d{2}-\d{2}$/.test(n)){let[t,e,i]=n.split("-").map(Number);return new Date(t,e-1,i)}return new Date(n)}function It(n,t){let e=new Date(n.getFullYear(),n.getMonth(),n.getDate()),i=new Date(t.getFullYear(),t.getMonth(),t.getDate());return Math.round((e-i)/864e5)}var rt=[{key:"daily",label:"T\xE4glich",rrule:"FREQ=DAILY"},{key:"weekdays",label:"Mo\u2013Fr",rrule:"FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR"},{key:"weekly",label:"W\xF6chentlich",rrule:"FREQ=WEEKLY"},{key:"biweekly",label:"Alle 2 Wochen",rrule:"FREQ=WEEKLY;INTERVAL=2"},{key:"monthly",label:"Monatlich",rrule:"FREQ=MONTHLY"},{key:"yearly",label:"J\xE4hrlich",rrule:"FREQ=YEARLY"}],jt=["MO","TU","WE","TH","FR","SA","SU"];function yt(n){let t={};for(let e of String(n||"").split(";")){let i=e.indexOf("=");i>0&&(t[e.slice(0,i).trim().toUpperCase()]=e.slice(i+1).trim().toUpperCase())}return t}function $t(n){return Object.entries(n).filter(([,t])=>t!==void 0&&t!=="").map(([t,e])=>`${t}=${e}`).join(";")}function Yt(n,t){if(!n)return"";let{UNTIL:e,COUNT:i,WKST:s,...r}=yt(n);r.INTERVAL==="1"&&delete r.INTERVAL,r.FREQ==="WEEKLY"&&r.BYDAY&&t&&r.BYDAY===jt[(t.getDay()+6)%7]&&delete r.BYDAY;let o=$t(r),a=rt.find(l=>$t(yt(l.rrule))===o);return a?a.key:"custom"}function de(n){let t=rt.find(e=>e.key===n);return t?t.rrule:""}function he(n,t){if(!n)return n;let e=yt(n);if(e.FREQ==="WEEKLY"&&e.BYDAY&&!e.BYDAY.includes(",")){let i=jt[(t.getDay()+6)%7];if(e.BYDAY!==i)return e.BYDAY=i,$t(e)}return n}function Bt(n,t){if(!n)return"";if(n==="custom")return`eigene Regel (${t})`;let e=rt.find(i=>i.key===n);return e?e.label:n}var F=class extends S{constructor(){super(),this._events=[],this._loading=!1,this._dialog=null,this._weekStart=Wt(new Date),this._hass=null,this._lastEntityUpdated=void 0,this._iconsUpdated=void 0,this._kbShift=!1,this._drag=null,this._pending=null,this._pressTimer=null,this._suppressClickUntil=0,this._toast=null,this._scope=null,this._rowH=210,this._onResize=()=>{clearTimeout(this._resizeT),this._resizeT=setTimeout(()=>this._computeRowH(),120)}}connectedCallback(){super.connectedCallback(),this._onKey=t=>{t.key==="Escape"&&(this._scope?this._scope=null:this._drag&&this._evPointerCancel())},window.addEventListener("keydown",this._onKey),window.addEventListener("resize",this._onResize)}disconnectedCallback(){window.removeEventListener("keydown",this._onKey),window.removeEventListener("resize",this._onResize),window.visualViewport&&window.visualViewport.removeEventListener("resize",this._onResize),clearInterval(this._tick),this._endDrag(),super.disconnectedCallback()}firstUpdated(){this._computeRowH(),setTimeout(()=>this._computeRowH(),350),window.visualViewport&&window.visualViewport.addEventListener("resize",this._onResize),this._tick=setInterval(()=>{if(!this.config||this.config.row_height!=="auto"||window.innerHeight<200)return;let t=this._lastMeasure,e=Math.max(0,this.getBoundingClientRect().top);(!t||t.vh!==window.innerHeight||t.vw!==window.innerWidth||Math.abs(t.top-e)>2)&&this._computeRowH()},2e3)}_computeRowH(){if(!this.config)return;if(typeof this.config.row_height=="number"){this._rowH!==this.config.row_height&&(this._rowH=this.config.row_height);return}let t=this.shadowRoot;if(!t||window.innerHeight<200)return;let e=Math.max(0,this.getBoundingClientRect().top);this._lastMeasure={vh:window.innerHeight,vw:window.innerWidth,top:e};let i=window.innerHeight-e-12,s=(p,c)=>{let u=t.querySelector(p);return u?u.getBoundingClientRect().height:c},r=s(".ctitle",0)+s(".toolbar",0)+s("thead",66)+20,o=Math.max(1,this._persons().length),a=t.querySelector("tbody tr"),l=a?Math.max(0,Math.round(a.getBoundingClientRect().height-this._rowH)):15,h=Math.floor((i-r)/o)-l-1;h=Math.max(this.config.row_min_height,Math.min(this.config.row_max_height,h)),h!==this._rowH&&(this._rowH=h)}setConfig(t){if(!t||!t.entity)throw new Error("family-week-planner-card: 'entity' (a calendar entity) is required.");this.config={title:t.title,entity:t.entity,persons:Array.isArray(t.persons)&&t.persons.length?t.persons:le,icons:t.icons&&Object.keys(t.icons).length?t.icons:ce,fallback_person:t.fallback_person||"Rest",row_height:t.row_height??"auto",row_min_height:t.row_min_height??64,row_max_height:t.row_max_height??420,icons_entity:t.icons_entity||null,show_toolbar:t.show_toolbar!==!1,default_icon:t.default_icon||"",default_start:t.default_start||"09:00",default_end:t.default_end||"10:00",keyboard:t.keyboard??"auto",drag:t.drag!==!1,drop_hours:Array.isArray(t.drop_hours)&&t.drop_hours.length===2?t.drop_hours:[6,22],drop_minutes_delay:t.drop_minutes_delay??1600,drop_minute_step:t.drop_minute_step??5}}set hass(t){if(this._hass=t,!this.config||!t)return;let e=t.states[this.config.entity],i=e?e.last_updated:"missing";if(this._lastEntityUpdated===void 0?(this._lastEntityUpdated=i,this._reload()):i!==this._lastEntityUpdated&&(this._lastEntityUpdated=i,this._reload()),this.config.icons_entity){let s=t.states[this.config.icons_entity],r=s?s.last_updated:"missing";r!==this._iconsUpdated&&(this._iconsUpdated=r,this.requestUpdate())}}get hass(){return this._hass}_persons(){return this.config.persons}_icons(){let t=this.config.icons_entity,e=t&&this._hass&&this._hass.states[t];if(e){let i=[];e.attributes&&Array.isArray(e.attributes.options)?i=e.attributes.options:typeof e.state=="string"&&(i=e.state.split(/[\n,;]+/));let s={};for(let r of i){let o=String(r).trim().match(/^([^:=]+?)\s*[:=]\s*(.+)$/);o&&(s[o[1].trim()]=o[2].trim())}if(Object.keys(s).length)return s}return this.config.icons}_iconEmoji(t){if(!t)return"";let e=this._icons(),i=Object.keys(e).find(s=>s.toLowerCase()===String(t).toLowerCase());return i?e[i]:""}_normIconKey(t){return t?Object.keys(this._icons()).find(i=>i.toLowerCase()===String(t).toLowerCase())||t:""}async _reload(){if(!this._hass||!this.config)return;let t=this._weekStart,e=y(t,7);this._loading=!0;try{let i=`calendars/${this.config.entity}?start=${encodeURIComponent(t.toISOString())}&end=${encodeURIComponent(e.toISOString())}`,s=await this._hass.callApi("GET",i);this._events=Array.isArray(s)?s:[]}catch(i){console.error("family-week-planner-card: failed to load events",i),this._events=[]}finally{this._loading=!1}}_parseSummary(t){let e=String(t||""),i=e.indexOf(":"),s,r;i>=0?(s=e.slice(0,i).trim(),r=e.slice(i+1).trim()):(s=e.trim(),r=e.trim());let o,a;if(s.includes("|")){let p=s.split("|");o=p[0].trim(),a=p[1].trim()}else o=s,a="";let l=this._persons().find(p=>p.key.toLowerCase()===o.toLowerCase());return{personKey:l?l.key:this.config.fallback_person,iconKey:this._normIconKey(a),title:r}}_composeSummary(t,e,i){let s="";return e?s=`${t}|${e}`:t!==this.config.fallback_person&&(s=t),s?`${s}: ${i}`:i}_items(){let t=[];for(let e of this._events){let i=e.start&&(e.start.dateTime||e.start.date);if(!i)continue;let s=!!(e.start&&e.start.date&&!e.start.dateTime),r=C(i),o=It(r,this._weekStart);if(o<0||o>6)continue;let{personKey:a,iconKey:l,title:h}=this._parseSummary(e.summary);t.push({dayOffset:o,personKey:a,emoji:this._iconEmoji(l),time:s?"":K(r),title:h,allday:s,recurring:!!(e.recurrence_id||e.rrule),raw:e})}return t.sort((e,i)=>e.allday===i.allday?e.time.localeCompare(i.time):e.allday?-1:1),t}_todayCol(){return It(new Date,this._weekStart)}_shiftWeek(t){this._weekStart=y(this._weekStart,t*7),this._reload()}_goToday(){this._weekStart=Wt(new Date),this._reload()}_openCreate(t,e){this._dialog={mode:"create",person:t.key,iconKey:this.config.default_icon,title:"",allday:!1,date:k(e),start:this.config.default_start,end:this.config.default_end,uid:null,recurrence_id:null,rrule:"",recur:"",recurOrig:"",pick:null,saving:!1,error:""}}_openEdit(t){let e=t.raw,i=e.start.dateTime||e.start.date,s=e.end&&(e.end.dateTime||e.end.date),r=t.allday,o=C(i),a=s?C(s):y(o,r?1:0),l=this._parseSummary(e.summary);this._dialog={mode:"edit",person:l.personKey,iconKey:l.iconKey,title:l.title,allday:r,date:k(o),start:r?this.config.default_start:K(o),end:r?this.config.default_end:K(a),uid:e.uid,recurrence_id:e.recurrence_id||null,rrule:e.rrule||"",recur:Yt(e.rrule,o),recurOrig:Yt(e.rrule,o),pick:null,saving:!1,error:""}}_set(t,e){this._dialog={...this._dialog,[t]:e,error:""}}_closeDialog(){this._dialog=null}_onOverlayClick(){this._closeDialog()}_buildEventPayload(){let t=this._dialog,e=(t.title||"").trim();if(!e)return{error:"Bitte einen Titel eingeben."};let i=this._composeSummary(t.person,t.iconKey,e),s,r;if(t.allday)s=t.date,r=k(y(C(t.date),1));else{if(!t.start||!t.end)return{error:"Bitte Von- und Bis-Zeit eingeben."};if(t.end<=t.start)return{error:"Die Bis-Zeit muss nach der Von-Zeit liegen."};s=`${t.date} ${t.start}:00`,r=`${t.date} ${t.end}:00`}let o={summary:i,dtstart:s,dtend:r};return t.recur!==t.recurOrig&&t.recur!=="custom"&&(o.rrule=de(t.recur)),{event:o}}async _save(){let t=this._buildEventPayload();if(t.error){this._set("error",t.error);return}let e=this._dialog;if(e.mode==="edit"&&e.recurrence_id){let i="rrule"in t.event;this._askScope({title:"Serientermin \xE4ndern",text:i?"Der Rhythmus wurde ge\xE4ndert \u2013 das gilt f\xFCr diesen und alle zuk\xFCnftigen Termine.":"Wof\xFCr soll die \xC4nderung gelten?",options:[...i?[]:[{label:"Nur diesen Termin",range:""}],{label:"Diesen und alle zuk\xFCnftigen",sub:"vergangene bleiben unver\xE4ndert",range:"THISANDFUTURE"}],onPick:s=>this._commitSave(t.event,s)});return}await this._commitSave(t.event,null)}async _commitSave(t,e){let i=this._dialog;if(i){this._dialog={...i,saving:!0,error:""};try{if(i.mode==="create")try{await this._hass.callWS({type:"calendar/event/create",entity_id:this.config.entity,event:t})}catch(s){if(!await this._verifyCreated(t))throw s}else{let s={type:"calendar/event/update",entity_id:this.config.entity,uid:i.uid,event:t};i.recurrence_id&&e!==null&&(s.recurrence_id=i.recurrence_id,s.recurrence_range=e),await this._hass.callWS(s)}this._closeDialog(),await this._reload()}catch(s){this._dialog={...this._dialog,saving:!1,error:this._errText(s)}}}}_askScope(t){this._scope=t}_renderScope(){let t=this._scope;if(!t)return"";let e=i=>{this._scope=null,t.onPick(i.range)};return d`<div class="overlay scope" @click=${()=>this._scope=null}>
      <div class="modal scopebox" @click=${i=>i.stopPropagation()}>
        <div class="mhead">${t.title}</div>
        ${t.text?d`<div class="note">${t.text}</div>`:""}
        <div class="scopeopts">
          ${t.options.map(i=>d`<button class="sopt ${i.cls||""}" @click=${()=>e(i)}>
              ${i.label}${i.sub?d`<small>${i.sub}</small>`:""}
            </button>`)}
          <button class="sopt cancel" @click=${()=>this._scope=null}>Abbrechen</button>
        </div>
      </div>
    </div>`}async _verifyCreated(t){let e=String(t.dtstart).slice(0,10);for(let i=0;i<4;i++){if(await this._reload(),this._events.some(r=>{let o=r.start&&(r.start.dateTime||r.start.date)||"";return r.summary===t.summary&&String(o).slice(0,10)===e}))return!0;await new Promise(r=>setTimeout(r,800))}return!1}async _delete(){let t=this._dialog;if(!t.uid){this._set("error","Dieser Termin hat keine ID und kann nicht gel\xF6scht werden.");return}if(t.recurrence_id){this._askScope({title:"Serientermin l\xF6schen",text:"Was soll gel\xF6scht werden?",options:[{label:"Nur diesen Termin",range:""},{label:"Diesen und alle zuk\xFCnftigen",sub:"vergangene bleiben",range:"THISANDFUTURE"},{label:"Ganze Serie",sub:"auch vergangene Termine",range:"ALL",cls:"del"}],onPick:e=>this._commitDelete(e)});return}await this._commitDelete(null)}async _commitDelete(t){let e=this._dialog;if(e){this._dialog={...e,saving:!0,error:""};try{let i={type:"calendar/event/delete",entity_id:this.config.entity,uid:e.uid};e.recurrence_id&&t!==null&&t!=="ALL"&&(i.recurrence_id=e.recurrence_id,i.recurrence_range=t),await this._hass.callWS(i),this._closeDialog(),await this._reload()}catch(i){this._dialog={...this._dialog,saving:!1,error:this._errText(i)}}}}_errText(t){if(!t)return"Unbekannter Fehler.";if(typeof t=="string")return t;if(t.message)return t.message;if(t.error)return t.error;try{return JSON.stringify(t)}catch{return"Fehler beim Speichern."}}_evPointerDown(t,e,i){if(!this.config.drag||this._dialog||t.button!==void 0&&t.button!==0)return;(this._drag||this._pending)&&this._endDrag();let s=i.getBoundingClientRect(),r={item:e,el:i,pointerId:t.pointerId,type:t.pointerType,startX:t.clientX,startY:t.clientY,x:t.clientX,y:t.clientY,grabDX:t.clientX-s.left,grabDY:t.clientY-s.top,w:s.width,target:null,hoverT:null,panelRect:null};this._pending=r,this._attachWin(),t.pointerType!=="mouse"&&(this._pressTimer=setTimeout(()=>{this._pending===r&&this._lift()},320))}_clearPress(){this._pressTimer&&(clearTimeout(this._pressTimer),this._pressTimer=null)}_attachWin(){this._winAttached||(this._winAttached=!0,this._onWinMove=t=>this._evPointerMove(t),this._onWinUp=t=>this._evPointerUp(t),this._onWinCancel=()=>this._evPointerCancel(),window.addEventListener("pointermove",this._onWinMove,{capture:!0,passive:!1}),window.addEventListener("pointerup",this._onWinUp,{capture:!0}),window.addEventListener("pointercancel",this._onWinCancel,{capture:!0}),window.addEventListener("blur",this._onWinCancel))}_detachWin(){this._winAttached&&(this._winAttached=!1,window.removeEventListener("pointermove",this._onWinMove,{capture:!0}),window.removeEventListener("pointerup",this._onWinUp,{capture:!0}),window.removeEventListener("pointercancel",this._onWinCancel,{capture:!0}),window.removeEventListener("blur",this._onWinCancel))}_endDrag(){this._clearPress(),this._flyLeave(),this._pending=null,this._drag=null,this._detachWin()}_lift(){let t=this._pending;t&&(this._clearPress(),this._pending=null,this._drag={...t},this._updateDragTarget(t.x,t.y))}_evPointerMove(t){let e=this._drag||this._pending;if(!(!e||t.pointerId!==e.pointerId)){if(!this._drag){let i=e;i.x=t.clientX,i.y=t.clientY;let s=Math.hypot(t.clientX-i.startX,t.clientY-i.startY);i.type==="mouse"?s>8&&this._lift():s>12&&this._endDrag();return}t.preventDefault(),this._drag={...this._drag,x:t.clientX,y:t.clientY},this._updateDragTarget(t.clientX,t.clientY)}}_evPointerUp(t){let e=this._drag||this._pending;if(!e||t.pointerId!==e.pointerId)return;let i=this._drag;this._endDrag(),i&&(t.preventDefault(),this._suppressClickUntil=Date.now()+500,i.target&&this._performDrop(i))}_evPointerCancel(){this._endDrag()}_updateDragTarget(t,e){let i=this._drag;if(!i)return;let s=this.shadowRoot.elementFromPoint(t,e),r=c=>s&&s.closest?s.closest(c):null,{target:o,hoverT:a,panelRect:l,flyHour:h}=i,p=r(".drow");if(p){let c=p.dataset.t;if(p.classList.contains("fly"))a=c;else if(c==="keep"||c==="allday")a=c,this._flyLeave(),h=null;else{let u=p.getBoundingClientRect();a=`${c}:${e>u.top+u.height/2?"30":"00"}`,c!==this._flyHoverHour&&(this._flyLeave(),h&&h!==c&&(h=null),this._flyHoverHour=c,this._flyTimer=setTimeout(()=>{this._drag&&this._flyHoverHour===c&&(this._drag={...this._drag,flyHour:c})},this.config.drop_minutes_delay))}}else if(!r(".droppanel")){this._flyLeave(),h=null;let c=r("td.cell");if(c){let u=c.dataset.person,g=Number(c.dataset.day);(!o||o.person!==u||o.day!==g)&&(o={person:u,day:g},l=c.getBoundingClientRect()),a="keep"}else o=null,l=null,a=null}this._drag={...i,target:o,hoverT:a,panelRect:l,flyHour:h}}_flyLeave(){this._flyTimer&&(clearTimeout(this._flyTimer),this._flyTimer=null),this._flyHoverHour=null}async _performDrop(t){let e=t.item,i=e.raw,s=t.hoverT||"keep";if(t.target.day===e.dayOffset&&t.target.person===e.personKey&&s==="keep")return;let o=y(this._weekStart,t.target.day),a=C(i.start.dateTime||i.start.date),l=i.end&&(i.end.dateTime||i.end.date),h=l?C(l):y(a,e.allday?1:0),p,c;if(s==="allday"||s==="keep"&&e.allday){let f=e.allday?Math.max(1,Math.round((h-a)/864e5)):1;p=k(o),c=k(y(o,f))}else{let f,m;s==="keep"?(f=a.getHours(),m=a.getMinutes()):[f,m]=s.split(":").map(Number);let v=e.allday?60*6e4:Math.max(5*6e4,h-a),x=new Date(o.getFullYear(),o.getMonth(),o.getDate(),f,m,0),V=new Date(x.getTime()+v);p=`${k(x)} ${K(x)}:00`,c=`${k(V)} ${K(V)}:00`}let u=i.summary;if(t.target.person!==e.personKey){let f=this._parseSummary(i.summary);u=this._composeSummary(t.target.person,f.iconKey,f.title)}let g={type:"calendar/event/update",entity_id:this.config.entity,uid:i.uid,event:{summary:u,dtstart:p,dtend:c}};if(i.recurrence_id){g.recurrence_id=i.recurrence_id;let f=p.length===10,m=`${L[t.target.day]} ${E(o)}${f?", ganztags":" "+p.slice(11,16)}`;this._askScope({title:"Serientermin verschieben",text:`\u201E${e.title}" \u2192 ${m}`,options:[{label:"Nur diesen Termin",range:""},{label:"Diesen und alle zuk\xFCnftigen",sub:"vergangene bleiben",range:"THISANDFUTURE"}],onPick:v=>{if(g.recurrence_range=v,v==="THISANDFUTURE"&&i.rrule){let x=he(i.rrule,o);x!==i.rrule&&(g.event.rrule=x)}this._commitMove(g)}});return}await this._commitMove(g)}async _commitMove(t){this._toast={text:"Verschiebe \u2026"};try{await this._hass.callWS(t),await this._reload(),this._toast=null}catch(e){this._toast={text:"Verschieben fehlgeschlagen: "+this._errText(e),error:!0},setTimeout(()=>this._toast=null,4500)}}_isLifted(t){let e=this._drag;return!!e&&e.item.raw.uid===t.raw.uid&&(e.item.raw.recurrence_id||null)===(t.raw.recurrence_id||null)}_renderGhost(){let t=this._drag;if(!t)return"";let e=t.item,i="Loslassen bricht ab";if(t.target){let s=y(this._weekStart,t.target.day),r=this._persons().find(a=>a.key===t.target.person),o=t.hoverT==="allday"?"ganztags":!t.hoverT||t.hoverT==="keep"?e.allday?"ganztags":`${e.time} (Zeit behalten)`:t.hoverT;i=`\u2192 ${L[t.target.day].slice(0,2)} ${E(s)} \xB7 ${r?r.label||r.key:t.target.person} \xB7 ${o}`}return d`<div
      class="ghost"
      style=${P({left:`${t.x-t.grabDX}px`,top:`${t.y-t.grabDY}px`,width:`${t.w}px`})}
    >
      <div>${e.emoji?d`${e.emoji} `:""}${e.time?d`<b>${e.time}</b> `:""}${e.title}</div>
      <div class="gt">${i}</div>
    </div>`}_renderDropPanel(){let t=this._drag;if(!t||!t.target||!t.panelRect)return"";let[e,i]=this.config.drop_hours,s=[];for(let _=e;_<=i;_++)s.push(String(_).padStart(2,"0"));let o=Math.max(t.panelRect.width,190)+(t.flyHour?104:0),a=36+34*(1+s.length),l=window.innerWidth,h=window.innerHeight,p=Math.min(Math.max(8,t.panelRect.left),Math.max(8,l-o-8)),c=Math.min(Math.max(8,t.panelRect.top),Math.max(8,h-a-8)),u=y(this._weekStart,t.target.day),g=this._persons().find(_=>_.key===t.target.person),f=_=>t.hoverT===_||!!t.hoverT&&t.hoverT.startsWith(_+":"),m=Math.max(1,this.config.drop_minute_step),v=[];for(let _=0;_<60;_+=m)v.push($(_));let x=t.flyHour?s.indexOf(t.flyHour):-1,V=x>=0?Math.min(36+34*(1+x),Math.max(0,a-34*v.length)):0;return d`<div class="droppanel" style=${P({left:`${p}px`,top:`${c}px`,width:`${o}px`})}>
      <div class="dpmain">
        <div class="drow head ${t.hoverT==="keep"?"hot":""}" data-t="keep">
          <span>${L[t.target.day]} ${E(u)} · ${g?g.label||g.key:""}</span>
          <span class="hint">Zeit behalten</span>
        </div>
        <div class="drow allday ${f("allday")?"hot":""}" data-t="allday">Ganztags</div>
        ${s.map(_=>d`<div class="drow ${t.flyHour===_?"open":""} ${f(_)?"hot":""}" data-t=${_}>
            <span>${_}:00</span>${f(_)?d`<span class="sel">${t.hoverT}</span>`:t.flyHour===_?d`<span class="sel">›</span>`:""}
          </div>`)}
      </div>
      ${x>=0?d`<div class="dpfly" style=${P({marginTop:`${V}px`})}>
            ${v.map(_=>{let nt=`${t.flyHour}:${_}`;return d`<div class="drow fly ${t.hoverT===nt?"hot":""}" data-t=${nt}>${nt}</div>`})}
          </div>`:""}
    </div>`}getCardSize(){return this._persons().length*3+2}render(){if(!this.config)return d``;let t=this._persons(),e=this._weekStart,i=[...Array(7)].map((a,l)=>y(e,l)),s=this._todayCol(),r=this._items(),o=`${this._rowH}px`;return d`
      <ha-card>
        ${this.config.title?d`<div class="ctitle">${this.config.title}</div>`:""}
        ${this.config.show_toolbar?this._renderToolbar(e,i):""}
        <div class="wrap">
          <table>
            <colgroup>
              <col class="pcol" />
              ${i.map(()=>d`<col class="dcol" />`)}
            </colgroup>
            <thead>
              <tr>
                <th class="corner"></th>
                ${i.map((a,l)=>d`<th class=${it({today:l===s})}>
                    ${L[l]}<br /><span class="dnum">${E(a)}</span>
                  </th>`)}
              </tr>
            </thead>
            <tbody>
              ${t.map(a=>d`<tr>
                  <td
                    class="pname"
                    style=${P({background:`rgba(${a.color},${a.alpha??.13})`,borderLeftColor:a.border,color:a.text})}
                  >
                    ${a.label||a.key}
                  </td>
                  ${i.map((l,h)=>{let p=r.filter(u=>u.dayOffset===h&&u.personKey===a.key),c=!!this._drag&&!!this._drag.target&&this._drag.target.person===a.key&&this._drag.target.day===h;return d`<td
                      class=${it({today:h===s,cell:!0,dropover:c})}
                      style=${P({height:o,background:`rgba(${a.color},${a.alpha??.13})`})}
                      data-person=${a.key}
                      data-day=${h}
                      @click=${()=>{Date.now()<this._suppressClickUntil||this._openCreate(a,l)}}
                      title="Neuen Termin für ${a.label||a.key} am ${E(l)} anlegen"
                    >
                      ${p.map(u=>d`<div
                          class=${it({ev:!0,lifted:this._isLifted(u)})}
                          @pointerdown=${g=>this._evPointerDown(g,u,g.currentTarget)}
                          @dragstart=${g=>g.preventDefault()}
                          @contextmenu=${g=>g.preventDefault()}
                          @click=${g=>{g.stopPropagation(),!(Date.now()<this._suppressClickUntil)&&this._openEdit(u)}}
                        >
                          ${u.recurring?d`<span class="rec" title="Serientermin">↻</span>`:""}
                          ${u.emoji?d`${u.emoji} `:""}${u.time?d`<b>${u.time}</b> `:""}${u.title}
                        </div>`)}
                    </td>`})}
                </tr>`)}
            </tbody>
          </table>
        </div>
        ${this._dialog?this._renderDialog():""}
        ${this._renderScope()}
        ${this._renderDropPanel()}
        ${this._renderGhost()}
        ${this._toast?d`<div class="toast ${this._toast.error?"err":""}">${this._toast.text}</div>`:""}
      </ha-card>
    `}_renderToolbar(t,e){let i=`${E(t)} \u2013 ${E(e[6])}`;return d`<div class="toolbar">
      <button class="nav" @click=${()=>this._shiftWeek(-1)} title="Vorherige Woche">‹</button>
      <button class="today-btn" @click=${()=>this._goToday()}>Heute</button>
      <button class="nav" @click=${()=>this._shiftWeek(1)} title="Nächste Woche">›</button>
      <span class="range">${i}</span>
      ${this._loading?d`<span class="spin">…</span>`:""}
    </div>`}_kbEnabled(){let t=this.config.keyboard;return t===!0?!0:t===!1?!1:(navigator.maxTouchPoints||0)>0}_kbType(t){let e=this._dialog;if(!e)return;let i=e.title||"";if(t==="back")i=i.slice(0,-1);else if(t==="space")i+=" ";else if(t==="shift"){this._kbShift=!this._kbShift;return}else{let s=/^[a-zäöü]$/.test(t);i+=this._kbShift&&s?t.toUpperCase():t,this._kbShift&&s&&(this._kbShift=!1)}this._dialog={...e,title:i,error:""}}_renderKeyboard(){let t=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","z","u","i","o","p","\xFC"],["a","s","d","f","g","h","j","k","l","\xF6","\xE4"],["shift","y","x","c","v","b","n","m","\xDF","back"]],e=i=>{if(i==="shift")return d`<button
          class="key wide ${this._kbShift?"active":""}"
          @click=${()=>this._kbType("shift")}
        >⇧</button>`;if(i==="back")return d`<button class="key wide" @click=${()=>this._kbType("back")}>⌫</button>`;let s=/^[a-zäöü]$/.test(i),r=this._kbShift&&s?i.toUpperCase():i;return d`<button class="key" @click=${()=>this._kbType(i)}>${r}</button>`};return d`<div class="kb" @mousedown=${i=>i.preventDefault()}>
      ${t.map(i=>d`<div class="kbrow">${i.map(e)}</div>`)}
      <div class="kbrow">
        <button class="key space" @click=${()=>this._kbType("space")}>Leerzeichen</button>
      </div>
    </div>`}_dateLabel(t){let e=C(t);return`${L[(e.getDay()+6)%7].slice(0,2)} ${E(e)}${e.getFullYear()}`}_shiftDate(t){this._set("date",k(y(C(this._dialog.date),t)))}_setStart(t,e){let i=this._dialog,s=h=>{let[p,c]=String(h||"0:0").split(":").map(Number);return p*60+c},r=h=>`${$(Math.floor(h/60))}:${$(h%60)}`,o=s(i.end)-s(i.start);o>0||(o=60);let a=t*60+e,l=Math.min(a+o,23*60+45);l<=a&&(l=Math.min(a+15,23*60+45)),this._dialog={...i,start:r(a),end:r(l),error:""}}_setEnd(t,e){this._dialog={...this._dialog,end:`${$(t)}:${$(e)}`,error:""}}_renderTimePick(t){let e=this._dialog,[i,s]=String(e[t]||"09:00").split(":").map(Number),r=[...Array(24).keys()],o=[];for(let c=0;c<60;c+=5)o.push(c);let a=s-s%5,l=c=>t==="start"?this._setStart(c,s):this._setEnd(c,s),h=c=>t==="start"?this._setStart(i,c):this._setEnd(i,c),p=(c,u,g,f)=>d`<div class="wheelwrap">
      <div
        class="wheel"
        data-kind=${c}
        @scroll=${m=>this._wheelScroll(m,u,f)}
        @pointerdown=${m=>this._wheelDown(m)}
        @pointermove=${m=>this._wheelMove(m)}
        @pointerup=${m=>this._wheelUp(m,u,f)}
        @pointercancel=${m=>this._wheelUp(m,u,f)}
      >
        <div class="wpad"></div>
        ${u.map((m,v)=>d`<div class="witem ${m===g?"on":""}" data-i=${v}>${$(m)}</div>`)}
        <div class="wpad"></div>
      </div>
    </div>`;return d`<div class="tpick wheels">
      <div class="wheelrow">
        <span class="wlabel">${t==="start"?"Von":"Bis"}</span>
        ${p("h",r,i,l)}
        <div class="wcolon">:</div>
        ${p("m",o,a,h)}
      </div>
      <div class="wactions"><button class="chip" @click=${()=>this._set("pick",null)}>Fertig</button></div>
    </div>`}_wheelScroll(t,e,i){let s=t.currentTarget;s._prog||s._dragging||(clearTimeout(s._t),s._t=setTimeout(()=>{let r=Math.max(0,Math.min(e.length-1,Math.round(s.scrollTop/44)));i(e[r])},140))}_wheelDown(t){if(t.pointerType!=="mouse"||t.button!==void 0&&t.button!==0)return;let e=t.currentTarget;e._dragging=!0,e._moved=!1,e._y0=t.clientY,e._top0=e.scrollTop,e._downItem=t.target&&t.target.closest?t.target.closest(".witem"):null,e.classList.add("dragging");try{e.setPointerCapture(t.pointerId)}catch{}t.preventDefault()}_wheelMove(t){let e=t.currentTarget;if(!e._dragging)return;let i=t.clientY-e._y0;Math.abs(i)>3&&(e._moved=!0),e.scrollTop=e._top0-i}_wheelUp(t,e,i){let s=t.currentTarget;if(!s._dragging)return;s._dragging=!1,s.classList.remove("dragging");try{s.releasePointerCapture(t.pointerId)}catch{}let r=Math.round(s.scrollTop/44);!s._moved&&s._downItem&&(r=Number(s._downItem.dataset.i)),r=Math.max(0,Math.min(e.length-1,r)),s._prog=!0,s.scrollTop=r*44,setTimeout(()=>s._prog=!1,250),i(e[r])}updated(t){if(super.updated(t),this.config&&this.config.row_height==="auto"&&window.innerHeight>=200){let o=this._lastMeasure,a=Math.max(0,this.getBoundingClientRect().top);(!o||o.vh!==window.innerHeight||o.vw!==window.innerWidth||Math.abs(o.top-a)>2)&&this._computeRowH()}let e=this._dialog&&this._dialog.pick;if(!e){this._wheelKey=null;return}if(this._wheelKey===e)return;this._wheelKey=e;let[i,s]=String(this._dialog[e]||"09:00").split(":").map(Number),r=(o,a)=>{let l=this.shadowRoot.querySelector(`.wheel[data-kind="${o}"]`);l&&(l._prog=!0,l.scrollTop=a*44,setTimeout(()=>l._prog=!1,250))};r("h",i),r("m",Math.floor(s/5))}_renderDatePick(){let t=this._dialog,e=[...Array(7)].map((i,s)=>y(this._weekStart,s));return d`<div class="fld">
      <span class="lbl">Datum <b class="val">${this._dateLabel(t.date)}</b></span>
      <div class="daterow">
        <button class="chip nav" @click=${()=>this._shiftDate(-1)} title="Ein Tag zurück">‹</button>
        ${e.map((i,s)=>d`<button class="chip day ${k(i)===t.date?"on":""}" @click=${()=>this._set("date",k(i))}>
            ${L[s].slice(0,2)}<small>${E(i)}</small>
          </button>`)}
        <button class="chip nav" @click=${()=>this._shiftDate(1)} title="Ein Tag vor">›</button>
      </div>
    </div>`}_renderDialog(){let t=this._dialog,e=this._persons(),i=this._icons(),s=Object.keys(i);return d`
      <div class="overlay" @click=${this._onOverlayClick}>
        <div class="modal wide" @click=${r=>r.stopPropagation()}>
          <div class="mhead">${t.mode==="create"?"Neuer Termin":"Termin bearbeiten"}</div>
          ${t.recurrence_id?d`<div class="note">
                Serientermin (${Bt(t.recurOrig,t.rrule)||"wiederkehrend"}) – beim Speichern oder Löschen wirst du
                gefragt, ob nur dieser oder auch alle zukünftigen Termine betroffen sind.
              </div>`:""}
          ${t.error?d`<div class="err">${t.error}</div>`:""}

          <div class="fld">
            <span class="lbl">Person</span>
            <div class="chips">
              ${e.map(r=>d`<button
                  class="chip person ${r.key===t.person?"on":""}"
                  style=${P({borderColor:r.border,background:r.key===t.person?`rgba(${r.color},0.6)`:`rgba(${r.color},0.16)`})}
                  @click=${()=>this._set("person",r.key)}
                >
                  ${r.label||r.key}
                </button>`)}
            </div>
          </div>

          <div class="fld">
            <span class="lbl">Icon</span>
            <div class="chips icons">
              <button class="chip ${t.iconKey?"":"on"}" @click=${()=>this._set("iconKey","")}>–<small>kein</small></button>
              ${s.map(r=>d`<button class="chip icon ${r===t.iconKey?"on":""}" @click=${()=>this._set("iconKey",r)}>
                  ${i[r]}<small>${r}</small>
                </button>`)}
            </div>
          </div>

          <label class="fld"
            >Titel
            <input
              type="text"
              .value=${t.title}
              placeholder="z.B. Joggen"
              @input=${r=>this._set("title",r.target.value)}
            />
          </label>

          ${this._renderDatePick()}

          <div class="fld">
            <div class="times">
              <button class="chip toggle ${t.allday?"on":""}" @click=${()=>this._set("allday",!t.allday)}>
                ${t.allday?"\u2611":"\u2610"} Ganztags
              </button>
              ${t.allday?"":d`<button
                      class="chip time ${t.pick==="start"?"on":""}"
                      @click=${()=>this._set("pick",t.pick==="start"?null:"start")}
                    >
                      <small>Von</small>${t.start}
                    </button>
                    <button
                      class="chip time ${t.pick==="end"?"on":""}"
                      @click=${()=>this._set("pick",t.pick==="end"?null:"end")}
                    >
                      <small>Bis</small>${t.end}
                    </button>`}
            </div>
            ${!t.allday&&t.pick?this._renderTimePick(t.pick):""}
          </div>

          <div class="fld">
            <span class="lbl">Wiederholen ${t.recur?d`<b class="val">${Bt(t.recur,t.rrule)}</b>`:""}</span>
            <div class="chips recur">
              ${t.recurrence_id?"":d`<button class="chip ${t.recur?"":"on"}" @click=${()=>this._set("recur","")}>Nie</button>`}
              ${rt.map(r=>d`<button class="chip ${r.key===t.recur?"on":""}" @click=${()=>this._set("recur",r.key)}>
                  ${r.label}
                </button>`)}
              ${t.recur==="custom"?d`<button class="chip on" title=${t.rrule}>Eigene Regel</button>`:""}
            </div>
          </div>

          ${this._kbEnabled()?this._renderKeyboard():""}

          <div class="actions">
            ${t.mode==="edit"?d`<button class="del" @click=${this._delete} ?disabled=${t.saving}>Löschen</button>`:""}
            <span class="spacer"></span>
            <button @click=${this._closeDialog} ?disabled=${t.saving}>Abbrechen</button>
            <button class="primary" @click=${this._save} ?disabled=${t.saving}>
              ${t.saving?"\u2026":"Speichern"}
            </button>
          </div>
        </div>
      </div>
    `}};q(F,"properties",{_weekStart:{state:!0},_events:{state:!0},_loading:{state:!0},_dialog:{state:!0},_kbShift:{state:!0},_drag:{state:!0},_toast:{state:!0},_rowH:{state:!0},_scope:{state:!0}}),q(F,"styles",G`
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
  `);customElements.define("family-week-planner-card",F);window.customCards=window.customCards||[];window.customCards.push({type:"family-week-planner-card",name:"Family Week Planner",description:"Editable person-by-day family week planner over one calendar entity (Person|Icon: Title events).",preview:!1,documentationURL:"https://github.com/psewar/family-week-planner-card"});var st=class extends S{setConfig(t){this._cfg={label:t&&t.label||"Dashboard neu laden",icon:t&&t.icon!==void 0?t.icon:"\u{1F504}"}}set hass(t){this._hass=t}getCardSize(){return 1}render(){let t=this._cfg||{};return d`<ha-card>
      <button class="reload" @click=${()=>window.location.reload()}>
        ${t.icon?d`<span class="ic">${t.icon}</span>`:""}<span>${t.label}</span>
      </button>
    </ha-card>`}};q(st,"styles",G`
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
  `);customElements.define("fwp-reload-card",st);window.customCards.push({type:"fwp-reload-card",name:"FWP Kiosk Reload",description:"One-tap full page reload for kiosk dashboards (companion to Family Week Planner).",preview:!1,documentationURL:"https://github.com/psewar/family-week-planner-card"});console.info(`%c family-week-planner-card %c v${ae} `,"color:#fff;background:#7e57c2;border-radius:4px 0 0 4px;padding:2px 4px","color:#7e57c2;background:#eee;border-radius:0 4px 4px 0;padding:2px 4px");
