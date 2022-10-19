import ResetPassword from "../../pages/ResetPassword/index.tsx"
import Login from "../../pages/Login"
import Register from "../../pages/Register"
const {useState, useEffect} = require("react")


export default function AuthComponent(){
    const [component,setComponent] = useState("login")
    const [resetCode,setPasswordResetCode] = useState(null)
    useEffect(()=>{
        const href = window.location.href;
        if(href.includes("code")){
            setPasswordResetCode(href.split("=")[1])
        }
    },[])

    if(resetCode){
        return (<ResetPassword 
            resetCode={resetCode}
        ></ResetPassword>)
    }

    return(
        <>
        {component==="login"?<Login setComponent={setComponent}></Login>:<Register setComponent={setComponent}></Register>}
        </>
    )


}