(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.pragma = {}));
}(this, (function (exports) { 'use strict';

  function throwSoft$1 (desc, potential=null, fixes=['rerun the code 10 times'], trigger=null, force=false) {
    if (!_deving && !force) return null
    console.error(`%c 🧯 pragma.js  %c \n
      encountered a soft error 🔫 %c \n
      \n${trigger ? `Triggered by: [${trigger.key} ${trigger}]` :``}
      \n${desc} %c\n
      \n${ potential!=null ? `Potential ${potential}: \n\t${fixes.join("\n\t")}` : '' }
      `, "font-size:15px", "font-size: 12px;", "color:whitesmoke", "color:white");
  }

  function log(){
    if (!_deving && !force) return null
    console.log(...arguments);
  }

  function suc(){
    console.log(`%c 🌴 [pragma] \n
      `, "font-size:12px; color:#86D787;", ...arguments, "\n");
  }

  const toHTMLAttr = s => s.replace(/[^a-z0-9]/gi, '-').toLowerCase();

  if (!window.pragma) window.pragma = {};

  function whenDOM(cb) {
    // TODO holy shit improve this code im throwing up
    if (document.readyState === 'complete') {
      return cb()
    }

    if (!window.pragma.listeningToTurbolinks){
      window.pragma.listeningToTurbolinks = true;
      document.addEventListener('turbolinks:load', () => {
        suc("🚀 TURBOLINKS loaded");
        return cb()
      });  
    }
    
    document.onreadystatechange = () => {
      return whenDOM(cb)
    };
  }

  var search = /[#.]/g;

  // Create a hast element from a simple CSS selector.
  function parseQuery(selector, defaultTagName = "div") {
    var value = selector || '';
    var props = {};
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
    if (!(Array.isArray(cary))) return throwSoft$1(`Could not add class [${cary}] to [${el}]`)
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
    let e = document.querySelector(query);
    if (e) return e
    let q = parseQuery(query);

    let el =  document.createElement(q.tag || "div");
    if (q.id) el.id = q.id;
    if (q.class) addClassAryTo(q.class, el);

    return el
  }

  function elementFrom(e){
    if (e instanceof HTMLElement) return e

    if (typeof e === "string"){
      return selectOrCreateDOM(e)
    }

    return throwSoft$1(`Could not find/create element from [${e}]`)
  }

  function generateRandomKey(){
    return btoa(Math.random()).substr(10, 5)
  }

  function objDiff(obj, edit, recursive=false){
    // TODO add recursive feature
    for (let [key, value] of Object.entries(edit)){
      // console.log(key)
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
        throwSoft$1(`CSS syntax error`, 'typos', unsupported);
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

  const _deving = process.env.NODE_ENV === 'development';

  var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    _deving: _deving,
    throwSoft: throwSoft$1,
    log: log,
    suc: suc,
    whenDOM: whenDOM,
    parseQuery: parseQuery,
    addClassAryTo: addClassAryTo,
    selectOrCreateDOM: selectOrCreateDOM,
    elementFrom: elementFrom,
    toHTMLAttr: toHTMLAttr,
    generateRandomKey: generateRandomKey,
    objDiff: objDiff,
    _extend: _extend,
    parse: parse,
    apply: apply
  });

  class ActionChain {
    constructor(){
      this.actions = new Map();
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

    exec(...args){
      for (let [key, cb] of this.actions) {
        cb(...args);
      }
    }
  }

  // Its like $("#id") of jquery


  function domify(e){
    if (e == null || e == undefined) return throwSoft$1(`Could not find a DOM element for ${e}`)
    // console.log(e.element)
    if (e.element) return domify(e.element)
    let a = elementFrom(e);
    return a
  }


  function _newChain(name, obj){
    let chainName = `${name}Chain`;
    let eventName = `on${name.capitalize()}`;
    let done = `is${name.capitalize()}ed`;

    obj[chainName] = new ActionChain();

    obj[chainName].add(() => {
      obj[done] = true;
    });

    obj[eventName] = function (cb) {
      if (obj[done]) return cb(obj)
      obj[chainName].add(cb);
    };
  }


  //export default class Element {
    //constructor(query, innerHTML, cb){
      //this.isPragmaElement = true

      //this.eventChains("docLoad", "render")

      //this.onDocLoad(() => {
        //this.element = elementFrom(query)
        //if (this.element instanceof HTMLElement) this._render()
        //if (typeof innerHTML === "string") this.html(innerHTML)
        //if (typeof cb === "function") cb(this.element)
      //})

      //whenDOM(() => this.docLoadChain.exec(this))
    //}

    //set element(n){
      //this.nodeElement = n 
    //}

    //get element(){
      //return this.nodeElement 
    //}

    //eventChains(...chains){
      //for (let chain of chains){
        //_newChain(chain, this) 
      //}
    //}
    
    //_render(){
      //this.renderChain.exec(this)
    //}

    //appendTo(where){
      //this.onDocLoad(() => {
        //domify(where).appendChild(this.element)
        //this._render()
      //})
      //return this
    //}

    //append(e){
      //this.onRender(() => {
        //let d = domify(e)
        //console.log(d)
        //this.element.appendChild(d)
      //})
      //return this 
    //}

    //css(styles){
      //this.onRender(() => {
        //apply.pcss(styles, this.element)
      //})
    //}

    //html(inner){ 
      //this.onRender(() => {
        //apply.html(inner, this.element)
      //})
      //return this
    //}

    //id(id){
      //this.element.id = id
      //return this
    //}

    //addClass(...classes){
      //addClassAryTo(classes, this.element)
      //return this
    //}

    //listenTo(...args){
      //this.onRender(() => {
        //this.element.addEventListener(...args)
      //})
      //return this
    //}
  //}

  function _e(query, innerHTML){
    //whenDOM(function() {
      let element = elementFrom(query);

      if (element instanceof HTMLElement){
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
      this.eventChains("docLoad", "render");
      whenDOM(() => this.docLoadChain.exec(this));
    },
    
    eventChains: function(...chains){
      for (let chain of chains){
        _newChain(chain, this); 
      }
    },
    
    _render: function(){
      this.renderChain.exec(this);
    },

    appendTo: function(where){
      this.onDocLoad(() => {
        domify(where).appendChild(this);
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
    }
  };


  for (let [key, val] of Object.entries(elementProto)){
    HTMLElement.prototype[key] = val;
  }
  //_extend(HTMLElement, elementProto)

  // recursively connected with other nodes

  class Node {
    constructor(key) {
      this.childMap = new Map();
      this.key = key || generateRandomKey();
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

    find(key) {
      // recursively find a key
      // return false
      if (this.childMap.has(key)) return this.childMap.get(key)
      for (let [k, value] of this.childMap) {
        let vv = value.find(key);
        if (vv) return vv
      }
    }

    add(spragma) {
      if (this.childMap.has(spragma.key)) {
        spragma.key = spragma.key + "~";
        return this.add(spragma)
      }
      spragma.parent = this;
      this.childMap.set(spragma.key, spragma);
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
      self.element = _e(element);
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

  class Pragma extends Node {
    constructor(map, parent){
      super();

      this.actionChain = new ActionChain();

      if (typeof map === "object"){
        parseMap(map, this);
      } else {
        this.key = map;
      }

      this.key = this.key || generateRandomKey();
      this.element = this.element || _e(`#${this.id}`); 
    }

    set value(n) {

      function _processValue(v) {
        return v
      }

      this.v = _processValue(n);
      this.exec();
    }

    get value(){
      return this.v
    }


    exec() { 
      this.actionChain.exec(this, this.value, ...arguments);
      return this
    }

    action(cb){
      return cb(this)
    }

    set id(n) {
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

    listenTo(...args){
        return this.element.listenTo(...args)
    }

    do(){
      this.actionChain.add(...arguments);
      return this
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
    }
  }


  const _adoptElementAttrs = [
    "listenTo",
    "html",
    "css",
    "addClass",
    "setId"
  ];

  for (let a of _adoptElementAttrs) {
   Pragma.prototype[a] = function() {
      this.element[a](...arguments);
      return this
    }; 
  }


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

  // API layer

  //const ε = function() {
    //return new Element(...arguments)
  //}

  const π = (query, html) => {
    let p = new Pragma();
    p.element = _e(query, html);
    p.id = p.element.id;
    return p
  };

  const _p = π;

  exports.Pragma = Pragma;
  exports._e = _e;
  exports._p = _p;
  exports.util = index;
  exports.π = π;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
