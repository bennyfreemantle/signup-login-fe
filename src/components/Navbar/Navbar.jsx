import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

import "./Navbar.css";

export function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <header className="Navbar">
      <div className="container">
        <Link to="/">
          <h1>Sign up & Login</h1>
        </Link>
        <nav>
          {/* https://reactjs.org/docs/conditional-rendering.html */}
          {user && (
            <div>
              <span>{user.user_email}</span>
              <button onClick={() => logout()}>Logout</button>
            </div>
          )}
          {!user && (
            <div>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
