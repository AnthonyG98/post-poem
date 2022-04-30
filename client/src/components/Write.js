import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Image } from "cloudinary-react";
import axios from "axios";
function Write() {
  const [author, setAuthor] = useState();
  const [title, setTitle] = useState();
  const [piece, setPiece] = useState();
  const [profileImg, setProfileImg] = useState();
  const [userId, setUserId] = useState();

  let history = useNavigate();

  const getUser = () => {
    axios
      .get(
        `https://post-poem.herokuapp.com/users/${localStorage.getItem(
          "username"
        )}`
      )
      .then((response) => {
        setProfileImg(response.data.profile_picture);
        setAuthor(response.data.username);
        setUserId(response.data.id);
      });
  };
  const onPublish = () => {
    const publishData = {
      title: title,
      profile_picture: profileImg,
      author: author,
      piece: piece,
      UserId: userId,
    };
    axios
      .post("https://post-poem.herokuapp.com/poems", publishData)
      .then((response) => {
        history("/dashboard");
      });
  };
  useEffect(() => {
    if (!localStorage.getItem("username")) {
      history("/");
    }

    getUser();
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
      <div className="writing-container">
        <div className="writing-text-container">
          <input
            type="text"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <textarea
            onChange={(e) => {
              setPiece(e.target.value);
            }}
          ></textarea>
          <button id="create" onClick={onPublish}>
            Publish
          </button>
        </div>
      </div>
    </>
  );
}

export default Write;
