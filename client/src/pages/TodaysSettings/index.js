import { useMutation, useQuery } from "@apollo/client"
import { formatToday } from "../../utils/date"
import { useState } from "react"
import { GET_VARIABLES } from "../../utils/queries"
import { ADD_SETTINGS_TO_DAY } from "../../utils/mutations"
import {mockLib} from "dev-utils"
const {MockObjectArray} = mockLib.data
export const TodaysSettings = ({userId,refresh})=>{
    const {data,error,loading} = useQuery(GET_VARIABLES,{variables:{userId}})
    const [addSettingsToDay,{data:addData,error:addError,loading:addLoading}]=useMutation(ADD_SETTINGS_TO_DAY)
    const [todaysSettings,setTodaysSettings] = useState([])

    const toggleSetting = (e)=>{
        const pickedSetting = data.getAllSettings[e.target.dataset.index];
        let newSettings;
        if(!todaysSettings.includes(pickedSetting)){
            newSettings = [...todaysSettings,pickedSetting]
        }else{
            newSettings = todaysSettings.filter(s=>s!==pickedSetting);
        }

        setTodaysSettings(newSettings)
    }

    const handleSubmit = async ()=>{
        const variables = {userId,settings:todaysSettings.map(s=>s.name),date:formatToday()}
        await addSettingsToDay({variables})
        refresh()
    }

    

    if (loading){
        return (<></>)
    }
    console.log(todaysSettings);
    const mockData = MockObjectArray({name:"numericalDate",day:"weekday"},15)
    // const mockData = []
    return(
        <>
        <div>{todaysSettings.map(s=>s.name).join(", ")}</div>
        <div className="grid-3">

        {data.getAllSettings.map((s,i)=>(
            <div key={i}>
                <span>
                    {s.name}
                    </span>
                    <button onClick={toggleSetting} data-index={i}>
                        x
                    </button>
            </div>
        ))}
        </div>
        <button className="submit" onClick={handleSubmit}>Submit</button>
        </>
    )
}