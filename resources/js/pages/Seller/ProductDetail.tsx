import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

import type { Product } from '@/types';

export default function ProductDetail({ product, images }: { product: Product; images: { id: number; image_url: string }[] }) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Product Details', href: '/Seller/ProductDetail' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Product Details" />
            <div className="ml-6 flex max-w-5xl gap-8 p-4">
                {/* Left Side - Product Info */}
                <div className="flex-1 space-y-4">
                    {/* ID */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">ID</label>
                        <p className="rounded bg-gray-100 p-2 text-sm text-gray-800">{product.id}</p>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">Name</label>
                        <p className="rounded bg-gray-100 p-2 text-sm text-gray-800">{product.name}</p>
                    </div>

                    {/* Price */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">Price</label>
                        <p className="rounded bg-gray-100 p-2 text-sm text-gray-800">
                            ₱{Number(product.price).toFixed(2)}
                        </p>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="mb-1 block text-sm font-medium">Description</label>
                        <p className="rounded bg-gray-100 p-2 text-sm text-gray-800 whitespace-pre-line">
                            {product.description || 'No description provided.'}
                        </p>
                    </div>
                </div>

                {/* Right Side - Product Images */}
                <div className="w-1/2 border-l pl-6">
                    <h2 className="mb-2 text-lg font-semibold">Product Images</h2>

                    {images.length > 0 ? (
                        <div className="flex flex-wrap gap-4">
                            {images.map((image) => (
                                <div key={image.id} className="relative h-32 w-32 overflow-hidden rounded border">
                                    <img src={image.image_url} alt="Product" className="h-full w-full object-cover" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-gray-500">No images available.</p>
                    )}

                    <Button asChild className="mt-4">
                        <a href={`/seller/products/${product.id}/edit`}>Edit Product</a>
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
