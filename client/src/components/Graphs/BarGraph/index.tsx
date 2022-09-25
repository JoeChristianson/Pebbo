import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );



type KeyValue = {
    key:String,
    value:Number
}

type ChartData = {
    name:String,
    data:KeyValue[]
}

type Props = {
    chartData:ChartData,
    colors:String[]
}


const BarGraph = ({chartData,colors}:Props)=>{
   
    const options = {
        responsive: false,
        plugins: {
          legend: {
            position: 'top' as const,
            labels:{
                font:{
                    size:20,
                    family:"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",

                }
            }
          },
          title: {
            display: true,
            text: chartData.name,
          },
        },
      };

      const data = {
        labels:chartData.data.map(d=>d.key),
        datasets: [
            {
                label:"dataset 1",
                data:chartData.data.map(d=>d.value),
                backgroundColor:"black",
                barThickness: 20
            }
        ]
      }

    return(
        <Bar data={data} options={options}></Bar>
    )
}

export default BarGraph