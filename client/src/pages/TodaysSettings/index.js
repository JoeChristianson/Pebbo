import { useMutation, useQuery } from "@apollo/client"
import { formatToday } from "../../utils/date"
import { useState } from "react"
import { GET_VARIABLES } from "../../utils/queries"
import { ADD_SETTINGS_TO_DAY } from "../../utils/mutations"


export const TodaysSettings = ({userId,refresh})=>{
    const {data,error,loading} = useQuery(GET_VARIABLES,{variables:{userId}})
    const [addSettingsToDay,{data:addData,error:addError,loading:addLoading}]=useMutation(ADD_SETTINGS_TO_DAY)
    const [todaysSettings,setTodaysSettings] = useState([])

    const toggleSetting = (e)=>{
        const pickedSetting = data.getAllSettings[e.target.dataset.index]
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

    console.log(todaysSettings)

    if (loading){
        return (<></>)
    }

    return(
        <>
        <div>{todaysSettings.map(s=>s.name).join(", ")}</div>
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
        <button onClick={handleSubmit}>Submit</button>
        </>
    )
}