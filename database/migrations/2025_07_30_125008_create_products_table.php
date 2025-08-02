<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('discount_price', 5, 2)->default(0);
            $table->unsignedInteger('stock_quantity')->default(0);
            $table->string('sku')->unique();
            $table->foreignId('category_id')->nullable()->constrained('categories')->onDelete('set null');
            $table->unsignedInteger('sales')->default(0);
            $table->foreignId('brand_id')->nullable()->constrained('brands')->nullOnDelete();
            $table->uuid('seller_id')->constrained('users')->onDelete('cascade'); // Assuming products are linked to sellers
            $table->enum('status', ['active', 'inactive', 'archived'])->default('active'); //
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
