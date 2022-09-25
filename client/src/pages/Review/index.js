import QueueList from "../../components/QueueList"
import { useMutation, useQuery } from "@apollo/client"
import { QUERY_REVIEW } from "../../utils/queries"
import { formatToday, formatYesterday } from "../../utils/date"

import HabitDay from "../../components/HabitDay"
import { QueueDay } from "../../components/QueueDay"
import { CONFIRM_DAY, COMPLETE_QUEUE_ITEM, TOGGLE_IS_COMPLETE } from "../../utils/mutations"
import LoadingScreen from "../../components/LoadingScreen/index.tsx"


const Review = ({userId,setReviewed,refresh})=>{
    const date = formatYesterday()
    const {data,loading,refetch:refetchDay} = useQuery(QUERY_REVIEW,{variables:{
        userId,date
    }})
    const [toggleHabitComplete,{data:togHabData,loading:togHabLoading,error:togHabError}]=useMutation(TOGGLE_IS_COMPLETE)
    const [toggleQueueComplete,{data:qData,loading:qLoading,error:qError}] = useMutation(COMPLETE_QUEUE_ITEM)
    const [confirmDay,{data:cData,loading:cLoading,error:cError}]= useMutation(CONFIRM_DAY)

    if(loading){
        return <LoadingScreen/>
    }

    if(!data?.getReview?.habitDays){
        setReviewed(true)
        return
    }

    const handleComplete= async (e)=>{
        await toggleHabitComplete({variables:{userId,date,habitDayId:e.target.dataset.habitDayId}})
        await refetchDay()
    }

    const handleQueueComplete= async (e)=>{
        await toggleQueueComplete({variables:{userId,date,name:e.target.name}})
        await refetchDay()
    }
    
    const queueDays = data?.getReview?.queueDays ||[]

    const habitDays = data?.getReview?.habitDays ||[]


    const handleConfirm = async ()=>{
       const data = await confirmDay({variables:{userId,date:formatToday()}})
       refresh()
    }

    return(
        <div className="main-cont">
            <h3>Review Yesterday</h3>
            <div className="side-by-side">

            <section className="list-cont">
            <h4>Habits</h4>
            <div className="list">

            {habitDays.map((h,i)=>{
                return(
                    <HabitDay key={i} handleComplete={handleComplete} habitDay={h}></HabitDay>
                    )
                })}
                </div>
            </section>
            <section>
                <h4>Queue</h4>
                <div className="list">
                {queueDays.map((q,i)=>{
                    return(
                        <QueueDay key={i} handleComplete={handleQueueComplete} queueDay={q}></QueueDay>
                    )
                })}
                </div>
            </section>
                </div>
                <button onClick={handleConfirm}>Confirm</button>
        </div>
    )
}

export default Review

