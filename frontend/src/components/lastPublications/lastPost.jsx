import "../lastPublications/lastPost.css";
import avatar from "../Header/assets/avatar.png";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function LastPostCard(props) {
  const title = props.title;
  return (
    <div className="lp-publication-card">
      <div className="lp-all-sections"></div>
      <div className="lp-first-section">
        <div className="lp-reaction">
          <img src={avatar} alt="My-avatar" className="lp-publication-avatar" />
          <div className="lp-like-and-comment">
            <FontAwesomeIcon icon={faHeart} className="lp-reaction-icon-like" />
            <p>0</p>
          </div>
          <div className="lp-like-and-comment">
            <FontAwesomeIcon
              icon={faCommentDots}
              className="lp-reaction-icon-comment"
            />
            <p>0</p>
          </div>
        </div>
        <div className="lp-post-details">
          <div className="lp-user-info">
            <h1 className="lp-user-info-name">Claire</h1>
            <p>il y a 3min</p>
          </div>
          <div className="lp-content">
            <p>
              Pendant mon voyage dans la Loire, je ne vous ai pas oublié. A tous
              ceux qui sont dans les locaux, un petit dejeuner vous attend !
            </p>
            <div className="lp-post-image">
              <img />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LastPostCard;
