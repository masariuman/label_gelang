<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class regPeriksa extends Model
{
    protected $table = 'reg_periksa';

    public function dokter()
    {
      return $this->belongsTo('App\Dokter', 'kd_dokter', 'kd_dokter');
    }

    public function data()
    {
      return $this->belongsTo('App\Data', 'no_rkm_medis', 'no_rkm_medis');
    }

    public function poli()
    {
      return $this->belongsTo('App\Poli', 'kd_dokter', 'kd_dokter');
    }
}
