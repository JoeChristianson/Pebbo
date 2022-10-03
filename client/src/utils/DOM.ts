

export const ancestrySearch = (target:any,property:string):string=>{
    const split = property.split(".")
    if(split?.[1]&&target?.[split[0]]?.[split[1]]){
        console.log("found it");
        
        return target[split[0]][split[1]]
    }
    else if(split.length===1&&target[split[0]]){
        return target[property]
    }else{
        console.log("going down");
        
        return ancestrySearch(target.parentNode,property)
    }
}