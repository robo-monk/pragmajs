function t(t,e=null,n=["rerun the code 10 times"],i=null,r=!1){if(!w()&&!r)return null;console.error(`%c 🧯 pragma.js  %c \n\n      encountered a soft error 🔫 %c \n\n      \n${i?`Triggered by: [${i.key} ${i}]`:""}\n      \n${t} %c\n\n      \n${null!=e?`Potential ${e}: \n\t${n.join("\n\t")}`:""}\n      `,"font-size:15px","font-size: 12px;","color:whitesmoke","color:white")}function e(){if(!w())return null;console.log(...arguments)}function n(){if(!w())return null;console.log("%c 🌴 [pragma] \n\n      ","font-size:12px; color:#86D787;",...arguments,"\n")}class i{constructor(t){this.self=t,this.actions=new Map,this.delete=this.destroy}addWithKey(t,e=null){e=e||this.actions.size,this.actions.set(e,t)}add(...t){for(let e of t)this.addWithKey(e)}forAction(t){for(let[e,n]of this.actions)t(e,n)}exec(...t){this.execAs(this.self,...t)}destroy(...t){t.forEach((t=>this.actions.delete(t)))}execAs(t,...e){this.forAction((function(n,i){i.bind(t)(...e)}))}}function r(){return Math.random().toString(36).substring(3,6)+Math.random().toString(36).substring(5,8)}function o(){return s(8)}function s(t=7){return t<5?r():(r()+s(t-5)).substring(0,t)}function a(t){return s(t)}function l(t,e){for(let[n,i]of Object.entries(e))t[n]=i;return t}const h=t=>t.replace(/([-_]\w)/g,(t=>t[1].toUpperCase()));function u(t,e){let n=`${t}Chain`,r=`on${t.capitalize()}`;return e[n]=new i(e),e[r]=function(t,i){e[n].addWithKey(t,i)},{chainName:n,eventName:r}}function c(t,e){let n=u(t,e),i=`is${t.capitalize()}ed`;e[n.chainName].add((()=>{e[i]=!0})),e[n.eventName]=function(t){if(e[i])return t(e);e[n.chainName].add(t)}}function f(t,...e){for(let n of e)c(n,t)}String.prototype.capitalize=function(){return this.charAt(0).toUpperCase()+this.slice(1)};const d=t=>t.toString().replace(/[^a-z0-9]/gi,"-").toLowerCase();globalThis.pragmaSpace||(globalThis.pragmaSpace={}),f(globalThis.pragmaSpace,"docLoad");const p=globalThis.pragmaSpace.onDocLoad;function m(){globalThis.pragmaSpace.isDocLoaded||(n("📰 document is loaded."),globalThis.pragmaSpace.docLoadChain.exec())}document.addEventListener("readystatechange",(()=>{"complete"===document.readyState&&m()})),document.addEventListener("turbolinks:load",(()=>{n("🚀 TURBOLINKS loaded"),m()}));var g=/[#.]/g;function y(t,e="div"){var n=t||"",i={tag:e},r=0;let o,s,a;for(;r<n.length;)g.lastIndex=r,a=g.exec(n),o=n.slice(r,a?a.index:n.length),o&&(s?"#"===s?i.id=o:i.class?i.class.push(o):i.class=[o]:i.tag=o,r+=o.length),a&&(s=a[0],r++);return i}function b(e,n,i){if(!Array.isArray(e))return t(`Could not ${i} class [${e}] -> [${n}]`);for(let t of e){let e=t.split(" ");e.length>1?b(e,n,i):n.classList[i](t)}}function x(t,e){b(t,e,"add")}function v(t,e){b(t,e,"remove")}function C(t,e){b(t,e,"toggle")}function T(t){try{let e=document.querySelector(t);if(e)return e}catch{}let e=y(t),n=document.createElement(e.tag||"div");return e.id&&(n.id=e.id),e.class&&x(e.class,n),n}function A(t){return document.createRange().createContextualFragment(t)}function _(e){return e instanceof Element?e:"string"==typeof e?"<"===e[0]?A(e):T(e):t(`Could not find/create element from [${e}]`)}function O(t,e){j(t).findAll("path").forEach((t=>{const n=t.attr("fill");"none"!=n&&"transparent"!=n&&t.attr("fill",e)}))}const S={html:(t,e)=>{e.innerHTML=t},pcss:(t,e)=>{for(let[n,i]of $.cssToDict(t))e.style[h(n)]=i}},$={cssToDict:e=>{e=e.replace(/\n/g,";").replace(/:/g," ");let n=new Map;for(let t of e.split(";")){if(t.replace(/\s/g,"").length<2)continue;t=t.trim().split(" ");let e=t[0];t.shift(),n.set(e.trim(),t.join(" ").trim())}let i=[];for(const[t,e]of n.entries())CSS.supports(t,e)||i.push(`${t.trim()}: ${e.trim()}`);return i.length>0&&t("CSS syntax error","typos",i),n},css:t=>{let e="";for(let[n,i]of $.cssToDict(t))e+=`${n}:${i};`;return e},html:t=>t};function w(){return globalThis.pragmaSpace.dev}globalThis.pragmaSpace||(globalThis.pragmaSpace={}),globalThis.pragmaSpace.dev=globalThis.pragmaSpace.dev||"undefined"!=typeof process&&process.env&&"development"===process.env.NODE_ENV;var M=Object.freeze({__proto__:null,_deving:w,throwSoft:t,log:e,suc:n,whenDOM:p,parseQuery:y,addClassAryTo:x,removeClassAryFrom:v,toggleClassAryOf:C,selectOrCreateDOM:T,elementFrom:_,toHTMLAttr:d,fragmentFromString:A,fillSVG:O,generateRandomKey:a,objDiff:l,aryDiff:function(t,e){return t.filter((t=>e.indexOf(t)<0))},_extend:function(t,e){Object.setPrototypeOf(t,l(Object.getPrototypeOf(t),e))},createEventChains:f,createChains:function(t,...e){for(let n of e)u(n,t)},snake2camel:h,bench:function(...t){for(let e of t)console.time(e.name),e(),console.timeEnd(e.name)},rk:s,rk5:r,rk8:o,parse:$,apply:S});function E(e){if(null==e||null==e)return t(`Could not find a DOM element for ${e}`);if(e.element)return E(e.element);return _(e)}function j(t,e){let n=E(t);var i,r;return n.constructor===DocumentFragment&&(i=n,(r=document.createElement("template")).appendChild(i.cloneNode(!0)),n=r.firstChild),n instanceof Element&&(n.init(),n._render()),"string"==typeof e&&n.html(e),n}const k={init:function(){this.isPragmaElement=!0,f(this,"docLoad","render"),p((()=>this.docLoadChain.exec(this)))},_render:function(){this.renderChain.exec(this)},appendTo:function(t){return this.onDocLoad((()=>{this._parentElement=E(t),this._parentElement.appendChild(this),this._render()})),this},prependTo:function(t){return this.onDocLoad((()=>{this._parentElement=E(t),this._parentElement.prepend(this),this._render()})),this},append:function(...t){return this.onRender((()=>{for(let e of t){let t=E(e);this.appendChild(t)}})),this},destroy:function(){this.onRender((()=>{this.parentElement&&this.parentElement.removeChild(this)}))},css:function(t){return this.onRender((()=>{S.pcss(t,this)})),this},html:function(t){return t?(this.onRender((()=>{S.html(t,this)})),this):this.innerHTML},setId:function(t){return this.id=t,this},addClass:function(...t){return x(t,this),this},removeClass:function(...t){return v(t,this),this},toggleClass:function(...t){return C(t,this),this},listenTo:function(...t){return this.onRender((()=>{this.addEventListener(...t)})),this},attr:function(t,e){if("string"==typeof t){if(void 0===e)return this.getAttribute(t);const n=t;(t={})[n]=e}for(let[e,n]of Object.entries(t))this.setAttribute(e,n);return this},find:function(){return j(this.query(...arguments))},findAll:function(t){return Array.from(this.queryAll(t)).map((t=>j(t)))},query:function(){return this.querySelector(...arguments)},queryAll:function(t){return this.querySelectorAll(t)},hide:function(){return this.style.display="none",this},show:function(){return this.style.display="",this},deepQueryAll:function(t){let e=Array.from(this.queryAll(t));for(let n of this.children)e=e.concat(n.deepQueryAll(t));return e},deepFindAll:function(t){return this.deepQueryAll(t).map((t=>j(t)))},rect:function(){return"function"==typeof this.getBoundingClientRect?this.getBoundingClientRect():{}},offset:function(){var t=this.rect();return{top:t.top+window.scrollY,left:t.left+window.scrollX}},x:function(t){return this.left+this.width/2-t/2}},L={top:function(){return this.offset().top},left:function(){return this.offset().left},width:function(){return this.rect().width},height:function(){return this.rect().height},text:function(){return this.textContent},classArray:function(){return Array.from(this.classList)},childrenArray:function(){return Array.from(this.children)}};for(let[t,e]of Object.entries(k))Element.prototype[t]=e;for(let[t,e]of Object.entries(L))Object.defineProperty(Element.prototype,t,{get:e,configurable:!0});const D={parent:(t,e)=>{t.parent=e},value:(t,e)=>{t.value=e},id:(t,e)=>{t.id=e},class:(t,e)=>{t._class=e},element:(e,n)=>{if(!(n instanceof Element))return t(`Could not add ${n} as the element of [${e}]`);e.element=n},children:(t,e)=>{if(e.constructor==Array)return t.buildAry(e);t.build(e)},childTemplate:(t,e)=>{}};function P(t,e){return{val:t,set:e}}function z(e,n,i){if(!n)return P(e,!0);if(i)return P(function(e,n){return function(t){return null!=t.min&&null!=t.max}(n)?e=(e=e>n.max?n.min:e)<n.min?n.max:e:t(`Could not loop value, since range (${JSON.stringify(n)}) is unbounded`)}(e,n),!0);let r=function(t,e){return t=e.min?Math.max(e.min,t):t,e.max?Math.min(e.max,t):t}(e,n);return P(r,r==e)}class K extends class{constructor(t){this.childMap=new Map,this.key="string"==typeof t?t:o(),this.containsKey=this.childMap.has}get kidsum(){return this.childMap.size}get hasKids(){return this.kidsum>0}get shape(){return this.shapePrefix()}get master(){return null==this.parent||null==this.parent.parent?this.parent:this.parent.master}get children(){return Array.from(this.childMap.values())}get depthKey(){return this.parent?this.parent.depthKey+"<~<"+this.key:this.key}get allChildren(){if(!this.hasKids)return null;let t=this.children;for(let e of t){let n=e.allChildren;n&&(t=t.concat(n))}return t}get(t){return this.childMap.get(t)}find(t){if(this.childMap.has(t))return this.childMap.get(t);for(let e of this.childMap.values()){let n=e.find(t);if(n)return n}}adopt(...t){for(let e of t)this.add(e);return this}add(e){return e?this.childMap.has(e.key)?(e.key=`${e.key}<${r()}`,this.add(e)):(e.parent=this,void this.childMap.set(e.key,e)):t(`Could not add [${e}] to [${this.id}]`)}delete(t){return this.remove(t)}remove(t){this.childMap.get(t)&&this.childMap.delete(t)}shapePrefix(t=""){let e=`${t}| ${this.type} - ${this.key} \n`;if(this.hasKids){t+="| ";for(let n of this.children)e+=n.shapePrefix(t)}return e}}{constructor(t,e){super(),f(this,"export"),this.actionChain=new i,"object"==typeof t?function(t,e){let n=new Map;for(let[i,r]of Object.entries(t))D.hasOwnProperty(i)?D[i](e,r):n.set(i,r);e.element&&e.element.whenInDOM((t=>{for(let[i,r]of n)if(i=i.toLowerCase(),i.includes("on")){let n=i.split("on")[1].trim();t.listenTo(n,(()=>{e.action(r)}))}}))}(t,this):this.key=t,this.element||this.as()}get _e(){return this.element}setElement(t,e=!0){return this.elementDOM=t,e&&this.element.id&&(this.id=this.element.id),this}get element(){return this.elementDOM}set element(t){this.setElement(t)}setRange(t=null,e=null){return this.range=this.range||{},this.range.min=null===t?this.range.min:t,this.range.max=null===e?this.range.max:e,this}breakLoop(){return this._loopVal=!1,this}setLoop(t,e){return this.setRange(t,e),this._loopVal=!0,this}get dv(){return this.v-this._lv}get value(){return this.v}setValue(t){return this.value=t,this}set value(t){let e=z(t,this.range,this._loopVal);e.set&&(this._lv=this.v,this.v=e.val,this.exec())}exec(){return this.actionChain.execAs(this,...arguments),this}setKey(t){return this.key=t,this}set key(t){this._KEY=null==t?a():t}get key(){return this._KEY}set id(t){this.key=t,this.element&&(this.element.id=this.id)}get id(){return d(this.key)}buildAry(t){for(let e of t)this.add(new K(e,this));return this}build(...t){return this.buildAry(t)}on(t,e=null){var n=this;return{do:function(e){return n.element.listenTo(t,(()=>{n.run(e)})),n}}}as(t=null,e){return t=t||`div#${this.id}.pragma`,this.setElement(j(t,e),!1),this}addExport(t){this.exports=this.exports||[],this.exports.push(t)}export(...t){for(let e of t)this.addExport(e)}from(t){if(t.exports)for(let e of t.exports)this[e]=t[e];return t.exportChain&&t.exportChain.exec(this),this}wireTo(t){let e=this;return t.do((function(){e.value=this.value})),this}do(){return this.actionChain.add(...arguments),this}run(...e){let n=e[0];return"function"==typeof n?this._runAry(e):"object"==typeof n?this._runAry(Object.values(n)):t(`Could not run [${e}] as [${this}]`),this}_runAry(t){for(let e of t)this.runAs(e)}runAs(t){return t.bind(this)()}containAry(e){for(let e of childs)super.add(e),e.isRendered?t(`[${e}] is already appended`):this.element.append(e);return this}contain(...t){return this.containAry(t)}pragmatize(){return this.element.appendTo(this.parent&&this.parent.element||"body"),this}pragmatizeAt(t){return this.element.appendTo(t),this}addListeners(t){for(let[e,n]of Object.entries(t))this.on(e).do(n);return this}}const R=["html","css","addClass","removeClass","toggleClass","setId","append","prepend","appendTo","prependTo","listenTo"];for(let t of R)K.prototype[t]=function(){return this.element[t](...arguments),this};const N=["offset","text","top","left","width","height","x","classArray"];for(let t of N)Object.defineProperty(K.prototype,t,{get:function(){return this.element[t]}});globalThis.pragmaSpace.integrateMousetrap=function(t){"function"==typeof t&&(K.prototype.bind=function(e,n,i){let r=this;return t.bind(e,(function(){return r.runAs(n)}),i),this},globalThis.pragmaSpace.mousetrapIntegration=!0,n("Mousetrap configuration detected! Extended Pragmas to support .bind() method!"))};try{globalThis.pragmaSpace.integrateMousetrap(Mousetrap)}catch(t){e("Tried to integrate extensions, but failed. To disable,\n  this attempt: globalThis.pragmaSpace.integrate3rdParties = false")}const q={get template(){return(new K).run((function(){this.config=function(t){if(t.name){let e=`set${t.name.capitalize()}Template`,n=`_${t.name}Template`;this[e]=function(t){return this[n]=t,this},t.defaultSet&&this[e](t.defaultSet),this._tempOptions={set:e},this.export(n,e),this.onExport((t=>{t.export(n,e)}))}this.export("config"),this.onExport((t=>t.export("config"))),t.name&&delete t.name,t.defaultSet&&delete t.defaultSet;for(let[e,n]of Object.entries(t))this[e]=n,this.export(e),this.onExport((t=>t.export(e)));return this}}))},fromObject:function(t){e(`Creating template object from obj: [${JSON.stringify(t)}]`);const n=t._create||function(t){return t};t._create&&delete t._create;let i={defaults:{},isPragmaTemplate:!0,setDefaults:function(t){return this.defaults=l(this.defaults,t),this}};for(let[e,r]of Object.entries(t))Object.defineProperty(i,e,{get:function(){return n(r,i,...arguments)}});return i},from:function(e,n){if("object"==typeof e)return"function"==typeof n&&(e._create=n),this.fromObject(e);t(`Could not create a template object from argument [${e}])`)}};const I={onOptionCreate:function(t,e){t.contain(e)},optionTemplate:function(t){return new K(t).html(t).addClass("pragma-click").on("click").do((function(){this.parent.value=this.key}))}};var F=Object.freeze({__proto__:null,monitor:function(t){return(new K).from(q.template.config({name:"monitor",defaultSet:t||(t=>t)})).do((function(){this.html(this._monitorTemplate(this.value))})).run((function(){this.export("element","actionChain")}))},slider:function(t){return(new K).from(q.template.config({name:"slider",defaultSet:t||{min:0,max:1e3}})).run((function(){this.as("<input type='range' min=0 max=10 value=5></input>"),this.setRange(0,10),this.on("input").do((function(){this.value=parseInt(this.element.value)})),this.export("element","actionChain")}))},select:function(t){return(new K).from(q.template.config({name:"select",defaultSet:t.options})).run((function(){if(t.onOptionCreate=t.onOptionCreate||I.onOptionCreate,t.optionTemplate=t.optionTemplate||I.optionTemplate,this._selectTemplate.constructor===Array)for(let e of this._selectTemplate)t.onOptionCreate(this,t.optionTemplate(e));else for(let[e,n]of Object.entries(this._selectTemplate)){const i={};i[e]=n,t.onOptionCreate(this,t.optionTemplate(e,n),i)}this.export("element","actionChain","childMap")}))},create:q,icons:function(t){return q.from(t,((t,e)=>Q().run((function(){var n,i;this.element=(n=j(t),(i=e.defaults).fill&&(O(n,i.fill),delete i.fill),n.attr(i)),this.export("element")}))))},icon:function(){}});const V=(t,e)=>new K(t,e),Q=V,B=["_e","_p","Pragma","util","tpl"];function H(){let t=(globalThis||window).pragma;if("undefined"!==t&&t.__esModule)for(let e of B)globalThis[e]=t[e];else console.error("Could not globalify [pragma]")}function U(t){window.location.href=t}export{i as ActionChain,K as Pragma,j as _e,Q as _p,H as globalify,U as render,F as tpl,M as util,V as π};
