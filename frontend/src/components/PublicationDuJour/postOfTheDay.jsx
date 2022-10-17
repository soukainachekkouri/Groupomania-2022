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
        Pendant mon voyage dans la Loire, je tenais un journal de toutes mes
        dépenses avec une description pour me souvenir en même temps de chaque
        activité !
      </p>
    </div>
  );
}

export default PublicationCard;
