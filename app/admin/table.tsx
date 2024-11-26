"use client";
import React from "react";

// Define the structure for a row's data
interface RowData {
    [key: string]: string | number | React.ReactNode; // The value for each column could be a string, number, or React element (e.g., an image)
}

interface Column<T extends RowData> {
    header: string;
    accessor: keyof T; // The key in the data object for this column
    render?: (value: string | number | React.ReactNode, row: T) => React.ReactNode; // Optional custom render function
}

interface TableProps<T extends RowData> {
    columns: Column<T>[]; // Columns definition
    data: T[]; // The data to display (each row is of type T)
    currentPage: number; // Current page number
    totalPages: number; // Total number of pages
    onPageChange: (page: number) => void; // Callback for page changes
    className?: string; // Custom className for table container
    onClickRow: (id: string) => void; // Callback for row click
}

const Table = <T extends RowData>({
    columns,
    data,
    currentPage,
    totalPages,
    onPageChange,
    className = "",
    onClickRow,
}: TableProps<T>) => {
    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className={`overflow-hidden rounded-lg border border-gray-300 ${className}`}>
            <div className="overflow-x-auto max-w-full">
                <table className="table-auto w-full bg-white text-sm text-left">
                    {/* Table Header */}
                    <thead className="bg-gray-100 text-gray-700 uppercase text-sm sticky top-0 z-10">
                        <tr>
                            {columns.map((col, index) => (
                                <th
                                    key={index}
                                    className="px-4 py-2 border-b border-gray-300 font-medium"
                                >
                                    {col.header}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody>
                        {data.length > 0 ? (
                            data.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className="hover:bg-gray-50 transition duration-150 cursor-pointer"
                                    onClick={() => onClickRow(row["_id"] as string)} // Trigger row click callback
                                >
                                    {columns.map((col, colIndex) => (
                                        <td
                                            key={colIndex}
                                            className="px-4 py-2 border-b border-gray-300"
                                        >
                                            {col.render
                                                ? col.render(row[col.accessor], row)
                                                : row[col.accessor]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="text-center py-4 text-gray-500"
                                >
                                    No data available
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-between items-center bg-gray-100 px-4 py-3 border-t border-gray-300">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={`px-4 py-2 rounded-md ${currentPage === 1
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                <div className="text-gray-700">
                    Page {currentPage} of {totalPages}
                </div>

                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={`px-4 py-2 rounded-md ${currentPage === totalPages
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Table;
