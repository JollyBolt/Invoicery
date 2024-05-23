import React from 'react'
import dummyData from '../../dummyOverAllStats.json'
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


const BarChart = ({currentYear}) => {
    // const currentYear = 2024
    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    var yearData = {}

    const getYearData = dummyData.years.map((curr) => {
        if(curr.year==currentYear)
            yearData = Object.assign(curr.months)
    } )
    
    var monthlyRevenue = []

    Object.values(yearData).forEach(value=>{
        monthlyRevenue.push(value.totalMonthRevenue)
    })

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Monthly Revenue',
                data: monthlyRevenue,
                backgroundColor: '#2807a0',
                hoverBackgroundColor: '#3D0CF0',
            },

        ],
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: 'Monthly Revenue',
            },
        },
        barThickness: 20,
        scales: {
            y: {
              beginAtZero: true,
              grace:1
            },
          },
    };

    return (
        <Bar options={options} data={data} />
    )
}

export default BarChart
