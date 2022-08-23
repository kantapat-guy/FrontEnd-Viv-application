import './Tips.css';
import tip from '../../../assets/tips.png';
import tiptop from '../../../assets/tip-topic.png';
import axios from 'axios';

const Tips = () => {

    const options = {
        method: 'GET',
        url: 'https://weatherapi-com.p.rapidapi.com/current.json',
        params: {q: 'Bangkok'},
        headers: {
          'X-RapidAPI-Key': 'f0e17f9640msha8a1dba22d141cep100024jsn80effb1ee027',
          'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
      };
    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });

    return (
        <>
            <div className='Tip-container'>
                <div className='tip-text-container'>
                    <img src={tiptop} /> 
                    <h3>What's the Weather</h3>
                </div>
                <div className='tip-data-container'>
                    <div className='tip-img-container'>
                        <img src={tip} /> 
                    </div>
                    <div className='tip-result-container'>
                        <h6>The Definitive Guide to Healthy Eating in Real Life</h6>
                        <p>Depending on whom you ask, “healthy eating” may take any number of forms. It seems that everyone</p>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Tips;