function e(){const e=document.getElementById("containerGamePlayers"),t=[];for(const r of e.children)t.push(parseInt(r.id.replace("player","")));return t}function t(e){return function(e){const t=document.getElementById("containerGamePlayers");for(const r of t.children)if(parseInt(r.id.replace("player",""))==e)return r}(e).children[1]}function r(e){return t(e).children[0]}function n(e,t="rgb(0, 0, 0)"){const r=document.createElement("span");r.textContent=e;const n=document.createElement("p");n.style.color=t,n.style.fontWeight="bold",n.appendChild(r),document.getElementById("boxMessages").appendChild(n)}var o;function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function u(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?u(Object(r),!0).forEach(function(t){i(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):u(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}function a(e){return"Minified Redux error #"+e+"; visit https://redux.js.org/Errors?code="+e+" for the full message or use the non-minified dev environment for full errors. "}!function(e){e[e.TURN_END=0]="TURN_END",e[e.TURN_START=1]="TURN_START",e[e.PLAYER_JOIN=2]="PLAYER_JOIN",e[e.PLAYER_LEAVE=3]="PLAYER_LEAVE",e[e.PLAYER_GUESS=4]="PLAYER_GUESS",e[e.UNKNOWN=5]="UNKNOWN"}(o||(o={}));var f="function"==typeof Symbol&&Symbol.observable||"@@observable",l=function(){return Math.random().toString(36).substring(7).split("").join(".")},p={INIT:"@@redux/INIT"+l(),REPLACE:"@@redux/REPLACE"+l(),PROBE_UNKNOWN_ACTION:function(){return"@@redux/PROBE_UNKNOWN_ACTION"+l()}};function s(e){if("object"!=typeof e||null===e)return!1;for(var t=e;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}function d(e,t,r){var n;if("function"==typeof t&&"function"==typeof r||"function"==typeof r&&"function"==typeof arguments[3])throw new Error(a(0));if("function"==typeof t&&void 0===r&&(r=t,t=void 0),void 0!==r){if("function"!=typeof r)throw new Error(a(1));return r(d)(e,t)}if("function"!=typeof e)throw new Error(a(2));var o=e,i=t,u=[],c=u,l=!1;function y(){c===u&&(c=u.slice())}function v(){if(l)throw new Error(a(3));return i}function h(e){if("function"!=typeof e)throw new Error(a(4));if(l)throw new Error(a(5));var t=!0;return y(),c.push(e),function(){if(t){if(l)throw new Error(a(6));t=!1,y();var r=c.indexOf(e);c.splice(r,1),u=null}}}function g(e){if(!s(e))throw new Error(a(7));if(void 0===e.type)throw new Error(a(8));if(l)throw new Error(a(9));try{l=!0,i=o(i,e)}finally{l=!1}for(var t=u=c,r=0;r<t.length;r++)(0,t[r])();return e}function b(e){if("function"!=typeof e)throw new Error(a(10));o=e,g({type:p.REPLACE})}function w(){var e,t=h;return(e={subscribe:function(e){if("object"!=typeof e||null===e)throw new Error(a(11));function r(){e.next&&e.next(v())}return r(),{unsubscribe:t(r)}}})[f]=function(){return this},e}return g({type:p.INIT}),(n={dispatch:g,subscribe:h,getState:v,replaceReducer:b})[f]=w,n}function y(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return 0===t.length?function(e){return e}:1===t.length?t[0]:t.reduce(function(e,t){return function(){return e(t.apply(void 0,arguments))}})}function v(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(e){return function(){var r=e.apply(void 0,arguments),n=function(){throw new Error(a(15))},o={getState:r.getState,dispatch:function(){return n.apply(void 0,arguments)}},i=t.map(function(e){return e(o)});return n=y.apply(void 0,i)(r.dispatch),c(c({},r),{},{dispatch:n})}}}function h(e){for(var t=arguments.length,r=Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];throw Error("[Immer] minified error nr: "+e+(r.length?" "+r.map(function(e){return"'"+e+"'"}).join(","):"")+". Find the full error at: https://bit.ly/3cXEKWf")}function g(e){return!!e&&!!e[ne]}function b(e){return!!e&&(function(e){if(!e||"object"!=typeof e)return!1;var t=Object.getPrototypeOf(e);if(null===t)return!0;var r=Object.hasOwnProperty.call(t,"constructor")&&t.constructor;return r===Object||"function"==typeof r&&Function.toString.call(r)===oe}(e)||Array.isArray(e)||!!e[re]||!!e.constructor[re]||A(e)||S(e))}function w(e,t,r){void 0===r&&(r=!1),0===m(e)?(r?Object.keys:ie)(e).forEach(function(n){r&&"symbol"==typeof n||t(n,e[n],e)}):e.forEach(function(r,n){return t(n,r,e)})}function m(e){var t=e[ne];return t?t.i>3?t.i-4:t.i:Array.isArray(e)?1:A(e)?2:S(e)?3:0}function O(e,t){return 2===m(e)?e.has(t):Object.prototype.hasOwnProperty.call(e,t)}function E(e,t,r){var n=m(e);2===n?e.set(t,r):3===n?(e.delete(t),e.add(r)):e[t]=r}function P(e,t){return e===t?0!==e||1/e==1/t:e!=e&&t!=t}function A(e){return Q&&e instanceof Map}function S(e){return Z&&e instanceof Set}function j(e){return e.o||e.t}function R(e){if(Array.isArray(e))return Array.prototype.slice.call(e);var t=ue(e);delete t[ne];for(var r=ie(t),n=0;n<r.length;n++){var o=r[n],i=t[o];!1===i.writable&&(i.writable=!0,i.configurable=!0),(i.get||i.set)&&(t[o]={configurable:!0,writable:!0,enumerable:i.enumerable,value:e[o]})}return Object.create(Object.getPrototypeOf(e),t)}function N(e,t){return void 0===t&&(t=!1),x(e)||g(e)||!b(e)||(m(e)>1&&(e.set=e.add=e.clear=e.delete=_),Object.freeze(e),t&&w(e,function(e,t){return N(t,!0)},!0)),e}function _(){h(2)}function x(e){return null==e||"object"!=typeof e||Object.isFrozen(e)}function T(e){var t=ce[e];return t||h(18,e),t}function I(){return q}function L(e,t){t&&(T("Patches"),e.u=[],e.s=[],e.v=t)}function k(e){U(e),e.p.forEach(C),e.p=null}function U(e){e===q&&(q=e.l)}function D(e){return q={p:[],l:q,h:e,m:!0,_:0}}function C(e){var t=e[ne];0===t.i||1===t.i?t.j():t.O=!0}function F(e,t){t._=t.p.length;var r=t.p[0],n=void 0!==e&&e!==r;return t.h.g||T("ES5").S(t,e,n),n?(r[ne].P&&(k(t),h(4)),b(e)&&(e=M(t,e),t.l||G(t,e)),t.u&&T("Patches").M(r[ne],e,t.u,t.s)):e=M(t,r,[]),k(t),t.u&&t.v(t.u,t.s),e!==te?e:void 0}function M(e,t,r){if(x(t))return t;var n=t[ne];if(!n)return w(t,function(o,i){return K(e,n,t,o,i,r)},!0),t;if(n.A!==e)return t;if(!n.P)return G(e,n.t,!0),n.t;if(!n.I){n.I=!0,n.A._--;var o=4===n.i||5===n.i?n.o=R(n.k):n.o;w(3===n.i?new Set(o):o,function(t,i){return K(e,n,o,t,i,r)}),G(e,o,!1),r&&e.u&&T("Patches").R(n,r,e.u,e.s)}return n.o}function K(e,t,r,n,o,i){if(g(o)){var u=M(e,o,i&&t&&3!==t.i&&!O(t.D,n)?i.concat(n):void 0);if(E(r,n,u),!g(u))return;e.m=!1}if(b(o)&&!x(o)){if(!e.h.F&&e._<1)return;M(e,o),t&&t.A.l||G(e,o)}}function G(e,t,r){void 0===r&&(r=!1),e.h.F&&e.m&&N(t,r)}function W(e,t){var r=e[ne];return(r?j(r):e)[t]}function Y(e,t){if(t in e)for(var r=Object.getPrototypeOf(e);r;){var n=Object.getOwnPropertyDescriptor(r,t);if(n)return n;r=Object.getPrototypeOf(r)}}function $(e){e.P||(e.P=!0,e.l&&$(e.l))}function B(e){e.o||(e.o=R(e.t))}function z(e,t,r){var n=A(t)?T("MapSet").N(t,r):S(t)?T("MapSet").T(t,r):e.g?function(e,t){var r=Array.isArray(e),n={i:r?1:0,A:t?t.A:I(),P:!1,I:!1,D:{},l:t,t:e,k:null,o:null,j:null,C:!1},o=n,i=ae;r&&(o=[n],i=fe);var u=Proxy.revocable(o,i),c=u.revoke,a=u.proxy;return n.k=a,n.j=c,a}(t,r):T("ES5").J(t,r);return(r?r.A:I()).p.push(n),n}function J(e){return g(e)||h(22,e),function e(t){if(!b(t))return t;var r,n=t[ne],o=m(t);if(n){if(!n.P&&(n.i<4||!T("ES5").K(n)))return n.t;n.I=!0,r=V(t,o),n.I=!1}else r=V(t,o);return w(r,function(t,o){n&&function(e,t){return 2===m(e)?e.get(t):e[t]}(n.t,t)===o||E(r,t,e(o))}),3===o?new Set(r):r}(e)}function V(e,t){switch(t){case 2:return new Map(e);case 3:return Array.from(e)}return R(e)}var X,q,H="undefined"!=typeof Symbol&&"symbol"==typeof Symbol("x"),Q="undefined"!=typeof Map,Z="undefined"!=typeof Set,ee="undefined"!=typeof Proxy&&void 0!==Proxy.revocable&&"undefined"!=typeof Reflect,te=H?Symbol.for("immer-nothing"):((X={})["immer-nothing"]=!0,X),re=H?Symbol.for("immer-draftable"):"__$immer_draftable",ne=H?Symbol.for("immer-state"):"__$immer_state",oe=""+Object.prototype.constructor,ie="undefined"!=typeof Reflect&&Reflect.ownKeys?Reflect.ownKeys:void 0!==Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:Object.getOwnPropertyNames,ue=Object.getOwnPropertyDescriptors||function(e){var t={};return ie(e).forEach(function(r){t[r]=Object.getOwnPropertyDescriptor(e,r)}),t},ce={},ae={get:function(e,t){if(t===ne)return e;var r=j(e);if(!O(r,t))return function(e,t,r){var n,o=Y(t,r);return o?"value"in o?o.value:null===(n=o.get)||void 0===n?void 0:n.call(e.k):void 0}(e,r,t);var n=r[t];return e.I||!b(n)?n:n===W(e.t,t)?(B(e),e.o[t]=z(e.A.h,n,e)):n},has:function(e,t){return t in j(e)},ownKeys:function(e){return Reflect.ownKeys(j(e))},set:function(e,t,r){var n=Y(j(e),t);if(null==n?void 0:n.set)return n.set.call(e.k,r),!0;if(!e.P){var o=W(j(e),t),i=null==o?void 0:o[ne];if(i&&i.t===r)return e.o[t]=r,e.D[t]=!1,!0;if(P(r,o)&&(void 0!==r||O(e.t,t)))return!0;B(e),$(e)}return e.o[t]===r&&"number"!=typeof r&&(void 0!==r||t in e.o)||(e.o[t]=r,e.D[t]=!0,!0)},deleteProperty:function(e,t){return void 0!==W(e.t,t)||t in e.t?(e.D[t]=!1,B(e),$(e)):delete e.D[t],e.o&&delete e.o[t],!0},getOwnPropertyDescriptor:function(e,t){var r=j(e),n=Reflect.getOwnPropertyDescriptor(r,t);return n?{writable:!0,configurable:1!==e.i||"length"!==t,enumerable:n.enumerable,value:r[t]}:n},defineProperty:function(){h(11)},getPrototypeOf:function(e){return Object.getPrototypeOf(e.t)},setPrototypeOf:function(){h(12)}},fe={};w(ae,function(e,t){fe[e]=function(){return arguments[0]=arguments[0][0],t.apply(this,arguments)}}),fe.deleteProperty=function(e,t){return ae.deleteProperty.call(this,e[0],t)},fe.set=function(e,t,r){return ae.set.call(this,e[0],t,r,e[0])};var le=new(function(){function e(e){var t=this;this.g=ee,this.F=!0,this.produce=function(e,r,n){if("function"==typeof e&&"function"!=typeof r){var o=r;r=e;var i=t;return function(e){var t=this;void 0===e&&(e=o);for(var n=arguments.length,u=Array(n>1?n-1:0),c=1;c<n;c++)u[c-1]=arguments[c];return i.produce(e,function(e){var n;return(n=r).call.apply(n,[t,e].concat(u))})}}var u;if("function"!=typeof r&&h(6),void 0!==n&&"function"!=typeof n&&h(7),b(e)){var c=D(t),a=z(t,e,void 0),f=!0;try{u=r(a),f=!1}finally{f?k(c):U(c)}return"undefined"!=typeof Promise&&u instanceof Promise?u.then(function(e){return L(c,n),F(e,c)},function(e){throw k(c),e}):(L(c,n),F(u,c))}if(!e||"object"!=typeof e){if((u=r(e))===te)return;return void 0===u&&(u=e),t.F&&N(u,!0),u}h(21,e)},this.produceWithPatches=function(e,r){return"function"==typeof e?function(r){for(var n=arguments.length,o=Array(n>1?n-1:0),i=1;i<n;i++)o[i-1]=arguments[i];return t.produceWithPatches(r,function(t){return e.apply(void 0,[t].concat(o))})}:[t.produce(e,r,function(e,t){n=e,o=t}),n,o];var n,o},"boolean"==typeof(null==e?void 0:e.useProxies)&&this.setUseProxies(e.useProxies),"boolean"==typeof(null==e?void 0:e.autoFreeze)&&this.setAutoFreeze(e.autoFreeze)}var t=e.prototype;return t.createDraft=function(e){b(e)||h(8),g(e)&&(e=J(e));var t=D(this),r=z(this,e,void 0);return r[ne].C=!0,U(t),r},t.finishDraft=function(e,t){var r=(e&&e[ne]).A;return L(r,t),F(void 0,r)},t.setAutoFreeze=function(e){this.F=e},t.setUseProxies=function(e){e&&!ee&&h(20),this.g=e},t.applyPatches=function(e,t){var r;for(r=t.length-1;r>=0;r--){var n=t[r];if(0===n.path.length&&"replace"===n.op){e=n.value;break}}var o=T("Patches").$;return g(e)?o(e,t):this.produce(e,function(e){return o(e,t.slice(r+1))})},e}()),pe=le.produce;function se(e,t){return e===t}function de(e,t,r){if(null===t||null===r||t.length!==r.length)return!1;for(var n=t.length,o=0;o<n;o++)if(!e(t[o],r[o]))return!1;return!0}function ye(e){return function(t){var r=t.dispatch,n=t.getState;return function(t){return function(o){return"function"==typeof o?o(r,n,e):t(o)}}}}le.produceWithPatches.bind(le),le.setAutoFreeze.bind(le),le.setUseProxies.bind(le),le.applyPatches.bind(le),le.createDraft.bind(le),le.finishDraft.bind(le),function(e){for(var t=arguments.length,r=Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n]}(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:se,r=null,n=null;return function(){return de(t,r,arguments)||(n=e.apply(null,arguments)),r=arguments,n}});var ve=ye();ve.withExtraArgument=ye;var he,ge,be=(he=function(e,t){return(he=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}he(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),we=function(e,t){for(var r=0,n=t.length,o=e.length;r<n;r++,o++)e[o]=t[r];return e},me=Object.defineProperty,Oe=Object.prototype.hasOwnProperty,Ee=Object.getOwnPropertySymbols,Pe=Object.prototype.propertyIsEnumerable,Ae=function(e,t,r){return t in e?me(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r},Se=function(e,t){for(var r in t||(t={}))Oe.call(t,r)&&Ae(e,r,t[r]);if(Ee)for(var n=0,o=Ee(t);n<o.length;n++)Pe.call(t,r=o[n])&&Ae(e,r,t[r]);return e},je="undefined"!=typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(0!==arguments.length)return"object"==typeof arguments[0]?y:y.apply(null,arguments)},Re=function(e){function t(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];var o=e.apply(this,r)||this;return Object.setPrototypeOf(o,t.prototype),o}return be(t,e),Object.defineProperty(t,Symbol.species,{get:function(){return t},enumerable:!1,configurable:!0}),t.prototype.concat=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return e.prototype.concat.apply(this,t)},t.prototype.prepend=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return 1===e.length&&Array.isArray(e[0])?new(t.bind.apply(t,we([void 0],e[0].concat(this)))):new(t.bind.apply(t,we([void 0],e.concat(this))))},t}(Array);function Ne(e,t){function r(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];if(t){var o=t.apply(void 0,r);if(!o)throw new Error("prepareAction did not return an object");return Se(Se({type:e,payload:o.payload},"meta"in o&&{meta:o.meta}),"error"in o&&{error:o.error})}return{type:e,payload:r[0]}}return r.toString=function(){return""+e},r.type=e,r.match=function(t){return t.type===e},r}function _e(e){var t,r={},n=[],o={addCase:function(e,t){var n="string"==typeof e?e:e.type;if(n in r)throw new Error("addCase cannot be called with two reducers for the same action type");return r[n]=t,o},addMatcher:function(e,t){return n.push({matcher:e,reducer:t}),o},addDefaultCase:function(e){return t=e,o}};return e(o),[r,n,t]}!function(e){e[e.PRE_TURN=0]="PRE_TURN",e[e.TAKING_TURN=1]="TAKING_TURN"}(ge||(ge={}));const xe=function(e){var t=e.name,r=e.initialState;if(!t)throw new Error("`name` is a required option for createSlice");var n=e.reducers||{},o="function"==typeof e.extraReducers?_e(e.extraReducers):[e.extraReducers],i=o[0],u=void 0===i?{}:i,c=o[1],a=void 0===c?[]:c,f=o[2],l=void 0===f?void 0:f,p=Object.keys(n),s={},d={},y={};p.forEach(function(e){var r,o,i=n[e],u=t+"/"+e;"reducer"in i?(r=i.reducer,o=i.prepare):r=i,s[e]=r,d[u]=r,y[e]=o?Ne(u,o):Ne(u)});var v=function(e,t,r,n){void 0===r&&(r=[]),function(){function e(e,t){var r=o[e];return r?r.enumerable=t:o[e]=r={configurable:!0,enumerable:t,get:function(){return ae.get(this[ne],e)},set:function(t){ae.set(this[ne],e,t)}},r}function t(e){for(var t=e.length-1;t>=0;t--){var o=e[t][ne];if(!o.P)switch(o.i){case 5:n(o)&&$(o);break;case 4:r(o)&&$(o)}}}function r(e){for(var t=e.t,r=e.k,n=ie(r),o=n.length-1;o>=0;o--){var i=n[o];if(i!==ne){var u=t[i];if(void 0===u&&!O(t,i))return!0;var c=r[i],a=c&&c[ne];if(a?a.t!==u:!P(c,u))return!0}}var f=!!t[ne];return n.length!==ie(t).length+(f?0:1)}function n(e){var t=e.k;if(t.length!==e.t.length)return!0;var r=Object.getOwnPropertyDescriptor(t,t.length-1);return!(!r||r.get)}var o={};!function(e,t){ce.ES5||(ce.ES5=t)}(0,{J:function(t,r){var n=Array.isArray(t),o=function(t,r){if(t){for(var n=Array(r.length),o=0;o<r.length;o++)Object.defineProperty(n,""+o,e(o,!0));return n}var i=ue(r);delete i[ne];for(var u=ie(i),c=0;c<u.length;c++){var a=u[c];i[a]=e(a,t||!!i[a].enumerable)}return Object.create(Object.getPrototypeOf(r),i)}(n,t),i={i:n?5:4,A:r?r.A:I(),P:!1,I:!1,D:{},l:r,t,k:o,o:null,O:!1,C:!1};return Object.defineProperty(o,ne,{value:i,writable:!0}),o},S:function(e,r,o){o?g(r)&&r[ne].A===e&&t(e.p):(e.u&&function e(t){if(t&&"object"==typeof t){var r=t[ne];if(r){var o=r.t,i=r.k,u=r.D,c=r.i;if(4===c)w(i,function(t){t!==ne&&(void 0!==o[t]||O(o,t)?u[t]||e(i[t]):(u[t]=!0,$(r)))}),w(o,function(e){void 0!==i[e]||O(i,e)||(u[e]=!1,$(r))});else if(5===c){if(n(r)&&($(r),u.length=!0),i.length<o.length)for(var a=i.length;a<o.length;a++)u[a]=!1;else for(var f=o.length;f<i.length;f++)u[f]=!0;for(var l=Math.min(i.length,o.length),p=0;p<l;p++)void 0===u[p]&&e(i[p])}}}}(e.p[0]),t(e.p))},K:function(e){return 4===e.i?r(e):n(e)}})}();var o="function"==typeof t?_e(t):[t,r,n],i=o[0],u=o[1],c=o[2],a=pe(e,function(){});return function(e,t){void 0===e&&(e=a);var r=we([i[t.type]],u.filter(function(e){return(0,e.matcher)(t)}).map(function(e){return e.reducer}));return 0===r.filter(function(e){return!!e}).length&&(r=[c]),r.reduce(function(e,r){if(r){var n;if(g(e))return void 0===(n=r(e,t))?e:n;if(b(e))return pe(e,function(e){return r(e,t)});if(void 0===(n=r(e,t))){if(null===e)return e;throw Error("A case reducer on a non-draftable value must not return undefined")}return n}return e},e)}}(r,Se(Se({},u),d),a,l);return{name:t,reducer:v,actions:y,caseReducers:s}}({name:"game",initialState:{turnState:ge.PRE_TURN,players:[]},reducers:{playerAdded:(e,t)=>{e.players.push({id:t.payload.id,name:t.payload.name,drinks:0})},playerRemoved:(e,t)=>{for(let r=0;r<e.players.length;r++)e.players[r].name==t.payload&&e.players.splice(r,1)},playerGuessed:(e,t)=>{for(let r=0;r<e.players.length;r++)e.players[r].name==t.payload&&(e.players[r].drinks+=1)},turnStarted:e=>{e.turnState=ge.TAKING_TURN;for(const t of e.players)t.drinks=0},turnEnded:e=>{e.turnState=ge.PRE_TURN}}}),{playerAdded:Te,playerRemoved:Ie,playerGuessed:Le,turnStarted:ke,turnEnded:Ue}=xe.actions,De=function(e){var t,r=function(e){return function(e){void 0===e&&(e={});var t=e.thunk,r=void 0===t||t,n=new Re;return r&&(function(e){return"boolean"==typeof e}(r)?n.push(ve):n.push(ve.withExtraArgument(r.extraArgument))),n}(e)},n={reducer:xe.reducer}||{},o=n.reducer,i=void 0===o?void 0:o,u=n.middleware,c=void 0===u?r():u,f=n.devTools,l=void 0===f||f,s=n.preloadedState,h=void 0===s?void 0:s,g=n.enhancers,b=void 0===g?void 0:g;if("function"==typeof i)t=i;else{if(!function(e){if("object"!=typeof e||null===e)return!1;for(var t=e;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}(i))throw new Error('"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers');t=function(e){for(var t=Object.keys(e),r={},n=0;n<t.length;n++){var o=t[n];"function"==typeof e[o]&&(r[o]=e[o])}var i,u=Object.keys(r);try{!function(e){Object.keys(e).forEach(function(t){var r=e[t];if(void 0===r(void 0,{type:p.INIT}))throw new Error(a(12));if(void 0===r(void 0,{type:p.PROBE_UNKNOWN_ACTION()}))throw new Error(a(13))})}(r)}catch(e){i=e}return function(e,t){if(void 0===e&&(e={}),i)throw i;for(var n=!1,o={},c=0;c<u.length;c++){var f=u[c],l=e[f],p=(0,r[f])(l,t);if(void 0===p)throw new Error(a(14));o[f]=p,n=n||p!==l}return(n=n||u.length!==Object.keys(e).length)?o:e}}(i)}var w=c;"function"==typeof w&&(w=w(r));var m=v.apply(void 0,w),O=y;l&&(O=je(Se({trace:!1},"object"==typeof l&&l)));var E=[m];return Array.isArray(b)?E=we([m],b):"function"==typeof b&&(E=b(E)),d(t,h,O.apply(void 0,E))}();var Ce="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function Fe(e){var t={exports:{}};return e(t,t.exports),t.exports}var Me=Fe(function(e){var t,r;t=Ce,r=function(){var e=function(){},t="undefined",r=typeof window!==t&&typeof window.navigator!==t&&/Trident\/|MSIE /.test(window.navigator.userAgent),n=["trace","debug","info","warn","error"];function o(e,t){var r=e[t];if("function"==typeof r.bind)return r.bind(e);try{return Function.prototype.bind.call(r,e)}catch(t){return function(){return Function.prototype.apply.apply(r,[e,arguments])}}}function i(){console.log&&(console.log.apply?console.log.apply(console,arguments):Function.prototype.apply.apply(console.log,[console,arguments])),console.trace&&console.trace()}function u(n){return"debug"===n&&(n="log"),typeof console!==t&&("trace"===n&&r?i:void 0!==console[n]?o(console,n):void 0!==console.log?o(console,"log"):e)}function c(t,r){for(var o=0;o<n.length;o++){var i=n[o];this[i]=o<t?e:this.methodFactory(i,t,r)}this.log=this.debug}function a(e,r,n){return function(){typeof console!==t&&(c.call(this,r,n),this[e].apply(this,arguments))}}function f(e,t,r){return u(e)||a.apply(this,arguments)}function l(e,r,o){var i,u=this,a="loglevel";function l(){var e;if(typeof window!==t&&a){try{e=window.localStorage[a]}catch(e){}if(typeof e===t)try{var r=window.document.cookie,n=r.indexOf(encodeURIComponent(a)+"=");-1!==n&&(e=/^([^;]+)/.exec(r.slice(n))[1])}catch(e){}return void 0===u.levels[e]&&(e=void 0),e}}"string"==typeof e?a+=":"+e:"symbol"==typeof e&&(a=void 0),u.name=e,u.levels={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4,SILENT:5},u.methodFactory=o||f,u.getLevel=function(){return i},u.setLevel=function(r,o){if("string"==typeof r&&void 0!==u.levels[r.toUpperCase()]&&(r=u.levels[r.toUpperCase()]),!("number"==typeof r&&r>=0&&r<=u.levels.SILENT))throw"log.setLevel() called with invalid level: "+r;if(i=r,!1!==o&&function(e){var r=(n[e]||"silent").toUpperCase();if(typeof window!==t&&a){try{return void(window.localStorage[a]=r)}catch(e){}try{window.document.cookie=encodeURIComponent(a)+"="+r+";"}catch(e){}}}(r),c.call(u,r,e),typeof console===t&&r<u.levels.SILENT)return"No console available for logging"},u.setDefaultLevel=function(e){l()||u.setLevel(e,!1)},u.enableAll=function(e){u.setLevel(u.levels.TRACE,e)},u.disableAll=function(e){u.setLevel(u.levels.SILENT,e)};var p=l();null==p&&(p=null==r?"WARN":r),u.setLevel(p,!1)}var p=new l,s={};p.getLogger=function(e){if("symbol"!=typeof e&&"string"!=typeof e||""===e)throw new TypeError("You must supply a name when creating a logger.");var t=s[e];return t||(t=s[e]=new l(e,p.getLevel(),p.methodFactory)),t};var d=typeof window!==t?window.log:void 0;return p.noConflict=function(){return typeof window!==t&&window.log===p&&(window.log=d),p},p.getLoggers=function(){return s},p.default=p,p},e.exports?e.exports=r():t.log=r()}),Ke=Fe(function(e){var t,r;t=Ce,r=function(e){var t,r,n={template:"[%t] %l:",levelFormatter:function(e){return e.toUpperCase()},nameFormatter:function(e){return e||"root"},timestampFormatter:function(e){return e.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/,"$1")},format:void 0},o={},i={reg:function(e){if(!e||!e.getLogger)throw new TypeError("Argument is not a root logger");t=e},apply:function(e,r){if(!e||!e.setLevel)throw new TypeError("Argument is not a logger");var i=e.methodFactory,u=e.name||"",c=o[u]||o[""]||n;return o[u]||(e.methodFactory=function(e,t,r){var n=i(e,t,r),c=o[r]||o[""],a=-1!==c.template.indexOf("%t"),f=-1!==c.template.indexOf("%l"),l=-1!==c.template.indexOf("%n");return function(){for(var t="",i=arguments.length,p=Array(i),s=0;s<i;s++)p[s]=arguments[s];if(u||!o[r]){var d=c.timestampFormatter(new Date),y=c.levelFormatter(e),v=c.nameFormatter(r);c.format?t+=c.format(y,v,d):(t+=c.template,a&&(t=t.replace(/%t/,d)),f&&(t=t.replace(/%l/,y)),l&&(t=t.replace(/%n/,v))),p.length&&"string"==typeof p[0]?p[0]=t+" "+p[0]:p.unshift(t)}n.apply(void 0,p)}}),(r=r||{}).template&&(r.format=void 0),o[u]=function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(t in arguments[r])Object.prototype.hasOwnProperty.call(arguments[r],t)&&(e[t]=arguments[r][t]);return e}({},c,r),e.setLevel(e.getLevel()),t||e.warn("It is necessary to call the function reg() of loglevel-plugin-prefix before calling apply. From the next release, it will throw an error. See more: https://github.com/kutuluk/loglevel-plugin-prefix/blob/master/README.md"),e}};return e&&(r=e.prefix,i.noConflict=function(){return e.prefix===i&&(e.prefix=r),i}),i},e.exports?e.exports=r():t.prefix=r(t)});Me.setDefaultLevel("TRACE"),Ke.reg(Me),Ke.apply(Me),Me.setLevel("ERROR");const Ge=document.getElementById("screenGame"),We=document.getElementById("boxMessages");function Ye(t){Me.info(`Message added: ${t}`);const n=function(e){let t;return t=/(.+?) is drawing now!/g.exec(e),t?{type:o.TURN_START,player:t[1]}:(t=/The word was '.+'/g.exec(e),t?{type:o.TURN_END,player:"unknown"}:(t=/(.+?) joined./g.exec(e),t?{type:o.PLAYER_JOIN,player:t[1]}:(t=/(.+?) left./g.exec(e),t?{type:o.PLAYER_LEAVE,player:t[1]}:(t=/^(.+?): .*/g.exec(e),t?{type:o.PLAYER_GUESS,player:t[1]}:{type:o.UNKNOWN,player:"unknown"}))))}(t);switch(Me.info(`Message parsed: ${n}`),n.type){case o.PLAYER_GUESS:Me.info(`${n.player} made a guess!`),De.dispatch(Le(n.player));break;case o.PLAYER_JOIN:for(const t of e()){const e=r(t).textContent;e==n.player&&De.dispatch(Te({id:t,name:e}))}break;case o.PLAYER_LEAVE:De.dispatch(Ie(n.player));break;case o.TURN_END:De.dispatch(Ue());break;case o.TURN_START:De.dispatch(ke())}}new MutationObserver(()=>{"none"!==Ge.style.display&&(function(){Me.info("Game started!");for(const t of e()){const e=r(t);let n=e.textContent;"rgb(0, 0, 255)"==e.style.color&&(n=n.slice(0,-6)),De.dispatch(Te({id:t,name:n}))}}(),new MutationObserver(e=>{for(const t of e)for(const e of t.addedNodes)Ye(e.textContent)}).observe(We,{childList:!0}))}).observe(Ge,{attributes:!0}),function(){const e=document.createElement("div");e.id="drinksWaterMark",e.style.position="fixed",e.style.top="9px",e.style.right="9px",e.style.fontSize="48px",e.style.color="#ffffff",e.textContent="Drinks 🍺",document.body.appendChild(e)}();let $e=De.getState();De.subscribe(()=>{const e=De.getState();if(Me.debug("new state: "+e),e.turnState!=$e.turnState)switch(e.turnState){case ge.TAKING_TURN:Me.info("Turn started!");break;case ge.PRE_TURN:!function(){Me.info("Turn ended!");for(const e of De.getState().players)n(`${e.name} drinks ${e.drinks}!`)}()}for(const r of e.players){let e=t(r.id).children[2];null==e&&(e=document.createElement("div"),e.className="drinks",t(r.id).appendChild(e)),e.textContent=`${r.drinks} 🍺`}$e=e});
//# sourceMappingURL=index.js.map
