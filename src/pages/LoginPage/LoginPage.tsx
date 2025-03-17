import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../../utils/Auth";
import usePostRequest from "../../hooks/usePostRequest";

// TO DO: This is just a quick and dirty login, add style and such
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const { sendRequest, loading } = usePostRequest<{ token: string }>("login");

// Check if user is already logged in
  useEffect(() => {
    const loggedInUser = AuthService.getUser();
    console.log("Retrieved User:", loggedInUser);
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

// Handle login form submission
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

// Send login request
    const response = await sendRequest({ email, password });

    if (response && response.token) {
      console.log("Received Token:", response.token);

// Store token and update user state
      AuthService.login(response.token);
      setUser(AuthService.getUser());
// Redirect to home
      navigate("/");
    } else {
      setError("Invalid email or password");
    }
  };

// Show user info if logged in
  if (user) {
    return (
      <div>
        <h2>Welcome, {user.first_name} {user.last_name}!</h2>
        <p>Email: {user.email}</p>
        <button onClick={() => { AuthService.logout(); setUser(null); }}>
          Logout
        </button>
      </div>
    );
  }

// Show login form if user is NOT logged in
  return (
    <div>
      <h2>Login</h2>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
