import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import React, { ReactNode } from "react";

export default function Mainlayout({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-rows-[auto_1fr_auto] m-0 min-h-screen">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}
