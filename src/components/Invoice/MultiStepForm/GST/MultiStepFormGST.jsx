import { motion } from "framer-motion"
import { useForm, useFieldArray } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { createInvoice } from "../../../../redux/slices/invoiceSlice"
import InvoiceDetails from "./InvoiceDetails"
import AddCustomer from "./AddCustomer"
import Taxes from "./Taxes"
import TermsNConditions from "./TnC"
import Finish from "./Finish"
import BillingAddressDetails from "./BillingAddressDetails"
import AddProducts from "./Product Step/AddProducts"
import ShippingAddressDetails from "./ShippingAddressDetails"
import { useReactToPrint } from "react-to-print"
import { useNavigate } from "react-router-dom"

function MultiStepFormGST({
  step,
  setStep,
  // printDocRef,
  invoiceState,
  setInvoiceState,
  handlePrint,
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.user)
  const form = useForm({
    defaultValues: {
      invoiceNumber: sessionStorage.getItem("invoiceNumber")
        ? sessionStorage.getItem("invoiceNumber")
        : "",
      purchaseOrder: sessionStorage.getItem("purchaseOrder")
        ? sessionStorage.getItem("purchaseOrder")
        : "",
      purchaseOrderDate: sessionStorage.getItem("purchaseOrderDate")
        ? sessionStorage.getItem("purchaseOrderDate")
        : "",
      customer: "",
      product: {
        name: "",
        quantity: 1,
        finalPrice: 0,
        amount: 0,
        discount: {
          value: "",
          type: "percent",
        },
      },
      totalAmount: 0,
      termsNConditions: sessionStorage.getItem("termsNConditions")
        ? JSON.parse(sessionStorage.getItem("termsNConditions")).map((tnc) => {
            return { tnc }
          })
        : user.termsNConditions
          ? user.termsNConditions.map((tnc) => {
              return { tnc }
            })
          : [],
      billingCity: "",
      shippingStreetAddress: sessionStorage.getItem("shippingAddress")
        ? JSON.parse(sessionStorage.getItem("shippingAddress")).streetAddress
        : "",
      shippingCity: sessionStorage.getItem("shippingAddress")
        ? JSON.parse(sessionStorage.getItem("shippingAddress")).city
        : "",
      shippingState: sessionStorage.getItem("shippingAddress")
        ? JSON.parse(sessionStorage.getItem("shippingAddress")).state
        : "",
      shippingStateCode: sessionStorage.getItem("shippingAddress")
        ? JSON.parse(sessionStorage.getItem("shippingAddress")).stateCode
        : "",
      shippingZip: sessionStorage.getItem("shippingAddress")
        ? JSON.parse(sessionStorage.getItem("shippingAddress")).zip
        : "",
      shippingCountry: sessionStorage.getItem("shippingAddress")
        ? JSON.parse(sessionStorage.getItem("shippingAddress")).country
        : "",
      miscellaneous:
        sessionStorage.getItem("miscellaneous") &&
        sessionStorage.getItem("miscellaneous"),
      taxes: {
        // igst: sessionStorage.getItem("taxes")
        //   ? JSON.parse(sessionStorage.getItem("taxes")).igst
        //   : 0.0,
        // cgst: sessionStorage.getItem("taxes")
        //   ? JSON.parse(sessionStorage.getItem("taxes")).cgst
        //   : 0.0,
        // sgst: sessionStorage.getItem("taxes")
        //   ? JSON.parse(sessionStorage.getItem("taxes")).sgst
        //   : 0.0,
        igst:
          sessionStorage.getItem("taxes") &&
          JSON.parse(sessionStorage.getItem("taxes")).igst,
        cgst:
          sessionStorage.getItem("taxes") &&
          JSON.parse(sessionStorage.getItem("taxes")).cgst,
        sgst:
          sessionStorage.getItem("taxes") &&
          JSON.parse(sessionStorage.getItem("taxes")).sgst,
      },
      date: sessionStorage.getItem("date")
        ? sessionStorage.getItem("date")
        : "",
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
    resetField,
    getFieldState,
  } = form
  const { errors, isValid, isDirty } = formState

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
            resetField={resetField}
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
            resetField={resetField}
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
            resetField={resetField}
            invoiceState={invoiceState}
            setInvoiceState={setInvoiceState}
          />
        )
      case 6:
        return (
          <AddProducts
            register={register}
            errors={errors}
            setValue={setValue}
            resetField={resetField}
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
          sessionStorage.getItem("invoiceNumber") === "" ||
          sessionStorage.getItem("date") == ""
        ) {
          return true
        } else {
          return false
        }
      case 3:
        return !sessionStorage.getItem("customer") ? true : false
      case 4:
        return !sessionStorage.getItem("billingAddress") ? true : false
      case 5:
        if (
          getFieldState("shippingCity", formState).error ||
          watch("shippingCity") === "" ||
          getFieldState("shippingStreetAddress", formState).error ||
          !!watch("shippingStreetAddress") === "" ||
          getFieldState("shippingState", formState).error ||
          !!watch("shippingState") === "" ||
          getFieldState("shippingStateCode", formState).error ||
          !!watch("shippingStateCode") === "" ||
          getFieldState("shippingZip", formState).error ||
          !!watch("shippingZip") === "" ||
          getFieldState("shippingCountry", formState).error ||
          !!watch("shippingCountry") === ""
        ) {
          return true
        } else {
          return false
        }
      case 6:
        return !invoiceState.products.length > 0 ? true : false
      case 7:
        return false
      case 8:
        return false
    }
  }

  return (
    <div className="flex h-full w-full flex-col justify-between">
      <div className="max-h-[58dvh] flex-1 overflow-y-scroll p-3">
        <form noValidate>{formSwitch()}</form>
      </div>
      <div className="flex w-full justify-between">
        <button
          onClick={() => {
            // Step reduction logic
            setStep(step - 1)
            sessionStorage.setItem("step", step - 1)
          }}
          className="hover:bg-secondaryBtnHover rounded-rounded px-3 py-1 text-xl text-foreground transition-colors duration-150 disabled:text-gray-400 disabled:hover:bg-transparent"
        >
          Go Back
        </button>
        <button type="button" onClick={handlePrint}>
          Print
        </button>
        {step === 9 ? (
          <motion.button
            initial={{ scale: 1 }}
            whileTap={isDirty && isValid && { scale: 0.85 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              console.log(invoiceState)
              dispatch(createInvoice(invoiceState))
              sessionStorage.clear()
              navigate("/invoice")
            }}
            // disabled={setDisabled()}
            className="disabled:text-disabledText select-none rounded-rounded bg-primary px-3 py-1 text-xl font-semibold text-white transition-colors duration-150 hover:bg-primaryLight disabled:cursor-default disabled:bg-primaryLight"
          >
            Save
          </motion.button>
        ) : (
          <motion.button
            initial={{ scale: 1 }}
            whileTap={!setDisabled() && { scale: 0.85 }}
            transition={{ duration: 0.2 }}
            disabled={setDisabled()}
            className="disabled:text-disabledText rounded-rounded bg-primary px-3 py-1 text-xl font-semibold text-white transition-colors duration-150 hover:bg-primaryLight disabled:cursor-default disabled:bg-primaryLight"
            onClick={() => {
              if (step < 9) {
                console.log(invoiceState)
                setStep(step + 1)
                sessionStorage.setItem("step", step + 1)
              }
            }}
          >
            Next
          </motion.button>
        )}
      </div>
    </div>
  )
}

export default MultiStepFormGST
