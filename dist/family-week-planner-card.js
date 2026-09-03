var Nt=Object.defineProperty;var It=(n,t,e)=>t in n?Nt(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var q=(n,t,e)=>It(n,typeof t!="symbol"?t+"":t,e);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var X=globalThis,Z=X.ShadowRoot&&(X.ShadyCSS===void 0||X.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,nt=Symbol(),bt=new WeakMap,L=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==nt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(Z&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=bt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&bt.set(e,t))}return t}toString(){return this.cssText}},yt=n=>new L(typeof n=="string"?n:n+"",void 0,nt),G=(n,...t)=>{let e=n.length===1?n[0]:t.reduce((s,i,r)=>s+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[r+1],n[0]);return new L(e,n,nt)},$t=(n,t)=>{if(Z)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=X.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}},ot=Z?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return yt(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var{is:Wt,defineProperty:jt,getOwnPropertyDescriptor:Kt,getOwnPropertyNames:Bt,getOwnPropertySymbols:Vt,getPrototypeOf:Yt}=Object,J=globalThis,wt=J.trustedTypes,Ft=wt?wt.emptyScript:"",qt=J.reactiveElementPolyfillSupport,O=(n,t)=>n,at={toAttribute(n,t){switch(t){case Boolean:n=n?Ft:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},xt=(n,t)=>!Wt(n,t),vt={attribute:!0,type:String,converter:at,reflect:!1,useDefault:!1,hasChanged:xt};Symbol.metadata??=Symbol("metadata"),J.litPropertyMetadata??=new WeakMap;var x=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=vt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&jt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:r}=Kt(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get:i,set(o){let a=i?.call(this);r?.call(this,o),this.requestUpdate(t,a,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??vt}static _$Ei(){if(this.hasOwnProperty(O("elementProperties")))return;let t=Yt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(O("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(O("properties"))){let e=this.properties,s=[...Bt(e),...Vt(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(ot(i))}else t!==void 0&&e.push(ot(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return $t(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let r=(s.converter?.toAttribute!==void 0?s.converter:at).toAttribute(e,s.type);this._$Em=t,r==null?this.removeAttribute(i):this.setAttribute(i,r),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let r=s.getPropertyOptions(i),o=typeof r.converter=="function"?{fromAttribute:r.converter}:r.converter?.fromAttribute!==void 0?r.converter:at;this._$Em=i;let a=o.fromAttribute(e,r.type);this[i]=a??this._$Ej?.get(i)??a,this._$Em=null}}requestUpdate(t,e,s,i=!1,r){if(t!==void 0){let o=this.constructor;if(i===!1&&(r=this[t]),s??=o.getPropertyOptions(t),!((s.hasChanged??xt)(r,e)||s.useDefault&&s.reflect&&r===this._$Ej?.get(t)&&!this.hasAttribute(o._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:r},o){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,o??e??this[t]),r!==!0||o!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,r]of this._$Ep)this[i]=r;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,r]of s){let{wrapped:o}=r,a=this[i];o!==!0||this._$AL.has(i)||a===void 0||this.C(i,void 0,r,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[O("elementProperties")]=new Map,x[O("finalized")]=new Map,qt?.({ReactiveElement:x}),(J.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var gt=globalThis,kt=n=>n,Q=gt.trustedTypes,At=Q?Q.createPolicy("lit-html",{createHTML:n=>n}):void 0,Dt="$lit$",A=`lit$${Math.random().toFixed(9).slice(2)}$`,Pt="?"+A,Xt=`<${Pt}>`,P=document,I=()=>P.createComment(""),W=n=>n===null||typeof n!="object"&&typeof n!="function",ft=Array.isArray,Zt=n=>ft(n)||typeof n?.[Symbol.iterator]=="function",lt=`[ 	
\f\r]`,N=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,St=/-->/g,Et=/>/g,M=RegExp(`>|${lt}(?:([^\\s"'>=/]+)(${lt}*=${lt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Tt=/'/g,Ct=/"/g,Ht=/^(?:script|style|textarea|title)$/i,_t=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),h=_t(1),ce=_t(2),de=_t(3),w=Symbol.for("lit-noChange"),b=Symbol.for("lit-nothing"),Mt=new WeakMap,D=P.createTreeWalker(P,129);function zt(n,t){if(!ft(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return At!==void 0?At.createHTML(t):t}var Gt=(n,t)=>{let e=n.length-1,s=[],i,r=t===2?"<svg>":t===3?"<math>":"",o=N;for(let a=0;a<e;a++){let l=n[a],d,p,c=-1,u=0;for(;u<l.length&&(o.lastIndex=u,p=o.exec(l),p!==null);)u=o.lastIndex,o===N?p[1]==="!--"?o=St:p[1]!==void 0?o=Et:p[2]!==void 0?(Ht.test(p[2])&&(i=RegExp("</"+p[2],"g")),o=M):p[3]!==void 0&&(o=M):o===M?p[0]===">"?(o=i??N,c=-1):p[1]===void 0?c=-2:(c=o.lastIndex-p[2].length,d=p[1],o=p[3]===void 0?M:p[3]==='"'?Ct:Tt):o===Ct||o===Tt?o=M:o===St||o===Et?o=N:(o=M,i=void 0);let g=o===M&&n[a+1].startsWith("/>")?" ":"";r+=o===N?l+Xt:c>=0?(s.push(d),l.slice(0,c)+Dt+l.slice(c)+A+g):l+A+(c===-2?a:g)}return[zt(n,r+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},j=class n{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,o=0,a=t.length-1,l=this.parts,[d,p]=Gt(t,e);if(this.el=n.createElement(d,s),D.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=D.nextNode())!==null&&l.length<a;){if(i.nodeType===1){if(i.hasAttributes())for(let c of i.getAttributeNames())if(c.endsWith(Dt)){let u=p[o++],g=i.getAttribute(c).split(A),f=/([.?@])?(.*)/.exec(u);l.push({type:1,index:r,name:f[2],strings:g,ctor:f[1]==="."?dt:f[1]==="?"?ht:f[1]==="@"?pt:U}),i.removeAttribute(c)}else c.startsWith(A)&&(l.push({type:6,index:r}),i.removeAttribute(c));if(Ht.test(i.tagName)){let c=i.textContent.split(A),u=c.length-1;if(u>0){i.textContent=Q?Q.emptyScript:"";for(let g=0;g<u;g++)i.append(c[g],I()),D.nextNode(),l.push({type:2,index:++r});i.append(c[u],I())}}}else if(i.nodeType===8)if(i.data===Pt)l.push({type:2,index:r});else{let c=-1;for(;(c=i.data.indexOf(A,c+1))!==-1;)l.push({type:7,index:r}),c+=A.length-1}r++}}static createElement(t,e){let s=P.createElement("template");return s.innerHTML=t,s}};function z(n,t,e=n,s){if(t===w)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,r=W(t)?void 0:t._$litDirective$;return i?.constructor!==r&&(i?._$AO?.(!1),r===void 0?i=void 0:(i=new r(n),i._$AT(n,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=z(n,i._$AS(n,t.values),i,s)),t}var ct=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??P).importNode(e,!0);D.currentNode=i;let r=D.nextNode(),o=0,a=0,l=s[0];for(;l!==void 0;){if(o===l.index){let d;l.type===2?d=new K(r,r.nextSibling,this,t):l.type===1?d=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(d=new ut(r,this,t)),this._$AV.push(d),l=s[++a]}o!==l?.index&&(r=D.nextNode(),o++)}return D.currentNode=P,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},K=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=b,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=z(this,t,e),W(t)?t===b||t==null||t===""?(this._$AH!==b&&this._$AR(),this._$AH=b):t!==this._$AH&&t!==w&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Zt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==b&&W(this._$AH)?this._$AA.nextSibling.data=t:this.T(P.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=j.createElement(zt(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let r=new ct(i,this),o=r.u(this.options);r.p(e),this.T(o),this._$AH=r}}_$AC(t){let e=Mt.get(t.strings);return e===void 0&&Mt.set(t.strings,e=new j(t)),e}k(t){ft(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let r of t)i===e.length?e.push(s=new n(this.O(I()),this.O(I()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=kt(t).nextSibling;kt(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},U=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=b,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=b}_$AI(t,e=this,s,i){let r=this.strings,o=!1;if(r===void 0)t=z(this,t,e,0),o=!W(t)||t!==this._$AH&&t!==w,o&&(this._$AH=t);else{let a=t,l,d;for(t=r[0],l=0;l<r.length-1;l++)d=z(this,a[s+l],e,l),d===w&&(d=this._$AH[l]),o||=!W(d)||d!==this._$AH[l],d===b?t=b:t!==b&&(t+=(d??"")+r[l+1]),this._$AH[l]=d}o&&!i&&this.j(t)}j(t){t===b?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},dt=class extends U{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===b?void 0:t}},ht=class extends U{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==b)}},pt=class extends U{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=z(this,t,e,0)??b)===w)return;let s=this._$AH,i=t===b&&s!==b||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==b&&(s===b||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},ut=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){z(this,t)}};var Jt=gt.litHtmlPolyfillSupport;Jt?.(j,K),(gt.litHtmlVersions??=[]).push("3.3.3");var Ut=(n,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let r=e?.renderBefore??null;s._$litPart$=i=new K(t.insertBefore(I(),r),r,void 0,e??{})}return i._$AI(n),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var mt=globalThis,k=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=Ut(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return w}};k._$litElement$=!0,k.finalized=!0,mt.litElementHydrateSupport?.({LitElement:k});var Qt=mt.litElementPolyfillSupport;Qt?.({LitElement:k});(mt.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var tt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},et=n=>(...t)=>({_$litDirective$:n,values:t}),R=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Rt="important",te=" !"+Rt,H=et(class extends R{constructor(n){if(super(n),n.type!==tt.ATTRIBUTE||n.name!=="style"||n.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(n){return Object.keys(n).reduce((t,e)=>{let s=n[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(n,[t]){let{style:e}=n.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let s of this.ft)t[s]==null&&(this.ft.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let i=t[s];if(i!=null){this.ft.add(s);let r=typeof i=="string"&&i.endsWith(te);s.includes("-")||r?e.setProperty(s,r?i.slice(0,-11):i,r?Rt:""):e[s]=i}}return w}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var st=et(class extends R{constructor(n){if(super(n),n.type!==tt.ATTRIBUTE||n.name!=="class"||n.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(n){return" "+Object.keys(n).filter(t=>n[t]).join(" ")+" "}update(n,[t]){if(this.st===void 0){this.st=new Set,n.strings!==void 0&&(this.nt=new Set(n.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(let s in t)t[s]&&!this.nt?.has(s)&&this.st.add(s);return this.render(t)}let e=n.element.classList;for(let s of this.st)s in t||(e.remove(s),this.st.delete(s));for(let s in t){let i=!!t[s];i===this.st.has(s)||this.nt?.has(s)||(i?(e.add(s),this.st.add(s)):(e.remove(s),this.st.delete(s)))}return w}});var ee="0.6.0",B=["Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag"],se=[{key:"Familie",color:"126,87,194",border:"#7e57c2",text:"#c9b3f0",alpha:.13},{key:"Person 1",color:"30,136,229",border:"#1e88e5",text:"#8ecbff",alpha:.13},{key:"Person 2",color:"236,64,122",border:"#ec407a",text:"#ff9ec4",alpha:.13},{key:"Person 3",color:"0,137,123",border:"#00897b",text:"#5fd4c6",alpha:.15},{key:"Person 4",color:"251,140,0",border:"#fb8c00",text:"#ffca7a",alpha:.13},{key:"Essen",color:"109,76,65",border:"#6d4c41",text:"#c8b0a4",alpha:.16},{key:"Rest",color:"84,110,122",border:"#546e7a",text:"#b0bec5",alpha:.14}],ie={Tanzen:"\u{1F483}",Singen:"\u{1F3B5}",Chor:"\u{1F3B6}",Sport:"\u{1F3CB}\uFE0F",Arzt:"\u{1FA7A}",Schule:"\u{1F392}",Arbeit:"\u{1F4BC}",Auto:"\u{1F697}",Hund:"\u{1F415}",Geburtstag:"\u{1F382}",Ausflug:"\u{1F9ED}",Einkauf:"\u{1F6D2}",Mittag:"\u{1F374}",Nacht:"\u{1F319}",Konzert:"\u{1F3B8}",Biblio:"\u{1F4DA}"},$=n=>String(n).padStart(2,"0"),v=n=>`${n.getFullYear()}-${$(n.getMonth()+1)}-${$(n.getDate())}`,V=n=>`${$(n.getHours())}:${$(n.getMinutes())}`,S=n=>`${$(n.getDate())}.${$(n.getMonth()+1)}.`;function y(n,t){let e=new Date(n);return e.setDate(e.getDate()+t),e}function Lt(n){let t=new Date(n),e=(t.getDay()+6)%7;return t.setDate(t.getDate()-e),t.setHours(0,0,0,0),t}function E(n){if(/^\d{4}-\d{2}-\d{2}$/.test(n)){let[t,e,s]=n.split("-").map(Number);return new Date(t,e-1,s)}return new Date(n)}function Ot(n,t){let e=new Date(n.getFullYear(),n.getMonth(),n.getDate()),s=new Date(t.getFullYear(),t.getMonth(),t.getDate());return Math.round((e-s)/864e5)}var Y=class extends k{constructor(){super(),this._events=[],this._loading=!1,this._dialog=null,this._weekStart=Lt(new Date),this._hass=null,this._lastEntityUpdated=void 0,this._iconsUpdated=void 0,this._kbShift=!1,this._drag=null,this._pending=null,this._pressTimer=null,this._suppressClickUntil=0,this._toast=null,this._rowH=210,this._onResize=()=>{clearTimeout(this._resizeT),this._resizeT=setTimeout(()=>this._computeRowH(),120)}}connectedCallback(){super.connectedCallback(),this._onKey=t=>{t.key==="Escape"&&this._drag&&this._evPointerCancel()},window.addEventListener("keydown",this._onKey),window.addEventListener("resize",this._onResize)}disconnectedCallback(){window.removeEventListener("keydown",this._onKey),window.removeEventListener("resize",this._onResize),window.visualViewport&&window.visualViewport.removeEventListener("resize",this._onResize),clearInterval(this._tick),this._endDrag(),super.disconnectedCallback()}firstUpdated(){this._computeRowH(),setTimeout(()=>this._computeRowH(),350),window.visualViewport&&window.visualViewport.addEventListener("resize",this._onResize),this._tick=setInterval(()=>{if(!this.config||this.config.row_height!=="auto"||window.innerHeight<200)return;let t=this._lastMeasure,e=Math.max(0,this.getBoundingClientRect().top);(!t||t.vh!==window.innerHeight||t.vw!==window.innerWidth||Math.abs(t.top-e)>2)&&this._computeRowH()},2e3)}_computeRowH(){if(!this.config)return;if(typeof this.config.row_height=="number"){this._rowH!==this.config.row_height&&(this._rowH=this.config.row_height);return}let t=this.shadowRoot;if(!t||window.innerHeight<200)return;let e=Math.max(0,this.getBoundingClientRect().top);this._lastMeasure={vh:window.innerHeight,vw:window.innerWidth,top:e};let s=window.innerHeight-e-12,i=(p,c)=>{let u=t.querySelector(p);return u?u.getBoundingClientRect().height:c},r=i(".ctitle",0)+i(".toolbar",0)+i("thead",66)+20,o=Math.max(1,this._persons().length),a=t.querySelector("tbody tr"),l=a?Math.max(0,Math.round(a.getBoundingClientRect().height-this._rowH)):15,d=Math.floor((s-r)/o)-l-1;d=Math.max(this.config.row_min_height,Math.min(this.config.row_max_height,d)),d!==this._rowH&&(this._rowH=d)}setConfig(t){if(!t||!t.entity)throw new Error("family-week-planner-card: 'entity' (a calendar entity) is required.");this.config={title:t.title,entity:t.entity,persons:Array.isArray(t.persons)&&t.persons.length?t.persons:se,icons:t.icons&&Object.keys(t.icons).length?t.icons:ie,fallback_person:t.fallback_person||"Rest",row_height:t.row_height??"auto",row_min_height:t.row_min_height??64,row_max_height:t.row_max_height??420,icons_entity:t.icons_entity||null,show_toolbar:t.show_toolbar!==!1,default_icon:t.default_icon||"",default_start:t.default_start||"09:00",default_end:t.default_end||"10:00",keyboard:t.keyboard??"auto",drag:t.drag!==!1,drop_hours:Array.isArray(t.drop_hours)&&t.drop_hours.length===2?t.drop_hours:[6,22],drop_minutes_delay:t.drop_minutes_delay??1600,drop_minute_step:t.drop_minute_step??5}}set hass(t){if(this._hass=t,!this.config||!t)return;let e=t.states[this.config.entity],s=e?e.last_updated:"missing";if(this._lastEntityUpdated===void 0?(this._lastEntityUpdated=s,this._reload()):s!==this._lastEntityUpdated&&(this._lastEntityUpdated=s,this._reload()),this.config.icons_entity){let i=t.states[this.config.icons_entity],r=i?i.last_updated:"missing";r!==this._iconsUpdated&&(this._iconsUpdated=r,this.requestUpdate())}}get hass(){return this._hass}_persons(){return this.config.persons}_icons(){let t=this.config.icons_entity,e=t&&this._hass&&this._hass.states[t];if(e){let s=[];e.attributes&&Array.isArray(e.attributes.options)?s=e.attributes.options:typeof e.state=="string"&&(s=e.state.split(/[\n,;]+/));let i={};for(let r of s){let o=String(r).trim().match(/^([^:=]+?)\s*[:=]\s*(.+)$/);o&&(i[o[1].trim()]=o[2].trim())}if(Object.keys(i).length)return i}return this.config.icons}_iconEmoji(t){if(!t)return"";let e=this._icons(),s=Object.keys(e).find(i=>i.toLowerCase()===String(t).toLowerCase());return s?e[s]:""}_normIconKey(t){return t?Object.keys(this._icons()).find(s=>s.toLowerCase()===String(t).toLowerCase())||t:""}async _reload(){if(!this._hass||!this.config)return;let t=this._weekStart,e=y(t,7);this._loading=!0;try{let s=`calendars/${this.config.entity}?start=${encodeURIComponent(t.toISOString())}&end=${encodeURIComponent(e.toISOString())}`,i=await this._hass.callApi("GET",s);this._events=Array.isArray(i)?i:[]}catch(s){console.error("family-week-planner-card: failed to load events",s),this._events=[]}finally{this._loading=!1}}_parseSummary(t){let e=String(t||""),s=e.indexOf(":"),i,r;s>=0?(i=e.slice(0,s).trim(),r=e.slice(s+1).trim()):(i=e.trim(),r=e.trim());let o,a;if(i.includes("|")){let p=i.split("|");o=p[0].trim(),a=p[1].trim()}else o=i,a="";let l=this._persons().find(p=>p.key.toLowerCase()===o.toLowerCase());return{personKey:l?l.key:this.config.fallback_person,iconKey:this._normIconKey(a),title:r}}_composeSummary(t,e,s){let i="";return e?i=`${t}|${e}`:t!==this.config.fallback_person&&(i=t),i?`${i}: ${s}`:s}_items(){let t=[];for(let e of this._events){let s=e.start&&(e.start.dateTime||e.start.date);if(!s)continue;let i=!!(e.start&&e.start.date&&!e.start.dateTime),r=E(s),o=Ot(r,this._weekStart);if(o<0||o>6)continue;let{personKey:a,iconKey:l,title:d}=this._parseSummary(e.summary);t.push({dayOffset:o,personKey:a,emoji:this._iconEmoji(l),time:i?"":V(r),title:d,allday:i,raw:e})}return t.sort((e,s)=>e.allday===s.allday?e.time.localeCompare(s.time):e.allday?-1:1),t}_todayCol(){return Ot(new Date,this._weekStart)}_shiftWeek(t){this._weekStart=y(this._weekStart,t*7),this._reload()}_goToday(){this._weekStart=Lt(new Date),this._reload()}_openCreate(t,e){this._dialog={mode:"create",person:t.key,iconKey:this.config.default_icon,title:"",allday:!1,date:v(e),start:this.config.default_start,end:this.config.default_end,uid:null,recurrence_id:null,pick:null,saving:!1,error:""}}_openEdit(t){let e=t.raw,s=e.start.dateTime||e.start.date,i=e.end&&(e.end.dateTime||e.end.date),r=t.allday,o=E(s),a=i?E(i):y(o,r?1:0),l=this._parseSummary(e.summary);this._dialog={mode:"edit",person:l.personKey,iconKey:l.iconKey,title:l.title,allday:r,date:v(o),start:r?this.config.default_start:V(o),end:r?this.config.default_end:V(a),uid:e.uid,recurrence_id:e.recurrence_id||null,recurring:!!e.recurrence_id||!!e.rrule,pick:null,saving:!1,error:""}}_set(t,e){this._dialog={...this._dialog,[t]:e,error:""}}_closeDialog(){this._dialog=null}_onOverlayClick(){this._closeDialog()}_buildEventPayload(){let t=this._dialog,e=(t.title||"").trim();if(!e)return{error:"Bitte einen Titel eingeben."};let s=this._composeSummary(t.person,t.iconKey,e),i,r;if(t.allday)i=t.date,r=v(y(E(t.date),1));else{if(!t.start||!t.end)return{error:"Bitte Von- und Bis-Zeit eingeben."};if(t.end<=t.start)return{error:"Die Bis-Zeit muss nach der Von-Zeit liegen."};i=`${t.date} ${t.start}:00`,r=`${t.date} ${t.end}:00`}return{event:{summary:s,dtstart:i,dtend:r}}}async _save(){let t=this._buildEventPayload();if(t.error){this._set("error",t.error);return}let e=this._dialog;this._dialog={...this._dialog,saving:!0,error:""};try{if(e.mode==="create")try{await this._hass.callWS({type:"calendar/event/create",entity_id:this.config.entity,event:t.event})}catch(s){if(!await this._verifyCreated(t.event))throw s}else{let s={type:"calendar/event/update",entity_id:this.config.entity,uid:e.uid,event:t.event};e.recurrence_id&&(s.recurrence_id=e.recurrence_id,s.recurrence_range=""),await this._hass.callWS(s)}this._closeDialog(),await this._reload()}catch(s){this._dialog={...this._dialog,saving:!1,error:this._errText(s)}}}async _verifyCreated(t){let e=String(t.dtstart).slice(0,10);for(let s=0;s<4;s++){if(await this._reload(),this._events.some(r=>{let o=r.start&&(r.start.dateTime||r.start.date)||"";return r.summary===t.summary&&String(o).slice(0,10)===e}))return!0;await new Promise(r=>setTimeout(r,800))}return!1}async _delete(){let t=this._dialog;if(!t.uid){this._set("error","Dieser Termin hat keine ID und kann nicht gel\xF6scht werden.");return}this._dialog={...this._dialog,saving:!0,error:""};try{let e={type:"calendar/event/delete",entity_id:this.config.entity,uid:t.uid};t.recurrence_id&&(e.recurrence_id=t.recurrence_id,e.recurrence_range=""),await this._hass.callWS(e),this._closeDialog(),await this._reload()}catch(e){this._dialog={...this._dialog,saving:!1,error:this._errText(e)}}}_errText(t){if(!t)return"Unbekannter Fehler.";if(typeof t=="string")return t;if(t.message)return t.message;if(t.error)return t.error;try{return JSON.stringify(t)}catch{return"Fehler beim Speichern."}}_evPointerDown(t,e,s){if(!this.config.drag||this._dialog||t.button!==void 0&&t.button!==0)return;(this._drag||this._pending)&&this._endDrag();let i=s.getBoundingClientRect(),r={item:e,el:s,pointerId:t.pointerId,type:t.pointerType,startX:t.clientX,startY:t.clientY,x:t.clientX,y:t.clientY,grabDX:t.clientX-i.left,grabDY:t.clientY-i.top,w:i.width,target:null,hoverT:null,panelRect:null};this._pending=r,this._attachWin(),t.pointerType!=="mouse"&&(this._pressTimer=setTimeout(()=>{this._pending===r&&this._lift()},320))}_clearPress(){this._pressTimer&&(clearTimeout(this._pressTimer),this._pressTimer=null)}_attachWin(){this._winAttached||(this._winAttached=!0,this._onWinMove=t=>this._evPointerMove(t),this._onWinUp=t=>this._evPointerUp(t),this._onWinCancel=()=>this._evPointerCancel(),window.addEventListener("pointermove",this._onWinMove,{capture:!0,passive:!1}),window.addEventListener("pointerup",this._onWinUp,{capture:!0}),window.addEventListener("pointercancel",this._onWinCancel,{capture:!0}),window.addEventListener("blur",this._onWinCancel))}_detachWin(){this._winAttached&&(this._winAttached=!1,window.removeEventListener("pointermove",this._onWinMove,{capture:!0}),window.removeEventListener("pointerup",this._onWinUp,{capture:!0}),window.removeEventListener("pointercancel",this._onWinCancel,{capture:!0}),window.removeEventListener("blur",this._onWinCancel))}_endDrag(){this._clearPress(),this._flyLeave(),this._pending=null,this._drag=null,this._detachWin()}_lift(){let t=this._pending;t&&(this._clearPress(),this._pending=null,this._drag={...t},this._updateDragTarget(t.x,t.y))}_evPointerMove(t){let e=this._drag||this._pending;if(!(!e||t.pointerId!==e.pointerId)){if(!this._drag){let s=e;s.x=t.clientX,s.y=t.clientY;let i=Math.hypot(t.clientX-s.startX,t.clientY-s.startY);s.type==="mouse"?i>8&&this._lift():i>12&&this._endDrag();return}t.preventDefault(),this._drag={...this._drag,x:t.clientX,y:t.clientY},this._updateDragTarget(t.clientX,t.clientY)}}_evPointerUp(t){let e=this._drag||this._pending;if(!e||t.pointerId!==e.pointerId)return;let s=this._drag;this._endDrag(),s&&(t.preventDefault(),this._suppressClickUntil=Date.now()+500,s.target&&this._performDrop(s))}_evPointerCancel(){this._endDrag()}_updateDragTarget(t,e){let s=this._drag;if(!s)return;let i=this.shadowRoot.elementFromPoint(t,e),r=c=>i&&i.closest?i.closest(c):null,{target:o,hoverT:a,panelRect:l,flyHour:d}=s,p=r(".drow");if(p){let c=p.dataset.t;if(p.classList.contains("fly"))a=c;else if(c==="keep"||c==="allday")a=c,this._flyLeave(),d=null;else{let u=p.getBoundingClientRect();a=`${c}:${e>u.top+u.height/2?"30":"00"}`,c!==this._flyHoverHour&&(this._flyLeave(),d&&d!==c&&(d=null),this._flyHoverHour=c,this._flyTimer=setTimeout(()=>{this._drag&&this._flyHoverHour===c&&(this._drag={...this._drag,flyHour:c})},this.config.drop_minutes_delay))}}else if(!r(".droppanel")){this._flyLeave(),d=null;let c=r("td.cell");if(c){let u=c.dataset.person,g=Number(c.dataset.day);(!o||o.person!==u||o.day!==g)&&(o={person:u,day:g},l=c.getBoundingClientRect()),a="keep"}else o=null,l=null,a=null}this._drag={...s,target:o,hoverT:a,panelRect:l,flyHour:d}}_flyLeave(){this._flyTimer&&(clearTimeout(this._flyTimer),this._flyTimer=null),this._flyHoverHour=null}async _performDrop(t){let e=t.item,s=e.raw,i=t.hoverT||"keep";if(t.target.day===e.dayOffset&&t.target.person===e.personKey&&i==="keep")return;let o=y(this._weekStart,t.target.day),a=E(s.start.dateTime||s.start.date),l=s.end&&(s.end.dateTime||s.end.date),d=l?E(l):y(a,e.allday?1:0),p,c;if(i==="allday"||i==="keep"&&e.allday){let f=e.allday?Math.max(1,Math.round((d-a)/864e5)):1;p=v(o),c=v(y(o,f))}else{let f,m;i==="keep"?(f=a.getHours(),m=a.getMinutes()):[f,m]=i.split(":").map(Number);let T=e.allday?60*6e4:Math.max(5*6e4,d-a),C=new Date(o.getFullYear(),o.getMonth(),o.getDate(),f,m,0),F=new Date(C.getTime()+T);p=`${v(C)} ${V(C)}:00`,c=`${v(F)} ${V(F)}:00`}let u=s.summary;if(t.target.person!==e.personKey){let f=this._parseSummary(s.summary);u=this._composeSummary(t.target.person,f.iconKey,f.title)}let g={type:"calendar/event/update",entity_id:this.config.entity,uid:s.uid,event:{summary:u,dtstart:p,dtend:c}};s.recurrence_id&&(g.recurrence_id=s.recurrence_id,g.recurrence_range=""),this._toast={text:"Verschiebe \u2026"};try{await this._hass.callWS(g),await this._reload(),this._toast=null}catch(f){this._toast={text:"Verschieben fehlgeschlagen: "+this._errText(f),error:!0},setTimeout(()=>this._toast=null,4500)}}_isLifted(t){let e=this._drag;return!!e&&e.item.raw.uid===t.raw.uid&&(e.item.raw.recurrence_id||null)===(t.raw.recurrence_id||null)}_renderGhost(){let t=this._drag;if(!t)return"";let e=t.item,s="Loslassen bricht ab";if(t.target){let i=y(this._weekStart,t.target.day),r=this._persons().find(a=>a.key===t.target.person),o=t.hoverT==="allday"?"ganztags":!t.hoverT||t.hoverT==="keep"?e.allday?"ganztags":`${e.time} (Zeit behalten)`:t.hoverT;s=`\u2192 ${B[t.target.day].slice(0,2)} ${S(i)} \xB7 ${r?r.label||r.key:t.target.person} \xB7 ${o}`}return h`<div
      class="ghost"
      style=${H({left:`${t.x-t.grabDX}px`,top:`${t.y-t.grabDY}px`,width:`${t.w}px`})}
    >
      <div>${e.emoji?h`${e.emoji} `:""}${e.time?h`<b>${e.time}</b> `:""}${e.title}</div>
      <div class="gt">${s}</div>
    </div>`}_renderDropPanel(){let t=this._drag;if(!t||!t.target||!t.panelRect)return"";let[e,s]=this.config.drop_hours,i=[];for(let _=e;_<=s;_++)i.push(String(_).padStart(2,"0"));let o=Math.max(t.panelRect.width,190)+(t.flyHour?104:0),a=36+34*(1+i.length),l=window.innerWidth,d=window.innerHeight,p=Math.min(Math.max(8,t.panelRect.left),Math.max(8,l-o-8)),c=Math.min(Math.max(8,t.panelRect.top),Math.max(8,d-a-8)),u=y(this._weekStart,t.target.day),g=this._persons().find(_=>_.key===t.target.person),f=_=>t.hoverT===_||!!t.hoverT&&t.hoverT.startsWith(_+":"),m=Math.max(1,this.config.drop_minute_step),T=[];for(let _=0;_<60;_+=m)T.push($(_));let C=t.flyHour?i.indexOf(t.flyHour):-1,F=C>=0?Math.min(36+34*(1+C),Math.max(0,a-34*T.length)):0;return h`<div class="droppanel" style=${H({left:`${p}px`,top:`${c}px`,width:`${o}px`})}>
      <div class="dpmain">
        <div class="drow head ${t.hoverT==="keep"?"hot":""}" data-t="keep">
          <span>${B[t.target.day]} ${S(u)} · ${g?g.label||g.key:""}</span>
          <span class="hint">Zeit behalten</span>
        </div>
        <div class="drow allday ${f("allday")?"hot":""}" data-t="allday">Ganztags</div>
        ${i.map(_=>h`<div class="drow ${t.flyHour===_?"open":""} ${f(_)?"hot":""}" data-t=${_}>
            <span>${_}:00</span>${f(_)?h`<span class="sel">${t.hoverT}</span>`:t.flyHour===_?h`<span class="sel">›</span>`:""}
          </div>`)}
      </div>
      ${C>=0?h`<div class="dpfly" style=${H({marginTop:`${F}px`})}>
            ${T.map(_=>{let rt=`${t.flyHour}:${_}`;return h`<div class="drow fly ${t.hoverT===rt?"hot":""}" data-t=${rt}>${rt}</div>`})}
          </div>`:""}
    </div>`}getCardSize(){return this._persons().length*3+2}render(){if(!this.config)return h``;let t=this._persons(),e=this._weekStart,s=[...Array(7)].map((a,l)=>y(e,l)),i=this._todayCol(),r=this._items(),o=`${this._rowH}px`;return h`
      <ha-card>
        ${this.config.title?h`<div class="ctitle">${this.config.title}</div>`:""}
        ${this.config.show_toolbar?this._renderToolbar(e,s):""}
        <div class="wrap">
          <table>
            <colgroup>
              <col class="pcol" />
              ${s.map(()=>h`<col class="dcol" />`)}
            </colgroup>
            <thead>
              <tr>
                <th class="corner"></th>
                ${s.map((a,l)=>h`<th class=${st({today:l===i})}>
                    ${B[l]}<br /><span class="dnum">${S(a)}</span>
                  </th>`)}
              </tr>
            </thead>
            <tbody>
              ${t.map(a=>h`<tr>
                  <td
                    class="pname"
                    style=${H({background:`rgba(${a.color},${a.alpha??.13})`,borderLeftColor:a.border,color:a.text})}
                  >
                    ${a.label||a.key}
                  </td>
                  ${s.map((l,d)=>{let p=r.filter(u=>u.dayOffset===d&&u.personKey===a.key),c=!!this._drag&&!!this._drag.target&&this._drag.target.person===a.key&&this._drag.target.day===d;return h`<td
                      class=${st({today:d===i,cell:!0,dropover:c})}
                      style=${H({height:o,background:`rgba(${a.color},${a.alpha??.13})`})}
                      data-person=${a.key}
                      data-day=${d}
                      @click=${()=>{Date.now()<this._suppressClickUntil||this._openCreate(a,l)}}
                      title="Neuen Termin für ${a.label||a.key} am ${S(l)} anlegen"
                    >
                      ${p.map(u=>h`<div
                          class=${st({ev:!0,lifted:this._isLifted(u)})}
                          @pointerdown=${g=>this._evPointerDown(g,u,g.currentTarget)}
                          @dragstart=${g=>g.preventDefault()}
                          @contextmenu=${g=>g.preventDefault()}
                          @click=${g=>{g.stopPropagation(),!(Date.now()<this._suppressClickUntil)&&this._openEdit(u)}}
                        >
                          ${u.emoji?h`${u.emoji} `:""}${u.time?h`<b>${u.time}</b> `:""}${u.title}
                        </div>`)}
                    </td>`})}
                </tr>`)}
            </tbody>
          </table>
        </div>
        ${this._dialog?this._renderDialog():""}
        ${this._renderDropPanel()}
        ${this._renderGhost()}
        ${this._toast?h`<div class="toast ${this._toast.error?"err":""}">${this._toast.text}</div>`:""}
      </ha-card>
    `}_renderToolbar(t,e){let s=`${S(t)} \u2013 ${S(e[6])}`;return h`<div class="toolbar">
      <button class="nav" @click=${()=>this._shiftWeek(-1)} title="Vorherige Woche">‹</button>
      <button class="today-btn" @click=${()=>this._goToday()}>Heute</button>
      <button class="nav" @click=${()=>this._shiftWeek(1)} title="Nächste Woche">›</button>
      <span class="range">${s}</span>
      ${this._loading?h`<span class="spin">…</span>`:""}
    </div>`}_kbEnabled(){let t=this.config.keyboard;return t===!0?!0:t===!1?!1:(navigator.maxTouchPoints||0)>0}_kbType(t){let e=this._dialog;if(!e)return;let s=e.title||"";if(t==="back")s=s.slice(0,-1);else if(t==="space")s+=" ";else if(t==="shift"){this._kbShift=!this._kbShift;return}else{let i=/^[a-zäöü]$/.test(t);s+=this._kbShift&&i?t.toUpperCase():t,this._kbShift&&i&&(this._kbShift=!1)}this._dialog={...e,title:s,error:""}}_renderKeyboard(){let t=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","z","u","i","o","p","\xFC"],["a","s","d","f","g","h","j","k","l","\xF6","\xE4"],["shift","y","x","c","v","b","n","m","\xDF","back"]],e=s=>{if(s==="shift")return h`<button
          class="key wide ${this._kbShift?"active":""}"
          @click=${()=>this._kbType("shift")}
        >⇧</button>`;if(s==="back")return h`<button class="key wide" @click=${()=>this._kbType("back")}>⌫</button>`;let i=/^[a-zäöü]$/.test(s),r=this._kbShift&&i?s.toUpperCase():s;return h`<button class="key" @click=${()=>this._kbType(s)}>${r}</button>`};return h`<div class="kb" @mousedown=${s=>s.preventDefault()}>
      ${t.map(s=>h`<div class="kbrow">${s.map(e)}</div>`)}
      <div class="kbrow">
        <button class="key space" @click=${()=>this._kbType("space")}>Leerzeichen</button>
      </div>
    </div>`}_dateLabel(t){let e=E(t);return`${B[(e.getDay()+6)%7].slice(0,2)} ${S(e)}${e.getFullYear()}`}_shiftDate(t){this._set("date",v(y(E(this._dialog.date),t)))}_setStart(t,e){let s=this._dialog,i=d=>{let[p,c]=String(d||"0:0").split(":").map(Number);return p*60+c},r=d=>`${$(Math.floor(d/60))}:${$(d%60)}`,o=i(s.end)-i(s.start);o>0||(o=60);let a=t*60+e,l=Math.min(a+o,23*60+45);l<=a&&(l=Math.min(a+15,23*60+45)),this._dialog={...s,start:r(a),end:r(l),error:""}}_setEnd(t,e){this._dialog={...this._dialog,end:`${$(t)}:${$(e)}`,error:""}}_renderTimePick(t){let e=this._dialog,[s,i]=String(e[t]||"09:00").split(":").map(Number),r=[...Array(24).keys()],o=[];for(let c=0;c<60;c+=5)o.push(c);let a=i-i%5,l=c=>t==="start"?this._setStart(c,i):this._setEnd(c,i),d=c=>t==="start"?this._setStart(s,c):this._setEnd(s,c),p=(c,u,g,f)=>h`<div class="wheelwrap">
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
        ${u.map((m,T)=>h`<div class="witem ${m===g?"on":""}" data-i=${T}>${$(m)}</div>`)}
        <div class="wpad"></div>
      </div>
    </div>`;return h`<div class="tpick wheels">
      <div class="wheelrow">
        <span class="wlabel">${t==="start"?"Von":"Bis"}</span>
        ${p("h",r,s,l)}
        <div class="wcolon">:</div>
        ${p("m",o,a,d)}
      </div>
      <div class="wactions"><button class="chip" @click=${()=>this._set("pick",null)}>Fertig</button></div>
    </div>`}_wheelScroll(t,e,s){let i=t.currentTarget;i._prog||i._dragging||(clearTimeout(i._t),i._t=setTimeout(()=>{let r=Math.max(0,Math.min(e.length-1,Math.round(i.scrollTop/44)));s(e[r])},140))}_wheelDown(t){if(t.pointerType!=="mouse"||t.button!==void 0&&t.button!==0)return;let e=t.currentTarget;e._dragging=!0,e._moved=!1,e._y0=t.clientY,e._top0=e.scrollTop,e._downItem=t.target&&t.target.closest?t.target.closest(".witem"):null,e.classList.add("dragging");try{e.setPointerCapture(t.pointerId)}catch{}t.preventDefault()}_wheelMove(t){let e=t.currentTarget;if(!e._dragging)return;let s=t.clientY-e._y0;Math.abs(s)>3&&(e._moved=!0),e.scrollTop=e._top0-s}_wheelUp(t,e,s){let i=t.currentTarget;if(!i._dragging)return;i._dragging=!1,i.classList.remove("dragging");try{i.releasePointerCapture(t.pointerId)}catch{}let r=Math.round(i.scrollTop/44);!i._moved&&i._downItem&&(r=Number(i._downItem.dataset.i)),r=Math.max(0,Math.min(e.length-1,r)),i._prog=!0,i.scrollTop=r*44,setTimeout(()=>i._prog=!1,250),s(e[r])}updated(t){if(super.updated(t),this.config&&this.config.row_height==="auto"&&window.innerHeight>=200){let o=this._lastMeasure,a=Math.max(0,this.getBoundingClientRect().top);(!o||o.vh!==window.innerHeight||o.vw!==window.innerWidth||Math.abs(o.top-a)>2)&&this._computeRowH()}let e=this._dialog&&this._dialog.pick;if(!e){this._wheelKey=null;return}if(this._wheelKey===e)return;this._wheelKey=e;let[s,i]=String(this._dialog[e]||"09:00").split(":").map(Number),r=(o,a)=>{let l=this.shadowRoot.querySelector(`.wheel[data-kind="${o}"]`);l&&(l._prog=!0,l.scrollTop=a*44,setTimeout(()=>l._prog=!1,250))};r("h",s),r("m",Math.floor(i/5))}_renderDatePick(){let t=this._dialog,e=[...Array(7)].map((s,i)=>y(this._weekStart,i));return h`<div class="fld">
      <span class="lbl">Datum <b class="val">${this._dateLabel(t.date)}</b></span>
      <div class="daterow">
        <button class="chip nav" @click=${()=>this._shiftDate(-1)} title="Ein Tag zurück">‹</button>
        ${e.map((s,i)=>h`<button class="chip day ${v(s)===t.date?"on":""}" @click=${()=>this._set("date",v(s))}>
            ${B[i].slice(0,2)}<small>${S(s)}</small>
          </button>`)}
        <button class="chip nav" @click=${()=>this._shiftDate(1)} title="Ein Tag vor">›</button>
      </div>
    </div>`}_renderDialog(){let t=this._dialog,e=this._persons(),s=this._icons(),i=Object.keys(s);return h`
      <div class="overlay" @click=${this._onOverlayClick}>
        <div class="modal wide" @click=${r=>r.stopPropagation()}>
          <div class="mhead">${t.mode==="create"?"Neuer Termin":"Termin bearbeiten"}</div>
          ${t.recurring?h`<div class="note">Serientermin – Änderungen betreffen diesen Termin.</div>`:""}
          ${t.error?h`<div class="err">${t.error}</div>`:""}

          <div class="fld">
            <span class="lbl">Person</span>
            <div class="chips">
              ${e.map(r=>h`<button
                  class="chip person ${r.key===t.person?"on":""}"
                  style=${H({borderColor:r.border,background:r.key===t.person?`rgba(${r.color},0.6)`:`rgba(${r.color},0.16)`})}
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
              ${i.map(r=>h`<button class="chip icon ${r===t.iconKey?"on":""}" @click=${()=>this._set("iconKey",r)}>
                  ${s[r]}<small>${r}</small>
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
              ${t.allday?"":h`<button
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

          ${this._kbEnabled()?this._renderKeyboard():""}

          <div class="actions">
            ${t.mode==="edit"?h`<button class="del" @click=${this._delete} ?disabled=${t.saving}>Löschen</button>`:""}
            <span class="spacer"></span>
            <button @click=${this._closeDialog} ?disabled=${t.saving}>Abbrechen</button>
            <button class="primary" @click=${this._save} ?disabled=${t.saving}>
              ${t.saving?"\u2026":"Speichern"}
            </button>
          </div>
        </div>
      </div>
    `}};q(Y,"properties",{_weekStart:{state:!0},_events:{state:!0},_loading:{state:!0},_dialog:{state:!0},_kbShift:{state:!0},_drag:{state:!0},_toast:{state:!0},_rowH:{state:!0}}),q(Y,"styles",G`
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
  `);customElements.define("family-week-planner-card",Y);window.customCards=window.customCards||[];window.customCards.push({type:"family-week-planner-card",name:"Family Week Planner",description:"Editable person-by-day family week planner over one calendar entity (Person|Icon: Title events).",preview:!1,documentationURL:"https://github.com/psewar/family-week-planner-card"});var it=class extends k{setConfig(t){this._cfg={label:t&&t.label||"Dashboard neu laden",icon:t&&t.icon!==void 0?t.icon:"\u{1F504}"}}set hass(t){this._hass=t}getCardSize(){return 1}render(){let t=this._cfg||{};return h`<ha-card>
      <button class="reload" @click=${()=>window.location.reload()}>
        ${t.icon?h`<span class="ic">${t.icon}</span>`:""}<span>${t.label}</span>
      </button>
    </ha-card>`}};q(it,"styles",G`
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
  `);customElements.define("fwp-reload-card",it);window.customCards.push({type:"fwp-reload-card",name:"FWP Kiosk Reload",description:"One-tap full page reload for kiosk dashboards (companion to Family Week Planner).",preview:!1,documentationURL:"https://github.com/psewar/family-week-planner-card"});console.info(`%c family-week-planner-card %c v${ee} `,"color:#fff;background:#7e57c2;border-radius:4px 0 0 4px;padding:2px 4px","color:#7e57c2;background:#eee;border-radius:0 4px 4px 0;padding:2px 4px");
