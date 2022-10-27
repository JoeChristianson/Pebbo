import { useContext, useState } from "react"
import "../index.css"
import BottomInfoBar from "../../../components/generics/BottomInfoBar/index.tsx"
import Dash from "./mockDash.js"

const DashGuide = ({end})=>{
    const [highlight,setHighlight] = useState("")
    const pages = [
        {text:"This is your Dashboard"},
        {text:"It contains simplified versions of some of the other screens",highlight:"dash"},
        {text:"There is a list of today's habits",highlight:"habits"},
        {text:"The queue section shows the next item in the queue. You can click a button to complete it and another to skip it.",highlight:"queue"},
        {text:"The to do section lists all to dos",highlight:"to-dos"},
        {text:"Also, we have some stats to motivate you, showing how your assessments have been going.",highlight:"stats"},
        {text:"That's all folks!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! ",end:true}
]

return (<>
    <div className="block-bar"></div>
        <Dash highlight={highlight}></Dash>
        <BottomInfoBar end={end} setHighlight={setHighlight} pages={pages}></BottomInfoBar>
    </> 
    )
}

export default DashGuide
