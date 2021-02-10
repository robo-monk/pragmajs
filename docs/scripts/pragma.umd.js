!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).pragma={})}(this,(function(t){"use strict";function e(t,e=null,n=["rerun the code 10 times"],i=null,r=!1){if(!E()&&!r)return null;console.error(`%c 🧯 pragma.js  %c \n\n      encountered a soft error 🔫 %c \n\n      \n${i?`Triggered by: [${i.key} ${i}]`:""}\n      \n${t} %c\n\n      \n${null!=e?`Potential ${e}: \n\t${n.join("\n\t")}`:""}\n      `,"font-size:15px","font-size: 12px;","color:whitesmoke","color:white")}function n(){if(!E())return null;console.log(...arguments)}function i(){if(!E())return null;console.log("%c 🌴 [pragma] \n\n      ","font-size:12px; color:#86D787;",...arguments,"\n")}class r{constructor(t){this.self=t,this.actions=new Map,this.delete=this.destroy}addWithKey(t,e=null){e=e||this.actions.size,this.actions.set(e,t)}add(...t){for(let e of t)this.addWithKey(e)}forAction(t){for(let[e,n]of this.actions)t(e,n)}exec(...t){this.execAs(this.self,...t)}destroy(...t){t.forEach((t=>this.actions.delete(t)))}execAs(t,...e){this.forAction((function(n,i){i.bind(t)(...e)}))}}function s(){return Math.random().toString(36).substring(3,6)+Math.random().toString(36).substring(5,8)}function o(){return a(8)}function a(t=7){return t<5?s():(s()+a(t-5)).substring(0,t)}function l(t){return a(t)}function h(t,e){for(let[n,i]of Object.entries(e))t[n]=i;return t}const c=t=>t.replace(/([-_]\w)/g,(t=>t[1].toUpperCase()));function u(t,e,n){for(let i of n||Object.keys(e)){let n=Object.getOwnPropertyDescriptor(e,i);if(!n)break;Object.defineProperty(t,i,n)}}function f(t,e){let n=`${t}Chain`,i=`on${t.capitalize()}`;return e[n]=new r(e),e[i]=function(t,i){e[n].addWithKey(t,i)},{chainName:n,eventName:i}}function d(t,...e){for(let n of e)f(n,t)}function p(t,e){let n=f(t,e),i=`is${t.capitalize()}ed`;e[n.chainName].add((()=>{e[i]=!0})),e[n.eventName]=function(t){if(e[i])return t(e);e[n.chainName].add(t)}}function m(t,...e){for(let n of e)p(n,t)}String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)};const g=t=>t.toString().replace(/[^a-z0-9]/gi,"-").toLowerCase();globalThis.pragmaSpace||(globalThis.pragmaSpace={}),m(globalThis.pragmaSpace,"docLoad");const y=globalThis.pragmaSpace.onDocLoad;function b(){globalThis.pragmaSpace.isDocLoaded||(i("📰 document is loaded."),globalThis.pragmaSpace.docLoadChain.exec())}document.addEventListener("readystatechange",(()=>{"complete"===document.readyState&&b()})),document.addEventListener("turbolinks:load",(()=>{i("🚀 TURBOLINKS loaded"),b()}));var x=/[#.]/g;function v(t,e="div"){var n=t||"",i={tag:e},r=0;let s,o,a;for(;r<n.length;)x.lastIndex=r,a=x.exec(n),s=n.slice(r,a?a.index:n.length),s&&(o?"#"===o?i.id=s:i.class?i.class.push(s):i.class=[s]:i.tag=s,r+=s.length),a&&(o=a[0],r++);return i}function C(t,n,i){if(!Array.isArray(t))return e(`Could not ${i} class [${t}] -> [${n}]`);for(let e of t){let t=e.split(" ");t.length>1?C(t,n,i):n.classList[i](e)}}function A(t,e){C(t,e,"add")}function _(t,e){C(t,e,"remove")}function T(t,e){C(t,e,"toggle")}function M(t){try{let e=document.querySelector(t);if(e)return e}catch{}let e=v(t),n=document.createElement(e.tag||"div");return e.id&&(n.id=e.id),e.class&&A(e.class,n),n}function w(t){return document.createRange().createContextualFragment(t)}function O(t){return t instanceof Element?t:"string"==typeof t?"<"===t[0]?w(t):M(t):e(`Could not find/create element from [${t}]`)}const S={html:(t,e)=>{e.innerHTML=t},pcss:(t,e)=>{for(let[n,i]of $.cssToDict(t))e.style[c(n)]=i}},$={cssToDict:t=>{t=t.replace(/\n/g,";").replace(/:/g," ");let n=new Map;for(let e of t.split(";")){if(e.replace(/\s/g,"").length<2)continue;e=e.trim().split(" ");let t=e[0];e.shift(),n.set(t.trim(),e.join(" ").trim())}let i=[];for(const[t,e]of n.entries())CSS.supports(t,e)||i.push(`${t.trim()}: ${e.trim()}`);return i.length>0&&e("CSS syntax error","typos",i),n},css:t=>{let e="";for(let[n,i]of $.cssToDict(t))e+=`${n}:${i};`;return e},html:t=>t};function E(){return globalThis.pragmaSpace.dev}globalThis.pragmaSpace||(globalThis.pragmaSpace={}),globalThis.pragmaSpace.dev=globalThis.pragmaSpace.dev||"undefined"!=typeof process&&process.env&&"development"===process.env.NODE_ENV;var j=Object.freeze({__proto__:null,_deving:E,throwSoft:e,log:n,suc:i,whenDOM:y,parseQuery:v,addClassAryTo:A,removeClassAryFrom:_,toggleClassAryOf:T,selectOrCreateDOM:M,elementFrom:O,toHTMLAttr:g,fragmentFromString:w,fillSVG:function(t,e){L(t).findAll("path").forEach((t=>{const n=t.attr("fill");"none"!=n&&"transparent"!=n&&t.attr("fill",e)}))},generateRandomKey:l,objDiff:h,aryDiff:function(t,e){return t.filter((t=>e.indexOf(t)<0))},_extend:function(t,e){Object.setPrototypeOf(t,h(Object.getPrototypeOf(t),e))},createEventChains:m,createChains:d,snake2camel:c,mimic:u,bench:function(t,e){console.time(e),t(),console.timeEnd(e)},rk:a,rk5:s,rk8:o,parse:$,apply:S,createTemplate:t=>(new q).run((function(){d(this,"config"),this.config=function(t){return this.configChain.exec(t),this},this.onConfig(((t={})=>{["events","chains","exports","persistentExports"].forEach((e=>{t[e]&&(this[`_${e}`]=t[e],delete t[e])})),this._events&&m(this,...this._events),this._chains&&d(this,...this._chains);for(let[e,n]of Object.entries(t))this[e]=n,this.export(e);this._exports&&this.export(...this._exports)})),this.export("exports","config","exportChain","configChain","onConfig")}),(function(){"object"==typeof t&&this.config(t)}))});function k(t){if(null==t||null==t)return e(`Could not find a DOM element for ${t}`);if(t.element)return k(t.element);return O(t)}function L(t,e){let n=k(t);var i,r;return n.constructor===DocumentFragment&&(i=n,(r=document.createElement("template")).appendChild(i.cloneNode(!0)),n=r.firstChild),n instanceof Element&&(n.init(),n._render()),"string"==typeof e&&n.html(e),n}const D={init:function(){this.isPragmaElement=!0,m(this,"docLoad","render"),y((()=>this.docLoadChain.exec(this)))},_render:function(){this.renderChain.exec(this)},appendTo:function(t){return this.onDocLoad((()=>{this._parentElement=k(t),this._parentElement.appendChild(this),this._render()})),this},prependTo:function(t){return this.onDocLoad((()=>{this._parentElement=k(t),this._parentElement.prepend(this),this._render()})),this},append:function(...t){return this.onRender((()=>{for(let e of t){let t=k(e);this.appendChild(t)}})),this},destroy:function(){this.onRender((()=>{this.parentElement&&this.parentElement.removeChild(this)}))},css:function(t){return this.onRender((()=>{S.pcss(t,this)})),this},html:function(t){return t?(this.onRender((()=>{S.html(t,this)})),this):this.innerHTML},setId:function(t){return this.id=t,this},setData:function(t){for(let[e,n]of Object.entries(t))this.dataset[e]=n;return this},getData:function(t){return this.dataset[t]},addClass:function(...t){return A(t,this),this},removeClass:function(...t){return _(t,this),this},toggleClass:function(...t){return T(t,this),this},listenTo:function(...t){return this.onRender((()=>{this.addEventListener(...t)})),this},attr:function(t,e){if("string"==typeof t){if(void 0===e)return this.getAttribute(t);const n=t;(t={})[n]=e}for(let[e,n]of Object.entries(t))this.setAttribute(e,n);return this},find:function(){return L(this.query(...arguments))},findAll:function(t){return Array.from(this.queryAll(t)).map((t=>L(t)))},query:function(){return this.querySelector(...arguments)},queryAll:function(t){return this.querySelectorAll(t)},hide:function(){return this.style.display="none",this},show:function(){return this.style.display="",this},deepQueryAll:function(t){let e=Array.from(this.queryAll(t));for(let n of this.children)e=e.concat(n.deepQueryAll(t));return e},deepFindAll:function(t){return this.deepQueryAll(t).map((t=>L(t)))},rect:function(){return"function"==typeof this.getBoundingClientRect?this.getBoundingClientRect():{}},offset:function(){var t=this.rect();return{top:t.top+window.scrollY,left:t.left+window.scrollX}},x:function(t){return this.left+this.width/2-t/2}},P={top:function(){return this.offset().top},left:function(){return this.offset().left},width:function(){return this.rect().width},height:function(){return this.rect().height},text:function(){return this.textContent},classArray:function(){return Array.from(this.classList)},childrenArray:function(){return Array.from(this.children)}};for(let[t,e]of Object.entries(D))Element.prototype[t]=e;for(let[t,e]of Object.entries(P))Object.defineProperty(Element.prototype,t,{get:e,configurable:!0});class R{constructor(t){this._childMap=new Map,this.key="string"==typeof t?t:o(),this.containsKey=this.childMap.has}set childMap(t){for(let[e,n]of t)n instanceof R&&this.add(n)}get childMap(){return this._childMap}get kidsum(){return this.childMap.size}get hasKids(){return this.kidsum>0}get shape(){return this.shapePrefix()}get master(){return null==this.parent||null==this.parent.parent?this.parent:this.parent.master}get children(){return Array.from(this.childMap.values())}get depthKey(){return this.parent?this.parent.depthKey+"<~<"+this.key:this.key}get allChildren(){if(!this.hasKids)return null;let t=this.children;for(let e of t){let n=e.allChildren;n&&(t=t.concat(n))}return t}get(t){return this.childMap.get(t)}find(t){if(this.childMap.has(t))return this.childMap.get(t);for(let e of this.childMap.values()){let n=e.find(t);if(n)return n}}adopt(...t){for(let e of t)this.add(e);return this}add(t,n=!1){return t?!n&&this.childMap.has(t.key)?(t.key=`${t.key}<${s()}`,this.add(t)):(t.parent=this,void this.childMap.set(t.key,t)):e(`Could not add [${t}] to [${this.id}]`)}delete(t){return this.remove(t)}remove(t){this.childMap.get(t)&&this.childMap.delete(t)}shapePrefix(t=""){let e=`${t}| ${this.type} - ${this.key} \n`;if(this.hasKids){t+="| ";for(let n of this.children)e+=n.shapePrefix(t)}return e}}const K={parent:(t,e)=>{t.parent=e},value:(t,e)=>{t.value=e},key:(t,e)=>{t.key=e},class:(t,e)=>{t._class=e},element:(t,n)=>{if(!(n instanceof Element))return e(`Could not add ${n} as the element of [${t}]`);t.element=n},children:(t,e)=>{if(e.constructor==Array)return t.buildAry(e);t.build(e)},childTemplate:(t,e)=>{}};function z(t,e){return{val:t,set:e}}function N(t,n,i){if(!n)return z(t,!0);if(i)return z(function(t,n){return function(t){return null!=t.min&&null!=t.max}(n)?t=(t=t>n.max?n.min:t)<n.min?n.max:t:e(`Could not loop value, since range (${JSON.stringify(n)}) is unbounded`)}(t,n),!0);let r=function(t,e){return t=e.min?Math.max(e.min,t):t,e.max?Math.min(e.max,t):t}(t,n);return z(r,r==t)}class q extends R{constructor(t,e){super(),m(this,"export"),this.actionChain=new r,"object"==typeof t?function(t,e){let n=new Map;for(let[i,r]of Object.entries(t))K.hasOwnProperty(i)?K[i](e,r):n.set(i,r);e.element&&e.element.whenInDOM((t=>{for(let[i,r]of n)if(i=i.toLowerCase(),i.includes("on")){let n=i.split("on")[1].trim();t.listenTo(n,(()=>{e.action(r)}))}}))}(t,this):this.key=t,this.element||this.as()}get _e(){return this.element}setElement(t,e=!0){return this.elementDOM=t,e&&this.element.id&&(this.id=this.element.id),this}get element(){return this.elementDOM}set element(t){this.setElement(t)}setRange(t=null,e=null){return this.range=this.range||{},this.range.min=null===t?this.range.min:t,this.range.max=null===e?this.range.max:e,this}breakLoop(){return this._loopVal=!1,this}setLoop(t,e){return this.setRange(t,e),this._loopVal=!0,this}get dv(){return this.v-this._lv}get value(){return this.v}setValue(t){return this.value=t,this}set value(t){let e=N(t,this.range,this._loopVal);e.set&&(this._lv=this.v,this.v=e.val,this.exec())}exec(){return this.actionChain.execAs(this,...arguments),this}setKey(t){return this.key=t,this}set key(t){this._KEY=null==t?l():t}get key(){return this._KEY}set id(t){this.element&&(this.element.id=this.id)}get id(){return g(this.key)}buildAry(t){for(let e of t)this.add(new q(e,this));return this}build(...t){return this.buildAry(t)}on(t,e=null){var n=this;return{do:function(e){return n.element.listenTo(t,(()=>{n.run(e)})),n}}}as(t=null,e){return t=t||`div#${this.id}.pragma`,this.setElement(L(t,e),!1),this}addExport(t){this.exports=this.exports||new Set,this.exports.add(t)}export(...t){for(let e of t)this.addExport(e)}import(...t){let e=new r;for(let n of t)"function"==typeof n&&(n=n()),n.exports&&u(this,n,n.exports),n.exportChain&&e.add((t=>{n.exportChain.exec(this)}));return e.exec(),this}from(t){return t.exports&&u(this,t,t.exports),t.exportChain&&t.exportChain.exec(this),this}wireTo(t){let e=this;return t.do((function(){e.value=this.value})),this}do(){return this.actionChain.add(...arguments),this}run(...t){let n=t[0];return"function"==typeof n?this._runAry(t):"object"==typeof n?this._runAry(Object.values(n)):e(`Could not run [${t}] as [${this}]`),this}_runAry(t){for(let e of t)this.runAs(e)}runAs(t){return t.bind(this)()}containAry(t,n="append"){for(let i of t)super.add(i),i.isRendered?e(`[${i}] is already appended`):this.element[n](i);return this}contain(...t){return this.containAry(t)}containFirst(...t){return this.containAry(t.reverse(),"prepend")}pragmatize(){return this.element.appendTo(this.parent&&this.parent.element||"body"),this}pragmatizeAt(t){return this.element.appendTo(t),this}addListeners(t){for(let[e,n]of Object.entries(t))this.on(e).do(n);return this}}const F=["html","css","addClass","removeClass","toggleClass","setId","append","prepend","appendTo","prependTo","listenTo","setData"];for(let t of F)q.prototype[t]=function(){return this.element[t](...arguments),this};const I=["getData"];for(let t of I)q.prototype[t]=function(){return this.element[t](...arguments)};const V=["offset","text","top","left","width","height","x","classArray"];for(let t of V)Object.defineProperty(q.prototype,t,{get:function(){return this.element[t]}});globalThis.pragmaSpace.integrateMousetrap=function(t){"function"==typeof t&&(q.prototype.bind=function(e,n,i){let r=this;return t.bind(e,(function(){return r.runAs(n)}),i),this},globalThis.pragmaSpace.mousetrapIntegration=!0,i("Mousetrap configuration detected! Extended Pragmas to support .bind() method!"))};try{globalThis.pragmaSpace.integrateMousetrap(Mousetrap)}catch(t){n("Tried to integrate extensions, but failed. To disable,\n  this attempt: globalThis.pragmaSpace.integrate3rdParties = false")}function U(t){return new Promise((e=>e(t())))}const B=(t,e)=>new q(t,e),Q=B,W=["_e","_p","Pragma","util","_thread"];t.ActionChain=r,t.Pragma=q,t._e=L,t._p=Q,t._runAsync=U,t._thread=function(t){let e=`\n    onmessage = e => postMessage(JSON.stringify((${t.toString()})(e.data))) \n  `;var n=new Blob([e],{type:"application/javascript"}),i=new Worker(URL.createObjectURL(n));return function(){return i.postMessage(arguments),new Promise((t=>{i.addEventListener("message",(e=>t(JSON.parse(e.data))))}))}},t.globalify=function(){let t=(globalThis||window).pragma;if("undefined"!==t&&t.__esModule)for(let e of W)globalThis[e]=t[e];else console.error("Could not globalify [pragma]")},t.render=function(t){window.location.href=t},t.runAsync=function(...t){return U((()=>{for(let e of t)U(e)}))},t.util=j,t.π=B,Object.defineProperty(t,"__esModule",{value:!0})}));
