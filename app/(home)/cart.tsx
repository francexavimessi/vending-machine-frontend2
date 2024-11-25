"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/stores/use-cart-store"; // Import the cart store
import PaymentModal from "@/components/payment-modal";
import { useMoneyStore } from "@/stores/use-money-store";
import ChangeModal from "@/components/change-modal";
import { useModalStore } from "@/stores/use-modal-store";

export default function Cart() {
    const cartItems = useCartStore((state) => state.cart); // Access cart items from the store
    const total = useCartStore((state) =>
        state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    ); // Calculate total price

    const incrementQuantity = useCartStore((state) => state.incrementQuantity);
    const decrementQuantity = useCartStore((state) => state.decrementQuantity);
    const clearCart = useCartStore((state) => state.clearCart);
    const resetMoney = useMoneyStore((state) => state.resetMoney);

    const showModal = useModalStore((state) => state.showModal);
    const setShowModal = useModalStore((state) => state.setShowModal);

    const showChangeModal = useModalStore((state) => state.showChangeModal);
    const setChangeShowModal = useModalStore((state) => state.setChangeShowModal);
    // State for controlling the PaymentModal


    // State to track the screen size
    const [isLandscape, setIsLandscape] = useState(true);

    function onclickCheckout() {
        if (total > 0) {
            setShowModal(true);
        }
    }

    function onclickCancel() {
        clearCart();
        resetMoney();
    }

    useEffect(() => {
        // Update screen orientation based on width and height
        const handleResize = () => {
            setIsLandscape(window.innerWidth > window.innerHeight);
        };

        // Listen to window resize event
        window.addEventListener("resize", handleResize);

        // Initial check
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        resetMoney();
    }, [showModal]);

    return (
        <div
            className={`${isLandscape ? "w-full h-[40vh]" : "w-full lg:w-[400px] h-[40vh]"
                } bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between `} // flex-col with justify-between for buttons to stick to bottom
        >
            <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
            <div className="flex-1 overflow-y-auto scrollbar-hide"> {/* This will allow scrolling for cart items */}
                {cartItems.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                        {cartItems.map((item) => (
                            <div
                                key={item.id}
                                className="flex justify-between items-center border-b pb-2 h-[100px]"
                            >
                                <div>
                                    <p className="font-medium">{item.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {item.price.toFixed(2)} THB
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => decrementQuantity(item.id)}
                                        className="w-6 h-6 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        -
                                    </button>
                                    <span className="font-medium">{item.quantity}</span>
                                    <button
                                        onClick={() => incrementQuantity(item.id)}
                                        className="w-6 h-6 bg-green-500 text-white rounded hover:bg-green-600"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">Your cart is empty.</p>
                )}
            </div>

            <div className="mt-4">
                <p className="text-lg font-semibold">
                    Total: {total.toFixed(2)} THB
                </p>

                {/* Checkout and Cancel buttons placed at the bottom */}
                <div className="mt-2 flex flex-col gap-2">
                    <button
                        onClick={() => onclickCheckout()}
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                    >
                        Checkout
                    </button>
                    <button
                        onClick={onclickCancel} // Clear the cart when clicked
                        className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
                    >
                        Cancel
                    </button>
                </div>
            </div>

            {showModal && <PaymentModal isOpen={showModal} setIsOpen={setShowModal} />}
            {showChangeModal && <ChangeModal isOpen={showChangeModal} setIsOpen={setChangeShowModal} />}

        </div>
    );
}
