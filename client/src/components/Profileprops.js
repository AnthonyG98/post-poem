import React from "react";

function Profileprops(props) {
  return (
    <div className="profile-props-container">
      <h1>{props.username}</h1>
      <p>{props.poem}</p>
    </div>
  );
}

export default Profileprops;
