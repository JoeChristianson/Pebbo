import AddQueueItemComp from "../../components/AddQueueItem"
import { GET_QUEUE } from "../../utils/queries";
import QueueList from "../../components/QueueList";
import SimpleInput from "../../components/simpleInput";
import { useState } from "react";
import { formatToday } from "../../utils/date";
const {useQuery, useMutation} = require("@apollo/client")
const {ADD_QUEUE_ITEM,COMPLETE_QUEUE_ITEM} = require("../../utils/mutations")

function Queue({userId,date}){
    console.log("nfo",userId,date)
    const [addQueueItem,{data:queueItemData,loading:queueItemLoading,error:queueAddError}] = useMutation(ADD_QUEUE_ITEM);
    const [completeQueueItem,{data:completeData,loading:completeLoading,error:completeError}] = useMutation(COMPLETE_QUEUE_ITEM)
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

    const handleComplete = async (e)=>{
        const {name} = e.target.dataset
        const variables = {userId,name,date:formatToday()}
        const resp = await completeQueueItem({variables})
        console.log(resp)
        refetch()
    }
    return(
        <>
        <SimpleInput handleChange={handleChange} handleSubmit={handleSubmit} text={item}/>
        {!loading?<QueueList handleComplete={handleComplete} queue={queueData?.getDailyQueue}></QueueList>:null
        }
        </>
    )
}

export default Queue