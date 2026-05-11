"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function FlightFilter() {
  return (
    <div className="bg-white rounded-2xl w-full  lg:w-full max-w-sm h-full p-5  space-y-6 border">
      
      <div>
        <p className="font-semibold mb-3">Stops</p>
        <div className="space-y-2">
          <FilterItem label="Any number of stops" price="$450" />
          <FilterItem label="Non-stop only" price="$450" />
          <FilterItem label="1 stop or fewer" price="$510" />
        </div>
      </div>

      <div>
        <p className="font-semibold mb-3">Airlines</p>
        <div className="space-y-2">
          <FilterItem label="British Airways" price="$450" />
          <FilterItem label="Virgin Atlantic" price="$465" />
          <FilterItem label="Delta Air Lines" price="$480" />
          <FilterItem label="American Airlines" price="$510" />
        </div>
      </div>

      <div>
        <p className="font-semibold mb-3">Departure Times</p>
        
        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-500 mb-1">Outbound</p>
            <Slider defaultValue={[0, 24]} max={24} step={1} />
            <p className="text-xs mt-1 text-gray-400">00:00 - 23:59</p>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-1">Return</p>
            <Slider defaultValue={[0, 24]} max={24} step={1} />
            <p className="text-xs mt-1 text-gray-400">00:00 - 23:59</p>
          </div>
        </div>
      </div>

      <div>
        <p className="font-semibold mb-3">Price</p>
        <Slider defaultValue={[450, 2500]} min={0} max={3000} step={50} />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>$450</span>
          <span>$2,500+</span>
        </div>
      </div>
    </div>
  );
}

function FilterItem({ label, price }: { label: string; price: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Checkbox id={label} />
        <Label htmlFor={label} className="text-sm cursor-pointer">
          {label}
        </Label>
      </div>
      <span className="text-sm text-gray-500">{price}</span>
    </div>
  );
}