const {User}=require("../models")

const allUsers = async ()=>{
    let users = await User.find().populate("habits");
    return users
}

module.exports = {allUsers}