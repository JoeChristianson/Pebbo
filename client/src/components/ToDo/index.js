

export const ToDo = ({toDo,handleComplete})=>{

    return(

        <div className="list-item">
                <span>{toDo.toDoForm.name}</span><button data-id={toDo._id} onClick={handleComplete}></button>
            </div>
        )
}