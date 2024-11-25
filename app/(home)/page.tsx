"use client";

import Cart from "./cart";
import TabProduct from "./product-tab";

export default function Home() {
  return (
    <div className=" min-h-screen bg-[#ECF1F6]">
      <div className="container mx-auto p-4 bg-[#ECF1F6]">
        <h1
          className="text-2xl font-bold mb-4 w-full h-[50px] bg-blue-200 flex items-center justify-center rounded-xl"
        >
          Vending Machine
        </h1>
        {/* Responsive layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Tab on the left */}
          <div className="flex-1">
            <TabProduct />
          </div>

          {/* Cart on the right */}
          <div className="flex-shrink-0 lg:w-[30%] lg:static fixed bottom-0 w-full bg-white p-4 shadow-lg lg:shadow-none lg:p-0 rounded-lg">
            <Cart />
          </div>
        </div>
      </div>
    </div>
  );
}
