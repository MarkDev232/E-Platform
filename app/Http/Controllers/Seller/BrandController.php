<?php

namespace App\Http\Controllers\Seller;

use App\Services\Brands\BrandService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;
use App\Models\Brand;

class BrandController extends Controller
{
    public function __construct(
        protected BrandService $brandService
    ) {}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
{
    $brands = $this->brandService->getAllBrands(
        $request->search,
        5 // Show only 5 brands per page
    );

    return Inertia::render('Seller/Brand', [
        'brands' => $brands,
        'filters' => $request->only(['search']),
        'flash' => [
            'success' => session('success'),
            'error' => session('error'),
        ],
    ]);
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Seller/Brand');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:brands,name',
            'description' => 'nullable|string',

        ]);

        $this->brandService->createBrand($validated);

        return redirect()->route('seller.brand.index')
            ->with('success', 'Brand created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        $brand = $this->brandService->getBrandById($brand->id);

        return Inertia::render('Seller/Brand', [
            'brand' => $brand
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand)
    {
        $brand = $this->brandService->getBrandById($brand->id);

        return Inertia::render('Seller/Brand', [
            'brand' => $brand
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Brand $brand)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:brands,name,' . $brand->id,
            'description' => 'nullable|string',
            // Add other validation rules as needed
        ]);

        $this->brandService->updateBrand($brand->id, $validated);

        return redirect()->route('seller.brand.index')
            ->with('success', 'Brand updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        // Ensure the brand exists and has an ID
        if (!$brand || !$brand->id) {
            return redirect()->back()->with('error', 'Brand not found');
        }

        $this->brandService->deleteBrand($brand->id);

        return redirect()->route('seller.brand.index')
            ->with('success', 'Brand deleted successfully');
    }

    public function destroyMultiple(Request $request)
    {
        $validated = $request->validate([
            'ids' => 'required|array|min:1',
            'ids.*' => 'required|integer|exists:brands,id'
        ]);

        try {
            $this->brandService->deleteMultipleBrands($validated['ids']);

            return redirect()->route('seller.brand.index')
                ->with('success', count($validated['ids']) . ' brands deleted successfully.');
        } catch (\Exception $e) {
            return redirect()->back()
                ->with('error', 'Error deleting brands: ' . $e->getMessage());
        }
    }
}
