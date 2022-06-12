import { useState } from "react"
import { Modal } from "../Modal"
import {useMutation} from "@apollo/client"
import { REORDER_QUEUE } from "../../utils/mutations"

const QueueList = ({queue,handleComplete,userId,refetch})=>{
    
    const [reorderQueue,{data,error,loading}] = useMutation(REORDER_QUEUE)
    
    const sortedQueue = [...queue].sort((a,b)=>{
        return (a.ordinal-b.ordinal)
    })
    const [openModal,setModalOpen] = useState(false)
    const [modalInput,setModalInput] = useState({})
    const [draggedOrdinal,setDraggedOrdinal] = useState(null)
    const handleOpenModal = (e)=>{
        setModalInput(e.target.dataset)
        setModalOpen(true)
    }



    const handleDragEnter = (e)=>{
        e.preventDefault()

    }

    const handleDragOver = (e)=>{
        e.preventDefault()

    }

    const handleDragLeave = (e)=>{
        e.preventDefault()

    }



    const handleDrop = async (e)=>{
        e.preventDefault()
        const oldOrdinal = parseInt(draggedOrdinal);
        const newOrdinal = parseInt(e.target.dataset.ordinal);
        const variables = {userId,oldOrdinal,newOrdinal}
        console.log(variables)
        await reorderQueue({variables})
        refetch()
    }

    if (!queue){
        return(<div>Day did not populate</div>)
    }

    return(
        <div className="list">
            {sortedQueue.map((q,i)=>{
                return(<div draggable 
                onDragOver={handleDragOver}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragStart={(e)=>setDraggedOrdinal(e.target.dataset.ordinal)}
                data-ordinal={q.ordinal} onDrop={handleDrop} className={q.isComplete?"done list-item":"list-item"}><span data-ordinal={q.ordinal} className="pointer" data-name={q.queueItem.name} onClick={handleOpenModal} >
                    {q.queueItem.name}
                    </span>
                    <button className="pointer" onClick={handleComplete} data-name={q.queueItem.name} data-date={q.date}>x</button>
                    </div>)
            })}
            {openModal?<Modal modalInput={modalInput} setModalOpen={setModalOpen}/>:null}
        </div>
    )
}

export default QueueList