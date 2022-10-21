


const checkPassthruData =(passThruData:any)=>{
    console.log(passThruData);
    
    let res = true;
    if(passThruData?.oriented===false){
        res = false
    }
    return res
}


module.exports = checkPassthruData