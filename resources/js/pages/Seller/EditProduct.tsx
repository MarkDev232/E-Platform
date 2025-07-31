import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';


import type { Product } from '@/types';

export default function EditProduct({ product }: { product: Product }) {
    const { data, setData, put, processing, errors } = useForm({
        name: product.name,
        price: product.price,
        stock: product.stock,
        description: product.description,
        image_url: product.image_url,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/seller/Products/${product.id}`);
    };

   
    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Edit Products', href: '/Seller/Products' }];
    
    return (
        
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Product" />
            <div className="ml-6 max-w-2xl">
               

                <form onSubmit={handleSubmit} className="max-w-xl space-y-4 p-3">
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
                    <div>
                        <label htmlFor="stock" className="mb-1 block text-sm font-medium">
                            Stock
                        </label>
                        <Input
                            id="stock"
                            type="number"
                            value={data.stock}
                            onChange={(e) => setData('stock', Number(e.target.value))}
                            placeholder="Stock"
                        />
                        {errors.stock && <p className="mt-1 text-sm text-red-500">{errors.stock}</p>}
                    </div>

                    {/* Description */}
                    <div>
                        <label htmlFor="description" className="mb-1 block text-sm font-medium">
                            Description
                        </label>
                        <Input
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            placeholder="Description"
                        />
                        {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                    </div>

                    {/* Image URL */}
                    <div>
                        <label htmlFor="image_url" className="mb-1 block text-sm font-medium">
                            Image URL
                        </label>
                        <Input id="image_url" value={data.image_url} onChange={(e) => setData('image_url', e.target.value)} placeholder="Image URL" />
                        {errors.image_url && <p className="text-sm text-red-500">{errors.image_url}</p>}
                    </div>

                    <Button type="submit" disabled={processing}>
                        Update Product
                    </Button>
                </form>
            </div>
        </AppLayout>
    );
}
