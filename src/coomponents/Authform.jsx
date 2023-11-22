import React, { useState } from 'react';
import axios from 'axios';
import './css/Authform.css'; // Add your CSS file for styling

const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [message, setMessage] = useState('');


  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isLoginForm ? 'login' : 'register';
      const response = await axios.post(`http://127.0.0.1:8000/api/${endpoint}`, {
        username: isLoginForm ? undefined : username,
        email,
        password,
      });
      setMessage(response.data.message);
      if (response.data.message === 'User registered successfully') {
        setIsLoginForm(true);
      }
    
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      setMessage(`Authentication ${isLoginForm ? 'login' : 'registration'} failed. Please try again.`);
      console.error(error);
    }
  };

  const toggleForm = () => {
    setIsLoginForm((prev) => !prev);
    setMessage('');
  };


  return (
    <div className="auth-container">
      <h2>{isLoginForm ? 'Login' : 'Register'}</h2>
      <form className="auth-form">
        {!isLoginForm && (
          <div className="input-group">
            <label>Username</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
        )}
        <div className="input-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="button-group">
          <button onClick={handleAuth}>{isLoginForm ? 'Login' : 'Register'}</button>
        </div>
        <p className="toggle-form" onClick={toggleForm}>
          {isLoginForm ? "Don't have an account? Sign up" : 'Already have an account? Login'}
        </p>
        {message && <p className={message.includes('failed') ? 'error' : 'success'}>{message}</p>}
      </form>
    </div>
  );
};

export default AuthForm;
