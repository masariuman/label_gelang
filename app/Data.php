<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Data extends Model
{
    protected $table = 'pasien';

    public function regperiksa()
    {
      return $this->hasmany('App\regPeriksa', 'no_rkm_medis', 'no_rkm_medis');
    }
}
