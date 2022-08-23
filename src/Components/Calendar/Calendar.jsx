import React, { useState, useCallback, useEffect } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import axios from 'axios';

import Swal from 'sweetalert2';
import 'animate.css';

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './popupForm.css'

import { getToken } from '../Login/services/auth';


const MyCalendar = () => {
  const [myEvents, setEvents] = useState([])

  //Fetch data from database to show schedule
  const fetchData = () => {
    axios
    .get(`${import.meta.env.VITE_API_URL}/users/me/schedule`, {headers: {authorization: `Bearer ${getToken()}`}})
    .then((res) => {
      setEvents(res.data)
    })
    .catch((err) => {
      alert(err)
    })
  }

  console.log(myEvents[0])
  useEffect(() => {
    fetchData()
  }, [])
  
  //Adjust duration of Swal-showclass animation
  document.documentElement.style.setProperty('--animate-duration', '0.6s');

  const onSelectEvent = useCallback(
    (myEvents) => {
      const start = (myEvents.start).slice(0, 10)
      const end = (myEvents.end).slice(0, 10)
      const startReverse = `${start.slice(8,10)}-${start.slice(5,7)}-${start.slice(0,4)}`
      const endReverse = `${end.slice(8,10)}-${end.slice(5,7)}-${end.slice(0,4)}`
      
      Swal.fire({
        title: `Reminder : ${myEvents.title}`,
        html: `Start date : <b>${startReverse}</b><br> End date : <b>${endReverse}</b>`,
        target: "Test",
        showCancelButton: true,
        confirmButtonText: 'Delete it!',
        confirmButtonColor: '#d33',
        showCloseButton: true,
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
          },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
          }
        }
      ).then((result)=>{
        if(result.isConfirmed){
          axios
          .delete(`${import.meta.env.VITE_API_URL}/users/me/schedule/${myEvents._id}`, {headers: {authorization: `Bearer ${getToken()}`}})
          .then(()=>{
          //popup for show it complete
          Swal.fire(
              "Delete complete!",
              'Your data had been deleted.',
              "success"
          )
          //Req to show new data after delete
          fetchData()
          })
          .catch(err=>console.log(err))
        }
    })
    },
    []
  )


  //Pop up form
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
      .post(`${import.meta.env.VITE_API_URL}/users/me/schedule/create`, {title, start, end}, {headers: {authorization: `Bearer ${getToken()}`}})
      .then((res) => {
          console.log(res.data)
          //popup to show it been save
          Swal.fire({
              title: 'Good job!',
              text: 'Your data had been saved.',
              icon: 'success',
            })
              fetchData()
      })
  }
  

  return (
    <div>
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
                          <input className='input-text' name='title' type="text" required placeholder='e.g: Running, Jogging' onChange={handleInput} />
                          <h5>Time Start ?</h5>
                          <input className='input-date' name='start' type="date" defaultValue={currentDate} onChange={handleInput} />
                          {/* <input className='input-time' type="time" defaultValue={currentTime} onChange={handleTime} /> */}
                          <h5>Time End ?</h5>
                          <input className='input-date' name='end' type="date" defaultValue={currentDate} onChange={handleInput} />
                          {/* <input className='input-time' type="time" defaultValue={currentTime} /> */}
                          <div style={{ display:"flex", justifyContent:'flex-end'}}>
                              <button onClick={() => {sendData()
                                                      close();}} className='confirm-btn'>CONFIRM</button>
                          </div>
                      </div>
                  </div>
                )}
            </Popup>
          </div>
        </div>
        <div style={{ display:"flex", justifyContent: "center", alignItems: "center" }}>
          <Calendar
            localizer={momentLocalizer(moment)}
            defaultDate={new Date()}
            defaultView="month"
            events={myEvents}
            style={{ height: "50vh", width: "50vw" }}
            onSelectEvent={onSelectEvent}
            popup={true}
          />
        </div>
    </div>
  )
}


export default MyCalendar;