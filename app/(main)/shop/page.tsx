import ShopPageOne from "@/components/pages/shop-pages/ShopPageOne";
import ShopPageTwo from "@/components/pages/shop-pages/ShopPageTwo";
import { SearchParams } from "@/types";
import React from "react";

function ShopPage({ searchParams }: { searchParams: SearchParams }) {
  return (
    <div>
      <ShopPageOne searchParams={searchParams} />
      {/* <ShopPageTwo searchParams={searchParams}/> */}
    </div>
  );
}

export default ShopPage;
