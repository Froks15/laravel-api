<?php

namespace App\Http\Middleware;

use Closure;
use Auth;
use Redirect;

class checkRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        return Auth::user();
        // 
        // if (!Auth::user()->role == 'admin'){
            // return redirect('/nax');
        // }
        // return $next($request);
    }
}
