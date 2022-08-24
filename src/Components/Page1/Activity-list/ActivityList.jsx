import "./ActivityList.css";
import ActivityListCard from "./ActivityListCard";
import AddActivity from "./AddActivity";
const ActivityList = () => {


  return (
    <div className="act-container">
        <div className="head-content">
          <div className="">
          <h1 className="actList"> Activity List</h1>
          </div>
          <AddActivity />
        </div>
        <ActivityListCard />
    </div>
  );
};

export default ActivityList;
