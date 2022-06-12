import auth from "../../utils/auth"
import "./header.css"
const Nav = require("../Nav/index.js").default
const {formatToday} = require("../../utils/date")


function Header({setCurrentSection}) {
    const handleLogout = ()=>{
        auth.logout()
    }

    return(
        <header>
            <Nav setCurrentSection={setCurrentSection}></Nav>
            <h4>{formatToday()}</h4>
            <button onClick={handleLogout}>Log out</button>
        </header>
    )
}

export default Header