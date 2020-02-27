<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Auth::routes();

// Route::get('/masariuman_tag', 'TagController@index');
// Route::post('/masariuman_tag', 'TagController@store');

// Route::get('/masariuman_tag','TagController@index');
// Route::post('/masariuman_tag/store','TagController@store');
// Route::get('/masariuman_tag/{id}/edit', 'TagController@edit');
// Route::put('/masariuman_tag/{id}', 'TagController@update');

Route::resource('masariuman_tag', 'TagController');

Route::get('/masariuman_genre', 'GenreController@index');
Route::post('/masariuman_genre/store', 'GenreController@store');

Route::group(['middleware'=> 'auth'], function () {
    Route::any('{all}', function () {
        return view('hiyaa');
    })
    ->where(['all' => '.*']);
});



// Route::get('/home', 'HomeController@index')->name('home');

// Route::get('/nanael_masariuman_hachiel', 'NanaelMasariumanHachielController@dashboard');


