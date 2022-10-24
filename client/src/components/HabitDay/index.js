function HabitDay({habitDay,handleComplete,openThisModal,highlight}){
    console.log(highlight,habitDay.habit.name);
    return(
        <div   data-id={habitDay.habit._id}  className={`${habitDay.isComplete?"done list-item":"list-item"} ${highlight==="habits-list"?"highlight":""} ${highlight==="meditate"&&habitDay.habit.name==="Meditate"?"highlight":""}`}>
            <span data-name={habitDay.habit.name}  data-id={habitDay.habit._id}  onClick={openThisModal}>{habitDay.habit.name}</span>
            <button className={(habitDay.habit.name=="No screens after 9pm"&&highlight==="no-screens")?"highlight":""} data-habit-day-id={habitDay.habit._id} onClick={handleComplete}></button>
        </div>
    )
}

export default HabitDay