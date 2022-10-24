import "./assessment.css"
const {useState} = require("react")
const {useMutation} = require("@apollo/client")
const {MAKE_ASSESSMENT} = require("../../utils/mutations")
const Assessment = ({userId,date,assessment,refetchAssessment,highlight})=>{

    const [successScreen,setSuccessScreen] = useState(false)
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
        if(highlight!==undefined){
            setSuccessScreen(true)
            return
        }


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

    if(successScreen){
        return(
            <h1>Good job!</h1>
        )
    }


    return(
    <div>
        <h1>{assessment.name}</h1>

        {assessment.metric==="boolean"?(<div  className="assessment-btn-cont"><button  className={value==1?"selected":""} data-value={1} onClick={handleButton} >Success</button><button className={value==0?"selected":""} data-value={0} onClick={handleButton} >Failure</button></div>):null}
        {assessment.metric==="grade"?(
            <div className="assessment-btn-cont">
                <button data-value={4} onClick={handleButton} className={`${value==4?"selected":""} ${highlight==="grade"?"highlight":""}`}>A</button>
                <button data-value={3} onClick={handleButton} className={`${value==3?"selected":""} ${highlight==="grade"?"highlight":""}`}>B</button>
                <button data-value={2} onClick={handleButton} className={`${value==2?"selected":""} ${highlight==="grade"?"highlight":""}`}>C</button>
                <button data-value={1} onClick={handleButton} className={`${value==1?"selected":""} ${highlight==="grade"?"highlight":""}`}>D</button>
                <button data-value={0} onClick={handleButton} className={`${value==0?"selected":""} ${highlight==="grade"?"highlight":""}`}>F</button>
            </div>
        ):null    
    }
    {assessment.metric==="quantity"?(<div className="assessment-input-cont"><input type="number" onChange={handleQuantity}></input></div>):null}
        {value!==null&&<button className={`big-button ${highlight==="confirm"?"highlight":""}`} onClick={handleSubmit}>Confirm</button>}

    </div>)

}


export default Assessment