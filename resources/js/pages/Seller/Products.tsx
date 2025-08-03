import { ProductModal } from '@/components/ProductModal';
import { Button } from '@/components/ui/button';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import type { Product } from '@/types';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Checkbox } from '@/components/ui/checkbox';
import { MousePointerClick, PencilIcon, PlusIcon, Search, TrashIcon } from 'lucide-react';
import { useState } from 'react';

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

interface ProductFormData extends Record<string, string | number | undefined> {
    search?: string;
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Manage Products', href: '/Seller/Products' }];

export default function Products({ products, filters }: { products: PaginatedProducts; filters: { search?: string } }) {
    const { data, setData, get } = useForm<ProductFormData>({
        search: filters.search || '',
    });

    const [selectedProducts, setSelectedProducts] = useState<number[]>([]);

    const [modalState, setModalState] = useState({
        open: false,
        product: null as Product | null,
        isViewMode: false,
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        get('/seller/Products', {
            preserveState: true,
            replace: true,
        });
    };

    const handleReset = () => {
        setData('search', '');
        router.get(
            '/seller/Products',
            { page: 1 },
            {
                replace: true,
                preserveState: false,
                only: ['products'],
            },
        );
    };

    const findProductById = (id: number): Product | undefined => {
        return products.data.find((product) => product.id === id);
    };

    const handleView = (id: number) => {
        const product = findProductById(id);
        if (product) {
            setModalState({
                open: true,
                product,
                isViewMode: true,
            });
        }
    };

    const handleEdit = (id: number) => {
        const product = findProductById(id);
        if (product) {
            setModalState({
                open: true,
                product,
                isViewMode: false,
            });
        }
    };

    const handleAdd = () => {
        setModalState({
            open: true,
            product: null,
            isViewMode: false,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this product?')) {
            router.delete(route('seller.products.destroy', id));
        }
    };

    const handleSelectProduct = (id: number) => {
        setSelectedProducts((prev) => (prev.includes(id) ? prev.filter((productId) => productId !== id) : [...prev, id]));
    };

    const handleSelectAll = () => {
        if (selectedProducts.length === products.data.length) {
            setSelectedProducts([]);
        } else {
            setSelectedProducts(products.data.map((product) => product.id));
        }
    };

    const handleBulkDelete = () => {
        if (selectedProducts.length === 0) return;

        if (confirm(`Are you sure you want to delete ${selectedProducts.length} selected products?`)) {
            router.delete(route('seller.products.destroy-multiple'), {
                data: { ids: selectedProducts },
                onSuccess: () => setSelectedProducts([]),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Seller Products" />
            <div className="flex items-center justify-between px-5 py-3">
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={data.search}
                        onChange={(e) => setData('search', e.target.value)}
                        className="w-full max-w-sm rounded border px-3 py-2 text-sm"
                        placeholder="Search by name..."
                    />
                    <Button type="submit">
                        <Search className="mr-2 h-4 w-4" />
                        Search
                    </Button>

                    {filters.search && (
                        <Button variant="ghost" type="button" onClick={handleReset}>
                            Reset
                        </Button>
                    )}
                </form>

                <div className="flex gap-2">
                    {selectedProducts.length > 0 && (
                        <Button variant="destructive" onClick={handleBulkDelete}>
                            <TrashIcon className="mr-2 h-4 w-4" />
                            Delete Selected ({selectedProducts.length})
                        </Button>
                    )}
                    <Button onClick={handleAdd}>
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Add Product
                    </Button>
                </div>
            </div>

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl ">
                <div className="mx-5 rounded-xl border p-5">
                    <table className="min-w-full text-left text-sm ">
                        <thead className="bg-muted text-muted-foreground">
                            <tr>
                                <th className="px-4 py-2">
                                    <Checkbox
                                        checked={selectedProducts.length === products.data.length && products.data.length > 0}
                                        onCheckedChange={handleSelectAll}
                                    />
                                </th>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-center">Price</th>
                                <th className="px-4 py-2 text-center">Stock</th>
                                <th className="px-4 py-2 text-center">Sales</th>
                                <th className="px-4 py-2 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products?.data?.length ? (
                                products.data.map((product) => (
                                    <tr key={product.id} className="border-t border-border hover:bg-accent hover:text-accent-foreground">
                                        <td className="px-4 py-2">
                                            <Checkbox
                                                checked={selectedProducts.includes(product.id)}
                                                onCheckedChange={() => handleSelectProduct(product.id)}
                                            />
                                        </td>
                                        <td className="px-4 py-2 text-left">{product.name}</td>
                                        <td className="px-4 py-2 text-center">₱ {Number(product.price).toFixed(2)}</td>
                                        <td className="px-4 py-2 text-center">{product.stock_quantity}</td>
                                        <td className="px-4 py-2 text-center">{product.sales}</td>
                                        <td className="space-x-2 px-4 py-2 text-right">
                                            <Button size="sm" variant="update" onClick={() => handleView(product.id)}>
                                                <MousePointerClick className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="outline" onClick={() => handleEdit(product.id)}>
                                                <PencilIcon className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="h-90 py-4 text-center">
                                        No Product found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
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

                        {products.current_page < products.last_page - 2 && (
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                        )}

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

            <ProductModal
                open={modalState.open}
                onOpenChange={(open) => setModalState({ ...modalState, open })}
                product={modalState.product}
                isViewMode={modalState.isViewMode}
                onSuccess={() => router.reload()}
            />
        </AppLayout>
    );
}
