<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RegisterSellerController;
use App\Http\Controllers\RegisterCustomerController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Products\ProductController;
use App\Http\Controllers\Seller\SellerDashboardController;
use App\Http\Controllers\Seller\SellerProductController;
use App\Http\Controllers\Customer\CustomerDashboardController;
use App\Http\Middleware\AdminMiddleware;
use App\Http\Middleware\SellerMiddleware;
use App\Http\Middleware\CustomerMiddleware;

Route::get('/', [ProductController::class, 'top'])->name('welcome');

Route::get('/UserAgreementPolicy', function () {
    return Inertia::render('auth/UserAgreementPolicy');
})->name('useragreementpolicy');
Route::get('/askusertype', function () {
    return Inertia::render('auth/askusertype');
})->name('askusertype');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::prefix('admin')->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index']);
});
});


// Public or common user dashboard
Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

// Admin-only dashboard
Route::prefix('admin')->controller(DashboardController::class)->middleware(AdminMiddleware::class)->group(function () {
    Route::get('/dashboard', 'index')->name('admin.dashboard');
    route::get('/User', [UserController::class, 'index'])->name('admin.users');
});

// Seller-only dashboard
Route::prefix('seller')->controller(SellerDashboardController::class)->middleware(SellerMiddleware::class)->group(function () {
    Route::get('/dashboard', 'index')->name('seller.dashboard');
    // Additional routes for seller can be added here
    Route::get('/Products', [SellerProductController::class, 'index'])->name('seller.products');
    Route::get('/Products/create', [SellerProductController::class, 'create'])->name('seller.products.create');
    Route::post('/Products', [SellerProductController::class, 'store'])->name('seller.products.store');
    Route::get('/Products/{product}/edit', [SellerProductController::class, 'edit'])->name('seller.products.edit');
    Route::put('/Products/{product}', [SellerProductController::class, 'update'])->name('seller.products.update');
    Route::delete('/Products/{product}', [SellerProductController::class, 'destroy'])->name('seller.products.destroy');
});

// Customer-only dashboard
Route::prefix('customer')->controller(CustomerDashboardController::class)->middleware(CustomerMiddleware::class)->group(function () {
    Route::get('/dashboard', 'index')->name('customer.dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
