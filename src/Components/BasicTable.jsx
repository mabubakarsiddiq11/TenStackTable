import "./BasicTable.css";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import mockData from "./MockData.json";
import { columns } from "./Columns";
import React, { useState } from "react";

function BasicTable() {
  const finalData = React.useMemo(() => mockData, []);
  const FinalColumns = React.useMemo(() => columns, []);
  const [filtering, setFiltering] = useState("");

  const tableInstance = useReactTable({
    data: finalData,
    columns: FinalColumns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setFiltering,
    state: {
      globalFilter: filtering,
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
    </div>
  );
}

export default BasicTable;
