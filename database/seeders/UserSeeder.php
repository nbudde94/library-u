<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'first_name' => 'Nelquin',
            'last_name' => 'Budde',
            'email' => 'budde936@gmail.com',
            'role' => 'student',
            'password' => Hash::make('123456'),
        ]);

        DB::table('users')->insert([
            'first_name' => 'John',
            'last_name' => 'Doe',
            'email' => 'librarian@gmail.com',
            'role' => 'librarian',
            'password' => Hash::make('123456'),
        ]);
    }
}
