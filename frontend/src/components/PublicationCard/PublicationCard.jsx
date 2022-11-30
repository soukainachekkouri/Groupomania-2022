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
  const isAdmin = JSON.parse(window.localStorage.getItem("isAdmin"));
  const [numberLike, setNumberLike] = useState(post.likes);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/profile/" + post.userId)
      .then((response) => response.json())
      .then((datas) => {
        setUser(datas);
        //ici je vérifie si le post est déjà liké ?
        for (let id of post.usersLiked) {
          if (id == userId) {
            console.log(id);
            setIsLiked(true);
          }
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const defaultImage =
    "https://eatcetera.co/wp-content/uploads/2019/09/croissants_frais.jpg";

  const image = post.imageUrl;
  const proprio = post.userId === userId;
  const testAdmin = proprio ? true : isAdmin;
  const lien = testAdmin && `/publication/${post._id}`;
  let deleted = testAdmin && (
    <button className="delete-button" onClick={() => deletePost()}>
      delete
    </button>
  );

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

  const handleClick = (like) => {
    const LikeCompteur = { like: like, userId: userId };
    console.log(LikeCompteur);
    fetch("http://localhost:3000/api/post/" + post._id + "/like", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(LikeCompteur),
    })
      .then((result) => result.json())
      .then((dataResult) => {
        setIsLiked(!isLiked);
        if (like == 1) {
          setNumberLike(post.likes + 1);
        } else {
          if (numberLike > 0) {
            setNumberLike(post.likes - 1);
          }
        }
      })
      .catch((error) => console.log(error));
  };
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

  console.log(isLiked);
  return (
    <>
      <div className="publication-card">
        <div className="first-section">
          <div className="reaction">
            <img src={avatar} alt="My-avatar" className="publication-avatar" />
            <div className="like-and-comment">
              {isLiked ? (
                <FontAwesomeIcon
                  icon={faHeart}
                  className="reaction-icon-like"
                  onClick={() => handleClick(0)}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faHeart}
                  onClick={() => handleClick(1)}
                />
              )}
              <p className="compteur-clic">{numberLike}</p>
            </div>
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
            <Link calssName="publication-card-link" to={lien}>
              <div className="post-image">
                <img
                  className="post-image"
                  src={image ? image : defaultImage}
                  alt="image-de-post"
                />
              </div>
              <div></div>
            </Link>
          </div>
        </div>
      </div>

      {deleted}
    </>
  );
}

export default PublicationCard;
