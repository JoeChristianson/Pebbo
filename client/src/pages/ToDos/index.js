import {useQuery,useMutation} from "@apollo/client"
import { GET_TO_DOS } from "../../utils/queries"
import SimpleInput from "../../components/simpleInput"
import {useState} from "react"
import {ADD_TO_DO,COMPLETE_TO_DO} from "../../utils/mutations"
import {formatToday} from "../../utils/date"

function ToDos({userId}){
 
    const [newToDo,setNewToDo] = useState("") 
    const {loading,data,refetch} = useQuery(GET_TO_DOS,{variables:{
        userId
    }})
    const [addToDo,{data:newData,loading:newLoading,error}]=useMutation(ADD_TO_DO)    
    const [completeToDo,{data:completedData,loading:completedLoading,error:completedError}] = useMutation(COMPLETE_TO_DO)


    const handleComplete = async (e)=>{   
        const {id:toDoId} = e.target.dataset
        await completeToDo({variables:{
            userId,toDoId,date:formatToday()
        }})
        refetch()
    }
    
    const handleChange = (e)=>{
        setNewToDo(e.target.value)
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        await addToDo({variables:{
            creator:userId,name:newToDo,date:formatToday()
        }})
        setNewToDo("")
        refetch()
    }

    if(loading){
        return(<h1>Loading</h1>)
    }
    
    return(
        <>
        <section>
            ToDos
        </section>
        <SimpleInput text={newToDo} handleChange={handleChange} handleSubmit={handleSubmit}/>
        {data.getToDos.map(t=>{
            return (<div>
                <span>{t.toDoForm.name}</span><button data-id={t._id} onClick={handleComplete}>X</button>
            </div>)
        })}
        </>
    )
}

export default ToDos