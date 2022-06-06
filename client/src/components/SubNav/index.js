const SubNav = ({options,handleSubMenu})=>{



    return(<header>
        <ul>
        {options.map((option,index)=>{
            return(<li key={index} onClick={handleSubMenu} data-option={option}>{option}</li>)
        })}
        </ul>
        </header>
    )
}

export default SubNav