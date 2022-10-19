import { useMutation } from '@apollo/client';
import { useEffect } from 'react';
import { LOGIN_USER, REQUEST_PASSWORD_EMAIL } from '../../utils/mutations';
import ErrorMessage from '../../components/generics/ErrorMessage/index.tsx';
import "./login.css"
import {GoogleLogin} from "react-google-login"
import {gapi} from "gapi-script"
import GoogleIDService from '../../components/GoogleIDService/index.tsx';
const auth = require("../../utils/auth").default
const {useState} = require("react")


export default function Login({setComponent}){



    const [formState, setFormState] = useState({ email: '', password: '' });
    const [errorMessages,setErrorMessages] = useState([])
    const [login, { error, data }] = useMutation(LOGIN_USER);
    const [requestEmail,{}] = useMutation(REQUEST_PASSWORD_EMAIL)

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormState({
            ...formState,[name]:value
        })
    }

    const handleFormSubmit = async (e)=>{
        e.preventDefault()
        try{
            const { data } = await login({
                variables:{...formState}
            })
            auth.login(data.login.token)
            setFormState({
                email:"",
                password:""
            })
        }catch(err){

            setErrorMessages([err.message])
            console.error(errorMessages);
        }
    }
    const handleLink = (e)=>{
        setComponent(e.target.dataset.dest)
    }

    const handleSendEmail = async ()=>{
        const email = await prompt("Enter email")
        const variables={email}
        const resp = await requestEmail({variables})
        if(resp.data.resetPasswordRequest.message==="Check your email"){
            alert(resp.data.resetPasswordRequest.message)
        }
    }

    return(
        <>
        <div className='logo-cont'>
                    <img src='/logo.png'></img>
        </div>
        <div className="form-card">
            <header>
                <h2 className=' text-center'>
                     Login
                </h2>
            </header>
            <main>
                <form onSubmit={handleFormSubmit}>
                    <div>
                    <input placeholder="email" onChange={handleChange} name="email" type="email"></input>
                    </div>
                    <div>
                    <input placeholder="password" onChange={handleChange} name="password" type="password"></input>
                    </div>
                    <ErrorMessage
                    messages={errorMessages}
                    
                    ></ErrorMessage>
                    <input className="pointer embolden" type="submit"></input>
                </form>
                <div className='text-center pointer embolden' onClick={handleSendEmail} >Forgot Password?</div>
                <GoogleIDService></GoogleIDService>
                <div className='text-center pointer embolden' onClick={handleLink} data-dest="register">Click Here to Register</div>
            </main>
        </div>
                    </>

    )

}