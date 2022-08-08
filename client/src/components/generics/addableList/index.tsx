import { FunctionComponent } from "react";


// components
import Button from "../Button/index.tsx"

// styles
import "./index.css"

type Button = {
    name:string
}

type Props = {
    handleAddToList:(e:React.FormEvent)=>{},
    items:string[],
    buttons:Button[]
}

const AddableList:FunctionComponent = ({handleAddToList,items,buttons=[]}:Props):JSX.Element =>{
    
    
    return(
        <div className="addable-list-cont">
        <form onSubmit={(e)=>{
            e.preventDefault()
            handleAddToList(e)
        }}>
        <input></input>
        <input type="submit" />
        </form>
        <ul className="addable-list">
            {items.map((item:string,index:number)=>{
                return(
                    <li>
                        <span>
                            {item}
                            </span>
                        {buttons.map((button)=>{
                            return(
                                <Button
                                name={button.name}
                                symbol={"x"}

                                >
                            </Button>
                                )
                        })}
                    </li>
                )
            })}
        </ul>
        </div>
    )
}

export default AddableList