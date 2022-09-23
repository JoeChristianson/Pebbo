import { Link } from "react-router-dom"

function Nav({setCurrentSection,dropDownOpen,handleDropDown}){

    const handleSectionChange = (e)=>{
        setCurrentSection(e.target.dataset.value)
        handleDropDown()
    }

    return(
        <ul className={dropDownOpen?"open":"closed"}>
            <li>
            <img className="logo" src="/logo.png"></img>
            </li>
        <Link to="/"><li>
                            </li>Dash
                            </Link>
                            <Link to="/queue"><li>
                            </li>Queue
                            </Link>
                            <Link to="/assessments"><li>
                            </li>Assessments
                            </Link>
                            <Link to="/habits"><li>
                            </li>Habits
                            </Link>


        </ul>
    )
}

export default Nav