import auth from "../../utils/auth"
const Nav = require("../Nav/index.js").default
const {formatToday} = require("../../utils/date")


function Header({setCurrentSection}) {
    const handleLogout = ()=>{
        auth.logout()
    }

    return(
        <div>
            <h1>{formatToday()}</h1>
            <button onClick={handleLogout}>Log out</button>
            <Nav setCurrentSection={setCurrentSection}></Nav>
        </div>
    )
}

export default Header