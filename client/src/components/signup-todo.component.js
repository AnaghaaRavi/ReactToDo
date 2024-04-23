// Signup.js
import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ onSignup }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/signup', { email, password });
      const { data } = response;
      if (data.success) {
        // Signup successful, update the state in the parent component
        onSignup(data.user);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Signup failed:', error);
      setError('Signup failed. Please try again.');
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Signup</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Signup;
