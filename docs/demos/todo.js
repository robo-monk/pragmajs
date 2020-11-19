import { trigger } from "mousetrap"
import {
  Compose,
  Button
} from "../../src"

export default function todo(paper) {

  const td = {
    title: "<h1>TODO</h1>", 
    form: $("<input type=text class=mousetrap placeholder='New Task'></input")
  }

  const todoItem = (content) => { 
    return Compose(`todo-${tdComp.kidsum}`).as(`<li>${content}</li>`) 
  }

  const todoAdd = () => { 
    let newtodo = Compose("tdInput").as(td.form).do((value, master) => {
      master.contain(todoItem(value))
    })

    let addButton = Button.action("addTodo", "Add", (master) => {
      let inp = master.find("tdInput").element[0]
      if (!inp.value) return false
      newtodo.value = inp.value
      inp.value = ""
    }).bind("enter")

    return Compose("newtodo").contain(newtodo, addButton)
  }

  const tdComp = Compose("todo").with(td.title).contain(todoAdd())

  tdComp.pragmatize("#tododemo")

  return ["todo"]
}
