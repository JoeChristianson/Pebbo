const { writeFileSync } =require("fs")
const { User } = require("../../models/index.js")

const mailMutations = {
    // exportData:async (parent,{userId})=>{
    //     const user = await User.findById(userId)
    //     const email = user.email;
    //     const userData = {...user}._doc;
    //     userData.password = null;
    //     const text = JSON.stringify(userData)
    //     writeFileSync("./mailer/attachments/export.json",text)
    //     sendEmail()
    //     return "success"
    // }
}

module.exports = mailMutations