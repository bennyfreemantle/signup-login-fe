import { useAuthContext } from "./useAuthContext";
import { useTodoContext } from "./useTodosContext";

export function useLogout() {
  const { dispatch } = useAuthContext();
  const { dispatch: todoDispatch } = useTodoContext();
  function logout() {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });

    // Reset the global context to an empty array when a user logs out
    // prevents briefly being able to see the previously logged in users info
    todoDispatch({ type: "SET_TODOS", payload: [] });
  }

  return { logout };
}
