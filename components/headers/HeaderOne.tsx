"use client";
import React, { Suspense } from "react";
import Logo from "../logo/Logo";
import Link from "next/link";
import SearchBox from "./SearchBox";
import Cart from "../carts/Cart";
import { ThemeToggle } from "../theme/ThemeToggle";
import AccountPopover from "../account/AccountPopover";
import { Search } from "lucide-react";
import MobileHeader from "./MobileHeader";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useMobileSearchModal } from "@/store/mobileSearchStore";
import Loader from "../others/Loader";

const HeaderOne = () => {
  const pathname = usePathname();

  const links = [
    {
      label: "Home",
      link: "/",
      isActive: pathname === "/",
    },
    {
      label: "Shop",
      link: "/shop",
      isActive: pathname.startsWith("/shop"),
    },
  ];

  const { openModal } = useMobileSearchModal();

  return (
    <header className="sticky bg-white dark:bg-slate-950 top-0 z-50 w-full">
      <div className="max-w-screen-xl mx-auto  p-4 md:py-4 md:px-8 flex items-center justify-between gap-2">
        <Logo />
        <ul className="hidden lg:flex items-center gap-4 xl:gap-6 text-lg ">
          {links.map((link) => (
            <Link
              key={link.link}
              className={cn(
                "font-medium px-4 py-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800",
                link.isActive && "bg-gray-200 dark:bg-gray-800  rounded-full"
              )}
              href={link.link}
            >
              {link.label}
            </Link>
          ))}
        </ul>
        <div className="flex items-center gap-6 ">
          {/* mobile search option */}
          <div className="lg:hidden text-center">
            <Search size={25} onClick={openModal} />
          </div>
          {/* desktop search */}
          <div className="hidden lg:block">
            <Suspense fallback={<p>Loading...</p>}>
              <SearchBox />
            </Suspense>
          </div>
          <div className="flex items-center gap-6 lg:gap-2 lg:-mt-1">
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
            <AccountPopover />
            <Cart />
            <MobileHeader />
          </div>
        </div>
      </div>
      <Separator />
    </header>
  );
};

export default HeaderOne;
