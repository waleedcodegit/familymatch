<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Client Front Routes

Route::get('/', function () {
    return view('welcome');
});
Route::get('{reactRoutes}', function () {
    return view('welcome');
});
Route::get('/', function () {
    return view('welcome');
});
Route::get('/ForgotPassword/{id}', function () {
    return view('welcome');
}); 
Route::get('/ResetPassword/{id}', function () {
    return view('welcome');
});
Route::get('/profile/my', function () {return view('welcome');});
Route::get('/profile/my/About-me', function () {return view('welcome');});
Route::get('/profile/my/favorites', function () {return view('welcome');});
Route::get('/profile/my/likes', function () {return view('welcome');});
Route::get('/profile/my/match-data', function () {return view('welcome');});
Route::get('/profile/my/photo', function () {return view('welcome');});
Route::get('/profile/my/views', function () {return view('welcome');});
Route::get('/profile/my/winks', function () {return view('welcome');});
Route::get('/profile/Search', function () {return view('welcome');});
Route::get('/profile/Search/Results', function () {return view('welcome');});
Route::get('/profile/{username}/profile', function () {return view('welcome');});
Route::get('/profile/{username}/profile/About', function () {return view('welcome');});
Route::get('/profile/Messages', function () {return view('welcome');});
Route::get('/profile/Setup', function () {return view('welcome');});
Route::get('/profile/Setup/Start', function () {return view('welcome');});
Route::get('/profile/AddEvent', function () {return view('welcome');});
Route::get('/profile/AllEvents', function () {return view('welcome');});
Route::get('/profile/blogs', function () {return view('welcome');});
Route::get('/profile/blog/{slug}', function () {return view('welcome');});
Route::get('/profile/plans', function () {return view('welcome');});
Route::get('/profile/Matches', function () {return view('welcome');});
Route::get('/profile/Mutuals', function () {return view('welcome');});
Route::get('/profile/Reverse', function () {return view('welcome');});
Route::get('/profile/VideoCall', function () {return view('welcome');});




// Admin Front Routes

Route::get('/adminpanel/dashboard', function () {return view('welcome');});
Route::get('/adminpanel/NewUser', function () {return view('welcome');});
Route::get('/adminpanel/AllUsers', function () {return view('welcome');});
Route::get('/adminpanel/EditUser/{id}', function () {return view('welcome');});
Route::get('/adminpanel/Categories', function () {return view('welcome');});
Route::get('/adminpanel/NewPost', function () {return view('welcome');});
Route::get('/adminpanel/AllPosts', function () {return view('welcome');});
Route::get('/adminpanel/EditPost/{id}', function () {return view('welcome');});
Route::get('/adminpanel/NewPlan', function () {return view('welcome');});
Route::get('/adminpanel/AllPlans', function () {return view('welcome');});
Route::get('/adminpanel/EditPlan/{id}', function () {return view('welcome');});
