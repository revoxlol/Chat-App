import React, { useState } from 'react';
import './Login.css'; 

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
        const response = await fetch('http://localhost:3000/user/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
  
        if (response.ok) {
          
          const { token } = await response.json();
          
         
          localStorage.setItem('token', token);
  
          
          window.location.href = '/chat';
        } else {
         
          console.error('Login failed');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    };

  return (
    <div className="login-container">
      <h2 className='Title'>Login</h2>
      <form>
        <label>
          Username:
          <input type="username" name="username" onChange={handleInputChange} />
        </label>
     
        <label>
          Password:
          <input type="password" name="password" onChange={handleInputChange} />
        </label>
       
        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
