// import { Button } from "@/components/ui/button";

import { Button } from "./button";

interface ISubMenuPageProps {
    subPageMenuConstant: {
        value: string;
        label: string;
        handleClick: (rowIndex?: number) => void; // Allow rowIndex to be passed optionally
    }[];
    subMenuPage: string;
    rowIndex?: number; // Optional rowIndex
}

export default function SubMenuPage({ subPageMenuConstant, subMenuPage, rowIndex }: ISubMenuPageProps) {
    const activeSearchButtonStyle =
        "text-sm font-semibold flex items-center justify-center gap-x-1 p-4 py-6 bg-blueSearchHeader text-black hover:bg-buttonblueBase hover:bg-opacity-75 rounded-t-lg rounded-b-none";
    const searchButtonStyle =
        "text-sm font-semibold flex items-center justify-center gap-x-1 p-4 bg-greySubMenuPage text-black hover:bg-greyHoverSubMenuPage hover:bg-opacity-100 rounded-t-lg rounded-b-none";

    return (
        <div className="w-full flex gap-1 items-end mt-4 ">
            {subPageMenuConstant.map((el, idx) => {
                return (
                    <Button
                        key={idx}
                        className={`${el.value === subMenuPage ? activeSearchButtonStyle : searchButtonStyle} `}
                        // Pass rowIndex if available, otherwise just call handleClick without argument
                        onClick={() => el.handleClick(rowIndex)}
                    >
                        <div>{el.label}</div>
                    </Button>
                );
            })}
        </div>
    );
}