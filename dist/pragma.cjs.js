'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var $$1 = require('jquery');
var tippy = require('tippy.js');
var Mousetrap = require('mousetrap');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var $__default = /*#__PURE__*/_interopDefaultLegacy($$1);
var tippy__default = /*#__PURE__*/_interopDefaultLegacy(tippy);
var Mousetrap__default = /*#__PURE__*/_interopDefaultLegacy(Mousetrap);

function forArg(args, cb){
  for (let i=0; i<args.length; i+=1){
    cb(args[i]);
  }
}

const throwSoft = (desc, potential=null, fixes=['rerun the code 10 times'], trigger=null) => {
  console.error(`%c 🧯 pragma.js  %c \n
      encountered a soft error 🔫 %c \n
      \n${trigger ? `Triggered by: [${trigger.key} ${trigger}]` :``}
      \n${desc} %c\n
      \n${ potential!=null ? `Potential ${potential}: \n\t${fixes.join("\n\t")}` : '' }
      `, "font-size:15px", "font-size: 12px;", "color:whitesmoke", "color:white");
  // throw "pragmajs: " + desc
};

const parse = {
  cssToDict:((str) => {
    // console.log(`parsing pcss`)
    //console.log(str)

    str = str.replaceAll("\n", ";").replaceAll(":", " ");
    let cssDict = new Map();
    for(let style of str.split(";")){
      if (style.replace(/\s/g, "").length<2) continue
      style = style.trim().split(" "); 
      let key = style[0];
      style.shift();
      cssDict.set(key.trim(), style.join(" ").trim());
    }

    // check css properties
    let unsupported = [];
    for (const [key, value] of cssDict.entries()){
      if (!CSS.supports(key, value)) unsupported.push(`${key.trim()}: ${value.trim()}`);
    }
    
    if (unsupported.length > 0){
      throwSoft(`CSS syntax error`, 'typos', unsupported);
    }
    return cssDict
  }),
  css: ((pcss) => {
    let css = "";
    for (let [key, value] of parse.cssToDict(pcss)) {
      //console.log(key, value)
      css+=`${key}:${value};`;
    }
    return css
  })
};

// a pragma is defined as a concept, which has an actual physical object "connected"

class Pragma {
  constructor(element=null, listeners={}, key){
    this.element = $__default['default'](element);
    this.generate_key(key);
    // this.children = []
    this.childMap = new Map();
    this.setup_listeners(listeners);
    IntersectionObserver.default = {
      fill: "shit"
    };
  }
  throw(e, f, ff=[]){
    throwSoft(e, f, ff, this);
  }
  get children() {
    return Array.from(this.childMap.values())
  }
  generate_key(key){
    if (key != null) {
      this.key = key;
    }else {
      this.key = btoa(Math.random()).substr(10, 5); 
    }
  }

  find(key){
    // recursively find a key
    // return false
    if (this.childMap.has(key)) return this.childMap.get(key)
    for (let [k, value] of this.childMap) {
      let vv = value.find(key); 
      if (vv) return vv
    }
  }
  add(spragma){
    if (this.childMap.has(spragma.key)) { 
      spragma.key = spragma.key + "~";
      return this.add(spragma)
    }
    spragma.parent = this;
    this.childMap.set(spragma.key, spragma);
    // this.children.push(spragma)
  }
  get kidsum() { return this.childMap.size }
  get hasKids() { return this.kidsum > 0 }

  listen(listeners){
    this.setup_listeners(listeners);
    return this
  }
  setup_listeners(listeners){
    Object.entries(listeners).forEach(([on, cb]) => {
      this.element.on(on, () => cb());
    });
  }
  click(){}

  text(){
    return this.element.text()
  }
  offset(){
    return this.element.offset()
  }
  left(){
    return this.offset().left
  }
  top(){
    return this.offset().top
  }
  height(){
    return this.element.height()
  }
  width(){
    return this.element.width()
  }
  x(relative_width){
    return this.left() + this.width()/2 - relative_width/2
  }
  css(str){
    if (this.element) this.element.css(Object.fromEntries(parse.cssToDict(str)));
    return this
  }

  get _isPragma() { return true }
}

// TODO button action refactor
const buttonAction = (key, value, icon, action) => {
  return {
    key: key,
    type: "button",
    icon: icon,
    value: value,
    click: (master, comp) => {
      action(master, comp);
    }
  }
};

const Monitor = {
  custom: ((key, val=0, tag, action) => {
    return new Comp({
      key: key,
      value: val,
      set: ((value, master, comp) => { 
        if(action) return action(value, comp, master)
      })
    }).as(`<${tag}>${val}</${tag}>`, key+"-monitor")
  }),
  simple: ((key, val=0, tag="p", action=null) => {
    let actionCb = (value, comp, master) => {
      comp.element.text(value);
      if (action) return action(value, comp, master)
    };
    let mon =  Monitor.custom(key, val, tag, actionCb); 
    return mon
  }),
};

const Button = {
  action: ((key, icon, action, tippy) => {
    let btn = new Comp({
      key: key,
      icon: icon,
      type: "button",
      click: action // value comp trigger
    });
    if (tippy) btn.setTippy(tippy);
    return btn
  }),
  controls: ((key, value, step, action, icons) => {

    let plus = Button.action(key+"+", icons["+"] || "+", (master, comp) => {
      comp.parent.value += step;
    });

    let minus = Button.action(key+"-", icons["-"] || "-", (master, comp) => {
      comp.parent.value += -step;
    });

    return Monitor.simple(key, value, "div").prepend(plus).append(minus)
  })
};



const variantUIActivate = (element) => {
  // console.log(`activating ${element.key} to ${element.value}`)
  for (let variant of element.children){
    variant.element.removeClass("pragma-active");
  }
  element.children[element.value].element.addClass("pragma-active");
};

const variantUIAction = (comp, index, attr) => {
  let element = comp.find(attr.key);
  element.value = index;
};

const Variants = (key, value, icon, set, click, variants) => {
  return new Comp(map_variants({key:key,value:value,icon:icon,set:set,click:click,variants:variants}))
};

const map_variants = (attr) =>{
  // key, value, icon, set_cb, clickcb, variants
  return {
    key: attr.key,
    value: attr.value,
    type: "choice",
    element_template: (key, index) => {
      return buttonAction(attr.key, index, attr.icon(key, index), (comp) => {
        variantUIAction(comp, index, attr);
      })
    },
    set: (value, comp) => {
      if (comp && comp.find(attr.key)) variantUIActivate(comp.find(attr.key)); 
      attr.set(value, comp, attr.key);
    },
    variants: attr.variants
  }
};

const Slider = {
  simple: (key, min=0, max=420, val) => {
    val = val || (min+max)/2;
    let slider = Compose(key).as(`<input type='range' min=${min} max=${max} value=${val}></input>`).setRange(min, max);
    slider.element.on('input', () => {
      slider.value = parseInt(slider.element[0].value);
    });

    return slider
  },

  value: (key, min, max, val=0, onupdate) => {
    let monitor = Monitor.simple(key+"_monitor", val, "div"); 
    let slider = Slider.simple(key+"_slider", min, max, val);
    let el = Compose(key).contain(slider, monitor).setRange(min, max);

    slider.addToChain((v) => {
      v = parseInt(v);
      el.value = v;
    });

    el.addToChain((v) => {
      slider.element[0].value = v.toString();
    });

    return el.chain(monitor)
  }
};
const Select = {
  attr: ((key, attrs, onset, icon, value=0) => {
    return new Comp(map_variants({
      key: key,
      value: value,
      icon: (key, index) => {
        let attr = icon(key, index);
        return `<div class="${attr.type}" style='width:25px;height:25px;border-radius:25px;${attr.css}'>${attr.html}</div>`
      },
      set: (v, comp, key) => {
        if (onset) onset(attrs[v], comp, key);
      },
      variants: attrs
    })).setRange(0, attrs.length-1).setLoop()
  }),
  color: ((key, colors, onset, value=0) => {
    return Select.attr(key, colors, onset, (key, index) => { return { css: `background:${key}`, html: "" } }, value) 
  }),
  font: ((key, fonts, onset, value=0) => {
    return Select.attr(key, fonts, onset, (key, index) => { return { css: `font-family:${key}`, html: "Aa" } }, value) 
  })
};

// base
const map = (key, type, icon, elements=null, value=null) => {
  return {key:key,type:type,value:value,icon:icon,elements:elements}
};

const Compose = (key, icon, elements, type="composer") => {
  if (key instanceof Object) return new Comp(key) 
  return new Comp(map(key, type, icon, elements))
};

const Value = (key, value, icon, elements, type="value") => {
  return new Comp(map(key, type, icon, elements))
};

// TODO put these somewhere else
function _pragma(p){
  return p && typeof p === "object" && p._isPragma
}

class Pragmatizer{
  constructor(where){
    this.where = where;
  }
  pragmatize(){
    forArg(arguments, (p) => {
      p.pragmatize(this.where);
    });
  }
}

const at = (where) => {
  if (_pragma(where)) return new Pragmatizer(where.element)
  return new Pragmatizer($(where))
};

const pragmatize = (comp, where) => {
  comp.pragmatize(where);
  return comp
};

const contain = (a, b) => {
  a.contain(b);
  return a
};

const host = (a, b) => {
 return a.host(b)
};


const Bridge = (stream, keys=[], beam=((object, trigger) => console.table(object))) => {
  //console.log(stream, keys, beam)
  function makeData(master){
    let sync = {};
    for (let key of keys){
      let c = master.find(key);
      if (c){
        sync[key] = c.value;
      }else {
        console.warn(`pragmajs > could not find ${key} in ${master.key}
        when bridgin through ${bridgeComp.key}`);
      }
    }
    return sync
  }



  let bridgeComp = Compose(stream.key+"Bridge");

  function transmit(trigger){
    beam(bridgeComp.value, trigger);
  }

  bridgeComp.do(((v, master, trigger) => {
    //console.log(v, master, trigger)
    if (keys.includes(trigger.key)) {
      bridgeComp.actualValue = makeData(master);
      transmit(trigger);
    }

  }));

  stream.chain(bridgeComp);

  //stream.addToChain(((v, master, trigger) => {
    ////bridgeComp.value = syncableObj
    ////if (keys.includes(trigger.key)) transmit(syncableObj(master), trigger) 
  //}))
  bridgeComp.set = (obj) => {
    for (let [key, value] of Object.entries(obj)){
      //console.log(key)
      stream.find(key).value=value;
    }
  };
  

  return bridgeComp
};

class Comp extends Pragma {
  constructor(map, parent = null){
    super();
    this.actualValue = null;

    if (map instanceof Object){
      this.build(map);
      this.parent = parent;
    }else {
      this.key = map;
    }

    this.log_txt = "";

    // this.unchain()
    // TODO add init chain or smth like thatjj
    this.addToChain((
    (v, master, trigger=this) => { 
      if (this.master) {
        master.doChain(v, master, trigger); // let master know something changed
        master.log(`${trigger.key} -> ${v}`);
      }
    }));

    // api
    this.append = this.add;
    this.do = this.addToChain;
  }

  log(n){
    this.log_txt = this.log_txt.concat(" | " + n);
    // console.log(this.log_txt)
  }

  doChain(v, master, trigger=this){
    if (!this.actionChain) return null
    for (let cb of this.actionChain){
      cb(v, master, trigger);
    }
  }

  unchain(){
    this.actionChain = [];
    this.addToChain((
    (v, master, trigger=this) => { 
      if (this.master) {
        master.doChain(v, master, trigger); // let master know something changed
        master.log(`${trigger.key} -> ${v}`);
      }
    }));

    return this
  }

  addToChain(){
    if (!this.actionChain) this.actionChain = [];
    forArg(arguments, (cb => {
      this.actionChain.push(cb);
    }));
    return this
  }

    
  get logs(){
    return this.log_txt
  }
  
  proc_value(v){
    // returns the bounded value and a bool to do the chain or not
    if (this.loopingValue) return [this.loopBoundVal(v), true]
    let r = this.rangeBoundVal(v);
    return [r, r==v]
  }
  set value(v){
    let pv = this.proc_value(v);
    this.actualValue = pv[0];
    if (pv[1]) this.doChain(this.actualValue, this.master); // do the chain if the value is in the range
  }

  get value(){
    return this.actualValue
  }
  get master(){
    if (this.parent == null || this.parent.parent == null) return this.parent
    return this.parent.master
  }

  get html(){
    return {
      class: ((v, reset=false) => { 
        if (reset) this.element.removeClass();
        this.element.addClass(v);
        return this 
      }),
      more: "more cool api capabilities coming soon. Usage: pragma.html.class('lucid').......pragmatize()"
    }
  }

  // actions kinda 

  pragmatize(where){
    //this.compose()
    if (where instanceof Pragma) where = where.element;
    $__default['default'](where ? where : document.body).append(this.element);
    this.isAppended = true;
    return this
  }

  chain(comp){ 
    this.actionChain = this.actionChain.concat(comp.actionChain); 
    return this
  }

  with(id, key){ return this.contain(Compose(key).as(id)) }

  from(id, skip_id=false){
    id = $__default['default'](id);
    this.element.remove();
    this.element = null;      
    if (!skip_id && id.attr("id")) this.key = id.attr("id");
    this.isAppended = true;
    return this.as(id, true)
  }

  as(id, skip_id=false){
    let newElement = $__default['default'](id);
    if (!skip_id) newElement.attr( "id", this.key );
    if (this.element) this.element.replaceWith(newElement);
    this.element = newElement;
    return this
  }

  compose(force=false, tag="div"){
    //if (this.force || !this.element) 
    return this.as($__default['default'](document.createElement(tag)))
  }

  addSilently(){
    forArg(arguments, (child) => {
      super.add(child);
    });
    return this
  }

  add(){
    forArg(arguments, (child) => {
      // if (this.containsKey(child.key)) {
      // }
      super.add(child);
      if (!child.isAppended) this.element.append(child.element);
    });
    return this
  }

  prepend(){
    forArg(arguments, (child) => {
      // if (this.containsKey(child.key)) {
      // }
      super.add(child);
      if (!child.isAppended) this.element.prepend(child.element);
    });
    return this
  }

  buildInside(map){
    let comp = Compose(map.key+"-composer", null, [map]);
    this.buildAndAdd(comp);
    this.host(comp);
  }

  containsKey(key){
    return this.childMap.has(key)
  }

  contain(){
    //this.add(arguments)
    forArg(arguments, (comp) => {
      this.add(comp);
    });
    return this
  }

  setTippy(comp, options){
    if (!options) options = { 
      allowHTML: options,
      interactive: true,
      theme: "pragma",
      arrow: false
    };
    let contentOption = {
      content: comp
    };
    this.tippy = tippy__default['default'](this.element[0], {...contentOption, ...options} );
    return this
  }

  host(){
    const hostCompKey = this.key + "-host";
    let icomp;
    forArg(arguments, (comp) => {
    if (this.tippy){
      // if already hosts something
      icomp = this.find(hostCompKey);
      icomp.contain(comp);
      this.tippy.destroy(); // destory old tippy instance to create new one
    } else {

      icomp = Compose(hostCompKey).contain(comp);
      this.contain(icomp);
    }

    icomp.element.addClass("pragma-tippy");
    this.setTippy(icomp.element[0]);
    });

    return this
  }

  buildAndAdd(element){
      let child = new Comp(element, this);
      this.add(child);
  }
  
  buildArray(ary){
    for (let element of ary){
      this.buildAndAdd(element);
    }
  }

  illustrate(icon){
    if (!this.icon) {       
      this.icon = $__default['default'](document.createElement("div"));
      this.icon.addClass("pragma-icon");
      this.icon.appendTo(this.element);
    }
    this.icon.html(icon);
    return this
  }

  build(map){
    //this.pragmatize()
    this.compose(true);

    if (map.icon) this.illustrate(map.icon);
      

    if (map.elements) this.buildArray(map.elements);
    if (map.hover_element) this.buildInside(map.hover_element);
    if (map.value) this.value = map.value;
    if (map.set) this.addToChain((v, master, comp) => map.set(v, master, comp));
    // if (map.set) this.onset = (v, comp) => { 

    //   this.master.log(`${map.key} -> ${v}`); 
    //   map.set(v, comp) 
    // }

    if (map.key != null){
      this.key = map.key;
      this.element.attr("id", this.key);
    }

    if (map.type){
      this.type = map.type;
      this.element.addClass(`pragma-${map.type}`);
    }

    if (map.click){
      this.onclick = () => { 
          map.click(this.master, this); 
      };
      this.element.addClass(`pragma-clickable`);
      this.setup_listeners({
        "click": this.onclick
      });
    }
    if (map.mouseover){
      this.element.addClass("pragma-hoverable");
      this.setup_listeners({
        "onmouseover": () => {
          map.mouseover(this.master);
        }
      });
    }
    if (map.mouseout){
      this.setup_listeners({
        "mouseout": () => {
           map.mouseover(this.master);
        }
      });
    }

    if (map.element) this.element = $__default['default'](map.element);
    if (map.element_template && map.variants){
      map.variants.forEach((variant, index) => {
        let templ = map.element_template(variant, index);
        templ.type = "option";
        this.buildAndAdd(templ);
      });
    }
  }

  dismantle(){
    this.children = [];
    return this
  }
  leaveUsKidsAlone(){
    return this.dismantle()
  }

  // mousetrap integration
  proc_bind_cb(cb){
    if (!cb){
      if (this.onclick) return (()=> { this.onclick(this.master); })
      return ((comp) => { comp.value += 1; })
    }
    return cb
  }
  bind(keys, cb, event){
    cb = this.proc_bind_cb(cb);
    Mousetrap__default['default'].bind(keys, () => { return cb(this) }, event);
    return this
  }

  get allChildren(){
    if (!this.hasKids) return null
    let childs = this.children;
    for (let child of childs){
      let descs = child.allChildren;
      if (descs) childs = childs.concat(descs);
    }
    return childs
  }

  get depthKey(){
    if (this.parent) {
      return this.parent.depthKey+"<~<"+this.key
    }
    return this.key
  }

  shapePrefix(prefix=""){
    let shape = `${prefix}| ${this.type} - ${this.key} \n`;
    if (this.hasKids) {
        prefix += "| ";
      for (let child of this.children){
        shape += child.shapePrefix(prefix);
      }
    }
    return shape
  }

  setRange(min, max){
    this.rangeAry = [min, max];
    return this 
  }

  loopBoundVal(v){
    if (!this.loopingValue) return v

    let l = this.loopingValue;
    v = v > l[1] ? l[0] :  v;
    v = v < l[0] ? l[1] :  v;
    return v
  }
  setLoop(min, max){
    let actualMin = min || (this.range ? this.range[0] : 0);
    let actualMax = max || (this.range ? this.range[1] : 69);
    this.loopingValue = [actualMin, actualMax];
    return this
  }

  rangeBoundVal(v){
    if (!this.range) return v
    return Math.max(this.range[0], Math.min(v, this.range[1]))
  }

  get range(){
    return this.rangeAry
  }

  get shape(){
    return this.shapePrefix()
  }

  descOf(comp){
    return comp.find(this.key) ? true : false 
  }
  setup_listeners(listeners){
    Object.entries(listeners).forEach(([on, cb]) => {
      this.element.on(on, (event) => cb(event, this));
    });
  }

  
}

// TODO put these helper functions somewhere else
function fill(svg, color){
  svg.find("path").each((i, path)=>{
    path = $__default['default'](path);
    const ff = path.attr("fill");
    if (ff!="none" && ff!="transparent"){
      path.attr("fill", color);
    }
  });
}

function getObjDiff(og, n){
  if (!(typeof og == typeof n === "object")) return n
  for (const [key, val] of Object.entries(n)){
    og[key] = val;
  }
  return og
}

function grabOrThrow(icon, from){
  if (!from) return throwSoft(`Icon Database is not defined, while trying to grab [${icon}] from [${from}].`, "fixes", ["Typo in the file name?", "Did you forget to initialize IconBuilder with an icon database?"])
  const i = from[icon];
  if (!i) return throwSoft(`Could not find ${icon}`)
  return $__default['default'](i)
}

class IconBuilder {
  constructor(database, defaults=null){
    this.db = database;
    this.default = defaults || {
      fill: "black",
      width: "18px",
      height: "18px",
      viewBox: "0 0 24 24"
    };
  }
  set default(n){
    this.defaultOptions = getObjDiff(this.default, n);
  }

  get default(){
    return this.defaultOptions
  }

  optionify(options){
    if (typeof options === 'object') return getObjDiff(this.default, options)
    return this.default
  }

  grab(icon, options){
    options = this.optionify(options); 
    let i = grabOrThrow(icon, this.db);

    for (const [attr, val] of Object.entries(options)){
      if (attr == "fill") fill(i, val);
      i.attr(attr, val);
    }

    return i
  }

  build(icon, options){
    if ((options && options.skip) || dontEnvelope.includes(icon)) return this.db[icon]
    return this.buildIcon(this.db[icon], options)
  }

  buildIcon(icon, options={}){
    return `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="${options.viewBox || this.default.viewBox }" fill="${options.fill || this.default.fill}" 
      width="${options.width || this.default.width}" height="${options.height || this.default.height}" ${options.extra}>
        ${icon}
      </svg>
      `
  }
}

exports.Bridge = Bridge;
exports.Button = Button;
exports.Comp = Comp;
exports.Compose = Compose;
exports.IconBuilder = IconBuilder;
exports.Monitor = Monitor;
exports.Pragma = Pragma;
exports.Select = Select;
exports.Slider = Slider;
exports.Value = Value;
exports.Variants = Variants;
exports.at = at;
exports.contain = contain;
exports.host = host;
exports.parse = parse;
exports.pragmatize = pragmatize;
