import { EditField } from "../../components/generics/EditField"
import {useState} from "react"
import { useMutation } from "@apollo/client";
import { ADD_NOTE_TO_QUEUE_ITEM } from "../../utils/mutations";

const Notes = ({userId,item,refetch,callback})=>{
    const [note,setNote] = useState(item.note||"")
    const [addNote,{data,error,loading}] = useMutation(ADD_NOTE_TO_QUEUE_ITEM)
    try{
        const saveHandler = async (text)=>{
            const variables = {userId,itemId:item.id,note:text}
            await addNote({variables})
            setNote(text)
            refetch()
            callback(item,text)
        }
        
        return(<div className="modal-comp-cont">
        <h4>Notes</h4>
        <EditField mutation={saveHandler} text={note}
        buttonClass="no-background-or-border"
        ></EditField>
    </div>)
}catch(err){
    console.log(err);
    return <></>
}
}

export default Notes

