import React, { useEffect, useState } from "react";
import Modal from "./modal";
import Swal from "sweetalert2";
import { axiosAuth } from "@/lib/axios";
import {
    getInventoryById,
    updateInventory,
    deleteInventorById,
    createInventory,
} from "@/api/inventoryApi";


interface InventoryItem {
    _id?: string;
    type: string;
    denomination: number;
    quantity: number;
}

interface InventoryModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    id: string | null; // ID for editing; null for adding new inventory

}

const InventoryModal: React.FC<InventoryModalProps> = ({ isOpen, setIsOpen, id }) => {
    const [inventoryData, setInventoryData] = useState<InventoryItem>({
        type: "",
        denomination: 0,
        quantity: 0,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchInventoryData = async (id: string) => {
        try {
            setLoading(true);
            const response = await getInventoryById(axiosAuth, id);
            setInventoryData(response.data);
        } catch (err) {
            setError("Failed to fetch inventory data.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const saveInventoryData = async () => {
        try {
            if (id) {
                // Update existing inventory
                await updateInventory(axiosAuth, id, inventoryData);
                Swal.fire({
                    icon: "success",
                    title: "Updated Successfully",
                    text: "The inventory data has been updated.",
                });
            } else {
                // Create new inventory
                await createInventory(axiosAuth, inventoryData);
                Swal.fire({
                    icon: "success",
                    title: "Created Successfully",
                    text: "The new inventory item has been added.",
                });
            }
            setIsOpen(false);
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Save Failed",
                text: "Failed to save inventory data. Please try again.",
            });
            console.error(err);
        }
    };

    const deleteInventoryData = async () => {
        try {
            if (!id) return;
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "This action cannot be undone.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#d33",
                cancelButtonColor: "#3085d6",
                confirmButtonText: "Delete",
            });

            if (result.isConfirmed) {
                await deleteInventorById(axiosAuth, id);
                Swal.fire({
                    icon: "success",
                    title: "Deleted Successfully",
                    text: "The inventory item has been deleted.",
                });
                setIsOpen(false);
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Delete Failed",
                text: "Failed to delete inventory data. Please try again.",
            });
            console.error(err);
        }
    };

    const closeModal = () => {
        setIsOpen(false);
        setError(null);
        setInventoryData({
            type: "",
            denomination: 0,
            quantity: 0,
        });
    };

    useEffect(() => {
        if (id) fetchInventoryData(id);
    }, [id]);

    if (!isOpen) return null;

    return (
        <Modal onClose={closeModal} title={id ? "Edit Inventory" : "Add New Inventory"}>
            {loading ? (
                <div className="text-center py-4">Loading...</div>
            ) : error ? (
                <div className="text-center py-4 text-red-500">{error}</div>
            ) : (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        saveInventoryData();
                    }}
                >
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="type">
                            Type
                        </label>
                        <select
                            id="type"
                            value={inventoryData.type}
                            onChange={(e) =>
                                setInventoryData((prev) => ({
                                    ...prev,
                                    type: e.target.value,
                                }))
                            }
                            className="w-full px-3 py-2 border rounded"
                        >
                            <option value="">Select Type</option>
                            <option value="coin">Coin</option>
                            <option value="banknote">Banknote</option>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="denomination">
                            Denomination
                        </label>
                        <input
                            type="number"
                            id="denomination"
                            value={inventoryData.denomination}
                            onChange={(e) =>
                                setInventoryData((prev) => ({
                                    ...prev,
                                    denomination: parseFloat(e.target.value),
                                }))
                            }
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="quantity">
                            Quantity
                        </label>
                        <input
                            type="number"
                            id="quantity"
                            value={inventoryData.quantity}
                            onChange={(e) =>
                                setInventoryData((prev) => ({
                                    ...prev,
                                    quantity: parseInt(e.target.value, 10),
                                }))
                            }
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>

                    <div className="flex justify-between">
                        {id && (
                            <button
                                type="button"
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={deleteInventoryData}
                            >
                                Delete
                            </button>
                        )}
                        <div className="flex">
                            <button
                                type="button"
                                className="mr-4 px-4 py-2 bg-gray-300 rounded"
                                onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-500 text-white rounded"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </Modal>
    );
};

export default InventoryModal;
