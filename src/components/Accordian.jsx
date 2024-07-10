import { useState } from "react"
import { motion } from "framer-motion"

const AccordionSolutions = ({ setTemplate, setInvoiceState, invoiceState }) => {
  const [open, setOpen] = useState(solutions[0].id)
  return (
      <div className="flex flex-col gap-4">
        {solutions.map((q) => {
          return (
            <Solution
              {...q}
              key={q.id}
              open={open}
              setOpen={setOpen}
              index={q.id}
              setTemplate={setTemplate}
              setInvoiceState={setInvoiceState}
              invoiceState={invoiceState}
            />
          )
        })}
      </div>
  )
}

const Solution = ({
  title,
  description,
  index,
  open,
  setOpen,
  setTemplate,
  setInvoiceState,
  invoiceState,
}) => {
  const isOpen = index === open

  return (
    <div
      onClick={() => {
        setOpen(index)
        setTemplate(index)
        setInvoiceState({ ...invoiceState, template: index })
        sessionStorage.setItem('template',index)
      }}
      className="relative cursor-pointer overflow-hidden rounded-lg p-1"
    >
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "170px" : "72px",
        }}
        className="relative z-20 flex flex-col justify-between rounded-[7px] bg-white p-6"
      >
        <div>
          <motion.p initial={false} className="w-fit text-2xl font-bold">
            {title}
          </motion.p>
          <motion.p
            initial={false}
            animate={{
              opacity: isOpen ? 1 : 0,
            }}
          >
            <ul className="list-disc p-2 text-sm">
              {description.map((d, ind) => (
                <li key={ind} className="list-disc">
                  {d}
                </li>
              ))}
            </ul>
          </motion.p>
        </div>
      </motion.div>
      <motion.div
        initial={false}
        animate={{
          opacity: isOpen ? 1 : 0,
        }}
        className="absolute inset-0 z-10 bg-primary"
      />
      <div className="absolute inset-0 z-0 bg-slate-200" />
    </div>
  )
}

export default AccordionSolutions

const solutions = [
  {
    id: "gst",
    title: "GST/Tax Invoice",
    description: [
      "Must include detailed tax information.",
      "Send to registered businesses who need to claim input tax credit, for interstate sales, high-value transactions, and export transactions.",
    ],
  },
  {
    id: "simple",
    title: "Simple Invoice",
    description: [
      "Does not include detailed tax information",
      "Send to customers who do not require a GST breakdown, such as individuals, small businesses not registered under GST, or for exempt transactions.",
    ],
  },
]
