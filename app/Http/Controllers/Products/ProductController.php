<?php

namespace App\Http\Controllers\Products;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\Category;
use App\Models\ProductImages;

class ProductController extends Controller
{
    public function Top_Products()
    {
        $products = Product::orderBy('sales', 'desc')->take(6)->get()->map(function ($product) {
            $product->image = ProductImages::where('product_id', $product->id)
                ->where('is_primary', true)
                ->first();

            return [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'price' => (float) $product->price,
                'image_path' => $product->image?->url, // ✅ Using accessor
                'sales' => $product->sales,
            ];
        });

        return inertia('welcome', [
            'topProducts' => $products,
        ]);
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();
        return inertia('Seller/Products', [
            'products' => $products,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
