<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;
use App\Models\ProductImages;
use App\Services\Products\ProductService;

class SellerProductController extends Controller
{
    protected $productService;

    public function __construct(ProductService $productService)
    {
        $this->productService = $productService;
    }

    public function index(Request $request)
    {
        $products = $this->productService->getAllProducts($request);

        return Inertia::render('Seller/Products', [
            'products' => $products,
            'filters' => $request->only('search')
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'sku' => 'required|string|max:255|unique:products',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'images' => 'required|array|min:1',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'primary_image' => 'required|integer|min:0'
        ]);

        try {
            $product = $this->productService->createProduct(
                $request->only(['name', 'description', 'sku', 'price', 'stock_quantity']),
                $request->file('images'),
                $request->primary_image
            );

            return redirect()->route('seller.products.index')
                ->with('success', 'Product created successfully!');
        } catch (\Exception $e) {
            return back()->withErrors([
                'message' => 'Failed to upload images. ' . $e->getMessage()
            ]);
        }
    }

    public function show($id)
    {
        $product = Product::with('images')->findOrFail($id);
        return Inertia::render('Seller/Products', compact('product'));
    }

    public function edit($id)
    {
        $product = Product::with('images')->findOrFail($id);
        return Inertia::render('Seller/Products', compact('product'));
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'stock_quantity' => 'required|integer|min:0',
            'sku' => 'required|string|max:255|unique:products,sku,' . $id, // Added sku validation
            'images' => 'sometimes|array',
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048',
            'primary_image' => 'required|integer|min:0',
            'deleted_images' => 'nullable|array'
        ]);

        try {
            $product = $this->productService->updateProduct(
                $id,
                $request->only(['name', 'description', 'sku', 'price', 'stock_quantity']), // Added sku here
                $request->file('images') ?? [],
                $request->primary_image,
                $request->deleted_images ?? []
            );

            return redirect()->route('seller.products.index')
                ->with('success', 'Product updated successfully!');
        } catch (\Exception $e) {
            return back()->withErrors([
                'message' => 'Failed to update product. ' . $e->getMessage()
            ]);
        }
    }

    public function destroy($id)
    {
        $this->productService->deleteProduct($id);
        return redirect()->route('seller.products.index')
            ->with('success', 'Product deleted successfully!');
    }

    public function destroyMultiple(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'exists:products,id'
        ]);

        try {
            $this->productService->deleteMultipleProducts($request->ids);
            return redirect()->back()->with('success', 'Selected products deleted successfully!');
        } catch (\Exception $e) {
            return redirect()->back()->withErrors([
                'message' => 'Failed to delete products: ' . $e->getMessage()
            ]);
        }
    }

    protected function processUploadedImages(Request $request)
    {
        $images = [];

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $index => $image) {
                $images[] = [
                    'file' => $image,
                    'is_primary' => $index == $request->primary_image
                ];
            }
        }

        return $images;
    }
    public function getImages($productId)
{
    $product = Product::with('images')->findOrFail($productId);
    return response()->json($product->images);
}
}
