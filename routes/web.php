<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RegisterSellerController;
use App\Http\Controllers\RegisterCustomerController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\Products\ProductController;
use App\Http\Controllers\Seller\SellerDashboardController;
use App\Http\Controllers\Seller\SellerProductController;
use App\Http\Controllers\Customer\CustomerDashboardController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\SellerMiddleware;
use App\Http\Middleware\CustomerMiddleware;
use App\Http\Controllers\Seller\OrderController;
use App\Http\Controllers\Seller\BrandController as SellerBrandController;
use App\Http\Controllers\Seller\CategoryController;

Route::get('/', [ProductController::class, 'Top_Products'])->name('welcome');

Route::get('/UserAgreementPolicy', function () {
    return Inertia::render('auth/UserAgreementPolicy');
})->name('useragreementpolicy');
Route::get('/askusertype', function () {
    return Inertia::render('auth/askusertype');
})->name('askusertype');



// Admin-Only
Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('admin')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index'])->name('admin.dashboard');
        route::get('/User', [UserController::class, 'index'])->name('admin.users');
    });
});


// Public or common user dashboard
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// Seller-only dashboard routes
Route::prefix('seller')->middleware(SellerMiddleware::class)->group(function () {
    // Dashboard
    Route::get('/dashboard', [SellerDashboardController::class, 'index'])->name('seller.dashboard');

    // Products
    Route::resource('Products', SellerProductController::class)
        ->names([
            'index' => 'seller.products.index',
            'create' => 'seller.products.create',
            'store' => 'seller.products.store',
            'show' => 'seller.products.show',
            'edit' => 'seller.products.edit',
            'update' => 'seller.products.update',
            'destroy' => 'seller.products.destroy'
        ]);

    // Product Images (additional routes)
    Route::post('/Products/{product}/images', [SellerProductController::class, 'uploadImage'])
        ->name('seller.products.uploadImage');
    Route::get('/seller/Products/{product}/images', [SellerProductController::class, 'getImages'])
        ->name('seller.products.images');
    Route::delete('/Products/images/{image}', [SellerProductController::class, 'deleteImage'])
        ->name('seller.products.deleteImage');
    Route::delete('/seller/products/delete-multiple', [SellerProductController::class, 'destroyMultiple'])
        ->name('seller.products.destroy-multiple');
    // Orders
    Route::get('/Orders', [OrderController::class, 'index'])->name('seller.orders.index');

    // Brands
    Route::resource('Brand', SellerBrandController::class)
        ->names([
            'index' => 'seller.brand.index',
            'create' => 'seller.brand.create',
            'store' => 'seller.brand.store',
            'edit' => 'seller.brand.edit',
            'update' => 'seller.brand.update',
            'destroy' => 'seller.brand.destroy'
        ]);

    Route::delete('brands/delete-multiple', [SellerBrandController::class, 'destroyMultiple'])
        ->name('seller.brand.destroy.multiple');


    // Categories
    Route::resource('Category', CategoryController::class)
        ->names([
            'index' => 'seller.category.index',
            'create' => 'seller.category.create',
            'store' => 'seller.category.store',
            'edit' => 'seller.category.edit',
            'update' => 'seller.category.update',
            'destroy' => 'seller.category.destroy'
        ]);

    Route::delete('/seller/Category/delete-all', [CategoryController::class, 'destroyAll'])
        ->name('seller.category.destroy.all');
});

// Customer-only dashboard
Route::prefix('customer')->controller(CustomerDashboardController::class)->middleware(CustomerMiddleware::class)->group(function () {
    Route::get('/dashboard', 'index')->name('customer.dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
