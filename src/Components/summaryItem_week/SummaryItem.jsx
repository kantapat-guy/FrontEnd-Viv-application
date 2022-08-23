import React from 'react';
import './SummaryItem.css'


const SummaryItemWeek =() => {
    return (
            <div className="summary-card">
                <div className="container-card">

                    {/*         card 1        */}
                    <div className="card">
                        <div className="card-content">
                                <h3>Mon</h3>
                                <p>Running</p>
                                <p>Weight lifting</p>
                        </div>
                    </div>

                    {/*         card2             */}
                    <div className="card">
                        <div className="card-content">
                                <h3>Tue</h3>
                                <p>Running</p>
                                <p>Weight lifting</p>
                        </div>
                    </div>

                     {/*         card 3           */}
                   
                    <div className="card">
                        <div className="card-content">
                                <h3>Wed</h3>
                                <p>Running</p>
                                <p>Weight lifting</p>
                        </div>
                    </div>

                    {/*         card 4            */}

                    <div className="card">
                        <div className="card-content">
                                <h3>Thu</h3>
                                <p>Running</p>
                                <p>Weight lifting</p>
                        </div>
                    </div>

                    {/*         card 5            */}

                    <div className="card">
                        <div className="card-content">
                                <h3>Fri</h3>
                                <p>Running</p>
                                <p>Weight lifting</p>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default SummaryItemWeek;