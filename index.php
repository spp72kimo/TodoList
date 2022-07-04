<!DOCTYPE html>
<html lang="zh-Hans-TW">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="To DO List" content="TO do list">
    <title>To Do List</title>
    <link rel="stylesheet" href="./styles/style.css">
    <!-- Bootstrap -->
    <link rel="stylesheet" integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor" crossorigin="anonymous" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css">
  </head>
  <body>
    <div class="app">
    <div class="container"> 
      <div class="logo"> 
        <h1>To Do List.</h1>
      </div>
         <div class="input_div mb-2"> 
            <input class="form-control" type="text" name="event" placeholder="What needs to be done?">
        </div>
        <div class="controller d-flex justify-content-between align-items-center">
            <div class="view_control"> 
                <ul class="nav nav-tabs view_control">
                    <li> <span class="nav-link view_all active">All</span></li>
                    <li> <span class="nav-link view_active">Active</span></li>
                    <li> <span class="nav-link view_complete">Complete</span></li>
                </ul>
            </div>
            <div class="count me-2">
            </div>
        </div>
      <div class="list"> 
        <ul class="list-group"> 
        </ul>
      </div>
      <div class="event_controller d-flex justify-content-between align-items-center">
        <div class="select_all">
            <!-- <span class="select_btn">select all</span> -->
        </div>
        <div class="clear_all">
            <!-- <span class="clear_btn">clear complete</span> -->
        </div>
      </div>
    </div>
</div>
    <!-- Bootstrap -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js">     </script>
    <!-- jQuery -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
</body>
<script src="./index.js"></script>
</html>