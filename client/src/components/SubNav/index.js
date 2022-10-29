import { useState } from "react"

const SubNav = ({options,handleSubMenu,highlight})=>{
    const [selectedIndex,setSelectedIndex] = useState(0)

    const handleClick = (e,index)=>{
        handleSubMenu(e)
        setSelectedIndex(index)
    }

    return(<header className="sub-nav">
        <ul>
        {options.map((option,index)=>{
            return(<li className={`${selectedIndex===index&&"selected"} ${highlight===option&&"highlight"}`} key={index} onClick={(e)=>handleClick(e,index)} data-option={option}>{option}</li>)
        })}
        </ul>
        <span className="bottom-border"></span>
        </header>
    )
}

export default SubNav