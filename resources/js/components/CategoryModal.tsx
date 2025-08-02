import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useForm } from '@inertiajs/react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Category } from '@/types';
import { useEffect } from 'react';

interface CategoryModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    category?: Category | null;
    isViewMode?: boolean;
    onSuccess?: () => void;
}

export function CategoryModal({ 
    open, 
    onOpenChange, 
    category, 
    isViewMode = false,
    onSuccess 
}: CategoryModalProps) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: category?.name || '',
        description: category?.description || '',
    });

    useEffect(() => {
    setData({
        name: category?.name || '',
        description: category?.description || '',
    });
}, [category, setData]); // Add setData to dependencies


    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (category?.id) {
            put(route('seller.category.update', category.id), {
                onSuccess: () => {
                    onOpenChange(false);
                    onSuccess?.();
                },
            });
        } else {
            post(route('seller.category.store'), {
                onSuccess: () => {
                    onOpenChange(false);
                    reset();
                    onSuccess?.();
                },
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={(isOpen) => {
            if (!isOpen) {
                reset();
            }
            onOpenChange(isOpen);
        }}>
            <DialogContent className="top-1/8 left-1/8 -translate-x-1/2 -translate-y-1/2 min-w-[250px] sm:min-w-[400px]">
                <DialogHeader>
                    <DialogTitle>
                        {isViewMode ? 'View Category' : category?.id ? 'Edit Category' : 'Create Category'}
                    </DialogTitle>
                </DialogHeader>
                
                {isViewMode ? (
                    <div className="space-y-4">
                        <div>
                            <Label>Name</Label>
                            <div className="mt-1 p-2 rounded border bg-gray-50">
                                {data.name}
                            </div>
                        </div>
                        <div>
                            <Label>Description</Label>
                            <div className="mt-1 p-2 rounded border bg-gray-50 min-h-[100px]">
                                {data.description || <span className="text-gray-400">No description</span>}
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button onClick={() => onOpenChange(false)}>
                                Close
                            </Button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="mt-1"
                            />
                            {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                className="mt-1 w-full rounded border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                rows={4}
                            />
                            {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
                        </div>
                        <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {category?.id ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}