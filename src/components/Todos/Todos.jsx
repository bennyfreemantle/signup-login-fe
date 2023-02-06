import React, { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useTodoContext } from "../../hooks/useTodosContext";

const BASE_URI = import.meta.env.VITE_BASE_API_URI;

export default function Todos({ todo }) {
  const { todos, dispatch } = useTodoContext();
  const { user } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState("");

  async function handleDelete(id) {
    const result = confirm(
      `Are you sure you want to delete ${todo.todo_name}?`
    );
    // confirm was false, return
    if (!result) return;

    const response = await fetch(BASE_URI + `/api/v1/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const data = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TODO", payload: data.payload });
    }
  }

  async function handleSave(id) {
    setIsEditing(false);

    // Checks if an edit had been made, if not don't bother sending an API request
    if (!editedTodo) {
      console.log("stayed the same");
      return;
    }

    const editData = { editedTodo };

    const response = await fetch(
      import.meta.env.VITE_BASE_API_URI + `api/v1/todos/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(editData),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const data = await response.json();

    if (response.ok) {
      dispatch({ type: "EDIT_TODO", payload: data.payload });
      console.log(data.payload);
    }
  }

  function toggleComplete(id) {
    dispatch({ type: "TOGGLE_COMPLETE", id });
  }

  return (
    <div onClick={() => toggleComplete(todo.id)}>
      {isEditing ? (
        <input
          onChange={(e) => setEditedTodo(e.target.value)}
          defaultValue={todo.todo_name}
        />
      ) : (
        <li>{todo.todo_name}</li>
      )}
      {isEditing ? (
        <button onClick={() => handleSave(todo.id)}>Save</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}
      <button onClick={() => handleDelete(todo.id)}>Delete</button>
    </div>
  );
}
