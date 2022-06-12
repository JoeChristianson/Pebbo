import { useMutation } from '@apollo/client';
import { REGISTER } from '../../utils/mutations';
const auth = require("../../utils/auth").default
const {useState} = require("react")


export default function Register({setComponent}){

    const [formState, setFormState] = useState({name: "", email: '', password: '' ,confirmPassword: "",birthdate:null});

    const [register, { error, data }] = useMutation(REGISTER);

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormState({
            ...formState,[name]:value
        })
        console.log(formState)
    }

    const handleFormSubmit = async (e)=>{
        e.preventDefault()
        try{
            const { data } = await register({
                variables:{...formState}
            })
            setFormState({
                email:"",
                password:""
            })
            setComponent("login")
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

<input onChange={handleChange} name="name" type="text"></input>
</div>
                    <div>

                    <input onChange={handleChange} name="email" type="email"></input>
                    </div>
                    <div>

                    <input onChange={handleChange} name="password" type="password"></input>
                    </div>
                    <div>


<input onChange={handleChange} name="confirmPassword" type="password"></input>
</div>
<div className='center-self'>Birth Date</div>
<div>
<input placeholder='birthdate' onChange={handleChange} name="birthdate" type="date"></input>
</div>
                    <input className="pointer embolden"  type="submit"></input>
                </form>
                <div className='text-center pointer embolden'  onClick={handleLink} data-dest="login">Go to Login</div>
            </main>
        </div>

    )

}