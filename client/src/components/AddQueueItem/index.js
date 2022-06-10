const { useState } = require("react")


const AddQueueItemComp = ({refetchQueue,userId,date,addQueueItem})=>{



    const [queueName,setQueueName] = useState("")

    const setForm = (e)=>{
        setQueueName(e.target.value)
    }

    const submitForm = ()=>{
        const variables = {
            name:queueName,
            userId,
            date
        }
        console.log(variables)
        addQueueItem({variables})
    }


    return(
    <div>
    <input onChange={setForm} type="text"></input>
    <button onClick={submitForm}>Add to Queue</button>
    </div>)
}

export default AddQueueItemComp