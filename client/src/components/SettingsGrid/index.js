import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { ADD_SETTING, OFF_SETTING } from "../../utils/mutations";
import { GET_QUEUE_ITEM_SETTINGS } from "../../utils/queries";
import SimpleInput from "../simpleInput";


export const SettingsGrid = ({userId,dataId})=>{

    const {data,error,loading,refetch} = useQuery(GET_QUEUE_ITEM_SETTINGS,{variables:{userId,queueItemId:dataId}})
    const [addSetting,{data:addData,error:addError,loading:addLoading}] = useMutation(ADD_SETTING)
    const [newSettingText,setNewSettingText] = useState("")
    const [offSettingMutation,{data:offData,error:offError,loading:offLoading}] = useMutation(OFF_SETTING)
    if(loading){
        return <div>Loading...</div>
    }
    const {settings:allSettings,offSettings} = data.getAllSettingsAndOffSettings

    const settings = allSettings.map(setting=>{
        return {
            name:setting.name,
            on:!offSettings.map(setting=>setting.name).includes(setting.name),
            id:setting.id
        }
    }
    )
    const handleCheckboxChange = async (e)=>{
        try{
            const variables = {userId,settingId:e.target.dataset.id,queueItemId:dataId}
            const {on} = settings.find(setting=>{
                return setting.name===e.target.dataset.name})
            if(on){
                await offSettingMutation({variables})
            }
            refetch()
        }catch(err){
            console.error(err)
        }
    }

    const handleChange = (e)=>{
        setNewSettingText(e.target.value)
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        await addSetting({variables:{userId,settingName:newSettingText}})

        await refetch()
    }

    return (

        <div>

    <div className="grid">
        {settings.map(setting=>{
            return(
                <div className="checkbox-group">
                <label>
                    {setting.name}
                </label>
                <input onChange={handleCheckboxChange} data-name={setting.name} data-id={setting.id} checked={setting.on} type="checkbox"></input>
            </div>
            )
        })}
    </div>
    <SimpleInput handleChange={handleChange} handleSubmit={handleSubmit} text={newSettingText} label={"New Setting:"}/>
    </div>
        )
}

