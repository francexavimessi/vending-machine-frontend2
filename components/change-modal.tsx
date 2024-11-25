import React, { useEffect, useState } from "react";
import Modal from "./modal";
import { useTransactionStore } from "@/stores/use-transaction-store";
import { useModalStore } from "@/stores/use-modal-store";
import { useCartStore } from "@/stores/use-cart-store";
import { useMoneyStore } from "@/stores/use-money-store";

interface ChangeModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const ChangeModal: React.FC<ChangeModalProps> = ({ isOpen, setIsOpen }) => {
    const [loading, setLoading] = useState(true); // To track the loading state
    const [countdown, setCountdown] = useState(30); // Countdown starting at 30 seconds

    const transaction = useTransactionStore((state) => state.transaction);
    const setChangeShowModal = useModalStore((state) => state.setChangeShowModal);
    const clearCart = useCartStore((state) => state.clearCart);
    const resetMoney = useMoneyStore((state) => state.resetMoney);
    const closeModal = () => {
        // Delay state change to avoid React warnings
        setTimeout(() => {
            setChangeShowModal(false);
            setIsOpen(false);
            resetMoney(); // Clear the money store (if needed)
            clearCart();

        }, 0);
    };

    // Handle countdown and modal closing
    useEffect(() => {
        if (isOpen) {
            // Set loading state for 5 seconds
            const loadingTimeout = setTimeout(() => setLoading(false), 2000);

            // Countdown timer
            const countdownInterval = setInterval(() => {
                setCountdown((prev) => {
                    if (prev > 1) return prev - 1;
                    clearInterval(countdownInterval);
                    return 0;
                });
            }, 1000);

            // Clean up timers
            return () => {
                clearTimeout(loadingTimeout);
                clearInterval(countdownInterval);
            };
        }
    }, [isOpen]);

    useEffect(() => {
        if (countdown === 0) {
            closeModal(); // Close the modal when countdown reaches 0
        }
    }, [countdown]);

    return (
        <>
            {isOpen && (
                <Modal onClose={closeModal} title="Processing...">
                    <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
                        <div className="absolute top-4 right-4 bg-yellow-600 text-white text-sm px-3 py-1 rounded-full shadow">
                            {countdown}s
                        </div>

                        <div className="flex flex-col justify-between h-auto">
                            {loading ? (
                                <div className="flex justify-center items-center h-72">
                                    <div className="w-12 h-12 border-4 border-yellow-600 border-t-transparent border-t-4 rounded-full animate-spin"></div>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Process Completed</h3>
                                    {transaction && (
                                        <div className="mt-6 text-left text-gray-700">
                                            <p><strong>Transaction ID:</strong> {transaction.transactionId}</p>
                                            <p><strong>Timestamp:</strong> {new Date(transaction.timestamp).toLocaleString()}</p>
                                            <p><strong>Total Cost:</strong> {transaction.totalCost} THB</p>
                                            <p><strong>Total Paid:</strong> {transaction.totalPaid} THB</p>

                                            <h4 className="mt-4 text-lg font-semibold text-gray-800">Validated Products:</h4>
                                            <ul className="list-disc pl-5 space-y-1">
                                                {transaction.validatedProducts.map((product) => (
                                                    <li key={product.productId}>
                                                        {product.productName} (x{product.quantity}) - {product.price} THB
                                                    </li>
                                                ))}
                                            </ul>

                                            {transaction.change && transaction.change.length > 0 && (
                                                <div className="mt-4">
                                                    <h4 className="text-lg font-semibold text-gray-800">Change:</h4>
                                                    <ul className="list-disc pl-5 space-y-1">
                                                        {transaction.change.map((item, index) => (
                                                            <li key={index}>
                                                                {item.denomination} THB x {item.quantity}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                        <button
                            onClick={closeModal}
                            className="mt-6 w-full py-2 bg-yellow-600 text-white font-semibold rounded-lg shadow hover:bg-yellow-700 transition"
                        >
                            Close Modal
                        </button>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default ChangeModal;
