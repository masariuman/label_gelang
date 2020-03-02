<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Poli extends Model
{
    protected $table = 'poliklinik';

    public function regperiksa()
    {
      return $this->hasmany('App\regPeriksa', 'kd_poli', 'kd_poli');
    }
}
