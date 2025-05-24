"use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight, Rocket } from "lucide-react";
import { motion } from "framer-motion";
import { bannerData } from "@/data/banner/bannerData";
import { cn } from "@/lib/utils";
import Link from "next/link";

const HeroBannerOne = () => {
  // Placeholder handler for voice search button

  return (
    <section className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 ">
      <div className="max-w-screen-xl mx-auto py-15 px-4 md:px-8">
        <Carousel
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
        >
          <CarouselContent className="space-x-2 ml-1">
            {bannerData.map((data) => (
              <CarouselItem
                key={data.title}
                className="relative rounded-xl flex flex-col-reverse md:flex-row items-center justify-evenly p-2"
              >
                <motion.div
                  initial={{ y: -100, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.1 }}
                  className="text-center justify-center space-y-4"
                >
                  <p className="flex items-center justify-center gap-4 -mb-4 text-xl font-bold text-rose-600">
                    <Rocket className="animate-bounce" size={40} />
                    <span className="text-blue-800">{data.discountText}</span>
                  </p>
                  <h2
                    className={cn(
                      "text-3xl md:text-5xl max-w-96 mx-auto font-bold break-words"
                    )}
                  >
                    {data.title}
                  </h2>
                  <p className="max-w-96 mx-auto leading-6">
                    {data.description}
                  </p>
                  <Link href={data.link} className="block">
                    <Button
                      size={"lg"}
                      className="text-xl p-3 md:p-8 rounded-full gap-2 md:gap-4 mb-4"
                    >
                      <ArrowRight className="text-rose-500" /> {data.button}
                    </Button>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ x: 200, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <Image
                    className="bg-transparent rotate-6 relative z-50 object-contain"
                    src={data.images[0]}
                    width={500}
                    height={500}
                    alt="banner image"
                  />
                </motion.div>

                {/* Animated Sparkles */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="absolute right-[10rem] top-[8rem] flex items-center justify-center pointer-events-none z-0"
                >
                  <div className="absolute w-48 h-48 bg-yellow-400 rounded-full animate-blob1"></div>
                  <div className="absolute w-48 h-48 bg-red-400 rounded-full animate-blob2"></div>
                  <div className="absolute w-48 h-48 bg-blue-400 rounded-full animate-blob3"></div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-5" />
          <CarouselNext className="right-5" />
        </Carousel>
      </div>

      {/* Voice Integration Button - Fixed Position */}
    </section>
  );
};

export default HeroBannerOne;
