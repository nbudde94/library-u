<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Book;
use App\Models\CheckoutBook;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CheckoutBookController extends Controller
{
    public function listStudentCheckouts()
    {
        return CheckoutBook::where('user_id', Auth::user()->id)->get();
    }

    public function listAllCheckout()
    {
        return CheckoutBook::orderBy('created_at', 'DESC')->get();
    }

    public function markAsTaken($id)
    {
        $book = Book::find($id);
        $isAlreadyTaken = CheckoutBook::where('user_id', Auth::user()->id)
            ->where('book_id', $id)->first();
        if (is_null($isAlreadyTaken)) {
            CheckoutBook::create([
                'start_date' => Carbon::now(),
                'status' => 'taken',
                'book_id' => $id,
                'user_id' => Auth::user()->id
            ]);
            if ($book->stock_amount > 0) {
                Book::where('id', $id)->update([
                    'stock_amount' => $book->stock_amount - 1
                ]);
            }
            return response()->json(['message' => 'Book taken successfully.'], 200);
        } else {
            return response()->json(['message' => 'You took this book already.'], 401);
        }
    }

    public function markAsReturned($id)
    {
        $checkout = CheckoutBook::find($id)->first();
        CheckoutBook::where('id', $id)
            ->update([
                'end_date' => Carbon::now(),
                'status' => 'returned'
            ]);
        $book = Book::find($checkout->book_id)->first();
        Book::where('id', $book->book_id)->update([
            'stock_amount' => $book->stock_amount + 1
        ]);
        return response()->json(['message' => 'Book returned successfully.'], 200);
    }
}
