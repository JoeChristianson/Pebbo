const {User} = require("../../models")

// // type SettingsObject = {
// //     key:string,
// //     string?:string,
// //     boolean?:string,
// //     int?:string
// // }

// type SettingArrayInput = {
//     userId:string,
//     settingsArray:[SettingsObject]
// }

const accountMutations = {
    setMultipleSettings: async(parent,{userId,settingsArray})=>{
        const user = await User.findById(userId)
        for(let prop of settingsArray){
            if(prop.boolean==="true"){
                user[prop.key] = true
            }
            else if(prop.boolean==="false"){
                user[prop.key] = false
            }
            else if(prop.string){
                user[prop.key]=prop.string
            }else if (prop.int!==undefined){
                user[prop.key] = parseInt(prop.int)
            }
        }
        await user.save()
        return "success"
    }
}

module.exports = accountMutations