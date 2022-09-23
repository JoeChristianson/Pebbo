const {User} = require("../../models")

const tutorialMutations = {
    setOrientated:async(parent,{userId,value})=>{
        const user = await User.findById(userId);
        if(value==="true"){
            value=true
        }
        user.orientated = value;
        user.save()
        return "success"
    }
}

module.exports = tutorialMutations