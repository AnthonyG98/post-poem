import axios from "axios";
import React, { useState, useEffect } from "react";
import { Image } from "cloudinary-react";
import { Link } from "react-router-dom";
import DashProps from "./DashProps";
function Dashboard() {
  const [profileImg, setProfileImg] = useState();
  const [pieces, setPieces] = useState();
  const getUser = () => {
    axios
      .get(
        `https://post-poem.herokuapp.com/users/${localStorage.getItem(
          "username"
        )}`
      )
      .then((response) => {
        setProfileImg(response.data.profile_picture);
      });
  };
  const getPieces = () => {
    axios.get("https://post-poem.herokuapp.com/poems/all").then((response) => {
      setPieces(
        response.data.map((el) => {
          return (
            <DashProps
              title={el.title}
              profile_picture={el.profile_picture}
              poem={el.piece}
              author={el.author}
              id={el.id}
            />
          );
        })
      );
    });
  };
  useEffect(() => {
    getUser();
    getPieces();
  }, []);

  return (
    <div className="dashboard-container">
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
      <div className="create-btn">
        <Link to="/write" id="create">
          Create New
        </Link>
        <Link to="/favorites">
          <i class="fa-solid fa-bookmark"></i>
        </Link>{" "}
      </div>
      <div>{pieces}</div>
    </div>
  );
}

export default Dashboard;
