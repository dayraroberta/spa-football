page('/', index);
page('/about', about);
page();

function index(){
  $("main").html(renderIndex());
}

function about(){
  $("main").html(renderAbout());
}
