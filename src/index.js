import React, { createContext, useContext, useReducer } from "react";
import ReactDOM from "react-dom";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
// import App from "./App";

export const Store = createContext({
  todos: [
    // Initial Data
    "Buy milk",
    "Some eggs",
    "Go to work"
  ]
});

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      // return current state if empty
      if (!action.payload) {
        return state;
      }
      // return current state if duplicate todo
      if (state.todos.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        todos: [...state.todos, action.payload]
      };
    case "DONE":
      return {
        ...state,
        todos: state.todos.filter(todo => todo !== action.payload)
      };
    default:
      return state;
  }
}

const App = () => {
  const globalStore = useContext(Store);
  const [state, dispatch] = useReducer(reducer, globalStore);

  return (
    <Store.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodoList />
    </Store.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
