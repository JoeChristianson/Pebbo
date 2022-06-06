const SubNav = ({options,handleSubMenu})=>{



    return(<header>
        <ul>
        {options.map(option=>{
            return(<li onClick={handleSubMenu} data-option={option}>{option}</li>)
        })}
        </ul>
        </header>
    )
}

export default SubNav