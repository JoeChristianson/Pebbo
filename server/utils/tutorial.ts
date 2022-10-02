

const loadTutorialValues = async (userId)=>{
    await addAssessment(null,{userId:userId,name:"Quality of Sleep",metric:"grade"})
    await addAssessment(null,{userId:userId,name:"Quality of Sleep",metric:"grade"})
    await addAssessment(null,{userId:userId,name:"Quality of Sleep",metric:"grade"})
    
}

async function addAssessment(parent,{userId,name,metric}){
    console.log("adding assessment!");
    let assessment = (await Assessment.find({name}))[0];
    
    if (!assessment){
        const creator = mongoose.Types.ObjectId(userId)
        assessment = await Assessment.create({name,metric,creator})
    }
    const user = await User.findById(userId)
    if (!user.assessments.includes(assessment._id)){
        user.assessments.push(assessment._id)
    }
    user.save();
    assessment = await Assessment.findById(assessment._id).populate("creator")
    return assessment
}

module.exports = {loadTutorialValues}