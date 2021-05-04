<?php

namespace App\Http\Middleware;

use Closure;
use DB;
class login
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
        $user =  DB::table('users')->where('access_token', $request->access_token)->get(); 
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
