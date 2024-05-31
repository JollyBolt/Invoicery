import React from 'react'
import Breadcrumb from './Breadcrumb'

const Heading = ({name}) => {
  return (
    <div>
        <p className='text-4xl font-black text-primary first-letter:text-5xl uppercase'>{name}</p>
        <Breadcrumb />
    </div>
  )
}

export default Heading