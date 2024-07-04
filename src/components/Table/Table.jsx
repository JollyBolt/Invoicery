import { useMemo } from "react"
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table"

const Table = ({
  tableColumns,
  tableData,
  pageCount,
  pagination,
  setPagination,
}) => {
  const columns = useMemo(() => tableColumns, [])
  const data = useMemo(() => tableData, [tableData])

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: pageCount,
  })

  const {
    getCanNextPage,
    getCanPreviousPage,
    previousPage,
    nextPage,
    firstPage,
    lastPage,
  } = table

  return (
    <>
      <div className="mt-5 flex h-full w-full flex-1 flex-col">
        <table className="h-full w-full rounded-rounded">
          <thead className="h-14 rounded-rounded bg-primary text-left text-xl text-white">
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
              <tr
                className="h-10 odd:bg-gray-200 even:bg-gray-100"
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <td className="px-5 py-[11px]" key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-2 flex w-full items-center justify-center gap-3">
        <button
          disabled={!getCanPreviousPage()}
          onClick={() => {
            firstPage()
          }}
          className="rounded-rounded bg-primary p-2 px-4 font-bold uppercase text-white disabled:opacity-40"
        >
          First
        </button>
        <button
          disabled={!getCanPreviousPage()}
          onClick={() => previousPage()}
          className="rounded-rounded bg-primary p-2 px-4 font-bold uppercase text-white disabled:opacity-40"
        >
          Prev
        </button>

        <p className="text-lg">
          Page {pagination.pageIndex + 1} of {table.getPageCount()}
        </p>

        <button
          disabled={!getCanNextPage()}
          onClick={() => nextPage()}
          className="rounded-rounded bg-primary p-2 px-4 font-bold uppercase text-white disabled:opacity-40"
        >
          Next
        </button>
        <button
          disabled={!getCanNextPage()}
          onClick={() => lastPage()}
          className="rounded-rounded bg-primary p-2 px-4 font-bold uppercase text-white disabled:opacity-40"
        >
          Last
        </button>
      </div>
    </>
  )
}

export default Table
