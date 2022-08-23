import "./Dropdown-button.css";

import calendarIcon from  '../Dropdown-button/calendarIcon.svg';

const Dropdown = () => {
    return (
        <div className="Dropdown-container">
            <button type="button"> 
            <img src={calendarIcon} />
                <select>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>
            </button>
        </div>
    );

}

export default Dropdown;