const {User}=require("../models")

const allUsers = async ()=>{
    let users = await User.find().populate("habits");
    return users
}

const getDay = async (parent,{userId,date})=>{
    const day =
}

module.exports = {allUsers}