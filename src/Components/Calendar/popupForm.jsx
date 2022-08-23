import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './popupForm.css'
import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';


const PopupForm = () => {
    const date = new Date();
    let currentDate = date.toISOString().slice(0,10);
    // let currentTime = date.getHours() + ':' + date.getMinutes();

    const [state, setState] = useState({
        title: "",
        start: currentDate,
        end: currentDate
    })
    const { title, start, end } = state

    const handleInput = (event) => {
        const value = event.target.value
        setState({...state, [event.target.name]: value})
    }

    const sendData = () => {
        axios
        .post(`${import.meta.env.VITE_API_URL}/schedule/create`, {title, start, end})
        .then((res) => {
            console.log(res.data)
            //popup to show it been save
            Swal.fire(
                'Good job!',
                'Your data had been saved.',
                'success',
            )
        
        })
    }


    return (
        <div style={{ display:"flex", justifyContent: "center", alignItems: "center", flexDirection:"column" }}>
        <div className='header-schedule'>
          <h1 className='calendar-title' style={{ textAlign:"center" }}>SCHEDULE</h1>
          <Popup 
            trigger={<button className='addEvent-btn' style={{margin:"20px"}}>+ NEW REMINDER</button>}
            modal
            nested>
            {close => (
                <div className="modal">
                    <button className="close" onClick={close}>
                    &times;
                    </button>
                    <div className="remind-header"> NEW REMINDER</div>
                    <div className="content">
                        {' '}
                        <h5>What do you want to do?</h5>
                        <input className='input-text' name='title' type="text" placeholder='e.g: Running, Jogging' defaultValue={''} onChange={handleInput} />
                        <h5>Time Start ?</h5>
                        <input className='input-date' name='start' type="date" defaultValue={currentDate} onChange={handleInput} />
                        {/* <input className='input-time' type="time" defaultValue={currentTime} onChange={handleTime} /> */}
                        <h5>Time End ?</h5>
                        <input className='input-date' name='end' type="date" defaultValue={currentDate} onChange={handleInput} />
                        {/* <input className='input-time' type="time" defaultValue={currentTime} /> */}
                        <div style={{ display:"flex", justifyContent:'flex-end'}}>
                            <button onClick={sendData} className='confirm-btn'>CONFIRM</button>
                        </div>
                    </div>
                </div>
              )}
          </Popup>
        </div>
        </div>
    )
}

export default PopupForm;