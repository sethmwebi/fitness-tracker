import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import LoginPage from "./components/login/Login";
import DistanceFinder from "./components/DistanceFinder";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from "./hooks/useUserStore";
import Profile from "./components/Profile";

function App() {
  const navigate = useNavigate();
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
  return (
    <section className="root">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/distance" element={<DistanceFinder />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </section>
  );
}

export default App;
