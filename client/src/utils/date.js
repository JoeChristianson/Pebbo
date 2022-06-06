export const formatToday = ()=>{
    let today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();
today = mm + '/' + dd + '/' + yyyy;
return today
}