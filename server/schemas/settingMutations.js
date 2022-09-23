const { findDay } = require("../utils/date");
const {User,Setting} = require("../models")

const settingMutations = {
    addSetting: async (parent,{userId,settingName})=>{
        const user = await User.findById(userId).populate("settings");
        let setting = await Setting.findOne({name:settingName});
        if(!setting){
            setting = await Setting.create({name:settingName});
        }
        user.settings.push(setting.id);
        user.save()
        return "added"
    },
    offSetting: async (parent,{userId,settingId,queueItemId,on})=>{
        try{

            const user = await User.findById(userId).populate({path:"queue.offSettings"})
            const queueItem = user.queue.find(q=>{
                return q.queueItem.toString() === queueItemId
        }
        )
        if(on==="false"){

            queueItem.offSettings.push(settingId);
        }else{
   

            queueItem.offSettings = queueItem.offSettings.filter(s=>{

                return s._id.toString()!==settingId})
        }
        user.save()
        return "done"
    }catch(err){
        console.error(err)
    }
    },
    addSettingToDay: async (parent,{userId,settings,date})=>{
        const user = await User.findById(userId);
        const day = findDay(user,date);
        day.environmentalVariables = settings;
        user.lastSetting = date;
        user.save()
        return "success"
    }
}

module.exports = {settingMutations}