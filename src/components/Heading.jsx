import React from 'react'

const Heading = ({name}) => {
  return (
    <div>
        <p className=' text-4xl font-light first-letter:font-black text-primary first-letter:text-5xl heading'>{name}</p>
    </div>
  )
}

export default Heading