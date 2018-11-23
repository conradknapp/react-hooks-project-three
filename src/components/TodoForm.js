import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import uuidv4 from "uuid/v4";
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

  const handleSubmit = async event => {
    event.preventDefault();
    if (currentTodo.text) {
      // if we have a currentTodo, update it
      const { data } = await axios.patch(
        `https://todos-dsequjaojf.now.sh/todos/${currentTodo.id}`,
        { text: todo }
      );
      /* after API: todo -> data */
      dispatch({ type: "UPDATE_TODO", payload: data });
    } else {
      // otherwise add it
      /* after API: created 'newTodo' here w/ uuid */
      const { data } = await axios.post(
        "https://todos-dsequjaojf.now.sh/todos",
        { id: uuidv4(), text: todo, complete: false }
      );
      /* after API: todo -> data */
      dispatch({ type: "ADD_TODO", payload: data });
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
