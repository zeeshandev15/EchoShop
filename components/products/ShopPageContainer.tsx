// Updated ShopPageContainer.tsx
"use client";
import React, { Suspense, useEffect, useState } from "react";
import ProductViewChange from "../product/ProductViewChange";
import { productsData } from "@/data/products/productsData";
import Pagination from "../others/Pagination";
import SingleProductListView from "@/components/product/SingleProductListView";
import { Product, SearchParams } from "@/types";
import SingleProductCartView from "../product/SingleProductCartView";
import { Loader2 } from "lucide-react";
import Loader from "../others/Loader";

interface ShopPageContainerProps {
  searchParams: SearchParams;
  gridColumn?: number;
}

const ShopPageContainer = ({
  searchParams,
  gridColumn,
}: ShopPageContainerProps) => {
  const [loading, setLoading] = useState(true);
  const [listView, setListView] = useState(false);
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [paginatedData, setPaginatedData] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(
    Number(searchParams.page) || 1
  );
  const itemsPerPage = 6;

  const filterData = () => {
    let filteredProducts = productsData;

    if (searchParams.category) {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === searchParams.category
      );
    }

    if (searchParams.brand) {
      filteredProducts = filteredProducts.filter(
        (product) => product?.brand === searchParams.brand
      );
    }

    if (searchParams.color) {
      filteredProducts = filteredProducts.filter((product) =>
        product?.color.includes(searchParams.color)
      );
    }

    if (searchParams.min && searchParams.max) {
      const minPrice = parseFloat(searchParams.min);
      const maxPrice = parseFloat(searchParams.max);
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }

    return filteredProducts;
  };

  useEffect(() => {
    setLoading(true);
    const filteredProducts = filterData();
    setFilteredData(filteredProducts);
    setCurrentPage(1);
    setLoading(false);
  }, [searchParams]);

  useEffect(() => {
    setCurrentPage(Number(searchParams.page) || 1);
  }, [searchParams.page]);

  useEffect(() => {
    setLoading(true);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedProducts = filteredData.slice(startIndex, endIndex);
    setPaginatedData(paginatedProducts);
    setLoading(false);
  }, [filteredData, currentPage]);

  useEffect(() => {
    if (paginatedData.length > 0) {
      const utterance = new SpeechSynthesisUtterance(
        paginatedData.map((p, i) => `Product ${i + 1}: ${p.name}`).join(". ")
      );
      speechSynthesis.speak(utterance);

      utterance.onend = () => {
        askWhichProductToOpen();
      };
    }
  }, [paginatedData]);

  const askWhichProductToOpen = () => {
    const askUtterance = new SpeechSynthesisUtterance(
      "Which product would you like to open? Say for example, Product 1 or Product 2."
    );
    speechSynthesis.speak(askUtterance);

    askUtterance.onend = () => {
      listenToProductSelection();
    };
  };

  const listenToProductSelection = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.start();

    recognition.onresult = (event: any) => {
      const result = event.results[0][0].transcript.toLowerCase();
      console.log("User said:", result);

      const match = result.match(/product (\d+)/);
      if (match) {
        const index = parseInt(match[1], 10) - 1;
        const selectedProduct = paginatedData[index];

        if (selectedProduct) {
          window.location.href = `/shop/${selectedProduct.id}`;
        }
      } else {
        const errorUtterance = new SpeechSynthesisUtterance(
          "Sorry, I didn't catch that. Please say Product 1 or Product 2."
        );
        speechSynthesis.speak(errorUtterance);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event);
    };
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full flex-col gap-3">
        <Loader2 className="animate-spin text-xl" size={50} />
        <p>Loading products..</p>
      </div>
    );
  }

  if (paginatedData.length === 0) {
    return (
      <div className="h-screen w-full flex items-center justify-center flex-col gap-4 text-xl mx-auto font-semibold space-y-4">
        <ProductViewChange
          listView={listView}
          setListView={setListView}
          totalPages={Math.ceil(filteredData.length / itemsPerPage)}
          itemPerPage={itemsPerPage}
          currentPage={currentPage}
        />
        <p>Sorry no result found with your filter selection</p>
      </div>
    );
  }

  return (
    <div className="md:ml-4 p-2 md:p-0">
      <ProductViewChange
        listView={listView}
        setListView={setListView}
        totalPages={Math.ceil(filteredData.length / itemsPerPage)}
        itemPerPage={itemsPerPage}
        currentPage={currentPage}
      />

      {listView ? (
        <div className="max-w-screen-xl mx-auto overflow-hidden py-4 md:py-8 gap-4 lg:gap-6">
          {paginatedData.map((product) => (
            <SingleProductListView key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div
          className={`max-w-screen-xl mx-auto overflow-hidden py-4 md:py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${
            gridColumn || 3
          } gap-4 lg:gap-6`}
        >
          {paginatedData.map((product) => (
            <SingleProductCartView key={product.id} product={product} />
          ))}
        </div>
      )}

      <Suspense fallback={<Loader />}>
        <Pagination
          totalPages={Math.ceil(filteredData.length / itemsPerPage)}
          currentPage={currentPage}
          pageName="page"
        />
      </Suspense>
    </div>
  );
};

export default ShopPageContainer;
