import { useState } from "react"



export const EditField = ({text,mutation})=>{
    console.log(text)
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

            <>
        <textarea onChange={handleChange} value={textareaValue}></textarea>  
        <button onClick={handleSave}>Save</button>
        </>    
            )
        }

    return(
        <>
        <div>{text}</div>    
        <button onClick={()=>setIsEditing(true)}>Edit</button>
        </>
    )
}