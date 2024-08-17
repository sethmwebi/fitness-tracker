import SingleBar from "./SingleBar";

function Calories() {
  return (
    <div className="single-tab calories">
      <p className="tab-title">Calories burned</p>
      <div className="info">
        <h2>
          678 <span>cals</span>
        </h2>
      </div>
      <div className="bar-graphs">
        <SingleBar day="Sun" cals={100} />
        <SingleBar day="Mon" cals={15} />
        <SingleBar day="Teu" cals={26} />
        <SingleBar day="Wen" cals={78} />
        <SingleBar day="Thur" cals={100} />
        <SingleBar day="Fri" cals={65} />
        <SingleBar day="Sat" cals={100} />
      </div>
    </div>
  );
}

export default Calories;
