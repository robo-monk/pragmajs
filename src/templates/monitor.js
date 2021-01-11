import { Pragma } from "../index"

export const Monitor = new Pragma().as(null, "0") 
  
    

  //custom: ((key, val=0, tag, action) => {
    //return new Comp({
      //key: key,
      //value: val,
      //set: ((value, master, comp) => { 
        //if(action) return action(value, comp, master)
      //})
    //}).as(`<${tag}>${val}</${tag}>`, key+"-monitor")
  //}),

  //simple: ((key, val=0, tag="p", action=null) => {
    //let actionCb = (value, comp, master) => {
      //comp.element.text(value)
      //if (action) return action(value, comp, master)
    //}
    //let mon =  Monitor.custom(key, val, tag, actionCb) 
    //return mon
  //}),  

  //custom: (id, val, tag, action) => {
    //let map = {
      //id: id,
      //value: value,
      //element: _e(tag)
    //}
    //_p()
  //}
