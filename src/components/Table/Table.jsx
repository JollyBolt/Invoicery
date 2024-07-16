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
      pagination,
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
    <div className="flex h-full flex-col">
      <div className="border-border flex w-full flex-col rounded-md border bg-background px-4 py-2 text-foreground">
        <table className="w-full rounded-rounded px-2">
          <thead className="h-11 rounded-rounded text-left text-sm text-slate-600">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className="p-5" key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    className="px-5 capitalize"
                    key={header.id}
                    style={{ width: `${header.getSize()}%` }}
                  >
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
                className="border-border max-h-20 grow-0 border-t text-sm"
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    className="px-5 py-[14px]"
                    key={cell.id}
                    style={{ width: `${cell.column.getSize()}%` }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex w-full items-center justify-center gap-3 text-sm">
        <button
          disabled={!getCanPreviousPage()}
          onClick={() => {
            firstPage()
          }}
          className="rounded-rounded bg-primary p-1 px-4 font-bold uppercase text-white disabled:opacity-40"
        >
          First
        </button>
        <button
          disabled={!getCanPreviousPage()}
          onClick={() => previousPage()}
          className="rounded-rounded bg-primary p-1 px-4 font-bold uppercase text-white disabled:opacity-40"
        >
          Prev
        </button>

        <p className="text-sm text-foreground">
          Page {pagination.pageIndex + 1} of {table.getPageCount()}
        </p>

        <button
          disabled={!getCanNextPage()}
          onClick={() => nextPage()}
          className="rounded-rounded bg-primary p-1 px-4 font-bold uppercase text-white disabled:opacity-40"
        >
          Next
        </button>
        <button
          disabled={!getCanNextPage()}
          onClick={() => lastPage()}
          className="rounded-rounded bg-primary p-1 px-4 font-bold uppercase text-white disabled:opacity-40"
        >
          Last
        </button>
      </div>
    </div>
  )
}

export default Table
