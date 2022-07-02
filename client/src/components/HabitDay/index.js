function HabitDay({habitDay,handleComplete,openThisModal}){
    console.log("habitDay",habitDay)

    return(
        <div   data-id={habitDay.habit._id}  className={habitDay.isComplete?"done list-item":"list-item"}>
            <span data-name={habitDay.habit.name}  data-id={habitDay.habit._id}  onClick={openThisModal}>{habitDay.habit.name}</span>
            <button data-habit-day-id={habitDay.habit._id} onClick={handleComplete}>x</button>
        </div>
    )
}

export default HabitDay