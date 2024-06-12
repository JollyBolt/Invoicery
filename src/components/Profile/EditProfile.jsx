import { motion, AnimatePresence } from "framer-motion"
import React, { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"

function EditProfile({ open, setOpen }) {
  const { user } = useSelector((state) => state.user)
  const form = useForm({
    defaultValues: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      org: user.org,
      streetAddress: user.address.streetAddress,
      city: user.address.city,
      state: user.address.state,
      stateCode: user.address.stateCode,
      zip: user.address.zip,
      bankName: user.banking.bankName,
      bankBranch: user.banking.bankBranch,
      accountNumber: user.banking.accountNumber,
      ifsc: user.banking.ifsc,
      gstin: user.gstin,
    },
    mode: "all",
  })

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] flex h-screen w-full items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ ease: "easeOut", delay: 0 }}
              className="rounded-rounded bg-white"
            ></motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default EditProfile
