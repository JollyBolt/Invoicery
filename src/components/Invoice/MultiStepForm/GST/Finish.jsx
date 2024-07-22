import { motion } from "framer-motion"
import { useDispatch } from "react-redux"
import {
  editInvoice,
  createInvoice,
} from "../../../../redux/slices/invoiceSlice"
import { FaSave } from "react-icons/fa"
import { IoIosPrint } from "react-icons/io"
import { useNavigate,useParams } from "react-router-dom"

const Finish = ({ handlePrint, invoiceState }) => {
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const { id } = useParams()
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="flex h-[58vh] w-full flex-col items-center justify-center gap-4"
      >
        <motion.button
          type="button"
          onClick={handlePrint}
          className="flex w-[200px] select-none items-center justify-between rounded-rounded bg-primary px-3 py-1 text-xl font-semibold uppercase text-white transition-colors duration-150 hover:bg-primaryLight"
        >
          <IoIosPrint />
          Print Invoice
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
          className="flex w-[200px] select-none items-center justify-between rounded-rounded bg-green-500 px-3 py-1 text-xl font-semibold uppercase text-white transition-colors duration-150 hover:bg-green-400"
        >
          <FaSave />
          Save Invoice
        </motion.button>
      </motion.div>
    </>
  )
}

export default Finish
