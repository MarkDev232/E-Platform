import React from "react";

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { ChevronDown } from "lucide-react";

const yAxisValues = [0, 100, 200, 300, 400, 500];
const maxValue = 500;

const xValues = [
  { month: "Jan", value: 150 },
  { month: "Feb", value: 50 },
  { month: "Mar", value: 100 },
  { month: "Apr", value: 230 },
  { month: "May", value: 370 },
  { month: "Jun", value: 450 },
  { month: "Jul", value: 500 },
  { month: "Aug", value: 420 },
  { month: "Sep", value: 360 },
  { month: "Oct", value: 200 },
  { month: "Nov", value: 110 },
  { month: "Dec", value: 290 },
];

// <div className="relative">
//             <div className="absolute inset-0 flex flex-col gap-4 w-full">
//               {yValues.map((a) => (
//                 <div className="border border-dashed w-full h-0.5" />
//               ))}
//             </div>
//           </div>

const RevenueChart = () => {
  return (
    <>
      <div className="p-8 w-full h-full bg-white rounded-md flex flex-col gap-8">
        <div className="flex justify-between">
          <p className="font-bold">Revenue Report</p>
          <div className="flex gap-2 items-center cursor-pointer">
            <p className="text-sm text-[#5A607F]">Last 12 Months</p>
            <ChevronDown className="w-5 h-5 text-sm text-[#5A607F]" />
          </div>
        </div>
        <div className="flex gap-12 h-fit">
          <div className="flex flex-col gap-6">
            <ul className="flex flex-col justify-between h-56">
              {yAxisValues.toReversed().map((val) => (
                <li className="text-xs font-extralight text-[#A1A7C4]">
                  {val}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex h-fit w-full justify-between pr-8">
            {xValues.map((x) => (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="cursor-default">
                    <div className="flex flex-col items-center gap-6 h-full">
                      <div className="flex">
                        <div className="flex items-end h-56">
                          <div
                            className="w-7 bg-[#1E5EFF] rounded-sm"
                            style={{
                              height: `${(x.value / maxValue) * 100}%`,
                            }}
                          />
                        </div>
                      </div>

                      <p className="text-xs font-extralight text-[#A1A7C4]">
                        {x.month}
                      </p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex w-8 h-4 items-center justify-center">
                      <p>{`$${x.value}`}</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RevenueChart;
