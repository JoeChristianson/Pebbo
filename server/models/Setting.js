const {Schema,model} = require("mongoose")

const SettingSchema = new Schema({
    name:String
})

const Setting = model("Setting",SettingSchema)

module.exports = {Setting}