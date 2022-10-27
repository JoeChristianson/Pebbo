import { useState } from "react"
import { Modal } from "../../../components/Modal"
import "./manageAssessments.css"
// import pieData from "../../fakeData/pieData.json"
import onOffData from "../../../fakeData/onOffComparison.json"
import PieChart from "../../../components/Graphs/PieChart/index.tsx"
import BarGraph from "../../../components/Graphs/BarGraph/index.tsx"
import HabitAssessmentBars from "./HabitAssessmentBars/index.tsx"
import initialAssessments from "./mockAssessmentData.ts"


export const ManageAssessments = ({highlight})=>{
    console.log("initial",initialAssessments);
    const [assessments,setAssessments] = useState(initialAssessments)
    console.log("After setting",assessments);
    const [newAssessment,setNewAssessment] = useState({name:"",metric:"boolean"})
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

    const handleAddSubmit = async (e)=>{
        e.preventDefault()
        setAssessments([...assessments,newAssessment])
        setNewOpen(false)
    }

    const handleDelete = async (e)=>{

    }

    const openExistingAssessment = (e)=>{
        const assessment = assessments[e.target.dataset.index];
        setModalOpen(assessment)
    }

    const openNewAssessment = ()=>{
        setNewOpen(true)
    }

    const closeModal = ()=>{
        setModalOpen(false)
    }

    const graphAssessment = (e)=>{
        const assessment = assessments[e.target.dataset.index];
    }

    const select = (e)=>{
        const assessment = assessments[e.target.dataset.index];
        return setCurrentAssessment(assessment)
    }
console.log(currentAssessment);
    return(
        <>
        <main className="main-section assessments">
            <section className="assessment-left">
                <div className="list">
                    <div className="assessment-item">
                    <button className={`${highlight==="add-button"?'highlight':''}`} onClick={openNewAssessment}>Add Assessment</button>
                    </div>
                    <div className={`assessment-list-cont ${highlight==="assessment-list-cont"?'child-highlight':''}`}>

                    {assessments.map((a,i)=>{
                        return (<div key={i} className="assessment-item" ><span  onClick={select} data-index={i}>
                            {a.name}
                            </span>
                            <i  className={` ${highlight==="edit-btn"?'highlight':''}`} onClick={openExistingAssessment} data-index={i}>e</i>
                            </div>)
                    })}
                    </div>
                </div>
            </section>
            <section className={`assessment-right ${highlight==="main-graph-area"?"inner-highlight":""}`}>
                    {pieData===null?null:<PieChart
                    data={pieData}
                    />}

                    {!currentAssessment?null:(
                        <HabitAssessmentBars highlight={highlight} assessmentName={currentAssessment.name}></HabitAssessmentBars>
                    )}
            </section>



            </main>
            {
            modalOpen===false?null:

                <Modal
                highlight={highlight}
                userId={null}
                modalInput={modalOpen}
                onDash={true}
                setModalOpen={setModalOpen}
                handleDelete={handleDelete}
                >
                    <h3>{modalOpen.metric}</h3>
                </Modal>
            }
                        {
            newOpen===false?null:

                <Modal
                highlight={highlight}
                userId={null}
                modalInput={modalOpen}
                onDash={true}
                setModalOpen={setNewOpen}
                >
                            <section className="add-assessment">
            <input className={`${highlight==="assessment-name"?"highlight":""}`} onChange={handleAddChange} data-key="name" placeholder="Assessment Name"></input>
            <select className={`${highlight==="assessment-metric"?"highlight":""}`}  onChange={handleAddChange} data-key="metric">
            <option value="boolean">Pass/Fail</option>
            <option value="grade">Grade</option>
            <option value="quantity">Quantity</option>
            </select>
            <button className={`${highlight==="assessment-button"?"highlight":""}`} onClick={handleAddSubmit}>Add Assessment</button>
            </section>
                </Modal>
            }
                </>
        
    )
}