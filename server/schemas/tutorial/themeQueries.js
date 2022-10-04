const {User} = require("../../models")

const themeQueries = {
    getTheme: async(parent,{userId})=>{
        const user = await User.findById(userId)
        return (user.theme)
    }
}

module.exports = themeQueries