import { POPULATE_DAY } from "../../utils/mutations"
import "./Main.css"
import { useEffect,useState } from "react"
import Dash  from "../../pages/Dash"
import Review from "../../pages/Review"
const {useQuery,useMutation} = require("@apollo/client")
const auth = require("../../utils/auth").default
const {formatToday,formatYesterday} = require("../../utils/date")

const {FEED_ASSESSMENT, GET_DATES} = require("../../utils/queries")


const Habits = require("../../pages/Habits").default
const Queue = require("../../pages/Queue").default
const ToDos = require("../../pages/ToDos").default
const Assessment = require("../../pages/Assessment").default



const Main =  ({currentSection})=>{


    const userId = auth.getProfile().data._id
    const variables = {userId,date:formatToday()}

  const [isPopulated,setIsPopulated] = useState(false)
  const {data:datesData,loading:datesLoading} = useQuery(GET_DATES,{variables:{userId}})
  console.log(datesData)
  const {loading:assessmentLoading,data:pendingAssessmentData} = useQuery(FEED_ASSESSMENT,
    {variables})

    const [populateDay,{data:popData,loading:popLoading,error:errPop}]=useMutation(POPULATE_DAY)

    if (!isPopulated){
        populateDay({variables})
        setIsPopulated(true)
    }

    if(assessmentLoading||popLoading||datesLoading){
        return(<h1>Loading</h1>)
    }
    if(pendingAssessmentData?.feedAssessment?._id){
        return(<Assessment date={formatToday()} userId={userId} assessment={pendingAssessmentData.feedAssessment}></Assessment>)
    }
    
    if(formatYesterday()!==datesLoading.getDates?.lastReviewed){
        return(
            <Review/>
        )
    }

    if (currentSection==="dash"){
        return(<Dash/>)
    }
    
    if (currentSection==="queue"){
        return(<Queue userId={userId} date={formatToday()}></Queue>)
    }
    if (currentSection==="toDos"){
        return(<ToDos userId={userId}></ToDos>)
    }
    
    else{
        return(<Habits></Habits>)
    }

}

export default Main