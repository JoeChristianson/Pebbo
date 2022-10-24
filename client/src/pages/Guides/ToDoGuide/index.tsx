import { useContext, useState } from "react"
import Assessment from "../../Assessment"
import "../index.css"
import BottomInfoBar from "../../../components/generics/BottomInfoBar/index.tsx"
import { formatToday } from "../../../utils/date"
import ToDos from "../ToDoGuide/mockToDos.tsx"

const ToDoGuide = ({userId,end})=>{
    const [highlight,setHighlight] = useState("")
    const pages = [
        {text:"We will first go through the To Do page."},
        {text:"You can add to dos in the field up top.",highlight:"add"},
        {text:"When you complete a to do, check it off by clicking the green button next to it.",highlight:"green"},
        {text:"Click on the name of the to do to open up its details.",highlight:"name"},
        {text:"After opening up the details, you can push the to do to the top of the list by clicking 'Prioritize' or delete the item by clicking Delete.",highlight:""},
        {text:"You can add sub-tasks and notes as well."},
        {text:"Test this out."},
        {text:"Now we move onto... ",end:true}
]

return (<>
    <div className="block-bar"></div>
    <ToDos setHideHeader={()=>{}} userId={userId} refetchDash={()=>{}} onDash={false} highlight={highlight} end={end} ></ToDos>
        <BottomInfoBar end={end} setHighlight={setHighlight} pages={pages}></BottomInfoBar>
    </> 
    )
}

export default ToDoGuide
