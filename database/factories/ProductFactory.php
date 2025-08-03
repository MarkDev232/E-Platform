<?php
namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Category;
use App\Models\User;
use App\Models\Brand;
use Illuminate\Support\Str;

class ProductFactory extends Factory
{
    public function definition(): array
    {
        return [
            'product_id' => Str::uuid(), // Add this line
            'name' => $this->faker->words(2, true),
            'description' => $this->faker->sentence(),
            'price' => $this->faker->randomFloat(2, 10, 1000),
            'discount_price' => $this->faker->randomFloat(2, 0, 500),
            'stock_quantity' => $this->faker->numberBetween(10, 100),
            'sales' => $this->faker->numberBetween(0, 50),
            'sku' => $this->faker->unique()->bothify('SKU-####'),
            'category_id' => Category::inRandomOrder()->value('id') ?? Category::factory()->create()->id,
            'brand_id' => Brand::inRandomOrder()->value('id') ?? Brand::factory()->create()->id,
            'seller_id' => User::where('user_type', 'seller')->inRandomOrder()->value('id') ?? User::factory()->create(['user_type' => 'seller'])->id,
            'status' => 'active',
        ];
    }
}