<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProductImagesFactory extends Factory
{
    public function definition(): array
    {
        return [
            'image_path' => $this->faker->imageUrl(640, 480, 'products'),
            'is_primary' => $this->faker->boolean(20),
        ];
    }

    // Add this new method
    public function forProduct(Product $product)
    {
        return $this->state([
            'product_id' => $product->product_id
        ]);
    }
}
