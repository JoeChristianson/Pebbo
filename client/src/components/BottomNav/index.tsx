    import React from "react"
    import { Link } from "react-router-dom"
    import "./index.css"
    import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
    import { faHouse,faClock,faChartColumn,faFlask,faGear } from '@fortawesome/free-solid-svg-icons'
    const BottomNav = ()=>{
        return(
            <footer>
                <Link to="/">
                    <FontAwesomeIcon icon={faHouse}>
                    </FontAwesomeIcon>
                    </Link>
                <Link to="/queue">
                <FontAwesomeIcon icon={faClock}>
                    </FontAwesomeIcon>
                </Link>
                <Link to="/assessments">
                <FontAwesomeIcon icon={faChartColumn}>
                    </FontAwesomeIcon>
                </Link>
                <Link to="/habits">
                <FontAwesomeIcon icon={faFlask}>
                    </FontAwesomeIcon>
                </Link>
                <Link to="/settings">
                <FontAwesomeIcon icon={faGear}>
                    </FontAwesomeIcon>

                </Link>
                </footer>
        )
    }
    export default BottomNav