<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Product;

class SellerProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
{
    $search = $request->input('search');

    $products = Product::query()
        ->when($search, fn ($query) =>
            $query->where('name', 'like', '%' . $search . '%')
        )
        ->latest()
        ->paginate(10)
        ->withQueryString(); // Keep the "search" query in pagination links

    return Inertia::render('Seller/Products', [
        'products' => $products,
        'filters' => [
            'search' => $search,
        ],
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
        $product = Product::findOrFail($id);

    return Inertia::render('Seller/EditProduct', [
        'product' => $product,
    ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
{
    $product = Product::findOrFail($id);

    $product->update($request->validate([
        'name' => 'required|string|max:255',
        'price' => 'required|numeric',
        'stock' => 'required|integer',
        'description' => 'nullable|string',
        'image_url' => 'nullable|url',
    ]));

    return redirect()->route('seller.products')->with('success', 'Product updated!');
}


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
