import React, { useState, useEffect, useContext, useReducer } from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import TodosContext from "./context";
import todosReducer from "./reducer";

const useAPI = endpoint => {
  const [value, setValue] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const { data } = await axios.get(endpoint);
    setValue(data);
  };

  return value;
};

const App = () => {
  const initialState = useContext(TodosContext);
  const [state, dispatch] = useReducer(todosReducer, initialState);
  // add custom hook to fetch our saved todos from API
  const savedTodos = useAPI("https://todos-dsequjaojf.now.sh/todos");

  useEffect(
    () => {
      dispatch({
        type: "GET_TODOS",
        payload: savedTodos
      });
    },
    [savedTodos]
  );

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodoList />
    </TodosContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
