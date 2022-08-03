const {User,Setting} = require("../models")

const settingMutations = {
    addSetting: async (parent,{userId,settingName})=>{
        const user = await User.findById(userId).populate("settings");
        console.log("user",user.id)
        console.log("user settings",user.settings)
        let setting = await Setting.findOne({name:settingName});
        console.log("settings search",setting)
        if(!setting){
            setting = await Setting.create({name:settingName});
            console.log("settings create",setting)
        }
        user.settings.push(setting.id);
        user.save()
        console.log("user settings after push",user.settings)

        return "added"
    },
    offSetting: async (parent,{userId,settingId,queueItemId})=>{
        try{

            const user = await User.findById(userId).populate({path:"queue.offSettings"})
            console.log(user.queue[0].offSettings)
            const queueItem = user.queue.find(q=>{
                return q.queueItem.toString() === queueItemId
        }
        )
        queueItem.offSettings.push(settingId);
        user.save()
        return "done"
    }catch(err){
        console.log(err)
    }
    }
}

module.exports = {settingMutations}