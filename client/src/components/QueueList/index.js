
const QueueList = ({queue,handleComplete})=>{
    const sortedQueue = [...queue].sort((a,b)=>{
        return (a.ordinal-b.ordinal)
    })
    if (!queue){
        return(<div>Day did not populate</div>)
    }
    
    return(
        <div>
            {sortedQueue.map((q,i)=>{
                return(<div className={q.isComplete?"done":""}><span>
                    {q.queueItem.name}
                    </span>
                    <button onClick={handleComplete} data-name={q.queueItem.name} data-date={q.date}>x</button>
                    </div>)
            })}
        </div>
    )
}

export default QueueList