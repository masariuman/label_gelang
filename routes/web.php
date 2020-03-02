<?php

Route::get('/', function () {
    return view('hiyaa');
});

Route::post('/', 'DataController@cari');


