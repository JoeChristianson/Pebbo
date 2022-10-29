import TutorialFrame from "../../components/frames/TutorialFrame/index.tsx"
import { useEffect, useState } from "react"
import "./index.css"
import Slide from "./slide"
import { slides } from "./slidesArray"
import ToDoGuide from "../Guides/ToDoGuide/index.tsx"
import YesterdayAssessmentGuide from "../Guides/YesterdayAssessmentGuide/index.tsx"
import ReviewGuide from "../Guides/ReviewGuide/index.tsx"
import QueueGuide from "../Guides/QueueGuide/index.tsx"
import HabitGuide from "../Guides/HabitGuide/index.tsx"
import AssessmentGuide from "../Guides/AssessmentGuide/index.tsx"
import DashGuide from "../Guides/DashGuide/index.tsx"


const Tutorial = ({endTutorial,userId})=>{
    useEffect(()=>{
        document.documentElement.style.setProperty("--footer-display","none");

    },[])
    const [demoOn,setDemoOn] = useState(false)
    const [demoIndex,setDemoIndex] = useState(0)
    const [slideIndex,setSlideIndex] = useState(0)
    const slide = slides[slideIndex]

    const handleClick = ()=>{
        const newIndex = slideIndex+1;
        if(newIndex<slides.length){
            setSlideIndex(newIndex)
        }else{
            setDemoOn(true)
            // endTutorial()
        }
    }

    
    const endDemo = ()=>{
        console.log("ending a demo!");
        if(demoIndex+1===demos.length){
            endTutorial()
        }
        setDemoIndex(demoIndex+1)
    }

    const demos = [


        <YesterdayAssessmentGuide userId={userId} end={endDemo}></YesterdayAssessmentGuide>,
        <ReviewGuide end={endDemo}></ReviewGuide>,
        <ToDoGuide end={endDemo}></ToDoGuide>,
        <QueueGuide end={endDemo}></QueueGuide>,
        <HabitGuide end={endDemo}></HabitGuide>,
        <AssessmentGuide end={endDemo}></AssessmentGuide>,
        <DashGuide end={endDemo}></DashGuide>
    ]


    if(demoOn){
        return(
            demos[demoIndex]
            )
    }


    return(
        <main onClick={handleClick} className="full-screen slide">
        <Slide title={slide.title} img={slide.img} paragraphs={slide.paragraphs} handleClick={handleClick}></Slide>
        <footer className="bottom-flex">
            Click anywhere to continue
        </footer>
        </main>
    )
}

export default Tutorial