import { Link } from "react-router-dom"

function Nav({setCurrentSection,dropDownOpen,handleDropDown}){

    const handleSectionChange = (e)=>{
        console.log("in it");
        // setCurrentSection(e.target.dataset.value)
        handleDropDown()
    }

    return(
        <ul id="nav" className={dropDownOpen?"open":"closed"}>
            <li onClick={()=>{handleSectionChange()}}>
            {/* <img className="logo" src="/logo.png"></img> */}
            </li>
        <Link onClick={()=>{handleSectionChange()}} to="/"><li >
                            </li>Dash
                            </Link>
                            <Link  onClick={()=>{handleSectionChange()}} to="/queue"><li onClick={()=>{handleSectionChange()}}>
                            </li>Queue
                            </Link>
                            <Link  onClick={()=>{handleSectionChange()}} to="/assessments"><li onClick={()=>{handleSectionChange()}}>
                            </li>Assessments
                            </Link>
                            <Link  onClick={()=>{handleSectionChange()}} to="/habits"><li onClick={()=>{handleSectionChange()}}>
                            </li>Habits
                            </Link>


        </ul>
    )
}

export default Nav