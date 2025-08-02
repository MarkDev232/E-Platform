import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Product, ProductImage } from '@/types';
import { router, useForm } from '@inertiajs/react';
import axios from 'axios';
import { UploadIcon, XIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface ProductModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    product?: Product | null;
    isViewMode?: boolean;
    onSuccess?: () => void;
}

interface ProductFormValues {
    [key: string]: string | File[] | number | number[] | undefined;
    name: string;
    sku: string;
    description: string;
    price: string;
    stock_quantity: string;
    images?: File[];
    primary_image?: number;
    deleted_images?: number[];
}

export function ProductModal({ open, onOpenChange, product, isViewMode = false, onSuccess }: ProductModalProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { data, setData, processing, errors, reset } = useForm<ProductFormValues>({
        name: product?.name || '',
        sku: String(product?.sku || ''),
        description: product?.description || '',
        price: product?.price?.toString() || '0',
        stock_quantity: product?.stock_quantity?.toString() || '0',
        deleted_images: [],
    });

    const [previewImages, setPreviewImages] = useState<{ file: File; preview: string }[]>([]);
    const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
    const [primaryImageIndex, setPrimaryImageIndex] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        setData({
            name: product?.name || '',
            sku: String(product?.sku || ''),
            description: product?.description || '',
            price: product?.price?.toString() || '0',
            stock_quantity: product?.stock_quantity?.toString() || '0',
            deleted_images: [],
        });
        setPreviewImages([]);
        setPrimaryImageIndex(null);

        if (product?.id) {
            axios
                .get(route('seller.products.images', product.id))
                .then((response) => {
                    setExistingImages(response.data);
                    // Set primary image index if exists
                    const primaryIndex = response.data.findIndex((img: ProductImage) => img.is_primary);
                    if (primaryIndex !== -1) {
                        setPrimaryImageIndex(primaryIndex);
                    }
                })
                .catch((error) => console.error('Error loading images:', error));
        } else {
            setExistingImages([]);
        }
    }, [product, setData]);

    const handleImageUpload = (files: FileList) => {
        const validFiles = Array.from(files)
            .filter((file) => file.type.startsWith('image/'))
            .slice(0, 5 - previewImages.length - existingImages.length);

        if (validFiles.length === 0) return;

        const newPreviewImages = validFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        const oldPreviews = [...previewImages];
        setPreviewImages((prev) => [...prev, ...newPreviewImages].slice(0, 5 - existingImages.length));

        setTimeout(() => {
            oldPreviews.forEach((image) => URL.revokeObjectURL(image.preview));
        }, 0);

        if (primaryImageIndex === null && (newPreviewImages.length > 0 || existingImages.length > 0)) {
            setPrimaryImageIndex(0);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleImageUpload(e.dataTransfer.files);
        }
    };

    const handleRemoveImage = (index: number) => {
        const imageToRemove = previewImages[index];
        const newImages = previewImages.filter((_, i) => i !== index);
        setPreviewImages(newImages);

        setTimeout(() => {
            URL.revokeObjectURL(imageToRemove.preview);
        }, 0);

        if (primaryImageIndex === index) {
            setPrimaryImageIndex(newImages.length > 0 ? 0 : null);
        } else if (primaryImageIndex !== null && primaryImageIndex > index) {
            setPrimaryImageIndex(primaryImageIndex - 1);
        }

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleRemoveExistingImage = (imageId: number) => {
        setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
        setData('deleted_images', [...(data.deleted_images || []), imageId]);

        // Adjust primary image index if needed
        if (primaryImageIndex !== null && existingImages.findIndex((img) => img.id === imageId) === primaryImageIndex) {
            setPrimaryImageIndex(previewImages.length > 0 ? 0 : null);
        }
    };

    useEffect(() => {
        return () => {
            previewImages.forEach((image) => URL.revokeObjectURL(image.preview));
        };
    }, [previewImages]);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', String(data.name));
        formData.append('sku', String(data.sku));
        formData.append('description', String(data.description));
        formData.append('price', String(data.price));
        formData.append('stock_quantity', String(data.stock_quantity));

        previewImages.forEach((image) => {
            formData.append('images[]', image.file);
        });

        if (primaryImageIndex !== null) {
            formData.append('primary_image', String(primaryImageIndex));
        }

        if (data.deleted_images && data.deleted_images.length > 0) {
            data.deleted_images.forEach((id) => {
                formData.append('deleted_images[]', id.toString());
            });
        }

        const options = {
            onSuccess: () => {
                onOpenChange(false);
                reset();
                onSuccess?.();
            },
            onError: (errors: Record<string, string>) => {
                console.error('Form submission errors:', errors);
            },
            preserveScroll: true,
        };

        if (product?.id) {
            router.post(route('seller.products.update', product.id), formData, options);
        } else {
            router.post(route('seller.products.store'), formData, options);
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) {
                    reset();
                    previewImages.forEach((image) => URL.revokeObjectURL(image.preview));
                    setPreviewImages([]);
                    setExistingImages([]);
                    setPrimaryImageIndex(null);
                }
                onOpenChange(isOpen);
            }}
        >
            <DialogContent className="top-1 left-1/8 min-w-[800px] -translate-x-1/2 -translate-y-1/2">
                <DialogHeader>
                    <DialogTitle>{isViewMode ? 'View Product' : product?.id ? 'Edit Product' : 'Create Product'}</DialogTitle>
                    <DialogDescription>
                        {isViewMode
                            ? 'View product details'
                            : product?.id
                              ? 'Edit existing product information'
                              : 'Add a new product to your inventory'}
                    </DialogDescription>
                </DialogHeader>

                {isViewMode ? (
                    <div className="flex gap-6">
                        {/* Left side - Product details */}
                        <div className="w-1/2 space-y-4">
                            <div>
                                <Label>Name</Label>
                                <div className="mt-1 rounded border bg-gray-50 p-2">{data.name}</div>
                            </div>
                            <div>
                                <Label>SKU</Label>
                                <div className="mt-1 rounded border bg-gray-50 p-2">{data.sku}</div>
                            </div>
                            <div>
                                <Label>Description</Label>
                                <div className="mt-1 min-h-[100px] rounded border bg-gray-50 p-2">
                                    {data.description || <span className="text-gray-400">No description</span>}
                                </div>
                            </div>
                            <div>
                                <Label>Price</Label>
                                <div className="mt-1 rounded border bg-gray-50 p-2">₱{Number(data.price).toFixed(2)}</div>
                            </div>
                            <div>
                                <Label>Stock Quantity</Label>
                                <div className="mt-1 rounded border bg-gray-50 p-2">{data.stock_quantity}</div>
                            </div>
                        </div>

                        {/* Right side - Product images */}
                        <div className="w-1/2 space-y-4">
                            <Label>Product Images</Label>
                            {existingImages.length > 0 ? (
                                <div className="grid grid-cols-2 gap-3">
                                    {existingImages.map((image, index) => (
                                        <div
                                            key={`existing-${image.id}`}
                                            className={`relative overflow-hidden rounded-md border-2 ${image.is_primary ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-200'}`}
                                        >
                                            <img
                                                src={`/storage/${image.image_path}`} // Changed from img_path to image_path
                                                alt={`Product Image ${index + 1}`}
                                                className="h-48 w-full ob   ject-cover"
                                                onError={(e) => {
                                                    e.currentTarget.src = '/placeholder-product.png'; // Fallback image
                                                }}
                                            />
                                            {image.is_primary == true && (
                                                <div className="absolute bottom-2 left-2 rounded bg-blue-500 px-2 py-1 text-xs text-white">
                                                    Primary
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="mt-1 rounded border bg-gray-50 p-4 text-center">
                                    <span className="text-gray-400">No images available</span>
                                    
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Name</Label>
                                    <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} className="mt-1" required />
                                    {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="sku">SKU</Label>
                                    <Input id="sku" value={data.sku} onChange={(e) => setData('sku', e.target.value)} className="mt-1" required />
                                    {errors.sku && <p className="mt-1 text-sm text-red-600">{errors.sku}</p>}
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
                                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="price">Price</Label>
                                        <Input
                                            id="price"
                                            type="number"
                                            value={data.price}
                                            onChange={(e) => setData('price', e.target.value)}
                                            className="mt-1"
                                            required
                                            min="0"
                                            step="0.01"
                                        />
                                        {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="stock_quantity">Stock Quantity</Label>
                                        <Input
                                            id="stock_quantity"
                                            type="number"
                                            value={data.stock_quantity}
                                            onChange={(e) => setData('stock_quantity', e.target.value)}
                                            className="mt-1"
                                            required
                                            min="0"
                                        />
                                        {errors.stock_quantity && <p className="mt-1 text-sm text-red-600">{errors.stock_quantity}</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="images">Product Images</Label>
                                    <div
                                        className={`mt-1 cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
                                            isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                                        }`}
                                        onClick={() => fileInputRef.current?.click()}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                    >
                                        <div className="flex flex-col items-center justify-center gap-3">
                                            <UploadIcon className="h-8 w-8 text-gray-400" />
                                            <div>
                                                <p className="text-sm font-medium text-gray-600">
                                                    <span className="text-blue-600">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500">PNG, JPG, GIF (max 5 images)</p>
                                            </div>
                                            {(previewImages.length > 0 || existingImages.length > 0) && (
                                                <p className="mt-2 text-xs text-green-600">
                                                    {previewImages.length + existingImages.length} image(s) selected
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <Input
                                        id="images"
                                        type="file"
                                        multiple
                                        onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                                        className="hidden"
                                        accept="image/*"
                                        ref={fileInputRef}
                                    />
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        {previewImages.length + existingImages.length}/5 images uploaded
                                    </p>
                                    {errors.images && <p className="mt-1 text-sm text-red-600">{errors.images}</p>}
                                </div>

                                {(previewImages.length > 0 || existingImages.length > 0) && (
                                    <div className="space-y-2">
                                        <Label>Image Previews</Label>
                                        <div className="grid grid-cols-3 gap-3">
                                            {existingImages.map((image, index) => (
                                                <div
                                                    key={`existing-${image.id}`}
                                                    className={`group relative overflow-hidden rounded-md border-2 ${
                                                        primaryImageIndex === index ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-200'
                                                    }`}
                                                >
                                                    <img
                                                        src={`/storage/${image.image_path}`}
                                                        alt={`Existing ${index}`}
                                                        className="h-32 w-full object-cover"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                                                        <div className="absolute top-2 left-2 flex items-center">
                                                            <Checkbox
                                                                id={`primary-existing-${image.id}`}
                                                                checked={primaryImageIndex === index}
                                                                onCheckedChange={() => setPrimaryImageIndex(index)}
                                                                className="h-4 w-4 bg-white"
                                                            />
                                                            <Label htmlFor={`primary-existing-${image.id}`} className="ml-2 text-xs text-white">
                                                                Primary
                                                            </Label>
                                                        </div>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            className="absolute top-2 right-2 text-white hover:bg-red-500 hover:text-white"
                                                            onClick={() => handleRemoveExistingImage(image.id)}
                                                        >
                                                            <XIcon className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                            {previewImages.map((image, index) => (
                                                <div
                                                    key={`new-${index}`}
                                                    className={`group relative overflow-hidden rounded-md border-2 ${
                                                        primaryImageIndex === existingImages.length + index
                                                            ? 'border-blue-500 ring-2 ring-blue-300'
                                                            : 'border-gray-200'
                                                    }`}
                                                >
                                                    <img src={image.preview} alt={`Preview ${index}`} className="h-32 w-full object-cover" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 transition-opacity group-hover:opacity-100">
                                                        <div className="absolute top-2 left-2 flex items-center">
                                                            <Checkbox
                                                                id={`primary-new-${index}`}
                                                                checked={primaryImageIndex === existingImages.length + index}
                                                                onCheckedChange={() => setPrimaryImageIndex(existingImages.length + index)}
                                                                className="h-4 w-4 bg-white"
                                                            />
                                                            <Label htmlFor={`primary-new-${index}`} className="ml-2 text-xs text-white">
                                                                Primary
                                                            </Label>
                                                        </div>
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            className="absolute top-2 right-2 text-white hover:bg-red-500 hover:text-white"
                                                            onClick={() => handleRemoveImage(index)}
                                                        >
                                                            <XIcon className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end space-x-2 pt-4">
                            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" disabled={processing}>
                                {product?.id ? 'Update' : 'Create'}
                            </Button>
                        </div>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    );
}
