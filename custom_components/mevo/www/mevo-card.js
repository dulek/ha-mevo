/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var N=globalThis,z=N.ShadowRoot&&(N.ShadyCSS===void 0||N.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,D=Symbol(),tt=new WeakMap,k=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==D)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o,e=this.t;if(z&&t===void 0){let i=e!==void 0&&e.length===1;i&&(t=tt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&tt.set(e,t))}return t}toString(){return this.cssText}},et=n=>new k(typeof n=="string"?n:n+"",void 0,D),A=(n,...t)=>{let e=n.length===1?n[0]:t.reduce(((i,s,o)=>i+(r=>{if(r._$cssResult$===!0)return r.cssText;if(typeof r=="number")return r;throw Error("Value passed to 'css' function must be a 'css' function result: "+r+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+n[o+1]),n[0]);return new k(e,n,D)},I=(n,t)=>{if(z)n.adoptedStyleSheets=t.map((e=>e instanceof CSSStyleSheet?e:e.styleSheet));else for(let e of t){let i=document.createElement("style"),s=N.litNonce;s!==void 0&&i.setAttribute("nonce",s),i.textContent=e.cssText,n.appendChild(i)}},R=z?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(let i of t.cssRules)e+=i.cssText;return et(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var{is:$t,defineProperty:vt,getOwnPropertyDescriptor:bt,getOwnPropertyNames:yt,getOwnPropertySymbols:wt,getPrototypeOf:xt}=Object,V=globalThis,it=V.trustedTypes,At=it?it.emptyScript:"",St=V.reactiveElementPolyfillSupport,C=(n,t)=>n,B={toAttribute(n,t){switch(t){case Boolean:n=n?At:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},nt=(n,t)=>!$t(n,t),st={attribute:!0,type:String,converter:B,reflect:!1,hasChanged:nt};Symbol.metadata??=Symbol("metadata"),V.litPropertyMetadata??=new WeakMap;var g=class extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??=[]).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=st){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){let i=Symbol(),s=this.getPropertyDescriptor(t,i,e);s!==void 0&&vt(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){let{get:s,set:o}=bt(this.prototype,t)??{get(){return this[e]},set(r){this[e]=r}};return{get(){return s?.call(this)},set(r){let l=s?.call(this);o.call(this,r),this.requestUpdate(t,l,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??st}static _$Ei(){if(this.hasOwnProperty(C("elementProperties")))return;let t=xt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(C("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(C("properties"))){let e=this.properties,i=[...yt(e),...wt(e)];for(let s of i)this.createProperty(s,e[s])}let t=this[Symbol.metadata];if(t!==null){let e=litPropertyMetadata.get(t);if(e!==void 0)for(let[i,s]of e)this.elementProperties.set(i,s)}this._$Eh=new Map;for(let[e,i]of this.elementProperties){let s=this._$Eu(e,i);s!==void 0&&this._$Eh.set(s,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){let e=[];if(Array.isArray(t)){let i=new Set(t.flat(1/0).reverse());for(let s of i)e.unshift(R(s))}else t!==void 0&&e.push(R(t));return e}static _$Eu(t,e){let i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$Eg=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach((t=>t(this)))}addController(t){(this._$ES??=[]).push(t),this.renderRoot!==void 0&&this.isConnected&&t.hostConnected?.()}removeController(t){this._$ES?.splice(this._$ES.indexOf(t)>>>0,1)}_$E_(){let t=new Map,e=this.constructor.elementProperties;for(let i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){let t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return I(t,this.constructor.elementStyles),t}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$ES?.forEach((t=>t.hostConnected?.()))}enableUpdating(t){}disconnectedCallback(){this._$ES?.forEach((t=>t.hostDisconnected?.()))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e){let i=this.constructor.elementProperties.get(t),s=this.constructor._$Eu(t,i);if(s!==void 0&&i.reflect===!0){let o=(i.converter?.toAttribute!==void 0?i.converter:B).toAttribute(e,i.type);this._$Em=t,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(t,e){let i=this.constructor,s=i._$Eh.get(t);if(s!==void 0&&this._$Em!==s){let o=i.getPropertyOptions(s),r=typeof o.converter=="function"?{fromAttribute:o.converter}:o.converter?.fromAttribute!==void 0?o.converter:B;this._$Em=s,this[s]=r.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,i,s=!1,o){if(t!==void 0){if(i??=this.constructor.getPropertyOptions(t),!(i.hasChanged??nt)(s?o:this[t],e))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$Eg=this._$EP())}C(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$Em!==t&&(this._$Ej??=new Set).add(t)}async _$EP(){this.isUpdatePending=!0;try{await this._$Eg}catch(e){Promise.reject(e)}let t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this._$Ep){for(let[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}let i=this.constructor.elementProperties;if(i.size>0)for(let[s,o]of i)o.wrapped!==!0||this._$AL.has(s)||this[s]===void 0||this.C(s,this[s],o)}let t=!1,e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),this._$ES?.forEach((i=>i.hostUpdate?.())),this.update(e)):this._$ET()}catch(i){throw t=!1,this._$ET(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){this._$ES?.forEach((e=>e.hostUpdated?.())),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Eg}shouldUpdate(t){return!0}update(t){this._$Ej&&=this._$Ej.forEach((e=>this._$EO(e,this[e]))),this._$ET()}updated(t){}firstUpdated(t){}};g.elementStyles=[],g.shadowRootOptions={mode:"open"},g[C("elementProperties")]=new Map,g[C("finalized")]=new Map,St?.({ReactiveElement:g}),(V.reactiveElementVersions??=[]).push("2.0.0");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var J=globalThis,O=J.trustedTypes,ot=O?O.createPolicy("lit-html",{createHTML:n=>n}):void 0,dt="$lit$",$=`lit$${(Math.random()+"").slice(9)}$`,pt="?"+$,Et=`<${pt}>`,y=document,M=()=>y.createComment(""),L=n=>n===null||typeof n!="object"&&typeof n!="function",ut=Array.isArray,kt=n=>ut(n)||typeof n?.[Symbol.iterator]=="function",F=`[ 	
\f\r]`,H=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,rt=/-->/g,at=/>/g,v=RegExp(`>|${F}(?:([^\\s"'>=/]+)(${F}*=${F}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),lt=/'/g,ct=/"/g,mt=/^(?:script|style|textarea|title)$/i,ft=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),u=ft(1),Ft=ft(2),w=Symbol.for("lit-noChange"),h=Symbol.for("lit-nothing"),ht=new WeakMap,b=y.createTreeWalker(y,129);function _t(n,t){if(!Array.isArray(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return ot!==void 0?ot.createHTML(t):t}var Ct=(n,t)=>{let e=n.length-1,i=[],s,o=t===2?"<svg>":"",r=H;for(let l=0;l<e;l++){let a=n[l],d,p,c=-1,m=0;for(;m<a.length&&(r.lastIndex=m,p=r.exec(a),p!==null);)m=r.lastIndex,r===H?p[1]==="!--"?r=rt:p[1]!==void 0?r=at:p[2]!==void 0?(mt.test(p[2])&&(s=RegExp("</"+p[2],"g")),r=v):p[3]!==void 0&&(r=v):r===v?p[0]===">"?(r=s??H,c=-1):p[1]===void 0?c=-2:(c=r.lastIndex-p[2].length,d=p[1],r=p[3]===void 0?v:p[3]==='"'?ct:lt):r===ct||r===lt?r=v:r===rt||r===at?r=H:(r=v,s=void 0);let _=r===v&&n[l+1].startsWith("/>")?" ":"";o+=r===H?a+Et:c>=0?(i.push(d),a.slice(0,c)+dt+a.slice(c)+$+_):a+$+(c===-2?l:_)}return[_t(n,o+(n[e]||"<?>")+(t===2?"</svg>":"")),i]},P=class n{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let o=0,r=0,l=t.length-1,a=this.parts,[d,p]=Ct(t,e);if(this.el=n.createElement(d,i),b.currentNode=this.el.content,e===2){let c=this.el.content.firstChild;c.replaceWith(...c.childNodes)}for(;(s=b.nextNode())!==null&&a.length<l;){if(s.nodeType===1){if(s.hasAttributes())for(let c of s.getAttributeNames())if(c.endsWith(dt)){let m=p[r++],_=s.getAttribute(c).split($),x=/([.?@])?(.*)/.exec(m);a.push({type:1,index:o,name:x[2],strings:_,ctor:x[1]==="."?W:x[1]==="?"?Z:x[1]==="@"?q:E}),s.removeAttribute(c)}else c.startsWith($)&&(a.push({type:6,index:o}),s.removeAttribute(c));if(mt.test(s.tagName)){let c=s.textContent.split($),m=c.length-1;if(m>0){s.textContent=O?O.emptyScript:"";for(let _=0;_<m;_++)s.append(c[_],M()),b.nextNode(),a.push({type:2,index:++o});s.append(c[m],M())}}}else if(s.nodeType===8)if(s.data===pt)a.push({type:2,index:o});else{let c=-1;for(;(c=s.data.indexOf($,c+1))!==-1;)a.push({type:7,index:o}),c+=$.length-1}o++}}static createElement(t,e){let i=y.createElement("template");return i.innerHTML=t,i}};function S(n,t,e=n,i){if(t===w)return t;let s=i!==void 0?e._$Co?.[i]:e._$Cl,o=L(t)?void 0:t._$litDirective$;return s?.constructor!==o&&(s?._$AO?.(!1),o===void 0?s=void 0:(s=new o(n),s._$AT(n,e,i)),i!==void 0?(e._$Co??=[])[i]=s:e._$Cl=s),s!==void 0&&(t=S(n,s._$AS(n,t.values),s,i)),t}var j=class{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){let{el:{content:e},parts:i}=this._$AD,s=(t?.creationScope??y).importNode(e,!0);b.currentNode=s;let o=b.nextNode(),r=0,l=0,a=i[0];for(;a!==void 0;){if(r===a.index){let d;a.type===2?d=new T(o,o.nextSibling,this,t):a.type===1?d=new a.ctor(o,a.name,a.strings,this,t):a.type===6&&(d=new K(o,this,t)),this._$AV.push(d),a=i[++l]}r!==a?.index&&(o=b.nextNode(),r++)}return b.currentNode=y,s}p(t){let e=0;for(let i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}},T=class n{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(t,e,i,s){this.type=2,this._$AH=h,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cv=s?.isConnected??!0}get parentNode(){let t=this._$AA.parentNode,e=this._$AM;return e!==void 0&&t?.nodeType===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=S(this,t,e),L(t)?t===h||t==null||t===""?(this._$AH!==h&&this._$AR(),this._$AH=h):t!==this._$AH&&t!==w&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):kt(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==h&&L(this._$AH)?this._$AA.nextSibling.data=t:this.$(y.createTextNode(t)),this._$AH=t}g(t){let{values:e,_$litType$:i}=t,s=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=P.createElement(_t(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===s)this._$AH.p(e);else{let o=new j(s,this),r=o.u(this.options);o.p(e),this.$(r),this._$AH=o}}_$AC(t){let e=ht.get(t.strings);return e===void 0&&ht.set(t.strings,e=new P(t)),e}T(t){ut(this._$AH)||(this._$AH=[],this._$AR());let e=this._$AH,i,s=0;for(let o of t)s===e.length?e.push(i=new n(this.k(M()),this.k(M()),this,this.options)):i=e[s],i._$AI(o),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){for(this._$AP?.(!1,!0,e);t&&t!==this._$AB;){let i=t.nextSibling;t.remove(),t=i}}setConnected(t){this._$AM===void 0&&(this._$Cv=t,this._$AP?.(t))}},E=class{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,s,o){this.type=1,this._$AH=h,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=h}_$AI(t,e=this,i,s){let o=this.strings,r=!1;if(o===void 0)t=S(this,t,e,0),r=!L(t)||t!==this._$AH&&t!==w,r&&(this._$AH=t);else{let l=t,a,d;for(t=o[0],a=0;a<o.length-1;a++)d=S(this,l[i+a],e,a),d===w&&(d=this._$AH[a]),r||=!L(d)||d!==this._$AH[a],d===h?t=h:t!==h&&(t+=(d??"")+o[a+1]),this._$AH[a]=d}r&&!s&&this.O(t)}O(t){t===h?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}},W=class extends E{constructor(){super(...arguments),this.type=3}O(t){this.element[this.name]=t===h?void 0:t}},Z=class extends E{constructor(){super(...arguments),this.type=4}O(t){this.element.toggleAttribute(this.name,!!t&&t!==h)}},q=class extends E{constructor(t,e,i,s,o){super(t,e,i,s,o),this.type=5}_$AI(t,e=this){if((t=S(this,t,e,0)??h)===w)return;let i=this._$AH,s=t===h&&i!==h||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==h&&(i===h||s);s&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){typeof this._$AH=="function"?this._$AH.call(this.options?.host??this.element,t):this._$AH.handleEvent(t)}},K=class{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){S(this,t)}};var Ht=J.litHtmlPolyfillSupport;Ht?.(P,T),(J.litHtmlVersions??=[]).push("3.1.0");var gt=(n,t,e)=>{let i=e?.renderBefore??t,s=i._$litPart$;if(s===void 0){let o=e?.renderBefore??null;i._$litPart$=s=new T(t.insertBefore(M(),o),o,void 0,e??{})}return s._$AI(n),s};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var f=class extends g{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){let t=super.createRenderRoot();return this.renderOptions.renderBefore??=t.firstChild,t}update(t){let e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=gt(e,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return w}};f._$litElement$=!0,f.finalized=!0,globalThis.litElementHydrateSupport?.({LitElement:f});var Mt=globalThis.litElementPolyfillSupport;Mt?.({LitElement:f});(globalThis.litElementVersions??=[]).push("4.0.0");/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */var Lt="0.9.3";console.info(`%c MEVO-CARD %c v${Lt} `,"color: white; background: #00b8d4; font-weight: 700;","color: #00b8d4; background: white; font-weight: 700;");var U=null;function Pt(){return customElements.get("ha-map")?Promise.resolve():U||(U=(async()=>{await(await window.loadCardHelpers()).createCardElement({type:"map",entities:[]}),await customElements.whenDefined("ha-map")})().catch(n=>{throw U=null,n}),U)}var G=class n extends f{static properties={hass:{attribute:!1},_config:{state:!0}};static styles=A`
        .chip-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-evenly;
            gap: 30px;
            padding: 16px;
        }
        .mevo-badge-title {
            font-size: 1.1em;
            font-weight: 500;
            margin-bottom: 4px;
            text-align: center;
        }
        .mevo-badge-icons {
            display: flex;
            gap: 20px;
            align-items: center;
        }
        .mevo-badge-icon {
            align-items: center;
            gap: 5px;
            font-size: 1.1em;
            display: flex;
            line-height: 100%;
        }
        .mevo-badge-unavail {
            color: var(--error-color, #b71c1c);
        }
        .mevo-badge-low {
            color: var(--warning-color, #ff9800);
        }
        .mevo-badge-link {
            color: inherit;
            text-decoration: none;
            cursor: pointer;
        }
        ha-map {
            display: block;
            height: var(--mevo-map-height, 350px);
            border-radius: 0 0 var(--ha-card-border-radius, 12px)
                var(--ha-card-border-radius, 12px);
            overflow: hidden;
        }
    `;setConfig(t){if(!t.stations||!Array.isArray(t.stations)||t.stations.length===0)throw new Error("Please define a list of stations!");let e=t.extra??[];typeof e=="string"&&(e=[e]);let i=t.view==="map"?"map":"list";this._config={...t,view:i,extra:e,stations:t.stations.map(s=>typeof s=="string"?{entity:s}:s)},this._markerToken+=1,this._fitDone=!1,this._lastMapSignature=null}disconnectedCallback(){super.disconnectedCallback(),this._markerToken+=1,this._lastMapSignature=null,this._fitDone=!1}static getStubConfig(){return{stations:[{entity:"sensor.station_gda001"},{entity:"sensor.station_gda002"}],title:"Mevo Stations"}}getCardSize(){return this._config?this._config.view==="map"?5:1+Math.ceil(this._config.stations.length/4):1}getLayoutOptions(){return this._config?.view==="map"?{grid_columns:4,grid_rows:5,grid_min_columns:2,grid_min_rows:3}:{grid_columns:4,grid_rows:"auto",grid_min_columns:2,grid_min_rows:1}}static getConfigElement(){return document.createElement("mevo-card-editor")}shouldUpdate(t){if(t.has("_config"))return!0;if(!t.has("hass"))return!1;let e=t.get("hass");return!e||!this._config||this._config.view==="map"?!0:this._config.stations.some(i=>e.states[i.entity]!==this.hass.states[i.entity])}updated(t){super.updated(t),this._config?.view==="map"&&this._refreshMarkers()}render(){if(!this._config||!this.hass)return h;let t=this._config.view==="map"?this._renderMap():u`
                <div class="chip-container">
                    ${this._config.stations.map(e=>this._renderStation(e))}
                </div>
            `;return u`
            <ha-card .header=${this._config.title||h}>
                ${t}
            </ha-card>
        `}_renderMap(){return u`
            <ha-map
                .hass=${this.hass}
                .entities=${[]}
                .zoom=${this._config.zoom??13}
                @editable-location-clicked=${this._locationClicked}
            ></ha-map>
        `}async _refreshMarkers(){if(await Pt(),!this.hass||!this._config)return;let t=this.renderRoot.querySelector("ha-map");if(!t)return;let e=[],i=[];for(let l of this._config.stations){let a=this.hass.states[l.entity];if(!a)continue;let d=a.attributes.latitude,p=a.attributes.longitude;if(!Number.isFinite(d)||!Number.isFinite(p))continue;let c=l.name||a.attributes.friendly_name||l.entity,m=a.attributes.bikes_available??"?",_=a.attributes.ebikes_available??"?",x=a.attributes.rental_uri;e.push({entity:l.entity,lat:d,lng:p,name:c,bikes:m,ebikes:_,rentalUri:x}),i.push([d,p])}let s=this._homeLocation();s&&i.push([s.lat,s.lng]);let o=JSON.stringify({stations:e,home:s});if(this._lastMapSignature===o&&this._lastHaMap===t)return;let r=++this._markerToken;if("editableLocations"in t)t.editableLocations=this._buildEditableLocations(e,s);else{let l=await this._waitForLeaflet(t,r);if(!l||r!==this._markerToken)return;t.layers=this._buildLeafletLayers(l,e,s)}this._lastMapSignature=o,this._lastHaMap=t,!this._fitDone&&i.length>0&&(await t.updateComplete,r===this._markerToken&&this._fitBounds(t,i))}_homeLocation(){let t=this._config.home;if(!t)return null;let e=this.hass.states[t];if(!e)return null;let i=e.attributes.latitude,s=e.attributes.longitude;if(!Number.isFinite(i)||!Number.isFinite(s))return null;let o=e.attributes.friendly_name||t;return{entity:t,lat:i,lng:s,name:o}}_buildEditableLocations(t,e){let i=t.map(s=>{let o=document.createElement("mevo-map-marker");return o.setAttribute("map-engine",""),o.name=s.name,o.bikes=s.bikes,o.ebikes=s.ebikes,{id:s.entity,location:[s.lat,s.lng],element:o,elementSize:[180,56],title:s.name,activatable:!!s.rentalUri}});if(e){let s=document.createElement("mevo-home-marker");s.setAttribute("map-engine",""),i.push({id:e.entity,location:[e.lat,e.lng],element:s,elementSize:[34,34],title:e.name})}return i}async _waitForLeaflet(t,e){for(let i=0;i<300;i+=1){if(t.leafletMap&&t.Leaflet)return t.Leaflet;if(e!==this._markerToken||!t.isConnected)return null;await new Promise(s=>setTimeout(s,100))}return null}_buildLeafletLayers(t,e,i){let s=e.map(o=>{let r=document.createElement("mevo-map-marker");r.name=o.name,r.bikes=o.bikes,r.ebikes=o.ebikes;let l=t.divIcon({html:r,className:"mevo-map-marker-wrapper",iconSize:null}),a=t.marker([o.lat,o.lng],{icon:l,title:o.name});return o.rentalUri&&a.on("click",()=>{window.open(o.rentalUri,"_blank","noopener")}),a});if(i){let o=t.divIcon({html:document.createElement("mevo-home-marker"),className:"mevo-home-marker-wrapper",iconSize:null});s.push(t.marker([i.lat,i.lng],{icon:o,title:i.name}))}return s}_locationClicked(t){let e=this._config.stations.find(s=>s.entity===t.detail.id),i=this.hass.states[e?.entity]?.attributes.rental_uri;i&&window.open(i,"_blank","noopener")}_fitBounds(t,e){if(this._config.zoom!=null){let i=e.map(([r])=>r),s=e.map(([,r])=>r),o=[(Math.min(...i)+Math.max(...i))/2,(Math.min(...s)+Math.max(...s))/2];t.setView?t.setView(o,this._config.zoom):t.leafletMap.setView(o,this._config.zoom)}else t.fitBounds(e,{zoom:16,pad:.15});this._fitDone=!0}constructor(){super(),this._markerToken=0}_renderStation(t){let e=this.hass.states[t.entity],i=t.name||t.entity;if(!e)return u`
                <div class="mevo-badge">
                    <div class="mevo-badge-title">${i}</div>
                    <div class="mevo-badge-unavail">Unavailable</div>
                </div>
            `;let s=t.name||e.attributes.friendly_name||t.entity,o=e.attributes.bikes_available??"?",r=e.attributes.ebikes_available??"?",l=e.attributes.rental_uri,a=u`
            <div class="mevo-badge-title">${s}</div>
            <div class="mevo-badge-icons">
                <span class="mevo-badge-icon ${n._tierClass(o)}">
                    <ha-state-icon icon="mdi:bicycle"></ha-state-icon>
                    ${o}
                </span>
                <span class="mevo-badge-icon ${n._tierClass(r)}">
                    <ha-state-icon icon="mdi:bicycle-electric"></ha-state-icon>
                    ${r}
                </span>
                ${this._renderExtra(e)}
            </div>
        `;return l?u`
                <a class="mevo-badge mevo-badge-link" href=${l}>
                    ${a}
                </a>
            `:u`<div class="mevo-badge">${a}</div>`}static _tierClass(t){return t===0?"mevo-badge-unavail":typeof t=="number"&&t<=2?"mevo-badge-low":""}_renderExtra(t){return(this._config.extra||[]).map(i=>i==="docks"?u`
                    <span class="mevo-badge-icon">
                        <ha-state-icon icon="mdi:parking"></ha-state-icon>
                        ${t.attributes.docks_available??"?"}
                    </span>
                `:i==="capacity"?u`
                    <span class="mevo-badge-icon">
                        <ha-state-icon icon="mdi:counter"></ha-state-icon>
                        ${t.attributes.capacity??"?"}
                    </span>
                `:h)}},Q=class n extends f{static properties={name:{},bikes:{},ebikes:{}};static styles=A`
        :host {
            display: inline-flex;
            flex-direction: column;
            align-items: center;
            gap: 2px;
            background: var(--card-background-color, white);
            color: var(--primary-text-color, #212121);
            border: 1px solid var(--divider-color, rgba(0, 0, 0, 0.12));
            border-radius: 12px;
            padding: 4px 10px;
            font-size: 13px;
            line-height: 1.2;
            white-space: nowrap;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
            transform: translate(-50%, -100%);
            margin-top: -4px;
        }
        :host([map-engine]) {
            box-sizing: border-box;
            width: 180px;
            height: 56px;
            justify-content: center;
            transform: none;
            margin-top: 0;
        }
        .name {
            font-weight: 600;
            max-width: 180px;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .counts {
            display: inline-flex;
            gap: 10px;
            font-weight: 500;
        }
        .count {
            display: inline-flex;
            align-items: center;
            gap: 3px;
        }
        .unavail {
            color: var(--error-color, #b71c1c);
        }
        .low {
            color: var(--warning-color, #ff9800);
        }
        ha-icon {
            --mdc-icon-size: 16px;
        }
    `;render(){return u`
            ${this.name?u`<div class="name">${this.name}</div>`:h}
            <div class="counts">
                <span class="count ${n._tier(this.bikes)}">
                    <ha-icon icon="mdi:bicycle"></ha-icon>${this.bikes}
                </span>
                <span class="count ${n._tier(this.ebikes)}">
                    <ha-icon icon="mdi:bicycle-electric"></ha-icon>${this.ebikes}
                </span>
            </div>
        `}static _tier(t){let e=Number(t);return e===0?"unavail":Number.isFinite(e)&&e<=2?"low":""}},X=class extends f{static styles=A`
        :host {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: var(--primary-color, #03a9f4);
            color: var(--text-primary-color, white);
            border: 2px solid var(--card-background-color, white);
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
            transform: translate(-50%, -50%);
        }
        :host([map-engine]) {
            box-sizing: border-box;
            transform: none;
        }
        ha-icon {
            --mdc-icon-size: 18px;
        }
    `;render(){return u`<ha-icon icon="mdi:home"></ha-icon>`}},Tt=(n,t)=>{let e=[{name:"title",selector:{text:{}}},{name:"view",selector:{select:{mode:"dropdown",options:[{value:"list",label:"List"},{value:"map",label:"Map"}]}}}];return n==="map"?(e.push({name:"home",selector:{entity:{filter:{domain:["zone","person","device_tracker"]}}}}),e.push({name:"fit",selector:{select:{mode:"dropdown",options:[{value:"auto",label:"Auto-fit to stations"},{value:"fixed",label:"Fixed zoom"}]}}}),t==="fixed"&&e.push({name:"zoom",selector:{number:{min:1,max:25,step:1,mode:"slider"}}})):e.push({name:"extra",selector:{select:{multiple:!0,options:[{value:"docks",label:"Docks available"},{value:"capacity",label:"Capacity"}]}}}),e},Ut=[{name:"name",selector:{text:{}}}];var Nt="M7,19V17H9V19H7M11,19V17H13V19H11M15,19V17H17V19H15M7,15V13H9V15H7M11,15V13H13V15H11M15,15V13H17V15H15M7,11V9H9V11H7M11,11V9H13V11H11M15,11V9H17V11H15M7,7V5H9V7H7M11,7V5H13V7H11M15,7V5H17V7H15Z",zt="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z",Rt="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z",Vt="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z",Y=class n extends f{static properties={hass:{attribute:!1},_config:{state:!0},_editIndex:{state:!0},_pickerReady:{state:!0}};static styles=A`
        .stations-header {
            display: block;
            font-weight: 500;
            margin: 16px 0 8px;
        }
        .row {
            display: flex;
            align-items: center;
            padding: 4px 0;
        }
        .row + .row {
            border-top: 1px solid var(--divider-color);
        }
        .handle {
            cursor: move;
            padding-right: 8px;
            color: var(--secondary-text-color);
        }
        .info {
            flex: 1;
            min-width: 0;
            margin: 0 8px;
            overflow: hidden;
        }
        .info .primary {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .info .secondary {
            font-size: 0.85em;
            color: var(--secondary-text-color);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        .add {
            margin-top: 8px;
        }
        .sub-header {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
        }
        .sub-header .title {
            font-weight: 500;
            margin-left: 4px;
        }
    `;setConfig(t){this._config=t}connectedCallback(){super.connectedCallback(),this._loadPicker()}async _loadPicker(){if(customElements.get("ha-entity-picker")){this._pickerReady=!0;return}if(window.loadCardHelpers){let e=await(await window.loadCardHelpers()).createCardElement({type:"entities",entities:[]});try{await e.constructor.getConfigElement?.()}catch{}}this._pickerReady=customElements.get("ha-entity-picker")!==void 0}render(){return!this.hass||!this._config?h:this._editIndex!==void 0?this._renderSubEditor():this._renderMain()}_renderMain(){let t=this._stations(),e=this._config.view||"list",i=this._config.zoom!=null?"fixed":"auto";return u`
            <ha-form
                .hass=${this.hass}
                .data=${{title:this._config.title||"",view:e,home:this._config.home||"",fit:i,extra:this._asExtraArray(),zoom:this._config.zoom??16}}
                .schema=${Tt(e,i)}
                .computeLabel=${n._computeLabel}
                @value-changed=${this._baseChanged}
            ></ha-form>
            <span class="stations-header">Stations</span>
            <ha-sortable
                handle-selector=".handle"
                @item-moved=${this._stationMoved}
            >
                <div>
                    ${t.map((s,o)=>this._renderRow(s,o))}
                </div>
            </ha-sortable>
            ${this._pickerReady?u`
                <ha-entity-picker
                    class="add"
                    .hass=${this.hass}
                    .label=${"Add station"}
                    .value=${""}
                    .entityFilter=${this._addFilter()}
                    @value-changed=${this._addStation}
                ></ha-entity-picker>
            `:h}
        `}_renderRow(t,e){let i=this.hass.states[t.entity],s=t.name||i?.attributes?.friendly_name||t.entity,o=t.name?`${i?.attributes?.friendly_name||t.entity}`:t.entity;return u`
            <div class="row">
                <ha-svg-icon class="handle" .path=${Nt}></ha-svg-icon>
                <div class="info">
                    <div class="primary">${s}</div>
                    <div class="secondary">${o}</div>
                </div>
                <ha-icon-button
                    .label=${"Edit"}
                    .path=${zt}
                    @click=${()=>this._editStation(e)}
                ></ha-icon-button>
                <ha-icon-button
                    .label=${"Remove"}
                    .path=${Rt}
                    @click=${()=>this._removeStation(e)}
                ></ha-icon-button>
            </div>
        `}_renderSubEditor(){let e=this._stations()[this._editIndex];if(!e)return this._editIndex=void 0,h;let s=this.hass.states[e.entity]?.attributes?.friendly_name||e.entity;return u`
            <div class="sub-header">
                <ha-icon-button
                    .label=${"Back"}
                    .path=${Vt}
                    @click=${this._exitSubEditor}
                ></ha-icon-button>
                <span class="title">${s}</span>
            </div>
            <ha-form
                .hass=${this.hass}
                .data=${{name:e.name||""}}
                .schema=${Ut}
                .computeLabel=${()=>"Custom name"}
                @value-changed=${this._stationDetailChanged}
            ></ha-form>
        `}_stations(){return(this._config.stations||[]).map(t=>typeof t=="string"?{entity:t}:t)}_asExtraArray(){let t=this._config.extra??[];return typeof t=="string"&&(t=[t]),t}_addFilter(){let t=new Set(this._stations().map(e=>e.entity));return e=>t.has(e.entity_id)?!1:this.hass.entities?.[e.entity_id]?.platform==="mevo"}static _computeLabel(t){switch(t.name){case"title":return"Title";case"view":return"View";case"home":return"Home location";case"fit":return"Map fit";case"zoom":return"Zoom";case"extra":return"Extra indicators";default:return t.name}}_baseChanged(t){let e=t.detail.value,i={...this._config};e.title?i.title=e.title:delete i.title,e.view&&e.view!=="list"?i.view=e.view:delete i.view,i.view==="map"&&e.home?i.home=e.home:delete i.home,i.view==="map"&&e.fit==="fixed"&&Number.isFinite(e.zoom)?i.zoom=e.zoom:delete i.zoom,i.view!=="map"&&e.extra&&e.extra.length>0?i.extra=e.extra:delete i.extra,this._fireChange(i)}_stationMoved(t){let{oldIndex:e,newIndex:i}=t.detail,s=this._stations(),[o]=s.splice(e,1);s.splice(i,0,o),this._fireChange({...this._config,stations:s})}_addStation(t){t.stopPropagation();let e=t.detail.value;if(!e)return;let i=[...this._stations(),{entity:e}];t.target.value="",this._fireChange({...this._config,stations:i})}_removeStation(t){let e=this._stations();e.splice(t,1),this._fireChange({...this._config,stations:e})}_editStation(t){this._editIndex=t}_exitSubEditor(){this._editIndex=void 0}_stationDetailChanged(t){let e=t.detail.value,i=this._stations(),s={...i[this._editIndex]};e.name?s.name=e.name:delete s.name,i[this._editIndex]=s,this._fireChange({...this._config,stations:i})}_fireChange(t){this._config=t,this.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}};for(let[n,t]of[["mevo-card",G],["mevo-card-editor",Y],["mevo-map-marker",Q],["mevo-home-marker",X]])customElements.get(n)||customElements.define(n,t);window.customCards=window.customCards||[];window.customCards.some(n=>n.type==="mevo-card")||window.customCards.push({type:"mevo-card",name:"Mevo Card",description:"Card working with Mevo Tricity bikes integration"});
