import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';
import { PageProps as InertiaPageProps } from '@inertiajs/core';

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
    href?: string;
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
    discount_price: number;
    stock_quantity: string;
    sku: number;
    category_id: number;
    sales: number;
    created_at?: string;
    updated_at?: string;
    image?: {
        id: number;
        image_url: string;
    }[];
    primary_image?: ProductImage;
}

export interface ProductImage {
    id: number;
    image_path: string;
    is_primary: boolean;
}

export interface Brand {
    id: number;
    name: string;
    logo?: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
}

export interface Category {
    id: number;
    name: string;
    description?: string;
    created_at?: string;
    updated_at?: string;
}

interface FlashMessages {
  success?: string;
  error?: string;
  // Add other flash message types you might use
}

// Extend the Inertia PageProps with your custom props
export interface PageProps extends InertiaPageProps {
    flash?: FlashMessages;
    Categories?: PaginatedCategories;
    filters?: { search?: string };
    // Use unknown instead of any for better type safety
    [key: string]: unknown;
}
