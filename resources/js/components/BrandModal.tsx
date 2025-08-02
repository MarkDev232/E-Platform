import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Brand } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { useEffect } from 'react';

interface BrandModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    brand?: Brand | null;
    isViewMode?: boolean;
}

export function BrandModal({ open, onOpenChange, brand, isViewMode = false }: BrandModalProps) {
    const { data, setData, processing, errors, reset } = useForm({
        name: brand?.name || '',
        description: brand?.description || '',
        logo: null as File | null,
    });

    useEffect(() => {
        setData({
            name: brand?.name || '',
            description: brand?.description || '',
            logo: null,
        });
    }, [brand, setData]); // Added setData to dependencies

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        if (data.logo) formData.append('logo', data.logo);

        router.post(
            brand?.id ? route('seller.brand.update', brand.id) : route('seller.brand.store'),
            {
                ...Object.fromEntries(formData),
                ...(brand?.id && { _method: 'PUT' }),
            },
            {
                onSuccess: () => onOpenChange(false),
                preserveScroll: true,
                forceFormData: true,
            }
        );
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) reset();
                onOpenChange(isOpen);
            }}
        >
            <DialogContent className="top-1/8 left-1/8 min-w-[250px] -translate-x-1/2 -translate-y-1/2 sm:min-w-[400px]">
                <DialogHeader>
                    <DialogTitle>{isViewMode ? 'View Brand' : brand?.id ? 'Edit Brand' : 'Create Brand'}</DialogTitle>
                </DialogHeader>

                {isViewMode ? (
                    <div className="space-y-4">
                        <div>
                            <Label>Name</Label>
                            <div className="mt-1 rounded border bg-gray-50 p-2">{data.name}</div>
                        </div>
                        <div>
                            <Label>Description</Label>
                            <div className="mt-1 min-h-[100px] rounded border bg-gray-50 p-2">
                                {data.description || <span className="text-gray-400">No description</span>}
                            </div>
                        </div>
                        {brand?.logo && (
                            <div>
                                <Label>Logo</Label>
                                <div className="mt-1">
                                    <img src={`/storage/${brand.logo}`} alt={data.name} className="h-20 object-contain" />
                                </div>
                            </div>
                        )}
                        <div className="flex justify-end">
                            <Button onClick={() => onOpenChange(false)}>Close</Button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1" />
                            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="mt-1 w-full rounded border border-gray-300 p-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                rows={4}
                            />
                            {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                        </div>
                        <div>
                            <Label htmlFor="logo">Logo</Label>
                            <Input
                                id="logo"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setData('logo', e.target.files?.[0] || null)}
                                className="mt-1"
                            />
                            {errors.logo && <p className="mt-1 text-sm text-red-500">{errors.logo}</p>}
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {brand?.id ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}