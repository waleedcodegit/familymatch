<?php

namespace App\Http\Controllers\Admin;
use DB;
use App\Post;
use App\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PostsController extends Controller
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

    public function add_category(Request $request){
        $old_cat = DB::table('categories')->where('title',$request->cat)->get();
        if(sizeof($old_cat) > 0){
            return 0;
        }else{
            $cat = new Category();
            $cat->title = $request->cat;
            $cat->slug = str_replace(" ", "-", $request->cat);
            $cat->save();
            return 1;
        }

    }
    public function Update_category(Request $request){
        $old_cat = DB::table('categories')->where('title',$request->cat)->get();
        if(sizeof($old_cat) > 0){
            return 0;
        }else{
            $cat = Category::find($request->cid);
            $cat->title = $request->cat;
            $cat->slug = str_replace(" ", "-", $request->cat);
            $cat->save();
            return 1;
        }

    }
    public function get_categories(){
        $categories = Category::all();
        return $categories; 
    }
    public function get_category_by_id(Request $request){
        $category = Category::find($request->cid);
        return $category;
    }
    public function delete_category(Request $request){
        $category = Category::find($request->cid);
        $category->delete();
    }
    public function addnewpost(Request $request){
      
        $name = '';
        if($request->imageflag == 1){
            if ($request->get('file')) {
                foreach ($request->get('file') as $file) {
                    $name = time() . '.' . explode('/', explode(':', substr($file, 0, strpos($file, ';')))[1])[1];
                    \Image::make($file)->save(public_path('images/').  $name);
                }
            }
        }else{
            $name = 'noimage.png';
        }
        // return $request;
        $post = new Post();
        $post->title = $request->title;
        $post->slug = str_replace(" ", "-", $request->title);
        $post->seo_title = $request->title;
        $post->body= $request->body;
        $post->image = $name;
        $post->cat_id = $request->category;
        $post->active = $request->active;
        $post->save();
        return $post;
    }
    public function get_allposts(){
        $posts = DB::table('posts')->select('posts.id','posts.title','posts.active',
        'posts.image','posts.view','posts.body','posts.created_at','posts.slug')->get();
        return $posts;
    }
    public function get_posts(){
        $posts = DB::table('posts')->where('active',1)->select('posts.id','posts.title','posts.active',
        'posts.image','posts.view','posts.body','posts.created_at','posts.slug')->get();
        return $posts;
    }
    public function get_post_by_id(Request $request){
        $post = Post::find($request->id);
        return $post;
    }

    public function update_post(Request $request){
      
        $name = $request->image_name;
        if($request->imageflag == 1){
            if ($request->get('file')) {
                foreach ($request->get('file') as $file) {
                    $name = time() . '.' . explode('/', explode(':', substr($file, 0, strpos($file, ';')))[1])[1];
                    \Image::make($file)->save(public_path('images/').  $name);
                }
            }
        }
        $post = Post::find($request->id);
        $post->title = $request->title;
        $post->slug = str_replace(" ", "-", $request->title);
        $post->seo_title = $request->title;
        $post->body= $request->body;
        $post->image = $name;
        $post->cat_id = $request->category;
        $post->active = $request->active;
        $post->save();
    }
    public function delete_post(Request $request){
        $post = Post::find($request->id);
        $post->delete();
    }
    public function get_post_by_slug(Request $request){
        $post = DB::table('posts')->where('slug',$request->slug)->get();
        $post = Post::find($post[0]->id);
        $post->view = (int)$post->view + 1;
        $post->save();
        return $post;
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
