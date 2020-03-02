<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Data;

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
}
