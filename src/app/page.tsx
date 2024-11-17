"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/nav-bar";
import About from "@/components/sections/about";
import Hero from "@/components/sections/hero";
import Products from "@/components/sections/product";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <Products />
      <About />
      <Footer />
    </div>
  );
}
