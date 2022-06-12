export const formatToday = ()=>{
    let today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
today = mm + '/' + dd + '/' + yyyy;
return today
}

export const formatYesterday = ()=>{
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1)
    const yyyy = yesterday.getFullYear();
    let mm = yesterday.getMonth() + 1;
    let dd = yesterday.getDate();
yesterday = mm + '/' + dd + '/' + yyyy;
console.log(yesterday)
return yesterday
}


