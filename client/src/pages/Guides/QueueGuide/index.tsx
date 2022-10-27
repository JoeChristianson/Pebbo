import { useContext, useState } from "react"
import "../index.css"
import BottomInfoBar from "../../../components/generics/BottomInfoBar/index.tsx"
import Queue from "./mockQueue"

const QueueGuide = ({end})=>{

    console.log("in queue guide");
    
    const [highlight,setHighlight] = useState("")
    const pages = [
        {text:"This is the Queue Page, which contains a list of items that you do from top to bottom every day."},
        {text:"You can add items to the Queue.",highlight:"input"},
        {text:"You can also rearrange the order by dragging the item.",highlight:"drag"},
        {text:"You can check them off when you are finished",highlight:"check"},
        {text:"Finally, you can see your completion rate for a given item",highlight:"rate"},
        {text:"We have a couple pages left. Hold tight ...",end:true,highlight:""}
]

return (<>
    <div className="block-bar"></div>
    <Queue highlight={highlight}/>
    <BottomInfoBar end={end} setHighlight={setHighlight} pages={pages}></BottomInfoBar>
    </> 
    )
}

export default QueueGuide
