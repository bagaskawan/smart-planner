"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "No more guesswork—just clear, smart routines.",
    image:
      "https://images.unsplash.com/photo-1533749047139-189de3cf06d3?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Focus on what matters—HADE handles the rest.",
    image:
      "https://images.unsplash.com/photo-1654166602082-d18e7cd4bdac?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 3,
    title: "Build better habits with data-driven schedules.",
    image:
      "https://images.unsplash.com/photo-1642618598178-52eb00dc544d?q=80&w=1890&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-full bg-black text-white">
      <div className="relative h-full overflow-hidden">
        {slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className="absolute inset-0 h-full w-full"
            initial={{ opacity: 0 }}
            animate={{
              opacity: currentSlide === index ? 1 : 0,
              zIndex: currentSlide === index ? 1 : 0,
            }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br "></div>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.image})`,
                filter: "brightness(0.3)",
              }}
            ></div>
            <div className="absolute inset-0 flex flex-col justify-center z-20 p-16">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{
                  y: currentSlide === index ? 0 : 20,
                  opacity: currentSlide === index ? 1 : 0,
                }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-md"
              >
                <p className="text-3xl font-medium leading-tight mb-8">
                  {slide.title}
                </p>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-8 left-0 right-0 flex justify-between items-center px-8 z-20">
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-8 h-1 rounded-full transition-all duration-300 ${
                currentSlide === index ? "bg-white w-12" : "bg-white/40"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition"
            aria-label="Previous slide"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center hover:bg-white/10 transition"
            aria-label="Next slide"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
