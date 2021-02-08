'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var __ = require('..');

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
    this.execAs(this.self, ...args);
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

function bench(cb, name){
  console.time(name);
  cb();
  console.timeEnd(name);
}

function objDiff(obj, edit){
  // TODO add recursive feature
  for (let [key, value] of Object.entries(edit)){
    obj[key] = value;
  }

  return obj
}

// function addProperties(obj){
//   for (let [attr, val] of obj){
//     obj[attr] = val
//   }
//   return obj
// }

const snake2camel = str => str.replace(/([-_]\w)/g, g => g[1].toUpperCase()); 

function _extend(e, proto){
  Object.setPrototypeOf(e, objDiff(Object.getPrototypeOf(e), proto));
}

function mimic(obj, mimic, props){
  for (let prop of (props || Object.keys(mimic))){
    let desc = Object.getOwnPropertyDescriptor(mimic, prop); 
    if (!desc) break
    Object.defineProperty(obj, prop, desc);
  }
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

function loopThruClassAryAndDo(cary, el, action){
  if (!(Array.isArray(cary))) return throwSoft(`Could not ${action} class [${cary}] -> [${el}]`)
  for (let c of cary){
    let _subary = c.split(" ");
    if (_subary.length>1) {
      loopThruClassAryAndDo(_subary, el, action);
      //loopThruClassAryTo(_subary, el)
      continue
    }
    el.classList[action](c);
  }
}

function addClassAryTo(cary, el){ loopThruClassAryAndDo(cary, el, 'add'); }
function removeClassAryFrom(cary, el){ loopThruClassAryAndDo(cary, el, 'remove'); }
function toggleClassAryOf(cary, el){ loopThruClassAryAndDo(cary, el, 'toggle'); }

function selectOrCreateDOM(query){
  try {
    let e = document.querySelector(query);
    if (e) return e
  } catch {}

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
  _e(svg).findAll("path").forEach(path => {
    const ff = path.attr("fill");
    if (ff!="none" && ff!="transparent"){
      path.attr("fill", color);
    }
  });
}

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
    str = str.replace(/\n/g, ";").replace(/:/g, " ");
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

const createTemplate = conf => _p()
    .run(function () {
        util.createChains(this, 'config');

        this.config = function(conf){
            this.configChain.exec(conf);
            return this
        };
        
        this.onConfig((conf = {}) => {
            const defaults = ['events', 'chains', 'exports', 'persistentExports'];
            defaults.forEach(attr => {
                if (!conf[attr]) return
                this[`_${attr}`] = conf[attr];
                delete conf[attr];
            });

            if (this._events) util.createEventChains(this, ...(this._events));
            if (this._chains) util.createChains(this, ...(this._chains));
            
            for (let [attr, val] of Object.entries(conf)) {
                this[attr] = val;
                this.export(attr);
            }
            if (this._exports) this.export(...(this._exports));

        });

        this.export('exports', 'config', 'exportChain', 'configChain', 'onConfig');
        
    }, function () {
        if (typeof conf === 'object') this.config(conf);
    });

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
  removeClassAryFrom: removeClassAryFrom,
  toggleClassAryOf: toggleClassAryOf,
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
  snake2camel: snake2camel,
  mimic: mimic,
  bench: bench,
  rk: rk,
  rk5: rk5,
  rk8: rk8,
  parse: parse,
  apply: apply,
  createTemplate: createTemplate
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

function _e(query, innerHTML){
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

  append: function(...elements){
    this.onRender(() => {
      for (let e of elements){
        let d = domify(e);
        this.appendChild(d);  
      }
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
    if (!inner) return this.innerHTML
    this.onRender(() => {
      apply.html(inner, this);
    });
    return this
  },

  setId: function(id){
    this.id = id;
    return this
  },

  setData: function(obj){
    for (let [key, val] of Object.entries(obj)){
      this.dataset[key] = val;
    }
    return this
  },

  getData: function(key){
    return this.dataset[key] 
  },

  addClass: function(...classes){
    addClassAryTo(classes, this);
    return this
  },

  removeClass: function(...classes){
    removeClassAryFrom(classes, this);
    return this
  },

  toggleClass: function(...classes){
    toggleClassAryOf(classes, this); 
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
    return _e(this.query(...arguments))
  },

  findAll: function(query){
    return Array.from(this.queryAll(query)).map(c => _e(c))
  },

  query: function(){
    return this.querySelector(...arguments)
  },

  queryAll: function(query){
    return this.querySelectorAll(query)
  },
  
  hide: function(){
    this.style.display = 'none';
    return this
  },
  
  show: function(){
    this.style.display = '';
    return this
  },

  deepQueryAll: function(query){
    let hits = Array.from(this.queryAll(query));
    for (let child of this.children){
      hits = hits.concat(child.deepQueryAll(query));
    }
    return hits
  },
  deepFindAll: function(query){
    return this.deepQueryAll(query).map(c => _e(c))
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
  classArray: function(){
    return Array.from(this.classList)
  },
  childrenArray: function(){
    return Array.from(this.children)
  }
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
    this._childMap = new Map();
    this.key = typeof key === 'string' ? key : rk8();
    // API
    this.containsKey = this.childMap.has;
  }
  set childMap(n){
    for (let [key, child] of n){
      if (child instanceof Node){
        this.add(child);
      }
    }
  }
  get childMap(){
    return this._childMap
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
    for (let value of this.childMap.values()) {
      let v = value.find(key);
      if (v) return v
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

  delete(key){return this.remove(key)}
  remove(key){
    let node = this.childMap.get(key);
    if (node) this.childMap.delete(key);
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

  key: (self, key) => {
    self.key = key;
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
    // this.key = n
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
    this.setElement(_e(query, innerHTML), false);
    return this
  }

  // FOR TEMPLATES
  addExport(exp){
    this.exports = this.exports || new Set();
    this.exports.add(exp);
  }

  export(...attrs){
    for (let a of attrs) {
      this.addExport(a);
    }
  }

  from(pragma){
    if (pragma.exports){
      __.util.mimic(this, pragma, pragma.exports);
      //for (let attr of pragma.exports){
        //// this[attr] = pragma[attr]
        //let desc = Object.getOwnPropertyDescriptor(pragma, attr) 
        //if (!desc) break

        //Object.defineProperty(this, attr, desc)
      //}
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
    let sample = scripts[0];
    if (typeof sample === 'function'){
      this._runAry(scripts);
    } else if (typeof sample === 'object'){
      this._runAry(Object.values(sample));
    } else {
      throwSoft(`Could not run [${scripts}] as [${this}]`);
    }
    return this
  }

  _runAry(scripts){
    for (let script of scripts){
      this.runAs(script);
    }
  }

  runAs(script){
    return script.bind(this)()
  }
  
  containAry(childs){
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

  contain(...childs){
    return this.containAry(childs)
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
  "removeClass",
  "toggleClass",
  "setId",
  'append',
  'prepend',
  'appendTo',
  'prependTo',
  'listenTo',
  'setData'
];

for (let a of _hostElementAttrs) {
 Pragma.prototype[a] = function() {
    this.element[a](...arguments);
    return this
  };
}

const _adoptElementAttrs = [
  'getData'
];

for (let a of _adoptElementAttrs) {
 Pragma.prototype[a] = function() {
    return this.element[a](...arguments)
  };
}

const _adoptGetters = [
  // html things
  // "text",
  "offset", "text",
  'top', 'left', 'width', 'height', 'x',
  'classArray'
];

for (let a of _adoptGetters) {
  Object.defineProperty(Pragma.prototype, a, {
    get: function() {
      return this.element[a]
    }
  });
}


// Mousetrap integration TODO improve this
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
  log(`Tried to integrate extensions, but failed. To disable,
  this attempt: globalThis.pragmaSpace.integrate3rdParties = false`);
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

function _thread(cb) {
  let code = `
  onmessage = e => postMessage(JSON.stringify((${cb.toString()})(e.data))) 
  `;  
  var blob = new Blob([code], {
    type: "application/javascript"
  });

  var worker = new Worker(URL.createObjectURL(blob));
  
  return function(){
  	worker.postMessage(arguments);
    return new Promise(resolve=> {
    	worker.addEventListener('message', m => resolve(JSON.parse(m.data)));
    })
  }
}

/*
 *
 usage:
 
     const threadedFunction = _thread(data => {
        return 'your palms are ' + data
     })
 
    threadedFunction("sweaty").then(d => console.log('heee', d))
*/
    

function _runAsync(cb) {
    return new Promise(r => r(cb()))
}

function runAsync(...cbs) {
    return _runAsync(_ => {
        for (let cb of cbs) {
            _runAsync(cb);
        }
    })
}

// API layer

//const ε = function() {
  //return new Element(...arguments)
//}

const π = (query, opt) => new Pragma(query, opt);
const _p$1 = π;

const exported = [ '_e', '_p', 'Pragma', 'util', '_thread' ];

function globalify() {
  let pragmaModule = (globalThis || window)["pragma"];
  if (pragmaModule !== "undefined" && pragmaModule.__esModule) {
    for (let func of exported) {
      globalThis[func] = pragmaModule[func];
    }
  } else {
    console.error("Could not globalify [pragma]");
  }
}

function render(location){
  window.location.href = location; 
}

exports.ActionChain = ActionChain;
exports.Pragma = Pragma;
exports._e = _e;
exports._p = _p$1;
exports._runAsync = _runAsync;
exports._thread = _thread;
exports.globalify = globalify;
exports.render = render;
exports.runAsync = runAsync;
exports.util = index;
exports.π = π;
