import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center gap-2 mr-3 md:mr-0">
      <Image src={"/logo.svg"} width={40} height={40} alt="brand" />
      <p className="text-2xl font-bold">Meta Minds</p>
    </Link>
  );
};

export default Logo;
