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
        $input = $request->cari;
        $data = regPeriksa::where('no_rkm_medis', 'like', '%' . $input . '%')->orderBy("tgl_registrasi", "DESC")->with(['data','poli','dokter'])->get();
        $count = 1;
        foreach ($data as $datas) {
            $datas['nomor'] = $count;
            $count++;
        }
        return response()->json([
            'cari' => $data
		]);
    }

    public function label($id)
    {
        //
        $data = Data::where('no_rkm_medis', 'like', '%' . $id . '%')->first();
		dd($data);
    }


    // Template
    public function templateLabel()

    {
        $label = Data::first();
        $data['label'] = $label;
        // $count = count($label);
        // $data['count'] = $count;
        $data['today'] = date('d/m/Y');

        $pdf = PDF::loadView('print.label', $data);
        // return $pdf->stream();
        return view('print.label');
        // return $pdf->download('laporan-pdf.pdf');
    }

    public function templateGelangDewasa()

    {
        $label = Data::first();
        $data['label'] = $label;
        // $count = count($label);
        // $data['count'] = $count;
        $data['today'] = date('d/m/Y');

        $pdf = PDF::loadView('print.label', $data);
        // return $pdf->stream();
        return view('print.label');
        // return $pdf->download('laporan-pdf.pdf');
    }

    public function templateGelangAnak()

    {
        $label = Data::first();
        $data['label'] = $label;
        // $count = count($label);
        // $data['count'] = $count;
        $data['today'] = date('d/m/Y');

        $pdf = PDF::loadView('print.label', $data);
        // return $pdf->stream();
        return view('print.label');
        // return $pdf->download('laporan-pdf.pdf');
    }

    public function templateTracer()

    {
        $tracer = Data::first();
        $data['tracer'] = $tracer;
        // $count = count($label);
        // $data['count'] = $count;
        $data['today'] = date('d/m/Y');

        $pdf = PDF::loadView('print.tracer', $data);
        // return $pdf->stream();
        return view('print.tracer',$data);
        // return $pdf->download('laporan-pdf.pdf');
    }

    public function test()

    {
        $tracer = Pasien::all();
        dd($tracer);
    }
}
