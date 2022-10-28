
// this finds the value of a property of the closest ancestor that has that property
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

// finds an actual ancestor
export const findAncestor = (element:HTMLElement,key:string,value:string)=>{
      
    if(element[key as keyof HTMLElement]==value){
        console.log(element);
        
        return element
    }else if(!element?.parentNode){
        return null
    }
    else{
        findAncestor(element.parentNode,key,value)
    }
}