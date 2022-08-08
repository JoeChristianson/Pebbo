import { FunctionComponent } from "react";
import "./index.css"

const Button:FunctionComponent = ({name,symbol}):JSX.Element=>{
    return(
        <button className="generic-button" name={name}>
            {symbol?symbol:name}
        </button>
    )
}

export default Button