

const colorsArray = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
]

export const addColors = (data)=>{

    data.datasets[0].backgroundColor = [];
    for (let i = 0;i<data.datasets[0].data.length;i++){
        data.datasets[0].backgroundColor.push(colorsArray[i])
    }
}