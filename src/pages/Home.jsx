import React from "react";
import { useEffect } from "react";
import { useTodoContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Home() {
  const { todos, dispatch } = useTodoContext();
  const { user } = useAuthContext();

  useEffect(() => {
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
        dispatch({ type: "SET_TODOS", payload: data.payload });
      }
    }

    if (user) {
      console.log(user);
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
      {todos.map(({ id, todo_name: name }) => (
        <li key={id}>{name}</li>
      ))}
    </div>
  );
}
