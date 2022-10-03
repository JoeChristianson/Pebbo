import { useState } from "react"
import "./index.css"

type Page = {
    text:string,
    highlight:string
}

type Props = {
    pages:[Page],
    setHighlight:Function
}

const BottomInfoBar = ({pages,setHighlight}:Props)=>{

    const [pageIndex,setPageIndex]:[number,Function] = useState(0);

    const handleNextPage = ()=>{
        if((pageIndex+1)>=pages.length){
            console.log("out of pages");
            return
        }
        setPageIndex(pageIndex+1)
        if(pages[pageIndex+1]?.highlight){
            setHighlight(pages[pageIndex+1].highlight)
        }
    }

    return(
        <div className="bottom-info-bar">
            <p>{pages[pageIndex].text}</p>
            <button onClick={handleNextPage}>Next</button>
        </div>
    )
}

export default BottomInfoBar