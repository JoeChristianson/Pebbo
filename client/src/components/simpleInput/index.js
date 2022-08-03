const SimpleInput = ({handleChange,handleSubmit,text,label})=>{


    return(
        <form onSubmit={handleSubmit}>
        {label?<label>{label}</label>:null}
        <input onChange={handleChange} type="text" value={text}></input>
        <input type="submit"></input>
        </form>
    )

}

export default SimpleInput