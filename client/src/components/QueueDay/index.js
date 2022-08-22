export const QueueDay = ({queueDay,handleComplete,handleQueueSkip})=>{
    console.log(queueDay)
    return(
        <div className={queueDay.isComplete?"done list-item":"list-item"}>
            <span>{queueDay.queueItem.name}</span>
            <span>{queueDay.attempts}</span>
            {handleQueueSkip?<button name={queueDay.queueItem.name} data-queue-day-id={queueDay.queueItem._id} onClick={handleQueueSkip}>Skip</button>:null}
            <button name={queueDay.queueItem.name} data-queue-day-id={queueDay.queueItem._id} onClick={handleComplete}></button>
        </div>
    )
}