function HabitDay({habitDay,handleComplete}){
    console.log("habitDay",habitDay)
    return(
        <div className={habitDay.isComplete?"done":""}>
            <span>{habitDay.habit.name}</span>
            <button data-habit-day-id={habitDay.habit._id} onClick={handleComplete}>x</button>
        </div>
    )
}

export default HabitDay