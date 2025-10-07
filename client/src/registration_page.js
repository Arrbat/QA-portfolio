import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./registration_page.css";

function Registration() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const { data } = await axios.post("http://localhost:3001/register", {
        user_login: login,
        user_password: password,
      });

      localStorage.setItem("user_id", data.user_id);
      setErrorMessage(""); 
      navigate("/tasks");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Registration/Login failed.");
      }
    }
  };

  const handleLogin = async () => {
    try {
      const { data } = await axios.post("http://localhost:3001/login", {
        user_login: login,
        user_password: password,
      });

      localStorage.setItem("user_id", data.user_id);
      setErrorMessage("");
      navigate("/tasks");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Login failed.");
      }
    }
  };

  return (
    <div className="registration">
      <h1>Login or Register</h1>
      {errorMessage && <p className="error">{errorMessage}</p>}
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
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Registration;
