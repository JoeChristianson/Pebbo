import { PopUp } from "custom-types/propsTypes"
import { FunctionComponent } from "react"

type Props = {
    children:FunctionComponent[],
    popUps:PopUp[]
}

const TutorialFrame = ({children,popUps}:Props)=>{
    return(
        <>
            {children}
            {popUps.map((p)=>{
                return(
                    <div>
                        <p>{p.text}</p>

                    </div>
                )
            })}
        </>
        )
}

export default TutorialFrame