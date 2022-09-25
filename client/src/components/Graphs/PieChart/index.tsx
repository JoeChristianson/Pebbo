import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { addColors } from '../../../utils/charts.js';
import { PropsWithRef } from 'react';
import { Pie } from 'react-chartjs-2';
import "./index.css"
ChartJS.register(ArcElement, Tooltip, Legend);


type DataType={
    name:String,
    label:String,
    amount:Number
}
type PieData={
    datasets:[{data:Number[]}]
    labels:String[]
}

type Props={
    data:DataType[]
}

const PieChart = ({data}:Props)=>{   

    const pieData:PieData = {
        datasets:[{
            data:[]
        }],
        labels:[]
    }
    
    data.forEach((d:DataType)=>{
        pieData.datasets[0].data.push(d.amount)
        pieData.labels.push(d.label)
    })
    addColors(pieData)

    return (
        <Pie data={pieData}/>
    )
}

export default PieChart