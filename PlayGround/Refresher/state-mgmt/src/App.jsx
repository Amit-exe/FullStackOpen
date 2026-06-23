import { useReducer, useState } from "react";
import "./App.css";

const initialState = {
  todos: [
    { id: 1, text: "Buy groceries", completed: false },
    { id: 2, text: "Clean the kitchen", completed: true },
    { id: 3, text: "Walk the dog", completed: false },
  ],
  filter: "all",
};
function todoReducer(state, action) {
  switch (action.type) {
    case "delete_todo":
      return { ...state, todos: state.todos.filter((e) => e.id != action.id) };

    case "add_todo":
      return {
        ...state,
        todos: [
          ...state.todos,
          { id: Date.now(), text: action.text, completed: false },
        ],
      };

    case "toggle_todo":
      return {
        ...state,
        todos: state.todos.map((e) =>
          e.id !== action.id ? e : { ...e, completed: !e.completed },
        ),
      };

    case "set_filter":
      return { ...state, filter: action.filter };
    default:
      return state;
  }
}
function App() {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [todo, setTodo] = useState("");

  const visibleTodos = state.todos.filter((todo) => {
    if (state.filter === "active") return !todo.completed;
    if (state.filter === "completed") return todo.completed;
    return true;
  });
  const handleAdd = () => {
    dispatch({ type: "add_todo", text: todo });
    setTodo("");
  };

  const handleCheck = (id) => {
    dispatch({ type: "toggle_todo", id: id });
  };
  if (!state) return <>Loading...</>;
  return (
    <>
      <h1>Todos</h1>

      {["all", "active", "completed"].map((e) => (
        <span>
          <button
            className="m-2 p-1 bg-lime-500 rounded-sm active:bg-lime-700"
            onClick={() => dispatch({ type: "set_filter", filter: e })}
          >
            {e}
          </button>
        </span>
      ))}
      {visibleTodos.map((e) => (
        <div key={e.id}>
          <input
            type="checkbox"
            checked={e.completed}
            onChange={() => handleCheck(e.id)}
          />

          <span className={e.completed ? "line-through text-gray-400" : ""}>
            {e.text}
          </span>

          <button
            onClick={() => dispatch({ type: "delete_todo", id: e.id })}
            className="m-2 p-1 bg-lime-500 rounded-sm active:bg-lime-700"
          >
            Delete
          </button>
          <br />
        </div>
      ))}
      <input
        className="border-2 rounded-sm"
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        onClick={handleAdd}
        className="m-2 p-1 bg-lime-500 rounded-sm active:bg-lime-700"
      >
        Add
      </button>
    </>
  );
}

export default App;
