"use client";

import { motion } from "framer-motion";
import { PlaneTakeoff } from 'lucide-react';

export default function FlyingPlane({ totalTime }: { totalTime: string }) {
  return (
    <div className="w-full flex flex-col items-center flex-1">

       <div className="w-full relative flex items-center">

         <div className="w-2.5 h-2.5 bg-gray-400 rounded-full z-10" />

         <div className="flex-1 border-t-2 border-dashed border-gray-300 relative mx-1">

           <motion.div
            className="absolute -top-[23px]"
            initial={{ left: "0%" }}
            animate={{ left:  "97%" }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <PlaneTakeoff/>
          </motion.div>

        </div>

         <div className="w-2.5 h-2.5 bg-gray-400 rounded-full z-10" />
      </div>

     
    </div>
  );
}