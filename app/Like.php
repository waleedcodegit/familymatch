<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Like extends Model
{
    public function like()
    {
        return $this->belongsTo('App\User', 'liker','id');
    }
}
