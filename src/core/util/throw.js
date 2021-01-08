import { _deving } from "./index"

export function throwSoft (desc, potential=null, fixes=['rerun the code 10 times'], trigger=null, force=false) {
  if (_deving && !force) return null
  
  console.error(`%c 🧯 pragma.js  %c \n
      encountered a soft error 🔫 %c \n
      \n${trigger ? `Triggered by: [${trigger.key} ${trigger}]` :``}
      \n${desc} %c\n
      \n${ potential!=null ? `Potential ${potential}: \n\t${fixes.join("\n\t")}` : '' }
      `, "font-size:15px", "font-size: 12px;", "color:whitesmoke", "color:white")
}