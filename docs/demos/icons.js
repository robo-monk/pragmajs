import { Compose, IconBuilder } from "../../src"
import db from "./icondb.json"

export default function illustrate(paper){
  let icons = new IconBuilder(db)
  icons.default = {
    fill: "white",
    width: "55px",
    height: "55px"
  }

  let settings = Compose("settings")
                  .with(icons.grab("home-2-fill"))
                  .setTippy("Settings")
  settings.pragmatize(paper.element)
  return ["icons"]
}