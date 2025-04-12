import { useNavigate } from 'react-router-dom';
import AuthService from '../../utils/Auth';
import { useState } from 'react';
import usePostPutPatchDelete from '../../hooks/usePostPutPatchDelete';
import { UserInfo, SignupResponse } from '../../types';

const SignupPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { data, error, loading, sendRequest } = usePostPutPatchDelete<UserInfo, SignupResponse>(
    'signup',
    'POST',
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const info: UserInfo = {
      username: username,
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
    };
    sendRequest(info);
  };

  // The user should not be able to create a new account while currently logged in
  if (AuthService.loggedIn()) {
    return (
      <>
        <p>You're already logged in!</p>
        <button type='button' onClick={() => AuthService.logout()}>
          Log out
        </button>
        <button type='button' onClick={() => navigate('/')}>
          Back home
        </button>
      </>
    );
  }

  // Show the sign up form if the user hasn't signed up yet
  if (!data) {
    return (
      <form onSubmit={handleSubmit}>
        <h2>Create a new account</h2>
        <label>
          First name:{' '}
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </label>
        <br />
        <label>
          Last name:{' '}
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </label>
        <br />
        <label>
          Username:{' '}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoFocus
          />
        </label>
        <br />
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
        <button type='submit'>Sign up</button>
      </form>
    );
  }

  // These return statements are reached after the user has clicked sign up
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error creating account: {error.message}</p>;
  return (
    <>
      <h3>Successfully created account</h3>
      <button type='button' onClick={() => navigate('/login')}>
        Log in
      </button>
    </>
  );
};

export default SignupPage;
