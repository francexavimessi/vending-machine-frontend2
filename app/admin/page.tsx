// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { File, PlusCircle } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { ProductsTable } from './products-table';
// import { getProducts } from '@/lib/db';

import TabAdmin from "./admin-tab-manage";

// import TabAdmin from "./product-table";

export default async function ProductsPage(
    //   props: {
    //     searchParams: Promise<{ q: string; offset: string }>;
    //   }
) {
    //   const searchParams = await props.searchParams;
    //   const search = searchParams.q ?? '';
    //   const offset = searchParams.offset ?? 0;
    //   const { products, newOffset, totalProducts } = await getProducts(
    //     search,
    //     Number(offset)
    //   );

    return (
        <div className="min-h-screen bg-[#ECF1F6] flex flex-col">
            <div className="container mx-auto flex-grow p-4 bg-[#ECF1F6]">
                <h1
                    className="text-2xl font-bold mb-4 w-full h-[50px] bg-blue-200 flex items-center justify-center rounded-xl"
                >
                    Vending Machine
                </h1>
                {/* Responsive layout */}
                <div className="flex flex-col lg:flex-row gap-8 h-full">
                    {/* Product Tab on the left */}
                    <div className="flex-1 h-full">
                        <TabAdmin />
                    </div>

                    {/* Cart on the right (if enabled in the future) */}
                    {/* <div className="flex-shrink-0 lg:w-[30%] lg:static fixed bottom-0 w-full bg-white p-4 shadow-lg lg:shadow-none lg:p-0 rounded-lg">
                        
                    </div> */}
                </div>
            </div>
        </div>
    );
}
