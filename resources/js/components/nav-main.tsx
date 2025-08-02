import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function NavMain({ items = [] }: { items: NavItem[] }) {
    const page = usePage();
    const currentUrl = page.url;

    const getInitiallyOpen = () => {
        const activeGroup = items.find((item) =>
            item.children?.some((child) => currentUrl.startsWith(child.href ?? ''))
        );
        return activeGroup?.title ?? null;
    };

    const [openDropdown, setOpenDropdown] = useState<string | null>(getInitiallyOpen);

    const toggleDropdown = (title: string) => {
        setOpenDropdown((prev) => (prev === title ? null : title));
    };

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                        {item.children ? (
                            <>
                                <SidebarMenuButton
                                    asChild
                                    isActive={item.children.some((child) => currentUrl.startsWith(child.href ?? ''))}
                                    onClick={() => toggleDropdown(item.title)}
                                >
                                    <div className="flex items-center justify-between w-full cursor-pointer">
                                        <div className="flex items-center gap-2">
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                        </div>
                                        {openDropdown === item.title ? (
                                            <ChevronUp size={16} />
                                        ) : (
                                            <ChevronDown size={16} />
                                        )}
                                    </div>
                                </SidebarMenuButton>

                                {openDropdown === item.title && (
                                    <SidebarMenu className="ml-4 mt-1 space-y-1">
                                        {item.children.map((child) => (
                                            <SidebarMenuItem key={child.title}>
                                                <SidebarMenuButton
                                                    asChild
                                                    isActive={currentUrl.startsWith(child.href ?? '')}
                                                    tooltip={{ children: child.title }}
                                                >
                                                    <Link href={child.href ?? '#'} prefetch>
                                                        <span>{child.title}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                )}
                            </>
                        ) : (
                            <SidebarMenuButton
                                asChild
                                isActive={currentUrl.startsWith(item.href ?? '')}
                                tooltip={{ children: item.title }}
                            >
                                <Link href={item.href ?? '#'} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        )}
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    );
}
