import "../PublicationCard/Publicationcard.css";
import avatar from "../Header/assets/avatar.png";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PublicationCard(props) {
  const title = props.title;
  return (
    <div className="publication-card">
      <div className="first-section">
        <div className="reaction">
          <img src={avatar} alt="My-avatar" className="publication-avatar" />
          <div className="like-and-comment">
            <FontAwesomeIcon icon={faHeart} className="reaction-icon-like" />
            <p>0</p>
          </div>
          <div className="like-and-comment">
            <FontAwesomeIcon
              icon={faCommentDots}
              className="reaction-icon-comment"
            />
            <p>0</p>
          </div>
        </div>
      </div>
      <div className="post-details">
        <div className="user-info">
          <h1 className="user-info-name">Claire</h1>
          <p>il y a 3min</p>
        </div>
        <div className="content">
          <p>
            Pendant mon voyage dans la Loire, je ne vous ai pas oublié. A tous
            ceux qui sont dans les locaux, un petit dejeuner vous attend !
          </p>
          <div className="post-image">
            <img />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicationCard;
