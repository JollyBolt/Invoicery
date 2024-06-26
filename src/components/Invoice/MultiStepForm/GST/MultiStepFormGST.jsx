import { motion } from "framer-motion"
import { useForm, useFieldArray } from "react-hook-form"
import { DevTool } from "@hookform/devtools"
import InvoiceDetails from "./InvoiceDetails"
import AddCustomer from "./AddCustomer"
import Taxes from "./Taxes"
import TermsNConditions from "./TnC"
import Finish from "./Finish"
import BillingAddressDetails from "./BillingAddressDetails"
import AddProducts from "./Product Step/AddProducts"
import ShippingAddressDetails from "./ShippingAddressDetails"
import { useReactToPrint } from "react-to-print"

function MultiStepFormGST({
  step,
  setStep,
  // printDocRef,
  invoiceState,
  setInvoiceState,
  handlePrint,
}) {
  const form = useForm({
    defaultValues: {
      invoiceNumber: "",
      customer: "",
      product: {
        name: "",
        quantity: 1,
        finalPrice: 0,
        amount: 0,
        discount: {
          value: 0,
          type: "percent",
        },
      },
      totalAmount: 0,
      termsNConditions: [{ tnc: "" }],
      billingCity: "",
      shippingStreetAddress: "",
      shippingCity: "",
      shippingState: "",
      shippingStateCode: "",
      shippingZip: "",
      // discount: {
      //   value: 0.0,
      //   type: "percent",
      // },
      taxes: {
        igst: 0.0,
        cgst: 0.0,
        sgst: 0.0,
      },
      date: "",
    },
    mode: "all",
  })

  const {
    register,
    handleSubmit,
    formState,
    control,
    setValue,
    watch,
    getFieldState,
  } = form
  const { errors } = formState

  // const { fields, append, remove } = useFieldArray({
  //   name: "products",
  //   control,
  // })

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
            invoiceState={invoiceState}
            setInvoiceState={setInvoiceState}
          />
        )
      case 3:
        return (
          <AddCustomer
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
            invoiceState={invoiceState}
            setInvoiceState={setInvoiceState}
          />
        )
      case 4:
        return (
          <BillingAddressDetails
            register={register}
            errors={errors}
            watch={watch}
            invoiceState={invoiceState}
            setInvoiceState={setInvoiceState}
          />
        )
      case 5:
        return (
          <ShippingAddressDetails
            register={register}
            errors={errors}
            setValue={setValue}
            watch={watch}
            invoiceState={invoiceState}
            setInvoiceState={setInvoiceState}
          />
        )
      case 6:
        return (
          <AddProducts
            register={register}
            errors={errors}
            // fields={fields}
            // append={append}
            // remove={remove}
            setValue={setValue}
            watch={watch}
            invoiceState={invoiceState}
            setInvoiceState={setInvoiceState}
          />
        )
      case 7:
        return (
          <Taxes
            register={register}
            errors={errors}
            setValue={setValue}
            invoiceState={invoiceState}
            setInvoiceState={setInvoiceState}
          />
        )
      case 8:
        return (
          <TermsNConditions
            register={register}
            tNc={tNc}
            invoiceState={invoiceState}
            setInvoiceState={setInvoiceState}
          />
        )
      case 9:
        return (
          <Finish
          //  printDocRef={printDocRef}
          />
        )
    }
  }
  const setDisabled = () => {
    switch (step) {
      case 1:
        return false
      case 2:
        if (
          getFieldState("invoiceNumber", formState).error ||
          !getFieldState("invoiceNumber", formState).isDirty
        ) {
          return true
        } else if (
          getFieldState("invoiceDate", formState).error ||
          !getFieldState("invoiceDate", formState).isDirty
        ) {
          return true
        } else {
          return false
        }
      // console.log(getFieldState("invoiceNumber", formState))
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        return false
    }
  }
  // console.log(getFieldState("invoiceNumber", formState))
  return (
    <div className="flex h-full w-full flex-col">
      <div className="mb-10 max-h-[60dvh] flex-1 overflow-y-scroll p-3">
        <form noValidate>{formSwitch()}</form>
      </div>
      <div className="flex w-full justify-between">
        <button
          onClick={() => {
            setStep(step - 1)
            sessionStorage.setItem("step", step - 1)
            if (step === 8) {
              console.log("hi")
              sessionStorage.setItem(
                "termsNConditions",
                JSON.stringify(invoiceState.termsNConditions),
              )
            }
          }}
          className="rounded-rounded px-3 py-1 text-xl text-black transition-colors duration-150 hover:bg-gray-200 disabled:text-gray-400 disabled:hover:bg-transparent"
        >
          Go Back
        </button>
        <button type="button" onClick={handlePrint}>
          Print
        </button>
        <motion.button
          initial={{ scale: 1 }}
          whileTap={{ scale: 0.85 }}
          transition={{ duration: 0.2 }}
          onClick={() => {
            if (step < 9) {
              setStep(step + 1)
              sessionStorage.setItem("step", step + 1)
            } else if (step === 9) {
              console.log(invoiceState)
            }
            if (step === 8) {
              sessionStorage.setItem(
                "termsNConditions",
                JSON.stringify(invoiceState.termsNConditions),
              )
            }
          }}
          // disabled={setDisabled()}
          className="rounded-rounded bg-primary px-3 py-1 text-xl font-semibold text-white transition-colors duration-150 hover:bg-primaryLight"
        >
          {step === 9 ? "Save" : "Next"}
        </motion.button>
      </div>
    </div>
  )
}

export default MultiStepFormGST
