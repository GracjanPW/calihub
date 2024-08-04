import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function layout({ children }) {
  return (
    <main className="w-full">
      <Navbar />
      {children}
      <Footer />
    </main>
  );
}
