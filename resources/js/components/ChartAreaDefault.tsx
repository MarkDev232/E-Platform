'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export const description = 'A simple area chart';

const chartData = [
    { month: 'January', desktop: 186 },
    { month: 'February', desktop: 305 },
    { month: 'March', desktop: 237 },
    { month: 'April', desktop: 73 },
    { month: 'May', desktop: 209 },
    { month: 'June', desktop: 214 },
];

const chartConfig = {
    desktop: {
        label: 'Desktop',
        color: 'var(--color-desktop)',
    },
} satisfies ChartConfig;

export function ChartAreaDefault() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Orders Report</CardTitle>
                <CardDescription>Showing total orders for the last 6 months</CardDescription>
            </CardHeader>
            <CardContent className="max-h-[300px]  p-2">
                <ChartContainer config={chartConfig}>
                    <div className="min-w-[300px]">
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="month"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={4}
                                    tickFormatter={(value) => value.slice(0, 3)}
                                />
                                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                                <Area dataKey="desktop" type="natural" fill="var(--color-desktop)" fillOpacity={0.4} stroke="var(--color-desktop)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </ChartContainer>
            </CardContent>

            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 leading-none font-medium">
                            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">January - June 2024</div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
