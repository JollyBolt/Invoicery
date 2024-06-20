import CustomerActionsDropdown from "./CustomerActionsDropdown"
import ProductActionsDropdown from "./ProductActionsDropdown"

export const productColumns = [
  {
    id: "col1",
    header: "Index",
    cell: (row) => {
      return row.row.index + 1
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
    accessorKey: "price",
  },
  {
    id: "col5",
    cell: (row) => <ProductActionsDropdown row={row.row}  />,
  },
]

export const customerColumns = [
    {
        id:'col1',
        header: 'Index',
        cell: (row) => {return row.row.index + 1 }
    },
    {
        id: 'col2',
        header: 'Client',
        accessorKey: 'client'
    },
    {
        id: 'col3',
        header: 'Phone',
        accessorKey: 'phone'
    },
    {
        id: 'col4',
        cell: (row) => <CustomerActionsDropdown row={ row.row }  /> 
    }
]

export const invoiceColumns = [

]