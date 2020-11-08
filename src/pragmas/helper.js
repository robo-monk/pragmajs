import $ from "jquery"
function wfy(element) {
  element = $(element)
  let wfied_text = ""
  for ( let el of element.text().split(" ")){
    wfied_text += `<w>${el}</w> `
  }
  return element.html(wfied_text.slice(0, -1))
}

export { wfy }
