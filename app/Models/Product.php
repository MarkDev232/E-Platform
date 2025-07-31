<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
class Product extends Model
{
    use HasUuids; // Use HasUuids trait for UUID support
    use HasFactory;

     public $incrementing = false;
     public $primaryKey = 'product_id';
    protected $keyType = 'string';
    protected $fillable = [
        'name',
        'description',
        'price',
        'image_url',
        'stock',
        'sales',
        'category_id',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
