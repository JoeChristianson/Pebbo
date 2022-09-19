const mockTypes = require("./mockTypes")
const {pickRandomFromArray} = require("./utils")

const MockObjectArray = (nameTypeMap,number)=>{
    const array = [];
    for (let i=0;i<number;i++){
        const obj = {...nameTypeMap};
        for (let name in obj){
            obj[name]=pickRandomFromArray(mockTypes?.[obj[name]]||mockTypes.weekday)
        }
        array.push(obj)
    }
    return array
}

module.exports = {MockObjectArray}