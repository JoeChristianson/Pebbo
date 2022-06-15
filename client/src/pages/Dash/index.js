import "./dash.css"
import {QueueDay} from "../../components/QueueDay"
import { ToDo } from "../../components/ToDo"
import { useMutation, useQuery } from "@apollo/client"
import { GET_DASH } from "../../utils/queries"
import { COMPLETE_QUEUE_ITEM, COMPLETE_TO_DO, TOGGLE_IS_COMPLETE } from "../../utils/mutations"
import HabitDay from "../../components/HabitDay"

const Dash = ({userId,date})=>{

const [completeQueueItem,{data:qData,loading:qLoading,error:qError}] = useMutation(COMPLETE_QUEUE_ITEM)
const [completeHabitDay,{data:hData,loading:hLoading,error:hError}] = useMutation(TOGGLE_IS_COMPLETE)
const [completeToDo,{data:tData,loading:tLoading,error:tError}] = useMutation(COMPLETE_TO_DO)

const {data,loading,error,refetch} = useQuery(GET_DASH,{variables:{userId,date}})

if(loading){
    return(
        <div>Loading...</div>
    )
}

const handleQueueComplete = async (e)=>{
    
    const {name} = e.target
    const variables = {userId,name,date}
    console.log(variables)
    const resp = await completeQueueItem({variables})
    console.log(resp)
    refetch()
}

const handleToDoComplete = async (e)=>{
    console.log(e)
    const {id:toDoId} = e.target.dataset
    const variables = {
        userId,toDoId,date
    }
    console.log(variables)
    await completeToDo({variables})
    refetch()
}

const handleHabitComplete = async (e)=>{
    await completeHabitDay({variables:{userId,date,habitDayId:e.target.dataset.habitDayId}})
    await refetch()
}

const {queueDays,habitDays,toDos} = data.getDash


    return(
        <div className="dashboard-cont">
        <section className="dash-section">
            <QueueDay handleComplete={handleQueueComplete} queueDay={queueDays[0]}/>
        </section>
        <section className="dash-section">
        <ToDo toDo={toDos[0]} handleComplete={handleToDoComplete} />
        </section>
        <section className="dash-section">
        {habitDays.map((h,i)=>{
            return <HabitDay key={i} handleComplete={handleHabitComplete} habitDay={h}/>
        })}

        </section>
        
        </div>
    )
}

export default Dash