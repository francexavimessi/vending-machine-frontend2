"use client";
import React, { useEffect, useState } from "react";
import Table from "./table";
import { getProductAll } from "@/api/productApi";
import { axiosAuth } from "@/lib/axios";
import ProductModal from "@/components/product-modal";
import { Backend_URL } from "@/lib/constant";

// Define the structure for a single product
interface Product {
    _id: string;
    name: string;
    img: string;
    price: string;
    stock: number;
    kind: string; // Assuming 'kind' is the category
    [key: string]: string | number; // Add index signature here to match RowData
}

// Define the structure of the API response
interface ProductApiResponse {
    items: Product[];  // Array of products
    totalItems: number; // Total number of products
}

const ProductTable = () => {
    const [data, setData] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [id, setId] = useState<string>("");

    const pageSize = 5;

    const columns = [
        { header: "Name", accessor: "name" },
        { header: "Price", accessor: "price" },
        { header: "Stock", accessor: "stock" },
        { header: "Category", accessor: "kind" },
        
        {
            header: "Image",
            accessor: "img",
            render: (value: React.ReactNode, row: Product) => (
                <img
                    src={Backend_URL + `images/${row.img}`}
                    alt="Product"
                    className="w-16 h-16 object-cover"
                />
            ),
        },
    ];

    // Transform data from API response
    const transformData = (data: Product[]): Product[] => {
        return data.map((item) => ({
            _id: item._id,
            name: item.name,
            img: item.img,
            price: `$${item.price}`,
            stock: item.stock,
            kind: item.kind, // Rename 'kind' to 'category' for consistency
        }));
    };

    // Fetch data from API
    const fetchData = async (page: number) => {
        try {
            setLoading(true);
            const response = await getProductAll(axiosAuth, { page, limit: pageSize });

            // Type cast the response to the ProductApiResponse type
            const rawData = response.data as ProductApiResponse;
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

    // Handle row click to open the modal
    const onClickRow = async (id: string) => {
        setShowModal(true);
        setId(id);
    };

    // Handle adding a new product
    const handleAddNewClick = () => {
        setId("");
        setShowModal(true);
    };

    // Fetch data when page changes or modal is shown
    useEffect(() => {
        fetchData(currentPage);
    }, [currentPage, showModal]);

    if (loading) {
        return <div className="text-center py-4">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-4 text-red-500">{error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <h1 className="text-2xl font-semibold mb-6">Product Table</h1>
            <button
                onClick={handleAddNewClick}
                className="px-4 py-2 bg-green-500 text-white rounded mb-4"
            >
                Add New Product
            </button>
            <Table // Pass Product type to Table component
                columns={columns}
                data={data}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
                onClickRow={onClickRow}
                className="rounded shadow-lg"
            />
            {showModal && <ProductModal isOpen={showModal} setIsOpen={setShowModal} id={id} />}
        </div>
    );
};

export default ProductTable;
