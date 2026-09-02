var Dt=Object.defineProperty;var Ut=(r,t,e)=>t in r?Dt(r,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):r[t]=e;var V=(r,t,e)=>Ut(r,typeof t!="symbol"?t+"":t,e);/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var H=globalThis,L=H.ShadowRoot&&(H.ShadyCSS===void 0||H.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,F=Symbol(),dt=new WeakMap,k=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==F)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(L&&t===void 0){let s=e!==void 0&&e.length===1;s&&(t=dt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&dt.set(e,t))}return t}toString(){return this.cssText}},ht=r=>new k(typeof r=="string"?r:r+"",void 0,F),q=(r,...t)=>{let e=r.length===1?r[0]:t.reduce((s,i,o)=>s+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+r[o+1],r[0]);return new k(e,r,F)},pt=(r,t)=>{if(L)r.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(let e of t){let s=document.createElement("style"),i=H.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,r.appendChild(s)}},Y=L?r=>r:r=>r instanceof CSSStyleSheet?(t=>{let e="";for(let s of t.cssRules)e+=s.cssText;return ht(e)})(r):r;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var{is:Ot,defineProperty:Mt,getOwnPropertyDescriptor:Rt,getOwnPropertyNames:Nt,getOwnPropertySymbols:Ht,getPrototypeOf:Lt}=Object,z=globalThis,ut=z.trustedTypes,zt=ut?ut.emptyScript:"",jt=z.reactiveElementPolyfillSupport,C=(r,t)=>r,Z={toAttribute(r,t){switch(t){case Boolean:r=r?zt:null;break;case Object:case Array:r=r==null?r:JSON.stringify(r)}return r},fromAttribute(r,t){let e=r;switch(t){case Boolean:e=r!==null;break;case Number:e=r===null?null:Number(r);break;case Object:case Array:try{e=JSON.parse(r)}catch{e=null}}return e}},gt=(r,t)=>!Ot(r,t),ft={attribute:!0,type:String,converter:Z,reflect:!1,useDefault:!1,hasChanged:gt};Symbol.metadata??=Symbol("metadata"),z.litPropertyMetadata??=new WeakMap;var _=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ft){if(e.state&&(e.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(t)&&((e=Object.create(e)).wrapped=!0),this.elementProperties.set(t,e),!e.noAccessor){let s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&Mt(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){let{get:i,set:o}=Rt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get:i,set(n){let l=i?.call(this);o?.call(this,n),this.requestUpdate(t,l,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ft}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;let t=Lt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){let e=this.properties,s=[...Nt(e),...Ht(e)];for(let i of s)this.createProperty(i,e[i])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(let[e,s]of this.elementProperties){let i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let s=new Set(t.flat(1/0).reverse());for(let i of s)e.unshift(Y(i))}else t!==void 0&&e.push(Y(t));return e}static _$Eu(t,e){let s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(t=>this.enableUpdating=t),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(t=>t(this))}addController(t){(this._$EO??=new Set).add(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return pt(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(t=>t.hostConnected?.())}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach(t=>t.hostDisconnected?.())}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$ET(t,e){let s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){let o=(s.converter?.toAttribute!==void 0?s.converter:Z).toAttribute(e,s.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){let s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){let o=s.getPropertyOptions(i),n=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:Z;this._$Em=i;let l=n.fromAttribute(e,o.type);this[i]=l??this._$Ej?.get(i)??l,this._$Em=null}}requestUpdate(t,e,s,i=!1,o){if(t!==void 0){let n=this.constructor;if(i===!1&&(o=this[t]),s??=n.getPropertyOptions(t),!((s.hasChanged??gt)(o,e)||s.useDefault&&s.reflect&&o===this._$Ej?.get(t)&&!this.hasAttribute(n._$Eu(t,s))))return;this.C(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(t,e,{useDefault:s,reflect:i,wrapped:o},n){s&&!(this._$Ej??=new Map).has(t)&&(this._$Ej.set(t,n??e??this[t]),o!==!0||n!==void 0)||(this._$AL.has(t)||(this.hasUpdated||s||(e=void 0),this._$AL.set(t,e)),i===!0&&this._$Em!==t&&(this._$Eq??=new Set).add(t))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(let[i,o]of this._$Ep)this[i]=o;this._$Ep=void 0}let s=this.constructor.elementProperties;if(s.size>0)for(let[i,o]of s){let{wrapped:n}=o,l=this[i];n!==!0||this._$AL.has(i)||l===void 0||this.C(i,void 0,o,l)}}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach(s=>s.hostUpdate?.()),this.update(e)):this._$EM()}catch(s){throw t=!1,this._$EM(),s}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(t){}firstUpdated(t){}};_.elementStyles=[],_.shadowRootOptions={mode:"open"},_[C("elementProperties")]=new Map,_[C("finalized")]=new Map,jt?.({ReactiveElement:_}),(z.reactiveElementVersions??=[]).push("2.1.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var st=globalThis,_t=r=>r,j=st.trustedTypes,mt=j?j.createPolicy("lit-html",{createHTML:r=>r}):void 0,At="$lit$",$=`lit$${Math.random().toFixed(9).slice(2)}$`,wt="?"+$,It=`<${wt}>`,x=document,P=()=>x.createComment(""),D=r=>r===null||typeof r!="object"&&typeof r!="function",it=Array.isArray,Bt=r=>it(r)||typeof r?.[Symbol.iterator]=="function",J=`[ 	
\f\r]`,T=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,$t=/-->/g,yt=/>/g,b=RegExp(`>|${J}(?:([^\\s"'>=/]+)(${J}*=${J}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),bt=/'/g,vt=/"/g,St=/^(?:script|style|textarea|title)$/i,rt=r=>(t,...e)=>({_$litType$:r,strings:t,values:e}),p=rt(1),se=rt(2),ie=rt(3),g=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),xt=new WeakMap,v=x.createTreeWalker(x,129);function Et(r,t){if(!it(r)||!r.hasOwnProperty("raw"))throw Error("invalid template strings array");return mt!==void 0?mt.createHTML(t):t}var Kt=(r,t)=>{let e=r.length-1,s=[],i,o=t===2?"<svg>":t===3?"<math>":"",n=T;for(let l=0;l<e;l++){let a=r[l],d,h,c=-1,f=0;for(;f<a.length&&(n.lastIndex=f,h=n.exec(a),h!==null);)f=n.lastIndex,n===T?h[1]==="!--"?n=$t:h[1]!==void 0?n=yt:h[2]!==void 0?(St.test(h[2])&&(i=RegExp("</"+h[2],"g")),n=b):h[3]!==void 0&&(n=b):n===b?h[0]===">"?(n=i??T,c=-1):h[1]===void 0?c=-2:(c=n.lastIndex-h[2].length,d=h[1],n=h[3]===void 0?b:h[3]==='"'?vt:bt):n===vt||n===bt?n=b:n===$t||n===yt?n=T:(n=b,i=void 0);let m=n===b&&r[l+1].startsWith("/>")?" ":"";o+=n===T?a+It:c>=0?(s.push(d),a.slice(0,c)+At+a.slice(c)+$+m):a+$+(c===-2?l:m)}return[Et(r,o+(r[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]},U=class r{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let o=0,n=0,l=t.length-1,a=this.parts,[d,h]=Kt(t,e);if(this.el=r.createElement(d,s),v.currentNode=this.el.content,e===2||e===3){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(i=v.nextNode())!==null&&a.length<l;){if(i.nodeType===1){if(i.hasAttributes())for(let c of i.getAttributeNames())if(c.endsWith(At)){let f=h[n++],m=i.getAttribute(c).split($),N=/([.?@])?(.*)/.exec(f);a.push({type:1,index:o,name:N[2],strings:m,ctor:N[1]==="."?Q:N[1]==="?"?X:N[1]==="@"?tt:w}),i.removeAttribute(c)}else c.startsWith($)&&(a.push({type:6,index:o}),i.removeAttribute(c));if(St.test(i.tagName)){let c=i.textContent.split($),f=c.length-1;if(f>0){i.textContent=j?j.emptyScript:"";for(let m=0;m<f;m++)i.append(c[m],P()),v.nextNode(),a.push({type:2,index:++o});i.append(c[f],P())}}}else if(i.nodeType===8)if(i.data===wt)a.push({type:2,index:o});else{let c=-1;for(;(c=i.data.indexOf($,c+1))!==-1;)a.push({type:7,index:o}),c+=$.length-1}o++}}static createElement(t,e){let s=x.createElement("template");return s.innerHTML=t,s}};function A(r,t,e=r,s){if(t===g)return t;let i=s!==void 0?e._$Co?.[s]:e._$Cl,o=D(t)?void 0:t._$litDirective$;return i?.constructor!==o&&(i?._$AO?.(!1),o===void 0?i=void 0:(i=new o(r),i._$AT(r,e,s)),s!==void 0?(e._$Co??=[])[s]=i:e._$Cl=i),i!==void 0&&(t=A(r,i._$AS(r,t.values),i,s)),t}var G=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:s}=this._$AD,i=(t?.creationScope??x).importNode(e,!0);v.currentNode=i;let o=v.nextNode(),n=0,l=0,a=s[0];for(;a!==void 0;){if(n===a.index){let d;a.type===2?d=new O(o,o.nextSibling,this,t):a.type===1?d=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(d=new et(o,this,t)),this._$AV.push(d),a=s[++l]}n!==a?.index&&(o=v.nextNode(),n++)}return v.currentNode=x,i}p(t){let e=0;for(let s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}},O=class r{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=i?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=A(this,t,e),D(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==g&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Bt(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==u&&D(this._$AH)?this._$AA.nextSibling.data=t:this.T(x.createTextNode(t)),this._$AH=t}$(t){let{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=U.createElement(Et(s.h,s.h[0]),this.options)),s);if(this._$AH?._$AD===i)this._$AH.p(e);else{let o=new G(i,this),n=o.u(this.options);o.p(e),this.T(n),this._$AH=o}}_$AC(t){let e=xt.get(t.strings);return e===void 0&&xt.set(t.strings,e=new U(t)),e}k(t){it(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,s,i=0;for(let o of t)i===e.length?e.push(s=new r(this.O(P()),this.O(P()),this,this.options)):s=e[i],s._$AI(o),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t!==this._$AB;){let s=_t(t).nextSibling;_t(t).remove(),t=s}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},w=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,o){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=o,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=u}_$AI(t,e=this,s,i){let o=this.strings,n=!1;if(o===void 0)t=A(this,t,e,0),n=!D(t)||t!==this._$AH&&t!==g,n&&(this._$AH=t);else{let l=t,a,d;for(t=o[0],a=0;a<o.length-1;a++)d=A(this,l[s+a],e,a),d===g&&(d=this._$AH[a]),n||=!D(d)||d!==this._$AH[a],d===u?t=u:t!==u&&(t+=(d??"")+o[a+1]),this._$AH[a]=d}n&&!i&&this.j(t)}j(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},Q=class extends w{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===u?void 0:t}},X=class extends w{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==u)}},tt=class extends w{constructor(t,e,s,i,o){super(t,e,s,i,o),this.type=5}_$AI(t,e=this){if((t=A(this,t,e,0)??u)===g)return;let s=this._$AH,i=t===u&&s!==u||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,o=t!==u&&(s===u||i);i&&this.element.removeEventListener(this.name,this,s),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},et=class{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){A(this,t)}};var Wt=st.litHtmlPolyfillSupport;Wt?.(U,O),(st.litHtmlVersions??=[]).push("3.3.3");var kt=(r,t,e)=>{let s=e?.renderBefore??t,i=s._$litPart$;if(i===void 0){let o=e?.renderBefore??null;s._$litPart$=i=new O(t.insertBefore(P(),o),o,void 0,e??{})}return i._$AI(r),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var ot=globalThis,y=class extends _{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=kt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return g}};y._$litElement$=!0,y.finalized=!0,ot.litElementHydrateSupport?.({LitElement:y});var Vt=ot.litElementPolyfillSupport;Vt?.({LitElement:y});(ot.litElementVersions??=[]).push("4.2.2");/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 *//**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var I={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},B=r=>(...t)=>({_$litDirective$:r,values:t}),S=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Ct="important",Ft=" !"+Ct,nt=B(class extends S{constructor(r){if(super(r),r.type!==I.ATTRIBUTE||r.name!=="style"||r.strings?.length>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(r){return Object.keys(r).reduce((t,e)=>{let s=r[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(r,[t]){let{style:e}=r.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(let s of this.ft)t[s]==null&&(this.ft.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(let s in t){let i=t[s];if(i!=null){this.ft.add(s);let o=typeof i=="string"&&i.endsWith(Ft);s.includes("-")||o?e.setProperty(s,o?i.slice(0,-11):i,o?Ct:""):e[s]=i}}return g}});/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var at=B(class extends S{constructor(r){if(super(r),r.type!==I.ATTRIBUTE||r.name!=="class"||r.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(r){return" "+Object.keys(r).filter(t=>r[t]).join(" ")+" "}update(r,[t]){if(this.st===void 0){this.st=new Set,r.strings!==void 0&&(this.nt=new Set(r.strings.join(" ").split(/\s/).filter(s=>s!=="")));for(let s in t)t[s]&&!this.nt?.has(s)&&this.st.add(s);return this.render(t)}let e=r.element.classList;for(let s of this.st)s in t||(e.remove(s),this.st.delete(s));for(let s in t){let i=!!t[s];i===this.st.has(s)||this.nt?.has(s)||(i?(e.add(s),this.st.add(s)):(e.remove(s),this.st.delete(s)))}return g}});var qt="0.1.0",Yt=["Montag","Dienstag","Mittwoch","Donnerstag","Freitag","Samstag","Sonntag"],Zt=[{key:"Familie",color:"126,87,194",border:"#7e57c2",text:"#c9b3f0",alpha:.13},{key:"Person 1",color:"30,136,229",border:"#1e88e5",text:"#8ecbff",alpha:.13},{key:"Person 2",color:"236,64,122",border:"#ec407a",text:"#ff9ec4",alpha:.13},{key:"Person 3",color:"0,137,123",border:"#00897b",text:"#5fd4c6",alpha:.15},{key:"Person 4",color:"251,140,0",border:"#fb8c00",text:"#ffca7a",alpha:.13},{key:"Essen",color:"109,76,65",border:"#6d4c41",text:"#c8b0a4",alpha:.16},{key:"Rest",color:"84,110,122",border:"#546e7a",text:"#b0bec5",alpha:.14}],Jt={Tanzen:"\u{1F483}",Singen:"\u{1F3B5}",Chor:"\u{1F3B6}",Sport:"\u{1F3CB}\uFE0F",Arzt:"\u{1FA7A}",Schule:"\u{1F392}",Arbeit:"\u{1F4BC}",Auto:"\u{1F697}",Hund:"\u{1F415}",Geburtstag:"\u{1F382}",Ausflug:"\u{1F9ED}",Einkauf:"\u{1F6D2}",Mittag:"\u{1F374}",Nacht:"\u{1F319}",Konzert:"\u{1F3B8}",Biblio:"\u{1F4DA}"},E=r=>String(r).padStart(2,"0"),lt=r=>`${r.getFullYear()}-${E(r.getMonth()+1)}-${E(r.getDate())}`,ct=r=>`${E(r.getHours())}:${E(r.getMinutes())}`,K=r=>`${E(r.getDate())}.${E(r.getMonth()+1)}.`;function M(r,t){let e=new Date(r);return e.setDate(e.getDate()+t),e}function Tt(r){let t=new Date(r),e=(t.getDay()+6)%7;return t.setDate(t.getDate()-e),t.setHours(0,0,0,0),t}function W(r){if(/^\d{4}-\d{2}-\d{2}$/.test(r)){let[t,e,s]=r.split("-").map(Number);return new Date(t,e-1,s)}return new Date(r)}function Pt(r,t){let e=new Date(r.getFullYear(),r.getMonth(),r.getDate()),s=new Date(t.getFullYear(),t.getMonth(),t.getDate());return Math.round((e-s)/864e5)}var R=class extends y{constructor(){super(),this._events=[],this._loading=!1,this._dialog=null,this._weekStart=Tt(new Date),this._hass=null,this._lastEntityUpdated=void 0}setConfig(t){if(!t||!t.entity)throw new Error("family-week-planner-card: 'entity' (a calendar entity) is required.");this.config={title:t.title,entity:t.entity,persons:Array.isArray(t.persons)&&t.persons.length?t.persons:Zt,icons:t.icons&&Object.keys(t.icons).length?t.icons:Jt,fallback_person:t.fallback_person||"Rest",row_height:t.row_height??210,show_toolbar:t.show_toolbar!==!1,default_icon:t.default_icon||"",default_start:t.default_start||"09:00",default_end:t.default_end||"10:00"}}set hass(t){if(this._hass=t,!this.config||!t)return;let e=t.states[this.config.entity],s=e?e.last_updated:"missing";this._lastEntityUpdated===void 0?(this._lastEntityUpdated=s,this._reload()):s!==this._lastEntityUpdated&&(this._lastEntityUpdated=s,this._reload())}get hass(){return this._hass}_persons(){return this.config.persons}_icons(){return this.config.icons}_iconEmoji(t){if(!t)return"";let e=Object.keys(this.config.icons).find(s=>s.toLowerCase()===String(t).toLowerCase());return e?this.config.icons[e]:""}_normIconKey(t){return t?Object.keys(this.config.icons).find(s=>s.toLowerCase()===String(t).toLowerCase())||t:""}async _reload(){if(!this._hass||!this.config)return;let t=this._weekStart,e=M(t,7);this._loading=!0;try{let s=`calendars/${this.config.entity}?start=${encodeURIComponent(t.toISOString())}&end=${encodeURIComponent(e.toISOString())}`,i=await this._hass.callApi("GET",s);this._events=Array.isArray(i)?i:[]}catch(s){console.error("family-week-planner-card: failed to load events",s),this._events=[]}finally{this._loading=!1}}_parseSummary(t){let e=String(t||""),s=e.indexOf(":"),i,o;s>=0?(i=e.slice(0,s).trim(),o=e.slice(s+1).trim()):(i=e.trim(),o=e.trim());let n,l;if(i.includes("|")){let h=i.split("|");n=h[0].trim(),l=h[1].trim()}else n=i,l="";let a=this._persons().find(h=>h.key.toLowerCase()===n.toLowerCase());return{personKey:a?a.key:this.config.fallback_person,iconKey:this._normIconKey(l),title:o}}_composeSummary(t,e,s){let i="";return e?i=`${t}|${e}`:t!==this.config.fallback_person&&(i=t),i?`${i}: ${s}`:s}_items(){let t=[];for(let e of this._events){let s=e.start&&(e.start.dateTime||e.start.date);if(!s)continue;let i=!!(e.start&&e.start.date&&!e.start.dateTime),o=W(s),n=Pt(o,this._weekStart);if(n<0||n>6)continue;let{personKey:l,iconKey:a,title:d}=this._parseSummary(e.summary);t.push({dayOffset:n,personKey:l,emoji:this._iconEmoji(a),time:i?"":ct(o),title:d,allday:i,raw:e})}return t.sort((e,s)=>e.allday===s.allday?e.time.localeCompare(s.time):e.allday?-1:1),t}_todayCol(){return Pt(new Date,this._weekStart)}_shiftWeek(t){this._weekStart=M(this._weekStart,t*7),this._reload()}_goToday(){this._weekStart=Tt(new Date),this._reload()}_openCreate(t,e){this._dialog={mode:"create",person:t.key,iconKey:this.config.default_icon,title:"",allday:!1,date:lt(e),start:this.config.default_start,end:this.config.default_end,uid:null,recurrence_id:null,saving:!1,error:""}}_openEdit(t){let e=t.raw,s=e.start.dateTime||e.start.date,i=e.end&&(e.end.dateTime||e.end.date),o=t.allday,n=W(s),l=i?W(i):M(n,o?1:0),a=this._parseSummary(e.summary);this._dialog={mode:"edit",person:a.personKey,iconKey:a.iconKey,title:a.title,allday:o,date:lt(n),start:o?this.config.default_start:ct(n),end:o?this.config.default_end:ct(l),uid:e.uid,recurrence_id:e.recurrence_id||null,recurring:!!e.recurrence_id||!!e.rrule,saving:!1,error:""}}_set(t,e){this._dialog={...this._dialog,[t]:e,error:""}}_closeDialog(){this._dialog=null}_onOverlayClick(){this._closeDialog()}_buildEventPayload(){let t=this._dialog,e=(t.title||"").trim();if(!e)return{error:"Bitte einen Titel eingeben."};let s=this._composeSummary(t.person,t.iconKey,e),i,o;if(t.allday)i=t.date,o=lt(M(W(t.date),1));else{if(!t.start||!t.end)return{error:"Bitte Von- und Bis-Zeit eingeben."};if(t.end<=t.start)return{error:"Die Bis-Zeit muss nach der Von-Zeit liegen."};i=`${t.date} ${t.start}:00`,o=`${t.date} ${t.end}:00`}return{event:{summary:s,dtstart:i,dtend:o}}}async _save(){let t=this._buildEventPayload();if(t.error){this._set("error",t.error);return}let e=this._dialog;this._dialog={...this._dialog,saving:!0,error:""};try{if(e.mode==="create")await this._hass.callWS({type:"calendar/event/create",entity_id:this.config.entity,event:t.event});else{let s={type:"calendar/event/update",entity_id:this.config.entity,uid:e.uid,event:t.event};e.recurrence_id&&(s.recurrence_id=e.recurrence_id,s.recurrence_range=""),await this._hass.callWS(s)}this._closeDialog(),await this._reload()}catch(s){this._dialog={...this._dialog,saving:!1,error:this._errText(s)}}}async _delete(){let t=this._dialog;if(!t.uid){this._set("error","Dieser Termin hat keine ID und kann nicht gel\xF6scht werden.");return}this._dialog={...this._dialog,saving:!0,error:""};try{let e={type:"calendar/event/delete",entity_id:this.config.entity,uid:t.uid};t.recurrence_id&&(e.recurrence_id=t.recurrence_id,e.recurrence_range=""),await this._hass.callWS(e),this._closeDialog(),await this._reload()}catch(e){this._dialog={...this._dialog,saving:!1,error:this._errText(e)}}}_errText(t){if(!t)return"Unbekannter Fehler.";if(typeof t=="string")return t;if(t.message)return t.message;if(t.error)return t.error;try{return JSON.stringify(t)}catch{return"Fehler beim Speichern."}}getCardSize(){return this._persons().length*3+2}render(){if(!this.config)return p``;let t=this._persons(),e=this._weekStart,s=[...Array(7)].map((l,a)=>M(e,a)),i=this._todayCol(),o=this._items(),n=`${this.config.row_height}px`;return p`
      <ha-card>
        ${this.config.title?p`<div class="ctitle">${this.config.title}</div>`:""}
        ${this.config.show_toolbar?this._renderToolbar(e,s):""}
        <div class="wrap">
          <table>
            <colgroup>
              <col class="pcol" />
              ${s.map(()=>p`<col class="dcol" />`)}
            </colgroup>
            <thead>
              <tr>
                <th class="corner"></th>
                ${s.map((l,a)=>p`<th class=${at({today:a===i})}>
                    ${Yt[a]}<br /><span class="dnum">${K(l)}</span>
                  </th>`)}
              </tr>
            </thead>
            <tbody>
              ${t.map(l=>p`<tr>
                  <td
                    class="pname"
                    style=${nt({background:`rgba(${l.color},${l.alpha??.13})`,borderLeftColor:l.border,color:l.text})}
                  >
                    ${l.label||l.key}
                  </td>
                  ${s.map((a,d)=>{let h=o.filter(c=>c.dayOffset===d&&c.personKey===l.key);return p`<td
                      class=${at({today:d===i,cell:!0})}
                      style=${nt({height:n,background:`rgba(${l.color},${l.alpha??.13})`})}
                      @click=${()=>this._openCreate(l,a)}
                      title="Neuen Termin für ${l.label||l.key} am ${K(a)} anlegen"
                    >
                      ${h.map(c=>p`<div
                          class="ev"
                          @click=${f=>{f.stopPropagation(),this._openEdit(c)}}
                        >
                          ${c.emoji?p`${c.emoji} `:""}${c.time?p`<b>${c.time}</b> `:""}${c.title}
                        </div>`)}
                    </td>`})}
                </tr>`)}
            </tbody>
          </table>
        </div>
        ${this._dialog?this._renderDialog():""}
      </ha-card>
    `}_renderToolbar(t,e){let s=`${K(t)} \u2013 ${K(e[6])}`;return p`<div class="toolbar">
      <button class="nav" @click=${()=>this._shiftWeek(-1)} title="Vorherige Woche">‹</button>
      <button class="today-btn" @click=${()=>this._goToday()}>Heute</button>
      <button class="nav" @click=${()=>this._shiftWeek(1)} title="Nächste Woche">›</button>
      <span class="range">${s}</span>
      ${this._loading?p`<span class="spin">…</span>`:""}
    </div>`}_renderDialog(){let t=this._dialog,e=this._persons(),s=Object.keys(this._icons());return p`
      <div class="overlay" @click=${this._onOverlayClick}>
        <div class="modal" @click=${i=>i.stopPropagation()}>
          <div class="mhead">${t.mode==="create"?"Neuer Termin":"Termin bearbeiten"}</div>
          ${t.recurring?p`<div class="note">Serientermin – Änderungen betreffen diesen Termin.</div>`:""}
          ${t.error?p`<div class="err">${t.error}</div>`:""}

          <label class="fld"
            >Person
            <select @change=${i=>this._set("person",i.target.value)}>
              ${e.map(i=>p`<option value=${i.key} ?selected=${i.key===t.person}>${i.label||i.key}</option>`)}
            </select>
          </label>

          <label class="fld"
            >Icon
            <select @change=${i=>this._set("iconKey",i.target.value)}>
              <option value="" ?selected=${!t.iconKey}>(kein)</option>
              ${s.map(i=>p`<option value=${i} ?selected=${i===t.iconKey}>${this._icons()[i]} ${i}</option>`)}
            </select>
          </label>

          <label class="fld"
            >Titel
            <input
              type="text"
              .value=${t.title}
              placeholder="z.B. Joggen"
              @input=${i=>this._set("title",i.target.value)}
            />
          </label>

          <label class="chk">
            <input type="checkbox" .checked=${t.allday} @change=${i=>this._set("allday",i.target.checked)} />
            Ganztags
          </label>

          <label class="fld"
            >Datum
            <input type="date" .value=${t.date} @input=${i=>this._set("date",i.target.value)} />
          </label>

          ${t.allday?"":p`<div class="times">
                <label class="fld"
                  >Von
                  <input type="time" .value=${t.start} @input=${i=>this._set("start",i.target.value)} />
                </label>
                <label class="fld"
                  >Bis
                  <input type="time" .value=${t.end} @input=${i=>this._set("end",i.target.value)} />
                </label>
              </div>`}

          <div class="actions">
            ${t.mode==="edit"?p`<button class="del" @click=${this._delete} ?disabled=${t.saving}>Löschen</button>`:""}
            <span class="spacer"></span>
            <button @click=${this._closeDialog} ?disabled=${t.saving}>Abbrechen</button>
            <button class="primary" @click=${this._save} ?disabled=${t.saving}>
              ${t.saving?"\u2026":"Speichern"}
            </button>
          </div>
        </div>
      </div>
    `}};V(R,"properties",{_weekStart:{state:!0},_events:{state:!0},_loading:{state:!0},_dialog:{state:!0}}),V(R,"styles",q`
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
  `);customElements.define("family-week-planner-card",R);window.customCards=window.customCards||[];window.customCards.push({type:"family-week-planner-card",name:"Family Week Planner",description:"Editable person-by-day family week planner over one calendar entity (Person|Icon: Title events).",preview:!1,documentationURL:"https://github.com/psewar/family-week-planner-card"});console.info(`%c family-week-planner-card %c v${qt} `,"color:#fff;background:#7e57c2;border-radius:4px 0 0 4px;padding:2px 4px","color:#7e57c2;background:#eee;border-radius:0 4px 4px 0;padding:2px 4px");
