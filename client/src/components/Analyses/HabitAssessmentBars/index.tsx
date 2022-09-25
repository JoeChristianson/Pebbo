import { useQuery } from "@apollo/client"
import { GET_ALL_HABITS_EFFECTS_ON_ASSESSMENT } from "../../../utils/queries"
import { useImperativeHandle } from "react"
import BarGraph from "../../Graphs/BarGraph/index.tsx"

type Props = {
    assessment:any
    userId:any
}

const HabitAssessmentBars = ({assessment,userId}:Props)=>{
    const {data,error,loading} = useQuery(GET_ALL_HABITS_EFFECTS_ON_ASSESSMENT,{variables:{userId,assessmentId:assessment._id}})
    
    if(loading){
        return(<h1>Loading</h1>)
    }
    const allDays = data.getAllHabitsEffectsOnAssessment;
    
    const allHabitsSet = new Set();
    allDays.forEach((day:any)=>{

        day.habits.forEach((h:any)=>{
            allHabitsSet.add(h.name)
        })
    })
    const allHabitsArray = new Array(...allHabitsSet)

    const graphData = []
    allHabitsArray.forEach((habit)=>{
        const name = habit;
        let onValue;
        let offValue;
        const onValues = [];
        const offValues = []
        allDays.forEach(day=>{
            const habit = day.habits.find(h=>h.name===name); 
            if(habit){
               if(habit.isComplete){
                onValues.push(day.value)
               } else{
                offValues.push(day.value)
               }
            }
        })
        if(onValues.length>0&&offValues.length>0){
            onValue = onValues.reduce((a,b)=>a+b,0)/onValues.length
            offValue = offValues.reduce((a,b)=>a+b,0)/offValues.length
            graphData.push({name,onValue,offValue})
        }
    })  

    return(
        <div>
            {
                graphData.map(d=>{
                    return (<BarGraph
                        chartData={{name:d.name,data:[{key:"on",value:d.onValue},
                        {key:"off",value:d.offValue}
                    ]}} 
                        colors={["red","blue"]}                       
                    ></BarGraph>)
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