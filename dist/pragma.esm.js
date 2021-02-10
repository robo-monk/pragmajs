import{util as t}from"..";function e(t,e=null,n=["rerun the code 10 times"],i=null,r=!1){if(!$()&&!r)return null;console.error(`%c 🧯 pragma.js  %c \n\n      encountered a soft error 🔫 %c \n\n      \n${i?`Triggered by: [${i.key} ${i}]`:""}\n      \n${t} %c\n\n      \n${null!=e?`Potential ${e}: \n\t${n.join("\n\t")}`:""}\n      `,"font-size:15px","font-size: 12px;","color:whitesmoke","color:white")}function n(){if(!$())return null;console.log(...arguments)}function i(){if(!$())return null;console.log("%c 🌴 [pragma] \n\n      ","font-size:12px; color:#86D787;",...arguments,"\n")}class r{constructor(t){this.self=t,this.actions=new Map,this.delete=this.destroy}addWithKey(t,e=null){e=e||this.actions.size,this.actions.set(e,t)}add(...t){for(let e of t)this.addWithKey(e)}forAction(t){for(let[e,n]of this.actions)t(e,n)}exec(...t){this.execAs(this.self,...t)}destroy(...t){t.forEach((t=>this.actions.delete(t)))}execAs(t,...e){this.forAction((function(n,i){i.bind(t)(...e)}))}}function s(){return Math.random().toString(36).substring(3,6)+Math.random().toString(36).substring(5,8)}function o(){return a(8)}function a(t=7){return t<5?s():(s()+a(t-5)).substring(0,t)}function l(t){return a(t)}function h(t,e){for(let[n,i]of Object.entries(e))t[n]=i;return t}const c=t=>t.replace(/([-_]\w)/g,(t=>t[1].toUpperCase()));function u(t,e){let n=`${t}Chain`,i=`on${t.capitalize()}`;return e[n]=new r(e),e[i]=function(t,i){e[n].addWithKey(t,i)},{chainName:n,eventName:i}}function f(t,...e){for(let n of e)u(n,t)}function d(t,e){let n=u(t,e),i=`is${t.capitalize()}ed`;e[n.chainName].add((()=>{e[i]=!0})),e[n.eventName]=function(t){if(e[i])return t(e);e[n.chainName].add(t)}}function p(t,...e){for(let n of e)d(n,t)}String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)};const m=t=>t.toString().replace(/[^a-z0-9]/gi,"-").toLowerCase();globalThis.pragmaSpace||(globalThis.pragmaSpace={}),p(globalThis.pragmaSpace,"docLoad");const g=globalThis.pragmaSpace.onDocLoad;function y(){globalThis.pragmaSpace.isDocLoaded||(i("📰 document is loaded."),globalThis.pragmaSpace.docLoadChain.exec())}document.addEventListener("readystatechange",(()=>{"complete"===document.readyState&&y()})),document.addEventListener("turbolinks:load",(()=>{i("🚀 TURBOLINKS loaded"),y()}));var x=/[#.]/g;function b(t,e="div"){var n=t||"",i={tag:e},r=0;let s,o,a;for(;r<n.length;)x.lastIndex=r,a=x.exec(n),s=n.slice(r,a?a.index:n.length),s&&(o?"#"===o?i.id=s:i.class?i.class.push(s):i.class=[s]:i.tag=s,r+=s.length),a&&(o=a[0],r++);return i}function v(t,n,i){if(!Array.isArray(t))return e(`Could not ${i} class [${t}] -> [${n}]`);for(let e of t){let t=e.split(" ");t.length>1?v(t,n,i):n.classList[i](e)}}function C(t,e){v(t,e,"add")}function A(t,e){v(t,e,"remove")}function _(t,e){v(t,e,"toggle")}function T(t){try{let e=document.querySelector(t);if(e)return e}catch{}let e=b(t),n=document.createElement(e.tag||"div");return e.id&&(n.id=e.id),e.class&&C(e.class,n),n}function w(t){return document.createRange().createContextualFragment(t)}function M(t){return t instanceof Element?t:"string"==typeof t?"<"===t[0]?w(t):T(t):e(`Could not find/create element from [${t}]`)}const O={html:(t,e)=>{e.innerHTML=t},pcss:(t,e)=>{for(let[n,i]of S.cssToDict(t))e.style[c(n)]=i}},S={cssToDict:t=>{t=t.replace(/\n/g,";").replace(/:/g," ");let n=new Map;for(let e of t.split(";")){if(e.replace(/\s/g,"").length<2)continue;e=e.trim().split(" ");let t=e[0];e.shift(),n.set(t.trim(),e.join(" ").trim())}let i=[];for(const[t,e]of n.entries())CSS.supports(t,e)||i.push(`${t.trim()}: ${e.trim()}`);return i.length>0&&e("CSS syntax error","typos",i),n},css:t=>{let e="";for(let[n,i]of S.cssToDict(t))e+=`${n}:${i};`;return e},html:t=>t};function $(){return globalThis.pragmaSpace.dev}globalThis.pragmaSpace||(globalThis.pragmaSpace={}),globalThis.pragmaSpace.dev=globalThis.pragmaSpace.dev||"undefined"!=typeof process&&process.env&&"development"===process.env.NODE_ENV;var E=Object.freeze({__proto__:null,_deving:$,throwSoft:e,log:n,suc:i,whenDOM:g,parseQuery:b,addClassAryTo:C,removeClassAryFrom:A,toggleClassAryOf:_,selectOrCreateDOM:T,elementFrom:M,toHTMLAttr:m,fragmentFromString:w,fillSVG:function(t,e){j(t).findAll("path").forEach((t=>{const n=t.attr("fill");"none"!=n&&"transparent"!=n&&t.attr("fill",e)}))},generateRandomKey:l,objDiff:h,aryDiff:function(t,e){return t.filter((t=>e.indexOf(t)<0))},_extend:function(t,e){Object.setPrototypeOf(t,h(Object.getPrototypeOf(t),e))},createEventChains:p,createChains:f,snake2camel:c,mimic:function(t,e,n){for(let i of n||Object.keys(e)){let n=Object.getOwnPropertyDescriptor(e,i);if(!n)break;Object.defineProperty(t,i,n)}},bench:function(t,e){console.time(e),t(),console.timeEnd(e)},rk:a,rk5:s,rk8:o,parse:S,apply:O,createTemplate:t=>(new N).run((function(){f(this,"config"),this.config=function(t){return this.configChain.exec(t),this},this.onConfig(((t={})=>{["events","chains","exports","persistentExports"].forEach((e=>{t[e]&&(this[`_${e}`]=t[e],delete t[e])})),this._events&&p(this,...this._events),this._chains&&f(this,...this._chains);for(let[e,n]of Object.entries(t))this[e]=n,this.export(e);this._exports&&this.export(...this._exports)})),this.export("exports","config","exportChain","configChain","onConfig")}),(function(){"object"==typeof t&&this.config(t)}))});function k(t){if(null==t||null==t)return e(`Could not find a DOM element for ${t}`);if(t.element)return k(t.element);return M(t)}function j(t,e){let n=k(t);var i,r;return n.constructor===DocumentFragment&&(i=n,(r=document.createElement("template")).appendChild(i.cloneNode(!0)),n=r.firstChild),n instanceof Element&&(n.init(),n._render()),"string"==typeof e&&n.html(e),n}const L={init:function(){this.isPragmaElement=!0,p(this,"docLoad","render"),g((()=>this.docLoadChain.exec(this)))},_render:function(){this.renderChain.exec(this)},appendTo:function(t){return this.onDocLoad((()=>{this._parentElement=k(t),this._parentElement.appendChild(this),this._render()})),this},prependTo:function(t){return this.onDocLoad((()=>{this._parentElement=k(t),this._parentElement.prepend(this),this._render()})),this},append:function(...t){return this.onRender((()=>{for(let e of t){let t=k(e);this.appendChild(t)}})),this},destroy:function(){this.onRender((()=>{this.parentElement&&this.parentElement.removeChild(this)}))},css:function(t){return this.onRender((()=>{O.pcss(t,this)})),this},html:function(t){return t?(this.onRender((()=>{O.html(t,this)})),this):this.innerHTML},setId:function(t){return this.id=t,this},setData:function(t){for(let[e,n]of Object.entries(t))this.dataset[e]=n;return this},getData:function(t){return this.dataset[t]},addClass:function(...t){return C(t,this),this},removeClass:function(...t){return A(t,this),this},toggleClass:function(...t){return _(t,this),this},listenTo:function(...t){return this.onRender((()=>{this.addEventListener(...t)})),this},attr:function(t,e){if("string"==typeof t){if(void 0===e)return this.getAttribute(t);const n=t;(t={})[n]=e}for(let[e,n]of Object.entries(t))this.setAttribute(e,n);return this},find:function(){return j(this.query(...arguments))},findAll:function(t){return Array.from(this.queryAll(t)).map((t=>j(t)))},query:function(){return this.querySelector(...arguments)},queryAll:function(t){return this.querySelectorAll(t)},hide:function(){return this.style.display="none",this},show:function(){return this.style.display="",this},deepQueryAll:function(t){let e=Array.from(this.queryAll(t));for(let n of this.children)e=e.concat(n.deepQueryAll(t));return e},deepFindAll:function(t){return this.deepQueryAll(t).map((t=>j(t)))},rect:function(){return"function"==typeof this.getBoundingClientRect?this.getBoundingClientRect():{}},offset:function(){var t=this.rect();return{top:t.top+window.scrollY,left:t.left+window.scrollX}},x:function(t){return this.left+this.width/2-t/2}},D={top:function(){return this.offset().top},left:function(){return this.offset().left},width:function(){return this.rect().width},height:function(){return this.rect().height},text:function(){return this.textContent},classArray:function(){return Array.from(this.classList)},childrenArray:function(){return Array.from(this.children)}};for(let[t,e]of Object.entries(L))Element.prototype[t]=e;for(let[t,e]of Object.entries(D))Object.defineProperty(Element.prototype,t,{get:e,configurable:!0});class P{constructor(t){this._childMap=new Map,this.key="string"==typeof t?t:o(),this.containsKey=this.childMap.has}set childMap(t){for(let[e,n]of t)n instanceof P&&this.add(n)}get childMap(){return this._childMap}get kidsum(){return this.childMap.size}get hasKids(){return this.kidsum>0}get shape(){return this.shapePrefix()}get master(){return null==this.parent||null==this.parent.parent?this.parent:this.parent.master}get children(){return Array.from(this.childMap.values())}get depthKey(){return this.parent?this.parent.depthKey+"<~<"+this.key:this.key}get allChildren(){if(!this.hasKids)return null;let t=this.children;for(let e of t){let n=e.allChildren;n&&(t=t.concat(n))}return t}get(t){return this.childMap.get(t)}find(t){if(this.childMap.has(t))return this.childMap.get(t);for(let e of this.childMap.values()){let n=e.find(t);if(n)return n}}adopt(...t){for(let e of t)this.add(e);return this}add(t,n=!1){return t?!n&&this.childMap.has(t.key)?(t.key=`${t.key}<${s()}`,this.add(t)):(t.parent=this,void this.childMap.set(t.key,t)):e(`Could not add [${t}] to [${this.id}]`)}delete(t){return this.remove(t)}remove(t){this.childMap.get(t)&&this.childMap.delete(t)}shapePrefix(t=""){let e=`${t}| ${this.type} - ${this.key} \n`;if(this.hasKids){t+="| ";for(let n of this.children)e+=n.shapePrefix(t)}return e}}const R={parent:(t,e)=>{t.parent=e},value:(t,e)=>{t.value=e},key:(t,e)=>{t.key=e},class:(t,e)=>{t._class=e},element:(t,n)=>{if(!(n instanceof Element))return e(`Could not add ${n} as the element of [${t}]`);t.element=n},children:(t,e)=>{if(e.constructor==Array)return t.buildAry(e);t.build(e)},childTemplate:(t,e)=>{}};function K(t,e){return{val:t,set:e}}function z(t,n,i){if(!n)return K(t,!0);if(i)return K(function(t,n){return function(t){return null!=t.min&&null!=t.max}(n)?t=(t=t>n.max?n.min:t)<n.min?n.max:t:e(`Could not loop value, since range (${JSON.stringify(n)}) is unbounded`)}(t,n),!0);let r=function(t,e){return t=e.min?Math.max(e.min,t):t,e.max?Math.min(e.max,t):t}(t,n);return K(r,r==t)}class N extends P{constructor(t,e){super(),p(this,"export"),this.actionChain=new r,"object"==typeof t?function(t,e){let n=new Map;for(let[i,r]of Object.entries(t))R.hasOwnProperty(i)?R[i](e,r):n.set(i,r);e.element&&e.element.whenInDOM((t=>{for(let[i,r]of n)if(i=i.toLowerCase(),i.includes("on")){let n=i.split("on")[1].trim();t.listenTo(n,(()=>{e.action(r)}))}}))}(t,this):this.key=t,this.element||this.as()}get _e(){return this.element}setElement(t,e=!0){return this.elementDOM=t,e&&this.element.id&&(this.id=this.element.id),this}get element(){return this.elementDOM}set element(t){this.setElement(t)}setRange(t=null,e=null){return this.range=this.range||{},this.range.min=null===t?this.range.min:t,this.range.max=null===e?this.range.max:e,this}breakLoop(){return this._loopVal=!1,this}setLoop(t,e){return this.setRange(t,e),this._loopVal=!0,this}get dv(){return this.v-this._lv}get value(){return this.v}setValue(t){return this.value=t,this}set value(t){let e=z(t,this.range,this._loopVal);e.set&&(this._lv=this.v,this.v=e.val,this.exec())}exec(){return this.actionChain.execAs(this,...arguments),this}setKey(t){return this.key=t,this}set key(t){this._KEY=null==t?l():t}get key(){return this._KEY}set id(t){this.element&&(this.element.id=this.id)}get id(){return m(this.key)}buildAry(t){for(let e of t)this.add(new N(e,this));return this}build(...t){return this.buildAry(t)}on(t,e=null){var n=this;return{do:function(e){return n.element.listenTo(t,(()=>{n.run(e)})),n}}}as(t=null,e){return t=t||`div#${this.id}.pragma`,this.setElement(j(t,e),!1),this}addExport(t){this.exports=this.exports||new Set,this.exports.add(t)}export(...t){for(let e of t)this.addExport(e)}import(...e){let n=new r;for(let i of e)"function"==typeof i&&(i=i()),i.exports&&t.mimic(this,i,i.exports),i.exportChain&&n.add((t=>{i.exportChain.exec(this)}));return n.exec(),this}from(e){return e.exports&&t.mimic(this,e,e.exports),e.exportChain&&e.exportChain.exec(this),this}wireTo(t){let e=this;return t.do((function(){e.value=this.value})),this}do(){return this.actionChain.add(...arguments),this}run(...t){let n=t[0];return"function"==typeof n?this._runAry(t):"object"==typeof n?this._runAry(Object.values(n)):e(`Could not run [${t}] as [${this}]`),this}_runAry(t){for(let e of t)this.runAs(e)}runAs(t){return t.bind(this)()}containAry(t,n="append"){for(let i of t)super.add(i),i.isRendered?e(`[${i}] is already appended`):this.element[n](i);return this}contain(...t){return this.containAry(t)}containFirst(...t){return this.containAry(t.reverse(),"prepend")}pragmatize(){return this.element.appendTo(this.parent&&this.parent.element||"body"),this}pragmatizeAt(t){return this.element.appendTo(t),this}addListeners(t){for(let[e,n]of Object.entries(t))this.on(e).do(n);return this}}const q=["html","css","addClass","removeClass","toggleClass","setId","append","prepend","appendTo","prependTo","listenTo","setData"];for(let t of q)N.prototype[t]=function(){return this.element[t](...arguments),this};const F=["getData"];for(let t of F)N.prototype[t]=function(){return this.element[t](...arguments)};const I=["offset","text","top","left","width","height","x","classArray"];for(let t of I)Object.defineProperty(N.prototype,t,{get:function(){return this.element[t]}});globalThis.pragmaSpace.integrateMousetrap=function(t){"function"==typeof t&&(N.prototype.bind=function(e,n,i){let r=this;return t.bind(e,(function(){return r.runAs(n)}),i),this},globalThis.pragmaSpace.mousetrapIntegration=!0,i("Mousetrap configuration detected! Extended Pragmas to support .bind() method!"))};try{globalThis.pragmaSpace.integrateMousetrap(Mousetrap)}catch(t){n("Tried to integrate extensions, but failed. To disable,\n  this attempt: globalThis.pragmaSpace.integrate3rdParties = false")}function V(t){let e=`\n    onmessage = e => postMessage(JSON.stringify((${t.toString()})(e.data))) \n  `;var n=new Blob([e],{type:"application/javascript"}),i=new Worker(URL.createObjectURL(n));return function(){return i.postMessage(arguments),new Promise((t=>{i.addEventListener("message",(e=>t(JSON.parse(e.data))))}))}}function U(t){return new Promise((e=>e(t())))}function B(...t){return U((()=>{for(let e of t)U(e)}))}const Q=(t,e)=>new N(t,e),W=Q,H=["_e","_p","Pragma","util","_thread"];function J(){let t=(globalThis||window).pragma;if("undefined"!==t&&t.__esModule)for(let e of H)globalThis[e]=t[e];else console.error("Could not globalify [pragma]")}function Y(t){window.location.href=t}export{r as ActionChain,N as Pragma,j as _e,W as _p,U as _runAsync,V as _thread,J as globalify,Y as render,B as runAsync,E as util,Q as π};
