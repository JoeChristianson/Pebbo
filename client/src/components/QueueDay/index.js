import "./index.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faForward,faSquareCheck} from "@fortawesome/free-solid-svg-icons"

export const QueueDay = ({queueDay,handleComplete,handleQueueSkip,highlight})=>{

    const isHighlighted = (highlight==="queue"||(highlight==="oatmeal"&&queueDay.queueItem.name==="Make Oatmeal")||(highlight==="toggle-back"&&queueDay.isComplete))

    return(
        <div className={`${queueDay.isComplete?"done list-item":"list-item"} ${isHighlighted&&"highlight"}`}>
            <span>{queueDay.queueItem.name}</span>
            <span>{queueDay.attempts}</span>
            <div className="queue-item-buttons-cont">
            <button name={queueDay.queueItem.name} data-queue-day-id={queueDay.queueItem._id} onClick={handleComplete}>
            <FontAwesomeIcon name={queueDay.queueItem.name} className="large-icon" icon={faSquareCheck}/>

            </button>
            {handleQueueSkip?<button name={queueDay.queueItem.name} data-queue-day-id={queueDay.queueItem._id} onClick={handleQueueSkip}>
            <FontAwesomeIcon className="large-icon" icon={faForward}/>


            </button>:null}
            </div>
        
        </div>
    )
}