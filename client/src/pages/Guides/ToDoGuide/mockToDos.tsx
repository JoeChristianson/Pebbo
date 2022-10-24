import {useQuery,useMutation} from "@apollo/client"
import { GET_TO_DOS } from "../../../utils/queries"
import SimpleInput from "../../../components/simpleInput"
import {useEffect, useState} from "react"
import { Modal } from "../../../components/Modal"
import FormElement from "../../../components/generics/Form"
import { ToDo } from "../../../components/ToDo"
import { EditField } from "../../../components/generics/EditField"
import "../../../pages/ToDos/index.css"
import {Fireworks} from "fireworks/lib/react"

const initialToDos = [
    {_id:1,priority:1,toDoForm:{name:"Clean Garage"},notes:"",subtasks:[]}
]

type Props = {
    highlight:string,
    end:Function
}

function ToDos({highlight,end}:Props){
    
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
    
    const [toDos,setToDos] = useState(initialToDos)
    const [fireworksOn,setFireworksOn] = useState(false)

    const [newToDo,setNewToDo] = useState("") 
    const [modalOpen,setModalOpen] = useState(false)
    const [dataId,setDataId] = useState(null)
    const [modalInput,setModalInput] = useState({name:""})
    const [subTasks,setSubtasks] = useState([])
    console.log(subTasks,"subtasks");
    
    const handleComplete = async (e:Event)=>{  
        try{
            if (!(e.target instanceof HTMLButtonElement)) {
                return;
            }
            const {id:toDoId} = e?.target?.dataset
            const newToDos = [...toDos].filter(td=>td._id.toString()!==toDoId)
            setToDos(newToDos)
            //complete to Do Action
            setFireworksOn(true);
            setTimeout(()=>setFireworksOn(false),1000)
        } catch(err){
            console.error(err)
        }
    }
    
    const handleChange = (e)=>{
        setNewToDo(e.target.value)
    }

    const handleSubmit = async (e:Event)=>{
        e.preventDefault()
        
        // if (!(e.target instanceof FormElement)) {
        //     return;
        // }
        const newToDoObj = {_id:toDos[toDos.length-1]._id+1,priority:toDos[toDos.length-1].priority+1,toDoForm:{name:newToDo}}
      
        
        setToDos([...toDos,newToDoObj])        
        setNewToDo("")
    }
    
    const openThisModal = (e)=>{
        const {id} = e.target.dataset;
        
        setDataId(id)
        setModalOpen(true)
        setModalInput({name:e.target.dataset.name})
        // const newSubTasks = data.getToDos.find(td=>td._id===id).subTasks
        // setSubtasks(newSubTasks)
    }

    const updateSubtasks = (id,subTaskList)=>{

        const newToDos = [...toDos]
        const toDo = newToDos.find(td=>td._id==id)
        if(!toDo){
            return
        }        
        toDo.subtasks = [...subTaskList]
        setSubtasks(toDo.subtasks)
        
        setToDos(newToDos)
    }

    let topPriority = 0;

    const handlePrioritize = async (e)=>{
        const toDoId = e.target.dataset.id
        setModalOpen(false)
    }



    const handleDelete = async (e)=>{
        const toDoId = e.target.dataset.id

         setModalOpen(false)
    }

    
    const sortedToDos = toDos.map(t=>{
        return t.priority?t:{...t,priority:0}
    }).sort((a,b)=>{
        topPriority = Math.max(topPriority,a.priority,b.priority)
        return(b.priority-a.priority)
    })
    
    const handleToDoNotes = (e)=>{
    }

    const selected = sortedToDos.find(s=>{
        console.log(dataId);
        console.log(s._id);
        
        return (s._id.toString()==dataId)
    })

    console.log("this is the new one",sortedToDos);
    

    return(
        <div className="flex">
                    {fireworksOn&&<Fireworks {...fxProps} />}
        <main className="main-section">
            <h1>To Dos</h1>
        <SimpleInput  formClass={`inline-form ${highlight==="add"&&"highlight"}`} text={newToDo} handleChange={handleChange} handleSubmit={handleSubmit}/>
        <div className="list">

        {sortedToDos.
        map((t,i)=>{
            try{

                if(!t.toDoForm?.name){
                    return(null)
                }
                return (<div className="list-item" key={i}>
                <span className={`${highlight==="name"&&"highlight"}`} onClick={openThisModal}  data-id={t._id} data-name={t.toDoForm.name} >{t.toDoForm.name}</span><button className={`${highlight==="green"&&"highlight"}`} data-id={t._id} onClick={handleComplete}></button>
            </div>)
            }catch(err){
                console.error(err)
            }
        })}
        </div>
        </main>
        {selected?<Modal onDash={false} handlePrioritize={handlePrioritize} setModalOpen={()=>setDataId(null)} modalInput={modalInput} handleDelete={handleDelete} dataId={dataId} >
        <SubTasks update={updateSubtasks} toDoId={dataId} subTasks={subTasks}></SubTasks>
        <ToDoNotes toDo={selected}
        toDos={toDos} setToDos={setToDos}
        ></ToDoNotes>
        </Modal>:null}

        </div>
    )
}

const SubTasks = ({toDoId,subTasks,update})=>{
    console.log("here are the subtasks in it",subTasks);
    
    const [subtaskList,setSubtaskList] = useState(subTasks)
    
    useEffect(()=>{
        setSubtaskList([...subTasks])
    },[subTasks])
    console.log("subtaskList",subtaskList);
    
    const [text,setText] = useState("")
    const handleFormInputChange = (e)=>{
        setText(e.target.value)
    }
    const handleFormSubmit = async (e)=>{
        e.preventDefault()
        
        const newSubtask = {_id:(subtaskList?.[subtaskList.length-1]?._id+1)||1,priority:null,toDoForm:{name:text}}
        update(toDoId,[...subtaskList,newSubtask])
        setText("")
    }
    const handleComplete = async (e)=>{
        const id = e.target.dataset.id
        console.log(id);
        const newSubtasks = subTasks.filter(s=>s._id!=id)
        update(toDoId,newSubtasks)
        
        
        update()
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

        {(subtaskList||[]).filter(s=>!s.dateDone).map((subTask)=>{
            return <ToDo key={subTask._id} toDo={subTask} handleComplete={handleComplete}></ToDo>
        })}
        </div>
        </div>
    )
}

const ToDoNotes = ({toDo,toDos,setToDos})=>{
   
    const [note,setNote] = useState(toDo.notes||"")
    const saveHandler = (text)=>{
        const newToDos = [...toDos];
        const newToDo = newToDos.find(td=>td._id==toDo._id)
        newToDo.note = text;
        setNote(text)
        setToDos(newToDos)
    }

    return(<div className="modal-comp-cont">
        <h2>Notes</h2>
        <EditField mutation={saveHandler} text={note}
        buttonClass="no-background-or-border"
        ></EditField>
    </div>)
}

export default ToDos