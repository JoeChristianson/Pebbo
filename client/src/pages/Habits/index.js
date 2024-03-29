import AddHabitComp from "../../components/AddHabit"
import "./habits.css"
import { Modal } from "../../components/Modal"
// import { useQuery } from '@apollo/client';
const {useState} = require("react")
const HabitDay = require("../../components/HabitDay").default
const {useQuery,useMutation} = require("@apollo/client")
const SubNav = require("../../components/SubNav").default
const {TOGGLE_IS_COMPLETE, DELETE_HABIT, MAKE_HABIT_PERMANENT} = require("../../utils/mutations")
const {formatToday} = require("../../utils/date")
const auth = require("../../utils/auth").default

function Habits({refetchDash,dayLoading,dayData,refetchDay,setHideHeader}){
    console.log(dayData);
    const userId = auth.getProfile().data._id
    const date = formatToday()
    const [modalOpen,setModalOpen] = useState(false)
    const [dataId,setDataId] = useState(null)
    const [modalInput,setModalInput] = useState({name:""})
    const [deleteHabit,{data:deleteData,loading:deleteLoading,error:deleteError}] = useMutation(DELETE_HABIT)

    const [toggleIsComplete,{data:toggleData,loading:toggleLoading,error:toggleError}] = useMutation(TOGGLE_IS_COMPLETE)
    const [makeHabitPermanent,{}] = useMutation(MAKE_HABIT_PERMANENT)
    let data = null;

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
        // setHideHeader(true)
    }

    const handleDelete = async (e)=>{
        const {id} = e.target.dataset
        const variables = {userId,habitId:id,date,date:formatToday()};
        await deleteHabit({variables})
        refetchDay()
        setModalOpen(false)
    }

    const handleMakePermanent = async ()=>{
        const variables = {userId,habitId:dataId}
        const res = await makeHabitPermanent({variables})
        console.log(res);
    }

    if(dayLoading){
        return(<h1>Loading</h1>)
    }

    if(data){
        return(
            <div className="card tall habits">
            <h2>Habits</h2>
            <section className="module">
                <div>

            <SubNav options={options} handleSubMenu={handleSubMenu}></SubNav>
            <section className="dash-section">
                {subsection==="active"?data.filter(h=>{
                    return h.isOn===true
                }).map((habitDay,index)=>{
                    return(<HabitDay key={index} handleComplete={handleComplete} habitDay={habitDay} openThisModal={openThisModal}></HabitDay>)
                }):null}
                    {subsection==="add"?<AddHabitComp refetchDay={refetchDay} userId={userId}/>:null}
                {(subsection==="all"||subsection==="add")?data.map((habitDay,index)=>{
                    return(<HabitDay key={index} openThisModal={openThisModal} handleComplete={handleComplete} habitDay={habitDay}></HabitDay>)
                }):null}
            </section>
                </div>
            {modalOpen?<Modal  setModalOpen={setModalOpen} modalInput={modalInput} handleDelete={handleDelete} dataId={dataId}
            additionalButtons={[<button onClick={handleMakePermanent}>Make Permanent!</button>]}
            >
                
            </Modal>:null}
        </section>
                </div>
    )
}
}

export default Habits