import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function AdminSalesChart({ data }: { data: { labels: string[]; sales: number[]; revenue: number[] } }) {
    const chartData = {
        labels: data.labels,
        datasets: [
            {
                label: 'Total Sales',
                data: data.sales,
                backgroundColor: 'rgb(185, 55, 93)',
            },
            {
                label: 'Total Revenue',
                data: data.revenue,
                backgroundColor: 'rgb(41, 115, 178)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Total Sales & Revenue',
            },
        },
    };

    return <Bar options={options} data={chartData} style={{ height: '100%' }} />;
}
