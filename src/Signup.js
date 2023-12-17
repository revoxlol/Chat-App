import React, { useState } from 'react';
import './Signup.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      if (formData.password !== formData.confirmPassword) {
        setErrorMessage('Passwords do not match');
        return;
      }

      const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        
        console.log('User registered successfully');
        window.location.href = '/chat';
      } else {
        
        setErrorMessage('Signup failed');
      }
    } catch (error) {
      setErrorMessage(`Error during signup: ${error.message}`);
    }
  };

  return (
    <div className="signup-container">
      <h2 className="Title">Sign up</h2>
      <form>
        <label>
          Username:
          <input type="text" name="username" onChange={handleInputChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" onChange={handleInputChange} />
        </label>
        <label>
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            onChange={handleInputChange}
          />
        </label>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <br />
        <button type="button" onClick={handleSignup}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
