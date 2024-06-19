import React, { forwardRef,useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"

const InvoicePreview = forwardRef((props, ref) => {
  const dispatch = useDispatch()
  const { loggedIn } = useSelector((state) => state.auth)
  const { user, loading } = useSelector((state) => state.user)

  useEffect(() => {
    async function getUserData() {
      if (loggedIn) {
        await dispatch(getProfile())
      }
    }
    getUserData()
  }, [loggedIn])
  const { invoiceState } = props
  const { invoiceNumber } = invoiceState
  console.log(invoiceState)
    return (
      <div ref={ref} className="min-h-full bg-white p-2">
        {invoiceNumber}
        {/* {invoiceState} */}
        {/* <div className="h-[80vh] w-1/2 bg-red-500"></div> */}
        {/* <div className='w-1/2 bg-blue-500 h-[80vh]'></div> */}
      </div>
    )
})


export default InvoicePreview