
import { useEffect, useState } from "react"
import "./index.css"

const LoadingScreen = ()=>{

    const [dots,setDots] = useState(0)

    useEffect(()=>{
        const interval = setInterval(()=>{
          
            setDots(dots=>dots+1)
                      
        },300);
        return ()=>clearInterval(interval)
    },[])
    const numberOfDots = dots%10
    let dotTrail:String=""

    for(let i=0;i<numberOfDots;i++){
        dotTrail=dotTrail+"."
    }
    


    return (
        <div className="loading-screen">
            <span>
                Loading {dotTrail}
                </span>
            </div>
    )
}

export default LoadingScreen