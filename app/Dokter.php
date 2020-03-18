<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Dokter extends Model
{
    protected $connection = 'mysql';
    protected $table = 'dokter';

    public function regperiksa()
    {
      return $this->hasmany('App\regPeriksa', 'kd_dokter', 'kd_dokter');
    }
}
