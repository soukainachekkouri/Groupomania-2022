import "../PublicationCard/Publicationcard.css";
import avatar from "../Header/assets/avatar.png";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MyButton from "../MyButton/MyButton";

function PublicationCard(props) {
  const [user, setUser] = useState(null);
  const { post, handleDelete } = props;
  const userId = window.localStorage.getItem("userId");
  const isAdmin = window.localStorage.getItem("isAdmin");

  useEffect(() => {
    fetch("http://localhost:3000/api/profile/" + post.userId)
      .then((response) => response.json())
      .then((datas) => {
        setUser(datas);
      })
      .catch((error) => console.log(error));
  }, []);

  const defaultImage =
    "https://eatcetera.co/wp-content/uploads/2019/09/croissants_frais.jpg";

  const image = post.imageUrl;
  const proprio = post.userId === userId;
  const testAdmin = proprio ? true : isAdmin;

  const lien = testAdmin && `/publication/${post.id}`;

  const token = window.localStorage.getItem("token");
  const deletePost = () => {
    console.log(post._id);
    fetch("http://localhost:3000/api/post/" + post._id, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((result) => handleDelete(post))
      .catch((error) => console.log(error));
  };

  let deleted = testAdmin && (
    <button className="delete-button" onClick={() => deletePost}>
      {" "}
      Supprimer
    </button>
  );

  /*const like = document.getElementById("like-and-comment");
  const compteurLike = document.getElementById("compteur-clic");
  if (like) {
    like.onclick = function () {
      compteurLike += 1;
      document.getElementById(compteurLike);
      return false;
    };
  } else {
  }*/
  return (
    <>
      <Link className="link-design" to={lien}>
        <div className="publication-card">
          <div className="first-section">
            <div className="reaction">
              <img
                src={avatar}
                alt="My-avatar"
                className="publication-avatar"
              />
              <div className="like-and-comment">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="reaction-icon-like"
                />
                <p className="compteur-clic">0</p>
              </div>
              <button className="like-and-comment" /*onClick={compteurLike}*/>
                <FontAwesomeIcon
                  icon={faCommentDots}
                  className="reaction-icon-comment"
                />
                <p></p>
              </button>
            </div>
          </div>
          <div className="post-details">
            <div className="user-info">
              <h1 className="user-info-name">
                {user ? user.name : "user not found"}
              </h1>
            </div>
            <div className="content">
              <p>{post.message}</p>
              <div className="post-image">
                <img
                  className="post-image"
                  src={image ? image : defaultImage}
                  alt="image-de-post"
                />
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </Link>
      {deleted}
    </>
  );
}

export default PublicationCard;
