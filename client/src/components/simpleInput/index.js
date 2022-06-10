const SimpleInput = ({handleChange,handleSubmit,text})=>{


    return(
        <form onSubmit={handleSubmit}>

        <input onChange={handleChange} type="text" value={text}></input>
        <input type="submit"></input>
        </form>
    )

}

export default SimpleInput