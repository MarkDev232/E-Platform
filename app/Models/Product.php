<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Str;

class Product extends Model
{
    use HasFactory;

    public $incrementing = false;
    protected $keyType = 'string';
    protected $primaryKey = 'product_id';

    protected $fillable = [
        'product_id',
        'name',
        'description',
        'price',
        'discount_price',
        'stock_quantity',
        'sku',
        'category_id',
        'sales',
        'brand_id',
        'seller_id',
        'status'
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->product_id = $model->product_id ?? Str::uuid();
        });
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function images()
    {
        return $this->hasMany(ProductImages::class, 'product_id', 'product_id');
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
