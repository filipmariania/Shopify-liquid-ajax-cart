const t="liquid-ajax-cart",e="data-ajax-cart",n="ajax-cart",o="js-ajax-cart",i=`${t}:init`,r="add",a="change",s="update",u="clear",c="get",l=`${t}:queue-start`,d=`${t}:queue-start-internal`,h=`${t}:queue-empty-internal`,f=`${t}:queue-end-internal`,p=`${t}:queue-end`,m=`${t}:request-start-internal`,y=`${t}:request-start`,v=`${t}:request-end-internal`,b=`${t}:request-end`,q=[];let g=!1;function $(t){var e;(null===(e=t.options)||void 0===e?void 0:e.important)&&0!==q.length?q[0].push(t):1===q.push([t])&&(A(!0),w())}function w(){if(0===q.length){const t=new CustomEvent(h);document.dispatchEvent(t)}if(0===q.length)return void A(!1);if(0===q[0].length)return q.shift(),void w();const{requestType:t,body:e,options:n}=q[0][0];!function(t,e,n,o){const i=k(t);let a;t!==c&&(a=e||{});const s=t===c?"GET":"POST",u=n.info||{},l={requestType:t,endpoint:i,requestBody:a,info:u},d=[],h=new CustomEvent(m,{detail:{requestState:{requestType:t,endpoint:i,info:u,requestBody:a}}});document.dispatchEvent(h);const f=new CustomEvent(y,{detail:{requestState:{requestType:t,endpoint:i,info:u,requestBody:a}}});if(document.dispatchEvent(f),u.cancel)return l.responseData=null,void E(n,o,l);if(void 0!==a){let e;if(a instanceof FormData||a instanceof URLSearchParams?a.has("sections")&&(e=a.get("sections").toString()):e=a.sections,"string"==typeof e||e instanceof String||Array.isArray(e)){const n=[];if(Array.isArray(e)?n.push(...e):n.push(...e.split(",")),r===t&&d.push(...n.slice(0,5)),n.length>5){d.push(...n.slice(5));const t=n.slice(0,5).join(",");a instanceof FormData||a instanceof URLSearchParams?a.set("sections",t):a.sections=t}}else null!=e&&console.error(`Liquid Ajax Cart: "sections" parameter in a Cart Ajax API request must be a string or an array. Now it is ${e}`)}const p={method:s};t!==c&&(a instanceof FormData||a instanceof URLSearchParams?(p.body=a,p.headers={"x-requested-with":"XMLHttpRequest"}):(p.body=JSON.stringify(a),p.headers={"Content-Type":"application/json"})),fetch(i,p).then((t=>t.json().then((e=>({ok:t.ok,status:t.status,body:e}))))).then((t=>(l.responseData=t,!l.responseData.ok||l.responseData.body.token&&0===d.length?l:L(d).then((t=>(l.extraResponseData=t,l)))))).catch((t=>{console.error("Liquid Ajax Cart: Error while performing cart Ajax request"),console.error(t),l.responseData=null,l.fetchError=t})).finally((()=>{E(n,o,l)}))}(t,e,n,(()=>{q[0].shift(),w()}))}function A(t){g=t;const e=new CustomEvent(g?d:f);document.dispatchEvent(e);const n=new CustomEvent(g?l:p);document.dispatchEvent(n)}function E(t,e,n){if("firstCallback"in t)try{t.firstCallback(n)}catch(t){console.error('Liquid Ajax Cart: Error in request "firstCallback" function'),console.error(t)}const o={requestState:n},i=new CustomEvent(v,{detail:o});document.dispatchEvent(i);const r=new CustomEvent(b,{detail:o});if(document.dispatchEvent(r),"lastCallback"in t)try{t.lastCallback(n)}catch(t){console.error('Liquid Ajax Cart: Error in request "lastCallback" function'),console.error(t)}e()}function L(t=[]){const e={};return t.length>0&&(e.sections=t.slice(0,5).join(",")),fetch(k(s),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}).then((e=>e.json().then((n=>{const o={ok:e.ok,status:e.status,body:n};return t.length<6?o:L(t.slice(5)).then((t=>{var e;return t.ok&&(null===(e=t.body)||void 0===e?void 0:e.sections)&&"object"==typeof t.body.sections&&("sections"in o.body||(o.body.sections={}),o.body.sections=Object.assign(Object.assign({},o.body.sections),t.body.sections)),o}))}))))}function S(t={}){$({requestType:c,body:void 0,options:t})}function j(t={},e={}){$({requestType:r,body:t,options:e})}function C(t={},e={}){$({requestType:a,body:t,options:e})}function x(t={},e={}){$({requestType:s,body:t,options:e})}function T(t={},e={}){$({requestType:u,body:t,options:e})}function k(t){var e,n,o,i,l,d,h,f,p,m;switch(t){case r:return`${(null===(n=null===(e=window.Shopify)||void 0===e?void 0:e.routes)||void 0===n?void 0:n.root)||"/"}cart/add.js`;case a:return`${(null===(i=null===(o=window.Shopify)||void 0===o?void 0:o.routes)||void 0===i?void 0:i.root)||"/"}cart/change.js`;case c:return`${(null===(d=null===(l=window.Shopify)||void 0===l?void 0:l.routes)||void 0===d?void 0:d.root)||"/"}cart.js`;case u:return`${(null===(f=null===(h=window.Shopify)||void 0===h?void 0:h.routes)||void 0===f?void 0:f.root)||"/"}cart/clear.js`;case s:return`${(null===(m=null===(p=window.Shopify)||void 0===p?void 0:p.routes)||void 0===m?void 0:m.root)||"/"}cart/update.js`;default:return}}function D(){return g}const _=`${e}-initial-state`;let N,O=null;function B(){return{cart:O,previousCart:N}}const M=`${e}-bind`;function R(){B().cart&&document.querySelectorAll(`[${M}]`).forEach((t=>{const e=t.getAttribute(M);t.textContent=function(t){const{binderFormatters:e}=U,[n,...o]=t.split("|");let i=F(n,B().cart);return o.forEach((t=>{const n=t.trim();""!==n&&("object"==typeof e&&n in e?i=e[n](i):n in H?i=H[n](i):console.warn(`Liquid Ajax Cart: the "${n}" formatter is not found`))})),"string"==typeof i||i instanceof String||"number"==typeof i||i instanceof Number?i.toString():(console.error(`Liquid Ajax Cart: the calculated value for the ${M}="${t}" element must be string or number. But the value is`,i),"")}(e)}))}function F(t,e){const n=t.split("."),o=n.shift().trim();return""!==o&&o in e&&n.length>0?F(n.join("."),e[o]):e[o]}const H={money_with_currency:t=>{var e;const n=B();if("number"!=typeof t&&!(t instanceof Number))return console.error("Liquid Ajax Cart: the 'money_with_currency' formatter is not applied because the value is not a number. The value is ",t),t;const o=t/100;return"Intl"in window&&(null===(e=window.Shopify)||void 0===e?void 0:e.locale)?Intl.NumberFormat(window.Shopify.locale,{style:"currency",currency:n.cart.currency}).format(o):`${o.toFixed(2)} ${n.cart.currency}`}},U={binderFormatters:{},requestErrorText:"There was an error while updating your cart. Please try again.",updateOnWindowFocus:!0,quantityTagAllowZero:!1,quantityTagDebounce:300,mutations:[]},P=`${e}-section`,I=`${e}-static-element`,J=`${e}-section-scroll`,V="shopify-section-",Z=`${n}-product-form`,W="processing";class z extends HTMLElement{connectedCallback(){var t,e;const n=this,o=this.querySelectorAll("form");if(1!==o.length)return void console.error(`Liquid Ajax Cart: "${Z}" element must have one "form" element as a child, ${o.length} found`,n);const i=o[0];new URL(i.action).pathname===`${(null===(e=null===(t=window.Shopify)||void 0===t?void 0:t.routes)||void 0===e?void 0:e.root)||"/"}cart/add`?i.addEventListener("submit",(t=>{if(!n.hasAttribute(W)){const t=new FormData(i);n.setAttribute(W,""),j(t,{lastCallback:()=>{n.removeAttribute(W)},info:{initiator:n}})}t.preventDefault()})):console.error(`Liquid Ajax Cart: "${Z}" element's form "action" attribute value isn't a product form action URL`,i,n)}}var G,K,X,Q,Y,tt,et,nt;const ot=`${(null===(K=null===(G=window.Shopify)||void 0===G?void 0:G.routes)||void 0===K?void 0:K.root)||"/"}cart/change`,it=`${(null===(Q=null===(X=window.Shopify)||void 0===X?void 0:X.routes)||void 0===Q?void 0:Q.root)||"/"}cart/add`,rt=`${(null===(tt=null===(Y=window.Shopify)||void 0===Y?void 0:Y.routes)||void 0===tt?void 0:tt.root)||"/"}cart/clear`,at=`${(null===(nt=null===(et=window.Shopify)||void 0===et?void 0:et.routes)||void 0===nt?void 0:nt.root)||"/"}cart/update`,st=`${e}-request-button`;function ut(t,e){let n;const o=[ot,it,rt,at];if(!t.hasAttribute(st))return;const i=t.getAttribute(st);if(i){let t;try{if(t=new URL(i,window.location.origin),!o.includes(t.pathname))throw`URL should be one of the following: ${ot}, ${it}, ${at}, ${rt}`;n=t}catch(t){console.error(`Liquid Ajax Cart: ${st} contains an invalid URL as a parameter.`,t)}}else if(t instanceof HTMLAnchorElement&&t.hasAttribute("href")){const e=new URL(t.href);o.includes(e.pathname)?n=e:t.hasAttribute(st)&&console.error(`Liquid Ajax Cart: a link with the ${st} contains an invalid href URL.`,`URL should be one of the following: ${ot}, ${it}, ${at}, ${rt}`)}if(void 0===n)return void console.error(`Liquid Ajax Cart: a ${st} element doesn't have a valid URL`);if(e&&e.preventDefault(),D())return;const r=new FormData;switch(n.searchParams.forEach(((t,e)=>{r.append(e,t)})),n.pathname){case it:j(r,{info:{initiator:t}});break;case ot:C(r,{info:{initiator:t}});break;case at:x(r,{info:{initiator:t}});break;case rt:T({},{info:{initiator:t}})}}function ct(t,e){let n,o;return t.length>3?(n=e.cart.items.find((e=>e.key===t)),o="id"):(n=e.cart.items[Number(t)-1],o="line"),void 0===n&&(n=null,console.error(`Liquid Ajax Cart: line item with ${o}="${t}" not found`)),[n,o]}const lt=`${e}-quantity-input`;function dt(t){return!!t.hasAttribute(lt)&&(t instanceof HTMLInputElement&&("text"===t.type||"number"===t.type)||(console.error(`Liquid Ajax Cart: the ${lt} attribute supports "input" elements only with the "text" and the "number" types`),!1))}function ht(){document.querySelectorAll(`input[${lt}]`).forEach((t=>{if(!dt(t))return;if(D())return void(t.disabled=!0);const e=B(),n=t.getAttribute(lt).trim(),[o]=ct(n,e);o?t.value=o.quantity.toString():null===o&&(t.value="0"),t.disabled=!1}))}function ft(t,e){if(!dt(t))return;if(e&&e.preventDefault(),D())return;let n=Number(t.value.trim());const o=t.getAttribute(lt).trim();if(isNaN(n))return void console.error(`Liquid Ajax Cart: input value of a ${lt} must be an Integer number`);if(n<1&&(n=0),!o)return void console.error(`Liquid Ajax Cart: attribute value of a ${lt} must be an item key or an item index`);const i=o.length>3?"id":"line",r=new FormData;r.set(i,o),r.set("quantity",n.toString()),C(r,{info:{initiator:t}}),t.blur()}const pt=`${e}-property-input`;function mt(t){const e=t.getAttribute(pt),n=t.getAttribute("name");console.error(`Liquid Ajax Cart: the element [${pt}="${e}"]${n?`[name="${n}"]`:""} has wrong attributes.`)}function yt(t){return!!t.hasAttribute(pt)&&!!(t instanceof HTMLInputElement&&"hidden"!==t.type||t instanceof HTMLTextAreaElement||t instanceof HTMLSelectElement)}function vt(t){const e={objectCode:void 0,propertyName:void 0,attributeValue:void 0};if(!t.hasAttribute(pt))return e;let n=t.getAttribute(pt).trim();if(!n){const e=t.getAttribute("name").trim();e&&(n=e)}if(!n)return mt(t),e;if(e.attributeValue=n,"note"===n)return e.objectCode="note",e;let[o,...i]=n.trim().split("[");return!i||1!==i.length||i[0].length<2||i[0].indexOf("]")!==i[0].length-1?(mt(t),e):(e.objectCode=o,e.propertyName=i[0].replace("]",""),e)}function bt(){document.querySelectorAll(`[${pt}]`).forEach((t=>{if(!yt(t))return;if(D())return void(t.disabled=!0);const{objectCode:e,propertyName:n,attributeValue:o}=vt(t);if(!e)return;const i=B();let r,a=!1;if("note"===e)r=i.cart.note;else if("attributes"===e)r=i.cart.attributes[n];else{const[t,s]=ct(e,i);t&&(r=t.properties[n]),null===t&&(console.error(`Liquid Ajax Cart: line item with ${s}="${e}" was not found when the [${pt}] element with "${o}" value tried to get updated from the State`),a=!0)}t instanceof HTMLInputElement&&("checkbox"===t.type||"radio"===t.type)?t.checked=t.value===r:("string"==typeof r||r instanceof String||"number"==typeof r||r instanceof Number||(Array.isArray(r)||r instanceof Object?(r=JSON.stringify(r),console.warn(`Liquid Ajax Cart: the ${pt} with the "${o}" value is bound to the ${n} ${"attributes"===e?"attribute":"property"} that is not string or number: ${r}`)):r=""),t.value=r),a||(t.disabled=!1)}))}function qt(t,e){if(!yt(t))return;e&&e.preventDefault(),t.blur();const n=B();if(D())return;const{objectCode:o,propertyName:i,attributeValue:r}=vt(t);if(!o)return;let a=t.value;if(t instanceof HTMLInputElement&&"checkbox"===t.type&&!t.checked){let t=document.querySelector(`input[type="hidden"][${pt}="${r}"]`);t||"note"!==o&&"attributes"!==o||(t=document.querySelector(`input[type="hidden"][${pt}][name="${r}"]`)),a=t?t.value:""}if("note"===o){const e=new FormData;e.set("note",a),x(e,{info:{initiator:t}})}else if("attributes"===o){const e=new FormData;e.set(`attributes[${i}]`,a),x(e,{info:{initiator:t}})}else{const[e,s]=ct(o,n);if(null===e&&console.error(`Liquid Ajax Cart: line item with ${s}="${o}" was not found when the [${pt}] element with "${r}" value tried to update the cart`),!e)return;const u=Object.assign({},e.properties);u[i]=a;const c=new FormData;let l=c;c.set(s,o),c.set("quantity",e.quantity.toString());for(let t in u){const n=u[t];"string"==typeof n||n instanceof String?c.set(`properties[${t}]`,u[t]):l={[s]:o,quantity:e.quantity,properties:u}}C(l,{info:{initiator:t}})}}const gt=`${n}-quantity`,$t=`${e}-quantity-plus`,wt=`${e}-quantity-minus`;function At(){customElements.define(Z,z),document.addEventListener("click",(function(t){for(let e=t.target;e&&e!=document.documentElement;e=e.parentElement)ut(e,t)}),!1),document.addEventListener("change",(function(t){qt(t.target,t)}),!1),document.addEventListener("keydown",(function(t){const e=t.target;"Enter"===t.key&&(e instanceof HTMLTextAreaElement&&!t.ctrlKey||qt(e,t)),"Escape"===t.key&&function(t){if(!yt(t))return;if(!(t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement))return;if(t instanceof HTMLInputElement&&("checkbox"===t.type||"radio"===t.type))return;const e=B(),{objectCode:n,propertyName:o}=vt(t);if(!n)return;let i;if("note"===n)i=e.cart.note;else if("attributes"===n)i=e.cart.attributes[o];else{const[t]=ct(n,e);t&&(i=t.properties[o])}void 0!==i&&(i||"string"==typeof i||i instanceof String||(i=""),t.value=String(i)),t.blur()}(e)}),!1),document.addEventListener(d,bt),document.addEventListener(v,bt),document.addEventListener(f,bt),bt(),document.addEventListener("change",(function(t){ft(t.target,t)}),!1),document.addEventListener("keydown",(function(t){"Enter"===t.key&&ft(t.target,t),"Escape"===t.key&&function(t){if(!dt(t))return;const e=t.getAttribute(lt).trim();let n;const o=B();if(e.length>3)n=o.cart.items.find((t=>t.key===e));else{const t=Number(e)-1;n=o.cart.items[t]}n&&(t.value=n.quantity.toString()),t.blur()}(t.target)}),!1),document.addEventListener(d,ht),document.addEventListener(v,ht),document.addEventListener(f,ht),ht(),customElements.define(gt,class extends HTMLElement{constructor(){super(...arguments),this._timer=void 0}connectedCallback(){const t=this.querySelectorAll("input");1===t.length?(this._$input=t[0],this._$input.hasAttribute(lt)?(this._$buttons=Array.from(this.querySelectorAll(`[${wt}], [${$t}]`)),this._$input.addEventListener("change",this._updateDOM.bind(this)),document.addEventListener(d,this._updateDOM.bind(this)),document.addEventListener(v,this._updateDOM.bind(this)),document.addEventListener(f,this._updateDOM.bind(this)),this._updateDOM(),this._$buttons.forEach((t=>{t.addEventListener("click",(e=>{const{quantityTagAllowZero:n}=U,o=!0===n?0:1;if(!D()){const e=Number(this._$input.value);if(isNaN(e))return void console.error(`Liquid Ajax Cart: "${gt}" element's input value isn't a number`,this._$input,this);let n=e;n=t.hasAttribute($t)?n+1:n-1,n<o&&(n=o),n!==e&&(this._$input.value=n.toString(),this._runAwaiting(),this._updateDOM())}e.preventDefault()})),t.addEventListener("focusout",(e=>{e.relatedTarget&&t.contains(e.relatedTarget)||void 0!==this._timer&&this._runRequest()}))}))):console.error(`Liquid Ajax Cart: "${gt}" element's input must have the "${lt}" attribute`,this._$input,this)):console.error(`Liquid Ajax Cart: "${gt}" element must have one "input" element as a child, ${t.length} found`,this)}_runAwaiting(){const{quantityTagDebounce:t}=U;void 0!==this._timer&&clearTimeout(this._timer),t>0?this._timer=setTimeout((()=>{this._runRequest()}),Number(t)):this._runRequest()}_runRequest(){void 0!==this._timer&&clearTimeout(this._timer),this._timer=void 0,D()||this._$input.dispatchEvent(new Event("change",{bubbles:!0}))}_updateDOM(){this._$buttons.forEach((t=>{const e=D()||t.hasAttribute(wt)&&!U.quantityTagAllowZero&&"1"===this._$input.value;e?t.setAttribute("aria-disabled","true"):t.removeAttribute("aria-disabled"),t instanceof HTMLButtonElement&&t.toggleAttribute("disabled",e)}))}})}const Et=`${e}-errors`,Lt=`${o}-init`,St=`${o}-processing`,jt=`${o}-empty`,Ct=`${o}-not-empty`;function xt(){const t=document.querySelector("html"),e=B();t.classList.toggle(Lt,null!==e.cart),t.classList.toggle(St,D()),t.classList.toggle(jt,0===e.cart.item_count),t.classList.toggle(Ct,e.cart.item_count>0)}let Tt,kt=!0;function Dt(){const{mutations:t}=U;Array.isArray(t)||console.error('Liquid Ajax Cart: the "mutations" settings parameter must be an array'),0!==t.length&&kt&&(kt=!1,Tt=-1,_t())}function _t(){const{mutations:t}=U;if(Tt++,Tt>=t.length)return;let e=[];try{e=t[Tt]()||[]}catch(t){console.error(`Liquid Ajax Cart: Error in the "mutation" function with index ${Tt}`),console.error(t)}Array.isArray(e)?Nt(e):_t()}function Nt(t){const e=t.shift();if(e){if(e.type&&[r,a,s,u,c].includes(e.type))return void $({requestType:e.type,body:e.body,options:{info:{mutation:!0},important:!0,lastCallback:e=>{Nt(t)}}});console.error(`Liquid Ajax Cart: wrong request type in the mutation with index ${Tt}`)}t.length>0?Nt(t):_t()}let Ot=!1;if(!("liquidAjaxCart"in window)){function Bt(t,e){Object.defineProperty(window.liquidAjaxCart,t,{get:e,set:()=>{throw new Error(`Liquid Ajax Cart: the "${t}" is a read-only property`)},enumerable:!0})}window.liquidAjaxCart={conf:function(t,e){t in U?(U[t]=e,"binderFormatters"===t&&R()):console.error(`Liquid Ajax Cart: unknown configuration parameter "${t}"`)}},Bt("init",(()=>Ot)),document.addEventListener(m,(t=>{const{requestState:e}=t.detail;if(void 0!==e.requestBody){const t=[];if(document.querySelectorAll(`[${P}]`).forEach((e=>{const n=e.closest(`[id^="${V}"]`);if(n){const e=n.id.replace(V,"");-1===t.indexOf(e)&&t.push(e)}else console.error(`Liquid Ajax Cart: there is a ${P} element that is not inside a Shopify section. All the ${P} elements must be inside Shopify sections.`)})),t.length){let n,o=t.join(",");e.requestBody instanceof FormData||e.requestBody instanceof URLSearchParams?e.requestBody.has("sections")&&(n=e.requestBody.get("sections").toString()):n=e.requestBody.sections,(("string"==typeof n||n instanceof String)&&""!==n||n&&Array.isArray(n)&&n.length>0)&&(o=`${n.toString()},${o}`),e.requestBody instanceof FormData||e.requestBody instanceof URLSearchParams?e.requestBody.set("sections",o):e.requestBody.sections=o}}})),document.addEventListener(v,(t=>{var e,n,o;t.detail.sections=[];const{requestState:i}=t.detail,a=new DOMParser,s=[];if((null===(e=i.responseData)||void 0===e?void 0:e.ok)&&"sections"in i.responseData.body){let t=i.responseData.body.sections;(null===(o=null===(n=i.extraResponseData)||void 0===n?void 0:n.body)||void 0===o?void 0:o.sections)&&(t=Object.assign(Object.assign({},t),i.extraResponseData.body.sections));for(let e in t)t[e]?document.querySelectorAll(`#shopify-section-${e}`).forEach((n=>{let o=[];const u="__noId__",c={};n.querySelectorAll(` [${J}] `).forEach((t=>{let e=t.getAttribute(J).toString().trim();""===e&&(e=u),e in c||(c[e]=[]),c[e].push({scroll:t.scrollTop,height:t.scrollHeight})}));const l={},d=n.querySelectorAll(`[${I}]`);d&&d.forEach((t=>{let e=t.getAttribute(I).toString().trim();""===e&&(e=u),e in l||(l[e]=[]),l[e].push(t)}));const h=n.querySelectorAll(`[${P}]`);if(h){const i=a.parseFromString(t[e],"text/html");i.querySelectorAll('img[loading="lazy"]').forEach((t=>{t.removeAttribute("loading")}));for(let t in l)i.querySelectorAll(` [${I}="${t.replace(u,"")}"] `).forEach(((e,n)=>{n+1<=l[t].length&&(e.before(l[t][n]),e.parentElement.removeChild(e))}));const r=i.querySelectorAll(`[${P}]`);if(h.length!==r.length){console.error(`Liquid Ajax Cart: the received HTML for the "${e}" section has a different quantity of the "${P}" containers. The section will be updated completely.`);const t=i.querySelector(`#${V}${e}`);if(t){for(n.innerHTML="";t.childNodes.length;)n.appendChild(t.firstChild);o.push(n)}}else h.forEach(((t,e)=>{t.before(r[e]),t.parentElement.removeChild(t),o.push(r[e])}))}for(let t in c)n.querySelectorAll(` [${J}="${t.replace(u,"")}"] `).forEach(((e,n)=>{n+1<=c[t].length&&(i.requestType!==r||c[t][n].height>=e.scrollHeight)&&(e.scrollTop=c[t][n].scroll)}));o.length>0&&s.push({id:e,elements:o})})):console.error(`Liquid Ajax Cart: the HTML for the "${e}" section was requested but the response is ${t[e]}`)}s.length>0&&(t.detail.sections=s)})),(()=>{let t;document.addEventListener(m,(e=>{const{requestState:n}=e.detail;t=void 0,n.requestType===r?t=(t=>{var e;let n;const o=null===(e=t.info)||void 0===e?void 0:e.initiator;return o instanceof z&&(n=o.querySelectorAll(`[${Et}="form"]`)),n})(n):n.requestType===a&&(t=(t=>{var e;let n;const o=B();let i,r;if(t.requestBody instanceof FormData||t.requestBody instanceof URLSearchParams?(t.requestBody.has("line")&&(r=t.requestBody.get("line").toString()),t.requestBody.has("id")&&(i=t.requestBody.get("id").toString())):("line"in t.requestBody&&(r=String(t.requestBody.line)),"id"in t.requestBody&&(i=String(t.requestBody.id))),r){const t=Number(r);if(t>0){const n=t-1;i=null===(e=o.cart.items[n])||void 0===e?void 0:e.key}}return i&&(n=i.indexOf(":")>-1?document.querySelectorAll(`[${Et}="${i}"]`):document.querySelectorAll(o.cart.items.reduce(((t,e)=>(e.key!==i&&e.id!==Number(i)||t.push(`[${Et}="${e.key}"]`),t)),[]).join(","))),n})(n)),t&&t.length>0&&t.forEach((t=>{t.textContent=""}))})),document.addEventListener(v,(e=>{const{requestState:n}=e.detail;if(n.info.cancel)return;if(!t||0===t.length)return;const o=function(t){var e,n,o,i,r;const{requestErrorText:a}=U;return(null===(e=t.responseData)||void 0===e?void 0:e.ok)?"":(null===(o=null===(n=t.responseData)||void 0===n?void 0:n.body)||void 0===o?void 0:o.description)||(null===(r=null===(i=t.responseData)||void 0===i?void 0:i.body)||void 0===r?void 0:r.message)||a}(n);o&&t.forEach((t=>{t.textContent=o}))}))})(),document.addEventListener(i,Dt),document.addEventListener(f,Dt),document.addEventListener(m,(t=>{const{requestState:e}=t.detail;e.info.mutation||(kt=!0)})),function(){document.addEventListener(v,(t=>{var e,n;const{requestState:o}=t.detail;let i;(null===(e=o.extraResponseData)||void 0===e?void 0:e.ok)&&o.extraResponseData.body.token?i=o.extraResponseData.body:(null===(n=o.responseData)||void 0===n?void 0:n.ok)&&o.responseData.body.token&&(i=o.responseData.body),i&&(N=O,O=i,t.detail.previousCart=N,t.detail.cart=O)}));const t=document.querySelector(`[${_}]`);if(t)try{O=JSON.parse(t.textContent)}catch(t){console.error(`Liquid Ajax Cart: can't parse cart JSON from the "${_}" script`),console.error(t)}return new Promise(((t,e)=>{var n,o;O?t():fetch(`${(null===(o=null===(n=window.Shopify)||void 0===n?void 0:n.routes)||void 0===o?void 0:o.root)||"/"}cart.js`,{headers:{"Content-Type":"application/json"}}).then((t=>t.json())).then((e=>{O=e,t()})).catch((t=>{console.error(t),e('Can\'t load the cart state from the "/cart.js" endpoint')}))}))}().then((()=>{document.addEventListener(v,R),R(),At(),document.addEventListener(d,xt),document.addEventListener(v,xt),document.addEventListener(f,xt),xt(),window.liquidAjaxCart.get=S,window.liquidAjaxCart.add=j,window.liquidAjaxCart.change=C,window.liquidAjaxCart.update=x,window.liquidAjaxCart.clear=T,Bt("cart",(()=>B().cart)),Bt("processing",D),window.addEventListener("focus",(()=>{U.updateOnWindowFocus&&x({},{})})),window.addEventListener("pageshow",(t=>{(t.persisted||"back_forward"===performance.getEntriesByType("navigation")[0].type)&&window.liquidAjaxCart.update({},{})})),Ot=!0;const t=new CustomEvent(i);document.dispatchEvent(t)}))}