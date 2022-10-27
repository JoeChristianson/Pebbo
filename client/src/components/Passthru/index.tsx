    import Tutorial from "../../pages/Tutorial"
    import Assessment from "../../pages/Assessment"
    import Review from "../../pages/Review"
    import React from "react"
    import { formatToday } from "../../utils/date"
    import { useMutation } from "@apollo/client"
    import { FINISH_TUTORIAL } from "../../utils/mutations"

    const Passthru = ({userId,passThrus,setPassThrus}:any)=>{

        const {orientated,assessments} = passThrus
        const {habits,queueItems} = passThrus.reviewItems
        const [finishTutorial,{}] = useMutation(FINISH_TUTORIAL)
        console.log(userId,"id in passthru");
        
        
        const handleNext = async (action:string)=>{
            let newPassThrus = {...passThrus}
            switch(action){
                case "tutorial":
                    newPassThrus.orientated = true;
                    const variables = {userId,value:"true"}
                    console.log(variables);
                    
                    const res = await finishTutorial({variables})
                    console.log(res);
                    case "assessment":
                    newPassThrus.assessments = [...newPassThrus.assessments].slice(1)
                    break;
                case "review":
                    newPassThrus.reviewItems = {habits:[],queueItems:[]}
                    break;
            }
            setPassThrus(newPassThrus)
        }

        if(!orientated){
            return(
                <Tutorial userId={userId} endTutorial={()=>handleNext("tutorial")}></Tutorial>
                )
        }
        if(assessments.length>0){
            return(<Assessment highlight="false" refetchAssessment={()=>handleNext("assessment")} date={formatToday()} userId={userId} assessment={assessments[0]}></Assessment>)
        }
        if(habits.length>0||queueItems.length>0){
            return(<Review refresh={()=>{handleNext("review")}} userId={userId} setReviewed={()=>{handleNext("review")}}/>)
        }

        return(
            <h1>Passthru Component Goes Here</h1>
        )
    }
    export default Passthru
    
    
    