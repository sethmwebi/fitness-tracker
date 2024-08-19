import { CheckLg } from "react-bootstrap-icons";

function SingleBar({ day, cals }) {
  return (
    <div className="singleBar">
      <div className="bar-progres" style={{ height: `${cals / 2}px` }}></div>
      <p>{day}</p>
      {console.log(cals)}
    </div>
  );
}

export default SingleBar;

