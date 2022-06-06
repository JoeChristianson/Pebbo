import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
const auth = require("../../utils/auth").default
const {useState} = require("react")


export default function Login(){

    console.log(auth)
    const [formState, setFormState] = useState({ email: '', password: '' });

    const [login, { error, data }] = useMutation(LOGIN_USER);

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
            const { data } = await login({
                variables:{...formState}
            })
            auth.login(data.login.token)
            setFormState({
                email:"",
                password:""
            })
        }catch(err){
            console.error(err)
        }
    }

    return(
        <div className="form-card">
            <header>
                <h2>
                     Login
                </h2>
            </header>
            <main>
                <form onSubmit={handleFormSubmit}>
                    <div>

                    <label for="email">Email</label>
                    <input onChange={handleChange} name="email" type="email"></input>
                    </div>
                    <div>

                    <label for="password">Password</label>
                    <input onChange={handleChange} name="password" type="password"></input>
                    </div>
                    <input type="submit"></input>
                </form>
            </main>
        </div>

    )

}