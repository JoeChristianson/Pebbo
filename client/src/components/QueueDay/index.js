import "./index.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faForward,faSquareCheck} from "@fortawesome/free-solid-svg-icons"

export const QueueDay = ({queueDay,handleComplete,handleQueueSkip})=>{

    return(
        <div className={queueDay.isComplete?"done list-item":"list-item"}>
            <span>{queueDay.queueItem.name}</span>
            <span>{queueDay.attempts}</span>
            <div className="queue-item-buttons-cont">
            <button name={queueDay.queueItem.name} data-queue-day-id={queueDay.queueItem._id} onClick={handleComplete}>
            <FontAwesomeIcon className="large-icon" icon={faSquareCheck}/>

            </button>
            {handleQueueSkip?<button name={queueDay.queueItem.name} data-queue-day-id={queueDay.queueItem._id} onClick={handleQueueSkip}>
            <FontAwesomeIcon className="large-icon" icon={faForward}/>


            </button>:null}
            </div>
        
        </div>
    )
}