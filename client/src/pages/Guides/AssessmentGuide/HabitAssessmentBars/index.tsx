import { useQuery } from "@apollo/client"
import { GET_ALL_HABITS_EFFECTS_ON_ASSESSMENT } from "../../../utils/queries"
import { useImperativeHandle } from "react"
import BarGraph from "../../../../components/Graphs/BarGraph/index.tsx"

type Props = {
    assessment:any
    userId:any
}

const HabitAssessmentBars = ({assessmentName,highlight}:Props)=>{
   
    let graphData = []
    
    const sleepWell = [
        {
            name:"No screens after 9pm",onValue:3.2,offValue:1.7,
            
        },
        {name:"Meditate",onValue:2.5,offValue:2.4},
        {name:"Put on workout clothes after waking up",onValue:2.3,offValue:2.6}
    ]

    const steps = [
        {
            name:"No screens after 9pm",onValue:7855,offValue:6752,
            
        },
        {name:"Meditate",onValue:7314,offValue:7423},
        {name:"Put on workout clothes after waking up",onValue:8700,offValue:5800}
    ]
    
    if(assessmentName==="Sleep Well"){
        graphData = sleepWell
    }
    if(assessmentName==="Steps"){
        graphData = steps
    }

    if(!assessmentName){
        return
    }


    return(
        <div>
            <h1>{assessmentName}</h1>
            {
                graphData.map(d=>{
                    return (
                    <div className={`${highlight===d.name&&"highlight"}`}>
                    <h4>{d.name}</h4>
                    <BarGraph
                        chartData={{name:d.name,data:[{key:"on",value:d.onValue},
                        {key:"off",value:d.offValue}
                    ]}} 
                    colors={["red","blue"]}                       
                    ></BarGraph>
                    </div>)
                })
            }
                                {/* {barData===null?null:barData.map(d=>{
                        return (<BarGraph
                            chartData={{name:d.name,data:[{key:"on",value:d.onValue},
                            {key:"off",value:d.offValue}
                        ]}} 
                            colors={["red","blue"]}                       
                        ></BarGraph>)
                    })} */}
        </div>
    )
}

export default HabitAssessmentBars