const {User} = require("../../models")

const themeMutations = {
    changeTheme: async(parent,{userId,theme})=>{
        const user = await User.findById(userId)
        user.theme = theme;
        user.save()
        return (user.theme)
    }
}

module.exports = themeMutations