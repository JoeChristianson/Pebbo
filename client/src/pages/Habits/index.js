import AddHabitComp from "../../components/AddHabit"
import "./habits.css"
import { Modal } from "../../components/Modal"
// import { useQuery } from '@apollo/client';
const {useState} = require("react")
const HabitDay = require("../../components/HabitDay").default
const {useQuery,useMutation} = require("@apollo/client")
const SubNav = require("../../components/SubNav").default
const {QUERY_DAY} = require("../../utils/queries")
const {TOGGLE_IS_COMPLETE} = require("../../utils/mutations")
const {formatToday} = require("../../utils/date")
const auth = require("../../utils/auth").default

function Habits({refetchDash,dayLoading,dayData,refetchDay}){
    const userId = auth.getProfile().data._id
    const date = formatToday()
    const [modalOpen,setModalOpen] = useState(false)
    const [dataId,setDataId] = useState(null)
    const [modalInput,setModalInput] = useState({name:""})


    const [toggleIsComplete,{data:toggleData,loading:toggleLoading,error:toggleError}] = useMutation(TOGGLE_IS_COMPLETE)

    let data = null;
    if (dayLoading){
    }
    // if(error){
    //     console.error(error)
    // }

    if(!dayLoading){
        data = dayData.getDay.habitDays
    }


    const [habitDays,setHabitDays] = useState(data)

    const handleComplete= async (e)=>{

        await toggleIsComplete({variables:{userId,date,habitDayId:e.target.dataset.habitDayId}})
        await refetchDay()
        await refetchDash()
    }

    const [subsection,setSubsection] = useState("active")
    const options = ["active","all","add"]
    
    const handleSubMenu = (e)=>{
        const choice = e.target.dataset.option
        setSubsection(choice)
    }

    const openThisModal = (e)=>{
        const {id} = e.target.dataset;
        setDataId(id)
        setModalOpen(true)
        setModalInput({name:e.target.dataset.name})
    }

    const handleDelete = (e)=>{
        const {id} = e.target.dataset
    }

    if(dayLoading){
        return(<h1>Loading</h1>)
    }

    if(data){
        return(
            <section className="module">
            <SubNav options={options} handleSubMenu={handleSubMenu}></SubNav>
            <section className="module">
                {subsection==="active"?data.filter(h=>{
                    return h.isOn===true
                }).map((habitDay,index)=>{
                    return(<HabitDay key={index} handleComplete={handleComplete} habitDay={habitDay} openThisModal={openThisModal}></HabitDay>)
                }):null}
                    {subsection==="add"?<AddHabitComp refetchDay={refetchDay} userId={userId}/>:null}
                {(subsection==="all"||subsection==="add")?data.map((habitDay,index)=>{
                    return(<HabitDay key={index} handleComplete={handleComplete} habitDay={habitDay}></HabitDay>)
                }):null}
            </section>
            {modalOpen?<Modal setModalOpen={setModalOpen} modalInput={modalInput} handleDelete={handleDelete} dataId={dataId} />:null}
        </section>
    )
}
}

export default Habits