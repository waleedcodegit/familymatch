<?php

namespace App\Http\Controllers;
use App\User;
use App\ResetPassword;
use DB;
use Hash;
use App\Health;
use App\Interest;
use App\Personal;
use App\Lifestyle;
use App\Kid;
use App\Setup;
use App\Look;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\Mailer;
use Illuminate\Support\Facades\Crypt;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        return $users;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
       
    }
    public function mail(){
        $code = 1234;
        $email = "waleedah.official@gmail.com";
        $code =  Hash::make($code);
        echo Hash::check(1234,$code);
        Mail::to("waleedah.official@gmail.com")->send(new Mailer($code));
        
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function check_authentication(Request $request){
        $user =  DB::table('users')->where('access_token', $request->user)->get(); 
        return $user;
        if(sizeof($user) > 0){
            return $user;
        }else{
            return 0;
        }
    }
    public function UserPasswordReset(Request $request){
        $data =  DB::table('password_resets')->where('token', Crypt::decrypt( $request->id))->get(); 
        if($data[0]->status == 0){
            return 0;
        }else{
            $data1 =  DB::table('users')->where('email', $data[0]->email)->get(); 
            $user = User::find($data1[0]->id);                     
            $user->password = Hash::make($request->p);
            $user->save();
            return 1;
        }
    }
    public function resendresetpasswordlink(Request $request){
        $data =  ResetPassword::find(Crypt::decrypt( $request->id)); 
        DB::table('password_resets')->where('email', $data->email)->update(array('status' => '0'));  
        $code=rand(1000,9999);	
        $p = new ResetPassword();
        $p->email = $data->email;
        $p->token = $code;
        $p->status = 1;
        $p->save();
        $link = 'Your Password Reset Link: '. url('/').'/ForgotPassword/'.Crypt::encrypt($p->token);
        $title = 'Password Reset';
        $subtile = 'Password Reset Link'; 
        Mail::to($data->email)->send(new Mailer($link,$title,$subtile));
    }
    public function ForgotPassword(Request $request){
        $u = DB::select( DB::raw("SELECT * FROM users WHERE email = '$request->email' "));
        if(sizeof($u) > 0){
            DB::table('password_resets')->where('email', $request->email)->update(array('status' => '0'));  
            $code=rand(1000,9999);	
            $p = new ResetPassword();
            $p->email = $request->email;
            $p->token = $code;
            $p->status = 1;
            $p->save();
            $link = 'Your Password Reset Link: '. url('/').'/ForgotPassword/'.Crypt::encrypt($p->token);
            $title = 'Password Reset';
            $subtile = 'Password Reset Link';
            Mail::to($request->email)->send(new Mailer($link,$title,$subtile));
            return Crypt::encrypt($p->id);
        }else{
            return 0;
        }
    }
   
    public function ResendVerificationcode(Request $request){
        $u = DB::select( DB::raw("SELECT * FROM users WHERE userhash = '$request->user' "));
        if(sizeof($u) > 0){
            $code=rand(1000,9999);	
            $us = User::find($u[0]->id);
            $us->verficationcode  = $code;                       
            $us->save();
            $body = 'Your Email Verification code is : '. $code;
            $title = 'Email Verification Code';
            $subtile = 'Email Verification Code';
            Mail::to($u[0]->email)->send(new Mailer($body,$title,$subtile));
        }else{
            return 0;
        }
            
    }
    public function VerifyEmail(Request $request){
            $u = DB::select( DB::raw("SELECT * FROM users WHERE access_token = '$request->user' "));
            if($u[0]->verficationcode == $request->code){
                $us = User::find($u[0]->id);
                $us->email_verified_at = date("d/m/Y h:i:s");
                $us->save();
                return 1;
            }else{
                return 0;
            }
    }
    public function store(Request $request)
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
                $user->verficationcode  = $code;   
                $user->profile_image  = 'user.png';                                           
                $user->password = Hash::make($request->password);
                $user->save();
                $body = 'Your Email Verification code is : '. $code;
                $title = 'Email Verification Code';
                $subtile = 'Email Verification Code';
                Mail::to($request->email)->send(new Mailer($body,$title,$subtile));
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
    public function get_user_by_id($id){
        $user =  DB::table('users')->where('id', $id)->get(); 
        if(sizeof($user) > 0){
            return $user;
        }else{
            return 0;
        }
    }
    public function LoginUser(Request $request){
        $EmailValidator = DB::select( DB::raw("SELECT * FROM users WHERE  email = '$request->email' AND status = '1' ") );
        if(sizeof($EmailValidator) > 0){
            if(Hash::check($request->password,$EmailValidator[0]->password)){
                if(is_null($EmailValidator[0]->email_verified_at)){
                    $code=rand(1000,9999);	
                    $us = User::find($EmailValidator[0]->id);
                    $us->verficationcode  = $code;                       
                    $us->save();
                    $body = 'Your Email Verification code is : '. $code;
                    $title = 'Email Verification Code';
                    $subtile = 'Email Verification Code';
                    Mail::to($request->email)->send(new Mailer($body,$title,$subtile));
                    return $EmailValidator;
                }else{
                    $us = User::find($EmailValidator[0]->id);
                    $us->access_token  = Hash::make($EmailValidator[0]->id . time());                      
                    $us->save();
                    // $EmailValidator->access_token =  $us->access_token;
                    return $us;
                }
            }else{
                return 0;
            }
        }else return 0;
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
