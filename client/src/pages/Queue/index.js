import AddQueueItemComp from "../../components/AddQueueItem"
import { GET_QUEUE } from "../../utils/queries";
import QueueList from "../../components/QueueList";
import SimpleInput from "../../components/simpleInput";
import { useState } from "react";
const {useQuery, useMutation} = require("@apollo/client")
const {ADD_QUEUE_ITEM} = require("../../utils/mutations")

function Queue({userId,date}){
    console.log("nfo",userId,date)
    const [addQueueItem,{data:queueItemData,loading:queueItemLoading,error:queueAddError}] = useMutation(ADD_QUEUE_ITEM);
    const {loading,error,data:queueData,refetch} = useQuery(GET_QUEUE,{
        variables:{userId,date}
    })
    const [item,setItem] = useState("")
    const handleChange = (e)=>{
        setItem(e.target.value)
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        await addQueueItem({variables:{
            name:item,userId,date
        }})
        refetch()
    }
    console.log("queueData",queueData)
    return(
        <>
        <SimpleInput handleChange={handleChange} handleSubmit={handleSubmit} text={item}/>
        {!loading?<QueueList queue={queueData?.getDailyQueue}></QueueList>:null
        }
        </>
    )
}

export default Queue