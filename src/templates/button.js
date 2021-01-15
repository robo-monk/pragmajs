import { Pragma } from "../index"

export const button = new Pragma()
                        .as(null, "")
                        .on("click").do(function() {
                            console.log("clicked button")
                          })

