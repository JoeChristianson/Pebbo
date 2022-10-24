import { useContext, useState } from "react"
import Assessment from "../../Assessment"
import { ManageAssessments } from "../../ManageAssessments"
import "../index.css"
import BottomInfoBar from "../../../components/generics/BottomInfoBar/index.tsx"
import { formatToday } from "../../../utils/date"

const YesterdayAssessmentGuide = ({userId,end})=>{

    const assessments = [{name:"Sleep Well",metric:"grade"}]
    const [assessmentIndex,setAssessmentIndex] = useState(0)
    const [highlight,setHighlight] = useState("")
    const pages = [
        {text:"When you first load the app in the morning, you will be prompted to respond to some assessments."},
        {text:"You get to choose what to assess (later in the tutorial, you will see how to choose your own assessments)."},
        {text:"In this example, the user has difficulty sleeping, so they have chosen to record how well they slept the previous night."},
        {text:"Grade your previous night's sleep by clicking on a letter grade",highlight:"grade"},
        {text:"Click 'Confirm' to confirm your assessment.",highlight:"confirm"},
        {text:"After submitting this assessment, you would repeat the process for all the other assessments you have chosen.",highlight:"submit"},
        {text:"You can have as many assessments as you wish or none at all (in which case, this process be skipped all together)."},
        {text:"One or two assessments is a good start though.",end:true}
]

return (<>
    <div className="block-bar"></div>
        <Assessment refetchAssessment={()=>setAssessmentIndex(assessmentIndex+1)} assessment={assessments[assessmentIndex]} date={formatToday()} highlight={highlight} userId={userId}/>
        <BottomInfoBar end={end} setHighlight={setHighlight} pages={pages}></BottomInfoBar>
    </> 
    )
}

export default YesterdayAssessmentGuide
