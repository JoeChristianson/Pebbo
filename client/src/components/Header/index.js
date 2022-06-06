const Nav = require("../Nav/index.js").default

function Header({setCurrentSection}) {
    console.log("in it")
    console.log(Nav)
    return(
        <div>
            <h1>Header</h1>
            <Nav setCurrentSection={setCurrentSection}></Nav>
        </div>
    )
}

export default Header