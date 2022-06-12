import "./dash.css"


const Dash = ()=>{

const handleQueueItemOpen = ()=>{
    console.log("open queue")
}

const handleToDoItemOpen = ()=>{
    console.log("open to Do")
}

const handleHabitOpen = ()=>{
    console.log("open habit")
}


    return(
        <div className="dashboard-cont">
        <section className="dash-section">
            <div onClick={handleQueueItemOpen}>Queue Item</div>
        </section>
        <section className="dash-section">
        <div onClick={handleToDoItemOpen}>To Do Item</div>
        </section>
        <section className="dash-section">
        <div onClick={handleHabitOpen}>Habit</div>
        </section>
        
        </div>
    )
}

export default Dash