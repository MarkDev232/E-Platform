<?php

namespace App\Services\Products;

use App\Models\Product;
use App\Models\ProductImages;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class ProductService
{



    public function getTopSellingProducts($limit = 6)
{
    return Product::with(['primaryImage'])
        ->where('status', 'active')
        ->orderByDesc('sales')
        ->take($limit)
        ->get()
        ->map(function ($product) {
            $imagePath = $product->primaryImage?->image_path;
            return [
                // ... other fields ...
                'image_url' => $imagePath ? asset('storage/product_images/'.basename($imagePath)) : null,
            ];
        });
}
    public function getAllProducts($request)
    {
        return Product::query()
            ->with('images')
            ->when(
                $request->search,
                fn($query, $search) =>
                $query->where('name', 'like', "%{$search}%")
            )
            ->paginate(10);
    }

    public function createProduct(array $data, array $images, int $primaryImageIndex)
    {
        return DB::transaction(function () use ($data, $images, $primaryImageIndex) {
            $user = Auth::user();

            if (!$user) {
                throw new \RuntimeException('No authenticated user found');
            }

            $data['seller_id'] = $user->id;
            $product = Product::create($data);

            foreach ($images as $index => $image) {
                $path = $image->store('product_images', 'public');

                // Make sure to use the correct column name ( image_path instead of img_path)
                $product->images()->create([
                    'image_path' => $path,  // This should match what your frontend expects
                    'is_primary' => $index === $primaryImageIndex
                ]);
            }

            return $product;
        });
    }
    public function updateProduct(
        $id,
        array $data,
        array $newImages,
        int $primaryImageIndex,
        array $deletedImageIds = []
    ) {
        return DB::transaction(function () use ($id, $data, $newImages, $primaryImageIndex, $deletedImageIds) {
            $product = Product::findOrFail($id);
            $product->update($data);

            // Handle deleted images
            if (!empty($deletedImageIds)) {
                $imagesToDelete = $product->images()->whereIn('id', $deletedImageIds)->get();
                foreach ($imagesToDelete as $image) {
                    if ($image->image_path) {
                        Storage::disk('public')->delete($image->image_path);
                    }
                    $image->delete();
                }
            }

            // Add new images
            foreach ($newImages as $index => $image) {
                $path = $image->store('product_images', 'public');

                $product->images()->create([
                    'image_path' => $path,  // Changed from image_path to img_path
                    'is_primary' => ($index === $primaryImageIndex)
                ]);
            }

            // Update primary image if needed
            if ($product->images()->exists()) {
                $product->images()->update(['is_primary' => false]);
                $allImages = $product->images()->orderBy('id')->get();
                if (isset($allImages[$primaryImageIndex])) {
                    $allImages[$primaryImageIndex]->update(['is_primary' => true]);
                }
            }

            return $product;
        });
    }

    public function deleteProduct($id)
    {
        return DB::transaction(function () use ($id) {
            $product = Product::findOrFail($id);

            // Delete associated images
            foreach ($product->images as $image) {
                // Use image_path instead of img_path
                if ($image->image_path) {
                    Storage::disk('public')->delete($image->image_path);
                }
                $image->delete();
            }

            $product->delete();
        });
    }
    public function deleteMultipleProducts(array $ids)
    {
        return DB::transaction(function () use ($ids) {
            $products = Product::with('images')->whereIn('id', $ids)->get();

            foreach ($products as $product) {
                // Delete associated images
                foreach ($product->images as $image) {
                    Storage::disk('public')->delete($image->image_path);
                    $image->delete();
                }

                // Delete product
                $product->delete();
            }
        });
    }

    protected function processImages(Product $product, array $images)
    {
        foreach ($images as $uploadedImage) {
            $path = $uploadedImage->store('public/product_images');
            $filename = basename($path);

            $product->images()->create([
                'image_path' => $filename,
                'is_primary' => $uploadedImage->getClientOriginalName() === ($images['primary'] ?? '')
            ]);
        }
    }
}
