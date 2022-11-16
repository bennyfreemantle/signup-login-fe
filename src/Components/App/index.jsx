import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    async function getUsers() {
      const response = await fetch("/api/v1/users/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // user_name: "Test",
          user_email: "test@test.com",
          user_password: "HardCoded1!",
        }),
      });
      const data = await response.json();
      console.log(data);
    }
    getUsers();
  }, []);

  return (
    <div className="App">
      <h1>Hello world</h1>
    </div>
  );
}

export default App;
