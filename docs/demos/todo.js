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

    return Compose("newtodo").contain(newtodo).contain(addButton)
  }

  const tdComp = Compose("todo").with(td.title).contain(todoAdd())

  tdComp.pragmatize("#tododemo")

  return ["todo"]
}



class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        <h3>TODO</h3>
        <TodoList items={this.state.items} />
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="new-todo">
            What needs to be done?
          </label>
          <input
            id="new-todo"
            onChange={this.handleChange}
            value={this.state.text}
          />
          <button>
            Add #{this.state.items.length + 1}
          </button>
        </form>
      </div>
    );
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.text.length === 0) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ''
    }));
  }
}

class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}

ReactDOM.render(
  <TodoApp />,
  document.getElementById('todos-example')
);