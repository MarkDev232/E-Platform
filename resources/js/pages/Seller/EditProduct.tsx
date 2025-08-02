import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

import type { Product } from '@/types';
import { router } from '@inertiajs/react';
import { useState } from 'react';

type Image = {
    id: number;
    image_url: string;
};

export default function EditProduct({ product, images }: { product: Product; images: Image[] }) {
    const { data, setData, put, processing, errors } = useForm({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
    });

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    put(`/seller/Products/${product.id}`, {
        preserveScroll: true,
        onSuccess: () => {
            if (image) {
                const productId = product.id;
                const originalName = image.name;

                const renamedFile = new File([image], `${productId}_${originalName}`, {
                    type: image.type,
                });

                const formData = new FormData();
                formData.append('image', renamedFile);

                router.post(`/seller/products/${productId}/images`, formData, {
                    forceFormData: true,
                    onSuccess: () => {
                        window.location.reload();
                    },
                    onError: (errors) => {
                        console.error('Image upload failed:', errors);
                    },
                });
            }
        },
    });
};


    const [image, setImage] = useState<File | null>(null);
    const handleUploadImage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) return;

        const formData = new FormData();
        formData.append('image', image);
        
        router.post(`/seller/products/${product.id}/images`, formData, {
            forceFormData: true,
            onSuccess: () => {
                // Refresh or fetch new data if needed
                window.location.reload();
            },
            onError: (errors) => {
                console.error('Validation errors:', errors);
            },
        });
    };
    const handleDeleteImage = async (imageId: number) => {
        router.delete(`/seller/products/images/${imageId}`);
        window.location.reload();
    };

    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Edit Products', href: '/Seller/Products' }];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Product" />

            <div className="ml-6 flex max-w-5xl gap-8 p-4">
                {/* Left Side - Form */}
                <form onSubmit={handleSubmit} className="flex-1 space-y-4">
                    {/* Id */}
                    <div>
                        <label htmlFor="id" className="mb-1 block text-sm font-medium">
                            ID
                        </label>
                        <Input id="id" value={String(data.id ?? '')} readOnly placeholder="Product ID" className="cursor-not-allowed bg-gray-100" />
                        {errors.id && <p className="text-sm text-red-500">{errors.id}</p>}
                    </div>

                    {/* Name */}
                    <div>
                        <label htmlFor="name" className="mb-1 block text-sm font-medium">
                            Name
                        </label>
                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Name" />
                        {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                    </div>

                    {/* Price */}
                    <div>
                        <label htmlFor="price" className="mb-1 block text-sm font-medium">
                            Price
                        </label>
                        <Input
                            id="price"
                            type="number"
                            value={data.price}
                            onChange={(e) => setData('price', Number(e.target.value))}
                            placeholder="Price"
                        />
                        {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price}</p>}
                    </div>

                    {/* Stock */}
                    {/* <div>
                        <label htmlFor="stock" className="mb-1 block text-sm font-medium">
                            Stock
                        </label>
                        <Input id="stock" type="number" value={data.stock} onChange={(e) => setData('stock', e.target.value)} placeholder="Stock" />
                        {errors.stock && <p className="mt-1 text-sm text-red-500">{errors.stock}</p>}
                    </div> */}

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="mb-1 block text-sm font-medium">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Enter product description..."
                            className="w-full rounded border border-gray-300 p-2 text-sm shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
                            rows={4}
                        />
                        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                    </div>

                    <Button type="submit" disabled={processing}>
                        Update Product
                    </Button>
                </form>

                {/* Right Side - Images */}
                <div className="w-1/2 border-l pl-6">
                    <h2 className="mb-2 text-lg font-semibold">Product Images</h2>

                    {images && images.length > 0 ? (
                        <div className="flex flex-wrap gap-4">
                            {images.map((image: { id: number; image_url: string }) => (
                                <div key={image.id} className="relative h-32 w-32 overflow-hidden rounded border">
                                    <img src={image.image_url} alt="Product" className="h-full w-full object-cover" />
                                    <button
                                        type="button"
                                        className="absolute top-1 right-1 rounded bg-red-500 px-2 py-1 text-xs text-white"
                                        onClick={() => handleDeleteImage(image.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">No images uploaded yet.</p>
                    )}

                    <form onSubmit={handleUploadImage} className="mt-4 flex items-center gap-2">
                        {' '}
                        <input type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
                        <Button type="submit" disabled={!image}>
                            Upload
                        </Button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
