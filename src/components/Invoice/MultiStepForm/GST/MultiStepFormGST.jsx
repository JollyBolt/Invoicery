import { motion } from "framer-motion"
import { useForm, useFieldArray } from "react-hook-form"
import { DevTool } from "@hookform/devtools"
import InvoiceDetails from './InvoiceDetails';
import AddCustomer from "./AddCustomer";
import AddProducts from './Addproducts';
import Taxes from './Taxes';
import TermsNConditions from './TnC';
import Finish from './Finish';


function MultiStepFormGST({ step, setStep, printDocRef }) {
  const form = useForm({
    defaultValues: {
      invoiceNumber: "",
      customer: "",
      products: [
        {
          name: "",
          quantity: "",
        },
      ],
      termsNConditions: [{ tnc: "" }],
      discount: {
        value: 0.0,
        type: "percent",
      },
      taxes: {
        igst: 0.0,
        cgst: 0.0,
        sgst: 0.0,
      },
      date: "",
    },
    mode: "all",
  })

  const { register, handleSubmit, formState, control, setValue, watch } = form
  const { errors } = formState

  const { fields, append, remove } = useFieldArray({
    name: "products",
    control,
  })

  const tNc = useFieldArray({
    name: "termsNConditions",
    control,
  })

  const formSwitch = () => {
    switch (step) {
      case 2:
        return (
          <InvoiceDetails
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />
        )
      case 3:
        return (
          <AddCustomer
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
          />
        )
      case 4:
        return (
          <AddProducts
            register={register}
            errors={errors}
            fields={fields}
            append={append}
            remove={remove}
            setValue={setValue}
            watch={watch}
          />
        )
      case 5:
        return (
          <Taxes
            register={register}
            errors={errors}
            setValue={setValue}
          />
        )
      case 6:
        return <TermsNConditions register={register} tNc={tNc} />
      case 7:
        return <Finish printDocRef={printDocRef} />
    }
  }
  return (
    <div className="flex h-full w-full flex-col">
      {/* <Stepper step={step} /> */}
      <div className="mb-10 flex-1">
        <form>{formSwitch()}</form>
      </div>
      <DevTool control={control} />
      <div className="flex w-full justify-between">
        <button
          // disabled={step === 1}
          onClick={() => {
            setStep(step - 1)
          }}
          className="rounded-rounded px-3 py-1 text-xl text-black transition-colors duration-150 hover:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-transparent"
        >
          Go Back
        </button>
        <motion.button
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.85 }}
          transition={{ duration: 0.2 }}
          onClick={() => {
            if (step < 7) {
              setStep(step + 1)
            }
          }}
          className="rounded-rounded bg-primary px-3 py-1 text-xl font-semibold text-white transition-colors duration-150 hover:bg-primaryLight"
        >
          {step === 7 ? "Save" : "Next"}
        </motion.button>
      </div>
    </div>
  )
}

export default MultiStepFormGST










