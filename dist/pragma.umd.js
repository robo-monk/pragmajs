!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).pragma={})}(this,(function(t){"use strict";class e{constructor(t){this.self=t,this.actions=new Map,this.delete=this.destroy}addWithKey(t,e=null){e=e||this.actions.size,this.actions.set(e,t)}add(...t){for(let e of t)this.addWithKey(e)}forAction(t){for(let[e,n]of this.actions)t(e,n)}exec(...t){self=this.self,this.execAs(self,...t)}destroy(...t){t.forEach((t=>this.actions.delete(t)))}execAs(t,...e){this.forAction((function(n,i){i.bind(t)(...e)}))}}function n(t,e=null,n=["rerun the code 10 times"],i=null,r=!1){if(!S()&&!r)return null;console.error(`%c 🧯 pragma.js  %c \n\n      encountered a soft error 🔫 %c \n\n      \n${i?`Triggered by: [${i.key} ${i}]`:""}\n      \n${t} %c\n\n      \n${null!=e?`Potential ${e}: \n\t${n.join("\n\t")}`:""}\n      `,"font-size:15px","font-size: 12px;","color:whitesmoke","color:white")}function i(){if(!S())return null;console.log(...arguments)}function r(){if(!S())return null;console.log("%c 🌴 [pragma] \n\n      ","font-size:12px; color:#86D787;",...arguments,"\n")}function o(){return Math.random().toString(36).substring(3,6)+Math.random().toString(36).substring(5,8)}function s(){return a(8)}function a(t=7){return t<5?o():(o()+a(t-5)).substring(0,t)}function l(t){return a(t)}function h(t,e,n=!1){for(let[n,i]of Object.entries(e))t[n]=i;return t}function u(t,n){let i=`${t}Chain`,r=`on${t.capitalize()}`;return n[i]=new e(n),n[r]=function(t,e){n[i].addWithKey(t,e)},{chainName:i,eventName:r}}function c(t,e){let n=u(t,e),i=`is${t.capitalize()}ed`;e[n.chainName].add((()=>{e[i]=!0})),e[n.eventName]=function(t){if(e[i])return t(e);e[n.chainName].add(t)}}function f(t,...e){for(let n of e)c(n,t)}String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)};const d=t=>t.toString().replace(/[^a-z0-9]/gi,"-").toLowerCase();globalThis.pragmaSpace||(globalThis.pragmaSpace={}),f(globalThis.pragmaSpace,"docLoad");const p=globalThis.pragmaSpace.onDocLoad;function m(){globalThis.pragmaSpace.isDocLoaded||(r("📰 document is loaded."),globalThis.pragmaSpace.docLoadChain.exec())}document.addEventListener("readystatechange",(()=>{"complete"===document.readyState&&m()})),document.addEventListener("turbolinks:load",(()=>{r("🚀 TURBOLINKS loaded"),m()}));var g=/[#.]/g;function y(t,e="div"){var n=t||"",i={tag:e},r=0;let o,s,a;for(;r<n.length;)g.lastIndex=r,a=g.exec(n),o=n.slice(r,a?a.index:n.length),o&&(s?"#"===s?i.id=o:i.class?i.class.push(o):i.class=[o]:i.tag=o,r+=o.length),a&&(s=a[0],r++);return i}function x(t,e){if(!Array.isArray(t))return n(`Could not add class [${t}] to [${e}]`);for(let n of t){let t=n.split(" ");t.length>1?x(t,e):e.classList.add(n)}}function b(t){try{let e=document.querySelector(t);if(e)return e}catch(t){}let e=y(t),n=document.createElement(e.tag||"div");return e.id&&(n.id=e.id),e.class&&x(e.class,n),n}function v(t){return document.createRange().createContextualFragment(t)}function C(t){return t instanceof Element?t:"string"==typeof t?"<"===t[0]?v(t):b(t):n(`Could not find/create element from [${t}]`)}function _(t,e){M(t).findAll("path").forEach((t=>{const n=t.attr("fill");"none"!=n&&"transparent"!=n&&t.attr("fill",e)}))}const T={html:(t,e)=>{e.innerHTML=t},pcss:(t,e)=>{for(let[i,r]of O.cssToDict(t))e.style[(n=i,n.replace(/([-_]\w)/g,(t=>t[1].toUpperCase())))]=r;var n}},O={cssToDict:t=>{t=t.replaceAll("\n",";").replaceAll(":"," ");let e=new Map;for(let n of t.split(";")){if(n.replace(/\s/g,"").length<2)continue;n=n.trim().split(" ");let t=n[0];n.shift(),e.set(t.trim(),n.join(" ").trim())}let i=[];for(const[t,n]of e.entries())CSS.supports(t,n)||i.push(`${t.trim()}: ${n.trim()}`);return i.length>0&&n("CSS syntax error","typos",i),e},css:t=>{let e="";for(let[n,i]of O.cssToDict(t))e+=`${n}:${i};`;return e},html:t=>t};function S(){return globalThis.pragmaSpace.dev}globalThis.pragmaSpace||(globalThis.pragmaSpace={}),globalThis.pragmaSpace.dev=globalThis.pragmaSpace.dev||"undefined"!=typeof process&&process.env&&"development"===process.env.NODE_ENV;var $=Object.freeze({__proto__:null,_deving:S,throwSoft:n,log:i,suc:r,whenDOM:p,parseQuery:y,addClassAryTo:x,selectOrCreateDOM:b,elementFrom:C,toHTMLAttr:d,fragmentFromString:v,fillSVG:_,generateRandomKey:l,objDiff:h,aryDiff:function(t,e){return t.filter((t=>e.indexOf(t)<0))},_extend:function(t,e){Object.setPrototypeOf(t,h(Object.getPrototypeOf(t),e))},createEventChains:f,createChains:function(t,...e){for(let n of e)u(n,t)},rk:a,rk5:o,rk8:s,parse:O,apply:T});function A(t){if(null==t||null==t)return n(`Could not find a DOM element for ${t}`);if(t.element)return A(t.element);return C(t)}function M(t,e){let n=A(t);var i,r;return n.constructor===DocumentFragment&&(i=n,(r=document.createElement("template")).appendChild(i.cloneNode(!0)),n=r.firstChild),n instanceof Element&&(n.init(),n._render()),"string"==typeof e&&n.html(e),n}const w={init:function(){this.isPragmaElement=!0,f(this,"docLoad","render"),p((()=>this.docLoadChain.exec(this)))},_render:function(){this.renderChain.exec(this)},appendTo:function(t){return this.onDocLoad((()=>{this._parentElement=A(t),this._parentElement.appendChild(this),this._render()})),this},prependTo:function(t){return this.onDocLoad((()=>{this._parentElement=A(t),this._parentElement.prepend(this),this._render()})),this},append:function(t){return this.onRender((()=>{let e=A(t);this.appendChild(e)})),this},destroy:function(){this.onRender((()=>{this.parentElement&&this.parentElement.removeChild(this)}))},css:function(t){return this.onRender((()=>{T.pcss(t,this)})),this},html:function(t){return this.onRender((()=>{T.html(t,this)})),this},setId:function(t){return this.id=t,this},addClass:function(...t){return x(t,this),this},listenTo:function(...t){return this.onRender((()=>{this.addEventListener(...t)})),this},attr:function(t,e){if("string"==typeof t){if(void 0===e)return this.getAttribute(t);const n=t;(t={})[n]=e}for(let[e,n]of Object.entries(t))this.setAttribute(e,n);return this},find:function(){return this.querySelector(...arguments)},findAll:function(t){return this.querySelectorAll(t)},deepFindAll:function(t){let e=Array.from(this.findAll(t));for(let n of this.children)e=e.concat(n.deepFindAll(t));return e},rect:function(){return"function"==typeof this.getBoundingClientRect?this.getBoundingClientRect():{}},offset:function(){var t=this.rect();return{top:t.top+window.scrollY,left:t.left+window.scrollX}},x:function(t){return this.left+this.width/2-t/2}},E={top:function(){return this.offset().top},left:function(){return this.offset().left},width:function(){return this.rect().width},height:function(){return this.rect().height},text:function(){return this.textContent}};for(let[t,e]of Object.entries(w))Element.prototype[t]=e;for(let[t,e]of Object.entries(E))Object.defineProperty(Element.prototype,t,{get:e,configurable:!0});const j={parent:(t,e)=>{t.parent=e},value:(t,e)=>{t.value=e},id:(t,e)=>{t.id=e},class:(t,e)=>{t._class=e},element:(t,e)=>{if(!(e instanceof Element))return n(`Could not add ${e} as the element of [${t}]`);t.element=e},children:(t,e)=>{if(e.constructor==Array)return t.buildAry(e);t.build(e)},childTemplate:(t,e)=>{}};function k(t,e){return{val:t,set:e}}function L(t,e,i){if(!e)return k(t,!0);if(i)return k(function(t,e){return function(t){return null!=t.min&&null!=t.max}(e)?t=(t=t>e.max?e.min:t)<e.min?e.max:t:n(`Could not loop value, since range (${JSON.stringify(e)}) is unbounded`)}(t,e),!0);let r=function(t,e){return t=e.min?Math.max(e.min,t):t,e.max?Math.min(e.max,t):t}(t,e);return k(r,r==t)}class D extends class{constructor(t){this.childMap=new Map,this.key="string"==typeof t?t:s(),this.containsKey=this.childMap.has}get kidsum(){return this.childMap.size}get hasKids(){return this.kidsum>0}get shape(){return this.shapePrefix()}get master(){return null==this.parent||null==this.parent.parent?this.parent:this.parent.master}get children(){return Array.from(this.childMap.values())}get depthKey(){return this.parent?this.parent.depthKey+"<~<"+this.key:this.key}get allChildren(){if(!this.hasKids)return null;let t=this.children;for(let e of t){let n=e.allChildren;n&&(t=t.concat(n))}return t}find(t){if(t=t.toString(),this.childMap.has(t))return this.childMap.get(t);for(let[e,n]of this.childMap){let e=n.find(t);if(e)return e}}adopt(...t){for(let e of t)this.add(e);return this}add(t){return t?this.childMap.has(t.key)?(t.key=`${t.key}_${s()}`,this.add(t)):(t.parent=this,void this.childMap.set(t.key,t)):n(`Could not add [${t}] to [${this.id}]`)}shapePrefix(t=""){let e=`${t}| ${this.type} - ${this.key} \n`;if(this.hasKids){t+="| ";for(let n of this.children)e+=n.shapePrefix(t)}return e}}{constructor(t,n){super(),f(this,"export"),this.actionChain=new e,"object"==typeof t?function(t,e){let n=new Map;for(let[i,r]of Object.entries(t))j.hasOwnProperty(i)?j[i](e,r):n.set(i,r);e.element&&e.element.whenInDOM((t=>{for(let[i,r]of n)if(i=i.toLowerCase(),i.includes("on")){let n=i.split("on")[1].trim();t.listenTo(n,(()=>{e.action(r)}))}}))}(t,this):this.key=t,this.element||this.as()}get _e(){return this.element}get element(){return this.elementDOM}set element(t){this.elementDOM=t,this.id=this.element.id||this.id}setRange(t=null,e=null){return this.range=this.range||{},this.range.min=null===t?this.range.min:t,this.range.max=null===e?this.range.max:e,this}breakLoop(){return this._loopVal=!1,this}setLoop(t,e){return this.setRange(t,e),this._loopVal=!0,this}get dv(){return this.v-this._lv}get value(){return this.v}setValue(t){return this.value=t,this}set value(t){let e=L(t,this.range,this._loopVal);e.set&&(this._lv=this.v,this.v=e.val,this.exec())}exec(){return this.actionChain.execAs(this,...arguments),this}set key(t){this._KEY=null==t?l():t}get key(){return this._KEY}set id(t){this.key=t,this.element&&(this.element.id=this.id)}get id(){return d(this.key)}buildAry(t){for(let e of t)this.add(new D(e,this));return this}build(...t){return this.buildAry(t)}on(t,e=null){var n=this;return{do:function(e){return n.element.listenTo(t,(()=>{n.run(e)})),n}}}as(t=null,e){return t=t||`div#${this.id}.pragma`,this.element=M(t,e),this}addExport(t){this.exports=this.exports||[],this.exports.push(t)}export(...t){for(let e of t)this.addExport(e)}from(t){if(t.exports)for(let e of t.exports)this[e]=t[e];return t.exportChain&&t.exportChain.exec(this),this}wireTo(t){let e=this;return t.do((function(){e.value=this.value})),this}do(){return this.actionChain.add(...arguments),this}run(...t){for(let e of t)this.runAs(e);return this}runAs(t){return t.bind(this)()}contain(...t){for(let e of t)super.add(e),e.isRendered?n(`[${e}] is already appended`):this.element.append(e);return this}pragmatize(){return this.element.appendTo(this.parent&&this.parent.element||"body"),this}pragmatizeAt(t){return this.element.appendTo(t),this}addListeners(t){for(let[e,n]of Object.entries(t))this.on(e).do(n);return this}}const P=["html","css","addClass","setId"];for(let t of P)D.prototype[t]=function(){return this.element[t](...arguments),this};const z=["offset","text","top","left","width","height","x"];for(let t of z)Object.defineProperty(D.prototype,t,{get:function(){return this.element[t]}});globalThis.pragmaSpace.integrateMousetrap=function(t){"function"==typeof t&&(D.prototype.bind=function(e,n,i){let r=this;return t.bind(e,(function(){return r.runAs(n)}),i),this},globalThis.pragmaSpace.mousetrapIntegration=!0,r("Mousetrap configuration detected! Extended Pragmas to support .bind() method!"))};try{globalThis.pragmaSpace.integrateMousetrap(Mousetrap)}catch(t){}const R={get template(){return(new D).run((function(){this.config=function(t){if(t.name){let e=`set${t.name.capitalize()}Template`,n=`_${t.name}Template`;this[e]=function(t){return this[n]=t,this},t.defaultSet&&this[e](t.defaultSet),this._tempOptions={set:e},this.export(n,e),this.onExport((t=>{t.export(n,e)}))}this.export("config"),this.onExport((t=>t.export("config"))),t.name&&delete t.name,t.defaultSet&&delete t.defaultSet;for(let[e,n]of Object.entries(t))this[e]=n,this.export(e),this.onExport((t=>t.export(e)));return this}}))},fromObject:function(t){i(`Creating template object from obj: [${JSON.stringify(t)}]`);const e=t._create||function(t){return t};t._create&&delete t._create;let n={defaults:{},isPragmaTemplate:!0,setDefaults:function(t){return this.defaults=h(this.defaults,t),this}};for(let[i,r]of Object.entries(t))Object.defineProperty(n,i,{get:function(){return e(r,n,...arguments)}});return n},from:function(t,e){if("object"==typeof t)return"function"==typeof e&&(t._create=e),this.fromObject(t);n(`Could not create a template object from argument [${t}])`)}};const K={onOptionCreate:function(t,e){t.contain(e)},optionTemplate:function(t){return new D(t).html(t).addClass("pragma-click").on("click").do((function(){this.parent.value=this.key}))}};var N=Object.freeze({__proto__:null,monitor:function(t){return(new D).from(R.template.config({name:"monitor",defaultSet:t||(t=>t)})).do((function(){this.html(this._monitorTemplate(this.value))})).run((function(){this.export("element","actionChain")}))},slider:function(t){return(new D).from(R.template.config({name:"slider",defaultSet:t||{min:0,max:1e3}})).run((function(){this.as("<input type='range' min=0 max=10 value=5></input>"),this.setRange(0,10),this.on("input").do((function(){this.value=parseInt(this.element.value)})),this.export("element","actionChain")}))},select:function(t){return(new D).from(R.template.config({name:"select",defaultSet:t.options})).run((function(){if(t.onOptionCreate=t.onOptionCreate||K.onOptionCreate,t.optionTemplate=t.optionTemplate||K.optionTemplate,this._selectTemplate.constructor===Array)for(let e of this._selectTemplate)t.onOptionCreate(this,t.optionTemplate(e));else for(let[e,n]of Object.entries(this._selectTemplate)){const i={};i[e]=n,t.onOptionCreate(this,t.optionTemplate(e,n),i)}this.export("element","actionChain","childMap")}))},create:R,icons:function(t){return R.from(t,((t,e)=>F().run((function(){var n,i;this.element=(n=_e(t),(i=e.defaults).fill&&(_(n,i.fill),delete i.fill),n.attr(i)),this.export("element")}))))},icon:function(){}});const I=(t,e)=>new D(t,e),F=I,V=["_e","_p","Pragma","util","tpl"];t.ActionChain=e,t.Pragma=D,t._e=M,t._p=F,t.globalify=function(t){if("undefined"!=typeof pragma&&pragma.__esModule)for(let t of V)globalThis[t]=pragma[t];else console.error("Could not globalify [pragma]")},t.tpl=N,t.util=$,t.π=I,Object.defineProperty(t,"__esModule",{value:!0})}));
