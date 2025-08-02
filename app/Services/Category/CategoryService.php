<?php

namespace App\Services\Category;

use App\Models\Category;
use Illuminate\Pagination\LengthAwarePaginator;

class CategoryService
{
    /**
     * Get all categories with optional search
     */
    public function getAllCategories(?string $search = null, int $perPage = 10): LengthAwarePaginator
    {
        return Category::query()
            ->when(
                $search,
                fn($query) =>
                $query->where('name', 'like', "%{$search}%")
            )
            ->paginate($perPage);
    }

    /**
     * Create a new category
     */
    public function createCategory(array $data): Category
    {
        return Category::create($data);
    }

    /**
     * Get category by ID
     */
    public function getCategoryById(int $id): Category
    {
        return Category::findOrFail($id);
    }

    /**
     * Update category
     */
    public function updateCategory(int $id, array $data): Category
    {
        $category = $this->getCategoryById($id);
        $category->update($data);
        return $category;
    }

    /**
     * Delete category
     */
    public function deleteCategory(int $id): bool
    {
        $category = $this->getCategoryById($id);
        return $category->delete();
    }

    /**
     * Get distinct categories for dropdowns
     */
    public function getDistinctCategories(): array
    {
        return Category::select('id', 'name')
            ->distinct()
            ->get()
            ->toArray();
    }

    // Add this method to your CategoryService class
    public function deleteAllCategories(): bool
    {
        return Category::query()->delete() > 0;
    }
}
