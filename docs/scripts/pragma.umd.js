!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).pragma={})}(this,(function(t){"use strict";function e(t,e=null,n=["rerun the code 10 times"],i=null,r=!1){if(!$()&&!r)return null;console.error(`%c 🧯 pragma.js  %c \n\n      encountered a soft error 🔫 %c \n\n      \n${i?`Triggered by: [${i.key} ${i}]`:""}\n      \n${t} %c\n\n      \n${null!=e?`Potential ${e}: \n\t${n.join("\n\t")}`:""}\n      `,"font-size:15px","font-size: 12px;","color:whitesmoke","color:white")}function n(){if(!$())return null;console.log(...arguments)}function i(){if(!$())return null;console.log("%c 🌴 [pragma] \n\n      ","font-size:12px; color:#86D787;",...arguments,"\n")}class r{constructor(t){this.self=t,this.actions=new Map,this.delete=this.destroy}addWithKey(t,e=null){e=e||this.actions.size,this.actions.set(e,t)}add(...t){for(let e of t)this.addWithKey(e)}forAction(t){for(let[e,n]of this.actions)t(e,n)}exec(...t){this.execAs(this.self,...t)}destroy(...t){t.forEach((t=>this.actions.delete(t)))}execAs(t,...e){this.forAction((function(n,i){i.bind(t)(...e)}))}}function o(){return Math.random().toString(36).substring(3,6)+Math.random().toString(36).substring(5,8)}function s(){return a(8)}function a(t=7){return t<5?o():(o()+a(t-5)).substring(0,t)}function l(t){return a(t)}function u(t,e){for(let[n,i]of Object.entries(e))t[n]=i;return t}const c=t=>t.replace(/([-_]\w)/g,(t=>t[1].toUpperCase()));function h(t,e){let n=`${t}Chain`,i=`on${t.capitalize()}`;return e[n]=new r(e),e[i]=function(t,i){e[n].addWithKey(t,i)},{chainName:n,eventName:i}}function f(t,e){let n=h(t,e),i=`is${t.capitalize()}ed`;e[n.chainName].add((()=>{e[i]=!0})),e[n.eventName]=function(t){if(e[i])return t(e);e[n.chainName].add(t)}}function d(t,...e){for(let n of e)f(n,t)}String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)};const p=t=>t.toString().replace(/[^a-z0-9]/gi,"-").toLowerCase();globalThis.pragmaSpace||(globalThis.pragmaSpace={}),d(globalThis.pragmaSpace,"docLoad");const m=globalThis.pragmaSpace.onDocLoad;function g(){globalThis.pragmaSpace.isDocLoaded||(i("📰 document is loaded."),globalThis.pragmaSpace.docLoadChain.exec())}document.addEventListener("readystatechange",(()=>{"complete"===document.readyState&&g()})),document.addEventListener("turbolinks:load",(()=>{i("🚀 TURBOLINKS loaded"),g()}));var y=/[#.]/g;function b(t,e="div"){var n=t||"",i={tag:e},r=0;let o,s,a;for(;r<n.length;)y.lastIndex=r,a=y.exec(n),o=n.slice(r,a?a.index:n.length),o&&(s?"#"===s?i.id=o:i.class?i.class.push(o):i.class=[o]:i.tag=o,r+=o.length),a&&(s=a[0],r++);return i}function x(t,n,i){if(!Array.isArray(t))return e(`Could not ${i} class [${t}] -> [${n}]`);for(let e of t){let t=e.split(" ");t.length>1?x(t,n,i):n.classList[i](e)}}function v(t,e){x(t,e,"add")}function C(t,e){x(t,e,"remove")}function T(t,e){x(t,e,"toggle")}function _(t){try{let e=document.querySelector(t);if(e)return e}catch{}let e=b(t),n=document.createElement(e.tag||"div");return e.id&&(n.id=e.id),e.class&&v(e.class,n),n}function A(t){return document.createRange().createContextualFragment(t)}function O(t){return t instanceof Element?t:"string"==typeof t?"<"===t[0]?A(t):_(t):e(`Could not find/create element from [${t}]`)}function S(t,e){k(t).findAll("path").forEach((t=>{const n=t.attr("fill");"none"!=n&&"transparent"!=n&&t.attr("fill",e)}))}const w={html:(t,e)=>{e.innerHTML=t},pcss:(t,e)=>{for(let[n,i]of M.cssToDict(t))e.style[c(n)]=i}},M={cssToDict:t=>{t=t.replace(/\n/g,";").replace(/:/g," ");let n=new Map;for(let e of t.split(";")){if(e.replace(/\s/g,"").length<2)continue;e=e.trim().split(" ");let t=e[0];e.shift(),n.set(t.trim(),e.join(" ").trim())}let i=[];for(const[t,e]of n.entries())CSS.supports(t,e)||i.push(`${t.trim()}: ${e.trim()}`);return i.length>0&&e("CSS syntax error","typos",i),n},css:t=>{let e="";for(let[n,i]of M.cssToDict(t))e+=`${n}:${i};`;return e},html:t=>t};function $(){return globalThis.pragmaSpace.dev}globalThis.pragmaSpace||(globalThis.pragmaSpace={}),globalThis.pragmaSpace.dev=globalThis.pragmaSpace.dev||"undefined"!=typeof process&&process.env&&"development"===process.env.NODE_ENV;var E=Object.freeze({__proto__:null,_deving:$,throwSoft:e,log:n,suc:i,whenDOM:m,parseQuery:b,addClassAryTo:v,removeClassAryFrom:C,toggleClassAryOf:T,selectOrCreateDOM:_,elementFrom:O,toHTMLAttr:p,fragmentFromString:A,fillSVG:S,generateRandomKey:l,objDiff:u,aryDiff:function(t,e){return t.filter((t=>e.indexOf(t)<0))},_extend:function(t,e){Object.setPrototypeOf(t,u(Object.getPrototypeOf(t),e))},createEventChains:d,createChains:function(t,...e){for(let n of e)h(n,t)},snake2camel:c,bench:function(t,e){console.time(e),t(),console.timeEnd(e)},rk:a,rk5:o,rk8:s,parse:M,apply:w});function j(t){if(null==t||null==t)return e(`Could not find a DOM element for ${t}`);if(t.element)return j(t.element);return O(t)}function k(t,e){let n=j(t);var i,r;return n.constructor===DocumentFragment&&(i=n,(r=document.createElement("template")).appendChild(i.cloneNode(!0)),n=r.firstChild),n instanceof Element&&(n.init(),n._render()),"string"==typeof e&&n.html(e),n}const L={init:function(){this.isPragmaElement=!0,d(this,"docLoad","render"),m((()=>this.docLoadChain.exec(this)))},_render:function(){this.renderChain.exec(this)},appendTo:function(t){return this.onDocLoad((()=>{this._parentElement=j(t),this._parentElement.appendChild(this),this._render()})),this},prependTo:function(t){return this.onDocLoad((()=>{this._parentElement=j(t),this._parentElement.prepend(this),this._render()})),this},append:function(...t){return this.onRender((()=>{for(let e of t){let t=j(e);this.appendChild(t)}})),this},destroy:function(){this.onRender((()=>{this.parentElement&&this.parentElement.removeChild(this)}))},css:function(t){return this.onRender((()=>{w.pcss(t,this)})),this},html:function(t){return t?(this.onRender((()=>{w.html(t,this)})),this):this.innerHTML},setId:function(t){return this.id=t,this},setData:function(t){for(let[e,n]of Object.entries(t))this.dataset[e]=n;return this},getData:function(t){return this.dataset[t]},addClass:function(...t){return v(t,this),this},removeClass:function(...t){return C(t,this),this},toggleClass:function(...t){return T(t,this),this},listenTo:function(...t){return this.onRender((()=>{this.addEventListener(...t)})),this},attr:function(t,e){if("string"==typeof t){if(void 0===e)return this.getAttribute(t);const n=t;(t={})[n]=e}for(let[e,n]of Object.entries(t))this.setAttribute(e,n);return this},find:function(){return k(this.query(...arguments))},findAll:function(t){return Array.from(this.queryAll(t)).map((t=>k(t)))},query:function(){return this.querySelector(...arguments)},queryAll:function(t){return this.querySelectorAll(t)},hide:function(){return this.style.display="none",this},show:function(){return this.style.display="",this},deepQueryAll:function(t){let e=Array.from(this.queryAll(t));for(let n of this.children)e=e.concat(n.deepQueryAll(t));return e},deepFindAll:function(t){return this.deepQueryAll(t).map((t=>k(t)))},rect:function(){return"function"==typeof this.getBoundingClientRect?this.getBoundingClientRect():{}},offset:function(){var t=this.rect();return{top:t.top+window.scrollY,left:t.left+window.scrollX}},x:function(t){return this.left+this.width/2-t/2}},D={top:function(){return this.offset().top},left:function(){return this.offset().left},width:function(){return this.rect().width},height:function(){return this.rect().height},text:function(){return this.textContent},classArray:function(){return Array.from(this.classList)},childrenArray:function(){return Array.from(this.children)}};for(let[t,e]of Object.entries(L))Element.prototype[t]=e;for(let[t,e]of Object.entries(D))Object.defineProperty(Element.prototype,t,{get:e,configurable:!0});const P={parent:(t,e)=>{t.parent=e},value:(t,e)=>{t.value=e},key:(t,e)=>{t.key=e},class:(t,e)=>{t._class=e},element:(t,n)=>{if(!(n instanceof Element))return e(`Could not add ${n} as the element of [${t}]`);t.element=n},children:(t,e)=>{if(e.constructor==Array)return t.buildAry(e);t.build(e)},childTemplate:(t,e)=>{}};function R(t,e){return{val:t,set:e}}function z(t,n,i){if(!n)return R(t,!0);if(i)return R(function(t,n){return function(t){return null!=t.min&&null!=t.max}(n)?t=(t=t>n.max?n.min:t)<n.min?n.max:t:e(`Could not loop value, since range (${JSON.stringify(n)}) is unbounded`)}(t,n),!0);let r=function(t,e){return t=e.min?Math.max(e.min,t):t,e.max?Math.min(e.max,t):t}(t,n);return R(r,r==t)}class K extends class{constructor(t){this.childMap=new Map,this.key="string"==typeof t?t:s(),this.containsKey=this.childMap.has}get kidsum(){return this.childMap.size}get hasKids(){return this.kidsum>0}get shape(){return this.shapePrefix()}get master(){return null==this.parent||null==this.parent.parent?this.parent:this.parent.master}get children(){return Array.from(this.childMap.values())}get depthKey(){return this.parent?this.parent.depthKey+"<~<"+this.key:this.key}get allChildren(){if(!this.hasKids)return null;let t=this.children;for(let e of t){let n=e.allChildren;n&&(t=t.concat(n))}return t}get(t){return this.childMap.get(t)}find(t){if(this.childMap.has(t))return this.childMap.get(t);for(let e of this.childMap.values()){let n=e.find(t);if(n)return n}}adopt(...t){for(let e of t)this.add(e);return this}add(t){return t?this.childMap.has(t.key)?(t.key=`${t.key}<${o()}`,this.add(t)):(t.parent=this,void this.childMap.set(t.key,t)):e(`Could not add [${t}] to [${this.id}]`)}delete(t){return this.remove(t)}remove(t){this.childMap.get(t)&&this.childMap.delete(t)}shapePrefix(t=""){let e=`${t}| ${this.type} - ${this.key} \n`;if(this.hasKids){t+="| ";for(let n of this.children)e+=n.shapePrefix(t)}return e}}{constructor(t,e){super(),d(this,"export"),this.actionChain=new r,"object"==typeof t?function(t,e){let n=new Map;for(let[i,r]of Object.entries(t))P.hasOwnProperty(i)?P[i](e,r):n.set(i,r);e.element&&e.element.whenInDOM((t=>{for(let[i,r]of n)if(i=i.toLowerCase(),i.includes("on")){let n=i.split("on")[1].trim();t.listenTo(n,(()=>{e.action(r)}))}}))}(t,this):this.key=t,this.element||this.as()}get _e(){return this.element}setElement(t,e=!0){return this.elementDOM=t,e&&this.element.id&&(this.id=this.element.id),this}get element(){return this.elementDOM}set element(t){this.setElement(t)}setRange(t=null,e=null){return this.range=this.range||{},this.range.min=null===t?this.range.min:t,this.range.max=null===e?this.range.max:e,this}breakLoop(){return this._loopVal=!1,this}setLoop(t,e){return this.setRange(t,e),this._loopVal=!0,this}get dv(){return this.v-this._lv}get value(){return this.v}setValue(t){return this.value=t,this}set value(t){let e=z(t,this.range,this._loopVal);e.set&&(this._lv=this.v,this.v=e.val,this.exec())}exec(){return this.actionChain.execAs(this,...arguments),this}setKey(t){return this.key=t,this}set key(t){this._KEY=null==t?l():t}get key(){return this._KEY}set id(t){this.element&&(this.element.id=this.id)}get id(){return p(this.key)}buildAry(t){for(let e of t)this.add(new K(e,this));return this}build(...t){return this.buildAry(t)}on(t,e=null){var n=this;return{do:function(e){return n.element.listenTo(t,(()=>{n.run(e)})),n}}}as(t=null,e){return t=t||`div#${this.id}.pragma`,this.setElement(k(t,e),!1),this}addExport(t){this.exports=this.exports||[],this.exports.push(t)}export(...t){for(let e of t)this.addExport(e)}from(t){if(t.exports)for(let e of t.exports)this[e]=t[e];return t.exportChain&&t.exportChain.exec(this),this}wireTo(t){let e=this;return t.do((function(){e.value=this.value})),this}do(){return this.actionChain.add(...arguments),this}run(...t){let n=t[0];return"function"==typeof n?this._runAry(t):"object"==typeof n?this._runAry(Object.values(n)):e(`Could not run [${t}] as [${this}]`),this}_runAry(t){for(let e of t)this.runAs(e)}runAs(t){return t.bind(this)()}containAry(t){for(let n of t)super.add(n),n.isRendered?e(`[${n}] is already appended`):this.element.append(n);return this}contain(...t){return this.containAry(t)}pragmatize(){return this.element.appendTo(this.parent&&this.parent.element||"body"),this}pragmatizeAt(t){return this.element.appendTo(t),this}addListeners(t){for(let[e,n]of Object.entries(t))this.on(e).do(n);return this}}const N=["html","css","addClass","removeClass","toggleClass","setId","append","prepend","appendTo","prependTo","listenTo","setData"];for(let t of N)K.prototype[t]=function(){return this.element[t](...arguments),this};const q=["getData"];for(let t of q)K.prototype[t]=function(){return this.element[t](...arguments)};const I=["offset","text","top","left","width","height","x","classArray"];for(let t of I)Object.defineProperty(K.prototype,t,{get:function(){return this.element[t]}});globalThis.pragmaSpace.integrateMousetrap=function(t){"function"==typeof t&&(K.prototype.bind=function(e,n,i){let r=this;return t.bind(e,(function(){return r.runAs(n)}),i),this},globalThis.pragmaSpace.mousetrapIntegration=!0,i("Mousetrap configuration detected! Extended Pragmas to support .bind() method!"))};try{globalThis.pragmaSpace.integrateMousetrap(Mousetrap)}catch(t){n("Tried to integrate extensions, but failed. To disable,\n  this attempt: globalThis.pragmaSpace.integrate3rdParties = false")}function F(t){return new Promise((e=>e(t())))}const V={get template(){return(new K).run((function(){this.config=function(t){if(t.name){let e=`set${t.name.capitalize()}Template`,n=`_${t.name}Template`;this[e]=function(t){return this[n]=t,this},t.defaultSet&&this[e](t.defaultSet),this._tempOptions={set:e},this.export(n,e),this.onExport((t=>{t.export(n,e)}))}this.export("config"),this.onExport((t=>t.export("config"))),t.name&&delete t.name,t.defaultSet&&delete t.defaultSet;for(let[e,n]of Object.entries(t))this[e]=n,this.export(e),this.onExport((t=>t.export(e)));return this}}))},fromObject:function(t){n(`Creating template object from obj: [${JSON.stringify(t)}]`);const e=t._create||function(t){return t};t._create&&delete t._create;let i={defaults:{},isPragmaTemplate:!0,setDefaults:function(t){return this.defaults=u(this.defaults,t),this}};for(let[n,r]of Object.entries(t))Object.defineProperty(i,n,{get:function(){return e(r,i,...arguments)}});return i},from:function(t,n){if("object"==typeof t)return"function"==typeof n&&(t._create=n),this.fromObject(t);e(`Could not create a template object from argument [${t}])`)}};const U={onOptionCreate:function(t,e){t.contain(e)},optionTemplate:function(t){return new K(t).html(t).addClass("pragma-click").on("click").do((function(){this.parent.value=this.key}))}};var B=Object.freeze({__proto__:null,monitor:function(t){return(new K).from(V.template.config({name:"monitor",defaultSet:t||(t=>t)})).do((function(){this.html(this._monitorTemplate(this.value))})).run((function(){this.export("element","actionChain")}))},slider:function(t){return(new K).from(V.template.config({name:"slider",defaultSet:t||{min:0,max:1e3}})).run((function(){this.as("<input type='range' min=0 max=10 value=5></input>"),this.setRange(0,10),this.on("input").do((function(){this.value=parseInt(this.element.value)})),this.export("element","actionChain")}))},select:function(t){return(new K).from(V.template.config({name:"select",defaultSet:t.options})).run((function(){if(t.onOptionCreate=t.onOptionCreate||U.onOptionCreate,t.optionTemplate=t.optionTemplate||U.optionTemplate,this._selectTemplate.constructor===Array)for(let e of this._selectTemplate)t.onOptionCreate(this,t.optionTemplate(e));else for(let[e,n]of Object.entries(this._selectTemplate)){const i={};i[e]=n,t.onOptionCreate(this,t.optionTemplate(e,n),i)}this.export("element","actionChain","childMap")}))},create:V,icons:function(t){return V.from(t,((t,e)=>Q().run((function(){var n,i;this.element=(n=k(t),(i=e.defaults).fill&&(S(n,i.fill),delete i.fill),n.attr(i)),this.export("element")}))))},icon:function(){}});const J=(t,e)=>new K(t,e),Q=J,W=["_e","_p","Pragma","util","tpl","_thread"];t.ActionChain=r,t.Pragma=K,t._e=k,t._p=Q,t._runAsync=F,t._thread=function(t){let e=`\n  onmessage = e => postMessage(JSON.stringify((${t.toString()})(e.data))) \n  `;var n=new Blob([e],{type:"application/javascript"}),i=new Worker(URL.createObjectURL(n));return function(){return i.postMessage(arguments),new Promise((t=>{i.addEventListener("message",(e=>t(JSON.parse(e.data))))}))}},t.globalify=function(){let t=(globalThis||window).pragma;if("undefined"!==t&&t.__esModule)for(let e of W)globalThis[e]=t[e];else console.error("Could not globalify [pragma]")},t.render=function(t){window.location.href=t},t.runAsync=function(...t){return F((e=>{for(let e of t)F(e)}))},t.tpl=B,t.util=E,t.π=J,Object.defineProperty(t,"__esModule",{value:!0})}));
