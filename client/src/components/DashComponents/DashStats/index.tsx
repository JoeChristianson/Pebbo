import React, { FC, ReactElement } from "react"
import { useQuery } from "@apollo/client"
import { QUICK_STATS } from "../../../utils/queries"
import LoadingScreen from "../../LoadingScreen/index.tsx"
import { NameAndNumber } from "custom-types/generic"
import "./index.css"

const DashStats:FC<{userId:string}> = ({userId}):ReactElement=>{
    const variables:{userId:string} = {userId:userId}
    const query = {variables:variables}
    const {data,loading,error}:{data:any,loading:Boolean,error?:(Error|undefined)
    } = useQuery(QUICK_STATS,query)
    if(loading){
        return <LoadingScreen/>
    }
    const {streaks,averages} = data.quickStats
    
    return (<>
    {streaks.length<1?null:(<div>
        <h2>Streaks</h2>
        <div className="stats-cont">
            {streaks.map((item:NameAndNumber,key:React.Key):any=>{
                return <div key={key}>
                    <>
                    {item?.number}&nbsp;days--{item?.name}
                    </>
                    </div>
            })}
        </div>
    </div>)}
    {averages.length<1?null:(<div className="stats-cont">
        <h2>Averages</h2>
        <div>
            {averages.map((item:NameAndNumber,key:React.Key):any=>{
                return <div key={key}>
                    <>
                    {item?.name}--{item?.number}
                    </>
                    </div>
            })}
        </div>
    </div>)}
    </>)
}

export default DashStats