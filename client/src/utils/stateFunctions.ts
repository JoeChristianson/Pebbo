export const setElementProperty = (state,setState,item,matchProperties,matchValue,setProperties,setValue,passthru)=>{
    const newState = [...state];
    const matchPropertiesArray = matchProperties.split(".")
    // const newItem = newState.find(item=>{
    //     console.log(item);
    //     let prop = item
    //     for(let i=0;i<matchPropertiesArray.length;i++){
    //         prop = prop[matchPropertiesArray[i]]
    //     }
    //     console.log("this is the prop",prop);
    //     return prop===matchValue
    // })
    const newItem = findItemInArray(newState,matchPropertiesArray,matchValue)
    const setPropertiesArray = setProperties.split(".")
    let obj = {...newItem};
    for(let i = 0;i<setPropertiesArray.length-1;i++){
        obj = newItem[setPropertiesArray[i]]
    }
    obj[setPropertiesArray[setPropertiesArray.length-1]] = setValue;
    if(passthru){
        return [...newState.filter(item=>item!==findItemInArray(newState,matchPropertiesArray,matchValue)),obj]
    }
    setState([...newState.filter(item=>item!==findItemInArray(newState,matchPropertiesArray,matchValue)),obj])

}

export const findItemInArray = (array,matchPropertiesArray,matchValue)=>{
    const res = array.find(item=>{
        console.log(item);
        let prop = item
        for(let i=0;i<matchPropertiesArray.length;i++){
            prop = prop[matchPropertiesArray[i]]
        }
        console.log("this is the prop",prop);
        return prop===matchValue
    })
    return res
}

