<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\User;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImages;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create sample users
        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
            'user_type' => 'customer',
        ]);

        User::factory()->create([
            'name' => 'Test Seller',
            'email' => 'seller@example.com',
            'password' => Hash::make('password'),
            'user_type' => 'seller',
        ]);

        User::factory()->create([
            'name' => 'Test Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'user_type' => 'admin',
        ]);

        // Seed brands
        Brand::insert([
            ['name' => 'IronCore', 'description' => 'Premium strength training equipment'],
            ['name' => 'FitFuel', 'description' => 'Clean and effective workout supplements'],
            ['name' => 'PulseWear', 'description' => 'High-performance gym apparel'],
            ['name' => 'Athletica', 'description' => 'Stylish activewear for every body'],
            ['name' => 'CoreFlex', 'description' => 'Yoga and recovery essentials'],
            ['name' => 'TitanTech', 'description' => 'Smart gym machines and tech gear'],
            ['name' => 'BeastMode Nutrition', 'description' => 'Powerful muscle-building supplements'],
            ['name' => 'ZenFit', 'description' => 'Wellness and plant-based products'],
            ['name' => 'LiftLab', 'description' => 'Engineered resistance tools and accessories'],
            ['name' => 'HydroBlast', 'description' => 'Hydration and electrolyte products'],
        ]);

        // Seed categories
        // Seed categories with UUIDs
        Category::insert([
            [
                'id' => Str::uuid(),
                'name' => 'Fitness Equipment',
                'description' => 'Machines and gear for home or gym'
            ],
            [
                'id' => Str::uuid(),
                'name' => 'Workout Apparel',
                'description' => 'Comfortable, sweat-wicking clothing'
            ],
            [
                'id' => Str::uuid(),
                'name' => 'Supplements & Nutrition',
                'description' => 'Fuel your performance'
            ],
            [
                'id' => Str::uuid(),
                'name' => 'Gym Accessories',
                'description' => 'Gloves, belts, bottles, and more'
            ],
            [
                'id' => Str::uuid(),
                'name' => 'Yoga & Recovery',
                'description' => 'Mats, rollers, recovery gear'
            ],
        ]);

        Product::factory()
            ->count(10)
            ->has(
                ProductImages::factory()->count(2),
                'images' // Explicitly specify the relationship name
            )
            ->create();
    }
}
