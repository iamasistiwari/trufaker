/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";
import { CircleDot, Loader } from "lucide-react";

const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("h-6 w-6", className)}
    >
      <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
};

const CheckFilled = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("h-6 w-6", className)}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

type LoadingState = {
  text: string;
};

export const LoaderCore = ({
  loadingStates,
  value = 0,
}: {
  loadingStates: LoadingState[];
  value?: number;
}) => {
  console.log("CURRENT VALUE IS", value)
  return (
    <div className="relative mx-auto mt-40 flex max-w-xl flex-col justify-start">
      {loadingStates.map((loadingState, index) => {
        const distance = Math.abs(index - value);
        const opacity = Math.max(1 - distance * 0.2, 0); // Minimum opacity is 0, keep it 0.2 if you're sane.
        
        return (
          <motion.div
            key={index}
            className={cn("mb-4 flex items-center gap-2 text-left text-2xl")}
            initial={{ opacity: 0, y: -(value * 40) }}
            animate={{ opacity: opacity, y: -(value * 40) }}
            transition={{ duration: 0.5 }}
          >
            <div>
              {index < value && <CheckIcon className="text-white" />}
              {index === value && (
                <Loader
                  className={"text-lime-500 animate-spin [animation-duration:3000ms]"}
                />
              )}
            </div>
            <span
              className={cn(
                "text-[20px] text-white pl-3",
                index > value && "pl-6",
                value === index && "text-lime-500 opacity-100",
              )}
            >
              {loadingState.text}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

// export const MultiStepLoader = ({
//   loadingStates,
//   loading,
//   duration = 2000,
//   loop = true,
// }: {
//   loadingStates: LoadingState[];
//   loading?: boolean;
//   duration?: number;
//   loop?: boolean;
// }) => {
//   const [currentState, setCurrentState] = useState(0);

//   useEffect(() => {
//     if (!loading) {
//       setCurrentState(0);
//       return;
//     }
//     const timeout = setTimeout(() => {
//       setCurrentState((prevState) =>
//         loop
//           ? prevState === loadingStates.length - 1
//             ? 0
//             : prevState + 1
//           : Math.min(prevState + 1, loadingStates.length - 1),
//       );
//     }, duration);

//     return () => clearTimeout(timeout);
//   }, [currentState, loading, loop, loadingStates.length, duration]);
//   return (
//     <AnimatePresence mode="wait">
//       {loading && (
//         <motion.div
//           initial={{
//             opacity: 0,
//           }}
//           animate={{
//             opacity: 1,
//           }}
//           exit={{
//             opacity: 0,
//           }}
//           className="fixed inset-0 z-[100] flex h-full w-full items-center justify-center bg-black backdrop-blur-2xl"
//         >
//           <div className="relative h-96">
//             <LoaderCore value={currentState} loadingStates={loadingStates} />
//           </div>

//           <div className="absolute inset-x-0 bottom-0 z-20 h-full bg-white bg-gradient-to-t [mask-image:radial-gradient(900px_at_center,transparent_30%,white)] dark:bg-black" />
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };
