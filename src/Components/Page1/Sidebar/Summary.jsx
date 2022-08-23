import './Summary.css'
import { Link } from 'react-router-dom'
import summaryLogo from './images/summaryicon.png'

const Summary = () => {
    return(
        <div className='Summary'>
           <Link to="/summary-Month"> 
                <button>
                    <img src={summaryLogo}></img>
                    <strong>Summary</strong>
                </button>
            </Link>
        </div>
    )
}

export default Summary;