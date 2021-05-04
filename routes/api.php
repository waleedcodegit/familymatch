<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
/*
|--------------------------------------------------------------------------
| Front Api Routes
|--------------------------------------------------------------------------
*/
//User's Controller Api Routes
Route::post('registerUser', 'UserController@store');
Route::post('LoginUser', 'UserController@LoginUser');
Route::post('ForgotPassword', 'UserController@ForgotPassword');
Route::post('ForgotPasswordVerification', 'UserController@ForgotPasswordVerification');
Route::post('ResendPswLink', 'UserController@resendresetpasswordlink');
Route::post('UserPasswordReset', 'UserController@UserPasswordReset');
Route::post('check_authentication', 'UserController@check_authentication');
Route::post('VerifyEmail', 'UserController@VerifyEmail');
Route::get('Mailer','UserController@mail');
Route::post('ResendVerificationcode','UserController@ResendVerificationcode');
// Route::get('GetUsers', 'UserController@index');
Route::post('get_user_by_id/{id}', 'UserController@get_user_by_id')->middleware('login');

//Profile Controller Api Routes
Route::get('index','Front\ProfileController@index');
Route::post('get_healths/{uid}','Front\ProfileController@get_healths')->middleware('login');
Route::post('get_interests/{uid}','Front\ProfileController@get_interests')->middleware('login');
Route::post('get_personals/{uid}','Front\ProfileController@get_personals')->middleware('login');
Route::post('get_lifestyles/{uid}','Front\ProfileController@get_lifestyles')->middleware('login');
Route::post('get_kids/{uid}','Front\ProfileController@get_kids')->middleware('login');
Route::post('get_looks/{uid}','Front\ProfileController@get_looks')->middleware('login');
Route::post('like','Front\ProfileController@like')->middleware('login');
Route::post('get_like_by_userid','Front\ProfileController@get_like_by_userid')->middleware('login');
Route::post('add_profile_view','Front\ProfileController@add_profile_view')->middleware('login');
Route::post('getwinks','Front\ProfileController@getwinks')->middleware('login');
Route::post('getlikes','Front\ProfileController@getlikes')->middleware('login');
Route::post('getviews','Front\ProfileController@getviews')->middleware('login');

Route::post('get_wink_by_userid','Front\ProfileController@get_wink_by_userid')->middleware('login');
Route::post('wink','Front\ProfileController@wink')->middleware('login');
Route::post('interests','Front\ProfileController@Interests')->middleware('login');
Route::post('personels','Front\ProfileController@personels')->middleware('login');
Route::post('lifestyles','Front\ProfileController@lifestyles')->middleware('login');
Route::post('kids','Front\ProfileController@kids')->middleware('login');
Route::post('looks','Front\ProfileController@looks')->middleware('login');

Route::post('healths','Front\ProfileController@healths')->middleware('login');
Route::post('delete_image/{id}','Front\ProfileController@delete_image')->middleware('login');
Route::post('use_as_dp/{name}/{uid}','Front\ProfileController@use_as_dp')->middleware('login');
Route::post('get_images_by_user_id/{id}','Front\ProfileController@get_images_by_user_id')->middleware('login');
Route::get('get_cities/{id}','Front\ProfileController@get_cities');
Route::get('get_countries','Front\ProfileController@get_countries');
Route::get('get_states/{id}','Front\ProfileController@get_states');
Route::post('update_user_personel_info','Front\ProfileController@update_user_personel_info')->middleware('login');
Route::post('upload_profile_photo/{id}','Front\ProfileController@upload_profile_photo')->middleware('login');
Route::post('setup','Front\ProfileController@setup')->middleware('login');
Route::post('get_setup','Front\ProfileController@get_setup')->middleware('login');
Route::post('/pusher/auth/{id}/{username}','Front\ProfileController@pusher_auth');
Route::post('get_user_relations','Front\ProfileController@get_user_relations')->middleware('login');
Route::post('add_user_relation','Front\ProfileController@add_user_relation')->middleware('login');
Route::post('delete_user_relation','Front\ProfileController@delete_user_relation')->middleware('login');
Route::post('search_user_by_name','Front\ProfileController@search_user_by_name')->middleware('login');


//Search Controller Routes 
Route::post('get_search_results_by_loc','Front\SearchController@get_search_results_by_loc')->middleware('login');
Route::post('get_user_by_username','Front\SearchController@get_user_by_username')->middleware('login');
Route::post('apply_filters','Front\SearchController@apply_filters')->middleware('login');

//Events Controller Routes
Route::post('add_event','Front\EventsController@add_event')->middleware('login');
Route::post('allevents','Front\EventsController@get_all_events')->middleware('login');


//Message Controller Routes
Route::post('get_messages','Front\MessageController@get_messages');
Route::post('make_chat','Front\MessageController@make_chat');
Route::post('new_message','Front\MessageController@new_message')->middleware('login');
Route::post('get_post_by_slug','Admin\PostsController@get_post_by_slug');


//Matches Controller Routes
Route::post('matches','Front\MatchesController@matches')->middleware('login');




// Admin Auth Controller Routes
Route::post('admin_login','Admin\AuthController@admin_login');
Route::post('admin_check_auth','Admin\AuthController@admin_check_auth');
Route::post('registerUserbyadmin','Admin\AuthController@register_User_by_admin');
Route::post('getallusers','Admin\AuthController@getallusers')->middleware('adminlogin');
Route::post('update_User','Admin\AuthController@update_User')->middleware('adminlogin');
Route::post('getuserbyid','Admin\AuthController@get_user_by_id')->middleware('adminlogin');
Route::post('deleteuser','Admin\AuthController@deleteuser')->middleware('adminlogin');
Route::post('save_category','Admin\AuthController@save_category')->middleware('adminlogin');
Route::post('add_category','Admin\PostsController@add_category')->middleware('adminlogin');
Route::post('get_categories','Admin\PostsController@get_categories')->middleware('adminlogin');
Route::post('get_category_by_id','Admin\PostsController@get_category_by_id')->middleware('adminlogin');
Route::post('Update_category','Admin\PostsController@Update_category')->middleware('adminlogin');
Route::post('delete_category','Admin\PostsController@delete_category')->middleware('adminlogin');
Route::post('addnewpost','Admin\PostsController@addnewpost')->middleware('adminlogin');
Route::post('get__allposts','Admin\PostsController@get_allposts')->middleware('adminlogin');
Route::post('get_posts','Admin\PostsController@get_posts');
Route::post('get_post_by_id','Admin\PostsController@get_post_by_id')->middleware('adminlogin');
Route::post('update_post','Admin\PostsController@update_post')->middleware('adminlogin');
Route::post('delete_post','Admin\PostsController@delete_post')->middleware('adminlogin');
Route::post('get_plans','Admin\PlansController@get_plans');
Route::post('newplan','Admin\PlansController@newplan')->middleware('adminlogin');
Route::post('get_plan_by_id','Admin\PlansController@get_plan_by_id')->middleware('adminlogin');
Route::post('updateplan','Admin\PlansController@updateplan')->middleware('adminlogin');
Route::post('delete_plan','Admin\PlansController@delete_plan')->middleware('adminlogin');

