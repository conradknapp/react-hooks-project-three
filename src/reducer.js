// import uuidv4 from "uuid/v4";

export default function reducer(state, action) {
  switch (action.type) {
    case "GET_TODOS":
      return {
        ...state,
        todos: action.payload
      };
    case "ADD_TODO":
      // return current state if no payload
      if (!action.payload) {
        return state;
      }
      // return current state if todo text is the same as an existing todo
      /* after API: 'action.payload' -> 'action.payload.text' */
      if (state.todos.findIndex(t => t.text === action.payload) > -1) {
        return state;
      }
      /* after API 'newTodo' -> 'action.payload', remove uuid import */
      // const newTodo = {
      // id: uuidv4(),
      // text: action.payload,
      // complete: false
      // };
      const addedTodos = [...state.todos, action.payload];
      return {
        ...state,
        todos: addedTodos
      };
    case "SET_CURRENT_TODO":
      return {
        ...state,
        currentTodo: action.payload
      };
    case "TOGGLE_TODO":
      /* after API: { ...action.payload, complete: !action.payload.complete} to just action.payload */
      const toggledTodos = state.todos.map(t =>
        t.id === action.payload.id ? action.payload : t
      );
      return {
        ...state,
        todos: toggledTodos
      };
    case "UPDATE_TODO":
      /* after API: { ...state.currentTodo, text: action.payload } to { ...action.payload } (for updatedTodo) */
      const updatedTodo = { ...action.payload };
      const updatedTodoIndex = state.todos.findIndex(
        t => t.id === state.currentTodo.id
      );
      const updatedTodos = [
        ...state.todos.slice(0, updatedTodoIndex),
        updatedTodo,
        ...state.todos.slice(updatedTodoIndex + 1)
      ];
      // include same checks as for "ADD_POST"
      if (!action.payload) {
        return state;
      }
      if (state.todos.findIndex(t => t.text === action.payload) > -1) {
        return state;
      }
      return {
        ...state,
        // clear currentTodo after updating it
        currentTodo: {},
        todos: updatedTodos
      };
    case "REMOVE_TODO":
      const isRemovedTodo =
        state.currentTodo.id === action.payload.id ? {} : state.currentTodo;
      const filteredTodos = state.todos.filter(t => t.id !== action.payload.id);
      return {
        ...state,
        currentTodo: isRemovedTodo,
        todos: filteredTodos
      };
    default:
      return state;
  }
}
