import React, { useEffect, useState } from "react";
import Modal from "./modal";
import Swal from "sweetalert2";
import { axiosAuth } from "@/lib/axios";
import { getProductById, updateProduct, deleteProductById, createProduct, uploadImage } from "@/api/productApi";

interface ProductItem {
    _id?: string;
    name: string;
    price: number;
    stock: number;
    img: string;
    kind: string;
}

interface ProductModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    id: string | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, setIsOpen, id }) => {
    const [productData, setProductData] = useState<ProductItem>({
        name: "",
        price: 0,
        stock: 0,
        img: "",
        kind: "",
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [validationErrors, setValidationErrors] = useState<{ price?: string; stock?: string }>({});

    const fetchProductData = async (id: string) => {
        try {
            setLoading(true);
            const response = await getProductById(axiosAuth, id);
            setProductData(response.data);
        } catch (err) {
            setError("Failed to fetch product data.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const validateFields = (): boolean => {
        const errors: { price?: string; stock?: string } = {};
        let isValid = true;

        // Validate price
        if (productData.price <= 0 || isNaN(productData.price)) {
            errors.price = "Price must be a positive number";
            isValid = false;
        }

        // Validate stock
        if (productData.stock < 0 || isNaN(productData.stock)) {
            errors.stock = "Stock must be a positive number";
            isValid = false;
        }

        setValidationErrors(errors);
        return isValid;
    };

    const saveProductData = async () => {
        if (!validateFields()) {
            return; // Don't proceed if validation fails
        }

        try {
            setLoading(true);
            if (id) {
                if (imageFile) {
                    const formData = new FormData();
                    formData.append("file", imageFile);
                    const uploadResponse = await uploadImage(axiosAuth, formData);
                    productData.img = uploadResponse.data.path;
                }

                await updateProduct(axiosAuth, id, productData);
                Swal.fire({
                    icon: "success",
                    title: "Updated Successfully",
                    text: "The product data has been updated.",
                });
            } else {
                if (imageFile) {
                    const formData = new FormData();
                    formData.append("file", imageFile);
                    const uploadResponse = await uploadImage(axiosAuth, formData);
                    productData.img = uploadResponse.data.path;
                }

                await createProduct(axiosAuth, productData);
                Swal.fire({
                    icon: "success",
                    title: "Created Successfully",
                    text: "The new product item has been added.",
                });
            }
            setIsOpen(false);
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Save Failed",
                text: "Failed to save product data. Please try again.",
            });
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteProductData = async () => {
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
            try {
                await deleteProductById(axiosAuth, id);
                Swal.fire({
                    icon: "success",
                    title: "Deleted Successfully",
                    text: "The product item has been deleted.",
                });
                setIsOpen(false);
            } catch (err) {
                Swal.fire({
                    icon: "error",
                    title: "Delete Failed",
                    text: "Failed to delete product data. Please try again.",
                });
                console.error(err);
            }
        }
    };

    const closeModal = () => {
        console.log(isOpen);

        setIsOpen(false);
        setError(null);
        setProductData({
            name: "",
            price: 0,
            stock: 0,
            img: "",
            kind: "",
        });
        setImageFile(null); // Reset file input
        setValidationErrors({});
    };

    useEffect(() => {
        if (id) fetchProductData(id);
    }, [id]);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files ? event.target.files[0] : null;
        if (file) {
            setImageFile(file);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        const value = e.target.value;
        setProductData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    return (
        <Modal onClose={closeModal} title={id ? "Edit Product" : "Add New Product"}>
            {loading ? (
                <div className="text-center py-4">Loading...</div>
            ) : error ? (
                <div className="text-center py-4 text-red-500">{error}</div>
            ) : (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        saveProductData();
                    }}
                >
                    {/* Name */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={productData.name}
                            onChange={(e) => handleInputChange(e, "name")}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="price">
                            Price
                        </label>
                        <input
                            type="number"
                            id="price"
                            value={productData.price}
                            onChange={(e) =>
                                setProductData((prev) => ({
                                    ...prev,
                                    price: parseFloat(e.target.value),
                                }))}
                            className={`w-full px-3 py-2 border rounded ${validationErrors.price ? 'border-red-500' : ''}`}
                        />
                        {validationErrors.price && (
                            <div className="text-red-500 text-sm">{validationErrors.price}</div>
                        )}
                    </div>

                    {/* Stock */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="stock">
                            Stock
                        </label>
                        <input
                            type="number"
                            id="stock"
                            value={productData.stock}

                            onChange={(e) =>
                                setProductData((prev) => ({
                                    ...prev,
                                    stock: parseFloat(e.target.value),
                                }))}
                            className={`w-full px-3 py-2 border rounded ${validationErrors.stock ? 'border-red-500' : ''}`}
                        />
                        {validationErrors.stock && (
                            <div className="text-red-500 text-sm">{validationErrors.stock}</div>
                        )}
                    </div>

                    {/* Kind */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="type">
                            Type
                        </label>
                        <select
                            id="kind"
                            value={productData.kind}
                            onChange={(e) =>
                                setProductData((prev) => ({
                                    ...prev,
                                    kind: e.target.value,
                                }))
                            }
                            className="w-full px-3 py-2 border rounded"
                        >
                            <option value="">Select Type</option>
                            <option value="snack">Snack</option>
                            <option value="drink">Drink</option>
                        </select>
                    </div>

                    {/* Image Upload */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor="image">
                            Image
                        </label>
                        <input
                            type="file"
                            id="image"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>

                    <div className="flex justify-between">
                        {id && (
                            <button
                                type="button"
                                className="px-4 py-2 bg-red-500 text-white rounded"
                                onClick={deleteProductData}
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

export default ProductModal;
