import axios from "axios";
import React, { useState, useEffect } from "react";
import FavoriteProps from "./FavoriteProps";
import { Link } from "react-router-dom";
import { Image } from "cloudinary-react";
function Favorites() {
  const [userId, setUserId] = useState();
  const [profileImg, setProfileImg] = useState();
  const [favorites, setFavorites] = useState();

  const getUser = () => {
    axios
      .get(`http://localhost:3001/users/${localStorage.getItem("username")}`)
      .then((response) => {
        getFavorites(response.data.id);
        setProfileImg(response.data.profile_picture);
      });
  };
  const getFavorites = (user) => {
    axios.get(`http://localhost:3001/favorite/${user}`).then((response) => {
      console.log(response.data);
      setFavorites(
        response.data.map((el) => {
          return (
            <FavoriteProps author={el.author} text={el.piece} id={el.id} />
          );
        })
      );
    });
  };

  useEffect(() => {
    getUser();
    //     getFavorites();
  }, []);

  return (
    <>
      <div className="dashboard-header">
        <Link to="/dashboard" className="dash-logo">
          <i class="fa-solid fa-marker"></i>{" "}
        </Link>
        <h1>Post-a-Poem</h1>
        <div className="dash-profileImg">
          <Link to="/profile">
            <Image
              className="profileImg"
              cloudName="delktfw1a"
              publicId={profileImg}
            />
          </Link>
        </div>
      </div>
      <div className="fav-container">{favorites}</div>
    </>
  );
}

export default Favorites;
