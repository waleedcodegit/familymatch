<?php

namespace App\Http\Controllers\Front;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use DB;
use App\User;
use App\Image;
use App\Health;
use App\Interest;
use App\Personal;
use App\Lifestyle;
use App\Wink;
use App\Like;
use App\Kid;
use App\View;
use App\Look;
use App\Setup;
use \Pusher\Pusher;
use App\User_Relations;
class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $healths = Setup::all();
        return $healths;
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

    public function get_user_relations(Request $request){
        $relations = DB::table('relations')
        ->join('users','relations.relative_id','=','users.id')
        ->where('user_id',$request->uid)
        ->select('users.username','users.fname','users.lname','relations.relative_id','relations.id',
        'relations.relation','users.profile_image')
        ->get();
        return $relations;
    }

    public function add_user_relation(Request $request){

        $relation = new User_Relations();
        $relation->user_id = $request->uid;
        $relation->relation = $request->relation;
        $relation->relative_id = $request->relative_id;
        $relation->save();
    }

    public function delete_user_relation(Request $request){
        // return $request;
        $relation = User_Relations::find($request->id);
        $relation->delete();
    }
    public function search_user_by_name(Request $request){
        $users = DB::select( DB::raw("SELECT fname,lname,profile_image,username,id FROM users WHERE concat(fname,' ',lname) LIKE '%".$request->fullname."%'") );
        return $users;
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

    public function pusher_auth(Request $request,$id,$username){
        $socketid = $request->socket_id;
        $channelName = $request->channel_name;

        $pusher = new Pusher('97900d00d08711df9f6b','1a88c520bf4638745375','1049136',[
            'cluster' => 'ap2',
            'encrypted' => 'true'
        ]);
        $presence_data = ['name' => $username];
        $key = $pusher->presence_auth($channelName,$socketid,$id,$presence_data);
            
        return response($key);
    }

    public function setup(Request $request){
        $setup = DB::table('setups')->where('user_id',$request->uid)->get();
        $setup = Setup::find($setup[0]->id);
        $setup->interested_id = $request->interested_id;
        $setup->interested_string = $request->interested_string;
        $setup->learnabout_id = $request->learnabout_id;
        $setup->learnabout_string = $request->learnabout_string;
        $setup->childrens = $request->childrens;
        $setup->single_parent = $request->single_parent;
        $setup->save();
    }
    public function get_setup(Request $request){
        $setup = DB::table('setups')->where('user_id',$request->uid)->get();
        return $setup;
    }
    public function wink(Request $request){
        $wink =  DB::table('winks')->where('winker', $request->winker)->where('user_id',$request->user_id)->get(); 
        if(sizeof($wink) > 0){
            $wnk = Wink::find($wink[0]->id);
            $wnk->visible = $request->visible;
            $wnk->save();
            return $wnk;
        }else{
            $wnk = new Wink();
            $wnk->user_id = $request->user_id;
            $wnk->winker = $request->winker;
            $wnk->visible = $request->visible;
            $wnk->save();
            return $wnk;
        }
    }
    public function like(Request $request){
        $like =  DB::table('likes')->where('liker', $request->liker)
        ->where('user_id',$request->user_id)->get(); 
        if(sizeof($like) > 0){
            $lik = Like::find($like[0]->id);
            $lik->visible = $request->visible;
            $lik->save();
            return $lik;
        }else{
            $lik = new Like();
            $lik->user_id = $request->user_id;
            $lik->liker = $request->liker;
            $lik->visible = $request->visible;
            $lik->save();
            return $lik;
        }
    }
    public function get_wink_by_userid(Request $request){
        $wink =  DB::table('winks')->where('winker', $request->login_user)->where('user_id',$request->profile_user)->get();
        return $wink;
        if(sizeof($wink) > 0){
            return $wink;
        }else{
            return 0;
        }
    }
    public function get_like_by_userid(Request $request){
        $like =  DB::table('likes')->where('liker', $request->login_user)->where('user_id',$request->profile_user)->get();
        if(sizeof($like) > 0){
            return $like;
        }else{
            return 0;
        }
    }
    public function getwinks(Request $request){
        $winks = DB::table('winks')->join('users', 'winks.winker','=', 'users.id')
        ->where('user_id', $request->user)->select('users.id','users.fname','users.lname',
        'users.username','users.profile_image','winks.created_at')->get();
        return $winks;
    }
    public function getlikes(Request $request){
        $likes = DB::table('likes')->join('users', 'likes.liker', '=', 'users.id')
        ->where('user_id', $request->user)->select('users.id','users.fname','users.lname',
        'users.username','users.profile_image','likes.created_at')->get();
        return $likes;
    }
    public function getviews(Request $request){
        $views = DB::table('views')->join('users', 'views.viewer_user', '=', 'users.id')
        ->where('profile_user', $request->user)->select('users.id','users.fname','users.lname',
        'users.username','users.profile_image','views.created_at')->get();
        return $views;
    }
    public function add_profile_view(Request $request){
        $viewer = new View();
        $viewer->profile_user = $request->profile_uid;
        $viewer->viewer_user = $request->viewer;
        $viewer->save();
    }
    public function get_cities($id){
        $cities = DB::select('select * from cities where state_id = :id', ['id' => $id]);
        return $cities;
    }
    public function get_countries(){
        $countries = DB::select('select * from countries');
        return $countries;
    }
    public function get_states($id){
        $states = DB::select('select * from states where country_id = :id', ['id' => $id]);
        return $states; 
    }
    public function update_user_personel_info(Request $request){
        $user = User::find($request->uid);
        $user->fname = $request->fname;
        $user->lname = $request->lname;
        $user->city_id = $request->city_id;
        $user->country_id = $request->country_id;
        $user->state_id = $request->state_id;
        $user->country = $request->country;
        $user->state =  $request->state;
        $user->city = $request->city;
        $user->gender =$request->gender;
        $user->seeking = $request->seeking;
        $user->dob = $request->dob;
        $user->save();

    }
    public function get_images_by_user_id($id){
        $images =  DB::table('images')->where('uid', $id)->get(); 
        return $images; 
    }
    public function upload_profile_photo(Request $request,$id) {
        $name = '';
        if ($request->get('file')) {
            foreach ($request->get('file') as $file) {
                $name = time() . '.' . explode('/', explode(':', substr($file, 0, strpos($file, ';')))[1])[1];
                \Image::make($file)->save(public_path('images/').  $name);
                
            }
        }
        $image = new Image();
        $image->uid = $id;
        $image->name = $name;
        $image->save();
    }

    public function use_as_dp($name,$uid){

        $user = User::find($uid);
        $user->profile_image = $name;
        $user->save();
    }
    public function delete_image($id){
        $image = Image::find($id);
        $image->delete();
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
    public function get_healths($uid){
        $health =  DB::table('healths')->where('user_id',$uid)->get();
        if(sizeof($health) > 0){
            return $health;
        }else{
            return 0;
        }
    }
    public function get_interests($uid){
        $interests =  DB::table('interests')->where('user_id',$uid)->get();
        if(sizeof($interests) > 0){
            return $interests;
        }else{
            return 0;
        }
    }
    public function get_personals($uid){
        $personals =  DB::table('personals')->where('user_id',$uid)->get();
        if(sizeof($personals) > 0){
            return $personals;
        }else{
            return 0;
        }
    }
    public function get_lifestyles($uid){
        $lifestyle =  DB::table('lifestyles')->where('user_id',$uid)->get();
        if(sizeof($lifestyle) > 0){
            return $lifestyle;
        }else{
            return 0;
        }
    }
    public function get_kids($uid){
        $kids =  DB::table('kids')->where('user_id',$uid)->get();
        if(sizeof($kids) > 0){
            return $kids;
        }else{
            return 0;
        }
    }
    public function get_looks($uid){
        $looks =  DB::table('looks')->where('user_id',$uid)->get();
        if(sizeof($looks) > 0){
            return $looks;
        }else{
            return 0;
        }
    }
    public function kids(Request $request){
        $kid =  DB::table('kids')->where('user_id', $request->uid)->get(); 
        if(sizeof($kid) > 0){
            $kids = Kid::find($kid[0]->id);
        }else{
            $kids = new Kid();
        }
        $kids->user_id = $request->uid;
        $kids->fm_Never_Married = $request->marital_status[0]['check'];
        $kids->fm_Widow_Widower = $request->marital_status[1]['check'];
        $kids->fm_Currently_Separated = $request->marital_status[2]['check'];
        $kids->fm_Divorced = $request->marital_status[3]['check'];
        $kids->fh_Yes_and_they_sometimes_live_at_home = $request->haskids[0]['check'];
        $kids->fh_No = $request->haskids[1]['check'];
        $kids->fh_Yes_and_they_live_away_from_home = $request->haskids[2]['check'];
        $kids->fh_Yes_and_they_live_at_home = $request->haskids[3]['check'];
        $kids->save();
 

    }
    public function looks(Request $request){
        $look =  DB::table('looks')->where('user_id', $request->uid)->get(); 
        if(sizeof($look) > 0){
            $looks = Look::find($look[0]->id);
        }else{
            $looks = new Look();
        }
        $looks->user_id = $request->uid;   
        $looks->lb_Slender = $request->bodytypes[0]['check'];
        $looks->lb_Big_and_beautiful = $request->bodytypes[1]['check'];
        $looks->lb_Curvy = $request->bodytypes[2]['check'];
        $looks->lb_About_average = $request->bodytypes[3]['check'];
        $looks->lb_Athletic_and_toned = $request->bodytypes[4]['check'];
        $looks->lb_Full_figured = $request->bodytypes[5]['check'];
        $looks->lb_Heavyset = $request->bodytypes[6]['check'];
        $looks->lb_Stocky = $request->bodytypes[7]['check'];
        $looks->lh_Auburn_Red = $request->haircolor[0]['check'];
        $looks->lh_Black = $request->haircolor[1]['check'];
        $looks->lh_Light_brown = $request->haircolor[2]['check'];
        $looks->lh_Dark_brown = $request->haircolor[3]['check'];
        $looks->lh_Blonde = $request->haircolor[4]['check'];
        $looks->lh_Salt_and_pepper = $request->haircolor[5]['check'];
        $looks->lh_Silver = $request->haircolor[6]['check'];
        $looks->lh_Dark_blonde = $request->haircolor[7]['check'];
        $looks->lh_Grey = $request->haircolor[8]['check'];
        $looks->lh_Platinum = $request->haircolor[9]['check'];
        $looks->lh_Bald = $request->haircolor[10]['check'];
        $looks->le_Black = $request->eyecolor[0]['check'];
        $looks->le_Blue = $request->eyecolor[1]['check'];
        $looks->le_Brown = $request->eyecolor[2]['check'];
        $looks->le_Grey = $request->eyecolor[3]['check'];
        $looks->le_Green = $request->eyecolor[4]['check'];
        $looks->le_Hazel = $request->eyecolor[5]['check'];
        $looks->save();


    }
    public function lifestyles(Request $request){
        
        $lifestyle =  DB::table('lifestyles')->where('user_id', $request->uid)->get(); 
        if(sizeof($lifestyle) > 0){
            $lifestyles = Lifestyle::find($lifestyle[0]->id);
        }else{
            $lifestyles = new Lifestyle();
        }
        $lifestyles->user_id = $request->uid;
        $lifestyles->sf_Agnostic = $request->faith[0]['check'];
        $lifestyles->sf_Atheist = $request->faith[1]['check'];
        $lifestyles->sf_Buddhist_Taoist = $request->faith[2]['check'];
        $lifestyles->sf_Christian_Catholic = $request->faith[3]['check'];
        $lifestyles->sf_Christian_LDS = $request->faith[4]['check'];
        $lifestyles->sf_Christian_Protestant = $request->faith[5]['check'];
        $lifestyles->sf_Hindu = $request->faith[6]['check'];
        $lifestyles->sf_Jewish = $request->faith[7]['check'];
        $lifestyles->sf_Muslim_Islam = $request->faith[8]['check'];
        $lifestyles->sf_Spiritual_but_not_religious = $request->faith[9]['check'];
        $lifestyles->so_Administrative_Secretarial = $request->occupation[0]['check'];
        $lifestyles->so_Artistic_Creative_Performance = $request->occupation[1]['check'];	
        $lifestyles->so_Executive_Management = $request->occupation[2]['check'];
        $lifestyles->so_Financial_Accounting_Real  = $request->occupation[3]['check'];
        $lifestyles->so_Labor_Construction = $request->occupation[4]['check'];
        $lifestyles->so_Legal = $request->occupation[5]['check'];
        $lifestyles->so_Medical_Dental_Veterinary_Fitness = $request->occupation[6]['check'];
        $lifestyles->so_Political_Govt_Civil  = $request->occupation[7]['check'];
        $lifestyles->so_Retail_Food_services = $request->occupation[8]['check'];
        $lifestyles->so_Retired = $request->occupation[9]['check'];
        $lifestyles->so_Sales_Marketing = $request->occupation[10]['check'];
        $lifestyles->so_Self_Employed_Entrepreneur = $request->occupation[11]['check'];
        $lifestyles->so_Student = $request->occupation[12]['check'];
        $lifestyles->so_Education_Teacher_Professor = $request->occupation[13]['check'];
        $lifestyles->so_Technical_Science_Computers_Engineering = $request->occupation[14]['check'];
        $lifestyles->so_Travel_Hospitality_Transportation = $request->occupation[15]['check'];
        $lifestyles->so_Nonprofit_Volunteer_Activist = $request->occupation[16]['check'];
        $lifestyles->so_Law_enforcement_Security_Military = $request->occupation[17]['check'];
        $lifestyles->so_Fashion_Model_Beauty  = $request->occupation[18]['check'];
        $lifestyles->so_Architecture_Interior_design = $request->occupation[19]['check'];
        // return $lifestyles;
        $lifestyles->save();


    }
    public function personels(Request $request){
        $personal =  DB::table('personals')->where('user_id', $request->uid)->get(); 
        $personals = [];
        if(sizeof($personal) > 0){
            $personals = Personal::find($personal[0]->id);
        }else{
            $personals = new Personal();
        }
        $personals->user_id = $request->uid;
        $personals->pe_Asian  = $request->Ethnicity[0]['check'];
        $personals->pe_Black_African_descent = $request->Ethnicity[1]['check'];
        $personals->pe_East_Indian = $request->Ethnicity[2]['check'];
        $personals->pe_Latino_Hispanic = $request->Ethnicity[3]['check'];
        $personals->pe_Middle_Eastern = $request->Ethnicity[4]['check'];
        $personals->pe_Native_American = $request->Ethnicity[5]['check'];
        $personals->pe_Pacific_Islander = $request->Ethnicity[6]['check'];
        $personals->pe_White_Caucasian = $request->Ethnicity[7]['check'];
        $personals->pa_Capricorn = $request->astrology[0]['check'];
        $personals->pa_Aquarius = $request->astrology[1]['check'];
        $personals->pa_Pisces = $request->astrology[2]['check'];
        $personals->pa_Aries = $request->astrology[3]['check'];
        $personals->pa_Taurus = $request->astrology[4]['check'];
        $personals->pa_Gemini = $request->astrology[5]['check'];
        $personals->pa_Cancer = $request->astrology[6]['check'];
        $personals->pa_Leo = $request->astrology[7]['check'];
        $personals->pa_Virgo = $request->astrology[8]['check'];
        $personals->pa_Libra = $request->astrology[9]['check'];
        $personals->pa_Scorpio = $request->astrology[10]['check'];
        $personals->pa_Sagittarius = $request->astrology[11]['check'];
        $personals->ps_High_school = $request->education[0]['check'];
        $personals->ps_Some_college = $request->education[1]['check'];
        $personals->ps_Associates_degree = $request->education[2]['check'];
        $personals->ps_Bachelors_degree = $request->education[3]['check'];
        $personals->ps_Graduate_degree = $request->education[4]['check'];
        $personals->ps_PhD_Post_Doctoral = $request->education[5]['check'];
        $personals->pl_Arabic = $request->language[0]['check'];
        $personals->pl_Chinese = $request->language[1]['check'];
        $personals->pl_Dutch = $request->language[2]['check'];
        $personals->pl_English = $request->language[3]['check'];
        $personals->pl_French = $request->language[4]['check'];
        $personals->pl_German = $request->language[5]['check'];
        $personals->pl_Hebrew = $request->language[6]['check'];
        $personals->pl_Hindi = $request->language[7]['check'];
        $personals->pl_Italian = $request->language[8]['check'];
        $personals->pl_Japanese = $request->language[9]['check'];
        $personals->pl_Korean = $request->language[10]['check'];
        $personals->pl_Norwegian = $request->language[11]['check'];
        $personals->pl_Portuguese = $request->language[12]['check'];
        $personals->pl_Russian = $request->language[13]['check'];
        $personals->pl_Spanish = $request->language[14]['check'];
        $personals->pl_Swedish = $request->language[15]['check'];
        $personals->pl_Tagalog = $request->language[16]['check'];
        $personals->pl_Urdu = $request->language[17]['check'];
        $personals->save();
    }
    public function healths(Request $request){
        // return $request->headers;
        $health =  DB::table('healths')->where('user_id', $request->uid)->get(); 
        $healths = [];
        if(sizeof($health) > 0){
            $healths = Health::find($health[0]->id);
        }else{
            $healths = new Health();
        }
        $healths->user_id = $request->uid;
        $healths->hs_No_way = $request->smokes[0]['check'];
        $healths->hs_Occasionally = $request->smokes[1]['check'];
        $healths->hs_Daily = $request->smokes[2]['check'];
        $healths->hs_Cigar_aficionado = $request->smokes[3]['check'];
        $healths->hs_Yes_but_trying_to_quit = $request->smokes[4]['check'];
        $healths->hd_Never = $request->drinks[0]['check'];
        $healths->hd_Social_Drinker = $request->drinks[1]['check'];
        $healths->hd_Regularly = $request->drinks[2]['check'];
        $healths->hd_Moderately = $request->drinks[3]['check'];
        $healths->he_Never = $request->exercise[0]['check'];
        $healths->he_2_times_per_week = $request->exercise[1]['check'];
        $healths->he_3_times_per_week = $request->exercise[2]['check'];
        $healths->he_5_or_more_times_per_week = $request->exercise[3]['check'];
        $healths->save();
        return 1;
    }

    public function Interests(Request $request){
        // return $request;
        $interest =  DB::table('interests')->where('user_id', $request->uid)->get(); 
        $interests = [];
        if(sizeof($interest) > 0){
            $interests = Interest::find($interest[0]->id);
        }else{
            $interests = new Interest();
        }
        $interests->user_id = $request->uid;
        $interests->is_Aerobics = $request->sports[0]['check'];
        $interests->is_racing_Motorcross = $request->sports[1]['check'];
        $interests->is_Baseball = $request->sports[2]['check'];
        $interests->is_Basketball = $request->sports[3]['check'];
        $interests->is_Billiards_Pool = $request->sports[4]['check'];
        $interests->is_Bowling = $request->sports[5]['check'];
        $interests->is_Cycling = $request->sports[6]['check'];
        $interests->is_Football = $request->sports[7]['check'];
        $interests->is_Golf = $request->sports[8]['check'];
        $interests->is_Dancing = $request->sports[9]['check'];

        $interests->is_Inline_skating = $request->sports[10]['check'];
        $interests->is_Martial_arts = $request->sports[11]['check'];
        $interests->is_Running = $request->sports[12]['check'];
        $interests->is_Skiing = $request->sports[13]['check'];
        $interests->is_Soccer = $request->sports[14]['check'];
        $interests->is_Swimming = $request->sports[15]['check'];
        $interests->is_Tennis_Racquet_sports = $request->sports[16]['check'];
        $interests->is_Walking_Hiking = $request->sports[17]['check'];
        $interests->is_Weights_Machines = $request->sports[18]['check'];
        $interests->is_Yoga = $request->sports[19]['check'];
        $interests->is_Hockey = $request->sports[20]['check'];
        $interests->is_VolleyBall = $request->sports[21]['check'];
        // return $interests;

        $interests->ih_Alumni_connections = $request->hobbies[0]['check'];
        $interests->ih_Book_club = $request->hobbies[1]['check'];
        $interests->ih_Camping = $request->hobbies[2]['check'];
        $interests->ih_Coffee_and_conversation = $request->hobbies[3]['check'];
        $interests->ih_Business_networking = $request->hobbies[4]['check'];
        $interests->ih_Cooking = $request->hobbies[5]['check'];
        $interests->ih_Dining_out = $request->hobbies[6]['check'];
        $interests->ih_Fishing_Hunting = $request->hobbies[7]['check'];
        $interests->ih_Gardening_Landscaping	 = $request->hobbies[8]['check'];
        $interests->ih_Hobbies_and_crafts = $request->hobbies[9]['check'];
        $interests->ih_Movies_Videos = $request->hobbies[10]['check'];
        $interests->ih_Museums_and_art = $request->hobbies[11]['check'];
        $interests->ih_Music_and_concerts = $request->hobbies[12]['check'];
        $interests->ih_Exploring_new_areas = $request->hobbies[13]['check'];
        $interests->ih_Nightclubs_Dancing = $request->hobbies[14]['check'];
        $interests->ih_Performing_arts = $request->hobbies[15]['check'];
        $interests->ih_Playing_cards = $request->hobbies[16]['check'];
        $interests->ih_Playing_sports = $request->hobbies[17]['check'];
        $interests->ih_Political_interests = $request->hobbies[18]['check'];
        $interests->ih_Religion_Spiritual = $request->hobbies[19]['check'];
        $interests->ih_Shopping_Antiques = $request->hobbies[20]['check'];
        $interests->ih_Travel_Sightseeing = $request->hobbies[21]['check'];
        $interests->ih_Video_games = $request->hobbies[22]['check'];
        $interests->ih_Volunteering = $request->hobbies[23]['check'];
        $interests->ih_Watching_sports	 = $request->hobbies[24]['check'];
        $interests->ih_Wine_tasting = $request->hobbies[25]['check'];
        $interests->ib_Birds = $request->pet[0]['check'];
        $interests->ib_Cats = $request->pet[1]['check'];
        $interests->ib_Dogs = $request->pet[2]['check'];
        $interests->ib_Exotic_pets = $request->pet[3]['check'];
        $interests->ib_Fish = $request->pet[4]['check'];
        $interests->ib_Horses = $request->pet[5]['check'];
        $interests->save();


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
