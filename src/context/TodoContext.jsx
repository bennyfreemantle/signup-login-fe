import { createContext, useReducer } from "react";

export const TodoContext = createContext();

export function todoReducer(state, action) {
  switch (action.type) {
    case "SET_TODOS":
      return {
        todos: action.payload,
      };
    case "ADD_TODOS":
      console.log(state);
      return {
        todos: [...state.todos, action.payload],
      };
    case "DELETE_TODO":
      return {
        // return all todos apart from the one that was clicked to be deleted
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    case "EDIT_TODO":
      return {
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            return { ...todo, todo_name: action.payload.todo_name };
          }
          return todo;
        }),
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
