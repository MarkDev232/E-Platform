import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import type { AppPageProps, NavItem } from '@/types';
import { usePage } from '@inertiajs/react';
import { LayoutGrid, LayoutList, PackageSearch, SquareEqual, SquareUserRound } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage<AppPageProps>().props;
    const userType = auth?.user?.user_type ?? null;
    const mainNavItems: NavItem[] = [];

    if (userType === 'seller') {
        mainNavItems.push(
            { title: 'Dashboard', href: '/seller/dashboard', icon: LayoutGrid },
            {
                title: 'Manage Products',
                icon: PackageSearch,
                children: [
                    { title: 'All Products', href: '/seller/Products', icon: SquareEqual },
                    { title: 'All Brands', href: '/seller/Brand', icon: SquareEqual },
                    { title: 'All Category', href: '/seller/Category', icon: SquareEqual },
                ],
            },
            { title: 'Orders', href: '/seller/Orders', icon: LayoutList },
        );
    } else if (userType === 'admin') {
        mainNavItems.push(
            { title: 'Dashboard', href: 'dashboard', icon: LayoutGrid },
            { title: 'Manage Users', href: '/admin/User', icon: SquareUserRound },
        );
    }

    if (!userType) return null; // or loading spinner

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <AppLogo />
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
