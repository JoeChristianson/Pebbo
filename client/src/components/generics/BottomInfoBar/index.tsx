import { useState } from "react"
import "./index.css"

type Page = {
    text:string,
    highlight:string,
    end?:boolean
}

type Props = {
    pages:[Page],
    setHighlight:Function
}

const BottomInfoBar = ({pages,setHighlight,end}:Props)=>{

    const [pageIndex,setPageIndex]:[number,Function] = useState(0);

    const handleNextPage = ()=>{
        if(pages[pageIndex].end){
            console.log("ending tutorial, make sure to switch to next")
            end()
        }
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
        <div  onClick={handleNextPage} className="bottom-info-bar">
            <p>{pages[pageIndex].text}</p>
            <footer>Click here for next instruction...</footer>
        </div>
    )
}

export default BottomInfoBar