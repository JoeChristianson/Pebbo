const SubNav = ({options,handleSubMenu,highlight})=>{



    return(<header>
        <ul>
        {options.map((option,index)=>{
            return(<li className={highlight===option&&"highlight"} key={index} onClick={handleSubMenu} data-option={option}>{option}</li>)
        })}
        </ul>
        </header>
    )
}

export default SubNav