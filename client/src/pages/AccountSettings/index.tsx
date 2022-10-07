import "./index.css"
import { useMutation } from "@apollo/client";
import { EXPORT_DATA,CHANGE_THEME,SET_MULTIPLE_SETTINGS } from "../../utils/mutations.js";
import MainTallCenter from "../../components/frames/MainTallCenter/index.tsx";
import Across from "../../components/frames/Across/index.tsx";
import themes from "../../themes/index.ts";
import { useEffect, useState } from "react";
import LoadingScreen from "../../components/LoadingScreen/index.tsx";

const AccountSettings = ({userId,theme,refetchTheme})=>{
    const [downloadHREF,setDownloadHREF] = useState("")
    const [download,setDownload] = useState("")
    const [exportData,{data}] = useMutation(EXPORT_DATA) 
    const [changeTheme,{data:themeChangeData}] = useMutation(CHANGE_THEME)
    const [setMultipleSettings,{data:setMultipleData}] = useMutation(SET_MULTIPLE_SETTINGS)
    const [inputValues,setInputValues] = useState({})
    const handleDataExport = async (e)=>{
        e.preventDefault()
    //    const file = await fetch("http://localhost:3001/api/export?userId="+userId)
       const file = await fetch("http://localhost:3001/api/export?userId=62ea8b67b1a2a28cb4d760e3",{
        mode: 'cors',
        headers: {
          'Access-Control-Allow-Origin':'*'
        }
       })

       
       const blob = await file.blob()
       const newBlob = new Blob([blob])
       console.log(blob);
       
       const blobUrl = window.URL.createObjectURL(newBlob);
       setDownloadHREF(blobUrl)
       setDownload(`data-${userId}.json`)
    //    window.URL.revokeObjectURL(blobUrl);
    }
    const [selectedTheme,setSelectedTheme] = useState(theme,"boring")
    useEffect(()=>{
        setSelectedTheme(theme)
    },[theme])

    

    const handleThemeSelect = async (e)=>{
        const theme = e.target.value;
        const variables = {userId,theme}
        const data = await changeTheme({variables})
        refetchTheme()
        setSelectedTheme(theme)
    }

    const handleInputChange = (e)=>{
        const name = e.target.name;
        const value = e.target.value;
        const oldValues = {...inputValues};
        oldValues[name]=value;
        setInputValues(oldValues)
    }
    
    if(!theme){
        console.log("no theme");
        
        return <LoadingScreen></LoadingScreen>
    }
    console.log(inputValues)
    return(
        <MainTallCenter title="Account Settings">
        <form className="account-settings-form" action="">
        <Across className={"font-medium"}>
        <label htmlFor="phone">Phone Number</label>
        <div>
        <input value={inputValues.phone} onChange={handleInputChange} data-type="number" name="phone"></input>
        <button>Save</button>
        </div>
        </Across>
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
{download===""?<button onClick={handleDataExport} className="export-btn">Export Data</button>:
<a href={downloadHREF} download={download}>Download</a>}
</Across>

        </form>
        </MainTallCenter>
    )
}

export default AccountSettings