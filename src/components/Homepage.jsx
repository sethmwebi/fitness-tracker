import ActivityTracker from "./ActivityTracker";
import DashboardTabs from "./DashboardTabs";
import NavBar from "./NavBar";

function Homepage() {
  return (
    <div className="dashboard">
      <NavBar />
      <DashboardTabs />
      <ActivityTracker />
    </div>
  );
}

export default Homepage;
