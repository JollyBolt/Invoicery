import CustomerActions from "./CustomerActions"
import ProductActions from "./ProductActions"
import InvoiceActions from "./InvoiceActions"
import { displayPhone } from "../../utils/displayPhone"
import { displayDate } from "../../utils/displayDate"

export const productColumns = [
  {
    id: "col1",
    header: "Index",
    size: 10,
    minSize: 10,
    cell: (row) => {
      const pageIndex = row.table.getState().pagination.pageIndex
      const pageSize = row.table.getState().pagination.pageSize
      return pageIndex * pageSize + row.row.index + 1
    },
  },
  {
    id: "col2",
    header: "Name",
    size: 30,
    accessorKey: "name",
  },
  {
    id: "col3",
    header: "HSN Code",
    size: 20,
    accessorKey: "hsn_code",
  },
  {
    id: "col4",
    header: "Price",
    size: 20,
    cell: (row) => {
      return (
        "₹ " +
        row.row.original.price.toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      )
    },
  },
  {
    id: "col5",
    header: "Actions",
    size: 20,
    cell: (row) => <ProductActions row={row.row} />,
  },
]

export const customerColumns = [
  {
    id: "col1",
    header: "Index",
    size: 10,
    minSize: 10,
    cell: (row) => {
      const pageIndex = row.table.getState().pagination.pageIndex
      const pageSize = row.table.getState().pagination.pageSize
      return pageIndex * pageSize + row.row.index + 1
    },
  },
  {
    id: "col2",
    header: "Client",
    size: 45,
    accessorKey: "client",
  },
  {
    id: "col3",
    header: "Phone",
    size: 20,
    accessorKey: "phone",
    cell: (row) => {
      return displayPhone(row.row.original.phone)
    },
  },
  {
    id: "col4",
    header: "Actions",
    size: 30,
    cell: (row) => <CustomerActions row={row.row} />,
  },
]

export const invoiceColumns = [
  {
    id: "col1",
    header: "Index",
    size: 10,
    minSize: 10,
    cell: (row) => {
      const pageIndex = row.table.getState().pagination.pageIndex
      const pageSize = row.table.getState().pagination.pageSize
      return pageIndex * pageSize + row.row.index + 1
    },
  },
  {
    id: "col2",
    header: "Invoice Number",
    size: 15,
    accessorKey: "invoiceNumber",
  },
  {
    id: "col3",
    header: "Issued To",
    size: 30,
    accessorKey: "customer.name",
  },
  {
    id: "col4",
    header: "Amount",
    size: 20,
    cell: (row) => {
      return (
        "₹ " +
        row.row.original.totalAmount.toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      )
    },
  },
  {
    id: "col5",
    header: "Date",
    size: 20,
    cell: (row) => {
      return displayDate(row.row.original.invoiceDate)
    },
  },
  {
    id: "col6",
    header: "Actions",
    size: 30,
    cell: (row) => <InvoiceActions row={row.row} />,
  },
]

export const customerInvoicesColumns = [
  {
    id: "col1",
    header: "Index",
    size: 10,
    minSize: 10,
    cell: (row) => {
      const pageIndex = row.table.getState().pagination.pageIndex
      const pageSize = row.table.getState().pagination.pageSize
      return pageIndex * pageSize + row.row.index + 1
    },
  },
  {
    id: "col2",
    header: "Invoice Number",
    size: 20,
    accessorKey: "invoiceNumber",
  },
  {
    id: "col3",
    header: "Amount",
    size: 20,
    cell: (row) => {
      return (
        "₹ " +
        row.row.original.totalAmount.toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      )
    },
  },
  {
    id: "col4",
    header: "Date",
    size: 20,
    cell: (row) => {
      return displayDate(row.row.original.invoiceDate)
    },
  },
  {
    id: "col5",
    header: "Actions",
    size: 30,
    enableResizing: false,
    cell: (row) => <InvoiceActions row={row.row} />,
  },
]
