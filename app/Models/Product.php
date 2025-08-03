<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

use App\Models\ProductImages;

class Product extends Model
{
    
    use HasFactory;
    public ?ProductImages $image = null;
    protected $fillable = [
        'name',
        'description',
        'price',
        'discount_price',
        'stock_quantity',
        'sku',
        'category_id',
        'sales',
        'seller_id'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImages::class);
    }
    public function image()
    {
        return $this->hasOne(ProductImages::class)->orderBy('id');
    }
    public function primaryImage()
    {
        return $this->hasOne(ProductImages::class)->where('is_primary', true);
    }
    public function seller()
    {
        return $this->belongsTo(User::class, 'seller_id');
    }
    public function getImages(Product $product)
    {
        return response()->json($product->images);
    }
}
