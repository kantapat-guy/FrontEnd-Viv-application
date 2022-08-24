import "./Sidebar.css";
import Profile from "./Profile";
import Summary from "./Summary";
import Weather from "./weather/Weather";
import Tips from "./Tips"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Profile />
      <Weather />
    </div>
  );
};

export default Sidebar;
