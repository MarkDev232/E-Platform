
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import type {  NavItem , AppPageProps  } from '@/types';
import {usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import {  LayoutGrid,PackageSearch , SquareUserRound, LayoutList } from 'lucide-react';
import AppLogo from './app-logo';






export function AppSidebar() {
    const { auth } = usePage<AppPageProps>().props;
const userType = auth?.user?.user_type ?? null;
const mainNavItems: NavItem[] = [];

if (userType === 'seller') {
    mainNavItems.push(
        { title: 'Dashboard', href: '/seller/dashboard', icon: LayoutGrid },
        { title: 'My Products', href: '/seller/Products', icon: PackageSearch },
        { title: 'Orders', href: '/orders' , icon: LayoutList }
    );
} else if (userType === 'admin') {
    mainNavItems.push(
        { title: 'Dashboard', href: 'dashboard', icon: LayoutGrid },
        { title: 'Manage Users', href: '/admin/User', icon: SquareUserRound }
    );
}
if (!userType) return null; // or loading spinner


    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
               
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
