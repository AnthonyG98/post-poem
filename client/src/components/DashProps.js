import React, { useState, useEffect } from "react";
import { Image } from "cloudinary-react";
import axios from "axios";
import CommentProps from "./CommentProps";
import { useNavigate } from "react-router-dom";
function DashProps(props) {
  let history = useNavigate();

  const [comment, setComment] = useState();
  const [username, setUsername] = useState();
  const [profileImg, setProfileImg] = useState();
  const [commentContainer, setCommentContainer] = useState();
  const [userId, setUserId] = useState();

  const getUser = () => {
    axios
      .get(
        `https://post-poem.herokuapp.com/users/${localStorage.getItem(
          "username"
        )}`
      )
      .then((response) => {
        setProfileImg(response.data.profile_picture);
        setUsername(response.data.username);
        setUserId(response.data.id);
      });
  };
  const postComment = (poemId) => {
    const commentData = {
      comment: comment,
      username: username,
      profile_picture: profileImg,
      poemId: poemId,
    };
    axios
      .post("https://post-poem.herokuapp.com/comment", commentData)
      .then((response) => {
        console.log(response);
      });
  };
  const openComments = (poemId) => {
    axios
      .get(`https://post-poem.herokuapp.com/comment/${poemId}`)
      .then((response) => {
        setCommentContainer(
          response.data.map((el) => {
            return (
              <CommentProps
                profileImg={el.profile_picture}
                username={el.username}
                comment={el.comment}
              />
            );
          })
        );
      });
  };
  const addToFavorite = (poemId) => {
    axios
      .get(`https://post-poem.herokuapp.com/poems/piece/${poemId}`)
      .then((response) => {
        console.log(response);
        const favoriteData = {
          title: response.data.title,
          author: response.data.author,
          piece: response.data.piece,
          UserId: userId,
        };
        axios
          .post("https://post-poem.herokuapp.com/favorite", favoriteData)
          .then((response) => {
            console.log(response);
          });
      });
  };
  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="dashprops-container">
      <div className="dashprops-author">
        <Image
          className="dash-img"
          cloudName="delktfw1a"
          publicId={props.profile_picture}
        />
        <p
          onClick={() => {
            history(`/${props.author}`);
          }}
          className="username-link"
        >
          {props.author}
        </p>
      </div>
      <div className="dash-text">
        <p className="title">{props.title}</p>
        <p>{props.poem}</p>
        <i
          class="fa-solid fa-bookmark"
          id="dash-bookmark"
          onClick={() => {
            addToFavorite(props.id);
          }}
        ></i>
        <div className="comments-container" id="comments">
          <input
            type="text"
            onChange={(e) => {
              setComment(e.target.value);
            }}
            className="comment-input"
          />
          <button
            className="post-btn"
            onClick={() => {
              postComment(props.id);
            }}
          >
            Post
          </button>
          <p
            onClick={() => {
              openComments(props.id);
            }}
            className="open-comments"
          >
            Comments
          </p>
        </div>
      </div>
      <div>{commentContainer}</div>
    </div>
  );
}

export default DashProps;
