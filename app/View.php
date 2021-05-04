<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class View extends Model
{
    
    // protected $table = "views";
    // protected $fillable = ['profile_user', 'user_id'];
    public function views()
    {
        return $this->belongsTo('App\User', 'viewer_user','id');
    }
}
