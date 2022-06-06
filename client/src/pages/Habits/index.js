// import { useQuery } from '@apollo/client';
const {useState} = require("react")
const HabitDay = require("../../components/HabitDay").default
const {useQuery} = require("@apollo/client")
const SubNav = require("../../components/SubNav").default

function Habits(){


    const {loading:dayLoading,data:dayData} = useQuery(QUERY_DAY)

    const data = [
        {
            habit:{
                _id:"34934j9fj93j9fndf",
                name:"Eat Breakfast"
            },
            isOn:true,
            isDone:false
        },
        {
            habit:{
                _id:"xxx34j9f193j9fndf",
                name:"Meditate"
            },
            isOn:false,
            isDone:false
        },
        {
            habit:{
                _id:"34934j9fj93jhfndf",
                name:"Drink Eight Glasses"
            },
            isOn:true,
            isDone:true
        },
        {
            habit:{
                _id:"xxx34j9fj93j9fndf",
                name:"No Meat",
                prohibition:true
            },
            isOn:true,
            isDone:false
        },
    ]

    const [habitDays,setHabitDays] = useState(data)

    const handleComplete=(e)=>{
        const newHabitDays = [...habitDays];
        
        newHabitDays.forEach(n=>{
            if(n.habit._id===e.target.dataset.habitDayId){
                console.log("condition goes true")
                n.isDone=!n.isDone
            }
            setHabitDays(newHabitDays)
        })
    }

    const [subsection,setSubsection] = useState("active")
    const options = ["active","all","add"]
    
    const handleSubMenu = (e)=>{
        const choice = e.target.dataset.option
        console.log(choice)
        setSubsection(choice)
    }

    return(
        <section>
            <SubNav options={options} handleSubMenu={handleSubMenu}></SubNav>
            <section>
                {habitDays.filter(h=>{
                    return h.isOn===true
                }).map((habitDay,index)=>{
                    return(<HabitDay key={index} handleComplete={handleComplete} habitDay={habitDay}></HabitDay>)
                })}
            </section>
        </section>
    )
}

export default Habits