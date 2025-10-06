import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function Registration() {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

const handleRegister = () => {
  axios.post('http://localhost:3001/register', { user_login: login, user_password: password })
    .then(response => {
      const { user_id } = response.data;
      localStorage.setItem('user_id', user_id);  // <-- сохраняем ID
      navigate('/tasks');
    })
    .catch(error => {
      console.error('Error during registration:', error);
      alert('Registration failed.');
    });
};


  const handleLogin = () => {
    axios.post('http://localhost:3001/login', { user_login: login, user_password: password })
      .then(response => {
        alert(response.data.message);
        navigate('/tasks');
      })
      .catch(error => {
        if (error.response) {
          alert(error.response.data);
        } else {
          alert('Login failed.');
        }
      });
  };

  return (
    <div className="registration">
      <h1>Login or Register</h1>
      <input
        type="text"
        placeholder="Login"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <div>
        <button onClick={handleLogin}>Login</button>
        <button onClick={handleRegister}>Register</button>
      </div>
    </div>
  );
}

export default Registration;
