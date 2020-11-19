import { Compose, Monitor, Select } from "../../src"

export default function trip(paper){
  const range = (from, to, step) =>
    [...Array(Math.floor((to - from) / step) + 1)].map((_, i) => from + i * step);

  new Promise( (resolve) => {

    Compose("trip-prompt").with("<h2> How much do you hate your pc </h2>")
    .contain(Select.attr("epilepsy", range(1,10, 1), (value) => {
        resolve(value)
      }, (key, index) => { return { html: key, key: key }}))
    .pragmatize("#tripdemo")
  }).then((v) => { 
    paper.element.css({"transition": "all 1.3s ease"})
    paper.element.css({"background": "rgb(10,10,30)"})

    setTimeout(() => {
      $("#trip-prompt").fadeOut()
      // ("Have a nice trip! Epilepsy warning")  
    }, 50)
    setTimeout( () => {

      paper.element.text("")
      
      let rgb = [104, 67, 202]
      // let max = 100
      // let div =  1.07

      let max = (v/2)*100
      let div =  1 + (7/max)
      let i = 0
      const Portal = (el, rgb) => {
        let epilepsy = .3
        let sq = `<div class='pragma-composer' style='transition:all ${epilepsy}s ease;padding: 0px;width:${el.width()/(div)}px; height:${el.height()/div}px; background:rgb(${rgb.join(", ")});'></div>`
        let m = Monitor.simple("portal", rgb, "div", (value, elem) =>{
          elem.element.css({"background": `rgb(${value.join(", ")})`})
        }).as(sq)
        setTimeout(() => {
          m.element.css({"transform": `rotate(${(div-1)*30}deg)`})
        }, 2000)
        setInterval(()=>{
          (m.value).forEach((n, i) => {
            let v = m.value
            v[i] = (n + 10)%255
            m.value = v
          })
        }, epilepsy*2000)
        return m
      }
      function createSqure(el, rgb){
        if (max <= i) return new Promise((r)=>r(null))
        i++

        rgb.forEach((n, i) => {
          rgb[i] = n + 30
        })
        return new Promise((r) => {
          setTimeout(()=>{
            // let newel = (Compose("trip").as(sq)).pragmatize(el)
            let newel = Portal(el, rgb).pragmatize(el.element)

            createSqure(newel, rgb).then((sq) => {
              r((sq) ? el.contain(sq) : newel)
            })
              
          }, 90)
        })
      }


      createSqure(paper, rgb)
      // paper.contain()

      /* execute this by pressing the play button below! */
      }, 2000)
  })


  return ["trip"]
}