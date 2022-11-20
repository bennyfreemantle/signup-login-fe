import React from "react";
import { useEffect } from "react";
import { useTodoContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";
import TodoForm from "../components/TodoForm/TodoForm";

export default function Home() {
  const { todos, dispatch } = useTodoContext();
  const { user } = useAuthContext();

  useEffect(() => {
    console.log(todos);
    async function getTodos() {
      const response = await fetch(
        import.meta.env.VITE_BASE_API_URI + "api/v1/todos",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        console.log(data.payload);
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
      {console.log(todos)}
      {todos.map(({ id, todo_name: name }) => (
        <li key={id}>{name}</li>
      ))}
    </div>
  );
}
