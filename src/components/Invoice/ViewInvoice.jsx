import React, { useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchSingleInvoice } from "../../redux/slices/invoiceSlice"
import { motion, AnimatePresence } from "framer-motion"
import { useReactToPrint } from "react-to-print"
import GSTTemplate from "./MultiStepForm/GST/GSTTemplate"
import { IoClose } from "react-icons/io5"
import { MdEdit } from "react-icons/md"
import { IoIosPrint } from "react-icons/io"
import { useNavigate } from "react-router-dom"

const ViewInvoice = ({ modalOpen, setModalOpen, invoiceState }) => {
  const { products, taxes } = invoiceState
  const { cgst, sgst, igst } = taxes
  const navigate = useNavigate()

  const ref = useRef()

  const handlePrint = useReactToPrint({
    content: () => ref.current,
  })

  let subTotal = useMemo(() => {
    return products.reduce(
      (accumulator, product) => accumulator + product.amount,
      0,
    )
  }, [products])
  0
  let total = useMemo(() => {
    return (
      subTotal +
      cgst * subTotal * 0.01 +
      sgst * subTotal * 0.01 +
      igst * subTotal * 0.01
    )
  }, [cgst, sgst, igst, subTotal])
  return (
    <AnimatePresence>
      {modalOpen && (
        <div className="absolute left-0 top-0 z-[100] flex w-full items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            className="relative h-screen w-full overflow-y-scroll"
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ duration: 0.2, delay: 0 }}
          >
            <div className="flex w-full justify-center p-5">
              <div className="w-[60%]">
                <GSTTemplate
                  invoiceState={invoiceState}
                  subTotal={subTotal}
                  total={total}
                  ref={ref}
                />
              </div>
              <div className="absolute right-5 top-5 flex flex-col gap-5">
                <button
                  className="group flex w-[90px] items-center justify-between rounded-rounded bg-white px-2 py-1 text-lg hover:w-[20px]"
                  onClick={() => setModalOpen(false)}
                >
                  <span className="origin-right group-hover:scale-0">
                    Close
                  </span>
                  <IoClose className="shrink-0" />
                </button>
                <button
                  className="flex w-[90px] items-center justify-between rounded-rounded bg-white px-2 py-1 text-lg"
                  onClick={() => navigate(`./${invoiceState._id}`)}
                >
                  <span>Edit</span>
                  <MdEdit />
                </button>
                <button
                  className="flex w-[90px] items-center justify-between rounded-rounded bg-white px-2 py-1 text-lg"
                  onClick={handlePrint}
                >
                  <span>Print</span>
                  <IoIosPrint />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default ViewInvoice
