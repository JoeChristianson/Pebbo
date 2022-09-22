const SimpleInput = ({handleChange,handleSubmit,text,label,submitButtonText="Add",formClass=""})=>{


    return(
        <form onSubmit={handleSubmit} className={` ${formClass}`}>
        {label?<label>{label}</label>:null}
        <input onChange={handleChange} type="text" value={text}></input>
        <input type="submit" value={submitButtonText}></input>
        </form>
    )

}

export default SimpleInput