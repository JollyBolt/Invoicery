import CustomerActionsDropdown from "./CustomerActionsDropdown"
import ProductActionsDropdown from "./ProductActionsDropdown"
import InvoiceActionsDropdown from "./InvoiceActionsDropdown"

export const productColumns = [
  {
    id: "col1",
    header: "Index",
    cell: (row) => {
      const pageIndex = row.table.getState().pagination.pageIndex
      const pageSize = row.table.getState().pagination.pageSize
      return pageIndex * pageSize + row.row.index + 1
    },
  },
  {
    id: "col2",
    header: "Name",
    accessorKey: "name",
  },
  {
    id: "col3",
    header: "HSN Code",
    accessorKey: "hsn_code",
  },
  {
    id: "col4",
    header: "Price(INR)",
    cell: (row) => {
      return row.row.original.price.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    },
  },
  {
    id: "col5",
    cell: (row) => <ProductActionsDropdown row={row.row} />,
  },
]

export const customerColumns = [
  {
    id: "col1",
    header: "Index",
    cell: (row) => {
      const pageIndex = row.table.getState().pagination.pageIndex
      const pageSize = row.table.getState().pagination.pageSize
      return pageIndex * pageSize + row.row.index + 1
    },
  },
  {
    id: "col2",
    header: "Client",
    accessorKey: "client",
  },
  {
    id: "col3",
    header: "Phone",
    accessorKey: "phone",
  },
  {
    id: "col4",
    cell: (row) => <CustomerActionsDropdown row={row.row} />,
  },
]

export const invoiceColumns = [
  {
    id: "col1",
    header: "Index",
    cell: (row) => {
      const pageIndex = row.table.getState().pagination.pageIndex
      const pageSize = row.table.getState().pagination.pageSize
      return pageIndex * pageSize + row.row.index + 1
    },
  },
  {
    id: "col2",
    header: "Invoice Number",
    accessorKey: "invoiceNumber",
  },
  {
    id: "col3",
    header: "Issued To",
    accessorKey: "customer.name",
  },
  {
    id: "col4",
    header: "Amount",
    // accessorKey: "totalAmount",
    cell: (row) => {
      return row.row.original.totalAmount.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    },
  },
  {
    id: "col5",
    header: "Date",
    cell: (row) => {
      console.log(row.row.original)
      return (
        row.row.original.invoiceDate.day +
        "/" +
        row.row.original.invoiceDate.month +
        "/" +
        row.row.original.invoiceDate.year
      )
    },
  },
  {
    id: "col6",
    cell: (row) => <InvoiceActionsDropdown row={row.row} />,
  },
]

export const recentInvoices = [
  {
    id: "col2",
    header: "Invoice Number",
    accessorKey: "invoiceNumber",
  },
  {
    id: "col3",
    header: "Issued To",
    accessorKey: "customer.name",
  },
  {
    id: "col4",
    header: "Amount",
    accessorKey: "amount",
  },
]
