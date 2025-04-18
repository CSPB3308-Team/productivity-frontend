import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthService from '../../utils/Auth';
import usePostRequest from '../../hooks/usePostRequest';
import { AuthUserData } from '../../types';

// TO DO: This is just a quick and dirty login, add style and such
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUserData | null>(null);
  const navigate = useNavigate();
  const { sendRequest, loading } = usePostRequest<{ token: string }>('login');

  // Check if user is already logged in
  useEffect(() => {
    const loggedInUser = AuthService.getUser();
    console.log('Retrieved User:', loggedInUser);
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
      console.log('Received Token:', response.token);

      // Store token and update user state
      AuthService.login(response.token);
      setUser(AuthService.getUser());
      // Redirect to home
      navigate('/productivity-frontend');
    } else {
      setError('Invalid email or password');
    }
  };

  // Show user info if logged in
  if (user) {
    return (
      <div>
        <h2>
          Welcome, {user.first_name} {user.last_name}!
        </h2>
        <p>Email: {user.email}</p>
        <button
          onClick={() => {
            AuthService.logout();
            setUser(null);
          }}
        >
          Logout
        </button>
      </div>
    );
  }

  // Show login form if user is NOT logged in
  return (
    <>
      <h2>Login</h2>

      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Email:{' '}
          <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <label>
          Password:{' '}
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type='submit' disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {/* Direct unregistered users to the signup page */}
      <h4>No account?</h4>
      <button type='button' onClick={() => navigate('/signup')}>
        Sign up
      </button>
    </>
  );
};

export default LoginPage;
