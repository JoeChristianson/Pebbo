const {User} = require("../models")

const toDoMutations = {

    prioritizeToDo: async (parent,{userId,toDoId,priority})=>{
        try{
            
            const user = await User.findById(userId);
            const toDo = user.toDos.filter(t=>{
                return t._id.toString()===toDoId
            })[0];
            toDo.priority = priority;
            await user.save()
            return "Done"
        }catch(err){
            
        }
    }

}

module.exports = toDoMutations