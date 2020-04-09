<?php


Route::post('/', 'DataController@cari');
// Route::get('/{id}/label', 'DataController@label');
Route::get('/{id}/{awalan}/{tgl_masuk}/label', 'PrintController@templateLabel');
Route::get('/{id}/{awalan}/{tgl_masuk}/gelang_dewasa', 'PrintController@templateGelangDewasa');
Route::get('/{id}/{awalan}/{tgl_masuk}/gelang_anak', 'PrintController@templateGelangAnak');
Route::get('/{id}/{awalan}/{tgl_masuk}/{peminjam}/tracer', 'PrintController@templateTracer');




Route::get('/tracer/data', 'DataController@tracerData');
Route::post('/tracer/data', 'DataController@cariTracerData');

Route::get('/test', 'DataController@test');

// route::get('/templatelabel','PrintController@templateLabel');
route::get('/templategelangdewasa','PrintController@templateGelangDewasa');
route::get('/templategelanganak','PrintController@templateGelangAnak');
route::get('/templatetracer','PrintController@templateTracer');


Route::any('{all}', function () {
    return view('hiyaa');
})
->where(['all' => '.*']);


