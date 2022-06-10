const {useState} = require("react")
const {useMutation} = require("@apollo/client")
const {MAKE_ASSESSMENT} = require("../../utils/mutations")

const Assessment = ({userId,date,assessment})=>{

    const [makeAssessment,{data:assessmentData,loading:assessmentLoading,error:assessmentError}] = useMutation(MAKE_ASSESSMENT)

    const [value,setValue] = useState(null)
    const handleButton = async (e)=>{
        const {value:newValue} = e.target.dataset;
        await setValue(newValue)
    }

    const handleSubmit = async ()=>{
        if(value===null){
            console.log("make choice")
            return
        }
        try{
            const variables = {userId,date,assessmentId:assessment._id,value:parseInt(value)}
            console.log(variables)
            await makeAssessment({variables})
        }catch(err){
            console.error(err)
        }
    }


    return(
    <div>
        <h1>{assessment.name}</h1>

        {assessment.metric==="boolean"?(<div><button data-value={1} onClick={handleButton} >Success</button><button data-value={0} onClick={handleButton} >Failure</button></div>):null}

        <button onClick={handleSubmit}>Submit</button>

    </div>)

}


export default Assessment