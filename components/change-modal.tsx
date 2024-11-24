import React, { useEffect, useState } from "react";
import Modal from "./modal";
import { useTransactionStore } from "@/stores/use-transaction-store";
import { useModalStore } from "@/stores/use-modal-store";

interface ChangeModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const ChangeModal: React.FC<ChangeModalProps> = ({ isOpen, setIsOpen }) => {
    const [loading, setLoading] = useState(true); // To track the loading state
    const [countdown, setCountdown] = useState(30); // Countdown starting at 60 seconds

    const closeModal = () => setChangeShowModal(false);
    const transaction = useTransactionStore((state) => state.transaction);
    const setChangeShowModal = useModalStore((state) => state.setChangeShowModal);

    // 5-second loading animation and countdown
    useEffect(() => {
        if (isOpen) {
            // Loading state for 5 seconds
            const loadingTimeout = setTimeout(() => {
                setLoading(false); // End loading after 5 seconds
            }, 5000);

            // Countdown for 60 seconds
            const countdownInterval = setInterval(() => {
                setCountdown((prevCountdown) => {
                    if (prevCountdown > 1) return prevCountdown - 1;
                    else {
                        clearInterval(countdownInterval);
                        closeModal(); // Close modal when countdown reaches 0
                        return 0;
                    }
                });
            }, 1000); // Update countdown every second

            // Clean up the timers on unmount or when modal closes
            return () => {
                clearTimeout(loadingTimeout);
                clearInterval(countdownInterval);
            };
        }
    }, [isOpen]);

    useEffect(() => {
        if (transaction) {
            const loadingTimeout = setTimeout(() => {
                setLoading(false); // End loading after 5 seconds
            }, 5000);
            return () => {
                clearTimeout(loadingTimeout);
            };
        }
    }, [transaction]);

    return (
        <>
            {isOpen && (
                <Modal onClose={closeModal} title="Processing...">
                    <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
                        {/* Countdown Timer */}
                        <div className="absolute top-4 right-4 bg-yellow-600 text-white text-sm px-3 py-1 rounded-full shadow">
                            {countdown}s
                        </div>

                        {/* Main Content */}
                        <div className="flex justify-center items-center h-72">
                            {loading ? (
                                // Animated spinner with modern style
                                <div className="w-12 h-12 border-4 border-yellow-600 border-t-transparent border-t-4 rounded-full animate-spin"></div>
                            ) : (
                                <div className="text-center">
                                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Process Completed</h3>

                                    {/* Transaction Details */}
                                    {transaction && (
                                        <div className="mt-6 text-left text-gray-700">
                                            <p><strong>Transaction ID:</strong> {transaction.transactionId}</p>
                                            <p><strong>Timestamp:</strong> {new Date(transaction.timestamp).toLocaleString()}</p>
                                            <p><strong>Total Cost:</strong> {transaction.totalCost} THB</p>
                                            <p><strong>Total Paid:</strong> {transaction.totalPaid} THB</p>

                                            <h4 className="mt-4 text-lg font-semibold text-gray-800">Validated Products:</h4>
                                            <ul className="list-disc pl-5 space-y-1">
                                                {transaction.validatedProducts.map((product) => (
                                                    <li key={product.productId} className="text-gray-700">
                                                        {product.productName} (x{product.quantity}) - {product.price} THB
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Display change if available */}
                                            {transaction.change && transaction.change.length > 0 && (
                                                <div className="mt-4">
                                                    <h4 className="text-lg font-semibold text-gray-800">Change:</h4>
                                                    <ul className="list-disc pl-5 space-y-1">
                                                        {transaction.change.map((item, index) => (
                                                            <li key={index} className="text-gray-700">
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
                    </div>
                </Modal>
            )}
        </>
    );
};

export default ChangeModal;
