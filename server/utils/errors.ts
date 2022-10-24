

const findError = (errorString)=>{

    let errors;
    console.log(errorString);
    
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
    }else{
        errors = ["Unknown"]
    }

    return errors
}

module.exports = {findError}