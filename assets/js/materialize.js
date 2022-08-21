$(document).ready(function(){
  $('.tabs').tabs({
    swipeable: true,
    responsiveThreshold: Infinity 
  });
  $('.sidenav').sidenav();
  $(".dropdown-trigger").dropdown();
  $('.carousel').carousel();
});
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



// function myFunction(e) {
//   if (document.querySelector('#noActive a.active') !== null) {
//     document.querySelector('#noActive a.active').classList.remove('active');
//   }
//   e.target.className = "active";
// }
// $("form").on('click',function() {
//   console.log('here')
//   // $("#noActive").removeAttr("class")
// })