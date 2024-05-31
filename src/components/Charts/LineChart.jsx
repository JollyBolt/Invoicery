import React from 'react'
import dummyData from '../../dummyOverAllStats.json'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';



const LineChart = ({ currentYear }) => {

    // const currentYear = 2024

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
    );


    var yearData = {}

    const getYearData = dummyData.years.map((curr) => {
        if (curr.year == currentYear)
            yearData = Object.assign(curr.months)
    })
    // console.log(yearData)

    var monthlyRevenue = []

    Object.values(yearData).forEach(value => {
        monthlyRevenue.push(value.totalMonthRevenue)
        // console.log(value.totalMonthRevenue)
    })


    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Monthly Revenue',
                data: monthlyRevenue,
                backgroundColor: '#3700FF90',
                borderColor: '#2807a0',
                // hoverBackgroundColor: '#3D0CF0',
                pointStyle: 'circle',
                pointRadius: 8,
                pointHoverRadius: 13
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
                grace: 1
            },
        },
    };

    return (
        <Line options={options} data={data} />

    )
}
export default LineChart
