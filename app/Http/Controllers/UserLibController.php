<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserLibController extends Controller
{
    public function listAllUsers()
    {
        return User::all();
    }

    public function store(Request $request)
    {
        User::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->pass),
            'role' => $request->role
        ]);
        return response()->json(['message' => 'User created successfully.'], 200);
    }

    public function update(Request $request, $id)
    {
        User::where('id', $id)->update([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'email' => $request->email,
            'password' => Hash::make($request->pass),
            'role' => $request->role
        ]);
        return response()->json(['message' => 'User updated successfully.'], 200);
    }

    public function delete($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(['message' => 'User deleted successfully.'], 200);
    }
}
