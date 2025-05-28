"use client";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { productsData } from "@/data/products/productsData";
import Link from "next/link";

const CategoriesCollection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCollectionClick = (collectionName: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", collectionName);
    router.push(`shop?${params.toString()}`);
  };

  const watches = productsData.filter(
    (item) => item.category.toLowerCase() === "watches"
  );

  const headphones = productsData.filter(
    (item) => item.category.toLowerCase() === "headphones"
  );

  const computers = productsData.filter(
    (item) => item.category.toLowerCase() === "computers"
  );

  return (
    <section className="py-16 bg-slate-200 dark:bg-slate-800 ">
      <div className="max-w-screen-xl px-4 md:px-8  mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-wrap">
        {/* showing watches collection */}
        <div
          onClick={() => handleCollectionClick(watches[0].category)}
          className="flex flex-col gap-4 items-start justify-between p-4 md:p-8 rounded-xl bg-white dark:bg-slate-900 shadow-md"
        >
          <h2 className="text-xl md:text-2xl text-center font-semibold my-4 w-full">
            Best Deals For You On <span className="text-2xl font-bold">{watches[0].category}</span>
          </h2>
          <div className="grid grid-cols-2 gap-4 place-content-center w-full">
            {watches?.slice(0, 4)?.map((watch) => ( 
              <div
                key={watch.id}
                className="flex flex-col items-center justify-center text-center gap-2"
              >
                <Image
                  src={watch.images[0]}
                  alt={watch.name}
                  width={100}
                  height={100}
                  className="object-contain rounded-md"
                />
                <div className="flex items-center flex-col">
                  <p className="bg-rose-600 p-1 text-sm text-white whitespace-nowrap w-fit">
                    {watch.discount}% off
                  </p>
                  <Link
                    href={`/shop/${watch.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className=" font-semibold hover:text-green-500"
                  >
                    {watch.name.slice(0, 15)}...
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <Button
            className="mt-4 flex items-center gap-4 text-lg font-semibold w-full"
            variant={"outline"}
            size={"lg"}
          >
            <ArrowRight /> Collections
          </Button>
        </div>

        {/* showing headphones collection */}
        <div
          onClick={() => handleCollectionClick(headphones[0].category)}
          className="flex flex-col gap-4 items-start justify-between p-4 md:p-8 rounded-xl bg-white dark:bg-slate-900 shadow-md"
        >
          <h2 className="text-xl md:text-2xl text-center font-semibold my-4 w-full">
            Best Deals For You On <span className="text-2xl font-bold">{headphones[0].category}</span>
          </h2>
          <div className="grid grid-cols-2 gap-4 place-content-center w-full">
            {headphones?.slice(0, 4)?.map((headphone) => (
              <div
                key={headphone.id}
                className="flex flex-col items-center justify-center text-center gap-2"
              >
                <Image
                  src={headphone.images[0]}
                  alt={headphone.name}
                  width={100}
                  height={100}
                  className="object-contain rounded-md"
                />
                <div className="flex items-center flex-col">
                  <p className="bg-rose-600 p-1 text-sm text-white whitespace-nowrap w-fit">
                    {headphone.discount}% off
                  </p>
                  <Link
                    href={`/shop/${headphone.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className=" font-semibold hover:text-green-500"
                  >
                    {headphone.name.slice(0, 15)}...
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <Button
            className="mt-4 flex items-center gap-4 text-lg font-semibold w-full"
            variant={"outline"}
            size={"lg"}
          >
            <ArrowRight /> Collections
          </Button>
        </div>

        {/* showing computers collection */}
        <div
          onClick={() => handleCollectionClick(computers[0].category)}
          className="flex flex-col gap-4 items-start justify-between p-4 md:p-8 rounded-xl bg-white dark:bg-slate-900 shadow-md"
        >
          <h2 className="text-xl md:text-2xl text-center font-semibold my-4 w-full">
            Best Deals For You On <span className="text-2xl font-bold">{computers[0].category}</span>
          </h2>
          <div className="grid grid-cols-2 gap-4 place-content-center w-full">
            {computers?.slice(0, 4)?.map((computer) => (
              <div
                key={computer.id}
                className="flex flex-col items-center justify-center text-center gap-2"
              >
                <Image
                  src={computer.images[0]}
                  alt={computer.name}
                  width={100}
                  height={100}
                  className="object-contain rounded-md"
                />
                <div className="flex items-center flex-col">
                  <p className="bg-rose-600 p-1 text-sm text-white whitespace-nowrap w-fit">
                    {computer.discount}% off
                  </p>
                  <Link
                    href={`/shop/${computer.id}`}
                    onClick={(e) => e.stopPropagation()}
                    className=" font-semibold hover:text-green-500"
                  >
                    {computer.name.slice(0, 15)}...
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <Button
            className="mt-4 flex items-center gap-4 text-lg font-semibold w-full"
            variant={"outline"}
            size={"lg"}
          >
            <ArrowRight /> Collections
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CategoriesCollection;
