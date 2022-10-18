const { User } = require("../../models")
const { signToken } = require("../../utils/auth")


const authenticationMutations = {
    googleLogin: async (parent,{email})=>{
        const user = await User.findOne({email})
        if(!user){
            return {message:"authentication failed"}
        }
        const token = signToken(user)
        return {token,user}
    }
}

module.exports = authenticationMutations