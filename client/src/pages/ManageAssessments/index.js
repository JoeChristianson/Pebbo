import { useQuery,useMutation } from "@apollo/client"
import { GET_ALL_USERS_ASSESSMENTS } from "../../utils/queries"
import { useState } from "react"
import { ADD_ASSESSMENT,DELETE_ASSESSMENT } from "../../utils/mutations"
import { Modal } from "../../components/Modal"
import "./manageAssessments.css"
// import pieData from "../../fakeData/pieData.json"
import onOffData from "../../fakeData/onOffComparison.json"
import PieChart from "../../components/Graphs/PieChart/index.tsx"
import BarGraph from "../../components/Graphs/BarGraph/index.tsx"
import HabitAssessmentBars from "../../components/Analyses/HabitAssessmentBars/index.tsx"

export const ManageAssessments = ({userId})=>{

    const {data,loading,error,refetch} = useQuery(GET_ALL_USERS_ASSESSMENTS,{variables:{userId}})

    const [newAssessment,setNewAssessment] = useState({name:"",metric:"boolean"})
    const [addAssessment,{data:addData,loading:addLoading,error:addError}]=useMutation(ADD_ASSESSMENT)
    const [deleteAssessment,{}] = useMutation(DELETE_ASSESSMENT)
    const [modalOpen,setModalOpen] = useState(false)
    const [newOpen,setNewOpen] = useState(false)
    const [pieData,setPieData]= useState(null)
    const [barData,setBarData] = useState(onOffData)
    const [currentAssessment,setCurrentAssessment] = useState(false)
    const handleAddChange = (e)=>{
        const key = e.target.dataset.key;
        const value = e.target.value
        const change = {...newAssessment,[key]:value}
        setNewAssessment(change)
    }

    const handleAddSubmit = async ()=>{
        const variables = {...newAssessment,userId}
        await addAssessment({variables})
        refetch()
    }

    const handleDelete = async (e)=>{
        const variables = {userId,assessmentId:e.target.dataset._id};
        await deleteAssessment({variables})
        refetch()
    }

    const openExistingAssessment = (e)=>{
        const assessment = data.getAllUsersAssessments[e.target.dataset.index];
        setModalOpen(assessment)
    }

    const openNewAssessment = ()=>{
        setNewOpen(true)
    }

    const closeModal = ()=>{
        setModalOpen(false)
    }

    const graphAssessment = (e)=>{
        const assessment = data.getAllUsersAssessments[e.target.dataset.index];
    }

    const select = (e)=>{
        const assessment = data.getAllUsersAssessments[e.target.dataset.index];
        return setCurrentAssessment(assessment)
    }

    if(loading){
        return(<h1>Loading</h1>)
    }
    return(
        <>
        <main className="main-section assessments">
            <section className="assessment-left">
                <div className="list">
                    <div className="assessment-item">
                    <button onClick={openNewAssessment}>Add Assessment</button>
                    </div>
                    {data.getAllUsersAssessments.map((a,i)=>{
                        return (<div key={i} className="assessment-item" ><span  onClick={select} data-index={i}>
                            {a.name}
                            </span>
                            <i onClick={openExistingAssessment} data-index={i}>e</i>
                            </div>)
                    })}
                </div>
            </section>
            <section className="assessment-right">
                    {pieData===null?null:<PieChart
                    data={pieData}
                    />}

                    {!currentAssessment?null:(
                        <HabitAssessmentBars userId={userId} assessment={currentAssessment}></HabitAssessmentBars>
                    )}
            </section>



            </main>
            {
            modalOpen===false?null:

                <Modal
                userId={userId}
                modalInput={modalOpen}
                onDash={true}
                setModalOpen={setModalOpen}
                >
                    <h3>{modalOpen.metric}</h3>
                </Modal>
            }
                        {
            newOpen===false?null:

                <Modal
                userId={userId}
                modalInput={modalOpen}
                onDash={true}
                setModalOpen={setNewOpen}
                >
                            <section className="add-assessment">
            <input onChange={handleAddChange} data-key="name" placeholder="Assessment Name"></input>
            <select onChange={handleAddChange} data-key="metric">
            <option value="boolean">Pass/Fail</option>
            <option value="grade">Grade</option>
            <option value="quantity">Quantity</option>
            </select>
            <button onClick={handleAddSubmit}>Add Assessment</button>
            </section>
                </Modal>
            }
                </>
        
    )
}