const {User,Setting} = require("../models")


const settingQueries = {
    getAllSettings: async (parent,{userId})=>{
        const user = await User.findById(userId).populate("settings");
        const settings = user.settings;
        return settings
    },
    getAllSettingsAndOffSettings: async (parent,{userId,queueItemId})=>{
        try{

            const user = await User.findById(userId).populate("settings").populate("queue.offSettings");
            const settings = (user.settings||[]).map(setting=> {
                return {name:setting.name,id:setting._id.toString()}});
                
                const queueItem = user.queue.filter(q=>{
                    
                    return q.queueItem.toString() === queueItemId
                }
                )[0]
                const result = {settings,offSettings:queueItem.offSettings||[]};
                return result
            }
            catch(err){
                console.error("getOffSettingsError",err)
            }
        }
}

module.exports = settingQueries