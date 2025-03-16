import BannerTwo from "@/components/banners/BannerTwo";
import SpecialDeals from "@/components/banners/SpecialDeals";
import CategorySectionOne from "@/components/category/CategorySectionOne";
import HeroBannerTwo from "@/components/hero/HeroBannerTwo";
import BenefitsSection from "@/components/others/BenefitSection";
import Loader from "@/components/others/Loader";
import TestimonialsSection from "@/components/others/Testimonials";
import ProductsCollectionTwo from "@/components/products/ProductsCollectionTwo";
import React, { Suspense } from "react";

const HomePageTwo = () => {
  return (
    <div className="overflow-hidden">
      <HeroBannerTwo />
      <SpecialDeals textCenter={true} />
      <Suspense fallback={<Loader />}>
        <CategorySectionOne />
      </Suspense>
      <ProductsCollectionTwo />
      <BenefitsSection textCenter={true} />
      <BannerTwo />
      <TestimonialsSection textCenter={true} />
    </div>
  );
};

export default HomePageTwo;
