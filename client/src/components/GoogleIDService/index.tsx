
    import React, {Dispatch, SetStateAction, useEffect, useState} from "react"
    import jwt_decode from "jwt-decode"
    import { useMutation } from "@apollo/client"
import { GOOGLE_LOGIN, REGISTER } from "../../utils/mutations"
import auth from "../../utils/auth"

type UserObj = {
    aud:string,
    azp:string,
    email:string,
    email_verified:boolean,
    exp:number,
    family_name:string,
    given_name:string,
    iat:number,
    iss:string,
    jti:string,
    name:string,
    nbf:number,
    picture:string,
    sub:string
}

    const GoogleIDService = ()=>{
        const [register, { error, data:regData }] = useMutation(REGISTER);

        const [login,{data}] = useMutation(GOOGLE_LOGIN)
        const [user,setUser]:[UserObj|null,Dispatch<SetStateAction<null>>] = useState(null)
        const [newUserOpen,setNewUserOpen] = useState(false)

        const handleCallbackResp = async (resp)=>{
            const {credential} = resp;
            const userObj:UserObj = jwt_decode(credential)
            console.log(userObj);
            setUser(userObj)
            const variables = {email:userObj.email}
            try{

                const {data} = await login({variables})
                const {token,user} = data.googleLogin
                console.log(token);
                auth.login(token)
            }catch(err){
                setNewUserOpen(true)
                document.getElementById("sign-in-div").innerHTML = ""              
                return
            }
        }

        useEffect(()=>{
            /* global google */
            google.accounts.id.initialize({
                client_id:"225840705974-aam7vvavn8hncp584alaub4i761j3cdd.apps.googleusercontent.com",
                callback: handleCallbackResp
            })
            google.accounts.id.renderButton(
                document.getElementById("sign-in-div"),
                {theme: "outline",size:"large"}
            )
        },[])

        const handleGoogleRegister = async ()=>{
            if(!user){
                return
            }
            const variables = {
                name:user.name,
                email:user.email,
                password:Math.floor(Math.random()*1000000000000)+"e",
                birthdate:"1/1/1900"
            }
            console.log(variables);
            
            const {data} = await register({
                variables
            })
            console.log(data);
            
            const {data:loginData} = await login({variables:{email:variables.email}})
            const {token} = loginData.googleLogin
            console.log(token);
            auth.login(token)
        }

        return(
<>
            {!newUserOpen?(<div id="sign-in-div"></div>):
            (<div><h3>No Pebbo Account Exists?</h3>
                <button onClick={handleGoogleRegister}>Make One</button>
            </div>)}
            </>
        )
    }
    export default GoogleIDService
    
    
    