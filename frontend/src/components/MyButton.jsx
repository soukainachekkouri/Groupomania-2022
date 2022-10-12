import "../styles/components/MyButton.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MyButton(props) {
  const title = props.title;
  const icon = props.icon;
  return (
    <div>
      <button className="Bouton">
        <FontAwesomeIcon icon={faPlus} className="Bouton-icon-plus" />
        <h3 className="bouton-content">{title}</h3>
      </button>
    </div>
  );
}

export default MyButton;
