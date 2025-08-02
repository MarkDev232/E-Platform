<?php

namespace App\Http\Controllers\Seller;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Services\Category\CategoryService;
use App\Models\Category;

class CategoryController extends Controller
{
    public function __construct(
        protected CategoryService $categoryService
    ) {}

    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {
        $categories = Category::query()
            ->when(
                $request->search,
                fn($query, $search) =>
                $query->where('name', 'like', "%{$search}%")
            )
            ->paginate(5); // Make sure to use paginate()

        return Inertia::render('Seller/Category', [
            'categories' => $categories,
            'filters' => $request->only('search'),
            'flash' => [
            'success' => session('success'),
            'error' => session('error'),
        ],
        ]);
    }

    public function distinct_category()
    {
        $categories = $this->categoryService->getDistinctCategories();

        return Inertia::render('Seller/Products', [
            'categories' => $categories
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Seller/Category');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
            'description' => 'nullable|string',
        ]);

        $this->categoryService->createCategory($validated);

        return redirect()
            ->route('seller.category.index')
            ->with('success', 'Category created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = $this->categoryService->getCategoryById($id);

        return Inertia::render('Seller/Category', [
            'category' => $category
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $category = $this->categoryService->getCategoryById($id);

        return Inertia::render('Seller/Category', [
            'category' => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,' . $id,
            'description' => 'nullable|string',
        ]);

        $this->categoryService->updateCategory($id, $validated);

        return redirect()
            ->route('seller.category.index')
            ->with('success', 'Category updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->categoryService->deleteCategory($id);

        return redirect()
            ->route('seller.category.index')
            ->with('success', 'Category deleted successfully.');
    }

    // Add this method to your CategoryController
    public function destroyAll(Request $request)
    {
        try {
            $count = Category::count();

            if ($count === 0) {
                return redirect()
                    ->route('seller.category.index')
                    ->with('info', 'No categories to delete.');
            }

            $this->categoryService->deleteAllCategories();

            return redirect()
                ->route('seller.category.index')
                ->with('success', "All {$count} categories deleted successfully.");
        } catch (\Exception $e) {
            return redirect()
                ->route('seller.category.index')
                ->with('error', 'Failed to delete all categories: ' . $e->getMessage());
        }
    }
}
