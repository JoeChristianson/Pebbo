import { useMutation, useQuery } from "@apollo/client"
import { QUERY_REVIEW } from "../../utils/queries"
import { formatToday, formatYesterday } from "../../utils/date"
import { useState } from "react"
import HabitDay from "../../components/HabitDay"
import { QueueDay } from "../../components/QueueDay"
import { CONFIRM_DAY, COMPLETE_QUEUE_ITEM, TOGGLE_IS_COMPLETE } from "../../utils/mutations"
import LoadingScreen from "../../components/LoadingScreen/index.tsx"
import initialHabitDemoState from "./demoHabitDays"
import initialQueueDemoState from "./demoQueueDays"
import "./index.css"

const Review = ({userId,setReviewed,refresh,highlight})=>{

    const [successScreen,setSuccessScreen] = useState(false)

    const date = formatYesterday()
    const {data,loading,refetch:refetchDay} = useQuery(QUERY_REVIEW,{variables:{
        userId,date
    }})
    const [toggleHabitComplete,{data:togHabData,loading:togHabLoading,error:togHabError}]=useMutation(TOGGLE_IS_COMPLETE)
    const [toggleQueueComplete,{data:qData,loading:qLoading,error:qError}] = useMutation(COMPLETE_QUEUE_ITEM)
    const [confirmDay,{data:cData,loading:cLoading,error:cError}]= useMutation(CONFIRM_DAY)
    const [demoHabitDays,setDemoHabitDays] = useState(initialHabitDemoState)
    const [demoQueueDays,setDemoQueueDays] = useState(initialQueueDemoState)
    console.log(demoQueueDays);
    if(loading){
        return <LoadingScreen/>
    }

    const handleComplete= async (e)=>{
        await toggleHabitComplete({variables:{userId,date,habitDayId:e.target.dataset.habitDayId}})
        await refetchDay()
    }

    const handleQueueComplete= async (e)=>{
        let name = e.target?.name;
        let parentNode = e.target.parentNode
        while(!name){
            name = parentNode?.name
            parentNode = parentNode.parentNode
        }
        console.log(name);
        const variables = {userId,date,name};
        console.log(variables);
        await toggleQueueComplete({variables})
        await refetchDay()
    }
    
    let queueDays = data?.getReview?.queueDays ||[]
    let habitDays = data?.getReview?.habitDays ||[]

    const handleConfirm = async ()=>{
        if(highlight!==null){
            setSuccessScreen(true)
            return
        }

       const data = await confirmDay({variables:{userId,date:formatToday()}})
       refresh()
    }

    if(successScreen){
        return(
            <h1>Good job!</h1>
        )
    }



    const demoHandleHabitComplete = (e)=>{
        const {habitDayId} = e.target.dataset
        const newDemoHabitDays = [...demoHabitDays]
        newDemoHabitDays.forEach(hd=>{
            console.log(hd,habitDayId);
            if(hd.habit._id==habitDayId){
                console.log("we have a match!");
                hd.isComplete = !hd.isComplete
            }
        })
        setDemoHabitDays(newDemoHabitDays)
    }

    const demoHandleQueueComplete = (e)=>{
        let name = e.target?.name;
        let parentNode = e.target.parentNode
        while(!name){
            name = parentNode?.name
            parentNode = parentNode.parentNode
        }
        const newDemoQueueDays = [...demoQueueDays]
        newDemoQueueDays.forEach(qd=>{
            if(qd.queueItem.name==name){
                console.log("we have a match!");
                qd.isComplete = !qd.isComplete
            }
        })
        setDemoQueueDays(newDemoQueueDays)
    }

    if(highlight!==null){
        return(
            <div className="main-cont review-cont">
                <h3>Review Yesterday</h3>
                <div className="side-by-side">
    
                <section className="list-cont">
                <h4>Habits</h4>
                <div className={`list review-list`}>
    
                {demoHabitDays.map((h,i)=>{
                    return(
                        <HabitDay key={i} highlight={highlight} handleComplete={demoHandleHabitComplete} habitDay={h}></HabitDay>
                        )
                    })}
                    </div>
                </section>
                <section>
                    <h4>Queue</h4>
                    <div className="list review-list">
                    {demoQueueDays.map((q,i)=>{
                        return(
                            <QueueDay highlight={highlight} key={i} handleComplete={demoHandleQueueComplete} queueDay={q}></QueueDay>
                            )
                        })}
                    </div>
                </section>
                    </div>
                    <button className={`confirm-button ${highlight==="confirm"&&"highlight"}`} onClick={handleConfirm}>Confirm</button>
    
            </div>
        )
    }
    
    
    
    return(
        <div className="main-cont">
            <h3>Review Yesterday</h3>
            <div className="side-by-side">
            <section className="list-cont">
            <h4>Habits</h4>
            <div className="list review-list">

            {demoHabitDays.map((h,i)=>{
                return(
                    <HabitDay key={i} handleComplete={handleComplete} habitDay={h}></HabitDay>
                    )
                })}
                </div>
            </section>
            <section>
                <h4>Queue</h4>
                <div className="list review-list">
                {queueDays.map((q,i)=>{
                    return(
                        <QueueDay key={i} handleComplete={handleQueueComplete} queueDay={q}></QueueDay>
                    )
                })}
                </div>
            </section>
                <button className="confirm-btn" onClick={handleConfirm}>Don't</button>
                </div>

        </div>
    )
}

export default Review

