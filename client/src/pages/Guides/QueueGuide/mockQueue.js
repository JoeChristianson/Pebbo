import AddQueueItemComp from "../../../components/AddQueueItem"
import QueueList from "../../../components/QueueList";
import SimpleInput from "../../../components/simpleInput";
import { useState } from "react";
import "../../Queue/index.css"
import mockQueueData from "./mockQueueData.ts"


function Queue({highlight}){

    const [queueData,setQueueData] = useState(mockQueueData)
    const [item,setItem] = useState("")
    const userId = null;
    const refetch = ()=>{}

    const handleChange = (e)=>{
        console.log("changin");
        setItem(e.target.value)
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const newQueueData = [...queueData];
        const newItem = {id:newQueueData.length+1,isComplete:false,ordinal:newQueueData.length+1,queueItem:{name:item},attempts:1,successes:0}
        setQueueData([...newQueueData,newItem])
    }

    const handleComplete = async (e)=>{
        const {name} = e.target.dataset
        console.log(name);
        const newQueueData = [...queueData];

        const item = newQueueData.find(q=>q.queueItem.name==name)
        item.isComplete = !item.isComplete
        item.successes+=item.isComplete?1:-1
        setQueueData(newQueueData)
    }

    const reorderQueue = ({oldOrdinal,newOrdinal})=>{
        try{

            const newQueueData = [...queueData];
            const movedItem = newQueueData.find(q=>q.ordinal===oldOrdinal)
            for (let item of newQueueData){
                const ordinal = item.ordinal
                if(ordinal<oldOrdinal&&ordinal<newOrdinal){
                    continue
                }else if( ordinal>oldOrdinal&&ordinal>newOrdinal){
                    continue
                }else if(ordinal>oldOrdinal&&ordinal<=newOrdinal){
                    item.ordinal-=1
                }else if(ordinal<oldOrdinal&&ordinal>=newOrdinal){
                    item.ordinal+=1
                }
            }
            movedItem.ordinal = newOrdinal
            setQueueData(newQueueData)
        }catch(err){
            return
        }
        }
        
        console.log(queueData);
    return(
        <main className="main-queue-section">
        <h1>Queue</h1>
        <SimpleInput highlight={highlight} handleChange={handleChange} handleSubmit={handleSubmit} text={item}
        formClass="inline-form"
        />
        <QueueList highlight={highlight} reorderQueue={reorderQueue} setHideHeader={()=>{}} refetch={refetch} userId={userId} handleComplete={handleComplete} queue={queueData}></QueueList>

        </main>
    )
}

export default Queue