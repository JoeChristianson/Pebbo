export const QueueDay = ({queueDay,handleComplete})=>{
    return(
        <div className={queueDay.isComplete?"done list-item":"list-item"}>
            <span>{queueDay.queueItem.name}</span>
            <button name={queueDay.queueItem.name} data-queue-day-id={queueDay.queueItem._id} onClick={handleComplete}>x</button>
        </div>
    )
}