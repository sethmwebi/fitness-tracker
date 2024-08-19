import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Profile from "./components/Profile.jsx";
import LoginPage from "./components/login/Login.jsx";
import DistanceToday from "./components/DistanceToday.jsx";
import DistanceFinder from "./components/DistanceFinder.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/distance",
    element: <DistanceFinder />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />,
);
