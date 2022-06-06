// import { useQuery } from '@apollo/client';
const {useState} = require("react")
const HabitDay = require("../../components/HabitDay").default
const {useQuery,useMutation} = require("@apollo/client")
const SubNav = require("../../components/SubNav").default
const {QUERY_DAY} = require("../../utils/queries")
const {TOGGLE_IS_COMPLETE} = require("../../utils/mutations")
const {formatToday} = require("../../utils/date")
const auth = require("../../utils/auth").default

function Habits(){
    const userId = auth.getProfile().data._id
    console.log(userId)
    const date = formatToday()

    const {loading:dayLoading,error,data:dayData,refetch:refetchDay} = useQuery(QUERY_DAY,
        {variables:{userId,date}
})

    const [toggleIsComplete,{data:toggleData,loading:toggleLoading,error:toggleError}] = useMutation(TOGGLE_IS_COMPLETE)

    let data = null;
    if (dayLoading){
        console.log("loading")
    }
    if(error){
        console.error(error)
    }

    if(!dayLoading){
        console.log(dayData)
        data = dayData.getDay.habitDays
        console.log(data)
    }


    const [habitDays,setHabitDays] = useState(data)

    const handleComplete= async (e)=>{

        await toggleIsComplete({variables:{userId,date,habitDayId:e.target.dataset.habitDayId}})
        await refetchDay()
    }

    const [subsection,setSubsection] = useState("active")
    const options = ["active","all","add"]
    
    const handleSubMenu = (e)=>{
        const choice = e.target.dataset.option
        console.log(choice)
        setSubsection(choice)
    }

    if(dayLoading){
        return(<h1>Loading</h1>)
    }

    if(data){
        console.log("this is the data",data)
        return(
            <section>
            <SubNav options={options} handleSubMenu={handleSubMenu}></SubNav>
            <section>
                {data.filter(h=>{
                    return h.isOn===true
                }).map((habitDay,index)=>{
                    console.log(index)
                    return(<HabitDay key={index} handleComplete={handleComplete} habitDay={habitDay}></HabitDay>)
                })}
            </section>
        </section>
    )
}
}

export default Habits