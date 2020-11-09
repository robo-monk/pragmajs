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

function generateDifficultyIndex(word){
  // returns 0-1 with 0 being not difficult at all
  return 0;
}

function wordValue(word, d){
  return word.text().length*(d+1)
}

function charsMsAt(wpm){
  const avgCharsInWord = 4.7
  return 1000/((wpm/60)*avgCharsInWord)
}

export { wfy, crush, generateDifficultyIndex, wordValue, charsMsAt }
