import { Pragma, _e } from "../../index"
import { rk8 } from "./index"

//function loadLectorPdfJs(){
    //const lectorPdfCdn = "https://unpkg.com/lector-pdfjs@latest/dist/lectorPdf.umd.js"
    //return new Promise (resolve => {

        //console.time('lectorpdf load')
        //_e('script.#lector-pdfjs-loader').appendTo('head').listenTo('load', function(){

            //// pragmaSpace.onDocLoad(() => _patch_crisp())
            //console.log('lector-pdf loaded from cdn')
            //console.timeEnd('lectorpdf load')
            //resolve()
        //}).attr('src', lectorPdfCdn)

    //})

export class Script extends Pragma {

  static load(url, name=rk8()) {
    console.time(`${name} load`)
    return new Promise (resolve => {
      _e(`script.#${name}-loader crossorigin`).appendTo('head').listenTo('load', function(){
        resolve()
        console.timeEnd(`${name} load`)
      })
      .attr('src', url)
    })
  }

}


