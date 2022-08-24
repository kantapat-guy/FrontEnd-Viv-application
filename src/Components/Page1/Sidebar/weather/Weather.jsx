
import axios from 'axios';
import { useState, useEffect } from 'react';
import './Weather.css'
import wind from "./image/wind.png"
import temp from "./image/celsius.png"
import rain from "./image/drops.png"
import hum from "./image/humidity.png"

const Weather = () => {

    const [data, setData] = useState({
        icon: "",
        weather: "",
        location: "",
        country: "",
        temp: "",
        humidity: "",
        rain: "",
        wind: "",
    })

    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: {q: 'Bangkok'},
        headers: {
          'X-RapidAPI-Key': 'f0e17f9640msha8a1dba22d141cep100024jsn80effb1ee027',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };

    const fecthAPI = () =>{
    axios.request(options).then(function (res) {

        setData({
            icon: `https:${res.data.current.condition.icon}`,
            weather: res.data.current.condition.text,
            location: res.data.location.name,
            country: res.data.location.country,
            temp: res.data.current.feelslike_c,
            humidity: res.data.current.humidity,
            rain: res.data.current.precip_mm,
            wind: res.data.current.wind_kph,
        });
    }).catch(function (error) {
        console.error(error);
    })};

    useEffect( ()=> {
        fecthAPI()
    },[])


    return (
        <>
            <div className='weather-container'>
                <div className='weather-head'>
                    <h3>Today is ....</h3>
                </div>
                <div className='weather-content'>
                    <div className='weather-result'>
                        <h4 className='env-data'>{data.weather}</h4>
                        <img src={data.icon} alt="weather" />
                        <h4>{data.location}, {data.country}</h4>
                    </div>
                    <div className='detail-result'>
                        <div className='detail-container'>
                            <img style={{width:"20px"}} src={temp} />
                            <h4 className='detail-data'>{data.temp} &#176;C</h4>
                        </div>
                        <div className='detail-container'>
                            <img style={{width:"20px"}} src={wind} />
                            <h4 className='detail-data'>{data.wind} km/h</h4>
                        </div>
                        <div className='detail-container'>
                            <img style={{width:"20px"}} src={rain} />
                            <h4 className='detail-data'>{data.rain} mm</h4>                            
                        </div>
                        <div className='detail-container'>
                            <img style={{width:"20px"}} src={hum} />
                            <h4 className='detail-data'>{data.humidity} %</h4>                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Weather;