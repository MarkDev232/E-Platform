
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import DasboardCardGrid from '@/components/DasboardCardGrid ';
import RevenueChart from '@/components/RevenueChart';
import { ChartAreaDefault } from '@/components/ChartAreaDefault';
const breadcrumbs: BreadcrumbItem[] = [{ title: 'Seller Dashboard', href: '/Seller/Dashboard' }];

export default function Dashboard() {
   

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Seller Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <DasboardCardGrid/>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <RevenueChart />
                </div>
                <div className="relative h-[240px] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
  <ChartAreaDefault />
</div>
            </div>
        </AppLayout>
    );
}
