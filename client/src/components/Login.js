import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  let history = useNavigate();

  const login = () => {
    const loginData = {
      username: username,
      password: password,
    };
    axios
      .post("https://post-poem.herokuapp.com/users/login", loginData)
      .then((response) => {
        history("/dashboard");
        localStorage.setItem("username", username);
      });
  };
  return (
    <div className="login-container">
      <div className="login-overlay"></div>
      <div className="login-inputs">
        <input
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <label>Username</label>
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label>Password</label>
        <button className="login-btn" onClick={login}>
          Login
        </button>
        <p>
          Not a user?{" "}
          <Link className="signup-link" to="/signup">
            Sign Up
          </Link>
        </p>
        <p>
          Or continue as{" "}
          <button
            onClick={() => {
              setUsername("Guest");
              setPassword("ASDF1234");
              login();
            }}
          >
            Guest
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
