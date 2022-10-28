const getMaxByProperty = (array,property)=>{
    let max = -1000000000;
    array.forEach(el=>{
        if(el[property]>max){
           max = el[property] 
        }
    })
    return max
}

export default getMaxByProperty