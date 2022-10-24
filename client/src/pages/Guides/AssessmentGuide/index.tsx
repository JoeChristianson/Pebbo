import { useContext, useState } from "react"
import Assessment from "../../Assessment"
import { ManageAssessments } from "../../ManageAssessments"
import "../index.css"
import BottomInfoBar from "../../../components/generics/BottomInfoBar/index.tsx"

const QueueGuide = ({userId,end})=>{
    const [highlight,setHighlight] = useState("")
    const pages = [{text:"This is your page for managing assessments. Assessments are items that you will rate every morning. We've added three assessments for you to start out with."},
    {text:"The assessments that you currently have for your account will be displayed here.",highlight:"assessment-list-cont"},
    
    {text:"Click the Add Assessment button to add your own daily assessment.",highlight:"add-button"},
    {text:"Enter in a name for the assessment. Some examples would be .........",highlight:"assessment-name"},
    {text:"Choose a metric for the assessment. Is the assessment Pass/Fail (like 'Stuck to Diet')? Could it be a grade from A-F (like 'Quality of Meditation')? Or will it be a quantity (like 'Number of Pushups')? ",highlight:"assessment-metric"},
    {text:"Click 'Add Assessment' to finalize your decision. Now it has been added to your assessment list.",
    highlight:"assessment-button"},
    {text:"You may exit a menu by clicking on the x button in the top right corner.",highlight:"close-modal"},
    {text:"By clicking on the name of an assessment, you display relevant data and graphs on the main area of the page. Since there is not any historical data right now, this section is currently blank.",highlight:"main-graph-area"},
    {text:"Click on an edit button next to an assessment to edit it. Pick one that you wish to delete.",highlight:"edit-btn"},
    {text:"An assessment can be deleted here"},
    {text:"Click to Move on to the next tutorial.",end:true}


]
return (<>
    <div className="block-bar"></div>
        <ManageAssessments highlight={highlight} userId={userId}/>
        <BottomInfoBar setHighlight={setHighlight} pages={pages}></BottomInfoBar>
    </> 
    )
}

export default QueueGuide
