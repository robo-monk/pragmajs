import { Compose, Monitor } from "../../src"

export function timer2(){
  
  // execute this by pressing the play button below!
  let timer = Monitor.simple("timer2", 0, "h1")
  timer.pragmatize("#timerdemo2")
  setInterval(() => timer.value += 1, 1000)
  return ["timer2"]

}

export function timer(){
  
  // execute this by pressing the play button below!
  let timer = Compose({
    key: "timer",
    value: 0,
    set: ((val, m, comp) => {
      comp.find("timer-monitor").element.text(val)
    })
  }).with(`<h1>0</h1>`, "timer-monitor")

  timer.pragmatize("#timerdemo")
  setInterval(() => timer.value += 1, 1000)


  return ["timer"]

}