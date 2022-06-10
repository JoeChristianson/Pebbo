
const QueueList = ({queue})=>{
    console.log(queue)
    const sortedQueue = [...queue].sort((a,b)=>{
        return (a.ordinal-b.ordinal)
    })
    console.log(sortedQueue)
    
    return(
        <div>
            {sortedQueue.map((q,i)=>{
                return(<div>{q.queueItem.name}</div>)
            })}
        </div>
    )
}

export default QueueList