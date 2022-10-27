import "./dash.css"

const Dash = ({highlight})=>{

    return(
        <div className="dashboard-cont">
            <div>
                <h2>Today's Habits</h2>
                <section className={`dash-section ${(highlight==="dash"||highlight==="habits")&&"highlight"}`}>
                    <div  className={`${false?"done list-item":"list-item"} ${highlight==="habits-list"?"highlight":""} ${highlight==="meditate"}`}>
                        <span>No Screens after 9pm</span>
                        <button></button>
                    </div>
                    <div  className={`${true?"done list-item":"list-item"} ${highlight==="habits-list"?"highlight":""} ${highlight==="meditate"}`}>
                        <span>Meditate</span>
                        <button></button>
                    </div>
                </section>         
            </div>
            <div>
                <h2>Queue</h2>
                <section className={`dash-section ${(highlight==="dash"||highlight==="queue")&&"highlight"}`}>
                    <div  className={`${false?"done list-item":"list-item"} ${highlight==="habits-list"?"highlight":""} ${highlight==="meditate"}`}>
                        <span>Make Coffee</span>
                        <button></button>
                    </div>
                </section>         
            </div>
            <div>
                <h2>To Dos</h2>
                <section className={`dash-section ${(highlight==="dash"||highlight==="to-dos")&&"highlight"}`}>
                <div  className={`${false?"done list-item":"list-item"} ${highlight==="habits-list"?"highlight":""} ${highlight==="meditate"}`}>
                        <span>Call Gary</span>
                        <button></button>
                    </div>
                    <div  className={`${false?"done list-item":"list-item"} ${highlight==="habits-list"?"highlight":""} ${highlight==="meditate"}`}>
                        <span>Grocery Shopping</span>
                        <button></button>
                    </div>
                    <div  className={`${false?"done list-item":"list-item"} ${highlight==="habits-list"?"highlight":""} ${highlight==="meditate"}`}>
                        <span>Pay Bills</span>
                        <button></button>
                    </div>
                    <div  className={`${false?"done list-item":"list-item"} ${highlight==="habits-list"?"highlight":""} ${highlight==="meditate"}`}>
                        <span>Book Tickets</span>
                        <button></button>
                    </div>
                </section>         
            </div>
            <div>
                <h2>Quick Stats</h2>
                <section className={`dash-section ${(highlight==="dash"||highlight==="stats")&&"highlight"}`}>
                    <h2>Streaks</h2>
                        <div>Stuck to Diet - 3 days</div>
                    <h2>Averages</h2>
                        <div>Sleep Well - 3.4/4</div>
                        <div>Steps - 7284</div>
                </section>         
            </div>
        </div>
    )
}

export default Dash