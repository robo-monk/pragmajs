import Pragma from "./pragmas/pragma.js"
import Comp from "./pragmas/comp.js"
//export { buttonValue, valueControls, variants, composer, container } from "./composers/templates.js"
import {  Select, Slider, Button, Variants, Value, 
          Compose, pragmatize, at, contain, host, 
          Bridge, Monitor } from "./composers/templates.js"

export  { 
          Pragma, Comp, Select, Slider, Button, Variants, Value, 
          Compose, pragmatize, at, contain, host, 
          Bridge, Monitor
        }

import IconBuilder from "./icons/icons"
export { IconBuilder } 
export { parse } from "./composers/helpers"
