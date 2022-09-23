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
        console.log({...formState});
        try{
            const variables = {...formState};
            if(!variables.birthdate){
                variables.birthdate = ""
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
                setComponent("login")
            }else{
                console.log(errors,"erros");
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

<input onChange={handleChange} placeholder="Name" name="name" type="text"></input>
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