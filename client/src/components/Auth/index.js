import Login from "../../pages/Login"
import Register from "../../pages/Register"
const {useState} = require("react")


export default function AuthComponent(){
    const [component,setComponent] = useState("login")

    return(
        <>
        {component==="login"?<Login setComponent={setComponent}></Login>:<Register setComponent={setComponent}></Register>}
        </>
    )


}