<?php

namespace App\Services\Brands;

use App\Models\Brand;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Storage;

class BrandService
{
    public function getAllBrands(?string $search = null, int $perPage = 10): LengthAwarePaginator
    {
        return Brand::query()
            ->when(
            $search,
             fn($query) => 
             $query->where('name', 'like', "%{$search}%"))
            ->paginate($perPage);
    }

    public function createBrand(array $data): Brand
    {
        if (isset($data['logo'])) {
            $data['logo'] = $this->storeLogo($data['logo']);
        }
        return Brand::create($data);
    }

    public function getBrandById(int $id): Brand
    {
        return Brand::findOrFail($id);
    }

    public function updateBrand(int $id, array $data): Brand
    {
        $brand = $this->getBrandById($id);

        if (isset($data['logo'])) {
            $this->deleteLogo($brand->logo);
            $data['logo'] = $this->storeLogo($data['logo']);
        }

        $brand->update($data);
        return $brand;
    }

    public function deleteBrand(int $id): bool
    {
        $brand = $this->getBrandById($id);
        $this->deleteLogo($brand->logo);
        return $brand->delete();
    }

    public function deleteMultipleBrands(array $ids): bool
    {
        // Validate all IDs exist first
        $existingCount = Brand::whereIn('id', $ids)->count();
        if ($existingCount !== count($ids)) {
            throw new \Exception("Some brands not found");
        }

        // Get all brands with their logos
        $brands = Brand::whereIn('id', $ids)->get();

        // Delete all logos first
        foreach ($brands as $brand) {
            $this->deleteLogo($brand->logo);
        }

        // Delete all brands
        return Brand::whereIn('id', $ids)->delete() > 0;
    }

    protected function storeLogo($logo): string
    {
        return $logo->store('brands/logos', 'public');
    }

    protected function deleteLogo(?string $path): void
    {
        if ($path) {
            Storage::disk('public')->delete($path);
        }
    }
}
