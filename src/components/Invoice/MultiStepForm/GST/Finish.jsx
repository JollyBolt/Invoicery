import { motion } from "framer-motion"
import { useReactToPrint } from "react-to-print"

const Finish = ({ printDocRef,handlePrint }) => {
  // const handlePrint = useReactToPrint({
  //   content: () => printDocRef.current,
  // })
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="w-full overflow-y-scroll"
      >
        <div className="w-full">
          <h1 className="text-2xl font-semibold text-foreground">
            Review the Invoice Information.
          </h1>
        </div>
        <button type="button" onClick={handlePrint} className="text-foreground">
          Print
        </button>
      </motion.div>
    </>
  )
}

export default Finish