import { useMemo, useState } from "react"
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table"

const Table = ({ tableColumns, tableData }) => {
  const columns = useMemo(() => tableColumns, [])
  const data = useMemo(() => tableData, [tableData])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })
  return (
    <table className="mt-5 w-full rounded-rounded overflow-hidden">
      <thead className="h-14 rounded-rounded bg-primary text-left text-white text-xl">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr className="p-5" key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th className="px-5" key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row, index) => (
          <tr className="h-10 even:bg-gray-100 odd:bg-gray-200" key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td className="px-5 py-[10px]" key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
