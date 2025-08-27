"use client";
import React, { useState } from "react";

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { Accident, makeData } from "@/helpers/makeData";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type Props = {};

export default function DataTable({}: Props) {
  const columns = React.useMemo<ColumnDef<Accident, any>[]>(
    () => [
      {
        accessorFn: (row) => row.city,
        id: "city",
        cell: (info) => info.getValue(),
        header: () => <span>City</span>,
        footer: () => <span>City</span>,
      },
      {
        accessorFn: (row) => row.latitude,
        id: "latitude",
        cell: (info) => info.getValue(),
        header: () => <span>Latitude</span>,
        footer: () => <span>Latitude</span>,
      },
      {
        accessorFn: (row) => row.longitude,
        id: "longitude",
        cell: (info) => info.getValue(),
        header: () => <span>Longitude</span>,
        footer: () => <span>Longitude</span>,
      },
      {
        accessorFn: (row) => row.severetyInPercentage,
        id: "severetyInPercentage",
        cell: (info) => info.getValue(),
        header: () => <span>Severety(%)</span>,
        footer: () => <span>Severety(%)</span>,
      },
      {
        accessorFn: (row) => row.severty,
        id: "severty",
        cell: (info) => info.getValue(),
        header: () => <span>Severty</span>,
        footer: () => <span>Severty</span>,
      },
      {
        id: "details",
        cell: (info) => (
          <Link
            href={""}
            className="flex items-center space-x-1 text-orange-600 font-bold underline"
          >
            <span>View</span>
            <span>
              <ArrowUpRight width={20} height={20} />
            </span>
          </Link>
        ),
        header: () => <span>View Details</span>,
        footer: () => <span>View Details</span>,
      },
    ],
    []
  );
  const [data, setData] = useState<Accident[]>(() => makeData(100));

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div className="">
      <h2 className="text-xl sm:text-2xl pb-5">Accident Datas</h2>

      <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-900 scrollbar-track-gray-500">
        <table className="w-full table-auto bg-white border-collapse overflow-hidden">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th key={header.id} className="border px-4 py-2">
                        {header.isPlaceholder ? null : (
                          <>
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </>
                        )}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td key={cell.id} className="border px-4 py-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="pt-3 flex space-x-5 items-center">
          <div>
            <button
              className="border border-gray-300 rounded px-5 py-2 bg-white"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              First
            </button>
            <button
              className="border border-gray-300 rounded px-5 py-2 bg-white"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
            <button
              className="border border-gray-300 rounded px-5 py-2 bg-white"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
            <button
              className="border border-gray-300 rounded px-5 py-2 bg-white"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              Last
            </button>
          </div>

          {/* <div>
            <p>Jump to page</p>
            <input
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16"
            />
          </div> */}
          <div>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="border border-gray-300 rounded px-5 py-2 bg-white"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
          <div className="flex">
            <p className="font-bold">Page ~ </p>
            <p>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
