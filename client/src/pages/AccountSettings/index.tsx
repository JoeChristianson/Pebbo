import "./index.css"
import { useMutation } from "@apollo/client";
import { EXPORT_DATA,CHANGE_THEME } from "../../utils/mutations.js";
import MainTallCenter from "../../components/frames/MainTallCenter/index.tsx";
import Across from "../../components/frames/Across/index.tsx";
import themes from "../../themes/index.ts";
import { useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen/index.tsx";

const AccountSettings = ({userId,theme,refetchTheme})=>{
    console.log("THEME",theme);
    
    const [exportData,{data}] = useMutation(EXPORT_DATA) 
    const [changeTheme,{data:themeChangeData}] = useMutation(CHANGE_THEME)
    const handleDataExport = async ()=>{
       const resp = await exportData({variables:{userId}})
        const data = await resp;
    }
    const [selectedTheme,setSelectedTheme] = useState(theme,"boring")
    useEffect(()=>{
        setSelectedTheme(theme)
    },[theme])


    const handleThemeSelect = async (e)=>{
        const theme = e.target.value;
        const variables = {userId,theme}
        const data = await changeTheme({variables})
        console.log(data)
        refetchTheme()
        setSelectedTheme(theme)
    }
    
    if(!theme){
        console.log("no theme");
        
        return <LoadingScreen></LoadingScreen>
    }

    return(
        <MainTallCenter title="Account Settings">
        <form className="account-settings-form" action="">
    <Across className={"font-medium"}>
        <label htmlFor="theme">Theme</label>
        <select value={selectedTheme} onChange={handleThemeSelect} name="theme" id="theme-selector">
            {themes.map((theme)=>{
                console.log(theme.name,selectedTheme);
                
                return(
                    <option selected={theme.name===selectedTheme?true:false} value={theme.name}>{theme.name}</option>
                    )
            })}
        </select>
        </Across>
<Across className={"font-medium"}>
    <span>Export</span>
<button onClick={handleDataExport} className="export-btn">Export Data</button>
</Across>

        </form>
        </MainTallCenter>
    )
}

export default AccountSettings