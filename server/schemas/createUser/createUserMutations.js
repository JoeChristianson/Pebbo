const {User} = require("../../models/index.js")
const {findError} = require("../../utils/errors.ts")

const createUserMutations = {
    createUser: async (parent,{name,email,password,birthdate})=>{
        try{
            const user = await User.create({name,email,password,birthdate})
            return {valid:true,errors:[]}
        }catch(err){
            const errors = findError(err.message);
            return {valid:false,errors}
        }
    },
    deleteUser: async (parent,{userId})=>{
        await User.deleteOne({_id:userId})
        return "goodbye!"
    }
}

module.exports = createUserMutations