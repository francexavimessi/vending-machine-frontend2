"use client";
import { useEffect, useState } from "react";
import Product from "@/components/product";
import { getProductAll } from "@/api/machineApi";
import { axiosAuth } from "@/lib/axios";
import { useCartStore } from "@/stores/use-cart-store";

interface ProductItem {
  _id: string;
  title: string;
  img: string;
  price: string;
  kind: string;
  stock: number; // Added stock
}
// interface ProductA {
//   _id: string;
//   name: string;
//   img: string;
//   price: number; // Use `number` if the price is a number in the response
//   kind: string;
//   stock: number; // Use `number` if stock is a numeric value
// }

interface FormattedProduct {
  _id: string;
  name: string;
  img: string;
  price: number; // Use `number` if the price is a number in the response
  kind: string;
  stock: number; // Use `number` if stock is a numeric value
}
type ProductCategory = "all" | "snack" | "drink";

const TabProduct = () => {
  const [subMenuPage, setSubMenuPage] = useState<ProductCategory>("all");
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductItem[]>([]);
  const cartItems = useCartStore((state) => state.cart); // Access cart items from the store

  const allSubPageMenuConstant = [
    {
      value: "all",
      label: "All",
      handleClick: () => setSubMenuPage("all"),
    },
    {
      value: "snack",
      label: "Snack",
      handleClick: () => setSubMenuPage("snack"),
    },
    {
      value: "drink",
      label: "Water",
      handleClick: () => setSubMenuPage("drink"),
    },
  ];

  // Fetch products from the API
  const fetchListingProduct = async () => {
    try {
      const params = {};
      const response = await getProductAll(axiosAuth, params);
      console.log("Fetched Products:", response.data);
      const formattedProducts = response.data.map((item: FormattedProduct) => ({
        _id: item._id,
        title: item.name,
        img: item.img,
        price: `${item.price}`,
        kind: item.kind,
        stock: item.stock, // Added stock mapping
      }));
      setProducts(formattedProducts);
      setFilteredProducts(formattedProducts); // Initially, show all products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Filter products based on the selected category
  useEffect(() => {
    if (subMenuPage === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.kind === subMenuPage)
      );
    }
  }, [subMenuPage, products]);

  useEffect(() => {
    fetchListingProduct();
  }, []);
  useEffect(() => {
    fetchListingProduct();
  }, [cartItems]);
  // Render products
  const renderProducts = () => {
    return (
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {filteredProducts.map((item, index) => (
          <Product
            _id={item._id}
            key={index}
            title={item.title}
            img={item.img}
            price={item.price}
            stock={item.stock} // Pass stock to the Product component
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {allSubPageMenuConstant.map((menu) => (
          <button
            key={menu.value}
            onClick={menu.handleClick}
            className={`text-sm font-medium w-[200px] h-[50px] rounded-lg ${subMenuPage === menu.value
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
          >
            {menu.label}
          </button>
        ))}
      </div>

      {/* Product container with scroll */}
      <div className="h-[500px] overflow-y-auto">{renderProducts()}</div>
    </div>
  );
};

export default TabProduct;
