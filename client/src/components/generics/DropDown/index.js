import { Link } from "react-router-dom"
import "./index.css"

// items = {label,link,isLink,onClick}
const DropDown = ({items,setDropDownOpen})=>{

    return(
        <div className="dropdown-menu" 
        onMouseLeave={()=>setDropDownOpen(false)}
        onClick={()=>setDropDownOpen(false)}
        >
            <ul>
                {items.map((item,index)=>{
                    if(item.isLink){

                        return(
                            <Link key={index} to={item.link}><li>
                            {item.label}
                        </li>
                        </Link>
                    )
                }else{
                    return(
                        <li onClick={item.onClick}>
                                                       {item.label}
                        </li>
                            )
                    
                }
                })}
            </ul>
        </div>
    )
}

export default DropDown