import React, { useState, useEffect } from "react";
import { Image } from "cloudinary-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Profileprops from "./Profileprops";
function Profile() {
  let history = useNavigate();
  const [username, setUsername] = useState();
  const [userId, setUserId] = useState();
  const [profileImg, setProfileImg] = useState();
  const [poemAuthor, setPoemAuthor] = useState();
  const [poem, setPoem] = useState();
  const [image, setImage] = useState();
  const [refresh, setRefresh] = useState(false);

  const getUserPoems = (id) => {
    axios.get(`http://localhost:3001/poems/${id}`).then((response) => {
      setPoem(
        response.data.map((el) => {
          return <Profileprops username={el.author} poem={el.piece} />;
        })
      );
    });
  };

  const changeProfileImg = () => {
    const imgFormData = new FormData();
    imgFormData.append("file", image);
    imgFormData.append("upload_preset", "fy5ahm9g");

    axios
      .post(
        `https://api.cloudinary.com/v1_1/delktfw1a/image/upload`,
        imgFormData
      )
      .then((response) => {
        const fileName = response.data.public_id;
        const imageData = {
          profile_picture: fileName,
        };
        const postImageData = {
          profile_picture: fileName,
        };
        axios
          .put(`http://localhost:3001/poems/profile/${userId}`, postImageData)
          .then((response) => {
            console.log(response);
          });
        axios
          .put(`http://localhost:3001/users/profile/${userId}`, imageData)
          .then((response) => {
            console.log(response);
          });
      });
  };
  const getUser = () => {
    axios
      .get(`http://localhost:3001/users/${localStorage.getItem("username")}`)
      .then((response) => {
        setProfileImg(response.data.profile_picture);
        setUsername(response.data.username);
        setUserId(response.data.id);
        getUserPoems(response.data.id);
      });
  };
  useEffect(() => {
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
      <div className="profile-container">
        <div className="profile-bio">
          <h1>{username}</h1>
          <Image
            cloudName="delktfw1a"
            publicId={profileImg}
            className="profile-img"
          />
          <input
            type="file"
            className="change-img"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
          />
          <button className="change-img-btn" onClick={changeProfileImg}>
            Change Profile Picture
          </button>
        </div>
        <div className="profile-posts">
          <p>{poem}</p>
        </div>
      </div>
    </>
  );
}

export default Profile;
