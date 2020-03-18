<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pasien extends Model
{
    protected $connection = 'mysql';
    protected $table = 'pasien';
}
