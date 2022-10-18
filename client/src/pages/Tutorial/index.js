import { useState } from "react"
import "./index.css"
import Slide from "./slide"
import { slides } from "./slidesArray"

const Tutorial = ({endTutorial})=>{

    const slides = [{title:"THIS IS Pebbo!",img:"/logo.png",paragraphs:["I don't know how you got into this, but the only way you are leaving is in a casket, or maybe if you get bored of it."]},
    


]
    const [slideIndex,setSlideIndex] = useState(0)

    const slide = slides[slideIndex]

    const handleClick = ()=>{
        const newIndex = slideIndex+1;
        if(newIndex<slides.length){
            setSlideIndex(newIndex)
        }else{
            endTutorial()
        }
    }
    console.log(slide);

    return(
        <main onClick={handleClick} className="full-screen slide">
        <Slide title={slide.title} img={slide.img} paragraphs={slide.paragraphs}></Slide>
        <footer className="bottom-flex">
            Click anywhere to continue
        </footer>
        </main>
    )
}

export default Tutorial