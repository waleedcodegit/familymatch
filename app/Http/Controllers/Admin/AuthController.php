<?php

namespace App\Http\Controllers\Admin;
use DB;
use Hash;
use App\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Health;
use App\Interest;
use App\Personal;
use App\Lifestyle;
use App\Kid;
use App\Setup;
use App\Look;
use Illuminate\Support\Facades\Crypt;
class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    public function admin_login(Request $request){
        $user = DB::table('users')->where('email',$request->email)->where('role',1)->where('status',1)->get();
        if(sizeof($user) > 0){
            if(Hash::check($request->password,$user[0]->password)){ 
                    $us = User::find($user[0]->id);
                    $us->access_token  = Hash::make($user[0]->id . time());                      
                    $us->save();
                    // $EmailValidator->access_token =  $us->access_token;
                    return $us;
            }else{
                return 0;
            }
        }else {return 0;}
    }
    public function admin_check_auth(Request $request){
        $user =  DB::table('users')->where('access_token', $request->token)->where('role',1)->get(); 
        return $user;
        if(sizeof($user) > 0){
            return $user;
        }else{
            return 0;
        }
    }
    public function register_User_by_admin(Request $request)
    { 
        $UserNamevalidator = DB::select( DB::raw("SELECT * FROM users WHERE username = '$request->name' ") );
        if(sizeof($UserNamevalidator) == 0){
            $EmailValidator = DB::select( DB::raw("SELECT * FROM users WHERE  email = '$request->email'") );
            if(sizeof($EmailValidator) == 0){
                $code=rand(1000,9999);	
                $user = new User();
                $user->username = $request->name;
                $user->access_token = Hash::make($request->name . time());
                $user->email  = $request->email;   
                $user->role  = $request->role;
                $user->verficationcode  = $code;   
                $user->profile_image  = 'user.png';                                           
                $user->password = Hash::make($request->password);
                $user->save();
                $senderdata=['success',$user->access_token];
                $health = new Health();
                $health->user_id = $user->id;
                $health->save();
                $Look = new Look();
                $Look->user_id = $user->id;
                $Look->save();
                $Interest = new Interest();
                $Interest->user_id = $user->id;
                $Interest->save();
                $Personal = new Personal();
                $Personal->user_id = $user->id;
                $Personal->save();
                $Lifestyle = new Lifestyle();
                $Lifestyle->user_id = $user->id;
                $Lifestyle->save();
                $Kid = new Kid();
                $Kid->user_id = $user->id;
                $Kid->save();
                $setup = new Setup();
                $setup->user_id = $user->id;
                $setup->save();
                return  $senderdata;
            }else{
                return 1;
            }
        }else{
            return 2;
        }
       
    }

    public function update_User(Request $request)
    { 
                $user = User::find($request->uid);
                $user->username = $request->name;
                $user->email  = $request->email;   
                $user->role  = $request->role;
                $user->status  = $request->status;
                $user->save();
                return  'success';
       
    }
    public function get_user_by_id(Request $request){
        $user = User::find($request->uid);
        return $user;
    }
    public function getallusers(){
        $users = DB::table('users')->select('users.id','users.username','users.email',
        'users.role','users.added_by','users.status','users.created_at')->get();
        return $users;
    }
    public function deleteuser(Request $request){
        $user = User::find($request->uid);
        $user->delete();
    }
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
