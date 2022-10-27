import { useEffect, useState } from "react"
import { Modal } from "../Modal"
import {formatToday, formatYesterday} from "../../utils/date"
import Notes from "../Notes"
import "./index.css"

const QueueList = ({highlight,reorderQueue,queue,handleComplete,userId,yesterday,setHideHeader})=>{
    console.log(highlight);
    queue = queue || []
    let date
    yesterday?date=formatYesterday():date=formatToday()

    const sortedQueue = [...queue].sort((a,b)=>{
        return (a.ordinal-b.ordinal)
    })
    const [openModal,setModalOpen] = useState(false)
    const [modalInput,setModalInput] = useState({})
    const [draggedOrdinal,setDraggedOrdinal] = useState(null)
    const [touchedElement,setTouchedElement] = useState(null)
    const handleOpenModal = (e)=>{
        setModalInput(e.target.dataset)
        setModalOpen(true)
        setHideHeader(true)
    }

    useEffect(()=>{
        setHideHeader(openModal)
    },[openModal])

    const handleDelete = async (e)=>{
        const {id} = e.target.dataset;

    }

    
    const handleSettings = async(e)=>{

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
        reorderQueue(variables)
    }

    const startTouchDrag = (e)=>{
        document.body.classList.add("lock-screen")
        e.target.classList.add("touch-drag")
        setDraggedOrdinal(e.target.dataset.ordinal)
        setTouchedElement(e.target)
    }

    const handleTouchEnd = async (e)=>{
        const y = e.changedTouches[0].clientY
        const items = Array.from(document.querySelectorAll(".list-item")).map(el=>{

           return {ordinal:el.dataset.ordinal,y:el.offsetTop+el.offsetHeight/2}
        })
        .filter(el=>el.ordinal!==draggedOrdinal)
        let closest = null;
        let distance = 9000;
        for (let el of items){
            if(Math.abs(el.y-y)<distance){
                closest = el
                distance = Math.abs(el.y-y)
            }
        }
        const oldOrdinal = parseInt(draggedOrdinal);
        const newOrdinal = parseInt(closest.ordinal);
        const variables = {oldOrdinal,newOrdinal}
        reorderQueue(variables)
        e.target.classList.remove("touch-drag")
        document.body.classList.remove("lock-screen")
        setTouchedElement(null)
    }

    const handleTouchMove = (e)=>{
        const {clientX,clientY} = e.nativeEvent.changedTouches[0];
        touchedElement.style.top = `${clientY-20}px`
    }



    if (!queue){
        return(<div>Day did not populate</div>)
    }


    return(
        <div className="flex">
        <div className="list">
            {sortedQueue.map((q,i)=>{
                return(<div draggable 
                    key={i}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onDragStart={(e)=>setDraggedOrdinal(e.target.dataset.ordinal)}
                    onTouchStart={startTouchDrag}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    data-id={q.queueItem._id}
                data-ordinal={q.ordinal} onDrop={handleDrop} className={`${q.isComplete?"done list-item":"list-item"} ${highlight==="drag"&&"highlight"}`}>
                    <span data-ordinal={q.ordinal}       data-id={q.queueItem._id} className="pointer" data-name={q.queueItem.name} onClick={()=>{}} >
                    {q.queueItem.name}
                    
                    </span>
                    <div className="button-and-percentage-cont">
                    <button className={`pointer ${highlight==="check"&&"highlight"}`} onClick={handleComplete} data-name={q.queueItem.name} data-date={q.date}></button>
                    <span className={`percentage ${highlight==="rate"&&"highlight"}`} >{Math.round(q.successes*100/q.attempts)}%</span>
                    </div>
                    </div>)
            })}
        </div>
            {openModal?<Modal userId={userId} handleSettings={handleSettings}  handleDelete={handleDelete} dataId={modalInput.id} modalInput={modalInput} setModalOpen={setModalOpen}>
            <Notes
            userId={userId}
            mutation={()=>{}}
            item={addItemId(sortedQueue.find(q=>q.queueItem._id===modalInput.id))}
            refetch={()=>{}}
            ></Notes>
            </Modal>:null}
            </div>
    )
    
}

export default QueueList

function addItemId(item){
    item = {...item}
    item.id=item.queueItem._id
    return item
}