import React from "react";
import { useEffect } from "react";
import { useTodoContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";
import TodoForm from "../components/TodoForm/TodoForm";
import Todos from "../components/Todos/Todos";

const BASE_URI = import.meta.env.VITE_BASE_API_URI;

export default function Home() {
  const { todos, dispatch } = useTodoContext();
  const { user } = useAuthContext();

  // Initial load and rerender of todos
  useEffect(() => {
    async function getTodos() {
      const response = await fetch(BASE_URI + "/api/v1/todos", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TODOS", payload: data.payload });
      }
    }

    if (user) {
      getTodos();
    }
  }, [dispatch, user]);

  return (
    <div>
      <h1>
        {import.meta.env.DEV
          ? import.meta.env.VITE_APP_TITLE
          : import.meta.env.VITE_APP_TITLE}
      </h1>
      <TodoForm />
      {todos.map((todo) => (
        <Todos key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
