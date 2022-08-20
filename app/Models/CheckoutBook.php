<?php

namespace App\Models;

use App\Models\Book;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class CheckoutBook extends Model
{
    use HasFactory;

    protected $fillable = [
        'start_date',
        'end_date',
        'status',
        'user_id',
        'book_id'
    ];

    protected $appends = [
        'book_title'
    ];

    protected $casts = [
        'start_date' => 'date:d/m/Y',
        'end_date' => 'date:d/m/Y'
    ];

    public function getBookTitleAttribute()
    {
        $book = Book::where('id', $this->attributes['book_id'])->first();
        return $book->title;
    }
}
