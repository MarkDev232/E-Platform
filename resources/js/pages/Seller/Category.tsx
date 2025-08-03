import { CategoryModal } from '@/components/CategoryModal';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem, type Category, type PageProps } from '@/types';
import { Head, router, useForm, usePage } from '@inertiajs/react';
import { EyeIcon, PencilIcon, PlusIcon, TrashIcon } from 'lucide-react';
import { useState } from 'react';

interface PaginatedCategories {
    data: Category[];
    current_page: number;
    last_page: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Manage Categories', href: '/seller/Category' }];

export default function Category({ categories, filters }: { categories?: PaginatedCategories; filters?: { search?: string } }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const [modalState, setModalState] = useState({
        open: false,
        category: null as Category | null,
        mode: 'create' as 'create' | 'edit' | 'view',
    });

    const { flash = {} } = usePage<PageProps>().props;
    const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
    const [selectAll, setSelectAll] = useState(false);

    const { data, setData } = useForm({
        search: filters?.search || '',
    });

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('seller.category.index'), { search: data.search }, { preserveState: true, replace: true });
    };

    const handleReset = () => {
        setData('search', '');
        router.get(route('seller.category.index'));
    };

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this category?')) {
            router.delete(route('seller.category.destroy', id));
        }
    };

    const handleDeleteMultiple = () => {
        if (selectedCategories.length === 0 || !confirm(`Are you sure you want to delete ${selectedCategories.length} selected categories?`)) {
            return;
        }

        setIsDeleting(true);
        router.delete(route('seller.category.destroy.multiple'), {
            data: { ids: selectedCategories },
            preserveScroll: true,
            onSuccess: () => {
                setSelectedCategories([]);
                setSelectAll(false);
            },
            onFinish: () => setIsDeleting(false),
        });
    };

    const toggleCategorySelection = (id: number) => {
        setSelectedCategories((prev) => (prev.includes(id) ? prev.filter((categoryId) => categoryId !== id) : [...prev, id]));
    };

    const toggleSelectAll = () => {
        if (selectAll) {
            setSelectedCategories([]);
        } else {
            setSelectedCategories(categories?.data?.map((category) => category.id) || []);
        }
        setSelectAll(!selectAll);
    };

    const openCreateModal = () => setModalState({ open: true, category: null, mode: 'create' });
    const openEditModal = (category: Category) => setModalState({ open: true, category, mode: 'edit' });
    const openViewModal = (category: Category) => setModalState({ open: true, category, mode: 'view' });
    const closeModal = () => setModalState((prev) => ({ ...prev, open: false }));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Manage Categories" />

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
                    {selectedCategories.length > 0 && (
                        <Button variant="destructive" onClick={handleDeleteMultiple} disabled={isDeleting}>
                            {isDeleting ? 'Deleting...' : `Delete Selected (${selectedCategories.length})`}
                        </Button>
                    )}
                    <Button onClick={openCreateModal}>
                        <PlusIcon className="mr-2 h-4 w-4" />
                        Add Category
                    </Button>
                </div>
            </div>

            {/* Categories Table */}
            <div className="mx-5 rounded-xl border p-5">
                <table className="min-w-full text-sm">
                    <thead className="bg-muted text-muted-foreground">
                        <tr>
                            <th className="w-10 px-4 py-2">
                                <Checkbox checked={selectAll} onCheckedChange={toggleSelectAll} />
                            </th>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-center">Description</th>
                            <th className="px-4 py-2 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories?.data?.length ? (
                            categories.data.map((category) => (
                                <tr key={category.id} className="border-t hover:bg-accent">
                                    <td className="px-4 py-2">
                                        <Checkbox
                                            checked={selectedCategories.includes(category.id)}
                                            onCheckedChange={() => toggleCategorySelection(category.id)}
                                        />
                                    </td>
                                    <td className="py- px-4 text-left">{category.name}</td>
                                    <td className="px-4 py-2 text-center">{category.description}</td>
                                    <td className="flex justify-end space-x-2 px-4 py-2">
                                        <Button size="sm" variant="outline" onClick={() => openViewModal(category)}>
                                            <EyeIcon className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="outline" onClick={() => openEditModal(category)}>
                                            <PencilIcon className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="destructive" onClick={() => handleDelete(category.id)}>
                                            <TrashIcon className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="py-4 text-center">
                                    No categories found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {categories && (
              
                    <Pagination>
                        <PaginationContent>
                            {categories.current_page > 1 && (
                                <PaginationItem>
                                    <PaginationPrevious
                                        href={route('seller.category.index', { page: categories.current_page - 1 })}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            router.get(route('seller.category.index', { page: categories.current_page - 1 }));
                                        }}
                                    />
                                </PaginationItem>
                            )}

                            {categories.links
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

                            {categories.current_page < categories.last_page && (
                                <PaginationItem>
                                    <PaginationNext
                                        href={route('seller.category.index', { page: categories.current_page + 1 })}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            router.get(route('seller.category.index', { page: categories.current_page + 1 }));
                                        }}
                                    />
                                </PaginationItem>
                            )}
                        </PaginationContent>
                    </Pagination>
               
            )}

            {/* Category Modal */}
            <CategoryModal open={modalState.open} onOpenChange={closeModal} category={modalState.category} isViewMode={modalState.mode === 'view'} />
        </AppLayout>
    );
}
