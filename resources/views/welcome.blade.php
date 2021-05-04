
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-tocken" content="{{csrf_token()}}">
        <title>Family Match</title>
       
        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

        <!-- Styles -->
        <link rel="stylesheet"type="text/css" href="{{asset('css/app.css')}}">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"/>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    </head>
    <body>
        <div >
            <div id="root">
         
            </div>

        </div>
        <script>
        window.csrfToken = "{{ csrf_token() }}";
        </script>
        <script src="{{asset('js/jquery.slim.min.js')}}" crossorigin="anonymous"></script>
        <script type="text/javascript" src ="{{asset('js/app.js')}}"></script>
        <script src="{{asset('js/popper.min.js')}}"></script>
        <!-- <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script> -->
        <script src="{{asset('css/bootstrap.min.css')}}" crossorigin="anonymous"></script>
        <script src="{{asset('js/moment.min.js')}}"></script>
    </body>
</html>
