import React, { useState, useEffect, useContext } from "react";
import TodosContext from "../context";

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const {
    state: { currentTodo = {} },
    dispatch
  } = useContext(TodosContext);

  useEffect(
    () => {
      if (currentTodo.text) {
        // if our currentTodo state is set, put it in our input
        setTodo(currentTodo.text);
      } else {
        // if todo was deleted, our component will clear the input by setting 'todo' to an empty string
        setTodo("");
      }
    },
    // like componentDidUpdate, we want useEffect to run only when the currentTodo changes (according to its unique id)
    [currentTodo.id]
  );

  const handleSubmit = event => {
    event.preventDefault();
    if (currentTodo.text) {
      // if we have a currentTodo, update it
      dispatch({ type: "UPDATE_TODO", payload: todo });
    } else {
      // otherwise add it
      dispatch({ type: "ADD_TODO", payload: todo });
    }
    // in either case remove the todo value from the input
    setTodo("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center p-5">
      <input
        type="text"
        className="border-black border-2 border-solid"
        value={todo}
        onChange={event => setTodo(event.target.value)}
      />
    </form>
  );
};

export default TodoForm;
