import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import axios from "axios";
import DashProps from "./DashProps";
import Profile from "./Profile";
import Profileprops from "./Profileprops";
function Other() {
  const [profileImg, setProfileImg] = useState();
  const [otherImg, setOtherImg] = useState();
  const [username, setUsername] = useState();
  const [poem, setPoem] = useState();

  const getUser = () => {
    axios
      .get(
        `https://post-poem.herokuapp.com/users/${localStorage.getItem(
          "username"
        )}`
      )
      .then((response) => {
        setProfileImg(response.data.profile_picture);
        //  setUsername(response.data.username);
        //  setUserId(response.data.id);
        //  getUserPoems(response.data.id);
      });
  };
  const getUserPoems = (poemId) => {
    axios
      .get(`https://post-poem.herokuapp.com/poems/${poemId}`)
      .then((response) => {
        setPoem(
          response.data.map((el) => {
            return <Profileprops username={el.author} poem={el.piece} />;
          })
        );
      });
  };
  const getOtherUser = () => {
    axios
      .get(
        `https://post-poem.herokuapp.com/users/${localStorage.getItem(
          "otherUser"
        )}`
      )
      .then((response) => {
        setOtherImg(response.data.profile_picture);
        setUsername(response.data.username);
        getUserPoems(response.data.id);
      });
  };
  useEffect(() => {
    getUser();
    getOtherUser();
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
      <div className="profile-container">
        <div className="profile-bio">
          <h1>{username}</h1>
          <Image
            cloudName="delktfw1a"
            publicId={otherImg}
            className="profile-img"
          />
        </div>
        <div className="profile-posts">
          <p>{poem}</p>
        </div>
      </div>
    </>
  );
}

export default Other;
