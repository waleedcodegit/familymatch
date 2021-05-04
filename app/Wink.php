<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Wink extends Model
{
    public function wink()
    {
        return $this->belongsTo('App\User', 'winker','id');
    }
}
