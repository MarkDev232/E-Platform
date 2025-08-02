<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Product;
use App\Models\ProductImages;

class ProductImagesFactory extends Factory
{
    public function definition(): array
    {
        return [
            'product_id' => Product::factory(), // or provide existing ID
            'image_path' => $this->faker->imageUrl(640, 480, 'products'),
            'is_primary' => $this->faker->boolean(20), // 20% chance true
        ];
    }
}
