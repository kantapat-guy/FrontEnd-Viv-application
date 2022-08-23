import "./Sidebar.css";
import Profile from "./Profile";
import Summary from "./Summary";
import Weather from "./weather/Weather";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Profile />
      <Weather />
      <Summary />
    </div>
  );
};

export default Sidebar;
