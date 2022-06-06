import "./Main.css"
const Habits = require("../../pages/Habits").default
const Queue = require("../../pages/Queue").default
const ToDos = require("../../pages/ToDos").default



const Main = ({currentSection})=>{

    if (currentSection==="queue"){
        return(<Queue></Queue>)
    }
    if (currentSection==="toDos"){
        return(<ToDos></ToDos>)
    }

    else{
        return(<Habits></Habits>)
    }

}

export default Main