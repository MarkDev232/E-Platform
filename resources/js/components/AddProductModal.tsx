import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';

export function AddProductModal() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        price: '',
        discount_price: '',
        stock_quantity: '',
        sku: '',
        category_id: '',
        sales: '',
        seller_id: '', // Can be auto-filled in backend if authenticated
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('seller.products.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="bg-blue-700 hover:bg-blue-500">
                        <Plus className="mr-2 h-4 w-4" /> Add Product
                    </Button>
                </DialogTrigger>
                <DialogContent className="top-1/8 left-1/8 -translate-x-1/2 -translate-y-1/2 min-w-250">
                    <DialogHeader>
                        <DialogTitle>Add New Product</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Product Name</Label>
                            <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                        </div>

                        <div>
                            <Label htmlFor="description">Description</Label>
                            <textarea
                                id="description"
                                className="w-full rounded-md border border-input px-3 py-2 text-sm"
                                rows={3}
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                            />
                            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="price">Price</Label>
                                <Input id="price" type="number" value={data.price} onChange={(e) => setData('price', e.target.value)} />
                                {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
                            </div>

                            <div>
                                <Label htmlFor="discount_price">Discount Price</Label>
                                <Input id="discount_price" type="number" value={data.discount_price} onChange={(e) => setData('discount_price', e.target.value)} />
                                {errors.discount_price && <p className="text-sm text-red-500">{errors.discount_price}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="stock_quantity">Stock Quantity</Label>
                                <Input id="stock_quantity" type="number" value={data.stock_quantity} onChange={(e) => setData('stock_quantity', e.target.value)} />
                                {errors.stock_quantity && <p className="text-sm text-red-500">{errors.stock_quantity}</p>}
                            </div>

                            <div>
                                <Label htmlFor="sales">Sales</Label>
                                <Input id="sales" type="number" value={data.sales} onChange={(e) => setData('sales', e.target.value)} />
                                {errors.sales && <p className="text-sm text-red-500">{errors.sales}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="sku">SKU</Label>
                                <Input id="sku" value={data.sku} onChange={(e) => setData('sku', e.target.value)} />
                                {errors.sku && <p className="text-sm text-red-500">{errors.sku}</p>}
                            </div>

                            <div>
                                <Label htmlFor="category_id">Category ID</Label>
                                <Input id="category_id" type="number" value={data.category_id} onChange={(e) => setData('category_id', e.target.value)} />
                                {errors.category_id && <p className="text-sm text-red-500">{errors.category_id}</p>}
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit" disabled={processing}>
                                {processing ? 'Saving...' : 'Save Product'}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
