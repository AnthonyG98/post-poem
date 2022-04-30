import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Setup() {
  let history = useNavigate();
  const getUser = () => {
    axios
      .get(
        `https://post-poem.herokuapp.com/users/${localStorage.getItem(
          "username"
        )}`
      )
      .then((response) => {
        console.log(response);
        history("/dashboard");
      });
  };
  useEffect(() => {
    if (!localStorage.getItem("username")) {
      history("/");
    }
  }, []);

  return (
    <div className="login-container">
      <div className="login-overlay"></div>
      <div className="setup-text-container">
        <h1>Welcome to PoemPost</h1>
        <p>
          A social media center to post your poetry and favorite others. Read
          around and don't forget to comment on other pieces!
        </p>
        <button onClick={getUser}>OK</button>
      </div>
    </div>
  );
}

export default Setup;
