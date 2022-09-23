import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import ErrorMessage from '../../components/generics/ErrorMessage/index.tsx';
const auth = require("../../utils/auth").default
const {useState} = require("react")


export default function Login({setComponent}){

    const [formState, setFormState] = useState({ email: '', password: '' });
    const [errorMessages,setErrorMessages] = useState([])
    const [login, { error, data }] = useMutation(LOGIN_USER);

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
            console.log("found an error");
            console.log(err);
            setErrorMessages([err.message])
            console.log(errorMessages);
        }
    }
    const handleLink = (e)=>{
        setComponent(e.target.dataset.dest)
    }

    return(
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
                <div className='text-center pointer embolden' onClick={handleLink} data-dest="register">Click Here to Register</div>
            </main>
        </div>

    )

}