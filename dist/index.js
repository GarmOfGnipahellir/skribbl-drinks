function e(e){return function(e){const t=document.getElementById("containerGamePlayers");for(const r of t.children)if(parseInt(r.id.replace("player",""))==e)return r}(e).children[1]}function t(t){return e(t).children[0]}function r(e,t="rgb(0, 0, 0)"){const r=document.createElement("span");r.textContent=e;const n=document.createElement("p");n.style.color=t,n.style.fontWeight="bold",n.appendChild(r),document.getElementById("boxMessages").appendChild(n)}var n;function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function i(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),r.push.apply(r,n)}return r}function a(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?i(Object(r),!0).forEach(function(t){o(e,t,r[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):i(Object(r)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))})}return e}!function(e){e[e.UNKNOWN=0]="UNKNOWN",e[e.GUESS=1]="GUESS",e[e.CORRECT_GUESS=2]="CORRECT_GUESS",e[e.TURN_ENDED=3]="TURN_ENDED",e[e.TURN_STARTED=4]="TURN_STARTED"}(n||(n={}));var u="function"==typeof Symbol&&Symbol.observable||"@@observable",c=function(){return Math.random().toString(36).substring(7).split("").join(".")},f={INIT:"@@redux/INIT"+c(),REPLACE:"@@redux/REPLACE"+c(),PROBE_UNKNOWN_ACTION:function(){return"@@redux/PROBE_UNKNOWN_ACTION"+c()}};function s(e){if("object"!=typeof e||null===e)return!1;for(var t=e;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}function l(e){return function(e){if(void 0===e)return"undefined";if(null===e)return"null";var t=typeof e;switch(t){case"boolean":case"string":case"number":case"symbol":case"function":return t}if(Array.isArray(e))return"array";if(function(e){return e instanceof Date||"function"==typeof e.toDateString&&"function"==typeof e.getDate&&"function"==typeof e.setDate}(e))return"date";if(function(e){return e instanceof Error||"string"==typeof e.message&&e.constructor&&"number"==typeof e.constructor.stackTraceLimit}(e))return"error";var r=function(e){return"function"==typeof e.constructor?e.constructor.name:null}(e);switch(r){case"Symbol":case"Promise":case"WeakMap":case"WeakSet":case"Map":case"Set":return r}return t.slice(8,-1).toLowerCase().replace(/\s/g,"")}(e)}function d(e,t,r){var n;if("function"==typeof t&&"function"==typeof r||"function"==typeof r&&"function"==typeof arguments[3])throw new Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");if("function"==typeof t&&void 0===r&&(r=t,t=void 0),void 0!==r){if("function"!=typeof r)throw new Error("Expected the enhancer to be a function. Instead, received: '"+l(r)+"'");return r(d)(e,t)}if("function"!=typeof e)throw new Error("Expected the root reducer to be a function. Instead, received: '"+l(e)+"'");var o=e,i=t,a=[],c=a,p=!1;function y(){c===a&&(c=a.slice())}function h(){if(p)throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");return i}function v(e){if("function"!=typeof e)throw new Error("Expected the listener to be a function. Instead, received: '"+l(e)+"'");if(p)throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");var t=!0;return y(),c.push(e),function(){if(t){if(p)throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");t=!1,y();var r=c.indexOf(e);c.splice(r,1),a=null}}}function g(e){if(!s(e))throw new Error("Actions must be plain objects. Instead, the actual type was: '"+l(e)+"'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.");if(void 0===e.type)throw new Error('Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');if(p)throw new Error("Reducers may not dispatch actions.");try{p=!0,i=o(i,e)}finally{p=!1}for(var t=a=c,r=0;r<t.length;r++)(0,t[r])();return e}function b(e){if("function"!=typeof e)throw new Error("Expected the nextReducer to be a function. Instead, received: '"+l(e));o=e,g({type:f.REPLACE})}function m(){var e,t=v;return(e={subscribe:function(e){if("object"!=typeof e||null===e)throw new Error("Expected the observer to be an object. Instead, received: '"+l(e)+"'");function r(){e.next&&e.next(h())}return r(),{unsubscribe:t(r)}}})[u]=function(){return this},e}return g({type:f.INIT}),(n={dispatch:g,subscribe:v,getState:h,replaceReducer:b})[u]=m,n}function p(e){"undefined"!=typeof console&&"function"==typeof console.error&&console.error(e);try{throw new Error(e)}catch(e){}}function y(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return 0===t.length?function(e){return e}:1===t.length?t[0]:t.reduce(function(e,t){return function(){return e(t.apply(void 0,arguments))}})}function h(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r];return function(e){return function(){var r=e.apply(void 0,arguments),n=function(){throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.")},o={getState:r.getState,dispatch:function(){return n.apply(void 0,arguments)}},i=t.map(function(e){return e(o)});return n=y.apply(void 0,i)(r.dispatch),a(a({},r),{},{dispatch:n})}}}function v(){}function g(e){for(var t=arguments.length,r=Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n];var o=ie[e],i=o?"function"==typeof o?o.apply(null,r):o:"unknown error nr: "+e;throw Error("[Immer] "+i)}function b(e){return!!e&&!!e[oe]}function m(e){return!!e&&(function(e){if(!e||"object"!=typeof e)return!1;var t=Object.getPrototypeOf(e);if(null===t)return!0;var r=Object.hasOwnProperty.call(t,"constructor")&&t.constructor;return r===Object||"function"==typeof r&&Function.toString.call(r)===ae}(e)||Array.isArray(e)||!!e[ne]||!!e.constructor[ne]||j(e)||x(e))}function w(e,t,r){void 0===r&&(r=!1),0===O(e)?(r?Object.keys:ue)(e).forEach(function(n){r&&"symbol"==typeof n||t(n,e[n],e)}):e.forEach(function(r,n){return t(n,r,e)})}function O(e){var t=e[oe];return t?t.i>3?t.i-4:t.i:Array.isArray(e)?1:j(e)?2:x(e)?3:0}function E(e,t){return 2===O(e)?e.has(t):Object.prototype.hasOwnProperty.call(e,t)}function S(e,t,r){var n=O(e);2===n?e.set(t,r):3===n?(e.delete(t),e.add(r)):e[t]=r}function P(e,t){return e===t?0!==e||1/e==1/t:e!=e&&t!=t}function j(e){return Z&&e instanceof Map}function x(e){return ee&&e instanceof Set}function T(e){return e.o||e.t}function A(e){if(Array.isArray(e))return Array.prototype.slice.call(e);var t=ce(e);delete t[oe];for(var r=ue(t),n=0;n<r.length;n++){var o=r[n],i=t[o];!1===i.writable&&(i.writable=!0,i.configurable=!0),(i.get||i.set)&&(t[o]={configurable:!0,writable:!0,enumerable:i.enumerable,value:e[o]})}return Object.create(Object.getPrototypeOf(e),t)}function k(e,t){return void 0===t&&(t=!1),N(e)||b(e)||!m(e)||(O(e)>1&&(e.set=e.add=e.clear=e.delete=I),Object.freeze(e),t&&w(e,function(e,t){return k(t,!0)},!0)),e}function I(){g(2)}function N(e){return null==e||"object"!=typeof e||Object.isFrozen(e)}function R(e){var t=fe[e];return t||g(18,e),t}function D(){return Q||g(0),Q}function _(e,t){t&&(R("Patches"),e.u=[],e.s=[],e.v=t)}function C(e){U(e),e.p.forEach(F),e.p=null}function U(e){e===Q&&(Q=e.l)}function M(e){return Q={p:[],l:Q,h:e,m:!0,_:0}}function F(e){var t=e[oe];0===t.i||1===t.i?t.j():t.O=!0}function L(e,t){t._=t.p.length;var r=t.p[0],n=void 0!==e&&e!==r;return t.h.g||R("ES5").S(t,e,n),n?(r[oe].P&&(C(t),g(4)),m(e)&&(e=z(t,e),t.l||K(t,e)),t.u&&R("Patches").M(r[oe],e,t.u,t.s)):e=z(t,r,[]),C(t),t.u&&t.v(t.u,t.s),e!==re?e:void 0}function z(e,t,r){if(N(t))return t;var n=t[oe];if(!n)return w(t,function(o,i){return G(e,n,t,o,i,r)},!0),t;if(n.A!==e)return t;if(!n.P)return K(e,n.t,!0),n.t;if(!n.I){n.I=!0,n.A._--;var o=4===n.i||5===n.i?n.o=A(n.k):n.o;w(3===n.i?new Set(o):o,function(t,i){return G(e,n,o,t,i,r)}),K(e,o,!1),r&&e.u&&R("Patches").R(n,r,e.u,e.s)}return n.o}function G(e,t,r,n,o,i){if(o===r&&g(5),b(o)){var a=z(e,o,i&&t&&3!==t.i&&!E(t.D,n)?i.concat(n):void 0);if(S(r,n,a),!b(a))return;e.m=!1}if(m(o)&&!N(o)){if(!e.h.F&&e._<1)return;z(e,o),t&&t.A.l||K(e,o)}}function K(e,t,r){void 0===r&&(r=!1),e.h.F&&e.m&&k(t,r)}function W(e,t){var r=e[oe];return(r?T(r):e)[t]}function $(e,t){if(t in e)for(var r=Object.getPrototypeOf(e);r;){var n=Object.getOwnPropertyDescriptor(r,t);if(n)return n;r=Object.getPrototypeOf(r)}}function B(e){e.P||(e.P=!0,e.l&&B(e.l))}function Y(e){e.o||(e.o=A(e.t))}function V(e,t,r){var n=j(t)?R("MapSet").N(t,r):x(t)?R("MapSet").T(t,r):e.g?function(e,t){var r=Array.isArray(e),n={i:r?1:0,A:t?t.A:D(),P:!1,I:!1,D:{},l:t,t:e,k:null,o:null,j:null,C:!1},o=n,i=se;r&&(o=[n],i=le);var a=Proxy.revocable(o,i),u=a.revoke,c=a.proxy;return n.k=c,n.j=u,c}(t,r):R("ES5").J(t,r);return(r?r.A:D()).p.push(n),n}function q(e){return b(e)||g(22,e),function e(t){if(!m(t))return t;var r,n=t[oe],o=O(t);if(n){if(!n.P&&(n.i<4||!R("ES5").K(n)))return n.t;n.I=!0,r=J(t,o),n.I=!1}else r=J(t,o);return w(r,function(t,o){n&&function(e,t){return 2===O(e)?e.get(t):e[t]}(n.t,t)===o||S(r,t,e(o))}),3===o?new Set(r):r}(e)}function J(e,t){switch(t){case 2:return new Map(e);case 3:return Array.from(e)}return A(e)}"string"==typeof v.name&&"isCrushed"!==v.name&&p('You are currently using minified code outside of NODE_ENV === "production". This means that you are running a slower development build of Redux. You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) to ensure you have the correct code for your production build.');var X,Q,H="undefined"!=typeof Symbol&&"symbol"==typeof Symbol("x"),Z="undefined"!=typeof Map,ee="undefined"!=typeof Set,te="undefined"!=typeof Proxy&&void 0!==Proxy.revocable&&"undefined"!=typeof Reflect,re=H?Symbol.for("immer-nothing"):((X={})["immer-nothing"]=!0,X),ne=H?Symbol.for("immer-draftable"):"__$immer_draftable",oe=H?Symbol.for("immer-state"):"__$immer_state",ie={0:"Illegal state",1:"Immer drafts cannot have computed properties",2:"This object has been frozen and should not be mutated",3:function(e){return"Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? "+e},4:"An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",5:"Immer forbids circular references",6:"The first or second argument to `produce` must be a function",7:"The third argument to `produce` must be a function or undefined",8:"First argument to `createDraft` must be a plain object, an array, or an immerable object",9:"First argument to `finishDraft` must be a draft returned by `createDraft`",10:"The given draft is already finalized",11:"Object.defineProperty() cannot be used on an Immer draft",12:"Object.setPrototypeOf() cannot be used on an Immer draft",13:"Immer only supports deleting array indices",14:"Immer only supports setting array indices and the 'length' property",15:function(e){return"Cannot apply patch, path doesn't resolve: "+e},16:'Sets cannot have "replace" patches.',17:function(e){return"Unsupported patch operation: "+e},18:function(e){return"The plugin for '"+e+"' has not been loaded into Immer. To enable the plugin, import and call `enable"+e+"()` when initializing your application."},20:"Cannot use proxies if Proxy, Proxy.revocable or Reflect are not available",21:function(e){return"produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '"+e+"'"},22:function(e){return"'current' expects a draft, got: "+e},23:function(e){return"'original' expects a draft, got: "+e},24:"Patching reserved attributes like __proto__, prototype and constructor is not allowed"},ae=""+Object.prototype.constructor,ue="undefined"!=typeof Reflect&&Reflect.ownKeys?Reflect.ownKeys:void 0!==Object.getOwnPropertySymbols?function(e){return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))}:Object.getOwnPropertyNames,ce=Object.getOwnPropertyDescriptors||function(e){var t={};return ue(e).forEach(function(r){t[r]=Object.getOwnPropertyDescriptor(e,r)}),t},fe={},se={get:function(e,t){if(t===oe)return e;var r=T(e);if(!E(r,t))return function(e,t,r){var n,o=$(t,r);return o?"value"in o?o.value:null===(n=o.get)||void 0===n?void 0:n.call(e.k):void 0}(e,r,t);var n=r[t];return e.I||!m(n)?n:n===W(e.t,t)?(Y(e),e.o[t]=V(e.A.h,n,e)):n},has:function(e,t){return t in T(e)},ownKeys:function(e){return Reflect.ownKeys(T(e))},set:function(e,t,r){var n=$(T(e),t);if(null==n?void 0:n.set)return n.set.call(e.k,r),!0;if(!e.P){var o=W(T(e),t),i=null==o?void 0:o[oe];if(i&&i.t===r)return e.o[t]=r,e.D[t]=!1,!0;if(P(r,o)&&(void 0!==r||E(e.t,t)))return!0;Y(e),B(e)}return e.o[t]===r&&"number"!=typeof r&&(void 0!==r||t in e.o)||(e.o[t]=r,e.D[t]=!0,!0)},deleteProperty:function(e,t){return void 0!==W(e.t,t)||t in e.t?(e.D[t]=!1,Y(e),B(e)):delete e.D[t],e.o&&delete e.o[t],!0},getOwnPropertyDescriptor:function(e,t){var r=T(e),n=Reflect.getOwnPropertyDescriptor(r,t);return n?{writable:!0,configurable:1!==e.i||"length"!==t,enumerable:n.enumerable,value:r[t]}:n},defineProperty:function(){g(11)},getPrototypeOf:function(e){return Object.getPrototypeOf(e.t)},setPrototypeOf:function(){g(12)}},le={};w(se,function(e,t){le[e]=function(){return arguments[0]=arguments[0][0],t.apply(this,arguments)}}),le.deleteProperty=function(e,t){return isNaN(parseInt(t))&&g(13),se.deleteProperty.call(this,e[0],t)},le.set=function(e,t,r){return"length"!==t&&isNaN(parseInt(t))&&g(14),se.set.call(this,e[0],t,r,e[0])};var de=new(function(){function e(e){var t=this;this.g=te,this.F=!0,this.produce=function(e,r,n){if("function"==typeof e&&"function"!=typeof r){var o=r;r=e;var i=t;return function(e){var t=this;void 0===e&&(e=o);for(var n=arguments.length,a=Array(n>1?n-1:0),u=1;u<n;u++)a[u-1]=arguments[u];return i.produce(e,function(e){var n;return(n=r).call.apply(n,[t,e].concat(a))})}}var a;if("function"!=typeof r&&g(6),void 0!==n&&"function"!=typeof n&&g(7),m(e)){var u=M(t),c=V(t,e,void 0),f=!0;try{a=r(c),f=!1}finally{f?C(u):U(u)}return"undefined"!=typeof Promise&&a instanceof Promise?a.then(function(e){return _(u,n),L(e,u)},function(e){throw C(u),e}):(_(u,n),L(a,u))}if(!e||"object"!=typeof e){if((a=r(e))===re)return;return void 0===a&&(a=e),t.F&&k(a,!0),a}g(21,e)},this.produceWithPatches=function(e,r){return"function"==typeof e?function(r){for(var n=arguments.length,o=Array(n>1?n-1:0),i=1;i<n;i++)o[i-1]=arguments[i];return t.produceWithPatches(r,function(t){return e.apply(void 0,[t].concat(o))})}:[t.produce(e,r,function(e,t){n=e,o=t}),n,o];var n,o},"boolean"==typeof(null==e?void 0:e.useProxies)&&this.setUseProxies(e.useProxies),"boolean"==typeof(null==e?void 0:e.autoFreeze)&&this.setAutoFreeze(e.autoFreeze)}var t=e.prototype;return t.createDraft=function(e){m(e)||g(8),b(e)&&(e=q(e));var t=M(this),r=V(this,e,void 0);return r[oe].C=!0,U(t),r},t.finishDraft=function(e,t){var r=e&&e[oe];r&&r.C||g(9),r.I&&g(10);var n=r.A;return _(n,t),L(void 0,n)},t.setAutoFreeze=function(e){this.F=e},t.setUseProxies=function(e){e&&!te&&g(20),this.g=e},t.applyPatches=function(e,t){var r;for(r=t.length-1;r>=0;r--){var n=t[r];if(0===n.path.length&&"replace"===n.op){e=n.value;break}}var o=R("Patches").$;return b(e)?o(e,t):this.produce(e,function(e){return o(e,t.slice(r+1))})},e}()),pe=de.produce;function ye(e,t){return e===t}function he(e,t,r){if(null===t||null===r||t.length!==r.length)return!1;for(var n=t.length,o=0;o<n;o++)if(!e(t[o],r[o]))return!1;return!0}function ve(e){return function(t){var r=t.dispatch,n=t.getState;return function(t){return function(o){return"function"==typeof o?o(r,n,e):t(o)}}}}de.produceWithPatches.bind(de),de.setAutoFreeze.bind(de),de.setUseProxies.bind(de),de.applyPatches.bind(de),de.createDraft.bind(de),de.finishDraft.bind(de),function(e){for(var t=arguments.length,r=Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n]}(function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:ye,r=null,n=null;return function(){return he(t,r,arguments)||(n=e.apply(null,arguments)),r=arguments,n}});var ge=ve();ge.withExtraArgument=ve;var be,me=(be=function(e,t){return(be=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}be(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),we=function(e,t){for(var r=0,n=t.length,o=e.length;r<n;r++,o++)e[o]=t[r];return e},Oe=Object.defineProperty,Ee=Object.prototype.hasOwnProperty,Se=Object.getOwnPropertySymbols,Pe=Object.prototype.propertyIsEnumerable,je=function(e,t,r){return t in e?Oe(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r},xe=function(e,t){for(var r in t||(t={}))Ee.call(t,r)&&je(e,r,t[r]);if(Se)for(var n=0,o=Se(t);n<o.length;n++)Pe.call(t,r=o[n])&&je(e,r,t[r]);return e},Te="undefined"!=typeof window&&window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__?window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__:function(){if(0!==arguments.length)return"object"==typeof arguments[0]?y:y.apply(null,arguments)};function Ae(e){if("object"!=typeof e||null===e)return!1;for(var t=e;null!==Object.getPrototypeOf(t);)t=Object.getPrototypeOf(t);return Object.getPrototypeOf(e)===t}function ke(e,t){var r=0;return{measureTime:function(e){var t=Date.now();try{return e()}finally{var n=Date.now();r+=n-t}},warnIfExceeded:function(){r>e&&console.warn(t+" took "+r+"ms, which is more than the warning threshold of "+e+"ms. \nIf your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.\nIt is disabled in production builds, so you don't need to worry about that.")}}}var Ie,Ne=function(e){function t(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];var o=e.apply(this,r)||this;return Object.setPrototypeOf(o,t.prototype),o}return me(t,e),Object.defineProperty(t,Symbol.species,{get:function(){return t},enumerable:!1,configurable:!0}),t.prototype.concat=function(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];return e.prototype.concat.apply(this,t)},t.prototype.prepend=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];return 1===e.length&&Array.isArray(e[0])?new(t.bind.apply(t,we([void 0],e[0].concat(this)))):new(t.bind.apply(t,we([void 0],e.concat(this))))},t}(Array);function Re(e,t){if(!e)throw new Error("Invariant failed: "+(t||""))}function De(e){return"object"!=typeof e||null==e||Object.isFrozen(e)}function _e(e,t,r){var n=Ce(e,t,r);return{detectMutations:function(){return Ue(e,t,n,r)}}}function Ce(e,t,r,n){void 0===t&&(t=[]),void 0===n&&(n="");var o={value:r};if(!e(r))for(var i in o.children={},r){var a=n?n+"."+i:i;t.length&&-1!==t.indexOf(a)||(o.children[i]=Ce(e,t,r[i],a))}return o}function Ue(e,t,r,n,o,i){void 0===t&&(t=[]),void 0===o&&(o=!1),void 0===i&&(i="");var a=r?r.value:void 0,u=a===n;if(o&&!u&&!Number.isNaN(n))return{wasMutated:!0,path:i};if(e(a)||e(n))return{wasMutated:!1};var c={};for(var f in r.children)c[f]=!0;for(var f in n)c[f]=!0;for(var f in c){var s=i?i+"."+f:f;if(!t.length||-1===t.indexOf(s)){var l=Ue(e,t,r.children[f],n[f],u,s);if(l.wasMutated)return l}}return{wasMutated:!1}}function Me(e){var t=typeof e;return"undefined"===t||null===e||"string"===t||"boolean"===t||"number"===t||Array.isArray(e)||Ae(e)}function Fe(e,t,r,n,o){var i;if(void 0===t&&(t=""),void 0===r&&(r=Me),void 0===o&&(o=[]),!r(e))return{keyPath:t||"<root>",value:e};if("object"!=typeof e||null===e)return!1;for(var a=null!=n?n(e):Object.entries(e),u=o.length>0,c=0,f=a;c<f.length;c++){var s=f[c],l=s[0],d=s[1],p=t?t+"."+l:l;if(!(u&&o.indexOf(p)>=0)){if(!r(d))return{keyPath:p,value:d};if("object"==typeof d&&(i=Fe(d,p,r,n,o)))return i}}return!1}function Le(e){return"boolean"==typeof e}function ze(e,t){function r(){for(var r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];if(t){var o=t.apply(void 0,r);if(!o)throw new Error("prepareAction did not return an object");return xe(xe({type:e,payload:o.payload},"meta"in o&&{meta:o.meta}),"error"in o&&{error:o.error})}return{type:e,payload:r[0]}}return r.toString=function(){return""+e},r.type=e,r.match=function(t){return t.type===e},r}function Ge(e){var t,r={},n=[],o={addCase:function(e,i){if(n.length>0)throw new Error("`builder.addCase` should only be called before calling `builder.addMatcher`");if(t)throw new Error("`builder.addCase` should only be called before calling `builder.addDefaultCase`");var a="string"==typeof e?e:e.type;if(a in r)throw new Error("addCase cannot be called with two reducers for the same action type");return r[a]=i,o},addMatcher:function(e,r){if(t)throw new Error("`builder.addMatcher` should only be called before calling `builder.addDefaultCase`");return n.push({matcher:e,reducer:r}),o},addDefaultCase:function(e){if(t)throw new Error("`builder.addDefaultCase` can only be called once");return t=e,o}};return e(o),[r,n,t]}!function(e){e[e.PRE_TURN=0]="PRE_TURN",e[e.TAKING_TURN=1]="TAKING_TURN"}(Ie||(Ie={}));const Ke=function(e){var t=e.name,r=e.initialState;if(!t)throw new Error("`name` is a required option for createSlice");var n=e.reducers||{},o="function"==typeof e.extraReducers?Ge(e.extraReducers):[e.extraReducers],i=o[0],a=void 0===i?{}:i,u=o[1],c=void 0===u?[]:u,f=o[2],s=void 0===f?void 0:f,l=Object.keys(n),d={},p={},y={};l.forEach(function(e){var r,o,i=n[e],a=t+"/"+e;"reducer"in i?(r=i.reducer,o=i.prepare):r=i,d[e]=r,p[a]=r,y[e]=o?ze(a,o):ze(a)});var h=function(e,t,r,n){void 0===r&&(r=[]),function(){function e(e,t){var r=i[e];return r?r.enumerable=t:i[e]=r={configurable:!0,enumerable:t,get:function(){var t=this[oe];return o(t),se.get(t,e)},set:function(t){var r=this[oe];o(r),se.set(r,e,t)}},r}function t(e){for(var t=e.length-1;t>=0;t--){var o=e[t][oe];if(!o.P)switch(o.i){case 5:n(o)&&B(o);break;case 4:r(o)&&B(o)}}}function r(e){for(var t=e.t,r=e.k,n=ue(r),o=n.length-1;o>=0;o--){var i=n[o];if(i!==oe){var a=t[i];if(void 0===a&&!E(t,i))return!0;var u=r[i],c=u&&u[oe];if(c?c.t!==a:!P(u,a))return!0}}var f=!!t[oe];return n.length!==ue(t).length+(f?0:1)}function n(e){var t=e.k;if(t.length!==e.t.length)return!0;var r=Object.getOwnPropertyDescriptor(t,t.length-1);return!(!r||r.get)}function o(e){e.O&&g(3,JSON.stringify(T(e)))}var i={};!function(e,t){fe.ES5||(fe.ES5=t)}(0,{J:function(t,r){var n=Array.isArray(t),o=function(t,r){if(t){for(var n=Array(r.length),o=0;o<r.length;o++)Object.defineProperty(n,""+o,e(o,!0));return n}var i=ce(r);delete i[oe];for(var a=ue(i),u=0;u<a.length;u++){var c=a[u];i[c]=e(c,t||!!i[c].enumerable)}return Object.create(Object.getPrototypeOf(r),i)}(n,t),i={i:n?5:4,A:r?r.A:D(),P:!1,I:!1,D:{},l:r,t,k:o,o:null,O:!1,C:!1};return Object.defineProperty(o,oe,{value:i,writable:!0}),o},S:function(e,r,o){o?b(r)&&r[oe].A===e&&t(e.p):(e.u&&function e(t){if(t&&"object"==typeof t){var r=t[oe];if(r){var o=r.t,i=r.k,a=r.D,u=r.i;if(4===u)w(i,function(t){t!==oe&&(void 0!==o[t]||E(o,t)?a[t]||e(i[t]):(a[t]=!0,B(r)))}),w(o,function(e){void 0!==i[e]||E(i,e)||(a[e]=!1,B(r))});else if(5===u){if(n(r)&&(B(r),a.length=!0),i.length<o.length)for(var c=i.length;c<o.length;c++)a[c]=!1;else for(var f=o.length;f<i.length;f++)a[f]=!0;for(var s=Math.min(i.length,o.length),l=0;l<s;l++)void 0===a[l]&&e(i[l])}}}}(e.p[0]),t(e.p))},K:function(e){return 4===e.i?r(e):n(e)}})}();var o="function"==typeof t?Ge(t):[t,r,n],i=o[0],a=o[1],u=o[2],c=pe(e,function(){});return function(e,t){void 0===e&&(e=c);var r=we([i[t.type]],a.filter(function(e){return(0,e.matcher)(t)}).map(function(e){return e.reducer}));return 0===r.filter(function(e){return!!e}).length&&(r=[u]),r.reduce(function(e,r){if(r){var n;if(b(e))return void 0===(n=r(e,t))?e:n;if(m(e))return pe(e,function(e){return r(e,t)});if(void 0===(n=r(e,t))){if(null===e)return e;throw Error("A case reducer on a non-draftable value must not return undefined")}return n}return e},e)}}(r,xe(xe({},a),p),c,s);return{name:t,reducer:h,actions:y,caseReducers:d}}({name:"game",initialState:{turnState:Ie.PRE_TURN,players:[]},reducers:{playerAdded:(e,t)=>{e.players.push({id:t.payload.id,name:t.payload.name,drinks:0})},playerGuessed:(e,t)=>{for(let r=0;r<e.players.length;r++)e.players[r].name==t.payload&&(e.players[r].drinks+=1)},turnStarted:e=>{e.turnState=Ie.TAKING_TURN;for(const t of e.players)t.drinks=0},turnEnded:e=>{e.turnState=Ie.PRE_TURN}}}),{playerAdded:We,playerGuessed:$e,turnStarted:Be,turnEnded:Ye}=Ke.actions,Ve=function(e){var t,r=function(e){return function(e){void 0===e&&(e={});var t=e.thunk,r=void 0===t||t,n=e.immutableCheck,o=void 0===n||n,i=e.serializableCheck,a=void 0===i||i,u=new Ne;if(r&&(Le(r)?u.push(ge):u.push(ge.withExtraArgument(r.extraArgument))),o){var c={};Le(o)||(c=o),u.unshift(function(e){void 0===e&&(e={});var t=e.isImmutable,r=e.ignoredPaths,n=e.warnAfter,o=void 0===n?32:n,i=_e.bind(null,void 0===t?De:t,r=r||e.ignore);return function(e){var t,r=e.getState,n=r(),a=i(n);return function(e){return function(u){var c=ke(o,"ImmutableStateInvariantMiddleware");c.measureTime(function(){n=r(),t=a.detectMutations(),a=i(n),Re(!t.wasMutated,"A state mutation was detected between dispatches, in the path '"+(t.path||"")+"'.  This may cause incorrect behavior. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)")});var f=e(u);return c.measureTime(function(){var e,o,c;n=r(),t=a.detectMutations(),a=i(n),t.wasMutated&&Re(!t.wasMutated,"A state mutation was detected inside a dispatch, in the path: "+(t.path||"")+". Take a look at the reducer(s) handling the action "+JSON.stringify(u,(o=[],c=[],(e=void 0)||(e=function(e,t){return o[0]===t?"[Circular ~]":"[Circular ~."+c.slice(0,o.indexOf(t)).join(".")+"]"}),function(t,r){if(o.length>0){var n=o.indexOf(this);~n?o.splice(n+1):o.push(this),~n?c.splice(n,Infinity,t):c.push(t),~o.indexOf(r)&&(r=e.call(this,t,r))}else o.push(r);return r}),void 0)+". (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)")}),c.warnIfExceeded(),f}}}}(c))}if(a){var f={};Le(a)||(f=a),u.push(function(e){void 0===e&&(e={});var t=e.isSerializable,r=void 0===t?Me:t,n=e.getEntries,o=e.ignoredActions,i=void 0===o?[]:o,a=e.ignoredActionPaths,u=void 0===a?["meta.arg","meta.baseQueryMeta"]:a,c=e.ignoredPaths,f=void 0===c?[]:c,s=e.warnAfter,l=void 0===s?32:s,d=e.ignoreState,p=void 0!==d&&d;return function(e){return function(t){return function(o){if(i.length&&-1!==i.indexOf(o.type))return t(o);var a=ke(l,"SerializableStateInvariantMiddleware");a.measureTime(function(){var e=Fe(o,"",r,n,u);e&&console.error("A non-serializable value was detected in an action, in the path: `"+e.keyPath+"`. Value:",e.value,"\nTake a look at the logic that dispatched this action: ",o,"\n(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)","\n(To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)")});var c=t(o);return p||(a.measureTime(function(){var t=Fe(e.getState(),"",r,n,f);t&&console.error("A non-serializable value was detected in the state, in the path: `"+t.keyPath+"`. Value:",t.value,"\nTake a look at the reducer(s) handling this action type: "+o.type+".\n(See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)")}),a.warnIfExceeded()),c}}}}(f))}return u}(e)},n={reducer:Ke.reducer}||{},o=n.reducer,i=void 0===o?void 0:o,a=n.middleware,u=void 0===a?r():a,c=n.devTools,v=void 0===c||c,g=n.preloadedState,b=void 0===g?void 0:g,m=n.enhancers,w=void 0===m?void 0:m;if("function"==typeof i)t=i;else{if(!Ae(i))throw new Error('"reducer" is a required argument, and must be a function or an object of functions that can be passed to combineReducers');t=function(e){for(var t=Object.keys(e),r={},n=0;n<t.length;n++){var o=t[n];void 0===e[o]&&p('No reducer provided for key "'+o+'"'),"function"==typeof e[o]&&(r[o]=e[o])}var i,a,u=Object.keys(r);i={};try{!function(e){Object.keys(e).forEach(function(t){var r=e[t];if(void 0===r(void 0,{type:f.INIT}))throw new Error('The slice reducer for key "'+t+"\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");if(void 0===r(void 0,{type:f.PROBE_UNKNOWN_ACTION()}))throw new Error('The slice reducer for key "'+t+"\" returned undefined when probed with a random type. Don't try to handle '"+f.INIT+'\' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.')})}(r)}catch(e){a=e}return function(e,t){if(void 0===e&&(e={}),a)throw a;var n=function(e,t,r,n){var o=Object.keys(t),i=r&&r.type===f.INIT?"preloadedState argument passed to createStore":"previous state received by the reducer";if(0===o.length)return"Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";if(!s(e))return"The "+i+' has unexpected type of "'+l(e)+'". Expected argument to be an object with the following keys: "'+o.join('", "')+'"';var a=Object.keys(e).filter(function(e){return!t.hasOwnProperty(e)&&!n[e]});return a.forEach(function(e){n[e]=!0}),r&&r.type===f.REPLACE?void 0:a.length>0?"Unexpected "+(a.length>1?"keys":"key")+' "'+a.join('", "')+'" found in '+i+'. Expected to find one of the known reducer keys instead: "'+o.join('", "')+'". Unexpected keys will be ignored.':void 0}(e,r,t,i);n&&p(n);for(var o=!1,c={},d=0;d<u.length;d++){var y=u[d],h=e[y],v=(0,r[y])(h,t);if(void 0===v){var g=t&&t.type;throw new Error("When called with an action of type "+(g?'"'+String(g)+'"':"(unknown type)")+', the slice reducer for key "'+y+'" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.')}c[y]=v,o=o||v!==h}return(o=o||u.length!==Object.keys(e).length)?c:e}}(i)}var O=u;if("function"==typeof O&&(O=O(r),!Array.isArray(O)))throw new Error("when using a middleware builder function, an array of middleware must be returned");if(O.some(function(e){return"function"!=typeof e}))throw new Error("each middleware provided to configureStore must be a function");var E=h.apply(void 0,O),S=y;v&&(S=Te(xe({trace:!0},"object"==typeof v&&v)));var P=[E];return Array.isArray(w)?P=we([E],w):"function"==typeof w&&(P=w(P)),d(t,b,S.apply(void 0,P))}();var qe="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function Je(e){var t={exports:{}};return e(t,t.exports),t.exports}var Xe=Je(function(e){var t,r;t=qe,r=function(){var e=function(){},t="undefined",r=typeof window!==t&&typeof window.navigator!==t&&/Trident\/|MSIE /.test(window.navigator.userAgent),n=["trace","debug","info","warn","error"];function o(e,t){var r=e[t];if("function"==typeof r.bind)return r.bind(e);try{return Function.prototype.bind.call(r,e)}catch(t){return function(){return Function.prototype.apply.apply(r,[e,arguments])}}}function i(){console.log&&(console.log.apply?console.log.apply(console,arguments):Function.prototype.apply.apply(console.log,[console,arguments])),console.trace&&console.trace()}function a(n){return"debug"===n&&(n="log"),typeof console!==t&&("trace"===n&&r?i:void 0!==console[n]?o(console,n):void 0!==console.log?o(console,"log"):e)}function u(t,r){for(var o=0;o<n.length;o++){var i=n[o];this[i]=o<t?e:this.methodFactory(i,t,r)}this.log=this.debug}function c(e,r,n){return function(){typeof console!==t&&(u.call(this,r,n),this[e].apply(this,arguments))}}function f(e,t,r){return a(e)||c.apply(this,arguments)}function s(e,r,o){var i,a=this,c="loglevel";function s(){var e;if(typeof window!==t&&c){try{e=window.localStorage[c]}catch(e){}if(typeof e===t)try{var r=window.document.cookie,n=r.indexOf(encodeURIComponent(c)+"=");-1!==n&&(e=/^([^;]+)/.exec(r.slice(n))[1])}catch(e){}return void 0===a.levels[e]&&(e=void 0),e}}"string"==typeof e?c+=":"+e:"symbol"==typeof e&&(c=void 0),a.name=e,a.levels={TRACE:0,DEBUG:1,INFO:2,WARN:3,ERROR:4,SILENT:5},a.methodFactory=o||f,a.getLevel=function(){return i},a.setLevel=function(r,o){if("string"==typeof r&&void 0!==a.levels[r.toUpperCase()]&&(r=a.levels[r.toUpperCase()]),!("number"==typeof r&&r>=0&&r<=a.levels.SILENT))throw"log.setLevel() called with invalid level: "+r;if(i=r,!1!==o&&function(e){var r=(n[e]||"silent").toUpperCase();if(typeof window!==t&&c){try{return void(window.localStorage[c]=r)}catch(e){}try{window.document.cookie=encodeURIComponent(c)+"="+r+";"}catch(e){}}}(r),u.call(a,r,e),typeof console===t&&r<a.levels.SILENT)return"No console available for logging"},a.setDefaultLevel=function(e){s()||a.setLevel(e,!1)},a.enableAll=function(e){a.setLevel(a.levels.TRACE,e)},a.disableAll=function(e){a.setLevel(a.levels.SILENT,e)};var l=s();null==l&&(l=null==r?"WARN":r),a.setLevel(l,!1)}var l=new s,d={};l.getLogger=function(e){if("symbol"!=typeof e&&"string"!=typeof e||""===e)throw new TypeError("You must supply a name when creating a logger.");var t=d[e];return t||(t=d[e]=new s(e,l.getLevel(),l.methodFactory)),t};var p=typeof window!==t?window.log:void 0;return l.noConflict=function(){return typeof window!==t&&window.log===l&&(window.log=p),l},l.getLoggers=function(){return d},l.default=l,l},e.exports?e.exports=r():t.log=r()}),Qe=Je(function(e){var t,r;t=qe,r=function(e){var t,r,n={template:"[%t] %l:",levelFormatter:function(e){return e.toUpperCase()},nameFormatter:function(e){return e||"root"},timestampFormatter:function(e){return e.toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/,"$1")},format:void 0},o={},i={reg:function(e){if(!e||!e.getLogger)throw new TypeError("Argument is not a root logger");t=e},apply:function(e,r){if(!e||!e.setLevel)throw new TypeError("Argument is not a logger");var i=e.methodFactory,a=e.name||"",u=o[a]||o[""]||n;return o[a]||(e.methodFactory=function(e,t,r){var n=i(e,t,r),u=o[r]||o[""],c=-1!==u.template.indexOf("%t"),f=-1!==u.template.indexOf("%l"),s=-1!==u.template.indexOf("%n");return function(){for(var t="",i=arguments.length,l=Array(i),d=0;d<i;d++)l[d]=arguments[d];if(a||!o[r]){var p=u.timestampFormatter(new Date),y=u.levelFormatter(e),h=u.nameFormatter(r);u.format?t+=u.format(y,h,p):(t+=u.template,c&&(t=t.replace(/%t/,p)),f&&(t=t.replace(/%l/,y)),s&&(t=t.replace(/%n/,h))),l.length&&"string"==typeof l[0]?l[0]=t+" "+l[0]:l.unshift(t)}n.apply(void 0,l)}}),(r=r||{}).template&&(r.format=void 0),o[a]=function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(t in arguments[r])Object.prototype.hasOwnProperty.call(arguments[r],t)&&(e[t]=arguments[r][t]);return e}({},u,r),e.setLevel(e.getLevel()),t||e.warn("It is necessary to call the function reg() of loglevel-plugin-prefix before calling apply. From the next release, it will throw an error. See more: https://github.com/kutuluk/loglevel-plugin-prefix/blob/master/README.md"),e}};return e&&(r=e.prefix,i.noConflict=function(){return e.prefix===i&&(e.prefix=r),i}),i},e.exports?e.exports=r():t.prefix=r(t)});Xe.setDefaultLevel("TRACE"),Qe.reg(Xe),Qe.apply(Xe);const He=document.getElementById("screenGame"),Ze=document.getElementById("boxMessages");function et(e){Xe.info(`Message added: ${e}`);const t=function(e){let t;return t=/The word was '.+'/g.exec(e),t?{type:n.TURN_ENDED,player:"unknown"}:(t=/(.+?) is drawing now!/g.exec(e),t?{type:n.TURN_STARTED,player:t[1]}:(t=/^(.+?): .*/g.exec(e),t?{type:n.GUESS,player:t[1]}:{type:n.UNKNOWN,player:"unknown"}))}(e);switch(Xe.info(`Message parsed: ${t}`),t.type){case n.GUESS:Xe.info(`${t.player} made a guess!`),Ve.dispatch($e(t.player));break;case n.TURN_ENDED:Ve.dispatch(Ye());break;case n.TURN_STARTED:Ve.dispatch(Be())}}new MutationObserver(()=>{"none"!==He.style.display&&(function(){Xe.info("Game started!");for(const e of function(){const e=document.getElementById("containerGamePlayers"),t=[];for(const r of e.children)t.push(parseInt(r.id.replace("player","")));return t}()){const r=t(e);let n=r.textContent;"rgb(0, 0, 255)"==r.style.color&&(n=n.slice(0,-6)),Ve.dispatch(We({id:e,name:n}))}}(),new MutationObserver(e=>{for(const t of e)for(const e of t.addedNodes)et(e.textContent)}).observe(Ze,{childList:!0}))}).observe(He,{attributes:!0}),function(){const e=document.createElement("div");e.id="drinksWaterMark",e.style.position="fixed",e.style.top="9px",e.style.right="9px",e.style.fontSize="48px",e.style.color="#ffffff",e.textContent="Drinks 🍺",document.body.appendChild(e)}();let tt=Ve.getState();Ve.subscribe(()=>{const t=Ve.getState();if(Xe.debug("new state: "+t),t.turnState!=tt.turnState)switch(t.turnState){case Ie.TAKING_TURN:Xe.info("Turn started!");break;case Ie.PRE_TURN:!function(){Xe.info("Turn ended!");for(const e of Ve.getState().players)r(`${e.name} drinks ${e.drinks}!`)}()}for(const r of t.players){let t=e(r.id).children[2];null==t&&(t=document.createElement("div"),t.className="drinks",e(r.id).appendChild(t)),t.textContent=`${r.drinks} 🍺`}tt=t});
//# sourceMappingURL=index.js.map
