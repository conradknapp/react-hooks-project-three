import React, { useContext, useReducer } from "react";
import ReactDOM from "react-dom";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import TodosContext from "./context";
import todosReducer from "./reducer";

const App = () => {
  const store = useContext(TodosContext);
  const [state, dispatch] = useReducer(todosReducer, store);

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodoList />
    </TodosContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
