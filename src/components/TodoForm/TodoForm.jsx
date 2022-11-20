import React from "react";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useTodoContext } from "../../hooks/useTodosContext";

export default function TodoForm() {
  const { dispatch } = useTodoContext();
  const { user } = useAuthContext();

  const [input, setInput] = useState("");
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();

    // Check if user is logged in or not
    if (!user) {
      setError("You must be logged in to add a Todo");
      return;
    }

    // Create json object with our input
    const todo = { input };

    // POST request to our API
    // try add a new todo
    const response = await fetch(
      import.meta.env.VITE_BASE_API_URI + "api/v1/todos",
      {
        method: "POST",
        body: JSON.stringify(todo),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    // response from the API server
    const data = await response.json();

    // if an error has occurred
    if (!response.ok) {
      setError(data.error);
    }
    // response is in 200 range
    if (response.ok) {
      // reset our input value to an empty string
      setInput("");
      // reset error back to null (incase previously it was an error)
      setError(null);
      // call our dispatch function to add the new todo to our state
      dispatch({ type: "ADD_TODOS", payload: data.payload });
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h3>Add a new Todo</h3>
        <label>New Todo</label>
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          value={input}
        />
        <button>Add new todo</button>
        {/* an error has occurred, display it */}
        {error ? <div>{error}</div> : ""}
      </form>
    </div>
  );
}
