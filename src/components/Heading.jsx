import React from 'react'

const Heading = ({name}) => {
  return (
    <div>
        <p className='text-4xl font-black text-primary first-letter:text-5xl heading uppercase'>{name}</p>
    </div>
  )
}

export default Heading