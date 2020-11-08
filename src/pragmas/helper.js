import $ from "jquery"
function wfy(element) {
  element = $(element)
  let wfied_text = ""
  for ( let el of element.text().split(" ")){
    wfied_text += `<w>${el}</w> `
  }
  return element.html(wfied_text.slice(0, -1))
}

function crush(n) {
  const xa = 1; const ya = 4; const xb = 7; const yb = 6; const xc = 8; const yc = 7; const xd = 16; const yd = 10;
  if (n <= xa) return ya
  if (n <= xb) return ((yb - ya) / (xb - xa)) * (n - xa) + ya
  if (n <= xc) return ((yc - yb) / (xc - xb)) * (n - xb) + yb
  return ((yd - yc) / (xd - xc)) * (n - xc) + yc
}

export { wfy, crush }
