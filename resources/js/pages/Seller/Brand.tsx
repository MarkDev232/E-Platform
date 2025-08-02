import { BrandModal } from '@/components/BrandModal';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { type Brand, type BreadcrumbItem, type PageProps } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { EyeIcon, PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';

interface PaginatedBrands {
    data: Brand[];
    current_page: number;
    last_page: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Manage Brands', href: '/seller/Brand' }];

export default function Brand({ brands, filters }: { brands?: PaginatedBrands; filters?: { search?: string } }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [modalState, setModalState] = useState({
        open: false,
        brand: null as Brand | null,
        mode: 'create' as 'create' | 'edit' | 'view',
    });

        
    // Update the component to use the typed page props
    const { flash = {} } = usePage<PageProps>().props;
    const [selectedBrands, setSelectedBrands] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);

    const { data, setData } = useForm({
        search: filters?.search || '',
    });

    // Handle search functionality
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route('seller.brand.index'),
            {
                search: data.search,
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };

    // Handle reset search
    const handleReset = () => {
        setData('search', '');
        router.get(route('seller.brand.index'));
    };

    // Handle single brand deletion
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this brand?')) {
            router.delete(route('seller.brand.destroy', id));
        }
    };

    // Handle multiple brands deletion
    const handleDeleteMultiple = () => {
        if (selectedBrands.length === 0 || !confirm(`Are you sure you want to delete ${selectedBrands.length} selected brands?`)) {
            return;
        }

        setIsDeleting(true);
        router.delete(route('seller.brand.destroy.multiple'), {
            data: { ids: selectedBrands },
            preserveScroll: true,
            onSuccess: () => {
                setSelectedBrands([]);
                setSelectAll(false);
            },
            onFinish: () => setIsDeleting(false),
        });
    };

    // Toggle selection for individual brands
    const toggleBrandSelection = (id: number) => {
        setSelectedBrands((prev) => (prev.includes(id) ? prev.filter((brandId) => brandId !== id) : [...prev, id]));
    };

    // Toggle select all brands
    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectedBrands([]);
        } else {
            setSelectedBrands(brands?.data?.map((brand) => brand.id) || []);
        }
        setSelectAll(!selectAll);
    };

    // Modal handlers
    const openCreateModal = () => setModalState({ open: true, brand: null, mode: 'create' });
    const openEditModal = (brand: Brand) => setModalState({ open: true, brand, mode: 'edit' });
    const openViewModal = (brand: Brand) => setModalState({ open: true, brand, mode: 'view' });
    const closeModal = () => setModalState((prev) => ({ ...prev, open: false }));
console.log('Brands data:', brands);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Brands" />

            {flash?.success && <div className="mx-5 mb-4 rounded bg-green-100 p-4 text-green-700">{flash.success}</div>}
            {flash?.error && <div className="mx-5 mb-4 rounded bg-red-100 p-4 text-red-700">{flash.error}</div>}

            {/* Search and Action Bar */}
            <div className="flex items-center justify-between px-5 py-3">
                <form onSubmit={handleSearch} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={data.search}
                        onChange={(e) => setData('search', e.target.value)}
                        className="w-full max-w-sm rounded border px-3 py-2 text-sm"
                        placeholder="Search by name..."
                    />
                    <Button type="submit">Search</Button>
                    {data.search && (
                        <Button variant="ghost" type="button" onClick={handleReset}>
                            Reset
                        </Button>
                    )}
                </form>

                <div className="flex gap-2">
                    {selectedBrands.length > 0 && (
                        <Button variant="destructive" onClick={handleDeleteMultiple} disabled={isDeleting}>
                            {isDeleting ? 'Deleting...' : `Delete Selected (${selectedBrands.length})`}
                        </Button>
                    )}
                    <Button onClick={openCreateModal}>
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Add Brand
                    </Button>
                </div>
            </div>

            {/* Brands Table */}
            <div className="mx-5 rounded-xl border p-5">
                <table className="min-w-full text-sm">
                    <thead className="bg-muted text-muted-foreground">
                        <tr>
                            <th className="w-10 px-4 py-2">
                                <Checkbox checked={selectAll} onCheckedChange={toggleSelectAll} />
                            </th>
                            <th className="px-4 py-2">Name</th>
                            <th className="max-w-[120px] px-4 py-2">Logo</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {brands?.data?.length ? (
                            brands.data.map((brand) => (
                                <tr key={brand.id} className="border-t hover:bg-accent">
                                    <td className="px-4 py-2">
                                        <Checkbox
                                            checked={selectedBrands.includes(brand.id)}
                                            onCheckedChange={() => toggleBrandSelection(brand.id)}
                                        />
                                    </td>
                                    <td className="px-4 py-2">{brand.name}</td>
                                    <td className="x-4 py-2">
                                        {brand.logo && <img src={`/storage/${brand.logo}`} alt={brand.name} className="h-10 object-contain" />}
                                    </td>
                                    <td className="px-4 py-2">{brand.description}</td>
                                    <td className="flex justify-end space-x-2 px-4 py-2">
                                        <Button size="sm" variant="outline" onClick={() => openViewModal(brand)}>
                                            <EyeIcon className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="outline" onClick={() => openEditModal(brand)}>
                                            <PencilIcon className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={() => handleDelete(brand.id)}>
                                            <TrashIcon className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-4 text-center">
                                    No brands found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {brands && brands.last_page > 1 && (
                <Pagination>
                    <PaginationContent>
                        {brands.current_page > 1 && (
                            <PaginationItem>
                                <PaginationPrevious
                                    href={route('seller.brand.index', { page: brands.current_page - 1 })}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        router.get(route('seller.brand.index', { page: brands.current_page - 1 }));
                                    }}
                                />
                            </PaginationItem>
                        )}

                        {brands.links
                            .filter((link) => !isNaN(Number(link.label)))
                            .map((link, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        href={link.url || '#'}
                                        isActive={link.active}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (link.url) router.get(link.url);
                                        }}
                                    >
                                        {link.label}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}

                        {brands.current_page < brands.last_page && (
                            <PaginationItem>
                                <PaginationNext
                                    href={route('seller.brand.index', { page: brands.current_page + 1 })}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        router.get(route('seller.brand.index', { page: brands.current_page + 1 }));
                                    }}
                                />
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>
            )}

            {/* Brand Modal */}
            <BrandModal open={modalState.open} onOpenChange={closeModal} brand={modalState.brand} isViewMode={modalState.mode === 'view'} />
        </AppLayout>
    );
}
