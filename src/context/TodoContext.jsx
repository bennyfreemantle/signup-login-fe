import { createContext, useReducer } from "react";

export const TodoContext = createContext();

export function todoReducer(state, action) {
  switch (action.type) {
    case "SET_TODOS":
      return {
        todos: action.payload,
      };
    case "ADD_TODOS":
      return {
        todos: [...state.todos, action.payload],
      };
    case "DELETE_TODO":
      return {
        // return all todos apart from the one that was clicked to be deleted
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    default:
      return state;
  }
}

export function TodoContextProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [],
  });

  return (
    <TodoContext.Provider value={{ ...state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
}
