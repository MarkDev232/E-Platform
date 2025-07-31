<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('password'), // Password is 'password'
            'user_type' => 'customer', // Default user type
        ]);

        User::factory()->create([
            'name' => 'Test Seller',
            'email' => 'seller@example.com',
            'password' => bcrypt('password'), // Password is 'password'
            'user_type' => 'seller', // Default user type
        ]);

        User::factory()->create([
            'name' => 'Test Admin',
            'email' => 'admin@example.com',
            'password' => bcrypt('password'), // Password is 'password'
            'user_type' => 'admin', // Default user type
        ]);


       $categories = Category::factory()->count(5)->create();

foreach ($categories as $category) {
    Product::factory()->count(10)->create([
        'category_id' => $category->id,
    ]);
}


    }
}
