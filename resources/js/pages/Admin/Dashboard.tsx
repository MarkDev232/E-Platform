import AdminSalesChart from '@/components/AdminSalesChart';
import OrderStatsChart from '@/components/OrderStatsChart';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Admin Dashboard', href: '/Admin/Dashboard' }];

export default function Dashboard() {
    // Mocked chart data
    const salesData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr'],
        sales: [120, 90, 150, 100],
        revenue: [1200, 950, 1750, 1300],
    };

    const orderStats = {
        labels: ['Pending', 'Shipped', 'Completed'],
        values: [25, 40, 35],
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-2">
                    <div className="h-[300px] rounded-xl border p-4 dark:border-sidebar-border">
                        <AdminSalesChart data={salesData} />
                    </div>
                    <div className="flex h-[300px] items-center justify-center rounded-xl border p-4 dark:border-sidebar-border">
                        <OrderStatsChart data={orderStats} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
