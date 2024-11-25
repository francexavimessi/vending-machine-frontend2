import { useState } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useCartStore } from "@/stores/use-cart-store"; // Import the cart store
import { Backend_URL } from "../lib/constant";

type ProductProps = {
    _id: string; // Unique identifier for the product
    title: string;
    img: string;
    price: string;
    stock: number; // Added stock property
};

export default function Product({ _id, title, img, price, stock }: ProductProps) {
    const { addToCart } = useCartStore(); // Access addToCart from the store

    const [isHovered, setIsHovered] = useState(false); // Track hover state

    // Handle adding the product to the cart
    const handleAddToCart = () => {
        if (stock > 0) {
            console.log(price);

            addToCart({
                id: _id, // Convert _id to a number or keep it as string if needed
                name: title,
                price: parseFloat(price), // Ensure price is a number
                quantity: 1, // Default quantity is 1
            });
            console.log(`Product ${_id} (${title}) added to cart`);
        } else {
            console.warn(`Product ${_id} (${title}) is out of stock`);
        }
    };

    return (
        <div
            className="p4 m-4 " // Add padding around the card
        >
            <Card
                shadow="md"
                isPressable
                onPress={handleAddToCart} // Trigger adding to cart when the card is clicked
                className={`transform transition-all duration-500 hover:scale-105 hover:shadow-lg ${isHovered ? "animate-shake" : ""
                    }`}
                onMouseEnter={() => setIsHovered(true)} // Trigger shake on hover
                onAnimationEnd={() => setIsHovered(false)} // Reset animation after it ends
                style={{
                    width: "150px",
                }}
            >
                <CardBody className="overflow-hidden p-0 rounded-lg">
                    <Image
                        shadow="lg"
                        radius="lg"
                        width="100%"
                        height={150}
                        alt={title}
                        className="object-cover w-full h-full rounded-lg"
                        src={Backend_URL + "images/" + img}
                    />
                </CardBody>
                <CardFooter className="text-small flex justify-between items-end pt-2 pb-2 px-2 bg-white rounded-b-lg shadow-md">
                    {/* Name and Price Section */}
                    <div className="flex flex-col items-center flex-grow">
                        <b className="text-sm font-semibold truncate text-center mb-1">{title}</b>
                        <p className="text-xs text-gray-800 text-center mb-2 bg-yellow-200 px-2 py-1 rounded-md">
                            {price} THB
                        </p>
                        <p
                            className={`text-xs ${stock > 0 ? "text-green-500" : "text-red-500"
                                } self-end`}
                        >
                            {stock > 0 ? `${stock} in stock` : "Out of stock"}
                        </p>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
