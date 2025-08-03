import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ChevronDown } from 'lucide-react';

const yAxisValues = [0, 100, 200, 300, 400, 500];
const maxValue = 500;

const xValues = [
    { month: 'Jan', value: 150 },
    { month: 'Feb', value: 50 },
    { month: 'Mar', value: 100 },
    { month: 'Apr', value: 230 },
    { month: 'May', value: 370 },
    { month: 'Jun', value: 450 },
    { month: 'Jul', value: 500 },
    { month: 'Aug', value: 420 },
    { month: 'Sep', value: 360 },
    { month: 'Oct', value: 200 },
    { month: 'Nov', value: 110 },
    { month: 'Dec', value: 290 },
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
            <div className="flex h-full w-full flex-col gap-8 rounded-md bg-white p-8">
                <div className="flex justify-between">
                    <p className="font-bold">Revenue Report</p>
                    <div className="flex cursor-pointer items-center gap-2">
                        <p className="text-sm text-[#5A607F]">Last 12 Months</p>
                        <ChevronDown className="h-5 w-5 text-sm text-[#5A607F]" />
                    </div>
                </div>
                <div className="flex h-fit gap-12">
                    <div className="flex flex-col gap-6">
                        <ul className="flex h-56 flex-col justify-between">
                            {yAxisValues.toReversed().map((val) => (
                                <li key={`y-axis-${val}`} className="text-xs font-extralight text-[#A1A7C4]">
                                    {val}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex h-fit w-full justify-between pr-8">
                        {xValues.map((x) => (
                            <TooltipProvider key={`tooltip-${x.month}`}>
                                <Tooltip>
                                    <TooltipTrigger className="cursor-default">
                                        <div className="flex h-full flex-col items-center gap-6">
                                            <div className="flex">
                                                <div className="flex h-56 items-end">
                                                    <div
                                                        className="w-7 rounded-sm bg-[#1E5EFF]"
                                                        style={{
                                                            height: `${(x.value / maxValue) * 100}%`,
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            <p className="text-xs font-extralight text-[#A1A7C4]">{x.month}</p>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <div className="flex h-4 w-8 items-center justify-center">
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
