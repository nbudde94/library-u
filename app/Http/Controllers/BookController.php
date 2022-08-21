<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    public function listAllBooks()
    {
        return Book::all();
    }

    public function filter(Request $request)
    {
        return Book::filterBy($request->keyword, $request->type)->get();
    }

    public function store(Request $request)
    {
        Book::create([
            'title' => $request->title,
            'author' => $request->author,
            'genre' => $request->genre,
            'published_year' => $request->published_year,
            'stock_amount' => $request->stock_amount
        ]);
        return response()->json(['message' => 'Book saved successfully.'], 200);
    }

    public function edit($id)
    {
        $book = Book::find($id);
        return response()->json($book);
    }

    public function update(Request $request, $id)
    {
        Book::where('id', $id)->update([
            'title' => $request->title,
            'author' => $request->author,
            'genre' => $request->genre,
            'published_year' => $request->published_year,
            'stock_amount' => $request->stock_amount
        ]);
        return response()->json(['message' => 'Book updated successfully.'], 200);
    }

    public function delete($id)
    {
        $book = Book::findOrFail($id);
        $book->delete();
        return response()->json(['message' => 'Book deleted successfully.'], 200);
    }
}
