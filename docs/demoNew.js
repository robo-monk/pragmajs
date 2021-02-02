let uiIcons = {"gate": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path fill=\"none\" d=\"M0 0h24v24H0z\"/><path d=\"M18.901 10a2.999 2.999 0 0 0 4.075 1.113 3.5 3.5 0 0 1-1.975 3.55L21 21h-6v-2a3 3 0 0 0-5.995-.176L9 19v2H3v-6.336a3.5 3.5 0 0 1-1.979-3.553A2.999 2.999 0 0 0 5.098 10h13.803zm-1.865-7a3.5 3.5 0 0 0 4.446 2.86 3.5 3.5 0 0 1-3.29 3.135L18 9H6a3.5 3.5 0 0 1-3.482-3.14A3.5 3.5 0 0 0 6.964 3h10.072z\" fill=\"#000\"/></svg>", "alien": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" width=\"24\" height=\"24\"><path fill=\"none\" d=\"M0 0h24v24H0z\"/><path d=\"M12 2a8.5 8.5 0 0 1 8.5 8.5c0 6.5-5.5 12-8.5 12s-8.5-5.5-8.5-12A8.5 8.5 0 0 1 12 2zm5.5 10a4.5 4.5 0 0 0-4.475 4.975 4.5 4.5 0 0 0 4.95-4.95A4.552 4.552 0 0 0 17.5 12zm-11 0c-.16 0-.319.008-.475.025a4.5 4.5 0 0 0 4.95 4.95A4.5 4.5 0 0 0 6.5 12z\" fill=\"#000\"/></svg>"}

pragmaSpace.dev = true
pragma.globalify()


//_p('test')
  //.html("hahah this is the shit")
  //.pragmatizeAt("p")

//// const icons = tpl.create.from(uiIcons)
//const icons = tpl.icons(uiIcons).setDefaults({
  //fill: 'whitesmoke'
//})

//let iconGate = _p("gate").from(icons.gate)
//iconGate.pragmatizeAt("p")

//let monitor = _p('tv')
          //.setValue(0)
          //.from(tpl.monitor())
          //.setMonitorTemplate(
            //v => `${v} second${v == 1 ? ' has' : 's have'} passed`)
          //.pragmatizeAt("#paper")
          //.setLoop(0, 10)

//setInterval(() => {
  //monitor.value += 1
//}, 1000)


//let sliderView = _p("slider view")

//let slider = _p("slider")
            //.from(tpl.slider({
              //min: 0,
              //max: 10
            //}))

//let sliderMonitor = _p("slider monitor")
    //.from(tpl.monitor())
    //.wireTo(slider)


//sliderView.contain(slider, sliderMonitor)
          //.pragmatizeAt("#paper")

//let fonts = [ 'a', 'b', 'c' ]

//let options = _p("options")
              //.from(tpl.select({
                //options: fonts,
              //}))
              //.do(function(){
                //console.log('options >', this.value)
              //})
              //.pragmatizeAt('#paper')


let $tab = "<"
let $sp = " "
let $nl = "<br>"

let demo = _ => _p()
            .from(tpl.create.template.config({
              name: 'demo',
              value: function(){
                console.log(`no demo set`)
              }
            }))
            .run({
              createElement(){
                this.as(_e(`div.demo-block#demo-block-${this.key}`).css('margin 80px 0'))
              },
              createCodeBlock(){
                this.codeBlock = _e(`pre#demo-code-${this.key}.js`)
                        .css(`
                          background-color #212530
                          width 100%
                          min-width 400px
                          height fit-content
                          min-height 50px   
                          border-radius 5px
                          margin auto
                          padding 20px 30px
                        `)
                
                _e('div#play', 'play')
                  .css(`
                    margin 10px auto
                    width fit-content
                    cursor pointer
                  `)
                  .listenTo('click', () => {
                      this.play()
                    }
                  )
                  .appendTo(this)
                this.append(this.codeBlock)
              },
              createTitle(){
                return
                this.prepend(_e(`h2#demo-title-${this.key}`)
                              .html(this.title)
                            )
              },
              editFuncBlock(){
                this.editFuncBlock = func => {
                  let str = func.toString()
                  this.codeBlock.html(str)
                  hljs.highlightBlock(this.codeBlock)
                }
              },
              
              playMake(){
                this.play = function(){
                  // console.log(demo)
                  this.value.bind(this)()
                }
              }
            })
            .do(function(){
              this.editFuncBlock(this.value)
            })
            .run(function(){
              this.export(
                'element',
                'actionChain',
                'codeBlock',
                'editFuncBlock',
                'play',
              )
            })

// demo.value = demo1
//

function demoFactory(fac, title, e="#paper"){
  if (typeof fac.before === 'function') fac.before()
  let demoPragma = _p()
          .from(demo().config({
            title: title,
            value: fac[title]
          }))
          .pragmatizeAt(e)
  if (typeof fac.after === 'function') fac.after(demoPragma)
}

const demos = {
  _eSelect: {
_eSelect(){

/*
    If you want to create an element
    from an HTMLElement that already 
    exists in the DOM:
*/

  let element = _e("#jeff")
  console.log(element)
},
    after(dem){
      _e("div#jeff")
        .html("I'm an element with id = jeff. (Check your js console)") 
        .prependTo(dem)
    }
  },

  _eCreate: {
_eCreate(){
/*
   If you want to create a new element
   programatically and append it to the DOM
   yourself, you can do:
*/
  let parentElement = this.element // ignore

  let element = _e("div#elon.center-div.woo", "- Elon Musk")
                    .appendTo(parentElement)

  // create a div element with id elon, classes center-div, woo
  // and with Elon Musk as inner HTML, & append it under this
  // code block
  console.log(element)
 },
    after(dem){
      // _e("div#jeff")
        // .html("I'm an element with id = jeff.") 
        // .prependTo(dem)
    }
  },
  _eCreateAndPrependToBody: {
    _eCreateAndPrependToBody(){
      // *** play the upper demo first to play this
      let element = _e("#lucy", "'I'm tripping balls'")
                      .prependTo('#elon')

      console.log(element)
    },
  },

  _eDestroy: {
_eDestroy(){
  // *** play the upper demo first to play this
  _e("#lucy").destroy() 
  // select element with id=elon, and destroy it
}
  },

  _eFun: {
_eFun(){
  let parentElement = this.element // ignore
  
  _e("div#fun-div.with.fun.classes")
    .html("woooo, this is so fun, <br> click me for magic")
    .css(`
      color whitesmoke
      background #212530
      border-radius 10px
      padding 10px  
      cursor pointer
      text-align center
      transition all .3s ease
    `)
    .listenTo('click', function(){
      this.css('color #0074D9')
    })
    .appendTo(parentElement)
}
  },

  _pCreate: {
_pCreate(){
  // *** play the upper demo first to play this


  let pragma1 = _p('name') 
  // you can give the Pragma a 
  // name (which is going to be its key), or leave
  // it blank to generate a random one through 
  // an overengineered random string generator


  let element = _e('#fun-div') 
      // an element that exists on the dom already ^^
  
  let pragma2 = _p() // blank for random name
    .as(element)
    .html("Now, im associated with a Pragma.")

    /*
     ** Note: when you call .html(), .css()
     and other functions of _e in a _p, they just
     redirect to the call to the _p's element.
     
     Thus pragma.html('yo') will *do* the same as
     pragma.elemetn.html('yo')
     */
}
  },

  _pCreateTotallyNew: {
_pCreateTotallyNew(){
  let parentElement = this.element //ignore

  let pragma = _p()
                .as(_e("div#paul"))
                .html("Paul McCartney")
                .appendTo(parentElement)

  let pragma2 = _p()
                .as(_e("div#john"))
                .html("John Lennon")
                .pragmatizeAt(parentElement) 
                    // equevelant to appendTo (for Pragmas)
}
  },

  _pCreateBeatles: {
_pCreateBeatles(){

  let parentElement = this.element // ignore

  let beatles = _p('beatles')
                .as("div#beatles", 
                  `Click here and enter a beatle to highlight!`)
                .css("cursor pointer")
                .appendTo(parentElement)
                .do(function(){
                  if (this._lv){
                    // _lv is the last value the pragma had
                    this.find(this._lv).css('color gray')
                  }
                  this.find(this.value).css('color yellow')
                })
                

  let john = _p('john').as("div.", "John Lennon")
  // div#, to make a new div
  let paul = _p('paul').as("div.", "Paul McCartney")
  let george = _p('george').as("div.", "George Harrison")
  let ringo = _p('ringo').as("div.", "Ringo Starr")

  beatles.contain(john, paul, george, ringo)
  beatles.on('click').do(function(){
    this.value = prompt('enter john/paul/ringo/george')
  })
}
},

timer: {

  timer(){
  let parentElement = this.element

  let timer = _p('timer')
              .as("div.")
              .do(function(){
                this.html(this.value)
              })
              .run(function(){
                setInterval(_=>this.value++, 1000)
              })
              .setValue(0)
              .pragmatizeAt(parentElement)

  console.log(timer)
}
}
}


for (let [title, demo] of Object.entries(demos)){
  demoFactory(demo, title)
}
//let demo1 = _p()
              //.from(demo.config({
                //value: demo1Code,
              //}))
              //.pragmatizeAt("#paper")



//demo.play(demo1)

// _e(icons.gate).appendTo("p")
//let ppp = _p('meow')
//ppp.kaka = "haha"
//ppp.export = ["kaka"]

//console.log(_p('icon').from(ppp).kaka)
