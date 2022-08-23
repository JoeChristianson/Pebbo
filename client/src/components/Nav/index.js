import { Link } from "react-router-dom"

function Nav({setCurrentSection,dropDownOpen,handleDropDown}){

    const handleSectionChange = (e)=>{
        setCurrentSection(e.target.dataset.value)
        handleDropDown()
    }

    return(
        <ul className={dropDownOpen?"open":"closed"}>
        <Link to="/"><li>
                            </li>Dash
                            </Link>
                            <Link to="/queue"><li>
                            </li>Queue
                            </Link>
                            <Link to="/to-dos"><li>
                            </li>To Do
                            </Link>
                            <Link to="/assessments"><li>
                            </li>Assessments
                            </Link>
                            <Link to="/variables"><li>
                            </li>Variables
                            </Link>
                            <Link to="/habits"><li>
                            </li>Habits
                            </Link>


        </ul>
    )
}

export default Nav