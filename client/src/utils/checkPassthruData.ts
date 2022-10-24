


const checkPassthruData =(passThruData:any)=>{
    let res = true;
    if(passThruData?.oriented===false){
        res = false
    }
    return res
}


module.exports = checkPassthruData