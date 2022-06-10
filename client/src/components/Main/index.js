import "./Main.css"

const {useQuery} = require("@apollo/client")
const auth = require("../../utils/auth").default
const {formatToday} = require("../../utils/date")

const {FEED_ASSESSMENT} = require("../../utils/queries")


const Habits = require("../../pages/Habits").default
const Queue = require("../../pages/Queue").default
const ToDos = require("../../pages/ToDos").default
const Assessment = require("../../pages/Assessment").default


const Main =  ({currentSection})=>{
    console.log(currentSection)
    const userId = auth.getProfile().data._id
    // const variables = {userId,date:formatToday()}
    const variables = {  "userId": "62a0a5bf94de6f2e7c0a1dc4",
    "date": "6/9/2022"
  }
    const {loading:assessmentLoading,data:pendingAssessmentData} = useQuery(FEED_ASSESSMENT,
        {variables})

    if(assessmentLoading){
        return(<h1>Loading</h1>)
    }
    if(pendingAssessmentData?.feedAssessment?._id){
        return(<Assessment date={formatToday()} userId={userId} assessment={pendingAssessmentData.feedAssessment}></Assessment>)
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