import { motion } from "framer-motion"
import { useDispatch } from "react-redux"
import {
  editInvoice,
  createInvoice,
} from "../../../../redux/slices/invoiceSlice"
import { useParams } from "react-router-dom"

const Finish = ({ handlePrint, invoiceState }) => {
  const dispatch = useDispatch()
  const { id } = useParams()
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="flex w-full justify-evenly overflow-y-scroll"
      >
        {/* <div className="w-full">
          <h1 className="text-2xl font-semibold text-foreground">
            Review the Invoice Information.
          </h1>
        </div> */}
        <motion.button
          type="button"
          onClick={handlePrint}
          className="select-none rounded-rounded bg-primary px-3 py-1 text-xl font-semibold text-white transition-colors duration-150 hover:bg-primaryLight"
        >
          Print
        </motion.button>

        <motion.button
          type="button"
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.85 }}
          transition={{ duration: 0.2 }}
          onClick={() => {
            console.log(invoiceState)
            if (sessionStorage.getItem("mode") === "create") {
              dispatch(createInvoice(invoiceState))
            } else if (sessionStorage.getItem("mode") === "edit") {
              dispatch(editInvoice({ id, body: invoiceState }))
            }
            sessionStorage.clear()
            navigate("/invoice")
          }}
          className="select-none rounded-rounded bg-primary px-3 py-1 text-xl font-semibold text-white transition-colors duration-150 hover:bg-primaryLight"
        >
          Save
        </motion.button>
      </motion.div>
    </>
  )
}

export default Finish
