<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Data;
use App\regPeriksa;
use App\Pasien;
use App\Tujuan;
use App\Pendaftaran;
use App\Ruang;
use PDF;
use Carbon\Carbon;

class DataController extends Controller
{
    public function cari(Request $request)
    {
        $input = $request->cari;
        $data = Data::where('NORM', 'like', '%' . $input . '%')->first();


        $norm = $data->NORM;
        $length = strlen($norm);
        for ($i=$length; $i < 6; $i++) {
                $norm = "0" . $norm;
        }

        $parts = str_split($norm, $split_length = 2);

        $norm = $parts[0].".".$parts[1].".".$parts[2];
      

        $data['NORMTITIK'] = $norm;


        
        $data['TANGGAL_LAHIR'] = date("d/m/Y", strtotime($data['TANGGAL_LAHIR']));
        return response()->json([
            'cari' => $data
		]);
    }


    public function tracerData()
    {
        //

        $data['pendaftaran'] = Pendaftaran::whereDate('TANGGAL', Carbon::today())->orderBy("TANGGAL", "DESC")->get();
        // dd($data['pendaftaran']);

        $count = 1;
        $nom = 0;
        foreach ($data['pendaftaran'] as $datas) {

            $data['pasien'][] = Pasien::where('NORM',$datas->NORM)->first();


            $norm = $data['pasien'][$nom]['NORM'];
            $length = strlen($norm);
            for ($i=$length; $i < 6; $i++) {
                    $norm = "0" . $norm;
            }
    
            $parts = str_split($norm, $split_length = 2);
    
            $norm = $parts[0].".".$parts[1].".".$parts[2];
            $lahir = date("d/m/Y", strtotime($data['pasien'][$nom]['TANGGAL_LAHIR']));
    
            $norm = $data['pasien'][$nom]['NORMTITIK'] = $norm;
            

            $data['pasien'][$nom]['TANGGAL_LAHIR'] = date("d/m/Y", strtotime($data['pasien'][$nom]['TANGGAL_LAHIR']));
            $data['pasien'][$nom]['nomor'] = $count;
            $count++;
            $nom++;
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


        $norm = $data->NORM;
        $length = strlen($norm);
        for ($i=$length; $i < 6; $i++) {
                $norm = "0" . $norm;
        }

        $parts = str_split($norm, $split_length = 2);

        $norm = $parts[0].".".$parts[1].".".$parts[2];


        $data['NORMTITIK'] = $norm;

        
        $data['TANGGAL_LAHIR'] = date("d/m/Y", strtotime($data['TANGGAL_LAHIR']));
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
