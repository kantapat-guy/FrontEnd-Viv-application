import "./AddActivity.css";
import { Link } from "react-router-dom";

const AddActivity = () => {
  return (
    <div className="AddAct">
      <Link to="/create">
      <button>
        <h1>Add Activity</h1>
      </button>
      </Link>
    </div>
  );
};

export default AddActivity;