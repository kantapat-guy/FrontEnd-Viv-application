import './Weeklystat.css';
import statIcon from '../../../assets/stat-icon.png'
import graph from '../../../assets/graph.png';

const Weeklystat = () => {
    return (
        <>
            <div className='stat-container'>
                <div className='text-container'>
                    <img src={statIcon} id="stat-icon" />
                    <h3>Weekly stat</h3>
                </div>
                <div className='data-container'>
                    <div className='graph-container'>
                        <img src={graph} /> 
                        {/* for mock up */}
                    </div>
                    <div className='result-container'>
                        <p>Walking 1 hr/week</p>
                        <p>Swimming 3 hr/week</p>
                        <p>Running 6 hr/week</p>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Weeklystat;