import React from "react";
import { useEffect } from "react";
import { useTodoContext } from "../hooks/useTodosContext";
import { useAuthContext } from "../hooks/useAuthContext";

export default function Home() {
  const { todos, dispatch } = useTodoContext();
  const { user } = useAuthContext();

  useEffect(() => {
    async function getTodos() {
      const response = await fetch("http://localhost:3000/api/v1/todos", {
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
      console.log(user);
      getTodos();
    }
  }, [dispatch, user]);

  return (
    <div>
      <h1>Home</h1>
      {todos.map(({ id, todo_name: name }) => (
        <li key={id}>{name}</li>
      ))}
    </div>
  );
}
