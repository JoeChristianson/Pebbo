    import Tutorial from "../../pages/Tutorial"
    import Assessment from "../../pages/Assessment"
    import Review from "../../pages/Review"
    import { formatToday } from "../../utils/date"
    import { useMutation } from "@apollo/client"
    import { FINISH_TUTORIAL } from "../../utils/mutations"

    // types
    import { PassThruProps } from "./types"


    const Passthru = ({userId,passThrus,setPassThrus}:PassThruProps)=>{

        const {orientated,assessments} = passThrus
        const {habits,queueItems} = passThrus.reviewItems

// I think if it doesn't send back data, the setOriented Object in the typing should just be empty

        const [finishTutorial,{data:finishTutorialData,loading:finishTutorialLoading,error:finishTutorialError}] = useMutation<{setOrientated:{}},{userId:string,value:string}>(FINISH_TUTORIAL)
        
        const handleNext = async (action:string):Promise<void>=>{
            let newPassThrus = {...passThrus}
            switch(action){
                case "tutorial":
                    newPassThrus.orientated = true;
                    const variables = {userId,value:"true"}                    
                    finishTutorial({variables})
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
            return(<Review highlight="false" refresh={()=>{handleNext("review")}} userId={userId} setReviewed={()=>{handleNext("review")}}/>)
        }

        return(
            <h1>Passthru Component Goes Here</h1>
        )
    }
    export default Passthru
    
    
    