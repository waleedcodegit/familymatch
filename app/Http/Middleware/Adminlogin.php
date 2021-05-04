<?php

namespace App\Http\Middleware;

use Closure;

class Adminlogin
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
        $user =  DB::table('users')->where('access_token', $request->access_token)
        ->where('role',1)->get(); 
        if(sizeof($user) > 0){
            return $next($request);
        }else{
            $response = [
                'status' => 200,
                'message' => 'Unauthorized',
            ];
    
            return response()->json($response, 401);
        }
    }
}
