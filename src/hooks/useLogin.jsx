import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

const BASE_URI = import.meta.env.VITE_BASE_API_URI;

export function useLogin() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();

  console.log(BASE_URI);

  async function login(email, password) {
    setIsLoading(true);

    // Reset error at the start of every fetch
    setError(null);

    const response = await fetch(BASE_URI + "/api/v1/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_email: email,
        user_password: password,
      }),
    });
    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(data.error);
    }
    if (response.ok) {
      // save jwt to local storage
      localStorage.setItem("user", JSON.stringify(data));

      // update the auth context
      dispatch({ type: "LOGIN", payload: data });

      setIsLoading(false);
    }
  }
  return { login, isLoading, error };
}
