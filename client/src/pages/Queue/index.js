
import { GET_QUEUE } from "../../utils/queries";
import QueueList from "../../components/QueueList";
import SimpleInput from "../../components/simpleInput";
import { useEffect, useState } from "react";
import { formatToday } from "../../utils/date";
import "./index.css"
import getMaxByProperty from "../../utils/getMaxByProperty";
import { setElementProperty } from "../../utils/stateFunctions.ts";
const {useQuery, useMutation} = require("@apollo/client")
const {ADD_QUEUE_ITEM,COMPLETE_QUEUE_ITEM, REORDER_QUEUE} = require("../../utils/mutations")

function Queue({userId,date,refetchDash,setHideHeader}){
    const queueQuery = useQuery(GET_QUEUE,{
        variables:{userId,date:formatToday()}
})    
    const [addQueueItem,{data:queueItemData,loading:queueItemLoading,error:queueAddError}] = useMutation(ADD_QUEUE_ITEM);
    const [completeQueueItem,{data:completeData,loading:completeLoading,error:completeError}] = useMutation(COMPLETE_QUEUE_ITEM)
    const {loading,error,data:initialQueueData,refetch} = queueQuery
    const [reorderMutation,{}]=useMutation(REORDER_QUEUE)
    const [item,setItem] = useState("")
    const handleChange = (e)=>{
        setItem(e.target.value)
    }
    const [queueData,setQueueData] = useState([])

    useEffect(()=>{
        setQueueData(initialQueueData?.getDailyQueue||[])
    },[initialQueueData])

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setItem("")
        const newQueueItem = {attempts:1,successes:0,isComplete:false,isOn:true,note:"",ordinal:(getMaxByProperty(queueData,"ordinal")+1),skips:0,queueItem:{name:item}}
        setQueueData([...queueData,newQueueItem])
        addQueueItem({variables:{
            name:item,userId,date
        }})
        refetchDash()
    }

    const handleComplete = async (e)=>{
        e.stopPropagation()
        const {name} = e.target.dataset
        const item = queueData.find(i=>i.queueItem.name===name)
        const successCount = item.isComplete?item.successes-1:item.successes+1
        const newQueue = setElementProperty(queueData,setQueueData,item,"queueItem.name",name,"isComplete",(item.isComplete?false:true),true)
        setElementProperty(newQueue,setQueueData,item,"queueItem.name",name,"successes",successCount)
        const variables = {userId,name,date:formatToday()}
        const resp = await completeQueueItem({variables})
        refetchDash()
    }

    const reorderQueue = ({oldOrdinal,newOrdinal})=>{
        try{
            const newQueueData = [...queueData];
            const movedItem = {...newQueueData.find(q=>q.ordinal===oldOrdinal)}
            let result = []
            for (let item of newQueueData){
                item = {...item}
                const ordinal = item.ordinal
                if(item.ordinal===oldOrdinal){
                    item.ordinal = newOrdinal
                }
                else if(ordinal<oldOrdinal&&ordinal<newOrdinal){
                    result.push(item)
                    continue
                }else if( ordinal>oldOrdinal&&ordinal>newOrdinal){
                    result.push(item)
                    continue
                }else if(ordinal>oldOrdinal&&ordinal<=newOrdinal){
                    item.ordinal-=1
                }else if(ordinal<oldOrdinal&&ordinal>=newOrdinal){
                    item.ordinal+=1
                }
                result.push(item)
            }
            console.log(result);
            setQueueData(result)
            reorderMutation({variables:{userId,oldOrdinal,newOrdinal}})
        }catch(err){
            console.log(err);
            return
        }
        }



    return(
        <div className="card tall">
            <h2>Queue</h2>
        <section className="dash-section">
            <div className="flex">
              <div className="main-section">
                  <div className="form-cont">

        <SimpleInput handleChange={handleChange} handleSubmit={handleSubmit} text={item}
        formClass="inline-form"
        />
        </div>
        <div className="form-body">

        {!loading?<QueueList reorderQueue={reorderQueue} setHideHeader={setHideHeader} refetch={refetch} userId={userId} handleComplete={handleComplete} queue={queueData} setQueue={setQueueData}></QueueList>:null
        }
        </div>
        </div>  
        </div>
        </section>
        </div>
    )
}

export default Queue