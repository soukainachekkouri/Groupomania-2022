import "../MyButton/MyButton.css";

function MyButton(props) {
  const title = props.title;
  const icon = props.icon;
  return (
    <div>
      <button className="Bouton" type="submit">
        {title}
      </button>
    </div>
  );
}

export default MyButton;
