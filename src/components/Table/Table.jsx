import { useMemo } from "react"
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table"
import { BsThreeDotsVertical } from "../../assets"

const Table = ({ tableColumns, tableData }) => {
    const [showActions, setShowActions] = useState(false)
    const columns = useMemo(() => tableColumns, [])
    const data = useMemo(() => tableData, [tableData])
    // console.log(data)
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    return (
        <table className="w-full">
            <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        <th>Index</th>
                        {headerGroup.headers.map((header) => (
                            <th key={header.id}>
                                {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                )}
                            </th>
                        ))}
                        <th>Actions</th>
                    </tr>
                ))}
            </thead>
            <tbody>
                {table.getRowModel().rows.map((row,index) => (
                    <tr key={row.id}>
                        <td >{ index +1}</td>
                        {
                            row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))
                        }
                        <td>
                            <button>
                                <BsThreeDotsVertical />
                                <div className={`absolute ${!showActions && "hidden"} flex flex-col`}>
                                    

                                </div>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table
