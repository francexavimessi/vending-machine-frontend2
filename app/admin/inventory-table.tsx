"use client";
import React, { useEffect, useState } from "react";
import Table from "./table";
import { getInventoryAll } from "@/api/inventoryApi";
import { axiosAuth } from "@/lib/axios";
import InventoryModal from "@/components/inventory-modal";

// Define type for a single inventory item
interface InventoryItem {
    _id: string;
    type: string;
    denomination: string; // Assuming denomination is a string
    quantity: number;
    [key: string]: string | number; // Add index signature here to match RowData
}

// Define type for the API response data
interface InventoryApiResponse {
    items: InventoryItem[]; // Array of inventory items
    totalItems: number;     // Total number of items in the inventory
}

const InventoryTable = () => {
    const [data, setData] = useState<InventoryItem[]>([]); // Data typed as InventoryItem[]
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState<string>("");

    const pageSize = 5; // Number of items per page

    // Columns definition
    const columns = [
        { header: "Type", accessor: "type" },
        { header: "Denomination", accessor: "denomination" },
        { header: "Quantity", accessor: "quantity" },
    ];

    // Transform data from API response
    const transformData = (data: InventoryItem[]): InventoryItem[] => {
        return data.map((item) => ({
            _id: item._id,
            type: item.type,
            denomination: `$${item.denomination}`, // Format denomination as currency
            quantity: item.quantity,
        }));
    };

    // Fetch data from API
    const fetchData = async (page: number) => {
        try {
            setLoading(true);
            const response = await getInventoryAll(axiosAuth, { page, limit: pageSize });

            // Type cast the response to the InventoryApiResponse type
            const rawData = response.data as InventoryApiResponse;

            const transformedData = transformData(rawData.items);
            setData(transformedData);

            const totalItems = rawData.totalItems;
            setTotalPages(Math.ceil(totalItems / pageSize));
        } catch (err) {
            console.error("Error fetching data:", err);
            setError("Failed to load data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage, showModal]);

    if (loading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-4 text-red-500">{error}</div>;
    }

    const onClickRow = async (id: string) => {
        setShowModal(true);
        setId(id);
    };

    const handleAddNewClick = () => {
        setId("");
        setShowModal(true);
    };

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-2xl font-semibold mb-6">Inventory Table</h1>
            <button
                onClick={handleAddNewClick}
                className="px-4 py-2 bg-green-500 text-white rounded mb-4"
            >
                Add New Inventory
            </button>
            <Table
                columns={columns}
                data={data} // Pass data of type InventoryItem[]
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
                className="rounded shadow-lg"
                onClickRow={onClickRow}
            />
            {showModal && <InventoryModal isOpen={showModal} setIsOpen={setShowModal} id={id} />}
        </div>
    );
};

export default InventoryTable;
