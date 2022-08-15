<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use App\Http\Controllers\UserLibController;
use App\Http\Controllers\CheckoutBookController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::prefix('users')
        ->controller(UserLibController::class)
        ->group(function () {
            Route::get('/list', 'listAllUsers');
            Route::post('/store', 'store');
            Route::put('/edit/{id}', 'update');
            Route::delete('/delete/{id}', 'delete');
        });

    Route::prefix('books')
        ->controller(BookController::class)
        ->group(function () {
            Route::get('/list', 'listAllBooks');
            Route::get('/filter', 'filter');
            Route::post('/store', 'store');
            Route::put('/edit/{id}', 'update');
            Route::delete('/delete/{id}', 'delete');
        });

    Route::controller(CheckoutBookController::class)
        ->group(function () {
            Route::prefix('students')->group(function () {
                Route::get('/checkouts', 'listStudentCheckouts');
                Route::post('/take-book/{id}', 'markAsTaken');
            });

            Route::prefix('librarian')->group(function () {
                Route::get('/checkouts', 'listAllCheckout');
                Route::post('/return-book/{id}', 'markAsReturned');
            });
        });

    Route::post('/logout', [AuthController::class, 'logout']);
});
