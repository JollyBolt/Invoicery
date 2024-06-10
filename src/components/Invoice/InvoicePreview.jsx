import React, { forwardRef } from 'react'

const InvoicePreview = forwardRef((props, ref) => {
    return (
      <div ref={ref} className='bg-white h-full p-2'>
          InvoicePreview
      </div>
  )
})


export default InvoicePreview