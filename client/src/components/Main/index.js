// third-party-libs
import { BrowserRouter, Route, Routes,useParams } from "react-router-dom"
import { useEffect,useState } from "react"

// pages
import Dash  from "../../pages/Dash"
import Review from "../../pages/Review"
import Passthru from "../Passthru/index.tsx"
import { ManageAssessments } from "../../pages/ManageAssessments"
import { TodaysSettings } from "../../pages/TodaysSettings"
import Tutorial from "../../pages/Tutorial/index.js"
import AccountSettings from "../../pages/AccountSettings/index.tsx"
import AssessmentGuide from "../../pages/Guides/AssessmentGuide/index.tsx"

// apollo resolvers
import { POPULATE_DAY, SET_ORIENTATED } from "../../utils/mutations"
import { GET_PASSTHRUS, GET_QUEUE, GET_THEME } from "../../utils/queries"

// styling
import "./Main.css"
import themes from "../../themes/index.ts"


const {useQuery,useMutation} = require("@apollo/client")
const auth = require("../../utils/auth").default
const {formatToday} = require("../../utils/date")
const checkPassthruData = require("../../utils/checkPassthruData.ts")
const {FEED_ASSESSMENT, GET_DATES, GET_DASH,QUERY_DAY} = require("../../utils/queries")

// pages
const Habits = require("../../pages/Habits").default
const Queue = require("../../pages/Queue").default
const ToDos = require("../../pages/ToDos").default
const Assessment = require("../../pages/Assessment").default
const Variables = require("../../pages/Variables/index.tsx").default



const Main =  ({setHideHeader})=>{
    const userId = auth.getProfile().data._id
    
    const [passThrus,setPassThrus] = useState(null)
    const passThruVariables = {userId,date:formatToday()}
    const {data:passThruData,loading:passThruLoading} = useQuery(GET_PASSTHRUS,{variables:passThruVariables})
    useEffect(()=>{
        if(passThruLoading){
            return
        }
        const needPassthru = checkPassthruData(passThruData)
        setPassThrus(passThruData.getRenders)
    },[passThruData])

    const variables = {userId,date:formatToday()}
    const [isPopulated,setIsPopulated] = useState(false)
    const {data:datesData,loading:datesLoading,refetch:refetchDates} = useQuery(GET_DATES,{variables:{userId}})
    
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
        const theme = themes.find(theme=>theme.name===themeData.getTheme)?.css
        if(!theme){
            return
        }
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



// This section handles all the passthru screens!
    if(popLoading||datesLoading||!passThrus){
        return(<h1>Loading</h1>)
    }
    const {orientated,assessments} = passThrus
    const {habits,queueItems} =passThrus.reviewItems
    if(!orientated||habits.length>0||assessments.length>0||queueItems.length>0){
        return(
            <Passthru passThrus={passThrus} setPassThrus={setPassThrus} userId={userId}></Passthru>
        )
    }






    if(formatToday()!==datesData.getDates?.lastSetting&&datesData.getDates?.settings.length>0){
        return (
            <TodaysSettings  refresh={refetchDates} userId={userId}></TodaysSettings>
        )
    }else{
        refetchDates()
    }


    return (
        <Routes>
            <Route path="/"
            element={<Dash data={dashData} loading={dashLoading} error={dashError} refetch={refetchDash} userId={userId} date={formatToday()} refetchDay={refetchDay}/>}></Route>
            <Route path="/queue"   element={<Queue setHideHeader={setHideHeader}  refetchDash={refetchDash} userId={userId} date={formatToday()} queueQuery={queueQuery}></Queue>}></Route>
            <Route path="/to-dos" element={<ToDos setHideHeader={setHideHeader} refetchDash={refetchDash}  userId={userId}></ToDos>}></Route>
            <Route path="/assessments" element={<ManageAssessments userId={userId}></ManageAssessments>}></Route>
            <Route path="/variables" element={<Variables userId={userId}></Variables>}></Route>
            <Route path="/habits" element={<Habits setHideHeader={setHideHeader} dayLoading={dayLoading} dayData={dayData} refetchDay={refetchDay} refetchDash={refetchDash}></Habits>}></Route>
            <Route path="/settings" element={<AccountSettings theme={themeData?.getTheme} refetchTheme={refetchTheme} userId={userId}></AccountSettings>}></Route>
            <Route path="/assessment-guide" element={<AssessmentGuide userId={userId}></AssessmentGuide>}></Route>
        </Routes>
    )
    

}

export default Main