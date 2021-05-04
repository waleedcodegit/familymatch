<?php

namespace App\Http\Controllers\Front;
use App\Message;
use App\Chat;
use DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DateTime;
class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $chats = Chat::all();
        return $chats;
    }
    // ->join('users','chats.chat_user','=','users.id')
    public function make_chat(Request $request){
       $chat = DB::table('chats')->where('user_id',$request->uid)
        ->orWhere('chat_user_id',$request->uid)->get();
        if(sizeof($chat) > 0){
            $new_msg = new Message();
            $new_msg->user_id = $request->uid;
            $new_msg->chat_id = $chat[0]->id;
            $new_msg->message = 'Helo!';
            $new_msg->time = date("h:i:sa");
            $new_msg->date = date("d-m-Y");
            $new_msg->type = 'out';
            $new_msg->save();
            $chat = Chat::find($chat[0]->id);
            $chat->last_active = date("Y-m-d h:i:sa");
            $chat->last_msg_id = $new_msg->id;
            $chat->save();
            return 1;
        }else{
            $newchat = new Chat();
        }
        $newchat->user_id = $request->uid;
        $newchat->chat_user_id = $request->chat_user;
        $newchat->last_active = date("Y-m-d h:i:sa");;
        $newchat->save();
        $new_msg = new Message();
        $new_msg->user_id = $request->uid;
        $new_msg->chat_id = $newchat->id;
        $new_msg->message = 'Helo!';
        $new_msg->time = date("h:i:sa");
        $new_msg->date = date("d-m-Y");
        $new_msg->type = 'out';
        $new_msg->save();
        $chat2 = Chat::find($newchat->id);
        $chat2->last_msg_id = $new_msg->id;
        $chat2->save();
        return 1;
    }

    public function get_messages(Request $request){
        $allchats = DB::table('chats')
        ->where('user_id',$request->uid)
        ->orWhere('chat_user_id',$request->uid)
        ->get();
        $messages = [];
        $chats = [];
        foreach($allchats as $c){
            if($c->user_id == $request->uid){
                $chats = DB::table('chats')
                ->join('users','chats.chat_user_id','=','users.id')
                ->where('user_id',$request->uid)
                ->orWhere('chat_user_id',$request->uid)
                ->select('chats.id','chats.chat_user_id','chats.user_id','users.username','users.fname','users.lname','users.profile_image','chats.last_active')->get();
            }else{
                $chats = DB::table('chats')
                ->join('users','chats.user_id','=','users.id')
                ->where('user_id',$request->uid)
                ->orWhere('chat_user_id',$request->uid)
                ->select('chats.id','chats.chat_user_id','chats.user_id','users.username','users.fname','users.lname','users.profile_image','chats.last_active')->get();
            }
           
            
            $msgs = DB::table('messages')
                    ->join('users','messages.user_id','=','users.id')
                    ->where('messages.chat_id',$c->id)
                    ->where('messages.status',1)
                    ->select('messages.user_id','messages.id','messages.message','messages.time','messages.date','messages.type','messages.chat_id'
                    ,'users.fname','users.lname','users.profile_image')
                    ->get();
            array_push($messages,$msgs);   
        }
        $response = ['chats'=>$chats , 'messages'=>$messages];
        return $response;
    }
    public function new_message(Request $request){
        $new_msg = new Message();
        $new_msg->user_id = $request->uid;
        $new_msg->chat_id = $request->chat_id;
        $new_msg->message = $request->msg;
        $new_msg->time = date("h:i:sa");
        $new_msg->date = date("d-m-Y");
        $new_msg->type = $request->msg_type;
        $new_msg->save();
        $chat = Chat::find($request->chat_id);
        $chat->last_active = date("Y-m-d h:i:sa");;
        $chat->save();
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
