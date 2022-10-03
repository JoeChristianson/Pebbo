const mongoose = require("mongoose");

const { Assessment } = require("../models/Assessment");


const loadTutorialValues = async (user)=>{
    await addAssessment(null,{user,name:"Quality of Sleep",metric:"grade"})
    await addAssessment(null,{user,name:"Glasses of Water Drank",metric:"quantity"})
    await addAssessment(null,{user,name:"Journalled",metric:"boolean"})
    
}

async function addAssessment(parent,{user,name,metric}){
    console.log("adding assessment!");
    let assessment = (await Assessment.find({name}))[0];
    console.log("assessment",assessment);
    
    if (!assessment){
        const creator = new mongoose.Types.ObjectId(user._id)
        assessment = await Assessment.create({name,metric,creator})
    }
    if(!user.assessments){
        user.assessments = []
    }
    if (!user.assessments.includes(assessment._id)){
        user.assessments.push(assessment._id)
    }
    await user.save();
    
    assessment = await Assessment.findById(assessment._id).populate("creator")
    return assessment
}

module.exports = {loadTutorialValues}