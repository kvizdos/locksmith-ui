/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t=globalThis,e=t.ShadowRoot&&(void 0===t.ShadyCSS||t.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,i=Symbol(),s=new WeakMap;let r=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==i)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const i=this.t;if(e&&void 0===t){const e=void 0!==i&&1===i.length;e&&(t=s.get(i)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),e&&s.set(i,t))}return t}toString(){return this.cssText}};const o=(t,...e)=>{const s=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new r(s,t,i)},a=e?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new r("string"==typeof t?t:t+"",void 0,i))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,{is:n,defineProperty:l,getOwnPropertyDescriptor:d,getOwnPropertyNames:h,getOwnPropertySymbols:c,getPrototypeOf:p}=Object,u=globalThis,g=u.trustedTypes,v=g?g.emptyScript:"",f=u.reactiveElementPolyfillSupport,m=(t,e)=>t,w={toAttribute(t,e){switch(e){case Boolean:t=t?v:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},y=(t,e)=>!n(t,e),b={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:y};Symbol.metadata??=Symbol("metadata"),u.litPropertyMetadata??=new WeakMap;class $ extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=b){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),s=this.getPropertyDescriptor(t,i,e);void 0!==s&&l(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){const{get:s,set:r}=d(this.prototype,t)??{get(){return this[e]},set(t){this[e]=t}};return{get(){return s?.call(this)},set(e){const o=s?.call(this);r.call(this,e),this.requestUpdate(t,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??b}static _$Ei(){if(this.hasOwnProperty(m("elementProperties")))return;const t=p(this);t.finalize(),void 0!==t.l&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(m("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(m("properties"))){const t=this.properties,e=[...h(t),...c(t)];for(const i of e)this.createProperty(i,t[i])}const t=this[Symbol.metadata];if(null!==t){const e=litPropertyMetadata.get(t);if(void 0!==e)for(const[t,i]of e)this.elementProperties.set(t,i)}this._$Eh=new Map;for(const[t,e]of this.elementProperties){const i=this._$Eu(t,e);void 0!==i&&this._$Eh.set(i,t)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(a(t))}else void 0!==t&&e.push(a(t));return e}static _$Eu(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$EO??=new Set).add(t),void 0!==this.renderRoot&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$EO?.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const i=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return((i,s)=>{if(e)i.adoptedStyleSheets=s.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet));else for(const e of s){const s=document.createElement("style"),r=t.litNonce;void 0!==r&&s.setAttribute("nonce",r),s.textContent=e.cssText,i.appendChild(s)}})(i,this.constructor.elementStyles),i}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$EO?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EC(t,e){const i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(void 0!==s&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:w).toAttribute(e,i.type);this._$Em=t,null==r?this.removeAttribute(s):this.setAttribute(s,r),this._$Em=null}}_$AK(t,e){const i=this.constructor,s=i._$Eh.get(t);if(void 0!==s&&this._$Em!==s){const t=i.getPropertyOptions(s),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==t.converter?.fromAttribute?t.converter:w;this._$Em=s,this[s]=r.fromAttribute(e,t.type),this._$Em=null}}requestUpdate(t,e,i){if(void 0!==t){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??y)(this[t],e))return;this.P(t,e,i)}!1===this.isUpdatePending&&(this._$ES=this._$ET())}P(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[t,e]of this._$Ep)this[t]=e;this._$Ep=void 0}const t=this.constructor.elementProperties;if(t.size>0)for(const[e,i]of t)!0!==i.wrapped||this._$AL.has(e)||void 0===this[e]||this.P(e,this[e],i)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$EO?.forEach((t=>t.hostUpdate?.())),this.update(e)):this._$EU()}catch(e){throw t=!1,this._$EU(),e}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$EO?.forEach((t=>t.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((t=>this._$EC(t,this[t]))),this._$EU()}updated(t){}firstUpdated(t){}}$.elementStyles=[],$.shadowRootOptions={mode:"open"},$[m("elementProperties")]=new Map,$[m("finalized")]=new Map,f?.({ReactiveElement:$}),(u.reactiveElementVersions??=[]).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const x=globalThis,_=x.trustedTypes,A=_?_.createPolicy("lit-html",{createHTML:t=>t}):void 0,S="$lit$",P=`lit$${Math.random().toFixed(9).slice(2)}$`,E="?"+P,R=`<${E}>`,M=document,k=()=>M.createComment(""),C=t=>null===t||"object"!=typeof t&&"function"!=typeof t,O=Array.isArray,z="[ \t\n\f\r]",U=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,H=/-->/g,L=/>/g,T=RegExp(`>|${z}(?:([^\\s"'>=/]+)(${z}*=${z}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),N=/'/g,j=/"/g,B=/^(?:script|style|textarea|title)$/i,D=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),I=Symbol.for("lit-noChange"),V=Symbol.for("lit-nothing"),W=new WeakMap,Y=M.createTreeWalker(M,129);function q(t,e){if(!O(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==A?A.createHTML(e):e}const J=(t,e)=>{const i=t.length-1,s=[];let r,o=2===e?"<svg>":3===e?"<math>":"",a=U;for(let e=0;e<i;e++){const i=t[e];let n,l,d=-1,h=0;for(;h<i.length&&(a.lastIndex=h,l=a.exec(i),null!==l);)h=a.lastIndex,a===U?"!--"===l[1]?a=H:void 0!==l[1]?a=L:void 0!==l[2]?(B.test(l[2])&&(r=RegExp("</"+l[2],"g")),a=T):void 0!==l[3]&&(a=T):a===T?">"===l[0]?(a=r??U,d=-1):void 0===l[1]?d=-2:(d=a.lastIndex-l[2].length,n=l[1],a=void 0===l[3]?T:'"'===l[3]?j:N):a===j||a===N?a=T:a===H||a===L?a=U:(a=T,r=void 0);const c=a===T&&t[e+1].startsWith("/>")?" ":"";o+=a===U?i+R:d>=0?(s.push(n),i.slice(0,d)+S+i.slice(d)+P+c):i+P+(-2===d?e:c)}return[q(t,o+(t[i]||"<?>")+(2===e?"</svg>":3===e?"</math>":"")),s]};class F{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let r=0,o=0;const a=t.length-1,n=this.parts,[l,d]=J(t,e);if(this.el=F.createElement(l,i),Y.currentNode=this.el.content,2===e||3===e){const t=this.el.content.firstChild;t.replaceWith(...t.childNodes)}for(;null!==(s=Y.nextNode())&&n.length<a;){if(1===s.nodeType){if(s.hasAttributes())for(const t of s.getAttributeNames())if(t.endsWith(S)){const e=d[o++],i=s.getAttribute(t).split(P),a=/([.?@])?(.*)/.exec(e);n.push({type:1,index:r,name:a[2],strings:i,ctor:"."===a[1]?X:"?"===a[1]?tt:"@"===a[1]?et:Q}),s.removeAttribute(t)}else t.startsWith(P)&&(n.push({type:6,index:r}),s.removeAttribute(t));if(B.test(s.tagName)){const t=s.textContent.split(P),e=t.length-1;if(e>0){s.textContent=_?_.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],k()),Y.nextNode(),n.push({type:2,index:++r});s.append(t[e],k())}}}else if(8===s.nodeType)if(s.data===E)n.push({type:2,index:r});else{let t=-1;for(;-1!==(t=s.data.indexOf(P,t+1));)n.push({type:7,index:r}),t+=P.length-1}r++}}static createElement(t,e){const i=M.createElement("template");return i.innerHTML=t,i}}function G(t,e,i=t,s){if(e===I)return e;let r=void 0!==s?i._$Co?.[s]:i._$Cl;const o=C(e)?void 0:e._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(t),r._$AT(t,i,s)),void 0!==s?(i._$Co??=[])[s]=r:i._$Cl=r),void 0!==r&&(e=G(t,r._$AS(t,e.values),r,s)),e}class K{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??M).importNode(e,!0);Y.currentNode=s;let r=Y.nextNode(),o=0,a=0,n=i[0];for(;void 0!==n;){if(o===n.index){let e;2===n.type?e=new Z(r,r.nextSibling,this,t):1===n.type?e=new n.ctor(r,n.name,n.strings,this,t):6===n.type&&(e=new it(r,this,t)),this._$AV.push(e),n=i[++a]}o!==n?.index&&(r=Y.nextNode(),o++)}return Y.currentNode=M,s}p(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class Z{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=V,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===t?.nodeType&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=G(this,t,e),C(t)?t===V||null==t||""===t?(this._$AH!==V&&this._$AR(),this._$AH=V):t!==this._$AH&&t!==I&&this._(t):void 0!==t._$litType$?this.$(t):void 0!==t.nodeType?this.T(t):(t=>O(t)||"function"==typeof t?.[Symbol.iterator])(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==V&&C(this._$AH)?this._$AA.nextSibling.data=t:this.T(M.createTextNode(t)),this._$AH=t}$(t){const{values:e,_$litType$:i}=t,s="number"==typeof i?this._$AC(t):(void 0===i.el&&(i.el=F.createElement(q(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{const t=new K(s,this),i=t.u(this.options);t.p(e),this.T(i),this._$AH=t}}_$AC(t){let e=W.get(t.strings);return void 0===e&&W.set(t.strings,e=new F(t)),e}k(t){O(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const r of t)s===e.length?e.push(i=new Z(this.O(k()),this.O(k()),this,this.options)):i=e[s],i._$AI(r),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){void 0===this._$AM&&(this._$Cv=t,this._$AP?.(t))}}class Q{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,r){this.type=1,this._$AH=V,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=V}_$AI(t,e=this,i,s){const r=this.strings;let o=!1;if(void 0===r)t=G(this,t,e,0),o=!C(t)||t!==this._$AH&&t!==I,o&&(this._$AH=t);else{const s=t;let a,n;for(t=r[0],a=0;a<r.length-1;a++)n=G(this,s[i+a],e,a),n===I&&(n=this._$AH[a]),o||=!C(n)||n!==this._$AH[a],n===V?t=V:t!==V&&(t+=(n??"")+r[a+1]),this._$AH[a]=n}o&&!s&&this.j(t)}j(t){t===V?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class X extends Q{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===V?void 0:t}}class tt extends Q{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==V)}}class et extends Q{constructor(t,e,i,s,r){super(t,e,i,s,r),this.type=5}_$AI(t,e=this){if((t=G(this,t,e,0)??V)===I)return;const i=this._$AH,s=t===V&&i!==V||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,r=t!==V&&(i===V||s);s&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}}class it{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){G(this,t)}}const st=x.litHtmlPolyfillSupport;st?.(F,Z),(x.litHtmlVersions??=[]).push("3.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
let rt=class extends ${constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{const s=i?.renderBefore??e;let r=s._$litPart$;if(void 0===r){const t=i?.renderBefore??null;s._$litPart$=r=new Z(e.insertBefore(k(),t),t,void 0,i??{})}return r._$AI(t),r})(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return I}};rt._$litElement$=!0,rt.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:rt});const ot=globalThis.litElementPolyfillSupport;ot?.({LitElement:rt}),(globalThis.litElementVersions??=[]).push("4.1.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const at=t=>(e,i)=>{void 0!==i?i.addInitializer((()=>{customElements.define(t,e)})):customElements.define(t,e)}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,nt={attribute:!0,type:String,converter:w,reflect:!1,hasChanged:y},lt=(t=nt,e,i)=>{const{kind:s,metadata:r}=i;let o=globalThis.litPropertyMetadata.get(r);if(void 0===o&&globalThis.litPropertyMetadata.set(r,o=new Map),o.set(i.name,t),"accessor"===s){const{name:s}=i;return{set(i){const r=e.get.call(this);e.set.call(this,i),this.requestUpdate(s,r,t)},init(e){return void 0!==e&&this.P(s,void 0,t),e}}}if("setter"===s){const{name:s}=i;return function(i){const r=this[s];e.call(this,i),this.requestUpdate(s,r,t)}}throw Error("Unsupported decorator location: "+s)};function dt(t){return(e,i)=>"object"==typeof i?lt(t,e,i):((t,e,i)=>{const s=e.hasOwnProperty(i);return e.constructor.createProperty(i,s?{...t,wrapped:!0}:t),s?Object.getOwnPropertyDescriptor(e,i):void 0})(t,e,i)
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}function ht(t){return dt({...t,state:!0,attribute:!1})}const ct=o`
  input {
    padding: 0.85rem;
    border-radius: 0.5rem;
    border: 1px solid var(--input-border, var(--gray-300, #bdbdbd));
    font-size: 1rem;
    width: 100%;
  }
  input:-webkit-autofill,
  textarea:-webkit-autofill,
  select:-webkit-autofill {
    border: 0;
    -webkit-text-fill-color: black;
    -webkit-box-shadow: 0 0 0px 1000px 0 inset;
    transition: background-color 5000s ease-in-out 0s;
  }
  .input-container *:user-invalid {
    outline: 1px solid var(--danger-600, #e01e47);
  }

  textarea {
    padding: 0.85rem;
    border-radius: 0.5rem;
    border: 1px solid var(--input-border, var(--gray-300, #bdbdbd));
    font-size: 1rem;
    width: 100%;
    resize: vertical;
  }

  .input-container {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .input-container > label {
    font-weight: 600;
    font-size: 0.85rem;
  }

  .input-container > label:not(:has(+ p)) {
    margin-bottom: 0.5rem;
  }

  .input-container > label + p {
    color: #656565;
    font-size: 0.85rem;
    margin: 0.25rem 0 0.5rem 0;
  }

  .input-container > label:has(button) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .input-container > label button {
    border: 0;
    background: 0;
    padding: 0;
    margin: 0;
    display: flex;
    color: var(--accent);
    align-items: center;
    font-weight: 600;
    gap: 0.5rem;
  }
  .input-container > label:has(~ input:required)::after {
    content: "*";
    margin-left: 0.25rem;
    color: var(--danger-400);
  }

  .input-container input,
  .input-container textarea {
    padding: 0.85rem 0.85rem;
    border-radius: 0.5rem;
    border: 1px solid var(--input-border, #bdbdbd);
    width: 100%;
    font-size: 1rem;
  }

  .input-container input:focus {
    outline: 2px solid var(--accent);
  }

  .input-container p#error {
    margin-top: 0.25rem;
    color: var(--danger-600);
    font-size: 0.85rem;
    display: none;
  }

  .input-container :user-invalid + p#error {
    display: inherit;
  }

  .input-container :user-invalid {
    border-radius: 0.5rem;
    outline: 2px solid var(--danger-600);
  }
`
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */,pt=1,ut=2,gt=t=>(...e)=>({_$litDirective$:t,values:e});class vt{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ft=gt(class extends vt{constructor(t){if(super(t),t.type!==pt||"class"!==t.name||t.strings?.length>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter((e=>t[e])).join(" ")+" "}update(t,[e]){if(void 0===this.st){this.st=new Set,void 0!==t.strings&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter((t=>""!==t))));for(const t in e)e[t]&&!this.nt?.has(t)&&this.st.add(t);return this.render(e)}const i=t.element.classList;for(const t of this.st)t in e||(i.remove(t),this.st.delete(t));for(const t in e){const s=!!e[t];s===this.st.has(t)||this.nt?.has(t)||(s?(i.add(t),this.st.add(t)):(i.remove(t),this.st.delete(t)))}return I}});var mt=function(t,e,i,s){var r,o=arguments.length,a=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(a=(o<3?r(a):o>3?r(e,i,a):r(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a};let wt=class extends rt{constructor(){super(...arguments),this.disabled=!1,this.expectLoad=!1,this.loading=!1,this.loadingText=""}render(){return D`<button
      ?disabled=${this.disabled||this.loading}
      class=${ft({loading:this.loading})}
      @click=${()=>{this.dispatchEvent(new Event("fl-click"))}}
    >
      ${this.expectLoad?D`
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 88.5C42.3854 88.5 34.9418 86.242 28.6105 82.0116C22.2793 77.7811 17.3446 71.7683 14.4306 64.7333C11.5167 57.6984 10.7542 49.9573 12.2398 42.489C13.7253 35.0208 17.3921 28.1607 22.7764 22.7764C28.1607 17.3921 35.0208 13.7253 42.489 12.2398C49.9573 10.7542 57.6984 11.5167 64.7333 14.4306C71.7683 17.3446 77.7811 22.2793 82.0116 28.6105C86.242 34.9418 88.5 42.3854 88.5 50"
                stroke="var(--fl-button-loader-loop, var(--primary-300, #8ec4ff))"
                stroke-width="15"
              />
              <path
                id="spinner"
                d="M88.5 50C88.5 55.0559 87.5042 60.0623 85.5694 64.7333C83.6346 69.4043 80.7987 73.6486 77.2236 77.2236C73.6486 80.7987 69.4043 83.6346 64.7333 85.5694C60.0623 87.5042 55.0559 88.5 50 88.5"
                stroke="var(--fl-button-loader-spinner, var(--primary-600, #1a5cf4))"
                stroke-width="15"
              />
            </svg>
          `:D``}
      ${this.loading&&""!==this.loadingText?this.loadingText:D`<slot></slot>`}
    </button>`}};wt.styles=o`
    :host {
      --button-bg: var(--fl-button-bg, var(--primary-500, #327eff));
      --button-text: var(--fl-button-text, #fff);
      --border-radius: 0.5rem;
      --padding: 0.5rem 1rem;
      --weight: 500;
    }

    :host(.pill) {
      --border-radius: 5rem;
      --padding: 0.5rem 1.15rem;
    }

    :host(.big) {
      --padding: 0.85rem;
      --weight: 600;
    }

    button {
      background-color: var(--button-bg);
      color: var(--button-text);
      border: 0;
      padding: var(--padding);
      border-radius: var(--border-radius);
      cursor: pointer;
      font-weight: var(--weight);
      transition: 200ms;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 1rem;
    }

    :host(.big) button {
      width: 100%;
    }

    :host(.plain) button {
      background-color: unset;
      color: var(--button-bg);
      padding: 0;
    }

    button.loading {
      gap: 0.5rem;
    }

    button[disabled] {
      --button-bg: var(--fl-button-bg-disabled, var(--primary-100, #d9eaff));
      --button-text: var(
        --fl-button-text-disabled,
        var(--primary-500, #327eff)
      );
      cursor: not-allowed;
    }

    :host(.plain) button[disabled] {
      color: var(--fl-button-plain-disabled, var(--primary-400, #59a2ff));
    }

    button:not([disabled]):hover {
      --button-bg: var(--fl-button-bg-hover, var(--primary-600, #1a5cf4));
    }

    button:not([disabled]):active {
      --button-bg: var(--fl-button-bg-active, var(--primary-800, #173ab6));
      transition: 50ms;
    }

    svg {
      width: 0;
      height: 12px;
    }

    button.loading svg {
      width: 12px;
    }

    svg path {
      transform-origin: center;
      animation: spin 1200ms linear infinite;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }
  `,mt([dt()],wt.prototype,"disabled",void 0),mt([dt()],wt.prototype,"expectLoad",void 0),mt([dt()],wt.prototype,"loading",void 0),mt([dt()],wt.prototype,"loadingText",void 0),wt=mt([at("button-component")],wt);
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const yt=(t,e)=>{const i=t._$AN;if(void 0===i)return!1;for(const t of i)t._$AO?.(e,!1),yt(t,e);return!0},bt=t=>{let e,i;do{if(void 0===(e=t._$AM))break;i=e._$AN,i.delete(t),t=e}while(0===i?.size)},$t=t=>{for(let e;e=t._$AM;t=e){let i=e._$AN;if(void 0===i)e._$AN=i=new Set;else if(i.has(t))break;i.add(t),At(e)}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function xt(t){void 0!==this._$AN?(bt(this),this._$AM=t,$t(this)):this._$AM=t}function _t(t,e=!1,i=0){const s=this._$AH,r=this._$AN;if(void 0!==r&&0!==r.size)if(e)if(Array.isArray(s))for(let t=i;t<s.length;t++)yt(s[t],!1),bt(s[t]);else null!=s&&(yt(s,!1),bt(s));else yt(this,t)}const At=t=>{t.type==ut&&(t._$AP??=_t,t._$AQ??=xt)};class St extends vt{constructor(){super(...arguments),this._$AN=void 0}_$AT(t,e,i){super._$AT(t,e,i),$t(this),this.isConnected=t._$AU}_$AO(t,e=!0){t!==this.isConnected&&(this.isConnected=t,t?this.reconnected?.():this.disconnected?.()),e&&(yt(this,t),bt(this))}setValue(t){if((t=>void 0===t.strings)(this._$Ct))this._$Ct._$AI(t,this);else{const e=[...this._$Ct._$AH];e[this._$Ci]=t,this._$Ct._$AI(e,this,0)}}disconnected(){}reconnected(){}}
/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Pt=()=>new Et;class Et{}const Rt=new WeakMap,Mt=gt(class extends St{render(t){return V}update(t,[e]){const i=e!==this.Y;return i&&void 0!==this.Y&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.Y=e,this.ht=t.options?.host,this.rt(this.ct=t.element)),V}rt(t){if(this.isConnected||(t=void 0),"function"==typeof this.Y){const e=this.ht??globalThis;let i=Rt.get(e);void 0===i&&(i=new WeakMap,Rt.set(e,i)),void 0!==i.get(this.Y)&&this.Y.call(this.ht,void 0),i.set(this.Y,t),void 0!==t&&this.Y.call(this.ht,t)}else this.Y.value=t}get lt(){return"function"==typeof this.Y?Rt.get(this.ht??globalThis)?.get(this.Y):this.Y?.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});async function kt(t){const e=(new TextEncoder).encode(t),i=await crypto.subtle.digest("SHA-256",e);return Array.from(new Uint8Array(i)).map((t=>t.toString(16).padStart(2,"0"))).join("")}async function Ct(){const t=window.screen.height*window.devicePixelRatio,e=window.screen.width*window.devicePixelRatio,i=window.screen.colorDepth;console.log("Color Depth",i);const s=await kt(JSON.stringify({screenHeight:t,screenWidth:e,colorDepth:i})),r=Intl.DateTimeFormat().resolvedOptions().timeZone,o=window.navigator.hardwareConcurrency,a=window.navigator.language,n=await(async()=>{const t=document.createElement("canvas");t.width=500,t.height=500,t.style.display="none",document.body.appendChild(t);const e=t.getContext("2d");e.textBaseline="top",e.font="14px 'Arial'",e.textBaseline="alphabetic",e.fillStyle="#f60",e.fillRect(125,1,62,20),e.fillStyle="#069",e.fillText("Hello, world!",2,15),e.fillStyle="rgba(102, 204, 0, 0.7)",e.fillText("Hello, world!",4,17),e.fillText("🤙",100,20),e.fillText("🎉",110,25),e.fillText("🤣",115,30);const i=t.toDataURL();t.remove();return await kt(i)})(),l=await(async()=>{const t=(()=>{const t=document.createElement("canvas");let e;try{e=t.getContext("webgl")||t.getContext("experimental-webgl")}catch(t){console.error("Failed to get WebGL context: ",t)}return e})();if(!t)return null;const e=t.getExtension("WEBGL_debug_renderer_info");if(e){const i={renderer:t.getParameter(e.UNMASKED_RENDERER_WEBGL),vendor:t.getParameter(e.UNMASKED_VENDOR_WEBGL)};return await kt(JSON.stringify(i))}return await kt(JSON.stringify("blank"))})(),d=await kt(JSON.stringify({touchSupport:"ontouchstart"in window||navigator.maxTouchPoints>0,maxTouchPoints:navigator.maxTouchPoints})),h=(null===navigator||void 0===navigator?void 0:navigator.platform)||"unknown",c=await(async()=>{const t=new OfflineAudioContext(1,44100,44100),e=t.createOscillator();e.type="sine",e.frequency.setValueAtTime(1e3,t.currentTime),e.connect(t.destination),e.start(0);const i=(await t.startRendering()).getChannelData(0),s=new Uint8Array(i.length);for(let t=0;t<i.length;t++)s[t]=Math.floor(255*(.5*i[t]+.5));const r=await crypto.subtle.digest("SHA-256",s),o=Array.from(new Uint8Array(r)).map((t=>t.toString(16).padStart(2,"0"))).join("");return o})();let p={screen:s,timezone:r,hardwareConcurrency:o,deviceMemory:"0",canvas:n,lang:a,webgl:l,touch:d,battery:!1,platform:h,audio:c,userAgent:"",windowSize:null,dnt:null,devices:null};const u=await kt(navigator.userAgent),g=await kt(JSON.stringify({height:window.innerHeight,width:window.innerWidth})),v=navigator.doNotTrack||!1,f=await(async()=>{try{return(await navigator.mediaDevices.enumerateDevices()).map((t=>({kind:t.kind,label:t.label,deviceId:t.deviceId,groupId:t.groupId})))}catch(t){return console.log(t),[]}})(),m=await kt(f.map((t=>Object.values(t).join(":"))).join(";"));return p={...p,userAgent:u,windowSize:g,dnt:v,devices:m},p}const Ot={activity:D`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 37 37"><path fill-rule="evenodd" d="M8 2h21a6 6 0 0 1 6 6v21a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6V8a6 6 0 0 1 6-6M0 8a8 8 0 0 1 8-8h21a8 8 0 0 1 8 8v21a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8zm8.5 1a1.5 1.5 0 1 0 0 3h21a1.5 1.5 0 0 0 0-3zM7 18.5A1.5 1.5 0 0 1 8.5 17h18a1.5 1.5 0 0 1 0 3h-18A1.5 1.5 0 0 1 7 18.5M8.5 25a1.5 1.5 0 0 0 0 3h20a1.5 1.5 0 0 0 0-3z" class="primary" clip-rule="evenodd"/></svg>`,alert:D`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><g clip-path="url(#a)"><path stroke-width="5" d="m52.165 17.75 34.641 60c.962 1.667-.24 3.75-2.165 3.75H15.359c-1.924 0-3.127-2.083-2.165-3.75l34.64-60c.963-1.667 3.369-1.667 4.331 0" class="primary-stroke"/><path d="M44.414 40.384A5 5 0 0 1 49.4 35h1.202a5 5 0 0 1 4.985 5.383l-1.114 14.475a4.486 4.486 0 0 1-8.945 0z" class="primary"/><circle cx="50" cy="68" r="5" class="primary"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h100v100H0z"/></clipPath></defs></svg>`,check:D`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 15"><path stroke-width="2" d="m1 9.5 3.695 3.695a1 1 0 0 0 1.5-.098L15.5 1" class="primary-stroke"/></svg>`,checkmark:D`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 33 33"><circle cx="16.15" cy="16.15" r="16.15" class="primary"/><path stroke="#fff" stroke-width="3" d="m8.604 18.867 3.328 3.328a1 1 0 0 0 1.452-.04L24.3 9.962"/></svg>`,clock:D`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path stroke-width="6" d="M68.5 14.526A39.8 39.8 0 0 0 50 10c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40c0-8.127-1.336-14.688-5.5-21" class="secondary-stroke"/><path d="M87.255 18.607a5 5 0 1 0-7.071-7.071L45.536 46.184a5 5 0 1 0 7.07 7.07zM24.16 82.33a5 5 0 0 0-8.66-5l-5 8.66a5 5 0 1 0 8.66 5zm51.34 0a5 5 0 1 1 8.66-5l5 8.66a5 5 0 0 1-8.66 5z" class="primary"/></svg>`,cog:D`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 95 95"><path fill-rule="evenodd" d="M43 0a5 5 0 0 0-5 5v8.286c0 1.856-1.237 3.473-2.951 4.185-1.715.712-3.71.432-5.024-.88l-5.86-5.86a5 5 0 0 0-7.07 0l-6.365 6.363a5 5 0 0 0 0 7.072l5.86 5.86c1.313 1.312 1.593 3.308.88 5.023C16.76 36.763 15.143 38 13.287 38H5a5 5 0 0 0-5 5v9a5 5 0 0 0 5 5h8.286c1.856 0 3.473 1.237 4.185 2.951.712 1.715.432 3.71-.88 5.024l-5.86 5.86a5 5 0 0 0 0 7.07l6.363 6.364a5 5 0 0 0 7.072 0l5.86-5.86c1.312-1.312 3.308-1.592 5.023-.88S38 79.858 38 81.714V90a5 5 0 0 0 5 5h9a5 5 0 0 0 5-5v-8.286c0-1.856 1.237-3.473 2.951-4.185 1.715-.712 3.71-.432 5.024.88l5.86 5.86a5 5 0 0 0 7.07 0l6.365-6.363a5 5 0 0 0 0-7.071l-5.86-5.86c-1.313-1.313-1.593-3.308-.88-5.024.71-1.714 2.327-2.951 4.183-2.951H90a5 5 0 0 0 5-5v-9a5 5 0 0 0-5-5h-8.286c-1.856 0-3.473-1.237-4.185-2.951-.712-1.715-.432-3.71.88-5.024l5.86-5.86a5 5 0 0 0 0-7.07l-6.363-6.365a5 5 0 0 0-7.071 0l-5.86 5.86c-1.313 1.313-3.308 1.593-5.024.88C58.237 16.76 57 15.143 57 13.287V5a5 5 0 0 0-5-5zm4 62c8.284 0 15-6.716 15-15s-6.716-15-15-15-15 6.716-15 15 6.716 15 15 15" class="primary" clip-rule="evenodd"/></svg>`,email:D`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path d="M48.19 50.952 7 30a6 6 0 0 1 6-6h74a6 6 0 0 1 6 6L52.765 50.93a5 5 0 0 1-4.574.022" class="primary"/><path fill-rule="evenodd" d="M88 26H12a4 4 0 0 0-4 4v41a4 4 0 0 0 4 4h76a4 4 0 0 0 4-4V30a4 4 0 0 0-4-4m-76-4a8 8 0 0 0-8 8v41a8 8 0 0 0 8 8h76a8 8 0 0 0 8-8V30a8 8 0 0 0-8-8z" class="secondary" clip-rule="evenodd"/></svg>`,flag:D`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 9 13"><path d="M8 5V1l-1.175.294a10 10 0 0 1-5.588-.215L1 1v4l.237.08a10 10 0 0 0 5.588.214z" class="secondary"/><path d="M1 12.5V5m0 0V1l.237.08a10 10 0 0 0 5.588.214L8 1v4l-1.175.294a10 10 0 0 1-5.588-.215z" class="primary-stroke"/></svg>`,info:D`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11.5" stroke="#fff"/><path stroke-width="2" d="M13.5 18.5V13a1 1 0 0 0-1-1H10m3.5 6.5h-4m4 0h3" class="primary-stroke"/><circle cx="12.5" cy="7" r="2" class="primary"/></svg>`,note:D`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><g stroke-width="6" clip-path="url(#a)"><path d="M58.657 3H18C9.716 3 3 9.716 3 18v64c0 8.284 6.716 15 15 15h64c8.284 0 15-6.716 15-15V34.629" class="primary-stroke"/><path d="M48.93 54.861 79.801 3.473a1 1 0 0 1 1.358-.35L92.707 9.79a1 1 0 0 1 .406 1.29l-.049.091L62.38 62.25 42.86 76.275z" class="secondary-stroke"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h100v100H0z"/></clipPath></defs></svg>`,"person-group":D`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 13a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v3a1 1 0 0 1-1 1h-8a1 1 0 0 1-1-1 1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3M7 9a3 3 0 1 1 0-6 3 3 0 0 1 0 6m10 0a3 3 0 1 1 0-6 3 3 0 0 1 0 6" class="secondary"/><path d="M12 13a3 3 0 1 1 0-6 3 3 0 0 1 0 6m-3 1h6a3 3 0 0 1 3 3v3a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-3a3 3 0 0 1 3-3" class="primary"/></svg>`,"person-outline":D`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 34"><path fill-rule="evenodd" d="M20 7a5 5 0 1 1-10 0 5 5 0 0 1 10 0m2 0A7 7 0 1 1 8 7a7 7 0 0 1 14 0M.187 21.912C-.438 17.746 2.788 14 7 14l1.694 1.376a10 10 0 0 0 12.612 0L23 14c4.212 0 7.438 3.746 6.813 7.912L28 34H2zm22.38-4.983 1.09-.886a4.89 4.89 0 0 1 4.178 5.572L26.278 32H3.722L2.165 21.615a4.89 4.89 0 0 1 4.178-5.572l1.09.886a12 12 0 0 0 15.134 0" class="primary" clip-rule="evenodd"/></svg>`,person:D`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 34"><g clip-path="url(#a)"><path fill-rule="evenodd" d="M20 7a5 5 0 1 1-10 0 5 5 0 0 1 10 0m2 0A7 7 0 1 1 8 7a7 7 0 0 1 14 0M.187 21.912C-.438 17.746 2.788 14 7 14l1.694 1.376a10 10 0 0 0 12.612 0L23 14c4.212 0 7.438 3.746 6.813 7.912L28 34H2z" class="primary" clip-rule="evenodd"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h30v34H0z"/></clipPath></defs></svg>`,"phone-disabled":D`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><g clip-path="url(#a)"><rect width="31" height="11.499" x="37.69" y="4.483" stroke="#A4A4A4" stroke-width="4" rx="3" transform="rotate(60 37.69 4.483)"/><path stroke="#A4A4A4" stroke-width="4" d="M56.212 88a13 13 0 0 1-9.46-4.082l-.233-.255-14.483-16.209a13 13 0 0 1-2.514-4.191l-.109-.31L20.205 35.7a13 13 0 0 1 1.186-10.876l.196-.315 3.355-5.218 9.737 16.23c.21.348.345.735.4 1.136l.018.174.88 11.26a27 27 0 0 0 12.767 20.893l.719.426 6.43 3.689c.383.22.713.52.965.88l.103.158L65.434 88z"/><rect width="31" height="11.499" x="70.69" y="60.732" stroke="#A4A4A4" stroke-width="4" rx="3" transform="rotate(60 70.69 60.732)"/><circle cx="36.869" cy="60.869" r="19.869" class="primary"/><path fill="#fff" fill-rule="evenodd" d="M30.32 49.486a1 1 0 0 0-1.413 0l-3.683 3.682a1 1 0 0 0 0 1.415l5.908 5.907a1 1 0 0 1 0 1.414l-6.103 6.103a1 1 0 0 0 0 1.414l3.55 3.55a1 1 0 0 0 1.414 0l6.103-6.103a1 1 0 0 1 1.414 0l5.907 5.908a1 1 0 0 0 1.415 0l3.682-3.682a1 1 0 0 0 0-1.415l-5.908-5.907a1 1 0 0 1 0-1.414l6.103-6.103a1 1 0 0 0 0-1.415l-3.55-3.55a1 1 0 0 0-1.413 0l-6.104 6.104a1 1 0 0 1-1.414 0z" clip-rule="evenodd"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h100v100H0z"/></clipPath></defs></svg>`,phone:D`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><g clip-path="url(#a)"><rect width="35" height="15.499" x="37.422" y="-.249" class="secondary" rx="5" transform="rotate(60 37.422 -.25)"/><path d="M24.13 16.854a1 1 0 0 1 1.698.026l10.566 17.61c.399.664.637 1.412.698 2.184l.88 11.26a25 25 0 0 0 12.486 19.74l6.431 3.689a5 5 0 0 1 1.779 1.73l9.402 15.386A1 1 0 0 1 67.217 90H56.212a15 15 0 0 1-11.185-5.005L30.544 68.787a15 15 0 0 1-3.026-5.193L18.311 36.34a15 15 0 0 1 1.593-12.913z" class="primary"/><rect width="35" height="15.499" x="70.422" y="56" class="secondary" rx="5" transform="rotate(60 70.422 56)"/></g><defs><clipPath id="a"><path fill="#fff" d="M0 0h100v100H0z"/></clipPath></defs></svg>`,pin:D`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path fill="#fff" d="M0 0h100v100H0z"/><path fill-rule="evenodd" d="M34.825 12.39A5 5 0 0 1 39.787 8H60.94a5 5 0 0 1 4.971 4.465l5.939 55.142a5 5 0 0 1-4.971 5.535h-5.264q.036-.456.036-.923c0-2.683-.914-5.153-2.447-7.116A5 5 0 0 0 62.37 59.9l-2.89-26.696a5 5 0 0 0-4.971-4.462H46.4a5 5 0 0 0-4.963 4.386l-3.302 26.697A5 5 0 0 0 41.045 65a11.52 11.52 0 0 0-2.493 8.142h-5.551a5 5 0 0 1-4.963-5.61z" class="primary" clip-rule="evenodd"/><circle cx="49.868" cy="72" r="7" class="secondary"/><rect width="8" height="18" x="46" y="75" class="secondary" rx="3"/></svg>`,search:D`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M9.92 7.93a5.93 5.93 0 1 1 11.858 0 5.93 5.93 0 0 1-11.859 0M15.848 0a7.93 7.93 0 0 0-6.27 12.785L.293 22.07l1.414 1.414 9.286-9.286A7.93 7.93 0 1 0 15.848 0" class="primary" clip-rule="evenodd"/></svg>`,sort:D`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 76 76"><rect width="70" height="11" x="3" y="16" class="primary" rx="5"/><rect width="62" height="11" x="11" y="33" class="primary" rx="5"/><rect width="54" height="11" x="19" y="50" class="primary" rx="5"/></svg>`,trash:D`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 57 58"><path stroke-width="2" d="M6.13 18.658h44.74a4 4 0 0 1 3.918 4.804l-6.023 29.356a4 4 0 0 1-4.232 3.184L28.97 54.778a6 6 0 0 0-.94 0l-15.563 1.224a4 4 0 0 1-4.232-3.184L2.212 23.462a4 4 0 0 1 3.918-4.805" class="primary-stroke"/><rect width="4" height="30.964" class="secondary" rx="2" transform="matrix(.99209 -.12553 .2006 .97967 9.295 22.952)"/><rect width="4" height="30.964" class="secondary" rx="2" transform="matrix(.9921 .12548 -.20051 .9797 44.157 22.45)"/><rect width="4" height="28.805" x="26.872" y="22.138" class="secondary" rx="2"/><path fill-rule="evenodd" d="M37.036 0a3.68 3.68 0 0 1 3.678 3.679 3.68 3.68 0 0 0 3.679 3.678h9.664a2.943 2.943 0 0 1 0 5.886H2.943a2.943 2.943 0 0 1 0-5.886h9.664a3.68 3.68 0 0 0 3.679-3.678A3.68 3.68 0 0 1 19.964 0zM22.564 2.207a2.207 2.207 0 1 0 0 4.415h11.872a2.207 2.207 0 0 0 0-4.415z" class="primary" clip-rule="evenodd"/></svg>`,unlink:D`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100"><path stroke-width="8" d="m41.035 46-24.49 24.452a5 5 0 0 0 0 7.077l5.957 5.945a5 5 0 0 0 7.065 0L46 67.067M58.195 54l25.103-24.393a5 5 0 0 0-.01-7.183l-6.276-6.06a5 5 0 0 0-6.957.009L53 32.933" class="primary-stroke"/><rect width="8" height="18" x="65" y="74.997" class="shadow" rx="4" transform="rotate(-45 65 74.997)"/><rect width="8" height="18" x="73.498" y="63.489" class="shadow" rx="4" transform="rotate(-75 73.498 63.489)"/><rect width="8" height="18" x="49.681" y="79.357" class="shadow" rx="4" transform="rotate(-15 49.68 79.357)"/><rect width="8" height="18" x="34.445" y="21.543" class="shadow" rx="4" transform="rotate(135 34.445 21.543)"/><rect width="8" height="18" x="24.947" y="33.05" class="shadow" rx="4" transform="rotate(105 24.947 33.05)"/><rect width="8" height="18" x="49.765" y="18.182" class="shadow" rx="4" transform="rotate(165 49.765 18.182)"/></svg>`,"view-hidden":D`<svg xmlns="http://www.w3.org/2000/svg" class="icon-view-hidden" viewBox="0 0 24 24"><path d="M15.1 19.34a8 8 0 0 1-8.86-1.68L1.3 12.7a1 1 0 0 1 0-1.42L4.18 8.4l2.8 2.8a5 5 0 0 0 5.73 5.73l2.4 2.4zM8.84 4.6a8 8 0 0 1 8.7 1.74l4.96 4.95a1 1 0 0 1 0 1.42l-2.78 2.78-2.87-2.87a5 5 0 0 0-5.58-5.58L8.85 4.6z" class="primary"/><path d="m3.3 4.7 16 16a1 1 0 0 0 1.4-1.4l-16-16a1 1 0 0 0-1.4 1.4" class="secondary"/></svg>`,"view-visible":D`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17.56 17.66a8 8 0 0 1-11.32 0L1.3 12.7a1 1 0 0 1 0-1.42l4.95-4.95a8 8 0 0 1 11.32 0l4.95 4.95a1 1 0 0 1 0 1.42l-4.95 4.95zM11.9 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10" class="primary"/><circle cx="12" cy="12" r="3" class="secondary"/></svg>`,xmark:D`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 33 33"><circle cx="16.149" cy="16.149" r="16.149" class="primary"/><path stroke="#fff" stroke-width="3" d="m9.81 9.96 6.34 6.34m6.339 6.339-6.34-6.339m0 0 6.34-6.34m-6.34 6.34-6.338 6.339"/></svg>`};var zt,Ut=function(t,e,i,s){var r,o=arguments.length,a=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(a=(o<3?r(a):o>3?r(e,i,a):r(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a};let Ht=zt=class extends rt{constructor(){super(...arguments),this.name="info",this.size="24px",this.hoverable=!1,this.colorway="primary"}render(){var t;const e=null!==(t=zt.colorways[this.colorway])&&void 0!==t?t:zt.colorways.primary;return D`
      <div
        class=${ft({hoverable:this.hoverable})}
        style="
          --size: ${this.size};
          --primary: ${e.primary};
          --secondary: ${e.secondary};
          --shadow: ${e.shadow};
        "
      >
        ${Ot[this.name]}
      </div>
    `}};Ht.colorways={primary:{primary:"var(--primary-600)",secondary:"var(--primary-500, #327eff)",shadow:"var(--gray-400, #989898)"},danger:{primary:"var(--danger-600, red)",secondary:"var(--danger-500, pink)",shadow:"var(--gray-500, #888)"}},Ht.styles=o`
    :host {
      display: inline-block;
    }

    svg {
      width: var(--size);
      height: var(--size);
      display: block;
    }

    .hoverable svg * {
      transition: 200ms;
    }

    svg .primary {
      fill: var(--primary);
    }
    .hoverable:not(:hover) svg .primary {
      fill: var(--shadow);
    }

    svg .primary-stroke {
      stroke: var(--primary);
    }
    .hoverable:not(:hover) svg .primary-stroke {
      stroke: var(--shadow);
    }

    svg .secondary {
      fill: var(--secondary);
    }
    .hoverable:not(:hover) svg .secondary {
      fill: var(--shadow);
    }
    svg .secondary-stroke {
      stroke: var(--secondary);
    }
    .hoverable:not(:hover) svg .secondary-stroke {
      stroke: var(--shadow);
    }

    svg .shadow {
      fill: var(--shadow);
    }
    svg .shadow-stroke {
      stroke: var(--shadow);
    }
  `,Ut([dt()],Ht.prototype,"name",void 0),Ut([dt()],Ht.prototype,"size",void 0),Ut([dt({type:Boolean})],Ht.prototype,"hoverable",void 0),Ut([dt()],Ht.prototype,"colorway",void 0),Ht=zt=Ut([at("ui-icon")],Ht);var Lt=function(t,e,i,s){var r,o=arguments.length,a=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(a=(o<3?r(a):o>3?r(e,i,a):r(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a};let Tt=class extends rt{constructor(){super(...arguments),this.jsonSettings="",this.appName="FILL ME",this.settings={OauthProviders:[]},this.originOverride="http://localhost:3000",this.showingPassword=!1,this.errorMsg=void 0,this.loadedOnce=!1,this.signInRef=Pt(),this.emailRef=Pt(),this.passwordRef=Pt()}firstUpdated(){var t;null===(t=this.emailRef.value)||void 0===t||t.focus(),""!==this.jsonSettings&&setTimeout((()=>{this.settings=JSON.parse(this.jsonSettings),this.loadedOnce=!0}))}canSignIn(){var t,e;return(null===(t=this.emailRef.value)||void 0===t?void 0:t.value.length)>0&&(null===(e=this.passwordRef.value)||void 0===e?void 0:e.value.length)>0}async sendLoginRequest(){var t;const e=await Ct(),i={username:this.emailRef.value.value,password:this.passwordRef.value.value,fingerprint:e},s=await fetch(`${null!==(t=this.originOverride)&&void 0!==t?t:""}/api/login`,{method:"POST",body:JSON.stringify(i)});if(200!==s.status){const t=await s.json();if(t.error)throw new Error(t.error);throw new Error("Something went wrong.")}}async attemptSignIn(){var t,e,i;if(!this.canSignIn())return this.errorMsg=void 0,await this.updateComplete,this.errorMsg="Please enter your username and password.",void(0===(null===(t=this.emailRef.value)||void 0===t?void 0:t.value.length)?null===(e=this.emailRef.value)||void 0===e||e.focus():null===(i=this.passwordRef.value)||void 0===i||i.focus());this.signInRef.value.loading=!0,this.requestUpdate();try{await this.sendLoginRequest(),window.location.href="/app"}catch(t){console.error(t),this.errorMsg=void 0,await this.updateComplete,this.errorMsg=t.message}finally{this.signInRef.value.loading=!1}}render(){return D` <div id="root" class="${this.loadedOnce?"":"hide"}">
      <div id="header">
        <h1>Sign in to ${this.appName}</h1>
        ${!0!==this.settings.PublicRegistrationsDisabled?D`
              <p id="intro">
                Need an account? <a href="/register">Create account</a>
              </p>
            `:D``}
        <p
          id="error"
          aria-live="assertive"
          role="status"
          aria-atomic="true"
          aria-relevant="additions"
        >
          ${this.errorMsg?this.errorMsg:""}
        </p>
      </div>

      <div id="inputs">
        <div class="input-container">
          <label for="username">Email Address</label>
          <input
            id="username"
            ${Mt(this.emailRef)}
            autofill="username"
            autocapitalize="off"
            autocapitalize="off"
            placeholder="Your email"
          />
        </div>

        <div class="input-container">
          <label for="password"
            >Password
            <button
              aria-label="${this.showingPassword?"Hide password":"Show password"}"
              tabindex="-1"
              @click=${()=>{const t=this.passwordRef.value.type;this.passwordRef.value.type="password"===t?"text":"password",this.showingPassword="text"!==t}}
            >
              <ui-icon
                name="${this.showingPassword?"view-hidden":"view-visible"}"
                size="1rem"
              ></ui-icon>
              <p>${this.showingPassword?"Hide":"Show"}</p>
            </button>
          </label>
          <input
            id="password"
            ${Mt(this.passwordRef)}
            autofill="password"
            type="password"
            placeholder="Your password"
          />
        </div>
      </div>

      <div id="signInArea">
        <button-component
          ${Mt(this.signInRef)}
          class="big"
          .expectLoad=${!0}
          .loadingText=${"Signing in.."}
          @fl-click=${this.attemptSignIn}
          >Sign in</button-component
        >

        <a href="#">Forgot Password</a>
      </div>

      ${this.settings.OauthProviders.length>0?D`
            <div class="hr-split">
              <hr />
              <p>Or...</p>
              <hr />
            </div>
          `:void 0}
      ${this.settings.OauthProviders.map((t=>D`
      <button class="oauth">
        <img src="/api/auth/oauth/${t}/logo"></img>
          Sign in with ${t}
          <span></span></button>
      `))}
    </div>`}};Tt.styles=[ct,o`
      :host {
        display: block;
      }
      * {
        box-sizing: border-box;
        margin: 0;
        touch-action: manipulation;
      }

      #root {
        display: flex;
        gap: 2rem;
        flex-direction: column;
        opacity: 1;
      }

      #root.hide {
        opacity: 0;
      }

      #inputs .input-container:last-of-type {
        margin-top: 1rem;
      }

      #header h1 {
        font-size: 1.5rem;
        font-weight: 500;
      }

      #header p#intro {
        font-weight: 300;
        margin-top: 0.5rem;
        font-size: 0.85rem;
        color: #464646;
      }

      p#error {
        color: #b8123a;
        margin-top: 0.5rem;
      }

      a {
        color: var(--accent);
      }

      button.oauth {
        border: 1px solid var(--input-border, #bdbdbd);
        background: #fff;
        font-size: 1rem;
        padding: 0.75rem;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        color: #000;
      }

      button {
        cursor: pointer;
      }
      hr {
        border: 0;
        border-bottom: 1px solid #dcdcdc;
      }
      .hr-split {
        align-items: center;
        display: flex;
        gap: 1rem;
        width: 100%;
      }
      .hr-split hr {
        width: 100%;
        height: 0px;
      }
      .hr-split p {
        font-weight: 600;
        color: #7c7c7c;
      }
      #signInArea a {
        margin-top: 1rem;
        display: block;
        font-size: 0.85rem;
        width: fit-content;
      }

      ui-icon {
        --primary-600: var(--accent);
        --primary-500: var(--accent);
      }
    `],Lt([dt()],Tt.prototype,"jsonSettings",void 0),Lt([dt()],Tt.prototype,"appName",void 0),Lt([dt()],Tt.prototype,"settings",void 0),Lt([dt()],Tt.prototype,"originOverride",void 0),Lt([ht()],Tt.prototype,"showingPassword",void 0),Lt([ht()],Tt.prototype,"errorMsg",void 0),Lt([ht()],Tt.prototype,"loadedOnce",void 0),Tt=Lt([at("locksmith-login")],Tt);var Nt=function(t,e,i,s){var r,o=arguments.length,a=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(a=(o<3?r(a):o>3?r(e,i,a):r(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a};let jt=class extends rt{constructor(){super(...arguments),this.originOverride="",this.forceEmail="",this.inviteCode="",this.minimumPasswordLength=6,this.showingPassword=!1,this.errorMsg=void 0,this.signUpRef=Pt(),this.emailRef=Pt(),this.passwordRef=Pt(),this.passwordConfirmationRef=Pt()}firstUpdated(){var t;null===(t=this.emailRef.value)||void 0===t||t.focus()}canSignIn(){var t,e,i;return(null===(t=this.emailRef.value)||void 0===t?void 0:t.value.length)>0&&(null===(e=this.passwordRef.value)||void 0===e?void 0:e.value.length)>0&&(null===(i=this.passwordConfirmationRef.value)||void 0===i?void 0:i.value.length)>0}doPasswordsMatch(){var t,e;return(null===(t=this.passwordRef.value)||void 0===t?void 0:t.value)===(null===(e=this.passwordConfirmationRef.value)||void 0===e?void 0:e.value)}async sendRegistrationRequest(){var t;const e={username:this.emailRef.value.value,email:this.emailRef.value.value,password:this.passwordRef.value.value,code:this.inviteCode},i=await fetch(`${null!==(t=this.originOverride)&&void 0!==t?t:""}/api/register`,{method:"POST",body:JSON.stringify(e)});if(200!==i.status){if(409===i.status)throw new Error("This email is already being used.");if(400===i.status){if("password too short"===(await i.json()).error)throw new Error("Password too short")}throw new Error("Something went wrong.")}}passwordLongEnough(){var t;return(null===(t=this.passwordRef.value)||void 0===t?void 0:t.value.length)>=this.minimumPasswordLength}async attemptRegistration(){var t,e,i,s,r,o,a;if(!this.canSignIn())return this.errorMsg="Please enter a username and password.",void(0===(null===(t=this.emailRef.value)||void 0===t?void 0:t.value.length)?null===(e=this.emailRef.value)||void 0===e||e.focus():0===(null===(i=this.passwordRef.value)||void 0===i?void 0:i.value.length)?null===(s=this.passwordRef.value)||void 0===s||s.focus():null===(r=this.passwordConfirmationRef.value)||void 0===r||r.focus());if(!this.doPasswordsMatch())return this.errorMsg="The password must match.",void(null===(o=this.passwordConfirmationRef.value)||void 0===o||o.focus());if(!this.passwordLongEnough())return this.errorMsg=`Password must be at least ${this.minimumPasswordLength} characters long.`,void(null===(a=this.passwordRef.value)||void 0===a||a.focus());this.signUpRef.value.loading=!0,this.requestUpdate();try{await this.sendRegistrationRequest(),window.location.href="/login?onboard=true"}catch(t){console.error(t),this.errorMsg=t.message}finally{this.signUpRef.value.loading=!1}}render(){return D` <div id="root">
      <div id="header">
        <h1>Sign up to Attendance</h1>
        ${0===this.forceEmail.length?D`
              <p id="intro">
                Already have an account? <a href="/login">Sign in instead</a>
              </p>
            `:D``}
        <p id="error">${this.errorMsg}</p>
      </div>

      <div id="inputs">
        <div class="input-container">
          <label for="username">Email Address</label>
          <input
            id="username"
            ${Mt(this.emailRef)}
            autofill="username"
            autocapitalize="off"
            autocapitalize="off"
            placeholder="Your email"
            value="${this.forceEmail}"
            ?disabled=${this.forceEmail.length>0}
          />
        </div>

        <div class="input-container">
          <label for="password"
            >Password
            <button
              @click=${()=>{this.showingPassword=!this.showingPassword}}
            >
              <ui-icon
                name="${this.showingPassword?"view-hidden":"view-visible"}"
                size="1rem"
              ></ui-icon>
              <p>${this.showingPassword?"Hide":"Show"}</p>
            </button>
          </label>
          <p>Must be at least ${this.minimumPasswordLength} characters long.</p>
          <input
            id="password"
            ${Mt(this.passwordRef)}
            autocomplete="new-password"
            type="${this.showingPassword?"text":"password"}"
            placeholder="Your password"
          />
        </div>

        <div class="input-container">
          <label for="password">Confirm your Password</label>
          <input
            id="password"
            ${Mt(this.passwordConfirmationRef)}
            autocomplete="new-password"
            type="${this.showingPassword?"text":"password"}"
            placeholder="Confirm your Password"
          />
        </div>
      </div>

      <button-component
        ${Mt(this.signUpRef)}
        class="big"
        .expectLoad=${!0}
        .loadingText=${"Signing Up.."}
        @fl-click=${this.attemptRegistration}
        >Sign Up</button-component
      >
    </div>`}};jt.styles=[ct,o`
      :host {
        display: block;
      }
      * {
        box-sizing: border-box;
        margin: 0;
        touch-action: manipulation;
      }

      #root {
        display: flex;
        gap: 2rem;
        flex-direction: column;
      }

      #inputs {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      #header h1 {
        font-size: 1.5rem;
        font-weight: 500;
      }

      #header p#intro {
        font-weight: 300;
        margin-top: 0.5rem;
        font-size: 0.85rem;
        color: #464646;
      }

      p#error {
        color: #b8123a;
        margin-top: 0.5rem;
      }

      a {
        color: var(--accent);
      }

      button {
        cursor: pointer;
      }

      ui-icon {
        --primary-600: var(--accent);
        --primary-500: var(--accent);
      }
    `],Nt([dt()],jt.prototype,"originOverride",void 0),Nt([dt()],jt.prototype,"forceEmail",void 0),Nt([dt()],jt.prototype,"inviteCode",void 0),Nt([dt()],jt.prototype,"minimumPasswordLength",void 0),Nt([ht()],jt.prototype,"showingPassword",void 0),Nt([ht()],jt.prototype,"errorMsg",void 0),jt=Nt([at("locksmith-registration")],jt);var Bt=function(t,e,i,s){var r,o=arguments.length,a=o<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)a=Reflect.decorate(t,e,i,s);else for(var n=t.length-1;n>=0;n--)(r=t[n])&&(a=(o<3?r(a):o>3?r(e,i,a):r(e,i))||a);return o>3&&a&&Object.defineProperty(e,i,a),a};let Dt=class extends rt{render(){return D`<div id="root">
      <header>
        ${void 0!==this.logoURL&&""!==this.logoURL?D` <img src="${this.logoURL}" /> `:D``}
      </header>
      <main>
        <div id="slotWrapper">
          <slot name="main"></slot>
        </div>
      </main>
      <footer></footer>
    </div>`}};Dt.styles=[o`
      * {
        box-sizing: border-box;
        touch-action: manipulation;
        margin: 0;
      }
      #root {
        display: flex;
        flex-direction: column;
        height: 100svh;
        --horizontal-padding: 1.5rem;
      }

      header,
      footer {
        padding: 1rem 1.5rem;
      }

      footer {
        padding-bottom: 1.5rem;
      }

      header {
        --accent-height: 0.5rem;
        padding-top: calc(1.5rem + var(--accent-height));
      }
      header img {
        height: 2.5rem;
      }

      header::before {
        z-index: -1;
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: var(--accent-height);
        background-color: var(--accent, #8c7ffa);
      }

      main {
        height: 100%;
        display: flex;
        justify-content: center;
      }

      main #slotWrapper {
        border-radius: 0.35rem;
        padding: 0rem var(--horizontal-padding);
        width: 100%;
      }

      @media (min-width: 650px) {
        #root {
          justify-content: space-between;
          --horizontal-padding: 3rem;
        }
        header {
          padding-bottom: 0;
        }
        main {
          height: 100%;
          align-items: center;
        }
        main #slotWrapper {
          background-color: #fff;
          border: 1px solid #dcdcdc;
          max-width: 28rem;
          padding: 3.5rem var(--horizontal-padding);
        }
      }
    `],Bt([dt()],Dt.prototype,"logoURL",void 0),Dt=Bt([at("locksmith-layout")],Dt);export{Ct as GenerateFingerprint,Dt as LocksmithLayout,Tt as LocksmithLoginComponent,jt as LocksmithRegistrationComponent,ct as inputStyles};
//# sourceMappingURL=locksmith-ui.bundle.js.map
