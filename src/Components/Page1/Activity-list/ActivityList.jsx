import "./ActivityList.css";
import ActivityListCard from "./ActivityListCard";
import AddActivity from "./AddActivity";


const ActivityList = () => {

  return (
    <div className="act-container">
        <div className="head-content">
          <h1 className="actList"> Activity List</h1>
          <AddActivity />
        </div>
        <ActivityListCard />
    </div>
  );
};

export default ActivityList;
