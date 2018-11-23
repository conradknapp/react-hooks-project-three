import React, { useState, useContext, useEffect, useReducer } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import TodosContext from "./context";
import todosReducer from "./reducer";

const useAPI = endpoint => {
  const [value, setValue] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data } = await axios.get(endpoint);
    setValue(data);
  };

  return value;
};

const App = () => {
  const initialState = useAPI("https://todos-dsequjaojf.now.sh/todos");
  const store = useContext(TodosContext);
  const [state, dispatch] = useReducer(todosReducer, store);

  useEffect(
    () => {
      dispatch({
        type: "LOAD_TODOS",
        payload: initialState
      });
    },
    [initialState]
  );

  return (
    <TodosContext.Provider value={{ state, dispatch }}>
      <TodoForm />
      <TodoList />
    </TodosContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
