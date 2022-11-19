import { TodoContext } from "../context/TodoContext";
import { useContext } from "react";

export function useTodoContext() {
  const context = useContext(TodoContext);

  if (!context) {
    throw Error("useAuthContext must be used inside a TodoContextProvider");
  }

  return context;
}
