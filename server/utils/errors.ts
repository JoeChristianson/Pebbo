

const findError = (errorString:string)=>{

    let errors;
    if(errorString.includes("name")){
        errors = ["username already taken"]
    }
    else if(errorString.includes("email")){
        errors = ["email already in use"]
    }
    else if (errorString.includes("password")){
        errors = ["Password Required"]
    }
    else if (errorString.includes("birthdate")){
        errors = ["Must enter birthdate"]
    }

    return errors
}

module.exports = {findError}