import React, { useContext } from "react";
import { Store } from "../index";

const TodoList = () => {
  const { state, dispatch } = useContext(Store);

  const header =
    state.todos.length > 0 ? `${state.todos.length} Todos` : "No more todos";

  return (
    <div className="container mx-auto max-w-md text-center font-mono">
      <h1 className="text-bold">{header}</h1>
      <ul className="text-white p-0">
        {state.todos.map((todo, i) => (
          <li
            key={todo}
            className="flex p-2 items-center list-reset my-2 py-4 bg-orange border-black border-dashed border-2"
          >
            <span className="flex-1 cursor-pointer">{todo}</span>
            <button
              className="self-end"
              onClick={() => dispatch({ type: "DONE", payload: todo })}
            >
              &times;
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
