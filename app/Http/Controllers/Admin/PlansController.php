<?php

namespace App\Http\Controllers\Admin;
use DB;
use App\Plan;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class PlansController extends Controller
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

    public function get_plans(){
        $plans = Plan::all();
        return $plans;
    }

    public function newplan(Request $request){
        $new_plan = new Plan();
        $new_plan->title = $request->title;
        $new_plan->price = $request->price;
        $new_plan->limit = $request->limit;
        $new_plan->discription = $request->disc;
        $new_plan->save();
    }

    public function get_plan_by_id(Request $request){
        $plan = Plan::find($request->id);
        return $plan;
    }
    public function updateplan(Request $request){
        $new_plan = Plan::find($request->id);
        $new_plan->title = $request->title;
        $new_plan->price = $request->price;
        $new_plan->limit = $request->limit;
        $new_plan->discription = $request->disc;
        $new_plan->save();
    }
    public function delete_plan(Request $request){
        $plan = Plan::find($request->id);
        $plan->delete();
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
