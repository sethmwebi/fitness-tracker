import { useState } from "react";
import * as Icon from "react-bootstrap-icons";
function ActivityTracker() {
  const [actionModal, setActionModal] = useState(false);
  return (
    <div className="activity-page">
      <div
        className="tab-button"
        onClick={() => {
          actionModal ? setActionModal(false) : setActionModal(true);
        }}
      >
        <Icon.Plus />
      </div>
      {actionModal ? (
        <div className="actions">
          <div className="single-action">
            <Icon.Bicycle />
            <p>Cycling</p>
          </div>
          <div className="single-action">
            <Icon.Person />
            <p>Running</p>
          </div>
          <div className="single-action">
            <Icon.PersonWalking />
            <p>Walking</p>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ActivityTracker;
