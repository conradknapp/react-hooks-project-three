import React, { useState, useContext } from "react";
import { Store } from "../index";

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const { dispatch } = useContext(Store);

  const handleChange = event => {
    setTodo(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch({ type: "ADD_TODO", payload: todo });
    setTodo("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex justify-center m-4">
      <input
        type="text"
        className="border-black border-2 border-solid"
        value={todo}
        onChange={handleChange}
      />
    </form>
  );
};

export default TodoForm;
