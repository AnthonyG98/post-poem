import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
function SignUp() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  let history = useNavigate();

  const signUp = async () => {
    const signUpData = {
      username: username,
      password: password,
      profile_picture: "default_nlfrji",
    };
    const response = await axios.post(
      "https://post-poem.herokuapp.com/users",
      signUpData
    );
    localStorage.setItem("username", response.data);
    history("/setup");
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
        <button className="login-btn" onClick={signUp}>
          Sign Up
        </button>
        <p>
          Already a user?{" "}
          <Link className="signup-link" to="/">
            Login
          </Link>
        </p>
        <p>
          Or continue as <button>Guest</button>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
