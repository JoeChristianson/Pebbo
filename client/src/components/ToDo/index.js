

export const ToDo = ({toDo,handleComplete,key})=>{
    return(

        <div className="list-item" key={key}>
                <span>{toDo.toDoForm.name}</span><button data-id={toDo._id} onClick={handleComplete}></button>
            </div>
        )
}