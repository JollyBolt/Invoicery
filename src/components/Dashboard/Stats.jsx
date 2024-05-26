import React from 'react'

const Stats = ({title,number,icon}) => {
  return (
    <div className='col-span-2 bg-white rounded-rounded p-5 py-8 flex flex-col  '>
        <div className='text-base flex justify-between items-center'>
         <p className=' font-light uppercase'>{title}</p>
         <p className='text-primary text-2xl font-numbers '>{icon}</p>
        </div>
         <span className='flex h-full items-center text-6xl font-semibold text-primary font-numbers'>{number}</span>
        </div>
  )
}

export default Stats