import { useQuery,useMutation } from "@apollo/client"
import { GET_ALL_USERS_ASSESSMENTS } from "../../utils/queries"
import "./manageAssessments.css"
import { useState } from "react"
import { ADD_ASSESSMENT } from "../../utils/mutations"

export const ManageAssessments = ({userId})=>{
    const {data,loading,error,refetch} = useQuery(GET_ALL_USERS_ASSESSMENTS,{variables:{userId}})
    const [newAssessment,setNewAssessment] = useState({name:"",metric:"boolean"})
    const [addAssessment,{data:addData,loading:addLoading,error:addError}]=useMutation(ADD_ASSESSMENT)

    const handleAddChange = (e)=>{
        const key = e.target.dataset.key;
        const value = e.target.value
        const change = {...newAssessment,[key]:value}
        setNewAssessment(change)
    }

    const handleAddSubmit = async ()=>{
        console.log("in it")
        const variables = {...newAssessment,userId}
        await addAssessment({variables})
        refetch()
    }

    if(loading){
        return(<h1>Loading</h1>)
    }
    
    return(
        <main className="main-section">
            <h4>
            Manage Assessments
            </h4>
            <section className="add-assessment">
                <input onChange={handleAddChange} data-key="name" placeholder="Assessment Name"></input>
                <select onChange={handleAddChange} data-key="metric">
                    <option value="boolean">Pass/Fail</option>
                    <option value="grade">Grade</option>
                    <option value="quantity">Quantity</option>
                </select>
                <button onClick={handleAddSubmit}>Add Assessment</button>
            </section>
            <section className="assessment-grid">
                {data.getAllUsersAssessments.map(a=>{
                    return(<>
                    <h3>{a.name}</h3>
                    <h3>{a.metric}</h3>
                    <button>Delete</button>
                    </>
                    )
                })}
            </section>
            </main>
        
    )
}