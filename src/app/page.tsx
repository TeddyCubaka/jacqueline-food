"use client";
import Cart from "@/components/atoms/cart";
import TeamCarousel from "@/components/atoms/team-presentation";
import Footer from "@/components/footer";
import Navbar from "@/components/nav-bar";
import About from "@/components/sections/about";
import Hero from "@/components/sections/hero";
import Products from "@/components/sections/product";

export default function Home() {
  return (
    <div className="min-h-screen bg-white border">
      <Navbar />
      <Hero />
      <Cart />
      <Products />
      <About />
      <TeamCarousel />
      <Footer />
    </div>
  );
}
