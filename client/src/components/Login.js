import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  let history = useNavigate();

  const login = async () => {
    const loginData = {
      username: username,
      password: password,
    };
<<<<<<< HEAD
    const response = await axios.post(
      "https://post-poem.herokuapp.com/users/login",
      loginData
    );
    localStorage.setItem("username", username);
    history("/dashboard");
=======
    //Needs to be updated to look like signIn request because CORS error
    axios
      .post("https://post-poem.herokuapp.com/users/login", loginData)
      .then((response) => {
        history("/dashboard");
        localStorage.setItem("username", username);
      });
>>>>>>> cd60558f49cfb393fb490ac1d4635634b0bc5fc8
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
          To Login as Guest:
          <br />
          Username: Guest
          <br />
          Password: ASDF1234
          <br />
        </p>
      </div>
    </div>
  );
}

export default Login;
