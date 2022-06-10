import SimpleInput from "../simpleInput"
import { ADD_HABIT } from "../../utils/mutations"
import { useMutation } from "@apollo/client"
import { formatToday } from "../../utils/date"
const { useState } = require("react")

const AddHabitComp = ({refetchDay,userId,date,addQueueItem})=>{
    const [addHabit,{data,loading,error}] = useMutation(ADD_HABIT)
    const [habitName,setHabitName] = useState("")
    
    const handleChange = (e)=>{
        setHabitName(e.target.value)
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        await addHabit({variables:{
            creator:userId,name:habitName,date:formatToday()
        }})

        setHabitName("")
        refetchDay()
    }


    return(
        <SimpleInput text={habitName} handleChange={handleChange} handleSubmit={handleSubmit}/>
    )
}

export default AddHabitComp