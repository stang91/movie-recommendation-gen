$(document).ready(function(){
  $('.tabs').tabs({
    swipeable: true,
    responsiveThreshold: Infinity 
  });
});
$(".dropdown-trigger").dropdown();
//materialize suggested this code for dropdown//




//https://github.com/Dogfalo/materialize/issues/4148
//from CiccaGuru
$(function(){
  resizeTab();
  $( window ).resize(function() { resizeTab(); });
});
function resizeTab(){
  var maxHeight = 0;
  $('.carousel-item').each(function(){ 
       if($(this).height() > maxHeight) maxHeight = $(this).height(); 
  });
  $(".tabs-content").css('height',maxHeight+'px');
}

//materialize template for carousel -- recently viewed
$(document).ready(function(){
  $('.carousel').carousel();
});

// nav slidebar
$(document).ready(function(){
  $('.sidenav').sidenav();
});

