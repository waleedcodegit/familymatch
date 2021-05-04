<?php

namespace App\Http\Controllers\Front;
use DateTime;
use Illuminate\Http\Request;
use App\Event;
use DB;
use App\Http\Controllers\Controller;

class EventsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $events =  Event::all();
        return $events;
    }

    public function add_event(Request $request){
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
        

        $dteEnd = new DateTime($request->todate);

        $dteStart   = new DateTime("now");
        $interval = date_diff($dteStart, $dteEnd);
        $date_intervel = (int)$interval->format('%R%a');
        if($date_intervel >= 0){
            $active = 1;
        }else{
            $active = 0;
        }
        $event = new Event();
        $event->title = $request->title;
        $event->description = $request->title;
        $event->cost = $request->cost;
        $event->requirement = $request->req;
        $event->user_id = $request->uid;
        $event->image = $name;
        $event->start = $request->fromdate;
        $event->end = $request->todate ;
        $event->location = $request->title;
        $event->active = $active;
        $event->save();
    }
    public function get_all_events(Request $request){
        $events = DB::table('event')->where('active',1)->get();
        $today_events = [];
        $tomorrow_events = [];
        $upcomming_events = [];
        foreach($events as $e){

            $e->date = date("jS F", strtotime($e->start)) .'-'. date("jS F,Y", strtotime($e->end));
            $today = new DateTime("now");
            $tomorrow = new DateTime("tomorrow");
            $enddate = new DateTime($e->end);
            $startdate = new DateTime($e->start);
            $today_end_intrvl = date_diff($today, $enddate);
            $today_start_intrvl = date_diff($today, $startdate);
            $tomorrow_intrvl = date_diff($tomorrow, $startdate);
            $today_start_interval = (int)$today_start_intrvl->format('%R%a');
            $today_end_interval = (int)$today_end_intrvl->format('%R%a');
            $tomorrow_interval = (int)$tomorrow_intrvl->format('%R%a');
            if($today_start_interval <= 0){
                if($today_end_interval >= 0){
                    array_push($today_events , $e);
                }else{
                    $evnt = Event::find($e->id);
                    $evnt->active = 0;
                    $evnt->save();
                }
            }else{
                    if($tomorrow_interval > 0){
                        array_push($upcomming_events , $e);
                    }else{
                        array_push($tomorrow_events,$e);
                    }
            }

        }
        $response = ['today_events'=> $today_events, 'tomorrow_events'=>$tomorrow_events,
        'upcoming_events'=> $upcomming_events ];
        return $response;
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
