import "./dash.css"
import {QueueDay} from "../../components/QueueDay"
import { ToDo } from "../../components/ToDo"
import { useMutation, useQuery } from "@apollo/client"
import { GET_DASH } from "../../utils/queries"
import { COMPLETE_QUEUE_ITEM, COMPLETE_TO_DO, SKIP_QUEUE_ITEM, TOGGLE_IS_COMPLETE } from "../../utils/mutations"
import HabitDay from "../../components/HabitDay"

const Dash = ({userId,date,data,loading,error,refetch,refetchDay})=>{

const [completeQueueItem,{data:qData,loading:qLoading,error:qError}] = useMutation(COMPLETE_QUEUE_ITEM)
const [completeHabitDay,{data:hData,loading:hLoading,error:hError}] = useMutation(TOGGLE_IS_COMPLETE)
const [completeToDo,{data:tData,loading:tLoading,error:tError}] = useMutation(COMPLETE_TO_DO)
const [skipQueueItem,{data:sqData,loading:sqLoading,error:sqError}] = useMutation(SKIP_QUEUE_ITEM)

if(loading){
    return(
        <div>Loading...</div>
    )
}

if(error){

}

const handleQueueComplete = async (e)=>{
    
    const {name} = e.target
    const variables = {userId,name,date}
    const resp = await completeQueueItem({variables})
    refetch()
}

const handleQueueSkip = async (e)=>{
    const {queueDayId} = e.target.dataset;
    const variables = {userId,queueItem:queueDayId,date}
    const resp = await skipQueueItem({variables})
    console.log(resp)
    // const data = await resp.json()
    // console.log(data);
    refetch()
}

const handleToDoComplete = async (e)=>{
    const {id:toDoId} = e.target.dataset
    const variables = {
        userId,toDoId,date
    }
    await completeToDo({variables})
    refetch()
}

const handleHabitComplete = async (e)=>{
    await completeHabitDay({variables:{userId,date,habitDayId:e.target.dataset.habitDayId}})
    await refetch()
    await refetchDay()
}

const {queueDays,habitDays,toDos} = data.getDash


    return(
        <div className="dashboard-cont">
        <section className="dash-section">
           {queueDays[0]?<QueueDay handleQueueSkip={handleQueueSkip} handleComplete={handleQueueComplete} queueDay={queueDays[0]}/>:null}
        </section>
        <section className="dash-section">
            {toDos[0]?(        <ToDo toDo={toDos[0]} handleComplete={handleToDoComplete} />):null}
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