<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
         return [
            'name' => fake()->words(2, true),
            'description' => fake()->sentence(),
            'price' => fake()->randomFloat(2, 10, 1000),
            'stock' => fake()->numberBetween(10, 100),
            'sales' => fake()->numberBetween(0, 50),
            'image_url' => fake()->imageUrl(),
            'category_id' => Category::inRandomOrder()->first()->id ?? Category::factory(),
        ];
    }
}
