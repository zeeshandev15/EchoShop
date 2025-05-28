import { Grid3X3, Menu } from "lucide-react";
import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import FilterProductsBtn from "../buttons/FilterProductsBtn";

interface ProductViewChangeProps {
  itemPerPage: number;
  totalPages: number;
  currentPage: number;
  listView: boolean;
  setListView: (value: boolean) => void;
}

const ProductViewChange = ({
  itemPerPage,
  totalPages,
  listView,
  setListView,
  currentPage,
}: ProductViewChangeProps) => {
  return (
    <div className="max-w-screen-xl mx-auto py-4  md:-mb-4 flex flex-wrap items-center gap-2 md:gap-4 px-4 lg:px-0 ">
      <div className="mr-auto">
        {/* showing total shown result on the page */}
        <p className=" text-base md:text-lg  font-medium capitalize text-muted-foreground  select-none">
          {`showing ${(currentPage - 1) * itemPerPage + 1}-${
            itemPerPage * currentPage
          } of ${totalPages * itemPerPage}`}{" "}
          results
        </p>
      </div>

      {/* this product list and cart view functionality is hidden on mobile screen */}
      <div className="hidden lg:flex items-center gap-4">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              <div
                className={cn(
                  "w-fit p-1 border",
                  listView === false && "bg-slate-200 dark:bg-slate-700"
                )}
                onClick={() => setListView(false)}
              >
                <Grid3X3 size={30} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Grid View</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger>
              <div
                className={cn(
                  "w-fit p-1 border",
                  listView === true && "bg-slate-200 dark:bg-slate-700"
                )}
                onClick={() => setListView(true)}
              >
                <Menu size={30} />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>List View</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="">
        <FilterProductsBtn />
      </div>
    </div>
  );
};

export default ProductViewChange;
