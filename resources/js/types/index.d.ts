import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
    children?: NavItem[];
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    user_type: 'admin' | 'seller' | 'customer';
    is_active: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export type AppPageProps = {
    auth?: {
        user?: {
            id: number;
            name: string;
            email: string;
            user_type: string;
        };
    };
    // other props...
    [key: string]: unknown;
};

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
    stock: number;
    sales: number;
    category_id: number;
    created_at?: string;
    updated_at?: string;
}