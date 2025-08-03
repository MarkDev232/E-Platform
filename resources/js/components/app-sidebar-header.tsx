import { useEffect, useRef, useState } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { Bell } from 'lucide-react';
import { format, isToday, isYesterday, parseISO } from 'date-fns';

type Notification = {
    id: number | string;
    message: string;
    createdAt: string; // ISO string
};

function groupNotifications(notifications: Notification[]) {
    const groups: Record<string, Notification[]> = {};

    for (const notif of notifications) {
        const date = parseISO(notif.createdAt);
        let label = format(date, 'MMMM dd, yyyy');

        if (isToday(date)) label = 'Today';
        else if (isYesterday(date)) label = 'Yesterday';

        if (!groups[label]) groups[label] = [];
        groups[label].push(notif);
    }

    return groups;
}

export function AppSidebarHeader({
    breadcrumbs = [],
    notificationCount = 0,
    notifications = [],
}: {
    breadcrumbs?: BreadcrumbItemType[];
    notificationCount?: number | null;
    notifications?: Notification[];
}) {
    const count = notificationCount ?? 0;
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const grouped = groupNotifications(notifications);

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2 text-black dark:text-white w-full">
                <SidebarTrigger className="-ml-1" />
                <Breadcrumbs breadcrumbs={breadcrumbs} />
                <div className="ml-auto flex items-center gap-4" ref={dropdownRef}>
                    <div
                        onClick={() => setOpen(!open)}
                        className="relative p-2 border border-gray-300 dark:border-white/20 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 cursor-pointer transition-all"
                    >
                        <Bell className="h-5 w-5" />
                        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                            {count > 9 ? '9+' : count}
                        </span>
                    </div>

                    {open && (
                        <div className="absolute top-14 right-6 z-50 w-72 bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-md shadow-lg">
                            <div className="p-3 text-sm font-semibold border-b dark:border-zinc-700">
                                Notifications
                            </div>
                            <div className="max-h-64 overflow-auto divide-y divide-gray-200 dark:divide-zinc-700 text-sm">
                                {Object.entries(grouped).map(([label, notifs]) => (
                                    <div key={label} className="px-4 py-2">
                                        <div className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-1">
                                            {label}
                                        </div>
                                        <ul className="space-y-1">
                                            {notifs.map((n) => (
                                                <li key={n.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800 p-2 rounded cursor-pointer">
                                                    {n.message}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                                {notifications.length === 0 && (
                                    <div className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                        No notifications
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
