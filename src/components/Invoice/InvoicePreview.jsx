import React, { forwardRef } from 'react'

const InvoicePreview = forwardRef((props, ref) => {
  const { invoiceState } = props
  console.log(invoiceState)
    return (
      <div ref={ref} className='bg-white min-h-full  p-2 '>
        {/* {invoiceState} */}
        <div className='w-1/2 bg-red-500 h-[80vh]'></div>
        {/* <div className='w-1/2 bg-blue-500 h-[80vh]'></div> */}

      </div>
  )
})


export default InvoicePreview