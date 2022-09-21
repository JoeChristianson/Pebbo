import { useState } from "react"
import "../../../styles/buttons.css"
import "../../../styles/icons.css"
import "./index.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEdit,faSave} from "@fortawesome/free-solid-svg-icons"

export const EditField = ({text,mutation,buttonClass=""})=>{
    console.log(buttonClass)
    const [textareaValue,setTextareaValue] = useState(text)
    const [isEditing,setIsEditing] = useState(false)
    
    const handleChange=(e)=>{
        setTextareaValue(e.target.value)
    }

    const handleSave=()=>{
        setIsEditing(false)
        mutation(textareaValue)
    }

    if(isEditing){
        return(

            <div className="textarea-cont">
        <textarea onChange={handleChange} value={textareaValue}></textarea>  
        <button className={buttonClass} onClick={handleSave}>
        <FontAwesomeIcon className="large-icon" icon={faSave}/>
        </button>
        </div>    
            )
        }

    return(
        <div className="flex">
        <div>{text}</div>    
        <button className={buttonClass} onClick={()=>setIsEditing(true)}>
            <FontAwesomeIcon className="large-icon" icon={faEdit}/>

        </button>
        </div>
    )
}