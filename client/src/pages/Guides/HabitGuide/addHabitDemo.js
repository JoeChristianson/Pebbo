import SimpleInput from "../../../components/simpleInput"


const { useState } = require("react")

const AddHabitComp = ({addQueueItem})=>{

    const [habitName,setHabitName] = useState("")
    
    const handleChange = (e)=>{
        setHabitName(e.target.value)
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        console.log("adding");
        setHabitName("")
        addQueueItem(habitName)
    }


    return(
        <SimpleInput 
        formClass="inline-form"
        text={habitName} handleChange={handleChange} handleSubmit={handleSubmit}/>
    )
}

export default AddHabitComp