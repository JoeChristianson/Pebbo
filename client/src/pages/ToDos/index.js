import {useQuery,useMutation} from "@apollo/client"
import { GET_TO_DOS } from "../../utils/queries"
import SimpleInput from "../../components/simpleInput"
import {useState} from "react"
import {ADD_NOTE_TO_TO_DO, ADD_SUBTASK, ADD_TO_DO,COMPLETE_TO_DO,COMPLTE_SUBTASK,DELETE_TO_DO, PRIORITIZE_TO_DO} from "../../utils/mutations"
import {formatToday} from "../../utils/date"
import { Modal } from "../../components/Modal"
import FormElement from "../../components/generics/Form"
import { ToDo } from "../../components/ToDo"
import { EditField } from "../../components/generics/EditField"
import "./index.css"
import {Fireworks} from "fireworks/lib/react"

function ToDos({userId,mockToDos,refetchDash,onDash,setHideHeader,highlight,end}){
 
    let fxProps = {
        count: 3,
        interval: 200,
        colors: ['#cc3333', '#4CAF50', '#81C784'],
        calc: (props, i) => ({
          ...props,
          x: (i + 1) * (window.innerWidth / 3) - (i + 1) * 100,
          y: 200 + Math.random() * 100 - 50 + (i === 2 ? -80 : 0)
        })
      }
    
    const [fireworksOn,setFireworksOn] = useState(false)

    const [newToDo,setNewToDo] = useState("") 
    let {loading,data,refetch} = useQuery(GET_TO_DOS,{variables:{
        userId
    }})

    
    data = data || {getToDos:[]}
    const [addToDo,{data:newData,loading:newLoading,error}]=useMutation(ADD_TO_DO)    
    const [completeToDo,{data:completedData,loading:completedLoading,error:completedError}] = useMutation(COMPLETE_TO_DO);
    const [prioritizeToDo,{data:prioritizeData,loading:prioritizeLoading,error:prioritizeError}] = useMutation(PRIORITIZE_TO_DO)

    const [deleteToDo,{data:deleteData,loading:deleteLoading,error:deleteError}] = useMutation(DELETE_TO_DO)
    const [modalOpen,setModalOpen] = useState(false)
    const [dataId,setDataId] = useState(null)
    const [modalInput,setModalInput] = useState({name:""})
    const [subTasks,setSubtasks] = useState([])

    const handleComplete = async (e)=>{  
        try{
            const {id:toDoId} = e.target.dataset
            await completeToDo({variables:{
                userId,toDoId,date:formatToday()
            }})
            setFireworksOn(true);
            setTimeout(()=>setFireworksOn(false),1000)
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
        if(highlight){
            console.log("adding mock to do")
            return
        }
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
        const newSubTasks = data.getToDos.find(td=>td._id===id).subTasks
        setSubtasks(newSubTasks)
        setHideHeader(true)
    }

    const updateSubtasks = ()=>{
        const newSubTasks = data.getToDos.find(td=>td._id===dataId).subTasks;
        setSubtasks(newSubTasks)
    }

    let topPriority = 0;

    const handlePrioritize = async (e)=>{
        const toDoId = e.target.dataset.id
        const variables = {userId,toDoId,priority:(topPriority+1)};
        await prioritizeToDo({variables});
        setModalOpen(false)
        refetch()
        refetchDash()
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
        <div className="flex">
                    {fireworksOn&&<Fireworks {...fxProps} />}
        <main className="main-section">
            <h1>To Dos</h1>
        <SimpleInput         formClass="inline-form" text={newToDo} handleChange={handleChange} handleSubmit={handleSubmit}/>
        <div className="list">

        {sortedToDos.
        map((t,i)=>{
            try{

                if(!t.toDoForm?.name){
                    return(null)
                }
                return (<div className="list-item" key={i}>
                <span onClick={openThisModal}  data-id={t._id} data-name={t.toDoForm.name} >{t.toDoForm.name}</span><button data-id={t._id} onClick={handleComplete}></button>
            </div>)
            }catch(err){
                console.error(err)
            }
        })}
        </div>
        </main>
        {modalOpen?<Modal onDash={onDash} handlePrioritize={handlePrioritize} setModalOpen={setModalOpen} modalInput={modalInput} handleDelete={handleDelete} dataId={dataId} >
        <SubTasks update={updateSubtasks} userId={userId} toDoId={dataId} subTasks={subTasks} refetch={refetch}></SubTasks>
        <ToDoNotes refetch={refetch} userId={userId} toDo={sortedToDos.find(s=>s._id===dataId)}></ToDoNotes>
        </Modal>:null}

        </div>
    )
}

const SubTasks = ({userId,toDoId,subTasks,refetch,update})=>{
    const [subtaskList,setSubtaskList] = useState(subTasks)
    const [addSubTask,{error:addError}] = useMutation(ADD_SUBTASK)
    const [completeSubTask,{data:cData,error:cError,loading:cLoading}]=useMutation(COMPLTE_SUBTASK)
    const [text,setText] = useState("")
    const handleFormInputChange = (e)=>{
        setText(e.target.value)
    }
    const handleFormSubmit = async (e)=>{
        e.preventDefault()
        const variables = {
            userId,toDoId,date:formatToday(),name:text
        }
        const data = await addSubTask({variables})
        setSubtaskList([...subtaskList,data.data.addSubTask])
        setText("")
        update()
        refetch()
    }
    const handleComplete = async (e)=>{
        const subtaskId = e.target.dataset.id
        const variables = {toDoId,subtaskId,userId,date:formatToday()}
        const res = await completeSubTask({variables})
        const newSubtasksList = subTasks.filter(s=>s._id!==subtaskId)
        setSubtaskList(newSubtasksList)
        update()
        refetch()
    }

    return(
        <div className="modal-comp-cont">
        <h2>
            Sub-Tasks
        </h2>
        <FormElement formInputs={[{name:"text",label:"text"}]} formInputValues={{text}}
        handleFormSubmit={handleFormSubmit}
        handleFormInputChange={handleFormInputChange}
        formClass="inline-form"
        submitButtonText="Add"
        />
        <div className="subtask-list">

        {subtaskList.filter(s=>!s.dateDone).map((subTask,key)=>{
            return <ToDo key={key} toDo={subTask} handleComplete={handleComplete}></ToDo>
        })}
        </div>
        </div>
    )
}

const ToDoNotes = ({userId,toDo,refetch})=>{
    const [note,setNote] = useState(toDo.notes||"")
    const [addNote,{data,error,loading}] = useMutation(ADD_NOTE_TO_TO_DO)
    const saveHandler = async (text)=>{
        const variables = {userId,toDoId:toDo._id,note:text}
        await addNote({variables})
        setNote(text)
        refetch()
    }

    return(<div className="modal-comp-cont">
        <h2>Notes</h2>
        <EditField mutation={saveHandler} text={note}
        buttonClass="no-background-or-border"
        ></EditField>
    </div>)
}

export default ToDos