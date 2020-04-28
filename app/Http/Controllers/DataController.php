<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Data;
use App\regPeriksa;
use App\Pasien;
use App\Tujuan;
use App\Pendaftaran;
use App\Ruang;
use App\DokterRuangan;
use App\Dokter;
use App\Pegawai;
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

        if(!empty($data['pendaftaran'][0])) {
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


            $pendaftaran = Pendaftaran::where('NORM', $datas->NORM)->whereDate('TANGGAL', Carbon::today())->first();
            if ($pendaftaran) {
                $tujuan = Tujuan::where('NOPEN',$pendaftaran->NOMOR)->first();
                $ruang = Ruang::where('ID',$tujuan->RUANGAN)->first();
                $data['pasien'][$nom]["poli"] = $ruang->DESKRIPSI;
            }
            else {
                $data['pasien'][$nom]["poli"] = "";
            }


            $data['pasien'][$nom]['nomor'] = $count;
            $count++;
            $nom++;
        }
    }
    else {
        $data['pasien'] = $data['pendaftaran'];
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

    public function pasienData()
    {
        $tujuan = Tujuan::where('RUANGAN','101010106')->orderBy("NOPEN", "DESC")->get();
        $dokter_ruangan = DokterRuangan::where('RUANGAN','101010106')->get();
        foreach ($dokter_ruangan as $dokter_ruangans) {
            $dokter[] = Dokter::where('ID',$dokter_ruangans['DOKTER'])->first();
        }
        foreach ($dokter as $docter) {
            $today = $pendaftarans = Pendaftaran::whereDate('TANGGAL', Carbon::today())->get();
            foreach ($today as $todays) {
                $tujuan_dokter[$docter['ID']] = Tujuan::where('DOKTER',$docter['ID'])->where('NOPEN',$todays['NOMOR'])->first();
            }
            // $tujuan_dokter[$docter['ID']] = Tujuan::where('DOKTER',$docter['ID'])->get();
            $namaa = Pegawai::where('NIP',$docter['NIP'])->first();
            $offset = 0;
            if(empty($tujuan_dokter[$docter['ID']][0])) {
                $nameng['nama_dokter'] = $namaa->GELAR_DEPAN.'. '.$namaa->NAMA.', '.$namaa->GELAR_BELAKANG;
                $tujuan_dokter[$docter['ID']][] = $nameng;
            }
            else {
                foreach ($tujuan_dokter[$docter['ID']] as $namaDokter) {
                    $namaDokter['nama_dokter'] = $namaa->GELAR_DEPAN.'. '.$namaa->NAMA.', '.$namaa->GELAR_BELAKANG;
                    $pendaftarans = Pendaftaran::whereDate('TANGGAL', Carbon::today())->where('NOMOR', $namaDokter['NOPEN'])->first();
                    if (!$pendaftarans) {
                        $namaDokter['NORM'] = 'tidak_ada';
                    } else {
                        $pasen = Data::where('NORM', $pendaftarans['NORM'])->first();
                        $namaDokter['NORM'] = $pasen['NORM'];
                        $offset++;
                    }
                }
            }
        }
        dd($tujuan_dokter);
        foreach ($tujuan as $tujuans) {
            $cek = Pendaftaran::whereDate('TANGGAL', Carbon::today())->where('NOMOR', $tujuans['NOPEN'])->first();
            if ($cek) {
                $pendaftaran[] = $cek;
            }
        }
        foreach ($pendaftaran as $pendaftarans) {
            $data['pasien'][] = Data::where('NORM', $pendaftarans['NORM'])->get();
            $tujuan_hari_ini[] = Tujuan::where('NOPEN',$pendaftarans['NOMOR'])->get();
        }
        $count = count($data['pasien']);
        $nom = 0;

        // krsort($data['pasien']);

        foreach ($data['pasien'] as $datas) {
            $norm = $datas[$nom]['NORM'];
            $length = strlen($norm);
            for ($i=$length; $i < 6; $i++) {
                    $norm = "0" . $norm;
            }
            $parts = str_split($norm, $split_length = 2);
            $norm = $parts[0].".".$parts[1].".".$parts[2];
            $lahir = date("d/m/Y", strtotime($datas[$nom]['TANGGAL_LAHIR']));
            $norm = $datas[$nom]['NORMTITIK'] = $norm;

            $datas[0]['TANGGAL_LAHIR'] = date("d/m/Y", strtotime($datas[0]['TANGGAL_LAHIR']));

            $datas[$nom]['nomor'] = $count;
            $count--;
        }

		return response()->json([
            'cari' => $data
		]);
    }

    public function pasienDataFilter(Request $request)
    {
        $tujuan = Tujuan::where('RUANGAN','101020101')->orderBy("NOPEN", "DESC")->get();
        $dokter_ruangan = DokterRuangan::where('RUANGAN','101020101')->get();
        foreach ($dokter_ruangan as $dokter_ruangans) {
            $dokter[] = Dokter::where('ID',$dokter_ruangans['DOKTER'])->get();
        }
        foreach ($tujuan as $tujuans) {
            $cek = Pendaftaran::whereDate('TANGGAL', Carbon::today())->where('NOMOR', $tujuans['NOPEN'])->first();
            if ($cek) {
                $pendaftaran[] = $cek;
            }
        }
        foreach ($pendaftaran as $pendaftarans) {
            $data['pasien'][] = Data::where('NORM', $pendaftarans['NORM'])->get();
            $tujuan_hari_ini[] = Tujuan::where('NOPEN',$pendaftarans['NOMOR'])->get();
        }
        $count = 1;
        $nom = 0;

        if(!empty($data['pasien'][0])) {
        foreach ($data['pasien'] as $datas) {

            $data['pasien'][$nom][dokter][] = Pasien::where('NORM',$datas->NORM)->first();


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


            $pendaftaran = Pendaftaran::where('NORM', $datas->NORM)->whereDate('TANGGAL', Carbon::today())->first();
            if ($pendaftaran) {
                $tujuan = Tujuan::where('NOPEN',$pendaftaran->NOMOR)->first();
                $ruang = Ruang::where('ID',$tujuan->RUANGAN)->first();
                $data['pasien'][$nom]["poli"] = $ruang->DESKRIPSI;
            }
            else {
                $data['pasien'][$nom]["poli"] = "";
            }


            $data['pasien'][$nom]['nomor'] = $count;
            $count++;
            $nom++;
        }
    }
    else {
        $data['pasien'] = $data['pendaftaran'];
     }
		return response()->json([
            'cari' => $data
		]);


    }



    public function test()

    {
        $tracer = Pasien::all();
        dd($tracer);
    }



    public function BACKUPpasienData()
    {
        $tujuan = Tujuan::where('RUANGAN','101020101')->orderBy("NOPEN", "DESC")->get();
        $dokter_ruangan = DokterRuangan::where('RUANGAN','101020101')->get();
        foreach ($dokter_ruangan as $dokter_ruangans) {
            $dokter[] = Dokter::where('ID',$dokter_ruangans['DOKTER'])->get();
        }
        foreach ($tujuan as $tujuans) {
            $cek = Pendaftaran::whereDate('TANGGAL', Carbon::today())->where('NOMOR', $tujuans['NOPEN'])->first();
            if ($cek) {
                $pendaftaran[] = $cek;
            }
        }
        foreach ($pendaftaran as $pendaftarans) {
            $data['pasien'][] = Data::where('NORM', $pendaftarans['NORM'])->get();
            $tujuan_hari_ini[] = Tujuan::where('NOPEN',$pendaftarans['NOMOR'])->get();
        }
        $count = count($data['pasien']);
        $nom = 0;

        // krsort($data['pasien']);

        foreach ($data['pasien'] as $datas) {
            $norm = $datas[$nom]['NORM'];
            $length = strlen($norm);
            for ($i=$length; $i < 6; $i++) {
                    $norm = "0" . $norm;
            }
            $parts = str_split($norm, $split_length = 2);
            $norm = $parts[0].".".$parts[1].".".$parts[2];
            $lahir = date("d/m/Y", strtotime($datas[$nom]['TANGGAL_LAHIR']));
            $norm = $datas[$nom]['NORMTITIK'] = $norm;

            $datas[0]['TANGGAL_LAHIR'] = date("d/m/Y", strtotime($datas[0]['TANGGAL_LAHIR']));

            $datas[$nom]['nomor'] = $count;
            $count--;
        }

		return response()->json([
            'cari' => $data
		]);
    }
}
