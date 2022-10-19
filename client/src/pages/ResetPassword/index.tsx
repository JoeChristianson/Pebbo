import { useMutation } from "@apollo/client"
import { RESET_PASSWORD } from "../../utils/mutations"
import {useEffect, useState} from "react"
import ErrorMessage from "../../components/generics/ErrorMessage/index.tsx"
import { Link } from "react-router-dom"

const ResetPassword = ()=>{
    const [errorMessages,setErrorMessages] = useState([])
    const [resetPassword,{}] = useMutation(RESET_PASSWORD)
    const [redirect,setRedirect] = useState(false)

    const handleFormSubmit = async (e)=>{
        e.preventDefault()
       
        const [email,password,confirmPassword] = Array.from(document.querySelectorAll(".form-input")).map((input:any)=>input.value)
        if(password!==confirmPassword){
            setErrorMessages(["Passwords do not match"])
            return
        }

        const variables = {email,password,code:window.location.href.split("=")[1]}
        console.log(variables);
        const resp = await resetPassword({variables})
        if(resp.data.resetPassword.message === "success"){
            setRedirect(true)
        }
        
    }

        return(
            <div className="form-card">
            <header>
                <h2 className='text-center'>
                     Reset Password
                </h2>
            </header>
            <main>
{!redirect?                <form onSubmit={handleFormSubmit}>
                <div>
                    <input className="form-input" placeholder='Email'  name="email" type="email"></input>
                    </div>
                <div>
                    <input className="form-input" placeholder='Password'  name="password" type="password"></input>
                    </div>
                    <div>

<input className="form-input"  placeholder="Confirm Password" name="confirmPassword" type="password"></input>
</div>
<ErrorMessage messages={errorMessages}></ErrorMessage>
                    <button className="pointer embolden"  type="submit">Submit</button>
                </form>:
                <div>
                    <h2>Successfully Reset</h2>
                    <a href="/login">Return to Login</a>
                </div>
                }

            </main>
        </div>
        )
    }
    export default ResetPassword
    
    
    