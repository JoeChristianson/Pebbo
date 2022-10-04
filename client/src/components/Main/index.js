import { POPULATE_DAY, SET_ORIENTATED } from "../../utils/mutations"
import "./Main.css"
import { useEffect,useState } from "react"
import Dash  from "../../pages/Dash"
import Review from "../../pages/Review"
import { ManageAssessments } from "../../pages/ManageAssessments"
import { BrowserRouter, Route, Routes,useParams } from "react-router-dom"
import { TodaysSettings } from "../../pages/TodaysSettings"
import Tutorial from "../../pages/Tutorial/index.js"
import AccountSettings from "../../pages/AccountSettings/index.tsx"
import AssessmentGuide from "../../pages/Guides/AssessmentGuide/index.tsx"
import { GET_QUEUE, GET_THEME } from "../../utils/queries"
import themes from "../../themes/index.ts"


const {useQuery,useMutation} = require("@apollo/client")
const auth = require("../../utils/auth").default
const {formatToday,formatYesterday} = require("../../utils/date")

const {FEED_ASSESSMENT, GET_DATES, GET_DASH,QUERY_DAY} = require("../../utils/queries")


const Habits = require("../../pages/Habits").default
const Queue = require("../../pages/Queue").default
const ToDos = require("../../pages/ToDos").default
const Assessment = require("../../pages/Assessment").default
const Variables = require("../../pages/Variables/index.tsx").default



const Main =  ()=>{
    
    const [setOrientated,{}]=useMutation(SET_ORIENTATED)
    const userId = auth.getProfile().data._id
    const [tutorialOn,setTutorialOn] = useState(true)
    const [reviewed,setReviewed] = useState(false)
    const variables = {userId,date:formatToday()}
    const [isPopulated,setIsPopulated] = useState(false)
    const {data:datesData,loading:datesLoading,refetch:refetchDates} = useQuery(GET_DATES,{variables:{userId}})
    const {loading:assessmentLoading,data:pendingAssessmentData,refetch:refetchAssessment} = useQuery(FEED_ASSESSMENT,
        {variables})
        
        const [populateDay,{data:popData,loading:popLoading,error:errPop}]=useMutation(POPULATE_DAY)
        const [populatedAttempt,setPopulatedAttempt] = useState(false)
        const {data:dashData,loading:dashLoading,error:dashError,refetch:refetchDash} = useQuery(GET_DASH,{variables:{userId,date:formatToday()}})
        const {loading:dayLoading,error,data:dayData,refetch:refetchDay} = useQuery(QUERY_DAY,
            {variables:{userId,date:formatToday()}
        })
        const {data:themeData,refetch:refetchTheme} = useQuery(GET_THEME,{variables:{userId}})
    
    useEffect(()=>{
        if(!themeData?.getTheme){
            return
        }
        const theme = themes.find(theme=>theme.name===themeData.getTheme).css
        for (let key in theme){
            document.documentElement.style.setProperty(key, theme[key].replace(";",""));
        }
    },[themeData])

    const queueQuery = useQuery(GET_QUEUE,{
            variables:{userId,date:formatToday()}
    })    
    const handleDoublePop = async ()=>{
        if(localStorage.getItem("lastUpdatedHabd")==variables.date){
            return
        }
        localStorage.setItem("lastUpdatedHabd",variables.date)
        if (popLoading){
            return
        }
        setPopulatedAttempt(true)
        const results = await populateDay({variables})
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

    if(formatToday()!==datesData.getDates?.lastReviewed&&!reviewed){

        return(
            <Review refresh={refetchDates} userId={userId} setReviewed={setReviewed}/>
        )
    }else{

    }

    if(formatToday()!==datesData.getDates?.lastSetting&&datesData.getDates?.settings.length>0){
        return (
            <TodaysSettings  refresh={refetchDates} userId={userId}></TodaysSettings>
        )
    }else{
        refetchDates()
    }

    const endTutorial = ()=>{
        setTutorialOn(false)
        setOrientated({variables:{userId,value:"true"}})
    }

    if(tutorialOn&&datesData.getDates.orientated==="false"){
        return(
            <Tutorial
            endTutorial={endTutorial}
            ></Tutorial>
            )
    }
    return (
        <Routes>
            <Route path="/"
            element={<Dash data={dashData} loading={dashLoading} error={dashError} refetch={refetchDash} userId={userId} date={formatToday()} refetchDay={refetchDay}/>}></Route>
            <Route path="/queue"   element={<Queue refetchDash={refetchDash} userId={userId} date={formatToday()} queueQuery={queueQuery}></Queue>}></Route>
            <Route path="/to-dos" element={<ToDos refetchDash={refetchDash}  userId={userId}></ToDos>}></Route>
            <Route path="/assessments" element={<ManageAssessments userId={userId}></ManageAssessments>}></Route>
            <Route path="/variables" element={<Variables userId={userId}></Variables>}></Route>
            <Route path="/habits" element={<Habits dayLoading={dayLoading} dayData={dayData} refetchDay={refetchDay} refetchDash={refetchDash}></Habits>}></Route>
            <Route path="/settings" element={<AccountSettings theme={themeData?.getTheme} refetchTheme={refetchTheme} userId={userId}></AccountSettings>}></Route>
            <Route path="/assessment-guide" element={<AssessmentGuide userId={userId}></AssessmentGuide>}></Route>
        </Routes>
    )
    

}

export default Main