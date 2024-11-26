"use client";
import { useState } from "react";
import ProductTable from "./product-table";
import InventoryTable from "./inventory-table";

type ProductCategory = "productTable" | "inventoryTable";

const TabAdmin = () => {
    const [subMenuPage, setSubMenuPage] = useState<ProductCategory>("productTable");
    // const [products, setProducts] = useState<ProductItem[]>([]);
    // const [filteredProducts, setFilteredProducts] = useState<ProductItem[]>([]);

    const allSubPageMenuConstant = [
        {
            value: "productTable",
            label: "Product List",
            handleClick: () => setSubMenuPage("productTable"),
        },
        {
            value: "inventoryTable",
            label: "Inventory List",
            handleClick: () => setSubMenuPage("inventoryTable"),
        },
        // {
        //     value: "drink",
        //     label: "Water",
        //     handleClick: () => setSubMenuPage("drink"),
        // },
    ];


    // useEffect(() => {
    //     if (subMenuPage === "productTable") {
    //         setFilteredProducts(products);
    //     } else {
    //         setFilteredProducts(
    //             products.filter((product) => product.kind === subMenuPage)
    //         );
    //     }
    // }, [subMenuPage, products]);

    const renderSubMenuContent = () => {
        switch (subMenuPage) {
            case 'productTable':
                return <ProductTable />;
            case "inventoryTable":
                return <InventoryTable />;
            default:
                return <div />;
        }
    };
    return (
        <div className="mx-auto px-6 py-8">
            {/* Flex container for layout */}
            <div className="flex space-x-6">
                {/* Tabs on the left */}
                <div className="w-1/4">
                    <div className="flex flex-col space-y-4"> {/* Changed to flex-col */}
                        {allSubPageMenuConstant.map((menu) => (
                            <button
                                key={menu.value}
                                onClick={menu.handleClick}
                                className={`text-sm font-medium w-full h-[50px] rounded-lg ${subMenuPage === menu.value
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                                    }`}
                            >
                                {menu.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="w-3/4 h-[90vh] overflow-y-auto">
                    {/* <ProductTable /> */}
                    {renderSubMenuContent()}
                </div>
            </div>
        </div>
    );
};

export default TabAdmin;
