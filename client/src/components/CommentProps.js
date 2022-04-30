import React from "react";
import { Image } from "cloudinary-react";
import { useNavigate, useParams } from "react-router-dom";
function CommentProps(props) {
  let history = useNavigate();
  return (
    <div className="comment-props-container">
      <div className="comment-bio">
        <Image
          className="comment-profileImg"
          cloudName="delktfw1a"
          publicId={props.profileImg}
        />
        <p
          onClick={() => {
            localStorage.setItem("otherUser", props.username);
            history(`/${props.username}`);
          }}
        >
          {props.username}
        </p>
      </div>
      <div className="comment-text-container">
        <p className="comment-props">{props.comment}</p>
      </div>
    </div>
  );
}

export default CommentProps;
