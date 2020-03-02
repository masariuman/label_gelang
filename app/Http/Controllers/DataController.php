<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Data;
use PDF;

class DataController extends Controller
{
    public function cari(Request $request)
    {
        $input = $request->cari;
        $data = Data::where('no_rkm_medis', 'like', '%' . $input . '%')->first();
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
}
