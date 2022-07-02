import { useState } from "react"
import auth from "../../utils/auth"
import "./header.css"
const Nav = require("../Nav/index.js").default
const {formatToday} = require("../../utils/date")


function Header({setCurrentSection}) {
    const handleLogout = ()=>{
        auth.logout()
    }
    const [dropDownOpen,setDropDownOpen] = useState(false)

    const handleDropDown = ()=>{
        setDropDownOpen(!dropDownOpen)
    }

    return(
        <header>
            <span onClick={handleDropDown} className="mobile">Open</span>
            <Nav setCurrentSection={setCurrentSection} dropDownOpen={dropDownOpen} handleDropDown={handleDropDown}></Nav>
            <h4>{formatToday()}</h4>
            <button onClick={handleLogout}>Log out</button>
        </header>
    )
}

export default Header