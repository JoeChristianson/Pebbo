import { useContext, useState } from "react"
import Assessment from "../../Assessment"
import { ManageAssessments } from "../../ManageAssessments"
import "../index.css"
import BottomInfoBar from "../../../components/generics/BottomInfoBar/index.tsx"
import { formatToday } from "../../../utils/date"
import Review from "../../Review"

const ReviewGuide = ({userId,end})=>{

    const assessments = [{name:"Sleep Well",metric:"grade"}]
    const [assessmentIndex,setAssessmentIndex] = useState(0)
    const [highlight,setHighlight] = useState("")
    const pages = [
        {text:"After making your assessments, Pebbo offers you the opportunity to review what you completed the previous day."},
        {text:"There are two lists for you to review: Habits and Queue."},
        {text:"The habits list includes all the habits that you are testing.",highlight:"habits-list"},
        {text:"Later in the tutorial, I will show you how to choose these."},
        {text:"If a habit is crossed off, it means that yesterday, you stuck to it.",highlight:"meditate"},
        {text:"The 'No Screens after 9pm' habit shows itself as unfulfilled right now.",highlight:"no-screens"},
        {text:"Let's assume last night, even though you stuck to it, you did not have a chance to cross it off. Luckily, you can do so by clicking the button on the right."},
        {text:"The Queue consists of items that you mean to do in order from top-to-bottom everyday",highlight:"queue"},
        {text:"These need not be live-changing. They might just be things that need to get done as part of your routine"},
        {text:"Just like the habits, if you forget to cross off a queue item that you completed yesterday, you can do so here",highlight:"oatmeal"},
        {text:"Also, you can toggle back to incomplete on an item if necessary",highlight:"toggle-back"},
        {text:"Once both lists are accurate, you can click the Confirm Button",highlight:"confirm"},
        {text:"Now, it's on to the main app.",end:true}
]

return (<>
    <div className="block-bar"></div>
    <Review refresh={()=>{}} userId={userId} setReviewed={end} highlight={highlight}/>
    <BottomInfoBar end={end} setHighlight={setHighlight} pages={pages}></BottomInfoBar>
    </> 
    )
}

export default ReviewGuide
