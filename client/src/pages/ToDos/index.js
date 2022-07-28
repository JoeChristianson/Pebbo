import {useQuery,useMutation} from "@apollo/client"
import { GET_TO_DOS } from "../../utils/queries"
import SimpleInput from "../../components/simpleInput"
import {useState} from "react"
import {ADD_TO_DO,COMPLETE_TO_DO,DELETE_TO_DO, PRIORITIZE_TO_DO} from "../../utils/mutations"
import {formatToday} from "../../utils/date"
import { Modal } from "../../components/Modal"

function ToDos({userId}){
 
    const [newToDo,setNewToDo] = useState("") 
    const {loading,data,refetch} = useQuery(GET_TO_DOS,{variables:{
        userId
    }})
    const [addToDo,{data:newData,loading:newLoading,error}]=useMutation(ADD_TO_DO)    
    const [completeToDo,{data:completedData,loading:completedLoading,error:completedError}] = useMutation(COMPLETE_TO_DO);
    const [prioritizeToDo,{data:prioritizeData,loading:prioritizeLoading,error:prioritizeError}] = useMutation(PRIORITIZE_TO_DO)

    const [deleteToDo,{data:deleteData,loading:deleteLoading,error:deleteError}] = useMutation(DELETE_TO_DO)
    const [modalOpen,setModalOpen] = useState(false)
    const [dataId,setDataId] = useState(null)
    const [modalInput,setModalInput] = useState({name:""})

    const handleComplete = async (e)=>{  
        try{
            const {id:toDoId} = e.target.dataset
            await completeToDo({variables:{
                userId,toDoId,date:formatToday()
            }})
            refetch()
        } catch(err){
            console.error(err)
        }
    }
    
    const handleChange = (e)=>{
        setNewToDo(e.target.value)
    }

    const handleSubmit = async (e)=>{
        e.preventDefault()
        await addToDo({variables:{
            creator:userId,name:newToDo,date:formatToday()
        }})
        setNewToDo("")
        refetch()
    }
    
    const openThisModal = (e)=>{
        const {id} = e.target.dataset;
        setDataId(id)
        setModalOpen(true)
        setModalInput({name:e.target.dataset.name})
    }
    let topPriority = 0;

    const handlePrioritize = async (e)=>{
        const toDoId = e.target.dataset.id
        const variables = {userId,toDoId,priority:(topPriority+1)};
        await prioritizeToDo({variables});
        setModalOpen(false)
        refetch()
    }

    const handleDelete = async (e)=>{
        const toDoId = e.target.dataset.id
        const variables = {userId,toDoId};
        await deleteToDo({variables})
         setModalOpen(false)
        refetch()
    }



    if(loading){
        return(<h1>Loading</h1>)
    }
    const sortedToDos = data.getToDos.map(t=>{
        return t.priority?t:{...t,priority:0}
    }).sort((a,b)=>{
        topPriority = Math.max(topPriority,a.priority,b.priority)
        return(b.priority-a.priority)
    })




    return(
        <main className="main-section">
        <section>
            ToDos
        </section>
        <SimpleInput text={newToDo} handleChange={handleChange} handleSubmit={handleSubmit}/>
        <div className="list">

        {sortedToDos.
        map((t,i)=>{
            try{

                if(!t.toDoForm?.name){
                    return(<></>)
                }
                return (<div className="list-item" key={i}>
                <span onClick={openThisModal}  data-id={t._id} data-name={t.toDoForm.name} >{t.toDoForm.name}</span><button data-id={t._id} onClick={handleComplete}></button>
            </div>)
            }catch(err){
                console.error(err)
            }
        })}
        </div>
        {modalOpen?<Modal handlePrioritize={handlePrioritize} setModalOpen={setModalOpen} modalInput={modalInput} handleDelete={handleDelete} dataId={dataId} />:null}
        </main>
    )
}

export default ToDos