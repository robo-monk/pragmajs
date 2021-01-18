let uiIcons = {"gate": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path fill=\"none\" d=\"M0 0h24v24H0z\"/><path d=\"M18.901 10a2.999 2.999 0 0 0 4.075 1.113 3.5 3.5 0 0 1-1.975 3.55L21 21h-6v-2a3 3 0 0 0-5.995-.176L9 19v2H3v-6.336a3.5 3.5 0 0 1-1.979-3.553A2.999 2.999 0 0 0 5.098 10h13.803zm-1.865-7a3.5 3.5 0 0 0 4.446 2.86 3.5 3.5 0 0 1-3.29 3.135L18 9H6a3.5 3.5 0 0 1-3.482-3.14A3.5 3.5 0 0 0 6.964 3h10.072z\" fill=\"#000\"/></svg>", "alien": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path fill=\"none\" d=\"M0 0h24v24H0z\"/><path d=\"M12 2a8.5 8.5 0 0 1 8.5 8.5c0 6.5-5.5 12-8.5 12s-8.5-5.5-8.5-12A8.5 8.5 0 0 1 12 2zm5.5 10a4.5 4.5 0 0 0-4.475 4.975 4.5 4.5 0 0 0 4.95-4.95A4.552 4.552 0 0 0 17.5 12zm-11 0c-.16 0-.319.008-.475.025a4.5 4.5 0 0 0 4.95 4.95A4.5 4.5 0 0 0 6.5 12z\" fill=\"#000\"/></svg>"}

pragma.globalify()
pragmaSpace.dev = true


_p('test')
  .html("hahah this is the shit")
  .pragmatizeAt("p")

// const icons = tpl.create.from(uiIcons)
const icons = tpl.icons(uiIcons).setDefaults({
  fill: 'whitesmoke'
})

let iconGate = _p("gate").from(icons.gate)
iconGate.pragmatizeAt("p")

let monitor = _p('tv')
          .setValue(0)
          .from(tpl.monitor())
          .setMonitorTemplate(
            v => `${v} second${v == 1 ? ' has' : 's have'} passed`)
          .pragmatizeAt("#paper")
          .setLoop(0, 10)

setInterval(() => {
  monitor.value += 1
}, 1000)


let sliderView = _p("slider view")

let slider = _p("slider")
            .from(tpl.slider({
              min: 0,
              max: 10
            }))

let sliderMonitor = _p("slider monitor")
    .from(tpl.monitor())
    .wireTo(slider)


sliderView.contain(slider, sliderMonitor)
          .pragmatizeAt("#paper")

// _e(icons.gate).appendTo("p")
//let ppp = _p('meow')
//ppp.kaka = "haha"
//ppp.export = ["kaka"]

//console.log(_p('icon').from(ppp).kaka)
