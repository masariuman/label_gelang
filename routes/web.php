<?php


Route::post('/', 'DataController@cari');
Route::get('/{id}/label', 'DataController@label');

Route::get('/tracer/data', 'DataController@tracerData');
Route::post('/tracer/data', 'DataController@cariTracerData');

route::get('/templatelabel','DataController@templateLabel');
route::get('/templategelangdewasa','DataController@templateGelangDewasa');
route::get('/templategelanganak','DataController@templateGelangAnak');
route::get('/templatetracer','DataController@templateTracer');


Route::any('{all}', function () {
    return view('hiyaa');
})
->where(['all' => '.*']);


