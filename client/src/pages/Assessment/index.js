import "./assessment.css"
const {useState} = require("react")
const {useMutation} = require("@apollo/client")
const {MAKE_ASSESSMENT} = require("../../utils/mutations")
const Assessment = ({userId,date,assessment,refetchAssessment})=>{

    const [makeAssessment,{data:assessmentData,loading:assessmentLoading,error:assessmentError}] = useMutation(MAKE_ASSESSMENT)

    const [value,setValue] = useState(null)
    const handleButton = async (e)=>{
        const {value:newValue} = e.target.dataset;
        await setValue(newValue)
    }

    const handleQuantity = (e)=>{
        setValue(e.target.value)
    }

    const handleSubmit = async ()=>{
        if(value===null){

            return
        }
        try{
            const variables = {userId,date,assessmentId:assessment._id,value:parseInt(value)}

            const resp = await makeAssessment({variables})
            console.log(resp);
            if(resp){
                refetchAssessment()
            }
        }catch(err){
            console.error(err)
        }
    }


    return(
    <div>
        <h1>{assessment.name}</h1>

        {assessment.metric==="boolean"?(<div  className="assessment-btn-cont"><button  className={value==1?"selected":""} data-value={1} onClick={handleButton} >Success</button><button className={value==0?"selected":""} data-value={0} onClick={handleButton} >Failure</button></div>):null}
        {assessment.metric==="grade"?(
            <div className="assessment-btn-cont">
                <button data-value={4} onClick={handleButton} className={value==4?"selected":""}>A</button>
                <button data-value={3} onClick={handleButton} className={value==3?"selected":""}>B</button>
                <button data-value={2} onClick={handleButton} className={value==2?"selected":""}>C</button>
                <button data-value={1} onClick={handleButton} className={value==1?"selected":""}>D</button>
                <button data-value={0} onClick={handleButton} className={value==0?"selected":""}>F</button>
            </div>
        ):null    
    }
    {assessment.metric==="quantity"?(<div className="assessment-input-cont"><input type="number" onChange={handleQuantity}></input></div>):null}
        <button onClick={handleSubmit}>Submit</button>

    </div>)

}


export default Assessment