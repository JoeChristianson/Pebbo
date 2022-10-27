const SimpleInput = ({highlight,handleChange,handleSubmit,text,label,submitButtonText="Add",formClass=""})=>{


    return(
        <form onSubmit={handleSubmit} className={` ${formClass} ${highlight==="input"&&"highlight"}`}>
        {label?<label>{label}</label>:null}
        <input onChange={handleChange} type="text" value={text}></input>
        <input type="submit" value={submitButtonText}></input>
        </form>
    )

}

export default SimpleInput