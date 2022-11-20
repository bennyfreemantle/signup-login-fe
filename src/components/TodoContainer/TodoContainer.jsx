import React, { useState } from "react";
import { useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useTodoContext } from "../../hooks/useTodosContext";

export default function TodoContainer({ todo }) {
  const { dispatch } = useTodoContext();
  const { user } = useAuthContext();

  const [isEditing, setIsEditing] = useState(false);

  async function handleDelete(id) {
    const result = confirm("Are you sure you want to delete todo?");
    // confirm was false, return
    if (!result) return;
    console.log(id);

    const response = await fetch(
      import.meta.env.VITE_BASE_API_URI + `api/v1/todos/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const data = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TODO", payload: data.payload });
    }
  }

  return (
    <div>
      {isEditing ? (
        <input defaultValue={todo.todo_name} />
      ) : (
        <li>{todo.todo_name}</li>
      )}
      {isEditing ? <button>Save</button> : <button>Edit</button>}
      <button onClick={() => handleDelete(todo.id)}>Delete</button>
    </div>
  );
}
