"use client";
import HeaderOne from "@/components/headers/HeaderOne";
import Footer from "@/components/footers/Footer";
import { Toaster } from "sonner";
import { Mic } from "lucide-react";

const handleVoiceClick = () => {
  console.log("Voice search triggered");
  // You can add speech recognition logic here later
};
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <HeaderOne />
      {children}
      <Footer />
      <div className="fixed bottom-20 right-6 z-50">
        <button
          onClick={handleVoiceClick}
          className="bg-rose-600 text-white p-4 rounded-full shadow-lg hover:bg-rose-700 transition duration-300"
          aria-label="Voice Search"
        >
          <Mic size={24} />
        </button>
      </div>
      <Toaster position="top-right" duration={2000} />
    </div>
  );
}
