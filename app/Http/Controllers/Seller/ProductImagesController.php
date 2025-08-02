<?php

namespace App\Http\Controllers;

use App\Models\ProductImages;
use Illuminate\Http\Request;

class ProductImagesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(Request $request, $productId)
{
    if ($request->hasFile('image')) {
        $file = $request->file('image');

        // Optional: validate file
        $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);

        

        // Rename file
        $fileName = $file->getClientOriginalName(); // you could use unique ID here too
        $path = $file->storeAs('images/products', $fileName, 'public'); // stores in public/images/products

        // Save record in database
        ProductImages::create([
            'product_id' => $productId,
            'image_url' => "/storage/$path", // Accessible via public/storage symlink
        ]);

        return response()->json(['message' => 'Image uploaded successfully']);
    }

    return response()->json(['error' => 'No image uploaded'], 400);
}

    /**
     * Display the specified resource.
     */
    public function show(ProductImages $productImages)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductImages $productImages)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, ProductImages $productImages)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductImages $productImages)
    {
        //
    }
}
