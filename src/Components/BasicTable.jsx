import "./BasicTable.css";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table";
import mockData from "./MockData.json";
import { columns } from "./Columns";
import React, { useState } from "react";

function BasicTable() {
  const finalData = React.useMemo(() => mockData, []);
  const FinalColumns = React.useMemo(() => columns, []);

  // Filter State
  const [filtering, setFiltering] = useState("");
  // Sorting State
  const [sorting, setSorting] = useState([]);

  const tableInstance = useReactTable({
    data: finalData,
    columns: FinalColumns,
    getCoreRowModel: getCoreRowModel(),
    // Filter Manage
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setFiltering,
    // Sorting Manage
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    // Pagination
    getPaginationRowModel: getPaginationRowModel(),

    state: {
      globalFilter: filtering,
      sorting,
    },
  });

  // console.log("Test", tableInstance.getHeaderGroups());

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
      <br />
      <hr />
      <table>
        <thead>
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {/* Add This Sorting Method */}
                  {header.column.getIsSorted() === "asc"
                    ? " 👆"
                    : header.column.getIsSorted() === "desc"
                    ? " 👇"
                    : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {tableInstance.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    {/* Pagination  */}
    <div>
    <button
        onClick={() => tableInstance.setPageIndex(0)}
        disabled={!tableInstance.getCanPreviousPage()}
      >
        {"<<"}
      </button>
      <button
        onClick={() => tableInstance.previousPage()}
        disabled={!tableInstance.getCanPreviousPage()}
      >
        {"Pre"}
      </button>
      <button
        onClick={() => tableInstance.nextPage()}
        disabled={!tableInstance.getCanNextPage()}
      >
        {"Next"}
      </button>
      <button
        onClick={() =>
          tableInstance.setPageIndex(tableInstance.getPageCount() - 1)
        }
        disabled={!tableInstance.getCanNextPage()}
      >
        {">>"}
      </button>
      <h4>
        You are on Page No {tableInstance.options.state.pagination.pageIndex}
      </h4>
    </div>
    </div>
  );
}

export default BasicTable;
