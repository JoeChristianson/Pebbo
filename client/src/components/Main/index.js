import { POPULATE_DAY } from "../../utils/mutations"
import "./Main.css"
import { useEffect,useState } from "react"
import Dash  from "../../pages/Dash"
import Review from "../../pages/Review"
import { ManageAssessments } from "../../pages/ManageAssessments"
const {useQuery,useMutation} = require("@apollo/client")
const auth = require("../../utils/auth").default
const {formatToday,formatYesterday} = require("../../utils/date")

const {FEED_ASSESSMENT, GET_DATES, GET_DASH,QUERY_DAY} = require("../../utils/queries")


const Habits = require("../../pages/Habits").default
const Queue = require("../../pages/Queue").default
const ToDos = require("../../pages/ToDos").default
const Assessment = require("../../pages/Assessment").default
const Variables = require("../../pages/Variables/index.tsx").default



const Main =  ({currentSection})=>{
    
    const userId = auth.getProfile().data._id
    const variables = {userId,date:formatToday()}
    const [isPopulated,setIsPopulated] = useState(false)
    const {data:datesData,loading:datesLoading} = useQuery(GET_DATES,{variables:{userId}})
    const {loading:assessmentLoading,data:pendingAssessmentData,refetch:refetchAssessment} = useQuery(FEED_ASSESSMENT,
        {variables})
        
        const [populateDay,{data:popData,loading:popLoading,error:errPop}]=useMutation(POPULATE_DAY)
        const [populatedAttempt,setPopulatedAttempt] = useState(false)
        const {data:dashData,loading:dashLoading,error:dashError,refetch:refetchDash} = useQuery(GET_DASH,{variables:{userId,date:formatToday()}})
        const {loading:dayLoading,error,data:dayData,refetch:refetchDay} = useQuery(QUERY_DAY,
            {variables:{userId,date:formatToday()}
        })    
    const handleDoublePop = async ()=>{
        console.log("handling double pop")
        if(localStorage.getItem("lastUpdatedHabd")==variables.date){
            return
        }
        localStorage.setItem("lastUpdatedHabd",variables.date)
        if (popLoading){
            return
        }
        console.log("must pop")
        setPopulatedAttempt(true)
        const results = await populateDay({variables})
        console.log(results)
        setIsPopulated(true)
        refetchDay()
    }

    if (!isPopulated&&!populatedAttempt){
        handleDoublePop()
    }

    if(assessmentLoading||popLoading||datesLoading){
        return(<h1>Loading</h1>)
    }
    if(pendingAssessmentData?.feedAssessment?._id){
        return(<Assessment refetchAssessment={refetchAssessment} date={formatToday()} userId={userId} assessment={pendingAssessmentData.feedAssessment}></Assessment>)
    }

    if(formatToday()!==datesData.getDates?.lastReviewed && datesData.getDates?.days){
        return(
            <Review userId={userId}/>
        )
    }



    if (currentSection==="dash"){
        return(<Dash data={dashData} loading={dashLoading} error={dashError} refetch={refetchDash} userId={userId} date={formatToday()} refetchDay={refetchDay}/>)
    }
    
    if (currentSection==="queue"){
        return(<Queue userId={userId} date={formatToday()}></Queue>)
    }
    if (currentSection==="toDos"){
        return(<ToDos userId={userId}></ToDos>)
    }
    if (currentSection==="assessments"){
        return(<ManageAssessments userId={userId}></ManageAssessments>)
    }
    if (currentSection==="variables"){
        return(<Variables userId={userId}></Variables>)
    }
    else{
        return(<Habits dayLoading={dayLoading} dayData={dayData} refetchDay={refetchDay} refetchDash={refetchDash}></Habits>)
    }

}

export default Main