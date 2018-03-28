<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Category extends Model
{
    //
    use SoftDeletes;

    public function posts()
    {
        return $this->hasMany('App\Post');
    }

    protected $dates = ['deleted_at'];
}
