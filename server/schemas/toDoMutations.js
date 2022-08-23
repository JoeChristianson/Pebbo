const { ToDoForm } = require("../models/ToDoForm");
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
    },
    addSubTask: async (parent,{userId,toDoId,name,date})=>{
        try{
            const user = await User.findById(userId);
            const toDo = user.toDos.find(t=>{
                return t._id.toString()===toDoId
            });
            let subTaskForm = await ToDoForm.findOne({name})
            if(!subTaskForm){
                subTaskForm = await ToDoForm.create({name,creator:userId})
            }
            const subTask = {toDoForm:subTaskForm._id,dateCreated:date,dateDone:null}
            toDo.subTasks.push(subTask);
            await user.save()
            return "Success"
        }catch(err){
            console.error(err)
        }
    }

}

module.exports = toDoMutations