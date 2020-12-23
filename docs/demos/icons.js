import { Comp, Compose, IconBuilder, at } from "../../src"
import iconsDB from "./icondb.json"

export default function illustrate(paper){

  // create a json icon datapack (github.com/robo-monk/ICONA)

  // import it
  // import iconsDB from "./icondb.json"


  let icons = new IconBuilder(iconsDB)

  // set some default options
  icons.default = {
    fill: "white",
    width: "55px",
    height: "55px"
  }

  let settings = Compose("settings")
                  .with(icons.grab("home-2-fill"))
                  .setTippy("Settings")
  let air = Compose("").with(icons.grab("ancient-pavilion-fill"))

  at(paper).pragmatize(settings, air)
  return ["icons"]
}