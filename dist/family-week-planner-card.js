var ne=Object.defineProperty;var re=(o,t,e)=>t in o?ne(o,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):o[t]=e;var P=(o,t,e)=>re(o,typeof t!="symbol"?t+"":t,e);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var et=globalThis,it=et.ShadowRoot&&(et.ShadyCSS===void 0||et.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,pt=Symbol(),Dt=new WeakMap,I=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==pt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(it&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=Dt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&Dt.set(e,t))}return t}toString(){return this.cssText}},Mt=o=>new I(typeof o=="string"?o:o+"",void 0,pt),K=(o,...t)=>{let e=o.length===1?o[0]:t.reduce((i,s,n)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+o[n+1],o[0]);return new I(e,o,pt)},Lt=(o,t)=>{if(it)o.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let i=document.createElement("style"),s=et.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,o.appendChild(i)}},ut=it?o=>o:o=>o instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return Mt(e)})(o):o;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var{is:oe,defineProperty:ae,getOwnPropertyDescriptor:le,getOwnPropertyNames:ce,getOwnPropertySymbols:de,getPrototypeOf:he}=Object,st=globalThis,Rt=st.trustedTypes,pe=Rt?Rt.emptyScript:"",ue=st.reactiveElementPolyfillSupport,W=(o,t)=>o,ft={toAttribute(o,t){switch(t){case Boolean:o=o?pe:null;break;case Object:case Array:o=o==null?o:JSON.stringify(o)}return o},fromAttribute(o,t){let e=o;switch(t){case Boolean:e=o!==null;break;case Number:e=o===null?null:Number(o);break;case Object:case Array:try{e=JSON.parse(o)}catch{e=null}}return e}},zt=(o,t)=>!oe(o,t),Pt={attribute:!0,type:String,converter:ft,reflect:!1,useDefault:!1,hasChanged:zt};Symbol.metadata??=Symbol("metadata"),st.litPropertyMetadata??=new WeakMap;var E=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Pt){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&ae(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:n}=le(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get:s,set(r){let a=s?.call(this);n?.call(this,r),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Pt}static _$Ei(){if(this.hasOwnProperty(W("elementProperties")))return;let t=he(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(W("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(W("properties"))){let e=this.properties,i=[...ce(e),...de(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(ut(s))}else t!==void 0&&e.push(ut(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Lt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$ET(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let n=(i.converter?.toAttribute!==void 0?i.converter:ft).toAttribute(e,i.type);this._$Em=t,n==null?this.removeAttribute(s):this.setAttribute(s,n),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let n=i.getPropertyOptions(s),r=typeof n.converter=="function"?{fromAttribute:n.converter}:n.converter?.fromAttribute!==void 0?n.converter:ft;this._$Em=s;let a=r.fromAttribute(e,n.type);this[s]=a??this._$Ej?.get(s)??a,this._$Em=null}}requestUpdate(t,e,i,s=!1,n){if(t!==void 0){let r=this.constructor;if(s===!1&&(n=this[t]),i??=r.getPropertyOptions(t),!((i.hasChanged??zt)(n,e)||i.useDefault&&i.reflect&&n===this._$Ej?.get(t)&&!this.hasAttribute(r._$Eu(t,i))))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:i,reflect:s,wrapped:n},r){i&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,r??e??this[t]),n!==!0||r!==void 0)||(this._$AL.has(t)||(this.hasUpdated||i||(e=void 0),this._$AL.set(t,e)),s===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[s,n]of this._$Ep)this[s]=n;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,n]of i){let{wrapped:r}=n,a=this[s];r!==!0||this._$AL.has(s)||a===void 0||this.C(s,void 0,n,a)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(i=>i.hostUpdate?.()),this.update(e)):this._$EM()}catch(i){throw t=!1,this._$EM(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};E.elementStyles=[],E.shadowRootOptions={mode:"open"},E[W("elementProperties")]=new Map,E[W("finalized")]=new Map,ue?.({ReactiveElement:E}),(st.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var $t=globalThis,Ht=o=>o,nt=$t.trustedTypes,Ut=nt?nt.createPolicy("lit-html",{createHTML:o=>o}):void 0,Wt="$lit$",C=`lit$${Math.random().toFixed(9).slice(2)}$`,jt="?"+C,fe=`<${jt}>`,R=document,B=()=>R.createComment(""),F=o=>o===null||typeof o!="object"&&typeof o!="function",wt=Array.isArray,ge=o=>wt(o)||typeof o?.[Symbol.iterator]=="function",gt=`[ 	
\f\r]`,j=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ot=/-->/g,Nt=/>/g,M=RegExp(`>|${gt}(?:([^\\s"'>=/]+)(${gt}*=${gt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Yt=/'/g,It=/"/g,Bt=/^(?:script|style|textarea|title)$/i,xt=o=>(t,...e)=>({_$litType$:o,strings:t,values:e}),c=xt(1),ze=xt(2),He=xt(3),k=Symbol.for("lit-noChange"),y=Symbol.for("lit-nothing"),Kt=new WeakMap,L=R.createTreeWalker(R,129);function Ft(o,t){if(!wt(o)||!o.hasOwnProperty("raw"))throw Error("invalid template strings array");return Ut!==void 0?Ut.createHTML(t):t}var _e=(o,t)=>{let e=o.length-1,i=[],s,n=t===2?"<svg>":t===3?"<math>":"",r=j;for(let a=0;a<e;a++){let l=o[a],h,u,d=-1,p=0;for(;p<l.length&&(r.lastIndex=p,u=r.exec(l),u!==null);)p=r.lastIndex,r===j?u[1]==="!--"?r=Ot:u[1]!==void 0?r=Nt:u[2]!==void 0?(Bt.test(u[2])&&(s=RegExp("</"+u[2],"g")),r=M):u[3]!==void 0&&(r=M):r===M?u[0]===">"?(r=s??j,d=-1):u[1]===void 0?d=-2:(d=r.lastIndex-u[2].length,h=u[1],r=u[3]===void 0?M:u[3]==='"'?It:Yt):r===It||r===Yt?r=M:r===Ot||r===Nt?r=j:(r=M,s=void 0);let f=r===M&&o[a+1].startsWith("/>")?" ":"";n+=r===j?l+fe:d>=0?(i.push(h),l.slice(0,d)+Wt+l.slice(d)+C+f):l+C+(d===-2?a:f)}return[Ft(o,n+(o[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),i]},q=class o{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0,a=t.length-1,l=this.parts,[h,u]=_e(t,e);if(this.el=o.createElement(h,i),L.currentNode=this.el.content,e===2||e===3){let d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=L.nextNode())!==null&&l.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(let d of s.getAttributeNames())if(d.endsWith(Wt)){let p=u[r++],f=s.getAttribute(d).split(C),g=/([.?@])?(.*)/.exec(p);l.push({type:1,index:n,name:g[2],strings:f,ctor:g[1]==="."?mt:g[1]==="?"?bt:g[1]==="@"?yt:H}),s.removeAttribute(d)}else d.startsWith(C)&&(l.push({type:6,index:n}),s.removeAttribute(d));if(Bt.test(s.tagName)){let d=s.textContent.split(C),p=d.length-1;if(p>0){s.textContent=nt?nt.emptyScript:"";for(let f=0;f<p;f++)s.append(d[f],B()),L.nextNode(),l.push({type:2,index:++n});s.append(d[p],B())}}}else if(s.nodeType===8)if(s.data===jt)l.push({type:2,index:n});else{let d=-1;for(;(d=s.data.indexOf(C,d+1))!==-1;)l.push({type:7,index:n}),d+=C.length-1}n++}}static createElement(t,e){let i=R.createElement("template");return i.innerHTML=t,i}};function z(o,t,e=o,i){if(t===k)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,n=F(t)?void 0:t._$litDirective$;return s?.constructor!==n&&(s?._$AO?.(!1),n===void 0?s=void 0:(s=new n(o),s._$AT(o,e,i)),i!==void 0?(e._$Co??=[])[i]=s:e._$Cl=s),s!==void 0&&(t=z(o,s._$AS(o,t.values),s,i)),t}var _t=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??R).importNode(e,!0);L.currentNode=s;let n=L.nextNode(),r=0,a=0,l=i[0];for(;l!==void 0;){if(r===l.index){let h;l.type===2?h=new V(n,n.nextSibling,this,t):l.type===1?h=new l.ctor(n,l.name,l.strings,this,t):l.type===6&&(h=new vt(n,this,t)),this._$AV.push(h),l=i[++a]}r!==l?.index&&(n=L.nextNode(),r++)}return L.currentNode=R,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},V=class o{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=y,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=z(this,t,e),F(t)?t===y||t==null||t===""?(this._$AH!==y&&this._$AR(),this._$AH=y):t!==this._$AH&&t!==k&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):ge(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==y&&F(this._$AH)?this._$AA.nextSibling.data=t:this.T(R.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=q.createElement(Ft(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let n=new _t(s,this),r=n.u(this.options);n.p(e),this.T(r),this._$AH=n}}_$AC(t){let e=Kt.get(t.strings);return e===void 0&&Kt.set(t.strings,e=new q(t)),e}k(t){wt(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let n of t)s===e.length?e.push(i=new o(this.O(B()),this.O(B()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let i=Ht(t).nextSibling;Ht(t).remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},H=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,n){this.type=1,this._$AH=y,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=y}_$AI(t,e=this,i,s){let n=this.strings,r=!1;if(n===void 0)t=z(this,t,e,0),r=!F(t)||t!==this._$AH&&t!==k,r&&(this._$AH=t);else{let a=t,l,h;for(t=n[0],l=0;l<n.length-1;l++)h=z(this,a[i+l],e,l),h===k&&(h=this._$AH[l]),r||=!F(h)||h!==this._$AH[l],h===y?t=y:t!==y&&(t+=(h??"")+n[l+1]),this._$AH[l]=h}r&&!s&&this.j(t)}j(t){t===y?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},mt=class extends H{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===y?void 0:t}},bt=class extends H{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==y)}},yt=class extends H{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){if((t=z(this,t,e,0)??y)===k)return;let i=this._$AH,s=t===y&&i!==y||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,n=t!==y&&(i===y||s);s&&this.element.removeEventListener(this.name,this,i),n&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},vt=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){z(this,t)}};var me=$t.litHtmlPolyfillSupport;me?.(q,V),($t.litHtmlVersions??=[]).push("3.3.3");var qt=(o,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let n=e?.renderBefore??null;i._$litPart$=s=new V(t.insertBefore(B(),n),n,void 0,e??{})}return s._$AI(o),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var kt=globalThis,A=class extends E{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=qt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return k}};A._$litElement$=!0,A.finalized=!0,kt.litElementHydrateSupport?.({LitElement:A});var be=kt.litElementPolyfillSupport;be?.({LitElement:A});(kt.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var rt={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},ot=o=>(...t)=>({_$litDirective$:o,values:t}),U=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Vt="important",ye=" !"+Vt,D=ot(class extends U{constructor(o){if(super(o),o.type!==rt.ATTRIBUTE||o.name!=="style"||o.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(o){return Object.keys(o).reduce((t,e)=>{let i=o[e];return i==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${i};`},"")}update(o,[t]){let{style:e}=o.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let i of this.ft)t[i]==null&&(this.ft.delete(i),i.includes("-")?e.removeProperty(i):e[i]=null);for(let i in t){let s=t[i];if(s!=null){this.ft.add(i);let n=typeof s=="string"&&s.endsWith(ye);i.includes("-")||n?e.setProperty(i,n?s.slice(0,-11):s,n?Vt:""):e[i]=s}}return k}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Z=ot(class extends U{constructor(o){if(super(o),o.type!==rt.ATTRIBUTE||o.name!=="class"||o.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(o){return" "+Object.keys(o).filter(t=>o[t]).join(" ")+" "}update(o,[t]){if(this.st===void 0){this.st=new Set,o.strings!==void 0&&(this.nt=new Set(o.strings.join(" ").split(/\s/).filter(i=>i!=="")));for(let i in t)t[i]&&!this.nt?.has(i)&&this.st.add(i);return this.render(t)}let e=o.element.classList;for(let i of this.st)i in t||(e.remove(i),this.st.delete(i));for(let i in t){let s=!!t[i];s===this.st.has(i)||this.nt?.has(i)||(s?(e.add(i),this.st.add(i)):(e.remove(i),this.st.delete(i)))}return k}});var ve="0.9.0",O=["Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag"],te=[{key:"Familie",color:"126,87,194",border:"#7e57c2",text:"#c9b3f0",alpha:.13},{key:"Person 1",color:"30,136,229",border:"#1e88e5",text:"#8ecbff",alpha:.13},{key:"Person 2",color:"236,64,122",border:"#ec407a",text:"#ff9ec4",alpha:.13},{key:"Person 3",color:"0,137,123",border:"#00897b",text:"#5fd4c6",alpha:.15},{key:"Person 4",color:"251,140,0",border:"#fb8c00",text:"#ffca7a",alpha:.13},{key:"Essen",color:"109,76,65",border:"#6d4c41",text:"#c8b0a4",alpha:.16},{key:"Rest",color:"84,110,122",border:"#546e7a",text:"#b0bec5",alpha:.14}],ee={Tanzen:"\u{1F483}",Singen:"\u{1F3B5}",Chor:"\u{1F3B6}",Sport:"\u{1F3CB}\uFE0F",Arzt:"\u{1FA7A}",Schule:"\u{1F392}",Arbeit:"\u{1F4BC}",Auto:"\u{1F697}",Hund:"\u{1F415}",Geburtstag:"\u{1F382}",Ausflug:"\u{1F9ED}",Einkauf:"\u{1F6D2}",Mittag:"\u{1F374}",Nacht:"\u{1F319}",Konzert:"\u{1F3B8}",Biblio:"\u{1F4DA}"},x=o=>String(o).padStart(2,"0"),$=o=>`${o.getFullYear()}-${x(o.getMonth()+1)}-${x(o.getDate())}`,X=o=>`${x(o.getHours())}:${x(o.getMinutes())}`,T=o=>`${x(o.getDate())}.${x(o.getMonth()+1)}.`;function b(o,t){let e=new Date(o);return e.setDate(e.getDate()+t),e}function Zt(o){let t=new Date(o),e=(t.getDay()+6)%7;return t.setDate(t.getDate()-e),t.setHours(0,0,0,0),t}function w(o){if(/^\d{4}-\d{2}-\d{2}$/.test(o)){let[t,e,i]=o.split("-").map(Number);return new Date(t,e-1,i)}return new Date(o)}function St(o,t){let e=new Date(o.getFullYear(),o.getMonth(),o.getDate()),i=new Date(t.getFullYear(),t.getMonth(),t.getDate());return Math.round((e-i)/864e5)}var dt=[{key:"daily",label:"T\xE4glich",rrule:"FREQ=DAILY"},{key:"weekdays",label:"Mo\u2013Fr",rrule:"FREQ=WEEKLY;BYDAY=MO,TU,WE,TH,FR"},{key:"weekly",label:"W\xF6chentlich",rrule:"FREQ=WEEKLY"},{key:"biweekly",label:"Alle 2 Wochen",rrule:"FREQ=WEEKLY;INTERVAL=2"},{key:"monthly",label:"Monatlich",rrule:"FREQ=MONTHLY"},{key:"yearly",label:"J\xE4hrlich",rrule:"FREQ=YEARLY"}],Et=["MO","TU","WE","TH","FR","SA","SU"];function lt(o){let t={};for(let e of String(o||"").split(";")){let i=e.indexOf("=");i>0&&(t[e.slice(0,i).trim().toUpperCase()]=e.slice(i+1).trim().toUpperCase())}return t}function At(o){return Object.entries(o).filter(([,t])=>t!==void 0&&t!=="").map(([t,e])=>`${t}=${e}`).join(";")}function Xt(o,t){if(!o)return"";let{UNTIL:e,COUNT:i,WKST:s,...n}=lt(o);n.INTERVAL==="1"&&delete n.INTERVAL,n.FREQ==="WEEKLY"&&n.BYDAY&&t&&n.BYDAY===Et[(t.getDay()+6)%7]&&delete n.BYDAY;let r=At(n),a=dt.find(l=>At(lt(l.rrule))===r);return a?a.key:"custom"}function $e(o){let t=dt.find(e=>e.key===o);return t?t.rrule:""}function we(o,t){if(!o)return o;let e=lt(o);if(e.FREQ==="WEEKLY"&&e.BYDAY&&!e.BYDAY.includes(",")){let i=Et[(t.getDay()+6)%7];if(e.BYDAY!==i)return e.BYDAY=i,At(e)}return o}function Qt(o,t){if(!o)return"";if(o==="custom")return`eigene Regel (${t})`;let e=dt.find(i=>i.key===o);return e?e.label:o}var Gt=["#7e57c2","#1e88e5","#ec407a","#00897b","#fb8c00","#6d4c41","#546e7a","#8e24aa","#43a047","#d81b60","#00acc1","#f4511e"];function Tt(o){if(!o)return null;let t=String(o).trim(),e=t.match(/^#?([0-9a-f]{6})$/i);return e?[parseInt(e[1].slice(0,2),16),parseInt(e[1].slice(2,4),16),parseInt(e[1].slice(4,6),16)]:(e=t.match(/^#?([0-9a-f]{3})$/i),e?[...e[1]].map(i=>parseInt(i+i,16)):(e=t.match(/^(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})$/),e?[Number(e[1]),Number(e[2]),Number(e[3])]:null))}var Ct=o=>"#"+o.map(t=>Math.max(0,Math.min(255,Math.round(t))).toString(16).padStart(2,"0")).join(""),xe=(o,t)=>Ct(o.map(e=>e+(255-e)*t));function Y(o,t,e,i={}){let s=Tt(t)||Tt(Gt[e%Gt.length]);return{key:o,color:s.join(","),border:Ct(s),text:xe(s,.55),...i}}function ke(o,t){if(!o)return null;let e=[];o.attributes&&Array.isArray(o.attributes.options)?e=o.attributes.options:typeof o.state=="string"&&(e=o.state.split(/[\n;]+/));let i=[];for(let s of e){let n=String(s).split(":").map(l=>l.trim()),r=n[0];if(!r||i.some(l=>l.key.toLowerCase()===r.toLowerCase()))continue;let a=Y(r,n[1]||"",i.length);n[2]&&(a.label=n[2]),i.push(a)}return i.length?(t&&!i.some(s=>s.key.toLowerCase()===t.toLowerCase())&&i.push(Y(t,"#546e7a",i.length,{alpha:.14})),i):null}var Q=()=>{let o=new Date;return o.setHours(0,0,0,0),o};function ie(o){let t=o.todo_entities??(o.todo_entity?[o.todo_entity]:[]);return Array.isArray(t)||(t=[t]),t.map(e=>typeof e=="string"?{entity:e}:e).filter(e=>e&&typeof e.entity=="string").map(e=>({entity:e.entity,label:e.label||e.entity.split(".").pop(),person:e.person||null,icon:e.icon||"",prefix:e.prefix!==!1,readonly:!!e.readonly}))}var ct=[{key:"daily",label:"T\xE4glich",rule:{freq:"DAILY",interval:1}},{key:"every2",label:"Alle 2 Tage",rule:{freq:"DAILY",interval:2}},{key:"every3",label:"Alle 3 Tage",rule:{freq:"DAILY",interval:3}},{key:"weekly",label:"W\xF6chentlich",rule:{freq:"WEEKLY",interval:1}},{key:"biweekly",label:"Alle 2 Wochen",rule:{freq:"WEEKLY",interval:2}},{key:"monthly",label:"Monatlich",rule:{freq:"MONTHLY",interval:1}},{key:"weekdays",label:"Mo\u2013Fr",rule:{freq:"WEEKLY",interval:1,byday:[0,1,2,3,4]}}],se=["Mo","Di","Mi","Do","Fr","Sa","So"];function Se(o){if(!o)return null;let t=String(o).trim().replace(/^(↻|wiederholen:|repeat:)\s*/i,"").trim();if(!t)return null;let e=t.toLowerCase().replace(/ä/g,"ae").replace(/ö/g,"oe").replace(/ü/g,"ue"),i;if(/^freq=/i.test(t)){let r=lt(t),a={freq:r.FREQ,interval:Math.max(1,Number(r.INTERVAL||1))};return r.BYDAY&&(a.byday=r.BYDAY.split(",").map(l=>Et.indexOf(l)).filter(l=>l>=0)),["DAILY","WEEKLY","MONTHLY","YEARLY"].includes(a.freq)?a:null}if(/^(taeglich|daily|jeden tag)$/.test(e))return{freq:"DAILY",interval:1};if(i=e.match(/^alle (\d+) tage?$/))return{freq:"DAILY",interval:Number(i[1])};if(/^(woechentlich|weekly|jede woche)$/.test(e))return{freq:"WEEKLY",interval:1};if(i=e.match(/^alle (\d+) wochen?$/))return{freq:"WEEKLY",interval:Number(i[1])};if(/^(monatlich|monthly|jeden monat)$/.test(e))return{freq:"MONTHLY",interval:1};if(i=e.match(/^alle (\d+) monate?$/))return{freq:"MONTHLY",interval:Number(i[1])};if(/^(jaehrlich|yearly|jedes jahr)$/.test(e))return{freq:"YEARLY",interval:1};if(/^(mo\s*[–-]\s*fr|werktags|weekdays)$/.test(e))return{freq:"WEEKLY",interval:1,byday:[0,1,2,3,4]};let s=e.split(/[,\s/+]+/).filter(Boolean),n=s.map(r=>se.findIndex(a=>a.toLowerCase()===r.slice(0,2))).filter(r=>r>=0);return s.length&&n.length===s.length?{freq:"WEEKLY",interval:1,byday:[...new Set(n)].sort()}:null}function N(o){if(!o)return"";let t=o.interval||1;if(o.freq==="WEEKLY"&&o.byday&&o.byday.length){let e=[...o.byday].sort();return e.join()==="0,1,2,3,4"?"Mo\u2013Fr":e.map(i=>se[i]).join(", ")}return o.freq==="DAILY"?t===1?"t\xE4glich":`alle ${t} Tage`:o.freq==="WEEKLY"?t===1?"w\xF6chentlich":`alle ${t} Wochen`:o.freq==="MONTHLY"?t===1?"monatlich":`alle ${t} Monate`:o.freq==="YEARLY"?"j\xE4hrlich":""}function Ae(o){if(!o)return"";let t=ct.find(e=>N(e.rule)===N(o));return t?t.key:"custom"}function Te(o){let t=ct.find(e=>e.key===o);return t?t.rule:null}function Ee(o,t){let e=Math.max(1,t.interval||1);if(t.freq==="WEEKLY"&&t.byday&&t.byday.length){for(let s=1;s<=7;s++){let n=b(o,s),r=(n.getDay()+6)%7;if(t.byday.includes(r))return e>1&&r<=(o.getDay()+6)%7?b(n,7*(e-1)):n}return b(o,7*e)}if(t.freq==="DAILY")return b(o,e);if(t.freq==="WEEKLY")return b(o,7*e);let i=new Date(o);if(t.freq==="MONTHLY"){let s=i.getDate();return i.setDate(1),i.setMonth(i.getMonth()+e),i.setDate(Math.min(s,new Date(i.getFullYear(),i.getMonth()+1,0).getDate())),i}return t.freq==="YEARLY"?(i.setFullYear(i.getFullYear()+e),i):b(o,1)}function Jt(o){let t=String(o||"").split(/\r?\n/),e=null,i=[];for(let s of t){let n=s.trim();!e&&/^(↻|wiederholen:|repeat:)/i.test(n)&&(e=Se(n),e)||i.push(s)}return{rule:e,rest:i.join(`
`).trim()}}function Ce(o,t){let e=[];return t&&e.push("\u21BB "+N(t)),o&&e.push(o),e.join(`
`)}var G=class extends A{constructor(){super(),this._events=[],this._loading=!1,this._dialog=null,this._weekStart=Zt(new Date),this._hass=null,this._lastEntityUpdated=void 0,this._iconsUpdated=void 0,this._kbShift=!1,this._drag=null,this._pending=null,this._pressTimer=null,this._suppressClickUntil=0,this._toast=null,this._scope=null,this._todos={},this._todoSubs=[],this._todoSig=void 0,this._cleaned=new Set,this._rowH=210,this._onResize=()=>{clearTimeout(this._resizeT),this._resizeT=setTimeout(()=>this._computeRowH(),120)}}connectedCallback(){super.connectedCallback(),this._onKey=t=>{t.key==="Escape"&&(this._scope?this._scope=null:this._drag&&this._evPointerCancel())},window.addEventListener("keydown",this._onKey),window.addEventListener("resize",this._onResize)}disconnectedCallback(){window.removeEventListener("keydown",this._onKey),window.removeEventListener("resize",this._onResize),window.visualViewport&&window.visualViewport.removeEventListener("resize",this._onResize),clearInterval(this._tick),this._endDrag(),this._todoUnsubscribe(),super.disconnectedCallback()}firstUpdated(){this._computeRowH(),setTimeout(()=>this._computeRowH(),350),window.visualViewport&&window.visualViewport.addEventListener("resize",this._onResize),this._tick=setInterval(()=>{if(!this.config||this.config.row_height!=="auto"||window.innerHeight<200)return;let t=this._lastMeasure,e=Math.max(0,this.getBoundingClientRect().top);(!t||t.vh!==window.innerHeight||t.vw!==window.innerWidth||Math.abs(t.top-e)>2)&&this._computeRowH()},2e3)}_computeRowH(){if(!this.config)return;if(typeof this.config.row_height=="number"){this._rowH!==this.config.row_height&&(this._rowH=this.config.row_height);return}let t=this.shadowRoot;if(!t||window.innerHeight<200)return;let e=Math.max(0,this.getBoundingClientRect().top);this._lastMeasure={vh:window.innerHeight,vw:window.innerWidth,top:e};let i=window.innerHeight-e-12,s=(u,d)=>{let p=t.querySelector(u);return p?p.getBoundingClientRect().height:d},n=s(".ctitle",0)+s(".toolbar",0)+s("thead",66)+20,r=Math.max(1,this._persons().length),a=t.querySelector("tbody tr"),l=a?Math.max(0,Math.round(a.getBoundingClientRect().height-this._rowH)):15,h=Math.floor((i-n)/r)-l-1;h=Math.max(this.config.row_min_height,Math.min(this.config.row_max_height,h)),h!==this._rowH&&(this._rowH=h)}setConfig(t){if(!t||!t.entity)throw new Error("family-week-planner-card: 'entity' (a calendar entity) is required.");this.config={title:t.title,entity:t.entity,persons:Array.isArray(t.persons)&&t.persons.length?t.persons:te,icons:t.icons&&Object.keys(t.icons).length?t.icons:ee,fallback_person:t.fallback_person||"Rest",row_height:t.row_height??"auto",row_min_height:t.row_min_height??64,row_max_height:t.row_max_height??420,icons_entity:t.icons_entity||null,show_toolbar:t.show_toolbar!==!1,default_icon:t.default_icon||"",default_start:t.default_start||"09:00",default_end:t.default_end||"10:00",keyboard:t.keyboard??"auto",drag:t.drag!==!1,drop_hours:Array.isArray(t.drop_hours)&&t.drop_hours.length===2?t.drop_hours:[6,22],drop_minutes_delay:t.drop_minutes_delay??1600,drop_minute_step:t.drop_minute_step??5,todo_entities:ie(t),todo_cleanup_days:t.todo_cleanup_days??7,default_kind:t.default_kind==="task"?"task":"event",persons_entity:t.persons_entity||null},this.config.persons=this.config.persons.map((i,s)=>({...Y(i.key,i.border||i.color,s),...i}));let e=this.config.fallback_person;this.config.persons.some(i=>i.key.toLowerCase()===e.toLowerCase())||(this.config.persons=[...this.config.persons,Y(e,"#546e7a",this.config.persons.length,{alpha:.14})]),this._personsStamp=void 0}static getConfigElement(){return document.createElement("family-week-planner-card-editor")}static getStubConfig(t){let e=t&&t.states||{},i=Object.keys(e).filter(n=>n.startsWith("calendar."));return{entity:i.find(n=>(((e[n]||{}).attributes||{}).supported_features||0)&4)||i[0]||"calendar.example",title:"Familienwoche"}}set hass(t){if(this._hass=t,!this.config||!t)return;let e=t.states[this.config.entity],i=e?e.last_updated:"missing";if(this._lastEntityUpdated===void 0?(this._lastEntityUpdated=i,this._reload()):i!==this._lastEntityUpdated&&(this._lastEntityUpdated=i,this._reload()),this.config.todo_entities.length){this._todoSubscribe(t);let s=this.config.todo_entities.map(n=>(t.states[n.entity]||{}).last_updated||"missing").join("|");if(s!==this._todoSig){let n=this._todoSig===void 0;this._todoSig=s,n||this._loadTodos()}}if(this.config.persons_entity){let s=t.states[this.config.persons_entity],n=s?s.last_updated:"missing";n!==this._personsUpdated&&(this._personsUpdated=n,this.requestUpdate())}if(this.config.icons_entity){let s=t.states[this.config.icons_entity],n=s?s.last_updated:"missing";n!==this._iconsUpdated&&(this._iconsUpdated=n,this.requestUpdate())}}get hass(){return this._hass}_persons(){let t=this.config.persons_entity,e=t&&this._hass&&this._hass.states[t];if(e){let i=`${e.last_updated}|${e.state}`;if(this._personsStamp!==i&&(this._personsStamp=i,this._personsFromHelper=ke(e,this.config.fallback_person)),this._personsFromHelper)return this._personsFromHelper}return this.config.persons}_icons(){let t=this.config.icons_entity,e=t&&this._hass&&this._hass.states[t];if(e){let i=[];e.attributes&&Array.isArray(e.attributes.options)?i=e.attributes.options:typeof e.state=="string"&&(i=e.state.split(/[\n,;]+/));let s={};for(let n of i){let r=String(n).trim().match(/^([^:=]+?)\s*[:=]\s*(.+)$/);r&&(s[r[1].trim()]=r[2].trim())}if(Object.keys(s).length)return s}return this.config.icons}_iconEmoji(t){if(!t)return"";let e=this._icons(),i=Object.keys(e).find(s=>s.toLowerCase()===String(t).toLowerCase());return i?e[i]:""}_normIconKey(t){return t?Object.keys(this._icons()).find(i=>i.toLowerCase()===String(t).toLowerCase())||t:""}_svc(t,e,i){return this._hass.callService("todo",e,i,{entity_id:t.entity})}async _loadTodos(){let t=this.config.todo_entities;if(!t.length||!this._hass)return;let e={...this._todos};await Promise.all(t.map(async i=>{try{let s=await this._hass.callWS({type:"todo/item/list",entity_id:i.entity});e[i.entity]=s&&s.items||[]}catch(s){console.error("family-week-planner-card: failed to load to-do list",i.entity,s),e[i.entity]=e[i.entity]||[]}})),this._todos=e,this._cleanupCompleted()}_todoSubscribe(t){if(!(this._todoSubs.length||!t.connection||typeof t.connection.subscribeMessage!="function"))for(let e of this.config.todo_entities)try{let i=t.connection.subscribeMessage(s=>{s&&Array.isArray(s.items)&&(this._todos={...this._todos,[e.entity]:s.items})},{type:"todo/item/subscribe",entity_id:e.entity});this._todoSubs.push(i)}catch{}}_todoUnsubscribe(){for(let t of this._todoSubs)Promise.resolve(t).then(e=>typeof e=="function"&&e()).catch(()=>{});this._todoSubs=[]}_cleanupCompleted(){let t=Number(this.config.todo_cleanup_days);if(!t||t<=0||!this._hass)return;let e=b(Q(),-t);for(let i of this.config.todo_entities)if(!i.readonly)for(let s of this._todos[i.entity]||[]){if(s.status!=="completed"||!s.due)continue;let n=`${i.entity}/${s.uid}`;this._cleaned.has(n)||w(String(s.due).slice(0,10))<e&&(this._cleaned.add(n),this._svc(i,"remove_item",{item:s.uid}).catch(()=>{}))}}async _toggleTask(t){let{list:e,raw:i}=t;this._toast={text:t.done?"Wieder offen \u2026":"Erledigt \u2026"};try{if(t.done){if(await this._svc(e,"update_item",{item:i.uid,status:"needs_action"}),t.rule){let s=(this._todos[e.entity]||[]).find(n=>n.uid!==i.uid&&n.summary===i.summary&&n.status!=="completed");s&&await this._svc(e,"remove_item",{item:s.uid})}}else if(await this._svc(e,"update_item",{item:i.uid,status:"completed"}),t.rule){let s=i.due?w(String(i.due).slice(0,10)):Q(),n=s<Q()?Q():s,r={item:i.summary,due_date:$(Ee(n,t.rule))};i.description&&(r.description=i.description),await this._svc(e,"add_item",r)}await this._loadTodos(),this._toast=null}catch(s){this._toast={text:"Aufgabe konnte nicht ge\xE4ndert werden: "+this._errText(s),error:!0},setTimeout(()=>this._toast=null,4500)}}async _moveTask(t){let e=t.item,i=b(this._weekStart,t.target.day);if(t.target.day===e.dayOffset&&t.target.person===e.personKey&&!e.overdue&&!e.undated)return;let s={item:e.raw.uid,due_date:$(i)};if(e.list.prefix&&t.target.person!==e.personKey){let n=this._parseSummary(e.raw.summary);s.rename=this._composeSummary(t.target.person,n.iconKey,n.title)}this._toast={text:"Verschiebe \u2026"};try{await this._svc(e.list,"update_item",s),await this._loadTodos(),this._toast=null}catch(n){this._toast={text:"Verschieben fehlgeschlagen: "+this._errText(n),error:!0},setTimeout(()=>this._toast=null,4500)}}async _reload(){if(!this._hass||!this.config)return;let t=this._weekStart,e=b(t,7);this._loading=!0;let i=this._loadTodos();try{let s=`calendars/${this.config.entity}?start=${encodeURIComponent(t.toISOString())}&end=${encodeURIComponent(e.toISOString())}`,n=await this._hass.callApi("GET",s);this._events=Array.isArray(n)?n:[]}catch(s){console.error("family-week-planner-card: failed to load events",s),this._events=[]}finally{await i,this._loading=!1}}_parseSummary(t){let e=String(t||""),i=e.indexOf(":"),s,n;i>=0?(s=e.slice(0,i).trim(),n=e.slice(i+1).trim()):(s=e.trim(),n=e.trim());let r,a;if(s.includes("|")){let u=s.split("|");r=u[0].trim(),a=u[1].trim()}else r=s,a="";let l=this._persons().find(u=>u.key.toLowerCase()===r.toLowerCase());return{personKey:l?l.key:this.config.fallback_person,iconKey:this._normIconKey(a),title:n}}_composeSummary(t,e,i){let s="";return e?s=`${t}|${e}`:t!==this.config.fallback_person&&(s=t),s?`${s}: ${i}`:i}_items(){let t=[];for(let r of this._events){let a=r.start&&(r.start.dateTime||r.start.date);if(!a)continue;let l=!!(r.start&&r.start.date&&!r.start.dateTime),h=w(a),u=St(h,this._weekStart);if(u<0||u>6)continue;let{personKey:d,iconKey:p,title:f}=this._parseSummary(r.summary);t.push({kind:"event",dayOffset:u,personKey:d,emoji:this._iconEmoji(p),time:l?"":X(h),title:f,allday:l,recurring:!!(r.recurrence_id||r.rrule),raw:r})}let e=this._todayCol(),i=e>=0&&e<=6?e:-1,s=Q();for(let r of this.config.todo_entities)for(let a of this._todos[r.entity]||[]){let l=a.status==="completed",h=a.due?w(String(a.due).slice(0,10)):null,u=h?St(h,this._weekStart):-1,d=!1,p=!h;if(l){if(!h)continue}else if(h)h<s&&i>=0&&(u=i,d=!0);else{if(i<0)continue;u=i}if(u<0||u>6)continue;let f,g,_;r.prefix?({personKey:f,iconKey:g,title:_}=this._parseSummary(a.summary),f===this.config.fallback_person&&r.person&&(f=r.person),!g&&r.icon&&(g=this._normIconKey(r.icon))):(f=r.person||this.config.fallback_person,g=this._normIconKey(r.icon),_=a.summary);let{rule:v}=Jt(a.description);t.push({kind:"task",list:r,dayOffset:u,personKey:f,emoji:this._iconEmoji(g),time:"",title:_,allday:!0,recurring:!!v,rule:v,done:l,overdue:d,undated:p,raw:a})}let n=r=>r.kind==="task"?1:r.allday?0:2;return t.sort((r,a)=>n(r)-n(a)||r.time.localeCompare(a.time)||(r.done===a.done?0:r.done?1:-1)),t}_todayCol(){return St(new Date,this._weekStart)}_shiftWeek(t){this._weekStart=b(this._weekStart,t*7),this._reload()}_goToday(){this._weekStart=Zt(new Date),this._reload()}_openCreate(t,e){this._dialog={mode:"create",kind:this.config.todo_entities.length?this.config.default_kind:"event",list:(this.config.todo_entities[0]||{}).entity||null,trecur:"",trule:null,descRest:"",done:!1,person:t.key,iconKey:this.config.default_icon,title:"",allday:!1,date:$(e),start:this.config.default_start,end:this.config.default_end,uid:null,recurrence_id:null,rrule:"",recur:"",recurOrig:"",pick:null,saving:!1,error:""}}_openEditTask(t){let e=t.raw,i=t.list;if(i.readonly)return;let s=i.prefix?this._parseSummary(e.summary):{personKey:t.personKey,iconKey:this._normIconKey(i.icon),title:e.summary},{rule:n,rest:r}=Jt(e.description);this._dialog={mode:"edit",kind:"task",list:i.entity,person:s.personKey,iconKey:s.iconKey,title:s.title,allday:!0,date:e.due?String(e.due).slice(0,10):$(new Date),start:this.config.default_start,end:this.config.default_end,uid:e.uid,recurrence_id:null,rrule:"",recur:"",recurOrig:"",trecur:Ae(n),trule:n,descRest:r,done:e.status==="completed",pick:null,saving:!1,error:""}}_openEdit(t){if(t.kind==="task")return this._openEditTask(t);let e=t.raw,i=e.start.dateTime||e.start.date,s=e.end&&(e.end.dateTime||e.end.date),n=t.allday,r=w(i),a=s?w(s):b(r,n?1:0),l=this._parseSummary(e.summary);this._dialog={mode:"edit",person:l.personKey,iconKey:l.iconKey,title:l.title,allday:n,date:$(r),start:n?this.config.default_start:X(r),end:n?this.config.default_end:X(a),uid:e.uid,recurrence_id:e.recurrence_id||null,rrule:e.rrule||"",recur:Xt(e.rrule,r),recurOrig:Xt(e.rrule,r),pick:null,saving:!1,error:""}}_set(t,e){this._dialog={...this._dialog,[t]:e,error:""}}_closeDialog(){this._dialog=null}_onOverlayClick(){this._closeDialog()}_buildEventPayload(){let t=this._dialog,e=(t.title||"").trim();if(!e)return{error:"Bitte einen Titel eingeben."};let i=this._composeSummary(t.person,t.iconKey,e),s,n;if(t.allday)s=t.date,n=$(b(w(t.date),1));else{if(!t.start||!t.end)return{error:"Bitte Von- und Bis-Zeit eingeben."};if(t.end<=t.start)return{error:"Die Bis-Zeit muss nach der Von-Zeit liegen."};s=`${t.date} ${t.start}:00`,n=`${t.date} ${t.end}:00`}let r={summary:i,dtstart:s,dtend:n};return t.recur!==t.recurOrig&&t.recur!=="custom"&&(r.rrule=$e(t.recur)),{event:r}}async _saveTask(){let t=this._dialog,e=(t.title||"").trim();if(!e){this._set("error","Bitte einen Titel eingeben.");return}let i=this.config.todo_entities,s=i.find(l=>l.entity===t.list)||i[0];if(!s){this._set("error","Keine To-do-Liste konfiguriert.");return}let n=s.prefix?this._composeSummary(t.person,t.iconKey,e):e,r=t.trecur==="custom"?t.trule:Te(t.trecur),a=Ce(t.descRest,r);this._dialog={...t,saving:!0,error:""};try{if(t.mode==="create"){let l={item:n,due_date:t.date};a&&(l.description=a),await this._svc(s,"add_item",l)}else await this._svc(s,"update_item",{item:t.uid,rename:n,due_date:t.date,description:a});this._closeDialog(),await this._loadTodos()}catch(l){this._dialog={...this._dialog,saving:!1,error:this._errText(l)}}}async _deleteTask(){let t=this._dialog,e=this.config.todo_entities.find(i=>i.entity===t.list);if(!(!e||!t.uid)){this._dialog={...t,saving:!0,error:""};try{await this._svc(e,"remove_item",{item:t.uid}),this._closeDialog(),await this._loadTodos()}catch(i){this._dialog={...this._dialog,saving:!1,error:this._errText(i)}}}}async _save(){if(this._dialog&&this._dialog.kind==="task")return this._saveTask();let t=this._buildEventPayload();if(t.error){this._set("error",t.error);return}let e=this._dialog;if(e.mode==="edit"&&e.recurrence_id){let i="rrule"in t.event;this._askScope({title:"Serientermin \xE4ndern",text:i?"Der Rhythmus wurde ge\xE4ndert \u2013 das gilt f\xFCr diesen und alle zuk\xFCnftigen Termine.":"Wof\xFCr soll die \xC4nderung gelten?",options:[...i?[]:[{label:"Nur diesen Termin",range:""}],{label:"Diesen und alle zuk\xFCnftigen",sub:"vergangene bleiben unver\xE4ndert",range:"THISANDFUTURE"}],onPick:s=>this._commitSave(t.event,s)});return}await this._commitSave(t.event,null)}async _commitSave(t,e){let i=this._dialog;if(i){this._dialog={...i,saving:!0,error:""};try{if(i.mode==="create")try{await this._hass.callWS({type:"calendar/event/create",entity_id:this.config.entity,event:t})}catch(s){if(!await this._verifyCreated(t))throw s}else{let s={type:"calendar/event/update",entity_id:this.config.entity,uid:i.uid,event:t};i.recurrence_id&&e!==null&&(s.recurrence_id=i.recurrence_id,s.recurrence_range=e),await this._hass.callWS(s)}this._closeDialog(),await this._reload()}catch(s){this._dialog={...this._dialog,saving:!1,error:this._errText(s)}}}}_askScope(t){this._scope=t}_renderScope(){let t=this._scope;if(!t)return"";let e=i=>{this._scope=null,t.onPick(i.range)};return c`<div class="overlay scope" @click=${()=>this._scope=null}>
      <div class="modal scopebox" @click=${i=>i.stopPropagation()}>
        <div class="mhead">${t.title}</div>
        ${t.text?c`<div class="note">${t.text}</div>`:""}
        <div class="scopeopts">
          ${t.options.map(i=>c`<button class="sopt ${i.cls||""}" @click=${()=>e(i)}>
              ${i.label}${i.sub?c`<small>${i.sub}</small>`:""}
            </button>`)}
          <button class="sopt cancel" @click=${()=>this._scope=null}>Abbrechen</button>
        </div>
      </div>
    </div>`}async _verifyCreated(t){let e=String(t.dtstart).slice(0,10);for(let i=0;i<4;i++){if(await this._reload(),this._events.some(n=>{let r=n.start&&(n.start.dateTime||n.start.date)||"";return n.summary===t.summary&&String(r).slice(0,10)===e}))return!0;await new Promise(n=>setTimeout(n,800))}return!1}async _delete(){let t=this._dialog;if(t.kind==="task")return this._deleteTask();if(!t.uid){this._set("error","Dieser Termin hat keine ID und kann nicht gel\xF6scht werden.");return}if(t.recurrence_id){this._askScope({title:"Serientermin l\xF6schen",text:"Was soll gel\xF6scht werden?",options:[{label:"Nur diesen Termin",range:""},{label:"Diesen und alle zuk\xFCnftigen",sub:"vergangene bleiben",range:"THISANDFUTURE"},{label:"Ganze Serie",sub:"auch vergangene Termine",range:"ALL",cls:"del"}],onPick:e=>this._commitDelete(e)});return}await this._commitDelete(null)}async _commitDelete(t){let e=this._dialog;if(e){this._dialog={...e,saving:!0,error:""};try{let i={type:"calendar/event/delete",entity_id:this.config.entity,uid:e.uid};e.recurrence_id&&t!==null&&t!=="ALL"&&(i.recurrence_id=e.recurrence_id,i.recurrence_range=t),await this._hass.callWS(i),this._closeDialog(),await this._reload()}catch(i){this._dialog={...this._dialog,saving:!1,error:this._errText(i)}}}}_errText(t){if(!t)return"Unbekannter Fehler.";if(typeof t=="string")return t;if(t.message)return t.message;if(t.error)return t.error;try{return JSON.stringify(t)}catch{return"Fehler beim Speichern."}}_evPointerDown(t,e,i){if(!this.config.drag||this._dialog||t.button!==void 0&&t.button!==0||e.kind==="task"&&e.list.readonly)return;(this._drag||this._pending)&&this._endDrag();let s=i.getBoundingClientRect(),n={item:e,el:i,pointerId:t.pointerId,type:t.pointerType,startX:t.clientX,startY:t.clientY,x:t.clientX,y:t.clientY,grabDX:t.clientX-s.left,grabDY:t.clientY-s.top,w:s.width,target:null,hoverT:null,panelRect:null};this._pending=n,this._attachWin(),t.pointerType!=="mouse"&&(this._pressTimer=setTimeout(()=>{this._pending===n&&this._lift()},320))}_clearPress(){this._pressTimer&&(clearTimeout(this._pressTimer),this._pressTimer=null)}_attachWin(){this._winAttached||(this._winAttached=!0,this._onWinMove=t=>this._evPointerMove(t),this._onWinUp=t=>this._evPointerUp(t),this._onWinCancel=()=>this._evPointerCancel(),window.addEventListener("pointermove",this._onWinMove,{capture:!0,passive:!1}),window.addEventListener("pointerup",this._onWinUp,{capture:!0}),window.addEventListener("pointercancel",this._onWinCancel,{capture:!0}),window.addEventListener("blur",this._onWinCancel))}_detachWin(){this._winAttached&&(this._winAttached=!1,window.removeEventListener("pointermove",this._onWinMove,{capture:!0}),window.removeEventListener("pointerup",this._onWinUp,{capture:!0}),window.removeEventListener("pointercancel",this._onWinCancel,{capture:!0}),window.removeEventListener("blur",this._onWinCancel))}_endDrag(){this._clearPress(),this._flyLeave(),this._pending=null,this._drag=null,this._detachWin()}_lift(){let t=this._pending;t&&(this._clearPress(),this._pending=null,this._drag={...t},this._updateDragTarget(t.x,t.y))}_evPointerMove(t){let e=this._drag||this._pending;if(!(!e||t.pointerId!==e.pointerId)){if(!this._drag){let i=e;i.x=t.clientX,i.y=t.clientY;let s=Math.hypot(t.clientX-i.startX,t.clientY-i.startY);i.type==="mouse"?s>8&&this._lift():s>12&&this._endDrag();return}t.preventDefault(),this._drag={...this._drag,x:t.clientX,y:t.clientY},this._updateDragTarget(t.clientX,t.clientY)}}_evPointerUp(t){let e=this._drag||this._pending;if(!e||t.pointerId!==e.pointerId)return;let i=this._drag;this._endDrag(),i&&(t.preventDefault(),this._suppressClickUntil=Date.now()+500,i.target&&this._performDrop(i))}_evPointerCancel(){this._endDrag()}_updateDragTarget(t,e){let i=this._drag;if(!i)return;let s=this.shadowRoot.elementFromPoint(t,e),n=d=>s&&s.closest?s.closest(d):null,{target:r,hoverT:a,panelRect:l,flyHour:h}=i,u=n(".drow");if(u){let d=u.dataset.t;if(u.classList.contains("fly"))a=d;else if(d==="keep"||d==="allday")a=d,this._flyLeave(),h=null;else{let p=u.getBoundingClientRect();a=`${d}:${e>p.top+p.height/2?"30":"00"}`,d!==this._flyHoverHour&&(this._flyLeave(),h&&h!==d&&(h=null),this._flyHoverHour=d,this._flyTimer=setTimeout(()=>{this._drag&&this._flyHoverHour===d&&(this._drag={...this._drag,flyHour:d})},this.config.drop_minutes_delay))}}else if(!n(".droppanel")){this._flyLeave(),h=null;let d=n("td.cell");if(d){let p=d.dataset.person,f=Number(d.dataset.day);(!r||r.person!==p||r.day!==f)&&(r={person:p,day:f},l=i.item.kind==="task"?null:d.getBoundingClientRect()),a="keep"}else r=null,l=null,a=null}this._drag={...i,target:r,hoverT:a,panelRect:l,flyHour:h}}_flyLeave(){this._flyTimer&&(clearTimeout(this._flyTimer),this._flyTimer=null),this._flyHoverHour=null}async _performDrop(t){let e=t.item;if(e.kind==="task")return this._moveTask(t);let i=e.raw,s=t.hoverT||"keep";if(t.target.day===e.dayOffset&&t.target.person===e.personKey&&s==="keep")return;let r=b(this._weekStart,t.target.day),a=w(i.start.dateTime||i.start.date),l=i.end&&(i.end.dateTime||i.end.date),h=l?w(l):b(a,e.allday?1:0),u,d;if(s==="allday"||s==="keep"&&e.allday){let g=e.allday?Math.max(1,Math.round((h-a)/864e5)):1;u=$(r),d=$(b(r,g))}else{let g,_;s==="keep"?(g=a.getHours(),_=a.getMinutes()):[g,_]=s.split(":").map(Number);let v=e.allday?60*6e4:Math.max(5*6e4,h-a),S=new Date(r.getFullYear(),r.getMonth(),r.getDate(),g,_,0),tt=new Date(S.getTime()+v);u=`${$(S)} ${X(S)}:00`,d=`${$(tt)} ${X(tt)}:00`}let p=i.summary;if(t.target.person!==e.personKey){let g=this._parseSummary(i.summary);p=this._composeSummary(t.target.person,g.iconKey,g.title)}let f={type:"calendar/event/update",entity_id:this.config.entity,uid:i.uid,event:{summary:p,dtstart:u,dtend:d}};if(i.recurrence_id){f.recurrence_id=i.recurrence_id;let g=u.length===10,_=`${O[t.target.day]} ${T(r)}${g?", ganztags":" "+u.slice(11,16)}`;this._askScope({title:"Serientermin verschieben",text:`\u201E${e.title}" \u2192 ${_}`,options:[{label:"Nur diesen Termin",range:""},{label:"Diesen und alle zuk\xFCnftigen",sub:"vergangene bleiben",range:"THISANDFUTURE"}],onPick:v=>{if(f.recurrence_range=v,v==="THISANDFUTURE"&&i.rrule){let S=we(i.rrule,r);S!==i.rrule&&(f.event.rrule=S)}this._commitMove(f)}});return}await this._commitMove(f)}async _commitMove(t){this._toast={text:"Verschiebe \u2026"};try{await this._hass.callWS(t),await this._reload(),this._toast=null}catch(e){this._toast={text:"Verschieben fehlgeschlagen: "+this._errText(e),error:!0},setTimeout(()=>this._toast=null,4500)}}_isLifted(t){let e=this._drag;return!!e&&e.item.kind===t.kind&&e.item.raw.uid===t.raw.uid&&(e.item.raw.recurrence_id||null)===(t.raw.recurrence_id||null)}_renderGhost(){let t=this._drag;if(!t)return"";let e=t.item,i="Loslassen bricht ab";if(t.target){let s=b(this._weekStart,t.target.day),n=this._persons().find(a=>a.key===t.target.person),r=e.kind==="task"?"f\xE4llig":t.hoverT==="allday"?"ganztags":!t.hoverT||t.hoverT==="keep"?e.allday?"ganztags":`${e.time} (Zeit behalten)`:t.hoverT;i=`\u2192 ${O[t.target.day].slice(0,2)} ${T(s)} \xB7 ${n?n.label||n.key:t.target.person} \xB7 ${r}`}return c`<div
      class="ghost"
      style=${D({left:`${t.x-t.grabDX}px`,top:`${t.y-t.grabDY}px`,width:`${t.w}px`})}
    >
      <div>${e.emoji?c`${e.emoji} `:""}${e.time?c`<b>${e.time}</b> `:""}${e.title}</div>
      <div class="gt">${i}</div>
    </div>`}_renderDropPanel(){let t=this._drag;if(!t||!t.target||!t.panelRect)return"";let[e,i]=this.config.drop_hours,s=[];for(let m=e;m<=i;m++)s.push(String(m).padStart(2,"0"));let r=Math.max(t.panelRect.width,190)+(t.flyHour?104:0),a=36+34*(1+s.length),l=window.innerWidth,h=window.innerHeight,u=Math.min(Math.max(8,t.panelRect.left),Math.max(8,l-r-8)),d=Math.min(Math.max(8,t.panelRect.top),Math.max(8,h-a-8)),p=b(this._weekStart,t.target.day),f=this._persons().find(m=>m.key===t.target.person),g=m=>t.hoverT===m||!!t.hoverT&&t.hoverT.startsWith(m+":"),_=Math.max(1,this.config.drop_minute_step),v=[];for(let m=0;m<60;m+=_)v.push(x(m));let S=t.flyHour?s.indexOf(t.flyHour):-1,tt=S>=0?Math.min(36+34*(1+S),Math.max(0,a-34*v.length)):0;return c`<div class="droppanel" style=${D({left:`${u}px`,top:`${d}px`,width:`${r}px`})}>
      <div class="dpmain">
        <div class="drow head ${t.hoverT==="keep"?"hot":""}" data-t="keep">
          <span>${O[t.target.day]} ${T(p)} · ${f?f.label||f.key:""}</span>
          <span class="hint">Zeit behalten</span>
        </div>
        <div class="drow allday ${g("allday")?"hot":""}" data-t="allday">Ganztags</div>
        ${s.map(m=>c`<div class="drow ${t.flyHour===m?"open":""} ${g(m)?"hot":""}" data-t=${m}>
            <span>${m}:00</span>${g(m)?c`<span class="sel">${t.hoverT}</span>`:t.flyHour===m?c`<span class="sel">›</span>`:""}
          </div>`)}
      </div>
      ${S>=0?c`<div class="dpfly" style=${D({marginTop:`${tt}px`})}>
            ${v.map(m=>{let ht=`${t.flyHour}:${m}`;return c`<div class="drow fly ${t.hoverT===ht?"hot":""}" data-t=${ht}>${ht}</div>`})}
          </div>`:""}
    </div>`}getCardSize(){return this._persons().length*3+2}render(){if(!this.config)return c``;let t=this._persons(),e=this._weekStart,i=[...Array(7)].map((a,l)=>b(e,l)),s=this._todayCol(),n=this._items(),r=`${this._rowH}px`;return c`
      <ha-card>
        ${this.config.title?c`<div class="ctitle">${this.config.title}</div>`:""}
        ${this.config.show_toolbar?this._renderToolbar(e,i):""}
        <div class="wrap">
          <table>
            <colgroup>
              <col class="pcol" />
              ${i.map(()=>c`<col class="dcol" />`)}
            </colgroup>
            <thead>
              <tr>
                <th class="corner"></th>
                ${i.map((a,l)=>c`<th class=${Z({today:l===s})}>
                    ${O[l]}<br /><span class="dnum">${T(a)}</span>
                  </th>`)}
              </tr>
            </thead>
            <tbody>
              ${t.map(a=>c`<tr>
                  <td
                    class="pname"
                    style=${D({background:`rgba(${a.color},${a.alpha??.13})`,borderLeftColor:a.border,color:a.text})}
                  >
                    ${a.label||a.key}
                  </td>
                  ${i.map((l,h)=>{let u=n.filter(p=>p.dayOffset===h&&p.personKey===a.key),d=!!this._drag&&!!this._drag.target&&this._drag.target.person===a.key&&this._drag.target.day===h;return c`<td
                      class=${Z({today:h===s,cell:!0,dropover:d})}
                      style=${D({height:r,background:`rgba(${a.color},${a.alpha??.13})`})}
                      data-person=${a.key}
                      data-day=${h}
                      @click=${()=>{Date.now()<this._suppressClickUntil||this._openCreate(a,l)}}
                      title="Neuen Termin für ${a.label||a.key} am ${T(l)} anlegen"
                    >
                      ${u.map(p=>p.kind==="task"?c`<div
                              class=${Z({ev:!0,task:!0,done:p.done,overdue:p.overdue,lifted:this._isLifted(p)})}
                              @pointerdown=${f=>this._evPointerDown(f,p,f.currentTarget)}
                              @dragstart=${f=>f.preventDefault()}
                              @contextmenu=${f=>f.preventDefault()}
                              @click=${f=>{f.stopPropagation(),!(Date.now()<this._suppressClickUntil)&&this._openEdit(p)}}
                              title=${p.overdue?`\xDCberf\xE4llig seit ${T(w(String(p.raw.due).slice(0,10)))}`:p.undated?"Ohne F\xE4lligkeitsdatum":""}
                            >
                              <span
                                class="cb"
                                title=${p.done?"Wieder \xF6ffnen":"Erledigt"}
                                @pointerdown=${f=>f.stopPropagation()}
                                @click=${f=>{f.stopPropagation(),this._toggleTask(p)}}
                                >${p.done?"\u2611":"\u2610"}</span
                              >
                              ${p.recurring?c`<span class="rec" title="Wiederkehrende Aufgabe: ${N(p.rule)}">↻</span>`:""}
                              <span class="tt">${p.overdue?c`<span class="od">!</span>`:""}${p.emoji?c`${p.emoji} `:""}${p.title}</span>
                            </div>`:c`<div
                              class=${Z({ev:!0,lifted:this._isLifted(p)})}
                              @pointerdown=${f=>this._evPointerDown(f,p,f.currentTarget)}
                              @dragstart=${f=>f.preventDefault()}
                              @contextmenu=${f=>f.preventDefault()}
                              @click=${f=>{f.stopPropagation(),!(Date.now()<this._suppressClickUntil)&&this._openEdit(p)}}
                            >
                              ${p.recurring?c`<span class="rec" title="Serientermin">↻</span>`:""}
                              ${p.emoji?c`${p.emoji} `:""}${p.time?c`<b>${p.time}</b> `:""}${p.title}
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
        ${this._toast?c`<div class="toast ${this._toast.error?"err":""}">${this._toast.text}</div>`:""}
      </ha-card>
    `}_renderToolbar(t,e){let i=`${T(t)} \u2013 ${T(e[6])}`;return c`<div class="toolbar">
      <button class="nav" @click=${()=>this._shiftWeek(-1)} title="Vorherige Woche">‹</button>
      <button class="today-btn" @click=${()=>this._goToday()}>Heute</button>
      <button class="nav" @click=${()=>this._shiftWeek(1)} title="Nächste Woche">›</button>
      <span class="range">${i}</span>
      ${this._loading?c`<span class="spin">…</span>`:""}
    </div>`}_kbEnabled(){let t=this.config.keyboard;return t===!0?!0:t===!1?!1:(navigator.maxTouchPoints||0)>0}_kbType(t){let e=this._dialog;if(!e)return;let i=e.title||"";if(t==="back")i=i.slice(0,-1);else if(t==="space")i+=" ";else if(t==="shift"){this._kbShift=!this._kbShift;return}else{let s=/^[a-zäöü]$/.test(t);i+=this._kbShift&&s?t.toUpperCase():t,this._kbShift&&s&&(this._kbShift=!1)}this._dialog={...e,title:i,error:""}}_renderKeyboard(){let t=[["1","2","3","4","5","6","7","8","9","0"],["q","w","e","r","t","z","u","i","o","p","\xFC"],["a","s","d","f","g","h","j","k","l","\xF6","\xE4"],["shift","y","x","c","v","b","n","m","\xDF","back"]],e=i=>{if(i==="shift")return c`<button
          class="key wide ${this._kbShift?"active":""}"
          @click=${()=>this._kbType("shift")}
        >⇧</button>`;if(i==="back")return c`<button class="key wide" @click=${()=>this._kbType("back")}>⌫</button>`;let s=/^[a-zäöü]$/.test(i),n=this._kbShift&&s?i.toUpperCase():i;return c`<button class="key" @click=${()=>this._kbType(i)}>${n}</button>`};return c`<div class="kb" @mousedown=${i=>i.preventDefault()}>
      ${t.map(i=>c`<div class="kbrow">${i.map(e)}</div>`)}
      <div class="kbrow">
        <button class="key space" @click=${()=>this._kbType("space")}>Leerzeichen</button>
      </div>
    </div>`}_dateLabel(t){let e=w(t);return`${O[(e.getDay()+6)%7].slice(0,2)} ${T(e)}${e.getFullYear()}`}_shiftDate(t){this._set("date",$(b(w(this._dialog.date),t)))}_setStart(t,e){let i=this._dialog,s=h=>{let[u,d]=String(h||"0:0").split(":").map(Number);return u*60+d},n=h=>`${x(Math.floor(h/60))}:${x(h%60)}`,r=s(i.end)-s(i.start);r>0||(r=60);let a=t*60+e,l=Math.min(a+r,23*60+45);l<=a&&(l=Math.min(a+15,23*60+45)),this._dialog={...i,start:n(a),end:n(l),error:""}}_setEnd(t,e){this._dialog={...this._dialog,end:`${x(t)}:${x(e)}`,error:""}}_renderTimePick(t){let e=this._dialog,[i,s]=String(e[t]||"09:00").split(":").map(Number),n=[...Array(24).keys()],r=[];for(let d=0;d<60;d+=5)r.push(d);let a=s-s%5,l=d=>t==="start"?this._setStart(d,s):this._setEnd(d,s),h=d=>t==="start"?this._setStart(i,d):this._setEnd(i,d),u=(d,p,f,g)=>c`<div class="wheelwrap">
      <div
        class="wheel"
        data-kind=${d}
        @scroll=${_=>this._wheelScroll(_,p,g)}
        @pointerdown=${_=>this._wheelDown(_)}
        @pointermove=${_=>this._wheelMove(_)}
        @pointerup=${_=>this._wheelUp(_,p,g)}
        @pointercancel=${_=>this._wheelUp(_,p,g)}
      >
        <div class="wpad"></div>
        ${p.map((_,v)=>c`<div class="witem ${_===f?"on":""}" data-i=${v}>${x(_)}</div>`)}
        <div class="wpad"></div>
      </div>
    </div>`;return c`<div class="tpick wheels">
      <div class="wheelrow">
        <span class="wlabel">${t==="start"?"Von":"Bis"}</span>
        ${u("h",n,i,l)}
        <div class="wcolon">:</div>
        ${u("m",r,a,h)}
      </div>
      <div class="wactions"><button class="chip" @click=${()=>this._set("pick",null)}>Fertig</button></div>
    </div>`}_wheelScroll(t,e,i){let s=t.currentTarget;s._prog||s._dragging||(clearTimeout(s._t),s._t=setTimeout(()=>{let n=Math.max(0,Math.min(e.length-1,Math.round(s.scrollTop/44)));i(e[n])},140))}_wheelDown(t){if(t.pointerType!=="mouse"||t.button!==void 0&&t.button!==0)return;let e=t.currentTarget;e._dragging=!0,e._moved=!1,e._y0=t.clientY,e._top0=e.scrollTop,e._downItem=t.target&&t.target.closest?t.target.closest(".witem"):null,e.classList.add("dragging");try{e.setPointerCapture(t.pointerId)}catch{}t.preventDefault()}_wheelMove(t){let e=t.currentTarget;if(!e._dragging)return;let i=t.clientY-e._y0;Math.abs(i)>3&&(e._moved=!0),e.scrollTop=e._top0-i}_wheelUp(t,e,i){let s=t.currentTarget;if(!s._dragging)return;s._dragging=!1,s.classList.remove("dragging");try{s.releasePointerCapture(t.pointerId)}catch{}let n=Math.round(s.scrollTop/44);!s._moved&&s._downItem&&(n=Number(s._downItem.dataset.i)),n=Math.max(0,Math.min(e.length-1,n)),s._prog=!0,s.scrollTop=n*44,setTimeout(()=>s._prog=!1,250),i(e[n])}updated(t){if(super.updated(t),this.config&&this.config.row_height==="auto"&&window.innerHeight>=200){let r=this._lastMeasure,a=Math.max(0,this.getBoundingClientRect().top);(!r||r.vh!==window.innerHeight||r.vw!==window.innerWidth||Math.abs(r.top-a)>2)&&this._computeRowH()}let e=this._dialog&&this._dialog.pick;if(!e){this._wheelKey=null;return}if(this._wheelKey===e)return;this._wheelKey=e;let[i,s]=String(this._dialog[e]||"09:00").split(":").map(Number),n=(r,a)=>{let l=this.shadowRoot.querySelector(`.wheel[data-kind="${r}"]`);l&&(l._prog=!0,l.scrollTop=a*44,setTimeout(()=>l._prog=!1,250))};n("h",i),n("m",Math.floor(s/5))}_renderDatePick(){let t=this._dialog,e=[...Array(7)].map((i,s)=>b(this._weekStart,s));return c`<div class="fld">
      <span class="lbl">Datum <b class="val">${this._dateLabel(t.date)}</b></span>
      <div class="daterow">
        <button class="chip nav" @click=${()=>this._shiftDate(-1)} title="Ein Tag zurück">‹</button>
        ${e.map((i,s)=>c`<button class="chip day ${$(i)===t.date?"on":""}" @click=${()=>this._set("date",$(i))}>
            ${O[s].slice(0,2)}<small>${T(i)}</small>
          </button>`)}
        <button class="chip nav" @click=${()=>this._shiftDate(1)} title="Ein Tag vor">›</button>
      </div>
    </div>`}_renderKindChips(){let t=this._dialog;return c`<div class="chips kind">
      <button class="chip ${t.kind!=="task"?"on":""}" @click=${()=>this._set("kind","event")}>📅 Termin</button>
      <button class="chip ${t.kind==="task"?"on":""}" @click=${()=>this._set("kind","task")}>☐ Aufgabe</button>
    </div>`}_renderPersonIconChips(t){let e=this._persons(),i=this._icons(),s=Object.keys(i);return c`<div class="fld">
        <span class="lbl">Person</span>
        <div class="chips">
          ${e.map(n=>c`<button
              class="chip person ${n.key===t.person?"on":""}"
              style=${D({borderColor:n.border,background:n.key===t.person?`rgba(${n.color},0.6)`:`rgba(${n.color},0.16)`})}
              @click=${()=>this._set("person",n.key)}
            >
              ${n.label||n.key}
            </button>`)}
        </div>
      </div>
      <div class="fld">
        <span class="lbl">Icon</span>
        <div class="chips icons">
          <button class="chip ${t.iconKey?"":"on"}" @click=${()=>this._set("iconKey","")}>–<small>kein</small></button>
          ${s.map(n=>c`<button class="chip icon ${n===t.iconKey?"on":""}" @click=${()=>this._set("iconKey",n)}>
              ${i[n]}<small>${n}</small>
            </button>`)}
        </div>
      </div>`}_renderTaskDialog(){let t=this._dialog,e=this.config.todo_entities,i=e.find(n=>n.entity===t.list)||e[0],s=t.trecur==="custom"?N(t.trule):(ct.find(n=>n.key===t.trecur)||{}).label;return c`
      <div class="overlay" @click=${this._onOverlayClick}>
        <div class="modal wide" @click=${n=>n.stopPropagation()}>
          <div class="mhead">${t.mode==="create"?"Neue Aufgabe":"Aufgabe bearbeiten"}</div>
          ${t.mode==="create"?this._renderKindChips():""}
          ${t.error?c`<div class="err">${t.error}</div>`:""}
          ${e.length>1&&t.mode==="create"?c`<div class="fld">
                <span class="lbl">Liste</span>
                <div class="chips">
                  ${e.map(n=>c`<button class="chip ${n.entity===i.entity?"on":""}" @click=${()=>this._set("list",n.entity)}>
                      ${n.label}
                    </button>`)}
                </div>
              </div>`:""}
          ${i&&i.prefix?this._renderPersonIconChips(t):""}

          <label class="fld"
            >Aufgabe
            <input type="text" .value=${t.title} placeholder="z.B. Katzenklo" @input=${n=>this._set("title",n.target.value)} />
          </label>

          ${this._renderDatePick()}

          <div class="fld">
            <span class="lbl">Wiederholen ${t.trecur?c`<b class="val">${s}</b>`:""}</span>
            <div class="chips recur">
              <button class="chip ${t.trecur?"":"on"}" @click=${()=>this._set("trecur","")}>Nie</button>
              ${ct.map(n=>c`<button class="chip ${n.key===t.trecur?"on":""}" @click=${()=>this._set("trecur",n.key)}>${n.label}</button>`)}
              ${t.trecur==="custom"?c`<button class="chip on">${N(t.trule)}</button>`:""}
            </div>
            ${t.trecur?c`<div class="note">Beim Abhaken wird die nächste Fälligkeit automatisch angelegt (bei überfälligen Aufgaben ab heute gerechnet).</div>`:""}
          </div>

          ${this._kbEnabled()?this._renderKeyboard():""}

          <div class="actions">
            ${t.mode==="edit"?c`<button class="del" @click=${this._delete} ?disabled=${t.saving}>Löschen</button>`:""}
            <span class="spacer"></span>
            <button @click=${this._closeDialog} ?disabled=${t.saving}>Abbrechen</button>
            <button class="primary" @click=${this._save} ?disabled=${t.saving}>${t.saving?"\u2026":"Speichern"}</button>
          </div>
        </div>
      </div>
    `}_renderDialog(){let t=this._dialog;if(t.kind==="task")return this._renderTaskDialog();let e=this._persons(),i=this._icons(),s=Object.keys(i);return c`
      <div class="overlay" @click=${this._onOverlayClick}>
        <div class="modal wide" @click=${n=>n.stopPropagation()}>
          <div class="mhead">${t.mode==="create"?"Neuer Termin":"Termin bearbeiten"}</div>
          ${t.mode==="create"&&this.config.todo_entities.length?this._renderKindChips():""}
          ${t.recurrence_id?c`<div class="note">
                Serientermin (${Qt(t.recurOrig,t.rrule)||"wiederkehrend"}) – beim Speichern oder Löschen wirst du
                gefragt, ob nur dieser oder auch alle zukünftigen Termine betroffen sind.
              </div>`:""}
          ${t.error?c`<div class="err">${t.error}</div>`:""}

          <div class="fld">
            <span class="lbl">Person</span>
            <div class="chips">
              ${e.map(n=>c`<button
                  class="chip person ${n.key===t.person?"on":""}"
                  style=${D({borderColor:n.border,background:n.key===t.person?`rgba(${n.color},0.6)`:`rgba(${n.color},0.16)`})}
                  @click=${()=>this._set("person",n.key)}
                >
                  ${n.label||n.key}
                </button>`)}
            </div>
          </div>

          <div class="fld">
            <span class="lbl">Icon</span>
            <div class="chips icons">
              <button class="chip ${t.iconKey?"":"on"}" @click=${()=>this._set("iconKey","")}>–<small>kein</small></button>
              ${s.map(n=>c`<button class="chip icon ${n===t.iconKey?"on":""}" @click=${()=>this._set("iconKey",n)}>
                  ${i[n]}<small>${n}</small>
                </button>`)}
            </div>
          </div>

          <label class="fld"
            >Titel
            <input
              type="text"
              .value=${t.title}
              placeholder="z.B. Joggen"
              @input=${n=>this._set("title",n.target.value)}
            />
          </label>

          ${this._renderDatePick()}

          <div class="fld">
            <div class="times">
              <button class="chip toggle ${t.allday?"on":""}" @click=${()=>this._set("allday",!t.allday)}>
                ${t.allday?"\u2611":"\u2610"} Ganztags
              </button>
              ${t.allday?"":c`<button
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
            <span class="lbl">Wiederholen ${t.recur?c`<b class="val">${Qt(t.recur,t.rrule)}</b>`:""}</span>
            <div class="chips recur">
              ${t.recurrence_id?"":c`<button class="chip ${t.recur?"":"on"}" @click=${()=>this._set("recur","")}>Nie</button>`}
              ${dt.map(n=>c`<button class="chip ${n.key===t.recur?"on":""}" @click=${()=>this._set("recur",n.key)}>
                  ${n.label}
                </button>`)}
              ${t.recur==="custom"?c`<button class="chip on" title=${t.rrule}>Eigene Regel</button>`:""}
            </div>
          </div>

          ${this._kbEnabled()?this._renderKeyboard():""}

          <div class="actions">
            ${t.mode==="edit"?c`<button class="del" @click=${this._delete} ?disabled=${t.saving}>Löschen</button>`:""}
            <span class="spacer"></span>
            <button @click=${this._closeDialog} ?disabled=${t.saving}>Abbrechen</button>
            <button class="primary" @click=${this._save} ?disabled=${t.saving}>
              ${t.saving?"\u2026":"Speichern"}
            </button>
          </div>
        </div>
      </div>
    `}};P(G,"properties",{_weekStart:{state:!0},_events:{state:!0},_loading:{state:!0},_dialog:{state:!0},_kbShift:{state:!0},_drag:{state:!0},_toast:{state:!0},_rowH:{state:!0},_scope:{state:!0},_todos:{state:!0}}),P(G,"styles",K`
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

    /* ---- tasks (to-do items in the grid) ---- */
    .ev.task {
      border-style: dashed;
    }
    .ev.task .cb {
      display: inline-block;
      margin: -2px 4px -2px -4px;
      padding: 2px 5px;
      font-size: 17px;
      line-height: 1;
      border-radius: 6px;
      cursor: pointer;
    }
    .ev.task .cb:hover {
      background: rgba(255, 255, 255, 0.14);
    }
    .ev.task.done {
      opacity: 0.55;
    }
    .ev.task.done .tt {
      text-decoration: line-through;
    }
    .ev.task.overdue {
      border-color: rgba(255, 138, 128, 0.85);
    }
    .ev.task .od {
      color: #ff8a80;
      font-weight: 700;
      margin-right: 4px;
    }
    .chips.kind {
      margin: -4px 0 12px;
    }
    .chips.kind .chip {
      min-height: 40px;
      padding: 0 16px;
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
  `);customElements.define("family-week-planner-card",G);var J=class extends A{setConfig(t){this._config={...t||{}}}_emit(t){let e={...this._config,...t};for(let i of Object.keys(t))t[i]===void 0&&delete e[i];this._config=e,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:e},bubbles:!0,composed:!0}))}_ents(...t){let e=this.hass&&this.hass.states||{};return Object.keys(e).filter(i=>t.includes(i.split(".")[0])).sort()}_name(t){let e=this.hass&&this.hass.states&&this.hass.states[t];return e&&e.attributes&&e.attributes.friendly_name||t}get _persons(){let t=this._config.persons;return Array.isArray(t)&&t.length?t:te}_setPersons(t){this._emit({persons:t.map(e=>({...e}))})}_personChange(t,e,i){let s=this._persons.map(n=>({...n}));e==="key"?s[t].key=i.trim()||s[t].key:Object.assign(s[t],Y(s[t].key,i,t,s[t].alpha!==void 0?{alpha:s[t].alpha}:{})),this._setPersons(s)}_personMove(t,e){let i=[...this._persons],s=t+e;s<0||s>=i.length||([i[t],i[s]]=[i[s],i[t]],this._setPersons(i))}_personRemove(t){let e=[...this._persons];e.splice(t,1),this._setPersons(e)}_personAdd(){let t=[...this._persons];t.push(Y("Neu","",t.length)),this._setPersons(t)}get _icons(){let t=this._config.icons;return t&&Object.keys(t).length?t:ee}_iconsEntries(){return Object.entries(this._icons).map(([t,e])=>[t,e])}_setIcons(t){let e={};for(let[i,s]of t)String(i).trim()&&(e[String(i).trim()]=String(s).trim());this._emit({icons:e})}_iconChange(t,e,i){let s=this._iconsEntries();s[t][e]=i,this._setIcons(s)}_iconRemove(t){let e=this._iconsEntries();e.splice(t,1),this._setIcons(e)}_iconAdd(){let t=this._iconsEntries();t.push(["Neu","\u2B50"]),this._setIcons(t)}get _todos(){return ie(this._config)}_setTodos(t){let e=t.map(i=>{let s={entity:i.entity};return i.label&&i.label!==i.entity.split(".").pop()&&(s.label=i.label),i.person&&(s.person=i.person),i.icon&&(s.icon=i.icon),i.prefix||(s.prefix=!1),i.readonly&&(s.readonly=!0),s});this._emit({todo_entities:e.length?e:void 0,todo_entity:void 0})}_todoChange(t,e,i){let s=this._todos.map(n=>({...n}));s[t][e]=i,this._setTodos(s)}_todoRow(t,e){let i=this._todos.map(s=>({...s}));i[t].person=e||null,i[t].prefix=!e,this._setTodos(i)}_todoRemove(t){let e=this._todos;e.splice(t,1),this._setTodos(e)}_todoAdd(){let t=this._todos;t.push({entity:this._ents("todo")[0]||"todo.",label:"",person:null,icon:"",prefix:!0,readonly:!1}),this._setTodos(t)}render(){if(!this._config)return c``;let t=this._config,e=t.row_height??"auto",i=(r,a,l,h)=>c`<select @change=${u=>l(u.target.value)}>
      ${h?c`<option value="" ?selected=${!r}>${h}</option>`:""}
      ${a.map(u=>c`<option value=${u.value} ?selected=${u.value===String(r??"")}>${u.label}</option>`)}
    </select>`,s=r=>this._ents(...r).map(a=>({value:a,label:`${this._name(a)} (${a})`})),n=s(["input_select","input_text"]);return c`
      <div class="sec">
        <h3>Kalender</h3>
        <label>Kalender-Entität ${i(t.entity,s(["calendar"]),r=>this._emit({entity:r}),"\u2013 w\xE4hlen \u2013")}</label>
        <label>Titel <input type="text" .value=${t.title||""} @change=${r=>this._emit({title:r.target.value||void 0})} /></label>
        <div class="grid">
          <label
            >Zeilenhöhe
            ${i(e==="auto"?"auto":"fixed",[{value:"auto",label:"automatisch (Bildschirm f\xFCllen)"},{value:"fixed",label:"fest (px)"}],r=>this._emit({row_height:r==="auto"?void 0:Number(t.row_height)||210}))}</label
          >
          ${e!=="auto"?c`<label>Höhe (px) <input type="number" min="40" .value=${String(e)} @change=${r=>this._emit({row_height:Number(r.target.value)||210})} /></label>`:c`<span></span>`}
          <label>Von (Standard) <input type="time" .value=${t.default_start||"09:00"} @change=${r=>this._emit({default_start:r.target.value||void 0})} /></label>
          <label>Bis (Standard) <input type="time" .value=${t.default_end||"10:00"} @change=${r=>this._emit({default_end:r.target.value||void 0})} /></label>
          <label
            >Bildschirmtastatur
            ${i(String(t.keyboard??"auto"),[{value:"auto",label:"automatisch (bei Touch)"},{value:"true",label:"immer"},{value:"false",label:"nie (System-Tastatur)"}],r=>this._emit({keyboard:r==="auto"?void 0:r==="true"}))}</label
          >
          <label
            >Antippen einer leeren Zelle legt an
            ${i(t.default_kind||"event",[{value:"event",label:"Termin"},{value:"task",label:"Aufgabe"}],r=>this._emit({default_kind:r==="event"?void 0:r}))}</label
          >
        </div>
        <label class="chk"><input type="checkbox" .checked=${t.show_toolbar!==!1} @change=${r=>this._emit({show_toolbar:r.target.checked?void 0:!1})} /> Wochen-Navigation anzeigen</label>
        <label class="chk"><input type="checkbox" .checked=${t.drag!==!1} @change=${r=>this._emit({drag:r.target.checked?void 0:!1})} /> Termine und Aufgaben per Ziehen verschieben</label>
      </div>

      <div class="sec">
        <h3>Zeilen</h3>
        <label>Zeilen aus Helfer (optional) ${i(t.persons_entity||"",n,r=>this._emit({persons_entity:r||void 0}),"\u2013 hier in der Karte pflegen \u2013")}</label>
        ${t.persons_entity?c`<p class="hint">
              Die Zeilen kommen aus <code>${t.persons_entity}</code> – Einträge „Name" oder „Name:#Farbe" in gewünschter Reihenfolge. Fehlt die
              Rest-Zeile, wird sie automatisch angehängt.
            </p>`:c`<div class="rows">
                ${this._persons.map((r,a)=>c`<div class="row">
                    <input type="text" class="grow" .value=${r.key} @change=${l=>this._personChange(a,"key",l.target.value)} />
                    <input
                      type="color"
                      title="Farbe"
                      .value=${r.border||Ct(Tt(r.color)||[84,110,122])}
                      @change=${l=>this._personChange(a,"color",l.target.value)}
                    />
                    <button @click=${()=>this._personMove(a,-1)} title="nach oben" ?disabled=${a===0}>↑</button>
                    <button @click=${()=>this._personMove(a,1)} title="nach unten" ?disabled=${a===this._persons.length-1}>↓</button>
                    <button class="del" @click=${()=>this._personRemove(a)} title="entfernen">✕</button>
                  </div>`)}
              </div>
              <button class="add" @click=${this._personAdd}>+ Zeile</button>`}
        <label
          >Rest-Zeile (alles ohne passende Person landet hier)
          <input type="text" .value=${t.fallback_person||"Rest"} @change=${r=>this._emit({fallback_person:r.target.value.trim()||void 0})} />
        </label>
      </div>

      <div class="sec">
        <h3>Icons</h3>
        <label>Icons aus Helfer (optional) ${i(t.icons_entity||"",n,r=>this._emit({icons_entity:r||void 0}),"\u2013 hier in der Karte pflegen \u2013")}</label>
        ${t.icons_entity?c`<p class="hint">Die Icons kommen aus <code>${t.icons_entity}</code> – Einträge „Wort:Emoji".</p>`:c`<div class="rows">
                ${this._iconsEntries().map(([r,a],l)=>c`<div class="row">
                    <input type="text" class="grow" .value=${r} @change=${h=>this._iconChange(l,0,h.target.value)} />
                    <input type="text" class="emoji" .value=${a} @change=${h=>this._iconChange(l,1,h.target.value)} />
                    <button class="del" @click=${()=>this._iconRemove(l)} title="entfernen">✕</button>
                  </div>`)}
              </div>
              <button class="add" @click=${this._iconAdd}>+ Icon</button>`}
      </div>

      <div class="sec">
        <h3>Aufgabenlisten</h3>
        <div class="rows">
          ${this._todos.map((r,a)=>c`<div class="row wrap">
              ${i(r.entity,s(["todo"]),l=>this._todoChange(a,"entity",l),"\u2013 Liste w\xE4hlen \u2013")}
              <input
                type="text"
                placeholder="Bezeichnung"
                .value=${r.label===r.entity.split(".").pop()?"":r.label}
                @change=${l=>this._todoChange(a,"label",l.target.value)}
              />
              ${i(r.prefix?"":r.person||"",[{value:"",label:"Zeile aus dem Titel (Person|Icon: \u2026)"},...this._persons.map(l=>({value:l.key,label:`feste Zeile: ${l.key}`}))],l=>this._todoRow(a,l))}
              <input type="text" class="emoji" placeholder="Icon" .value=${r.icon} @change=${l=>this._todoChange(a,"icon",l.target.value)} />
              <label class="chk"><input type="checkbox" .checked=${r.readonly} @change=${l=>this._todoChange(a,"readonly",l.target.checked)} /> nur anzeigen</label>
              <button class="del" @click=${()=>this._todoRemove(a)} title="entfernen">✕</button>
            </div>`)}
        </div>
        <button class="add" @click=${this._todoAdd}>+ Liste</button>
        <label
          >Erledigte Aufgaben nach Tagen entfernen (0 = nie)
          <input
            type="number"
            min="0"
            .value=${String(t.todo_cleanup_days??7)}
            @change=${r=>this._emit({todo_cleanup_days:Number(r.target.value)===7?void 0:Number(r.target.value)})}
          />
        </label>
        <p class="hint">
          Titel „Person|Icon: Aufgabe" ordnet Zeile und Icon zu; ohne Präfix landet die Aufgabe in der Rest-Zeile. Listen mit fester Zeile
          (z.B. Microsoft To Do) lassen den Titel unverändert.
        </p>
      </div>
    `}};P(J,"properties",{hass:{attribute:!1},_config:{state:!0}}),P(J,"styles",K`
    :host {
      display: block;
      color: var(--primary-text-color);
    }
    .sec {
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.3));
      border-radius: 10px;
      padding: 10px 12px 12px;
      margin-bottom: 12px;
    }
    h3 {
      margin: 0 0 8px;
      font-size: 15px;
    }
    label {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 13px;
      margin: 6px 0;
      color: var(--secondary-text-color);
    }
    label.chk {
      flex-direction: row;
      align-items: center;
      gap: 8px;
      margin: 4px 0;
    }
    input,
    select {
      font: inherit;
      color: var(--primary-text-color);
      background: var(--card-background-color, transparent);
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.4));
      border-radius: 6px;
      padding: 6px 8px;
      min-height: 34px;
      box-sizing: border-box;
    }
    input[type="color"] {
      width: 44px;
      padding: 2px;
    }
    input[type="checkbox"] {
      min-height: 0;
      width: 18px;
      height: 18px;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0 12px;
    }
    .rows {
      display: flex;
      flex-direction: column;
      gap: 6px;
      margin: 6px 0;
    }
    .row {
      display: flex;
      gap: 6px;
      align-items: center;
    }
    .row.wrap {
      flex-wrap: wrap;
      padding: 6px;
      border: 1px dashed var(--divider-color, rgba(127, 127, 127, 0.3));
      border-radius: 8px;
    }
    .row .grow {
      flex: 1;
      min-width: 0;
    }
    .row .emoji {
      width: 80px;
    }
    .row select {
      flex: 1;
      min-width: 160px;
    }
    button {
      font: inherit;
      border: 1px solid var(--divider-color, rgba(127, 127, 127, 0.4));
      background: transparent;
      color: inherit;
      border-radius: 6px;
      min-width: 34px;
      min-height: 34px;
      cursor: pointer;
    }
    button[disabled] {
      opacity: 0.4;
      cursor: default;
    }
    button.del {
      color: var(--error-color, #d32f2f);
    }
    button.add {
      padding: 0 12px;
      margin-top: 4px;
    }
    .hint {
      font-size: 12px;
      color: var(--secondary-text-color);
      margin: 6px 0 0;
    }
    code {
      font-size: 12px;
    }
  `);customElements.define("family-week-planner-card-editor",J);window.customCards=window.customCards||[];window.customCards.push({type:"family-week-planner-card",name:"Family Week Planner",description:"Editable person-by-day family week planner over one calendar entity (Person|Icon: Title events).",preview:!1,documentationURL:"https://github.com/psewar/family-week-planner-card"});var at=class extends A{setConfig(t){this._cfg={label:t&&t.label||"Dashboard neu laden",icon:t&&t.icon!==void 0?t.icon:"\u{1F504}"}}set hass(t){this._hass=t}getCardSize(){return 1}render(){let t=this._cfg||{};return c`<ha-card>
      <button class="reload" @click=${()=>window.location.reload()}>
        ${t.icon?c`<span class="ic">${t.icon}</span>`:""}<span>${t.label}</span>
      </button>
    </ha-card>`}};P(at,"styles",K`
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
  `);customElements.define("fwp-reload-card",at);window.customCards.push({type:"fwp-reload-card",name:"FWP Kiosk Reload",description:"One-tap full page reload for kiosk dashboards (companion to Family Week Planner).",preview:!1,documentationURL:"https://github.com/psewar/family-week-planner-card"});console.info(`%c family-week-planner-card %c v${ve} `,"color:#fff;background:#7e57c2;border-radius:4px 0 0 4px;padding:2px 4px","color:#7e57c2;background:#eee;border-radius:0 4px 4px 0;padding:2px 4px");
