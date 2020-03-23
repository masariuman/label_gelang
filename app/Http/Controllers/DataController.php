<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Data;
use App\regPeriksa;
use App\Pasien;
use PDF;
use Carbon\Carbon;

class DataController extends Controller
{
    public function cari(Request $request)
    {
        $input = $request->cari;
        $data = Data::where('NORM', 'like', '%' . $input . '%')->first();
        $data['TANGGAL_LAHIR'] = date("d/m/Y", strtotime($data['TANGGAL_LAHIR']));
        return response()->json([
            'cari' => $data
		]);
    }


    public function tracerData()
    {
        //
        $data = regPeriksa::whereDate('tgl_registrasi', Carbon::today())->orderBy("tgl_registrasi", "DESC")->with(['data','poli','dokter'])->get();
        $count = 1;
        foreach ($data as $datas) {
            $datas['nomor'] = $count;
            $count++;
        }
		return response()->json([
            'cari' => $data
		]);
    }

    public function cariTracerData(Request $request)
    {
        // $input = $request->cari;
        // $data = regPeriksa::where('no_rkm_medis', 'like', '%' . $input . '%')->orderBy("tgl_registrasi", "DESC")->with(['data','poli','dokter'])->get();
        // $count = 1;
        // foreach ($data as $datas) {
        //     $datas['nomor'] = $count;
        //     $count++;
        // }
        // return response()->json([
        //     'cari' => $data
        // ]);
        
        $input = $request->cari;
        $data = Data::where('NORM', 'like', '%' . $input . '%')->first();
        return response()->json([
            'cari' => $data
		]);
    }

    public function label($id)
    {
        //
        // $data = Data::where('NORM', 'like', '%' . $id . '%')->first();
        // dd($data);
        
 
    }



    public function test()

    {
        $tracer = Pasien::all();
        dd($tracer);
    }
}
