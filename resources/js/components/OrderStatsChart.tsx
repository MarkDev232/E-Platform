import { ArcElement, Chart as ChartJS, ChartOptions, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function OrderStatsChart({ data }: { data: { labels: string[]; values: number[] } }) {
    const chartData = {
        labels: data.labels,

        datasets: [
            {
                label: 'Orders',
                data: data.values,
                backgroundColor: ['#B9375D', '#FF6384', '#FFCE56'],
                hoverOffset: 4,
            },
            
        ],
        
    };
    const options: ChartOptions<'doughnut'> = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'top',
                align: 'center',
                labels: {
                    boxWidth: 20,
                    padding: 15,
                },
            },
             title: {
                display: true,
                text: 'Total Order Stats',
            },
        },
        
    };

    return <Doughnut options={options} data={chartData} style={{ height: '100%' }} />;
}
