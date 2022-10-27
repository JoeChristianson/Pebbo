import { useMutation } from '@apollo/client';
import { REGISTER } from '../../utils/mutations';
import ErrorMessage from '../../components/generics/ErrorMessage/index.tsx';
const auth = require("../../utils/auth").default
const {useState} = require("react")


export default function Register({setComponent}){

    const [formState, setFormState] = useState({name: "", email: '', password: '' ,confirmPassword: "",birthdate:null});

    const [register, { error, data }] = useMutation(REGISTER);
    const [errorMessages,setErrorMessages] = useState([])

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormState({
            ...formState,[name]:value
        })
    }

    const handleFormSubmit = async (e)=>{
        e.preventDefault()

        try{
            const variables = {...formState};
            if(variables.name.length<6){
                setErrorMessages(["Username of at least six charactrers required."])
                return
            }
            if(!variables.email.match(/[a-z0-9]+@[a-z]+\.[a-z]{2,3}/)){
                setErrorMessages(["Incorrect e-mail form."])
                return
            }
            if(variables.password.length<7){
                setErrorMessages(["Password must be at least seven characters"])
                return
            }
            if(variables.password!==variables.confirmPassword){
                setErrorMessages(["Passwords do not match"])
                return
            }
            if(!variables.birthdate){
                variables.birthdate = ""
                setErrorMessages(["Birthdate required."])
                return
            }
            const {data} = await register({
                variables
            })
            const {valid,errors} = data.createUser;
            if(valid==="true"){

                setFormState({
                    email:"",
                    password:""
                })
                // Nah, let's redirect to the login page
                setComponent("login")
            }else{
                setErrorMessages(errors)
            }
        }catch(err){
            console.error(err)
        }
    }

    const handleLink = (e)=>{
        setComponent(e.target.dataset.dest)
    }



    return(
        <div className="form-card">
            <header>
                <h2 className='text-center'>
                     Register
                </h2>
            </header>
            <main>
                <form onSubmit={handleFormSubmit}>
                <div>

<input onChange={handleChange} placeholder="Username" name="name" type="text"></input>
</div>
                    <div>

                    <input placeholder='Email' onChange={handleChange} name="email" type="email"></input>
                    </div>
                    <div>

                    <input placeholder='Password' onChange={handleChange} name="password" type="password"></input>
                    </div>
                    <div>


<input onChange={handleChange} placeholder="Confirm Password" name="confirmPassword" type="password"></input>
</div>
<h3 className='center-self'>Birth Date</h3>
<div>
<input placeholder='birthdate' onChange={handleChange} name="birthdate" type="date"></input>
</div>
<ErrorMessage messages={errorMessages}></ErrorMessage>
                    <input className="pointer embolden"  type="submit"></input>
                </form>
                <div className='text-center pointer embolden'  onClick={handleLink} data-dest="login">Go to Login</div>
            </main>
        </div>

    )

}