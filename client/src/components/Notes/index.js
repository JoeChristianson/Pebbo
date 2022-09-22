import { EditField } from "../../components/generics/EditField"
import {useState} from "react"
import { useMutation } from "@apollo/client";

const Notes = ({userId,item,refetch,mutation})=>{
    const [note,setNote] = useState(item.note||"")
    const [addNote,{data,error,loading}] = useMutation(mutation)
    const saveHandler = async (text)=>{
        console.log(item);
        const variables = {userId,itemId:item.id,note:text}
        console.log(variables);
        await addNote({variables})
        setNote(text)
        refetch()
    }

    return(<div className="modal-comp-cont">
        <h2>Notes</h2>
        <EditField mutation={saveHandler} text={note}
        buttonClass="no-background-or-border"
        ></EditField>
    </div>)
}

export default Notes

