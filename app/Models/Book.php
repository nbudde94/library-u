<?php

namespace App\Models;

use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Book extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'title',
        'author',
        'genre',
        'published_year',
        'stock_amount'
    ];

    protected $appends = [
        'isTaken'
    ];

    public function scopeFilterBy($query, $keyword, $type)
    {
        return $query
            ->when($type == 'title', function ($q1) use ($keyword) {
                return $q1->where('title', 'like', '%' . $keyword . '%');
            })
            ->when($type == 'author', function ($q2) use ($keyword) {
                return $q2->where('author', 'like', '%' . $keyword . '%');
            })
            ->when($type == 'genre', function ($q3) use ($keyword) {
                return $q3->where('genre', 'like', '%' . $keyword . '%');
            });
    }

    public function getStockAmountAttribute($value)
    {
        return $value;
    }

    public function getIsTakenAttribute()
    {
        $checkouts = CheckoutBook::where('user_id', Auth::user()->id)
            ->where('book_id', $this->attributes['id'])->first();
        return is_null($checkouts) ? false : true;
    }
}
