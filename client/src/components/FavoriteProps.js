import React, { useState, useEffect } from "react";
import axios from "axios";

function FavoriteProps(props) {
  const removeFav = () => {
    axios
      .delete(`https://post-poem.herokuapp.com/favorite/delete/${props.id}`)
      .then((response) => {
        console.log(response);
        window.location.reload();
      });
  };
  return (
    <div className="fav-props-container">
      <div className="fav-bio">
        <h1>{props.author}</h1>
        <p>{props.text}</p>
        <button onClick={removeFav} className="remove-btn">
          Remove
        </button>
      </div>
    </div>
  );
}

export default FavoriteProps;
