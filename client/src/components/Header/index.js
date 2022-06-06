const Nav = require("../Nav/index.js").default
const {formatToday} = require("../../utils/date")

function Header({setCurrentSection}) {

    return(
        <div>
            <h1>{formatToday()}</h1>
            <button>Log out</button>
            <Nav setCurrentSection={setCurrentSection}></Nav>
        </div>
    )
}

export default Header