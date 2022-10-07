import { useState } from "react"
import auth from "../../utils/auth"
import "./header.css"
import DropDown from "../generics/DropDown"
const Nav = require("../Nav/index.js").default
const {formatToday} = require("../../utils/date")


function Header({setCurrentSection,hideHeader}) {
    const handleLogout = ()=>{
        auth.logout()
    }
    const [dropDownOpen,setDropDownOpen] = useState(false)
    const [userMenuOpen,setUserMenuOpen] = useState(false)

    const handleDropDown = ()=>{
        setDropDownOpen(!dropDownOpen)
    }

    const dropDownItems = [
    {     label:"Log out",
        isLink:false,
        onClick:handleLogout
    },
    {
        label:"Settings",
        isLink:true,
        link:"/settings"
    },
    {
        label:"Variables",
        isLink:true,
        link:"/variables"
    },
    {     label:"Close",
    isLink:false,
    onClick:()=>{}
}
    ]
    console.log(hideHeader);
    return(
        <header className={hideHeader?"hide":"x"}>

            <span onClick={handleDropDown} className="mobile">Open</span>
            <Nav setCurrentSection={setCurrentSection} dropDownOpen={dropDownOpen} handleDropDown={handleDropDown}></Nav>
            <h4>{formatToday()}</h4>
            <span className="user-span">
            {!userMenuOpen?null:            
            <DropDown
            items={dropDownItems}
            setDropDownOpen={setUserMenuOpen}
            ></DropDown>}
            <button onMouseEnter={()=>setUserMenuOpen(true)}>User</button>
            </span>
        </header>
    )
}

export default Header