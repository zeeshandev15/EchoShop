import React, { Suspense } from "react";
import HeroBannerOne from "@/components/hero/HeroBannerOne";
import ProductsCollectionOne from "@/components/products/ProductsCollectionOne";
import CategoriesCollection from "@/components/category/CategoriesCollection";
import TestimonialsSection from "@/components/others/Testimonials";
import BannerOne from "@/components/banners/BannerOne";
import BenefitsSection from "@/components/others/BenefitSection";
import Loader from "@/components/others/Loader";

const HomePageOne = () => {
  return (
    <section className="overflow-hidden">
      <HeroBannerOne />
      <Suspense fallback={<Loader />}>
        <CategoriesCollection />
      </Suspense>
      <ProductsCollectionOne />
      <BenefitsSection textCenter={false} />
      <BannerOne />
      <TestimonialsSection textCenter={false} />
    </section>
  );
};

export default HomePageOne;
