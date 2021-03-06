import React, { useContext } from "react";
import axios from "axios";
import TodosContext from "../context";

const TodoList = () => {
  const { state, dispatch } = useContext(TodosContext);
  const title =
    state.todos.length > 0 ? `${state.todos.length} Todos` : "Nothing To Do!";

  return (
    <div className="container mx-auto max-w-md text-center font-mono">
      <h1 className="text-bold">{title}</h1>
      <ul className="text-white p-0">
        {state.todos.map(todo => (
          <li
            key={todo.id}
            className="flex p-1 items-center list-reset my-2 py-4 bg-orange-dark border-black border-dashed border-2"
          >
            <span
              className={`flex-1 ml-12 cursor-pointer ${todo.complete &&
                "line-through text-grey-darkest"}`}
              onDoubleClick={async () => {
                const { data } = await axios.patch(
                  `https://todos-dsequjaojf.now.sh/todos/${todo.id}`,
                  {
                    complete: !todo.complete
                  }
                );
                dispatch({ type: "TOGGLE_TODO", payload: data });
              }}
            >
              {todo.text}
            </span>
            <button
              className="self-end"
              onClick={() =>
                dispatch({ type: "SET_CURRENT_TODO", payload: todo })
              }
            >
              <img
                src="https://icon.now.sh/edit/0050C5"
                alt="Edit Icon"
                className="h-6"
              />
            </button>
            <button
              className="self-end"
              onClick={async () => {
                await axios.delete(
                  `https://todos-dsequjaojf.now.sh/todos/${todo.id}`
                );
                dispatch({ type: "REMOVE_TODO", payload: todo });
              }}
            >
              <img
                src="https://icon.now.sh/delete/8B0000"
                alt="Delete Icon"
                className="h-6"
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
