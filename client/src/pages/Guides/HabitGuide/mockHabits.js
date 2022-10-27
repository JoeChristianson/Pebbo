import AddHabitComp from "./addHabitDemo"
import "../../Habits/habits.css"
import { Modal } from "../../../components/Modal"
import "./index.css"
const {useState} = require("react")
const HabitDay = require("../../../components/HabitDay").default
const SubNav = require("../../../components/SubNav").default


function Habits({highlight,initialHabitDays}){

    const [modalOpen,setModalOpen] = useState(false)
    const [dataId,setDataId] = useState(null)
    const [modalInput,setModalInput] = useState({name:""})

    const [habitDays,setHabitDays] = useState(initialHabitDays)

    const handleComplete= async (e)=>{

        const {habitDayId} = e.target.dataset
        const newHabitDays = [...habitDays];
        const habit = newHabitDays.find(h=>h.habit._id==habitDayId)
        habit.isComplete = !habit.isComplete
        setHabitDays(newHabitDays)
    }

    const [subsection,setSubsection] = useState("active")
    const options = ["active","all","add"]
    
    const handleSubMenu = (e)=>{
        const choice = e.target.dataset.option
        setSubsection(choice)
    }

    const addQueueItem = ()=>{

    }

    const openThisModal = (e)=>{
        const {id} = e.target.dataset;
        setDataId(id)
        setModalOpen(true)
        setModalInput({name:e.target.dataset.name})
        // setHideHeader(true)
    }

    const handleDelete = async (e)=>{
        const {id} = e.target.dataset

        setModalOpen(false)
    }

    const handleMakePermanent = ()=>{
        
    }

    const addHabit = (text)=>{
        const newHabit = {isComplete:false,isOn:false,habit:{_id:habitDays.length+1,name:text}}
        setHabitDays([...habitDays,newHabit])
    }

    if(habitDays){
        return(
            <>
                <h1>Habits</h1>
            <section className="module">
                <div>

            <SubNav highlight={highlight} options={options} handleSubMenu={handleSubMenu}></SubNav>
            <section className="dash-section">
                {subsection==="active"?habitDays.filter(h=>{
                    return h.isOn===true
                }).map((habitDay,index)=>{
                    return(<HabitDay highlight={highlight} key={index} handleComplete={handleComplete} habitDay={habitDay} openThisModal={openThisModal}></HabitDay>)
                }):null}
                    {subsection==="add"?<AddHabitComp addQueueItem={addHabit}/>:null}
                {(subsection==="all"||subsection==="add")?habitDays.map((habitDay,index)=>{
                    return(<HabitDay highlight={highlight} key={index} openThisModal={openThisModal} handleComplete={handleComplete} habitDay={habitDay}></HabitDay>)
                }):null}
            </section>
                </div>
            {modalOpen?<Modal setModalOpen={setModalOpen} modalInput={modalInput} handleDelete={handleDelete} dataId={dataId}>
                <button onClick={handleMakePermanent}>Make Permanent!</button>
            </Modal>:null}
        </section>
                </>
    )
}
}

export default Habits