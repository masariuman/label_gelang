<?php

Route::get('/', function () {
    return view('hiyaa');
});

Route::post('/', 'DataController@cari');
Route::get('/{id}/label', 'DataController@label');

route::get('/templatelabel','DataController@templateLabel');
route::get('/templategelangdewasa','DataController@templateGelangDewasa');
route::get('/templategelanganak','DataController@templateGelangAnak');
route::get('/templatetracer','DataController@templateTracer');


