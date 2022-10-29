import "../PublicationDuJour/postOfTheDay.css";
import avatar from "../Header/assets/avatar.png";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCommentDots } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PublicationCard(props) {
  const title = props.title;
  return (
    <div className="post-of-the-day-part">
      <h3 className="post-of-the-day-part-title">Publication du jour</h3>
      <div className="post-of-the-day-part-content-image"></div>
      <p className="post-of-the-day-part-description">
        SAVE DE DATE !! Nous vous attendons tous jeudi 27 septembre, pour une
        soirée d'Halloween d'exception. Dégainez vos meilleures costumes, vous
        serez peut-être récompensé..{" "}
      </p>
      <div className="post-of-the-day-reaction">
        <img
          src={avatar}
          alt="My-avatar"
          className="publication-of-the-day-avatar"
        />
        <div className="like-and-comment">
          <FontAwesomeIcon icon={faHeart} className="reaction-icon-like" />
          <p>0</p>
        </div>
      </div>
    </div>
  );
}

export default PublicationCard;
