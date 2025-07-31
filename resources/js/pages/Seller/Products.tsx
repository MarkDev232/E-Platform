import { Button } from '@/components/ui/button'; // Adjust path based on your components
import AppLayout from '@/layouts/app-layout';
import type { Product } from '@/types'; // Define this interface in your types
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { PencilIcon, TrashIcon } from 'lucide-react';

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginatedProducts {
    data: Product[];
    current_page: number;
    last_page: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    filters: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Manage Products', href: '/Seller/Products' }];

export default function Products({ products, filters }: { products: PaginatedProducts; filters: { search?: string } }) {
    const { data, setData, get } = useForm({
        search: filters.search || '',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get('/seller/Products', {
            preserveState: true,
            replace: true,
        });
    };

    const handleEdit = (id: number) => {
        router.visit(route('seller.products.edit', id));
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(route('seller.products.destroy', id));
        }
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs} 
        
        >
            <Head title="Seller Products" />

            <form onSubmit={handleSearch} className="flex flex-row items-center justify-end gap-2 rounded-xl p-2">
                <input
                    type="text"
                    value={data.search}
                    onChange={(e) => setData('search', e.target.value)}
                    className="w-full max-w-sm rounded border px-3 py-2 text-sm"
                    placeholder="Search by name..."
                />
                <Button type="submit">Search</Button>

                {filters.search && (
                    <Button
                        variant="ghost"
                        type="button"
                        onClick={() => {
                            setData('search', ''); // Reset the search input if using useForm

                            router.get(
                                '/seller/Products',
                                { page: 1 },
                                {
                                    replace: true,
                                    preserveState: false,
                                    only: ['products'],
                                },
                            );
                        }}
                    >
                        Reset
                    </Button>
                )}
            </form>

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-2">
                <div className="overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <table className="min-w-full text-left text-sm">
                        <thead className="bg-muted text-muted-foreground">
                            <tr>
                                <th className="px-4 py-2">Image</th>
                                <th className="px-4 py-2">Name</th>
                                <th className="px-4 py-2">Price</th>
                                <th className="px-4 py-2">Stock</th>
                                <th className="px-4 py-2">Sales</th>
                                <th className="px-4 py-2 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.data.map((product) => (
                                <tr key={product.id} className="border-t border-border hover:bg-accent hover:text-accent-foreground">
                                    <td className="px-4 py-2">
                                        <img src={product.image_url} alt={product.name} className="h-12 w-12 rounded-md object-cover" />
                                    </td>
                                    <td className="px-4 py-2">{product.name}</td>
                                    <td className="px-4 py-2">₱{product.price}</td>
                                    <td className="px-4 py-2">{product.stock}</td>
                                    <td className="px-4 py-2">{product.sales}</td>
                                    <td className="space-x-2 px-4 py-2 text-right">
                                        <Button size="sm" variant="outline" onClick={() => handleEdit(product.id)}>
                                            <PencilIcon className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
                                            <TrashIcon className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Pagination>
                        <PaginationContent>
                            {products.current_page > 1 && (
                                <PaginationItem>
                                    <PaginationPrevious
                                        href={`?page=${products.current_page - 1}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            router.visit(`?page=${products.current_page - 1}`);
                                        }}
                                    />
                                </PaginationItem>
                            )}

                            {products.links
                                .filter((link) => !isNaN(Number(link.label)))
                                .map((link, index) => (
                                    <PaginationItem key={index}>
                                        <PaginationLink
                                            href={link.url || '#'}
                                            isActive={link.active}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                if (link.url) router.visit(link.url);
                                            }}
                                        >
                                            {link.label}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                            {/* Ellipsis */}
                            {products.current_page < products.last_page - 2 && (
                                <PaginationItem>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            )}

                            {/* Next Page */}
                            {products.current_page < products.last_page && (
                                <PaginationItem>
                                    <PaginationNext
                                        href={`?page=${products.current_page + 1}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            router.visit(`?page=${products.current_page + 1}`);
                                        }}
                                    />
                                </PaginationItem>
                            )}
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
        </AppLayout>
    );
}
