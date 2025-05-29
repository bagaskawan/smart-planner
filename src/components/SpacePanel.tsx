"use client";
import React from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SpacePanelProps {
  currentSlide?: number;
  totalSlides?: number;
}

const SpacePanel: React.FC<SpacePanelProps> = ({
  currentSlide = 1,
  totalSlides = 3,
}) => {
  return (
    <div className="space-panel h-full w-full flex flex-col relative overflow-hidden">
      {/* Space community badge */}
      <div className="flex items-center gap-2 mx-auto mt-16 mb-10">
        <div className="bg-white/20 p-2 rounded-full">
          <div className="bg-white w-6 h-6 rounded-full flex items-center justify-center">
            <span className="text-black font-bold text-xs">👤</span>
          </div>
        </div>
        <div className="text-white">
          <p className="text-sm">Largest Space</p>
          <p className="text-sm font-semibold">Community</p>
        </div>
      </div>

      {/* Decorative line */}
      <div className="w-24 h-0.5 bg-white/20 mx-auto mb-8"></div>

      {/* Caption and slider navigation */}
      <div className="p-10 flex flex-col gap-12">
        <div>
          <p className=" text-lg"></p>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-2">
            Go anywhere you want in a<br />
            Galaxy full of wonders!
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-white/60">
            <span className="text-xs">0{currentSlide}</span>
            <span className="mx-2 text-xs">/</span>
            <span className="text-xs">0{totalSlides}</span>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-8 h-8 border-white/10 bg-white/5 text-white"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-8 h-8 border-white/10 bg-white/5 text-white"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpacePanel;
