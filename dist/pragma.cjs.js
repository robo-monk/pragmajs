'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

class ActionChain {
  constructor(self){
    this.self = self;
    this.actions = new Map();

    //API extension
    this.delete = this.destroy;
  }

  addWithKey(cb, key=null){
    key = key || this.actions.size;
    this.actions.set(key, cb);
  }

  add(...cbs){
    for (let cb of cbs){
      this.addWithKey(cb);
    }
  }

  forAction(cb){
    for (let [key, action] of this.actions) {
      cb(key, action);
    }
  }

  exec(...args){
    self = this.self;
    this.execAs(self, ...args);
  }

  destroy(...keys){
    keys.forEach(k => this.actions.delete(k));
  }

  execAs(self, ...args){
    this.forAction(function(key, act) {
      act.bind(self)(...args);
    });
  }
}

function throwSoft (desc, potential=null, fixes=['rerun the code 10 times'], trigger=null, force=false) {
  if (!_deving() && !force) return null
  console.error(`%c 🧯 pragma.js  %c \n
      encountered a soft error 🔫 %c \n
      \n${trigger ? `Triggered by: [${trigger.key} ${trigger}]` :``}
      \n${desc} %c\n
      \n${ potential!=null ? `Potential ${potential}: \n\t${fixes.join("\n\t")}` : '' }
      `, "font-size:15px", "font-size: 12px;", "color:whitesmoke", "color:white");
}

function log(){
  if (!_deving()) return null
  console.log(...arguments);
}

function suc(){
  if (!_deving()) return null
  console.log(`%c 🌴 [pragma] \n
      `, "font-size:12px; color:#86D787;", ...arguments, "\n");
}

function rk5(){
 return Math.random().toString(36).substring(3, 6) + Math.random().toString(36).substring(5, 8)
}
function rk8(){ return rk(8)}

function rk(l=7) {
 if (l < 5) return rk5()
 return (rk5() + rk(l-5)).substring(0, l)
}

function generateRandomKey(l){
  return rk(l)
}

function aryDiff(a, b){
  return a.filter(i => b.indexOf(i)<0)
}

function objDiff(obj, edit, recursive=false){
  // TODO add recursive feature
  for (let [key, value] of Object.entries(edit)){
    obj[key] = value;
  }

  return obj
}
function _extend(e, proto){
  Object.setPrototypeOf(e, objDiff(Object.getPrototypeOf(e), proto));
}

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1)
};

function _newChain(name, obj){
  let chainName = `${name}Chain`;
  let eventName = `on${name.capitalize()}`;

  obj[chainName] = new ActionChain(obj);

  obj[eventName] = function (cb, key) {
    obj[chainName].addWithKey(cb, key);
  };

  return {
      chainName: chainName,
      eventName: eventName
  }
}

function createChains(obj, ...chains){
  for (let chain of chains){
      _newChain(chain, obj);
  }
}

function _newEventChain(name, obj){
  let refs = _newChain(name, obj);
  let done = `is${name.capitalize()}ed`;

  obj[refs.chainName].add(() => {
    obj[done] = true;
  });

  obj[refs.eventName] = function (cb) {
    if (obj[done]) return cb(obj)
    obj[refs.chainName].add(cb);
  };
}

function createEventChains(obj, ...chains){
  for (let chain of chains){
      _newEventChain(chain, obj);
  }
}

const toHTMLAttr = s => s.toString().replace(/[^a-z0-9]/gi, '-').toLowerCase();

if (!globalThis.pragmaSpace) globalThis.pragmaSpace = {}; // initialize Pragma Space # TODO put this somewhere else
createEventChains(globalThis.pragmaSpace, "docLoad");
const whenDOM = globalThis.pragmaSpace.onDocLoad;

function _docLoad(){
  if (globalThis.pragmaSpace.isDocLoaded) return

  suc("📰 document is loaded.");
  globalThis.pragmaSpace.docLoadChain.exec();
}
document.addEventListener('readystatechange', () => {
  if (document.readyState === "complete") _docLoad();
});

document.addEventListener('turbolinks:load', () => {
  suc("🚀 TURBOLINKS loaded");
  _docLoad();
});

var search = /[#.]/g;

// Create a hast element from a simple CSS selector.
function parseQuery(selector, defaultTagName = "div") {
  var value = selector || '';
  var props = {
    tag: defaultTagName
  };
  var start = 0;
  let subvalue, previous, match;

  while (start < value.length) {
    search.lastIndex = start;
    match = search.exec(value);
    subvalue = value.slice(start, match ? match.index : value.length);
    if (subvalue) {
      if (!previous) {
        props.tag = subvalue;
      } else if (previous === '#') {
        props.id = subvalue;
      } else if (props.class) {
        props.class.push(subvalue);
      } else {
        props.class = [subvalue];
      }
      start += subvalue.length;
    }
    if (match) {
      previous = match[0];
      start++;
    }
  }
  return props
}

function addClassAryTo(cary, el){
  if (!(Array.isArray(cary))) return throwSoft(`Could not add class [${cary}] to [${el}]`)
  for (let c of cary){
    let _subary = c.split(" ");
    if (_subary.length>1) {
      addClassAryTo(_subary, el);
      continue
    }
    el.classList.add(c);
  }
}

function selectOrCreateDOM(query){
  try {
    let e = document.querySelector(query);
    if (e) return e
  } catch (e) {}

  let q = parseQuery(query);

  let el =  document.createElement(q.tag || "div");
  if (q.id) el.id = q.id;
  if (q.class) addClassAryTo(q.class, el);

  return el
}

function fragmentFromString(strHTML) {
    return document.createRange().createContextualFragment(strHTML);
}

function elementFrom(e){
  if (e instanceof Element) return e
  if (typeof e === "string"){
    if (e[0] === "<") return fragmentFromString(e)
    return selectOrCreateDOM(e)
  }

  return throwSoft(`Could not find/create element from [${e}]`)
}

function fillSVG(svg, color){
  _e$1(svg).findAll("path").forEach(path => {
    const ff = path.attr("fill");
    if (ff!="none" && ff!="transparent"){
      path.attr("fill", color);
    }
  });
}

const snake2camel = str => str.replace(/([-_]\w)/g, g => g[1].toUpperCase()); 

const apply = {
  html: ((html, dom) => {
    dom.innerHTML = html; 
  }),

  pcss: ((pcss, dom) => {
    for (let [key, value] of parse.cssToDict(pcss)){
      dom.style[snake2camel(key)] = value; 
    }
  })
};

const parse = {
  cssToDict: ((str) => {
    str = str.replaceAll("\n", ";").replaceAll(":", " ");
    let cssDict = new Map();
    for (let style of str.split(";")) {
      if (style.replace(/\s/g, "").length < 2) continue
      style = style.trim().split(" ");
      let key = style[0];
      style.shift();
      cssDict.set(key.trim(), style.join(" ").trim());
    }

    // check css properties
    let unsupported = [];
    for (const [key, value] of cssDict.entries()) {
      if (!CSS.supports(key, value)) unsupported.push(`${key.trim()}: ${value.trim()}`);
    }

    if (unsupported.length > 0) {
      throwSoft(`CSS syntax error`, 'typos', unsupported);
    }
    return cssDict
  }),

  css: ((pcss) => {
    let css = "";
    for (let [key, value] of parse.cssToDict(pcss)) {
      //console.log(key, value)
      css += `${key}:${value};`;
    }
    return css
  }),

  html: ((html) => {
    return html
  })
};

if (!globalThis.pragmaSpace) globalThis.pragmaSpace = {}; // initialize Pragma Space # TODO put this somewhere else
globalThis.pragmaSpace.dev =  globalThis.pragmaSpace.dev
    || (typeof process !== "undefined" && process.env && process.env.NODE_ENV === 'development');

function _deving(){
  return globalThis.pragmaSpace.dev
}

var index = /*#__PURE__*/Object.freeze({
  __proto__: null,
  _deving: _deving,
  throwSoft: throwSoft,
  log: log,
  suc: suc,
  whenDOM: whenDOM,
  parseQuery: parseQuery,
  addClassAryTo: addClassAryTo,
  selectOrCreateDOM: selectOrCreateDOM,
  elementFrom: elementFrom,
  toHTMLAttr: toHTMLAttr,
  fragmentFromString: fragmentFromString,
  fillSVG: fillSVG,
  generateRandomKey: generateRandomKey,
  objDiff: objDiff,
  aryDiff: aryDiff,
  _extend: _extend,
  createEventChains: createEventChains,
  createChains: createChains,
  rk: rk,
  rk5: rk5,
  rk8: rk8,
  parse: parse,
  apply: apply
});

// Its like $("#id") of jquery


function domify(e){
  if (e == null || e == undefined) return throwSoft(`Could not find a DOM element for ${e}`)
  if (e.element) return domify(e.element)
  let a = elementFrom(e);
  return a
}

// function elementify(e){
//   if (e == null) return document.body
//   if (e.isPragmaElement === true) return e
//   return new Element(e)
// }

function convertShadowToLight(e){
  var l = document.createElement('template');
  l.appendChild(e.cloneNode(true));
  return l.firstChild
}

function _e$1(query, innerHTML){
    let element = domify(query);

    if (element.constructor === DocumentFragment){
      element = convertShadowToLight(element);
    }

    if (element instanceof Element){
      element.init();
      element._render();
    }

    if (typeof innerHTML === "string") element.html(innerHTML);
    //if (typeof cb === "function") cb(element)
    return element
  //})
}

const elementProto = {
  init: function(){
    this.isPragmaElement = true;
    //this.eventChains("docLoad", "render")
    createEventChains(this, "docLoad", "render");
    whenDOM(() => this.docLoadChain.exec(this));
  },

  _render: function(){
    this.renderChain.exec(this);
  },

  appendTo: function(where){
    this.onDocLoad(() => {
      this._parentElement = domify(where);
      this._parentElement.appendChild(this);
      this._render();
    });
    return this
  },

  prependTo: function(where){
    this.onDocLoad(() => {
      this._parentElement = domify(where);
      this._parentElement.prepend(this);
      this._render();
    });
    return this
  },

  append: function(e){
    this.onRender(() => {
      let d = domify(e);
      this.appendChild(d);
    });
    return this
  },

  destroy: function(){
    this.onRender(()=> {
      // console.log(`destroy ${this}`, this)
      if (this.parentElement) this.parentElement.removeChild(this);
    });
  },

  css: function(styles){
    this.onRender(() => {
      apply.pcss(styles, this);
    });
    return this
  },

  html: function(inner){
    this.onRender(() => {
      apply.html(inner, this);
    });
    return this
  },

  setId: function(id){
    this.id = id;
    return this
  },

  addClass: function(...classes){
    addClassAryTo(classes, this);
    return this
  },

  listenTo: function(...args){
    this.onRender(() => {
      this.addEventListener(...args);
    });
    return this
  },

  attr: function(a, val=undefined){
    if (typeof a === 'string'){
      if (val === undefined) return this.getAttribute(a)
      const key = a;
      a = {};
      a[key] = val;
    }

    for (let [attr, val] of Object.entries(a)){
      this.setAttribute(attr, val);
    }

    return this
  },

  find: function(){
    return this.querySelector(...arguments)
  },

  findAll: function(query){
    return this.querySelectorAll(query)
  },

  deepFindAll: function(query){
    let hits = Array.from(this.findAll(query));
    for (let child of this.children){
      hits = hits.concat(child.deepFindAll(query));
    }
  return hits
  },

  rect: function rect(){
    return typeof this.getBoundingClientRect === "function" ?
            this.getBoundingClientRect() : {}
  },

  offset: function offset(){
    var rect = this.rect();
    return {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX
    }
  },

  x: function(relative_width){
    return this.left + this.width/2 - relative_width/2
  }
};

const elementGetters = {
  top:  function(){
    return this.offset().top
  },
  left: function(){
    return this.offset().left
  },
  width: function(){
    return this.rect().width
  },
  height: function(){
    return this.rect().height
  },
  text: function(){
    return this.textContent
  },
};

for (let [key, val] of Object.entries(elementProto)){
  Element.prototype[key] = val;
}

for (let [key, val] of Object.entries(elementGetters)){
  Object.defineProperty(Element.prototype, key, {
    get: val,
    configurable: true
  });
}

// extend element instead of this weird ass thing

// recursively connected with other nodes

class Node {
  constructor(key) {
    this.childMap = new Map();
    this.key = typeof key === 'string' ? key : rk8();
    // API
    this.containsKey = this.childMap.has;
  }

  get kidsum() { return this.childMap.size }
  get hasKids() { return this.kidsum > 0 }
  get shape() { return this.shapePrefix() }

  get master() {
    if (this.parent == null || this.parent.parent == null) return this.parent
    return this.parent.master
  }

  get children() {
    return Array.from(this.childMap.values())
  }

  get depthKey() {
    if (this.parent) {
      return this.parent.depthKey + "<~<" + this.key
    }
    return this.key
  }

  get allChildren() {
    if (!this.hasKids) return null
    let childs = this.children;
    for (let child of childs) {
      let descs = child.allChildren;
      if (descs) childs = childs.concat(descs);
    }
    return childs
  }

  get(key){
    return this.childMap.get(key)
  }

  find(key) {
    // key = key.toString()
    // recursively find a key
    // return false
    // console.log('trying to find', key)
    // console.log(this.childMap)
    if (this.childMap.has(key)) return this.childMap.get(key)
    for (let [k, value] of this.childMap) {
      let vv = value.find(key);
      if (vv) return vv
    }
  }

  adopt(...children){
      for (let child of children){
        this.add(child);
      }
      return this
  }

  add(node) {
    if (!node) return throwSoft(`Could not add [${node}] to [${this.id}]`)
    if (this.childMap.has(node.key)) {
      node.key = `${node.key}<${rk5()}`;
      return this.add(node)
    }
    node.parent = this;
    this.childMap.set(node.key, node);
    // this.children.push(spragma)
  }

  shapePrefix(prefix = "") {
    let shape = `${prefix}| ${this.type} - ${this.key} \n`;
    if (this.hasKids) {
      prefix += "| ";
      for (let child of this.children) {
        shape += child.shapePrefix(prefix);
      }
    }
    return shape
  }
}

const _parseMap = {

  parent: (self, parent) => {
    self.parent = parent;
  },

  value: (self, v) => {
    self.value = v;
  },

  id: (self, id) => {
    self.id = id;
  },

  class: (self, className) => {
    self._class = className;
  },

  element: (self, element) => {
    if (!(element instanceof Element)) return throwSoft(`Could not add ${element} as the element of [${self}]`)
    self.element = element;
  },

  children: (self, children) => {
    if (children.constructor == Array) return self.buildAry(children)
    self.build(children);
  },

  childTemplate: (self, temp) => {

  }
};

function parseMap(map, obj) {
  let _notParsed = new Map();

  for (let [key, val] of Object.entries(map)){
    if (_parseMap.hasOwnProperty(key)){
      _parseMap[key](obj, val);
      continue
    }
    _notParsed.set(key, val);
  }

  // add listener callbacks
  if (obj.element) {
    obj.element.whenInDOM((self) => {
      for (let [key, val] of _notParsed) {
        key = key.toLowerCase();
        if (key.includes("on")){
          let event = key.split("on")[1].trim();
          self.listenTo(event, () => {
            obj.action(val);
          });
        }
      }
    });
  }
}


function _isRangeBounded(range){
  return range.min != undefined && range.max != undefined
}
function _retValObj(val, set){
  return {
    val: val,
    set: set
  }
}
function _rangeBoundVal(v, range){
  v = range.min ? Math.max(range.min, v) : v;
  v = range.max ? Math.min(range.max, v) : v;
  // console.log(v)
  return v
  // r ? Math.max(r[0], Math.min(v, r[1])) : v
}

function _loopBoundVal(v, range){
  if (!(_isRangeBounded(range)))
    return throwSoft(`Could not loop value, since range (${JSON.stringify(range)}) is unbounded`)

  v = v > range.max ? range.min : v;
  v = v < range.min ? range.max : v;
  return v
}

function _processValue(v, range, _loop) {
  if (!range) return _retValObj(v, true)
  if (_loop) return _retValObj(_loopBoundVal(v, range), true)
  let r = _rangeBoundVal(v, range);
  return _retValObj(r, r==v)
}

class Pragma extends Node {
  constructor(map, parent){
    super();
    createEventChains(this, 'export');

    this.actionChain = new ActionChain();

    // console.log("-------------")
    if (typeof map === "object"){
      parseMap(map, this);
    } else {
      this.key = map;
    }

    if (!this.element) this.as();
  }


  get _e(){ return this.element }
  setElement(e, inheritId=true){
    this.elementDOM = e;
    if (inheritId && this.element.id){
      // console.log(this.element, 'has id')
      this.id = this.element.id;
    }

    return this
  }

  get element(){ return this.elementDOM }
  set element(n) {
    this.setElement(n);
    // TODO check if element is of type elememtn blah blha
    // log(">> SETTING THIS DOM ELEMENT", n, this.id)


    // this.id = this.element.id || this.id
  }

// -------------------- VALUE THINGS

  setRange(min=null, max=null){
    this.range = this.range || {};
    this.range.min = min === null ? this.range.min : min;
    this.range.max = max === null ? this.range.max : max;
    return this
  }

  breakLoop() { this._loopVal = false; return this }
  setLoop(min, max){
    this.setRange(min, max);
    this._loopVal = true;
    return this
  }

  get dv(){
    return this.v - this._lv
  }
  get value(){
    return this.v
  }
  setValue(n) { this.value = n; return this }

  set value(n) {
    let pv = _processValue(n, this.range, this._loopVal);

    if (pv.set) {
      this._lv = this.v;
      this.v = pv.val;
      this.exec();
    }
  }


//  -------------------------------

  exec() {
    this.actionChain.execAs(this, ...arguments);
    return this
  }

  setKey(key) { this.key = key; return this }
  set key(key){
    // console.log('setting key to ', key)
    this._KEY = key == null ? generateRandomKey() : key;
  }

  get key() { return this._KEY }

  set id(n) {
    // console.log('setting key to from id ', n)
    this.key = n;
    if (this.element) this.element.id = this.id;
  }

  get id() {
    return toHTMLAttr(this.key)
  }

  buildAry(aryOfMaps){
    for (let map of aryOfMaps){
      this.add(new Pragma(map, this));
    }
    return this
  }

  build(...maps) {
    return this.buildAry(maps)
  }

  on(event, cb=null){
    var self = this;
    return {
      do: function(cb){
        self.element.listenTo(event, () => {
          self.run(cb);
        });
        return self
      }
    }
  }


  // FOR HTML DOM
  as(query=null, innerHTML){
    query = query || `div#${this.id}.pragma`;
    // this.element = _e(query, innerHTML)
    this.setElement(_e$1(query, innerHTML), false);
    return this
  }

  // FOR TEMPLATES
  addExport(exp){
    this.exports = this.exports || [];
    this.exports.push(exp);
  }

  export(...attrs){
    for (let a of attrs) {
      this.addExport(a);
    }
  }

  from(pragma){
    if (pragma.exports){
      for (let attr of pragma.exports){
        this[attr] = pragma[attr];
      }
    }

    if (pragma.exportChain) pragma.exportChain.exec(this);
    return this
  }

  wireTo(pragma){
    let self = this;
    pragma.do(function(){
      // console.log(this)
      // console.log(p.value)
      // this.value = pragma.value
      self.value = this.value;
    });
    return this
  }

  // ADD SCRIPT TO RUN WHEN VALUE CHANGES
  do(){
    this.actionChain.add(...arguments);
    return this
  }


  // RUN SCRIPTS WITH THIS SCOPE
  run(...scripts){
    for (let script of scripts){
      this.runAs(script);
    }
    return this
  }

  runAs(script){
    return script.bind(this)()
  }

  contain(...childs){
    for (let child of childs) {
      super.add(child);
      if (child.isRendered){
        throwSoft(`[${child}] is already appended`);
      }else {
        this.element.append(child);
      }
    }
    return this
  }

  pragmatize(){
    this.element.appendTo(this.parent ? this.parent.element || "body" : "body");
    return this
  }

  pragmatizeAt(query){
    this.element.appendTo(query);
    return this
  }

  addListeners(listeners){
    for (let [ev, action] of Object.entries(listeners)){
      this.on(ev).do(action);
    }
    return this
  }
}


const _hostElementAttrs = [
  "html",
  "css",
  "addClass",
  "setId",
];

for (let a of _hostElementAttrs) {
 Pragma.prototype[a] = function() {
    this.element[a](...arguments);
    return this
  };
}

const _adoptGetters = [
  // html things
  // "text",
  "offset", "text",
  'top', 'left', 'width', 'height', 'x'
];

for (let a of _adoptGetters) {
  Object.defineProperty(Pragma.prototype, a, {
    get: function() {
      return this.element[a]
    }
  });
}


// Mousetrap integration
globalThis.pragmaSpace.integrateMousetrap = function(trap){
  if (typeof trap === 'function') {
   Pragma.prototype.bind = function(key, f, on=undefined){
     let self = this;
      trap.bind(key, function(){
        return self.runAs(f)
      }, on);
      return this
   };

   globalThis.pragmaSpace.mousetrapIntegration = true;
   suc('Mousetrap configuration detected! Extended Pragmas to support .bind() method!');
 }
};

try {
  globalThis.pragmaSpace.integrateMousetrap(Mousetrap);
} catch (e) {

}

 // Pragma.prototype[a] = function() {
 //    this.element[a](...arguments)
 //  }
/*
 *pragmaMap = {
 *  id: "",
 *  class: "",
 *  value: 0,
 *  elements: [],
 *  element: "" / dom,
 *  onSet: () => {
 *
 *  },
 *  onClick: () => {
 *
 *  }
 *}
 */

const create = {
  get template() {
    return new Pragma()
                .run(function() {
                    this.config = function(conf) {
                      if (conf.name){
                        let setTemplateName =`set${conf.name.capitalize()}Template`;
                        let templateName =`_${conf.name}Template`;

                        this[setTemplateName] = function(f){
                          this[templateName] = f;
                          return this
                        };

                        if (conf.defaultSet) this[setTemplateName](conf.defaultSet);

                        this._tempOptions = {
                          set: setTemplateName,
                        };
                        this.export(
                          templateName,
                          setTemplateName,
                        );

                        this.onExport(pragma => {
                            pragma.export(templateName, setTemplateName);
                        });
                      }

                      // export myself
                      this.export('config');
                      this.onExport(p => p.export('config'));

                      // adopt other keys in config

                      conf.name && delete conf.name;
                      conf.defaultSet && delete conf.defaultSet;

                      for (let [attr, val] of Object.entries(conf)) {
                          this[attr] = val;
                          this.export(attr);
                          this.onExport( pragma => pragma.export(attr) );
                      }

                      return this
                    };
                })
  },

  fromObject: function(obj){
    log(`Creating template object from obj: [${JSON.stringify(obj)}]`);

    // if (obj._blueprint){
    //   delete obj._blueprint
    // }

    const _create = obj._create || function(partial){
      return partial
    };

    if (obj._create) delete obj._create;

    let tpl = {
      defaults: {},
      isPragmaTemplate: true
    };

    tpl.setDefaults = function(obj){
      this.defaults = objDiff(this.defaults, obj);
      return this
    };

    for (let [key, _partial] of Object.entries(obj)){
      Object.defineProperty(tpl, key, {
        get: function() {
          return _create(_partial, tpl, ...arguments)
        }
      });
    }

    return tpl
  },
  from: function(n, _create){
    /*
     * creates template object from a JSON file or object
     */
    //if (typeof n === 'string') return this.fromFile(n)
    if (typeof n === 'object'){
      if (typeof _create === "function")
        n['_create'] = _create;

      return this.fromObject(n)
    }

    throwSoft(`Could not create a template object from argument [${n}])`);
  }
};

function monitor(config){
  return new Pragma()
          .from(create.template.config({
            name: 'monitor',
            defaultSet: config || (v => v)
          }))
          .do(function() {
            this.html(this._monitorTemplate(this.value));
          })
          .run(function() {
            this.export(
              'element',
              'actionChain'
            );
          })
}

function slider(config){
  return new Pragma()
    .from(create.template.config({
      name: 'slider',
      defaultSet: config || {
        min: 0,
        max: 1000
      }
    }))
    .run(function() {
      let min = 0;
      let max = 10;
      let val = 5;
      this.as(`<input type='range' min=${min} max=${max} value=${val}></input>`);
      this.setRange(min, max);
      this.on("input").do(function() {
        this.value = parseInt(this.element.value);
      });
      this.export(
        'element',
        'actionChain',
      );
    })
  }

const defaults = {
  onOptionCreate: function(self, option){
    self.contain(option);
  },
  optionTemplate: function(option){
      return new Pragma(option)
              .html(option)
              .addClass('pragma-click')
              .on('click').do(function(){
                this.parent.value = this.key;
              })
  }
};

function select(config){
  return new Pragma()
    .from(create.template.config({
      name: 'select',
      defaultSet: config.options
    }))
    .run(function() {
      config.onOptionCreate = config.onOptionCreate || defaults.onOptionCreate;
      config.optionTemplate = config.optionTemplate || defaults.optionTemplate;

      if (this._selectTemplate.constructor === Array){
        for (let el of this._selectTemplate){
          config.onOptionCreate(this, config.optionTemplate(el));
        }
      }else {
        for (let [ key, val ] of Object.entries(this._selectTemplate)){
          const pair = {}; pair[key] = val;
          config.onOptionCreate(this, config.optionTemplate(key, val), pair);
        }
      }

      this.export(
        'element',
        'actionChain',
        'childMap'
      );
    })
  }

function applyDefaults(el, d){
  if (d.fill){
    fillSVG(el, d.fill);
    delete d.fill;
  }
  return el.attr(d)
}

function icons(iconSet){
  return create.from(iconSet,
    (_iconSVG, tpl) => _p().run(
      function(){
        this.element = applyDefaults(_e(_iconSVG), tpl.defaults);
        this.export('element');
    })
  )
}

function icon(){

}

var index$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  monitor: monitor,
  slider: slider,
  select: select,
  create: create,
  icons: icons,
  icon: icon
});

// API layer

//const ε = function() {
  //return new Element(...arguments)
//}

const π = (query, opt) => new Pragma(query, opt);
const _p = π;


const exported = [ '_e', '_p', 'Pragma', 'util', 'tpl' ];

function globalify(options){
  if (typeof pragma !== "undefined" && pragma.__esModule){
    for (let func of exported){
      globalThis[func] = pragma[func];
    }
  }else {
    console.error("Could not globalify [pragma]");
  }
}

exports.ActionChain = ActionChain;
exports.Pragma = Pragma;
exports._e = _e$1;
exports._p = _p;
exports.globalify = globalify;
exports.tpl = index$1;
exports.util = index;
exports.π = π;
