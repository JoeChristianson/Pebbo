import "./index.css"
import { useMutation } from "@apollo/client";
import { EXPORT_DATA } from "../../utils/mutations.js";
import MainTallCenter from "../../components/frames/MainTallCenter/index.tsx";
import Across from "../../components/frames/Across/index.tsx";
const AccountSettings = ({userId})=>{
    const [exportData,{data}] = useMutation(EXPORT_DATA) 
    const handleDataExport = async ()=>{
       const resp = await exportData({variables:{userId}})
        const data = await resp;
        console.log(data);
    }

    return(
        <MainTallCenter title="Account Settings">
        <form className="account-settings-form" action="">
<Across className={"font-medium"}>
        <label htmlFor="theme">Theme</label>
        <select name="theme" id="theme-selector"></select>
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