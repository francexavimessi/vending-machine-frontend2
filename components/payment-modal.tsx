import React from "react";
import Modal from "./modal";
import { useMoneyStore } from "@/stores/use-money-store"; // Import Zustand store
import { useCartStore } from "@/stores/use-cart-store";
import { purchase } from "@/api/machineApi";
import { axiosAuth } from "@/lib/axios";
import Swal from "sweetalert2"; // Import SweetAlert2
import { useModalStore } from "@/stores/use-modal-store";
import { useTransactionStore } from "@/stores/use-transaction-store";
interface PaymentModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, setIsOpen }) => {
    const closeModal = () => setShowModal(false);

    const addMoney = useMoneyStore((state) => state.addMoney);
    const total = useMoneyStore((state) => state.total);
    const resetMoney = useMoneyStore((state) => state.resetMoney);

    const totalPrice = useCartStore((state) =>
        state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    );
    const cart = useCartStore((state) => state.cart);


    const setChangeShowModal = useModalStore((state) => state.setChangeShowModal);
    const setShowModal = useModalStore((state) => state.setShowModal);

    const setTransaction = useTransactionStore((state) => state.setTransaction);


    const handleSelection = (type: string, value: number) => {
        console.log(`${type} selected: ${value} THB`);

        // Add the selected denomination to the store
        addMoney(value, 1); // Adds 1 unit of the selected denomination
    };

    const handlePay = async () => {


        const paymentData = {
            products: cart.map((item) => ({
                productId: item.id,
                quantity: item.quantity,
            })),
            totalPaid: total, // `total` from the money store
        };


        console.log("Payment data:", paymentData);
        try {
            const res = await purchase(axiosAuth, paymentData);

            console.log(res);
            console.log("res.status", res.status == 201);

            if (res.status == 201) {
                // Swal.fire({
                //     title: res.data.message,
                //     text: "You have not added enough money to complete this purchase.",
                //     icon: "warning",
                //     confirmButtonText: "OK",
                // }).then(() => {
                //     // closeModal(); // Optionally close the modal after the alert
                // });
                closeModal()
                setChangeShowModal(true)
                setTransaction(res.data);
            }
        } catch (error: any) {
            console.log(error.response);


            Swal.fire({
                title: error.response.data.message,
                // text: "You have not added enough money to complete this purchase.",
                icon: "warning",
                confirmButtonText: "OK",
            }).then(() => {
                // closeModal(); // Optionally close the modal after the alert
            });
            // }
        }
        // Optionally, reset the money and close the modal
        // resetMoney();
        // closeModal();
        // }
    };

    const handleCancel = () => {
        console.log("Payment canceled");
        resetMoney(); // Clear the money store (if needed)
        closeModal(); // Close the modal
    };

    return (
        <>
            {isOpen && (
                <Modal onClose={closeModal} title="Select Denomination">
                    <div className="flex flex-col gap-8">
                        {/* Coins Section */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Coins</h3>
                            <div className="grid grid-cols-3 gap-6 place-items-center">
                                {[1, 5, 10].map((coin) => (
                                    <div
                                        key={coin}
                                        onClick={() => handleSelection("Coin", coin)}
                                        className="flex items-center justify-center w-24 h-24 bg-blue-200 text-blue-900 rounded-full cursor-pointer hover:bg-blue-300 transition"
                                    >
                                        <span className="text-xl font-bold">{coin} THB</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Banknotes Section */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Banknotes</h3>
                            <div className="grid grid-cols-3 gap-6">
                                {[20, 50, 100, 500, 1000].map((note) => (
                                    <div
                                        key={note}
                                        onClick={() => handleSelection("Banknote", note)}
                                        className="flex items-center justify-center px-6 py-4 bg-green-200 text-green-900 rounded-lg cursor-pointer hover:bg-green-300 transition"
                                    >
                                        <span className="text-xl font-bold">{note} THB</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Total Amount */}
                        <div className="flex justify-between gap-2 ">

                            <div className="mt-6 text-center">
                                <h4 className="text-lg font-semibold text-gray-700">
                                    Total Price: <span className="text-green-700">{totalPrice} THB</span>
                                </h4>
                            </div>
                            <div className="mt-6 text-center">
                                <h4 className="text-lg font-semibold text-gray-700">
                                    Added: <span className="text-green-700">{total} THB</span>
                                </h4>
                            </div>
                        </div>

                        {/* Pay and Cancel Buttons */}
                        <div className="mt-2 flex flex-col gap-2">
                            <button
                                onClick={handlePay}
                                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                            >
                                Pay
                            </button>
                            <button
                                onClick={handleCancel}
                                className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </>
    );
};

export default PaymentModal;
