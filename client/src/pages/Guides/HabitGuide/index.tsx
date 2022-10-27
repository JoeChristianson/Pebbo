import { useContext, useState } from "react"
import "../index.css"
import BottomInfoBar from "../../../components/generics/BottomInfoBar/index.tsx"
import Habits from "./mockHabits";
import mockHabitsData from "./mockHabitsData.ts"

const HabitGuide = ({end})=>{
  
    const [highlight,setHighlight] = useState("")
    const pages = [
        {text:"This is the habit page, which has all the habits you are testing."},
        {text:"Right now it is showing the habits that are active today. Whether or not a habit is active for a day is random.",highlight:"input"},
        {text:"As expected, you can check off a habit if you stuck to it today.",highlight:"no-screens"},
        {text:"You can also see all the habits.",highlight:"all"},
        {text:"You can also add a habit.",highlight:"add"},
        {text:"If you click on a habit name, you can look at more options.",highlight:"add"},
        {text:"On the details screen, you can delete the habit or make it permanent",highlight:"add"},
        {text:"Making it permanent will mean its active everyday.",highlight:"add"},
        {text:"Moving on... (we are getting close I swear!)",end:true,highlight:""}
]

    if(Habits===undefined){
        return<></>
    }

return (<>
    <div className="block-bar"></div>
    <Habits highlight={highlight} initialHabitDays={mockHabitsData}/>
    <BottomInfoBar end={end} setHighlight={setHighlight} pages={pages}></BottomInfoBar>
    </> 
    )
}

export default HabitGuide
