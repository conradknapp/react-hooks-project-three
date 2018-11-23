import uuidv4 from "uuid/v4";

export default function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      // return current state if no payload
      if (!action.payload) {
        return state;
      }
      // return current state if todo text is the same as an existing todo
      if (state.todos.findIndex(t => t.text === action.payload) > -1) {
        return state;
      }
      const newTodo = {
        id: uuidv4(),
        text: action.payload,
        complete: false
      };
      return {
        ...state,
        todos: [...state.todos, newTodo]
      };
    case "SET_CURRENT_TODO":
      return {
        ...state,
        currentTodo: action.payload
      };
    case "TOGGLE_TODO":
      return {
        ...state,
        todos: state.todos.map(t =>
          t.id === action.payload.id
            ? { ...action.payload, complete: !action.payload.complete }
            : t
        )
      };
    case "UPDATE_TODO":
      const updatedTodo = { ...state.currentTodo, text: action.payload };
      const index = state.todos.findIndex(t => t.id === state.currentTodo.id);
      const updatedTodos = [
        ...state.todos.slice(0, index),
        updatedTodo,
        ...state.todos.slice(index + 1)
      ];
      if (!action.payload) {
        return state;
      }
      return {
        ...state,
        currentTodo: {},
        todos: updatedTodos
      };
    case "REMOVE_TODO":
      const hasRemovedTodo =
        state.currentTodo.id === action.payload.id ? {} : state.currentTodo;
      return {
        ...state,
        currentTodo: hasRemovedTodo,
        todos: state.todos.filter(t => t.id !== action.payload.id)
      };
    default:
      return state;
  }
}
