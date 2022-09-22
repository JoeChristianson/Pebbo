import "./dash.css"
import {QueueDay} from "../../components/QueueDay"
import { ToDo } from "../../components/ToDo"
import { useMutation, useQuery } from "@apollo/client"
import { GET_DASH } from "../../utils/queries"
import { COMPLETE_QUEUE_ITEM, COMPLETE_TO_DO, SKIP_QUEUE_ITEM, TOGGLE_IS_COMPLETE,ADD_TO_DO } from "../../utils/mutations"
import HabitDay from "../../components/HabitDay"
import FormElement from "../../components/generics/Form"
import { useState } from "react"
import { formatToday } from "../../utils/date"
import ToDos from "../ToDos"

const Dash = ({userId,date,data,loading,error,refetch,refetchDay})=>{
    
    const [completeQueueItem,{data:qData,loading:qLoading,error:qError}] = useMutation(COMPLETE_QUEUE_ITEM)
    const [completeHabitDay,{data:hData,loading:hLoading,error:hError}] = useMutation(TOGGLE_IS_COMPLETE)
    const [addToDo,{data:newData,loading:newLoading,error:newError}]=useMutation(ADD_TO_DO)    
    const [completeToDo,{data:tData,loading:tLoading,error:tError}] = useMutation(COMPLETE_TO_DO)
    const [skipQueueItem,{data:sqData,loading:sqLoading,error:sqError}] = useMutation(SKIP_QUEUE_ITEM)
    const [inputValues,setInputValues] = useState({newHabit:""})

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

const handleNewHabitFormInputChange = (e)=>{
    setInputValues({newHabit:e.target.value})
}

const handleNewHabitFormSubmit = async (e)=>{
    e.preventDefault()
    const newToDo = inputValues.newHabit
    await addToDo({variables:{
        creator:userId,name:newToDo,date:formatToday()
    }})
    refetch()
    setInputValues({newHabit:""})
    e.target.elements.newHabit.value = ""
}

const {queueDays,habitDays,toDos} = data.getDash



    return(
        <div className="dashboard-cont">
        <section className="dash-section">
           {queueDays[0]?<QueueDay handleQueueSkip={handleQueueSkip} handleComplete={handleQueueComplete} queueDay={queueDays[0]}/>:null}
        </section>
        {/* <section className="dash-section">
            <FormElement
            formInputs={[{label:"New Habit",name:"newHabit"}]}
            formInputValues={inputValues}
            handleFormInputChange={handleNewHabitFormInputChange}
            handleFormSubmit={handleNewHabitFormSubmit}
            submitButtonText="Add"
            formClass="inline-form"
            ></FormElement>
            {toDos[0]?(        <ToDo toDo={toDos[0]} handleComplete={handleToDoComplete} />):null}
        </section> */}
        <ToDos onDash={true}  userId={userId}></ToDos>
        <section className="dash-section">
        {habitDays.map((h,i)=>{
            return <HabitDay key={i} handleComplete={handleHabitComplete} habitDay={h}/>
        })}

        </section>
        
        </div>
    )
}

export default Dash