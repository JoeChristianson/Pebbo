import "./dash.css"
import {QueueDay} from "../../components/QueueDay"
import { ToDo } from "../../components/ToDo"
import { useMutation, useQuery } from "@apollo/client"
import { GET_DASH } from "../../utils/queries"
import { COMPLETE_QUEUE_ITEM, COMPLETE_TO_DO, SKIP_QUEUE_ITEM, TOGGLE_IS_COMPLETE,ADD_TO_DO } from "../../utils/mutations"
import HabitDay from "../../components/HabitDay"
import FormElement from "../../components/generics/Form"
import { useState,useEffect } from "react"
import { formatToday } from "../../utils/date"
import ToDos from "../ToDos"
import LoadingScreen from "../../components/LoadingScreen/index.tsx"
import DashStats from "../../components/DashComponents/DashStats/index.tsx"
import { ancestrySearch } from "../../utils/DOM.ts"
import {Fireworks} from "fireworks/lib/react"
import Saddy from "../../components/Overlays/Saddy/index.tsx"

const Dash = ({userId,date,data,loading,error,refetch,refetchDay})=>{
    useEffect(()=>{
        document.documentElement.style.setProperty("--footer-display","flex");
    },[])
    let fxProps = {
        count: 3,
        interval: 200,
        colors: ['#cc3333', '#4CAF50', '#81C784'],
        calc: (props, i) => ({
          ...props,
          x: (i + 1) * (window.innerWidth / 3) - (i + 1) * 100,
          y: 200 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0)
        })
      }
    
    const [fireworksOn,setFireworksOn] = useState(false)
    const [sadOn,setSadOn] = useState(false)

    const [completeQueueItem,{data:qData,loading:qLoading,error:qError}] = useMutation(COMPLETE_QUEUE_ITEM)
    const [completeHabitDay,{data:hData,loading:hLoading,error:hError}] = useMutation(TOGGLE_IS_COMPLETE)
    const [skipQueueItem,{data:sqData,loading:sqLoading,error:sqError}] = useMutation(SKIP_QUEUE_ITEM)

if(loading){
    return(
        <LoadingScreen/>
    )
}

if(error){

}

const handleQueueComplete = async (e)=>{
    const name = ancestrySearch(e.target,"name")
    const variables = {userId,name,date}
    const resp = await completeQueueItem({variables})
    setFireworksOn(true);
    setTimeout(()=>setFireworksOn(false),1000)
    refetch()
}

const handleQueueSkip = async (e)=>{
    const queueDayId = ancestrySearch(e.target,"dataset.queueDayId")
    console.log(queueDayId)
    const variables = {userId,queueItem:queueDayId,date}
    const resp = await skipQueueItem({variables})
    setSadOn(true)
    setTimeout(()=>setSadOn(false),3000)
    refetch()
}

const handleHabitComplete = async (e)=>{
    await completeHabitDay({variables:{userId,date,habitDayId:e.target.dataset.habitDayId}})
    await refetch()
    await refetchDay()
    setFireworksOn(true);
    setTimeout(()=>setFireworksOn(false),1000)
}


if(!data?.getDash){
    return (<div>Loading</div>)
}

const {queueDays,habitDays,toDos} = data.getDash

    return(
        <div className="dashboard-cont">
            <div>
        <h2>Today's Habits</h2>

        <section className="dash-section">
        {!habitDays.length>0?<h2>No Habit Testing Today</h2>:null}
        {habitDays.map((h,i)=>{
            return <HabitDay key={i} handleComplete={handleHabitComplete} habitDay={h}/>
        })}

        </section>
        </div>
            <div>
            <h2>Daily Queue</h2>

        <section className="dash-section">
           {queueDays[0]?<QueueDay handleQueueSkip={handleQueueSkip} handleComplete={handleQueueComplete} queueDay={queueDays[0]}/>:<h2>All Done!</h2>}
        </section>
            </div>
            <div>
        <h2>Tasks</h2>
        <section className="dash-section">
        <ToDos onDash={true}  userId={userId}></ToDos>
        </section>
            </div>
            
        <div>
        <h2>Quick Stats</h2>
        <section className="dash-section stats-section">
        <DashStats userId={userId}></DashStats>

        </section>
        </div>
        {fireworksOn&&<Fireworks {...fxProps} />}
        {sadOn&&<Saddy/>}
        </div>
    )
}

export default Dash