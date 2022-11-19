import { createContext, useReducer, useEffect } from "react";

export const TodoContext = createContext();

export function todoReducer(state, action) {
  switch (action.type) {
    case "SET_TODOS":
      return { todos: action.payload };
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
