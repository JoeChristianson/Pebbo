import { useEffect, useState } from "react"
import { Modal } from "../Modal"
import {formatToday, formatYesterday} from "../../utils/date"
import Notes from "../Notes"
import "./index.css"
import { useMutation } from "@apollo/client"
import { ADD_NOTE_TO_QUEUE_ITEM,DELETE_QUEUE_ITEM } from "../../utils/mutations"
import { ancestrySearch } from "../../utils/DOM.ts"
import { findAncestor } from "../../utils/DOM.ts"

const QueueList = ({highlight,reorderQueue,queue,handleComplete,userId,yesterday,setQueue})=>{
    const [addNote,{}] = useMutation(ADD_NOTE_TO_QUEUE_ITEM)
    const [deleteQueueItem,{}] = useMutation(DELETE_QUEUE_ITEM)
    const [clicking,setClicking] = useState(false)
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
        try{

            console.log("opening",e);
            setModalInput(e.target.dataset)
            setModalOpen(true)
        }catch(err){
            console.log(err);
        }
        // setHideHeader(true)
    }

    // useEffect(()=>{
    //     setHideHeader(openModal)
    // },[openModal])

    const handleDelete = async (e)=>{
        try{

            const {id} = e.target.dataset;
            if(highlight){
                return
            }
            setModalOpen(false)
            const variables = {userId,queueItemId:id,date}
            console.log(id,queue);
            
            const newQueue = [...queue].filter(q=>q.queueItem._id!==id)
            console.log(newQueue);
            setQueue(newQueue)
            deleteQueueItem({variables})
        }catch(err){
            console.log(err)
        }



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
        try{

            const oldOrdinal = parseInt(draggedOrdinal);
            const newOrdinal = parseInt(e.target.dataset.ordinal);
            const variables = {userId,oldOrdinal,newOrdinal}
            reorderQueue(variables)
        }catch(err){
            console.log(err);
        }
        document.body.classList.remove("lock-screen")
    }

    const startTouchDrag = (e)=>{
        console.log(e.target);
        if(e.target.localName==="button"||e.target.localName==="span"){
            console.log("not moving!");
            return
        }
        const initialTarget = e.target;
        const target = findAncestor(initialTarget,"draggable",true);
        document.body.classList.add("lock-screen")
        console.log("target",target);
        target.classList.add("touch-drag")
        setClicking(true)
        setTimeout(()=>{
            setDraggedOrdinal(target.dataset.ordinal)
            setTouchedElement(target)
            setClicking(false)},300)
    }

    const handleTouchEnd = async (e)=>{
        if(clicking){
            document.body.classList.remove("lock-screen")
            setTouchedElement(null)
            return
        }
        if(e.target.localName==="button"||e.target.localName==="span"){
            console.log("not moving!");
            return
        }
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
        try{

            reorderQueue(variables)
            e.target.classList.remove("touch-drag")
        }catch(err){
            console.log(err);
        }
        document.body.classList.remove("lock-screen")
        setTouchedElement(null)
    }

    const handleTouchMove = (e)=>{
        const {clientX,clientY} = e.nativeEvent.changedTouches[0];
        touchedElement.style.top = `${clientY-20}px`
    }

    const handleNote = (item,text)=>{
        const id = item.queueItem._id;
        setElementProperty(queue,setQueue,item,"queueItem.name",item.queueItem.name,"note",text)
    }

    // cannot set depth yet, have to work that out!
    function setElementProperty(state,setState,item,matchProperties,matchValue,setProperties,setValue){
        const newState = [...state];
        const matchPropertiesArray = matchProperties.split(".")
        const newItem = newState.find(item=>{
            console.log(item);
            let prop = item
            for(let i=0;i<matchPropertiesArray.length;i++){
                prop = prop[matchPropertiesArray[i]]
            }
            console.log("this is the prop",prop);
            return prop===matchValue
        })
        const setPropertiesArray = setProperties.split(".")
        let obj = newItem;
        for(let i = 0;i<setPropertiesArray.length-1;i++){
            obj = newItem[setPropertiesArray[i]]
        }
        obj[setPropertiesArray[setPropertiesArray.length-1]] = setValue;
        setState(newState)
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
                    <span onClick={handleOpenModal} data-ordinal={q.ordinal}       data-id={q.queueItem._id} className="pointer" data-name={q.queueItem.name} >
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
            mutation={highlight?()=>{}:addNote}

            item={addItemId(sortedQueue.find(q=>q.queueItem._id===modalInput.id))}
            refetch={()=>{}}
            callback={handleNote}
            ></Notes>
            </Modal>:null}
            </div>
    )
    
}

export default QueueList

function addItemId(item){
    console.log(item);
    item = {...item}
    item.id=item.queueItem._id
    return item
}