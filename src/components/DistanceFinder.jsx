import * as Icon from "react-bootstrap-icons";
import map from "../assets/msp.jpeg";
import { getDistance } from "geolib";
import { useEffect, useState } from "react";
import { supabase } from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import { useActivity } from "../hooks/useActivityStore";
import { useUser } from "../hooks/useUserStore";
import loader from "../assets/loader.gif";
function DistanceFinder() {
  const navigate = useNavigate();
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [distance, setDistance] = useState(0);
  const [prevLocation, setPrevLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const [isCounting, setIsCounting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [secs, setSecs] = useState(0);

  const { Activity, setActivity } = useActivity((state) => ({
    Activity: state.Activity,
    setActivity: state.setActivity,
  }));
  const { user, setUser } = useUser((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  useEffect(() => {
    const userData = sessionStorage.getItem("user");
    if (!userData) {
      navigate("/login");
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  useEffect(() => {
    let interval;
    if (isCounting) {
      interval = setInterval(() => {
        setSecs((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isCounting]);

  const start = () => {
    setIsCounting(true);
  };
  const pause = () => {
    setIsCounting(false);
  };
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);

  useEffect(() => {
    const handleSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
      if (
        prevLocation.latitude != null &&
        prevLocation.longitude != null &&
        prevLocation
      ) {
        if (prevLocation) {
          const newDistance = getDistance(prevLocation, {
            latitude,
            longitude,
          });
          setDistance((prev) => prev + newDistance);
          setPrevLocation({ latitude, longitude });
        }
      } else {
        setPrevLocation({ latitude, longitude });
      }
    };
    const handleError = (err) => {
      console.log("Error getting location:", err);
    };
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(handleSuccess, handleError);
    } else {
      console.error("Geolocation is not supported by device or browser");
    }
  }, [prevLocation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setModalIsOpen(true);
    setIsLoading(true);
    const { data, error } = await supabase.from("user_activities").insert([
      {
        user_id: user.id,
        activity_date: new Date().toISOString(),
        running_time: 500,
        activity_type: Activity,
        distance: distance,
      },
    ]);

    if (error) {
      console.error("Error inserting data:", error);
    } else {
      console.log("Data inserted:", data);
      setIsLoading(false);
      setIsSuccess(true);
    }
  };
  const EndTracker = () => {
    setIsCounting(false);
    setSecs(0);
    setIsSuccess(false);
    navigate("/");
  };
  return (
    <div className="distance-finder">
      <img src={map} />
      <div className="duration">
        <p>Duration</p>
        <h3>
          {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
        </h3>
      </div>
      <div className="distance">
        <p>distance</p>
        <h3>{distance / 1000}</h3>
      </div>
      <div className="speed">
        <p>Pace</p>
        <h3>{secs > 0 ? distance / secs : 0} m/s</h3>
      </div>
      <div className="buttons">
        {isCounting ? (
          <button onClick={pause} className="pause">
            <Icon.Pause />
          </button>
        ) : (
          <button onClick={start} className="play">
            <Icon.Play />
          </button>
        )}
        <button className="end" onClick={handleSubmit}>
          <Icon.Stop />
        </button>
      </div>
      {modalIsOpen ? (
        <div className="modal-container">
          <div className="modal">
            {isLoading ? (
              <div className="loader">
                <img src={loader} className="loader-icon" />
                <h2>Recording your data ....</h2>
              </div>
            ) : (
              ""
            )}
            {isSuccess ? (
              <div className="success">
                <h2>Your data has successfully been recorded</h2>
                <button onClick={EndTracker}>Close Tracker</button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default DistanceFinder;
