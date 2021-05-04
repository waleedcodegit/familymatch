<?php

namespace App\Http\Controllers\Front;
use DB;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;


class MatchesController extends Controller
{
    public function matches(Request $request){

        $user = DB::select('select * from users where status = :status', ['status'=>1]);
        $filter_users = [];
        $m_looks = DB::select('select * from looks where user_id = :id ', ['id'=>$request->uid]);
        $m_personals = DB::select('select * from personals where user_id = :id ', ['id'=>$request->uid]);
        $m_lifestyle = DB::select('select * from lifestyles where user_id = :id ', ['id'=>$request->uid]);
        $m_interests = DB::select('select * from interests where user_id = :id ', ['id'=>$request->uid]);
        $m_kids = DB::select('select * from kids where user_id = :id ', ['id'=>$request->uid]);
        $m_healths = DB::select('select * from healths where user_id = :id ', ['id'=>$request->uid]);
        
        foreach($user as $u){
            if($u->id == $request->uid){
                continue;
            }else{
                $looks = DB::select('select * from looks where user_id = :id ', ['id'=>$u->id]);
                $personals = DB::select('select * from personals where user_id = :id ', ['id'=>$u->id]);
                $lifestyle = DB::select('select * from lifestyles where user_id = :id ', ['id'=>$u->id]);
                $interests = DB::select('select * from interests where user_id = :id ', ['id'=>$u->id]);
                $kids = DB::select('select * from kids where user_id = :id ', ['id'=>$u->id]);
                $healths = DB::select('select * from healths where user_id = :id ', ['id'=>$u->id]);
    
                $looks_string = ['lb_Slender','lb_Big_and_beautiful','lb_Curvy','lb_About_average','lb_Athletic_and_toned','lb_Full_figured','lb_Heavyset','lb_Stocky',
                'lh_Auburn_Red','lh_Black','lh_Light_brown','lh_Dark_brown','lh_Blonde','lh_Salt_and_pepper','lh_Silver','lh_Dark_blonde','lh_Grey','lh_Platinum','lh_Bald','le_Black',
                'le_Blue','le_Brown','le_Grey','le_Green','le_Hazel'];
    
                $personals_string = ['pe_Asian','pe_Black_African_descent','pe_East_Indian','pe_Latino_Hispanic','pe_Middle_Eastern','pe_Native_American','pe_Pacific_Islander',
                'pe_White_Caucasian','pa_Capricorn','pa_Aquarius','pa_Pisces','pa_Aries','pa_Taurus','pa_Gemini','pa_Cancer','pa_Leo','pa_Virgo','pa_Libra','pa_Scorpio','pa_Sagittarius','ps_High_school',
                'ps_Some_college','ps_Associates_degree','ps_Bachelors_degree','ps_Graduate_degree','ps_PhD_Post_Doctoral','pl_Arabic','pl_Chinese','pl_Dutch','pl_English','pl_French','pl_German',
                'pl_Hebrew','pl_Hindi','pl_Italian','pl_Japanese','pl_Korean','pl_Norwegian'
                ,'pl_Portuguese','pl_Russian','pl_Spanish','pl_Swedish','pl_Tagalog','pl_Urdu'];
    
                $lifestyle_string = ['sf_Agnostic', 'sf_Atheist', 'sf_Buddhist_Taoist', 'sf_Christian_Catholic', 'sf_Christian_LDS', 'sf_Christian_Protestant', 'sf_Hindu', 'sf_Jewish', 
                'sf_Muslim_Islam', 'sf_Spiritual_but_not_religious', 'so_Administrative_Secretarial', 'so_Artistic_Creative_Performance', 'so_Executive_Management', 'so_Financial_Accounting_Real',
                'so_Labor_Construction', 'so_Legal', 'so_Medical_Dental_Veterinary_Fitness', 'so_Political_Govt_Civil', 'so_Retail_Food_services', 'so_Retired', 'so_Sales_Marketing', 'so_Self_Employed_Entrepreneur',
                'so_Student', 'so_Education_Teacher_Professor', 'so_Technical_Science_Computers_Engineering', 'so_Travel_Hospitality_Transportation', 'so_Nonprofit_Volunteer_Activist', 'so_Law_enforcement_Security_Military',
                'so_Fashion_Model_Beauty', 'so_Architecture_Interior_design'];
    
                $interests_string = ['is_Aerobics', 'is_racing_Motorcross', 'is_Baseball','is_Basketball', 'is_Billiards_Pool', 'is_Bowling', 'is_Cycling', 'is_Football', 'is_Golf', 'is_Dancing',
                'is_Inline_skating', 'is_Martial_arts', 'is_Running', 'is_Skiing', 'is_Soccer', 'is_Swimming', 'is_Tennis_Racquet_sports', 'is_Walking_Hiking',
                'is_Weights_Machines', 'is_Yoga', 'is_Hockey', 'is_VolleyBall', 'ih_Alumni_connections', 'ih_Book_club', 'ih_Camping', 'ih_Coffee_and_conversation', 'ih_Business_networking',
                'ih_Cooking', 'ih_Dining_out', 'ih_Fishing_Hunting', 'ih_Gardening_Landscaping', 'ih_Hobbies_and_crafts', 'ih_Movies_Videos', 'ih_Museums_and_art', 'ih_Music_and_concerts','ih_Exploring_new_areas', 
                'ih_Nightclubs_Dancing', 'ih_Performing_arts', 'ih_Playing_cards', 'ih_Playing_sports', 'ih_Political_interests', 'ih_Religion_Spiritual', 'ih_Shopping_Antiques', 'ih_Travel_Sightseeing',
                'ih_Video_games', 'ih_Volunteering', 'ih_Watching_sports', 'ih_Wine_tasting', 'ib_Birds', 'ib_Cats', 'ib_Dogs', 'ib_Exotic_pets', 'ib_Fish', 'ib_Horses'];
    
                $kids_string = ['fm_Never_Married', 'fm_Widow_Widower', 'fm_Currently_Separated', 'fm_Divorced', 
                'fh_Yes_and_they_sometimes_live_at_home', 'fh_No', 'fh_Yes_and_they_live_away_from_home', 'fh_Yes_and_they_live_at_home'];
    
                $healths_string = ['hs_No_way', 'hs_Occasionally', 'hs_Daily', 'hs_Cigar_aficionado', 'hs_Yes_but_trying_to_quit', 'hd_Never', 'hd_Social_Drinker', 'hd_Regularly', 'hd_Moderately', 'he_Never', 'he_2_times_per_week', 'he_3_times_per_week', 'he_5_or_more_times_per_week'];
                
                $checks = [];
                foreach($looks as $lk){
                    
                    for($i = 0 ; $i < 8 ; $i++){
                        $string = $looks_string[$i];
                        if((int)$m_looks[0]->$string == 1){
                            if((int)$lk->$string == (int)$m_looks[0]->$string){
                                $checks[0] = 1;
                                break;
                            }else{
                                $checks[0] = 0;
                            }
                        }
                    }
                    
                    for($i = 0 ; $i < 11 ; $i++){
                        $string = $looks_string[$i+8];
                        if((int)$m_looks[0]->$string == 1){
                            if((int)$lk->$string == $m_looks[0]->$string){
                                $checks[1] = 1;
                                break;
                            }else{
                                $checks[1] = 0;
                            }
                        }
                    }
                    for($i = 0 ; $i < 5 ; $i++){
                        $string = $looks_string[$i+19];
                        if((int)$m_looks[0]->$string == 1){
                            if((int)$lk->$string == (int)$m_looks[0]->$string){
                                $checks[2] = 1;
                                break;
                            }else{
                                $checks[2] = 0;
                            }
                        }
                    }
                }
                
                foreach($personals as $per){
                    for($i = 0 ; $i < 8 ; $i++){
                        $string = $personals_string[$i];
                        if((int)$m_personals[0]->$string == 1){
                            if((int)$per->$string == (int)$m_personals[0]->$string){
                                $checks[3] = 1;
                                break;
                            }else{
                                $checks[3]  = 0;
                            }
                        }
                    }
                   
                    for($i = 0 ; $i < 12 ; $i++){
                        $string = $personals_string[$i+8];
                        if((int)$m_personals[0]->$string == 1){
                            if((int)$per->$string == (int)$m_personals[0]->$string){
                                $checks[4] = 1;
                                break;
                            }else{
                                $checks[4] = 0;
                            }
                        }
                    }
                    for($i = 0 ; $i < 6 ; $i++){
                        $string = $personals_string[$i+20];
                        if((int)$m_personals[0]->$string == 1){
                            if((int)$per->$string == (int)$m_personals[0]->$string){
                                $checks[5] = 1;
                                break;
                            }else{
                                $checks[5] = 0;
                            }
                        }
                    }
    
                    for($i = 0 ; $i < 18 ; $i++){
                        $string = $personals_string[$i+26];
                        if((int)$m_personals[0]->$string == 1){
                            if((int)$per->$string == (int)$m_personals[0]->$string){
                                $checks[6] = 1;
                                break;
                            }else{
                                $checks[6] = 0;
                            }
                        }
                    }
                }
                
                foreach($lifestyle as $lf){
                    for($i = 0 ; $i < 10 ; $i++){
                        $string = $lifestyle_string[$i];
                        if((int)$m_lifestyle[0]->$string == 1){
                            if((int)$lf->$string == (int)$m_lifestyle[0]->$string){
                                $checks[7] = 1;
                                break;
                            }else{
                                $checks[7] = 0;
                            }
                        }
                    }
                    for($i = 0 ; $i < 20 ; $i++){
                        $string = $lifestyle_string[$i+10];
                        if((int)$m_lifestyle[0]->$string == 1){
                            if((int)$lf->$string == (int)$m_lifestyle[0]->$string){
                                $checks[8] = 1;
                                break;
                            }else{
                                $checks[8] = 0;
                            }
                        }
                    }
                }
                foreach($interests as $in){
                    for($i = 0 ; $i < 22 ; $i++){
                        $string = $interests_string[$i];
                        if((int)$m_interests[0]->$string == 1){
                            if((int)$in->$string == (int)$m_interests[0]->$string){
                                $checks[9] = 1;
                                break;
                            }else{
                                $checks[9] = 0;
                            }
                        }
                    }
                    for($i = 0 ; $i < 26 ; $i++){
                        $string = $interests_string[$i+22];
                        if((int)$m_interests[0]->$string == 1){
                            if((int)$in->$string == (int)$m_interests[0]->$string){
                                $checks[10] = 1;
                                break;
                            }else{
                                $checks[10] = 0;
                            }
                        }
                    }
                    for($i = 0 ; $i < 6 ; $i++){
                        $string = $interests_string[$i+48];
                        if((int)$m_interests[0]->$string == 1){
                            if((int)$in->$string == (int)$m_interests[0]->$string){
                                $checks[11] = 1;
                                break;
                            }else{
                                $checks[11] = 0;
                            }
                        }
                    }
                }
               
                foreach($kids as $kd){
                    for($i = 0 ; $i < 4 ; $i++){
                        $string = $kids_string[$i];
                        if((int)$m_kids[0]->$string == 1){
                            if((int)$kd->$string == (int)$m_kids[0]->$string){
                                $checks[12] = 1;
                                break;
                            }else{
                                $checks[12] = 0;
                            }
                        }
                    }
                    for($i = 0 ; $i < 4 ; $i++){
                        $string = $kids_string[$i+4];
                        if((int)$m_kids[0]->$string == 1){
                            if((int)$kd->$string == (int)$m_kids[0]->$string){
                                $checks[13] = 1;
                                break;
                            }else{
                                $checks[13] = 0;
                            }
                        }
                    }
                }
                foreach($healths as $hl){
                    for($i = 0 ; $i < 5 ; $i++){
                        $string = $healths_string[$i];
                        if((int)$m_healths[0]->$string == 1){
                            if((int)$hl->$string == (int)$m_healths[0]->$string){
                                $checks[14] = 1;
                                break;
                            }else{
                                $checks[14] = 0;
                            }
                        }
                    }
                    for($i = 0 ; $i < 4 ; $i++){
                        $string = $healths_string[$i+5];
                        if((int)$m_healths[0]->$string == 1){
                            if((int)$hl->$string == (int)$m_healths[0]->$string){
                                $checks[15] = 1;
                                break;
                            }else{
                                $checks[15] = 0;
                            }
                        }
                    }
                    for($i = 0 ; $i < 4 ; $i++){
                        $string = $healths_string[$i+9];
                        if((int)$m_healths[0]->$string == 1){
                            if((int)$hl->$string == (int)$m_healths[0]->$string){
                                $checks[16] = 1;
                                break;
                            }else{
                                $checks[16] = 0;
                            }
                        }
                    }
                }
                $total_checks = 0;
                foreach($checks as $c){
                    $total_checks = $total_checks + (int)$c;
                }
                if($total_checks == 0){
                    $per = 0;
                }else{
                    $per = $total_checks / sizeof($checks) * 100;
                }
                
                $u->match = (int)$per;
                if($request->type == 'matches'){
                    if($per > 0){
                        array_push($filter_users , $u);
                    }
                }else if($request->type == 'reverse'){
                    if($per == 0){
                        array_push($filter_users , $u);
                    }
                }else{  
                    array_push($filter_users , $u);
                }
               
            }

        }
        
        return $filter_users;
    }
}
