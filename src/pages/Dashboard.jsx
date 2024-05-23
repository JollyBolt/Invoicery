import React, { useState } from 'react'
import PageWrapper from '../hoc/PageWrapper'
import Heading from '../components/Heading'
import BarChart from '../components/Charts/BarChart'
import LineChart from '../components/Charts/LineChart'
import { FaAngleLeft,FaAngleRight,FaRupeeSign } from "../assets/index";

const Dashboard = () => {
  const [currentYear,setCurrentYear] = useState(2024)
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const [currentmonth,setCurrentMonth] = useState(new Date().getMonth())



  const [chart,setChart] = useState("line")
  const handleChange = (e) =>{
    setChart(e.target.value);
  }
  return (
    <div>
      <Heading name="Dashboard" />
      <div className='grid grid-cols-8 gap-4 py-5' >
        <div className='col-span-2 row-span-1 bg-white rounded-rounded'> Total Revenue</div>
        <div className='col-span-2 bg-white rounded-rounded p-5 flex flex-col justify-center'>
         <p className='text-2xl font-bold'>Total Revenue</p>
         <span className='flex text-5xl font-bold text-primary'><FaRupeeSign/> 1394032</span>
        </div>
        <div className='col-span-4 row-span-2 bg-white rounded-rounded p-5'>
          <div className='flex justify-between items-center mb-3'>
            <div className='text-xl flex items-center gap-3'>
            <button onClick={()=>setCurrentYear(prev=>prev-1)}><FaAngleLeft color='#2807a0'/></button>
            <span className='text-black  uppercase font-bold'>{currentYear} Revenue</span>
            <button onClick={()=>setCurrentYear(prev=>prev+1)}><FaAngleRight color='#2807a0'/></button>
            </div>
            <select
              id="chartType"
              value={chart}
              onChange={handleChange}
              className="mt-1 block w-[13%] px-2 py-2 text-base border border-gray-300 focus:outline-none  sm:text-sm rounded-md"
            >
              <option value="bar">Bar</option>
              <option value="line">Line</option>
            </select>
          </div>
          {
            chart=="line"?<LineChart currentYear={currentYear}/>:<BarChart currentYear={currentYear}/>
          }
          
        </div>
        <div className='col-span-2 row-span-1 bg-white rounded-rounded'> Total Revenue</div>
        <div className='col-span-2 bg-white rounded-rounded p-5'> Total Revenue</div>
        <div className='col-span-4 bg-white rounded-rounded p-5'> Recent Invoices</div>
        <div className='col-span-4 bg-white rounded-rounded p-5'>
          <div>
          <div className='text-xl flex items-center gap-3'>
            <button onClick={()=>setCurrentMonth(prev=>prev>0?prev-1:11)}><FaAngleLeft color='#2807a0'/></button>
            <span className='text-black  uppercase font-bold'>{monthNames[currentmonth]}</span>
            <button onClick={()=>setCurrentMonth(prev=>prev<11?prev+1:0)}><FaAngleRight color='#2807a0'/></button>
            </div>
          </div>
         </div>

      </div>
    </div>
  )
}

export default PageWrapper(Dashboard, 'dashboard')