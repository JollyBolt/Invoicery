import React, { useMemo, useRef } from "react"
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
    documentTitle: invoiceState.invoiceNumber,
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
        <div className="bg-foreground/50 absolute left-0 top-0 z-[100] flex w-full items-center justify-center backdrop-blur-md">
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
              <div className="fixed right-5 top-5 flex flex-col gap-5">
                <button
                  className="bg-background group relative flex h-11 w-[44px] origin-right items-center justify-end self-end overflow-hidden rounded-rounded px-3 py-1 text-xl font-semibold transition-all hover:w-[120px]"
                  onClick={() => setModalOpen(false)}
                >
                  <div className="flex w-[90px] shrink-0 flex-nowrap items-center justify-between">
                    <span className="shrink-0">Close</span>
                    <div>
                      <IoClose className="shrink-0" />
                    </div>
                  </div>
                </button>
                <button
                  className="bg-background group relative flex h-11 w-[44px] origin-right items-center justify-end self-end overflow-hidden rounded-rounded px-3 py-1 text-xl font-semibold transition-all hover:w-[120px]"
                  onClick={() => navigate(`./${invoiceState._id}`)}
                >
                  <div className="flex w-[90px] shrink-0 flex-nowrap items-center justify-between">
                    <span className="shrink-0">Edit</span>
                    <div>
                      <MdEdit className="shrink-0" />
                    </div>
                  </div>
                </button>
                <button
                  className="bg-background group relative flex h-11 w-[44px] origin-right items-center justify-end self-end overflow-hidden rounded-rounded px-3 py-1 text-xl font-semibold transition-all hover:w-[120px]"
                  onClick={handlePrint}
                >
                  <div className="flex w-[90px] shrink-0 flex-nowrap items-center justify-between">
                    <span className="shrink-0">Print</span>
                    <div>
                      <IoIosPrint className="shrink-0" />
                    </div>
                  </div>
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
