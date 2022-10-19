const { User } = require("../../models")
const { signToken } = require("../../utils/auth")
const mailer = require("../../utils/mail.ts")

const authenticationMutations = {
    googleLogin: async (parent,{email})=>{
        const user = await User.findOne({email})
        if(!user){
            return {message:"authentication failed"}
        }
        const token = signToken(user)
        return {token,user}
    },
    resetPasswordRequest: async (parent,{email})=>{
        const user = await User.findOne({email})
        if(!user){
            return {message:"no account with that email"}
        }else{
            const code = "reset"+Math.floor(Math.random()*10000000)
            user.resetCode = code;
            user.save()
            const html = `<h2>Oh hi, ${user.name}!</h2>
                <p>You forgot your password? Tsk Tsk!</p>
                <p>Fine! I'll do you a solid. Go <a href="localhost:3000/resetPassword?code=${code}"> here </a> to get your new password.</p>
                <p>Sincerely yours,</p>
                <h1>Pebbo Man</h1>
            `
            const sendResults = await mailer({email,html,text:`localhost:3000/resetPassword?code=${code}`,subject:"Pebbo Password Reset"})
            return {message:"Check your email."}
        }
    },
    resetPassword: async (parent,{email,password,code})=>{
        try{
            console.log(email);
            const user = await User.findOne({email})
            if(!user){
                throw {message:"Incorrect email"}
            }
            if(user.resetCode!==code){
                throw {message:"Request a new password reset email"}
            }
            user.password = password
            user.save()
            console.log("saving");
            return {message:"success"}
        }catch(err){
            return {message:err.message}
        }
    }
}

module.exports = authenticationMutations


