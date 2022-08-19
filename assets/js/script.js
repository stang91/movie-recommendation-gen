$(document).ready(function(){
  $('.tabs').tabs({
    swipeable: true,
    responsiveThreshold: Infinity 
  });
  // $('.carousel').carousel();
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

// nav slidebar
$(document).ready(function(){
  $('.sidenav').sidenav();
});

//Local Item Storage 
if (sessionStorage.clickcount) {
  sessionStorage.clickcount = Number(sessionStorage.clickcount) + 1;
} else {
  sessionStorage.clickcount = 1;
}
document.getElementById("result").innerHTML = "You have clicked the button " +
sessionStorage.clickcount + " time(s) in this session.";



//Carousel 

// document.addEventListener('DOMContentLoaded', function() {
//   var elems = document.querySelectorAll('.carousel');
//   var instances = M.Carousel.init(elems, options);
// });

  
//  let instance.next(3); // Move next n times.

//  else instance.prev(3); // Move previous n times.



// // Select all slides
// const slides = document.querySelectorAll(".slide");

// // loop through slides and set each slides translateX property to index * 100% 
// slides.forEach((slide, indx) => {
//   slide.style.transform = `translateX(${indx * 100}%)`;
// });


// // select next slide button
// const nextSlide = document.querySelector(".btn-next");

// // current slide counter
// let curSlide = 0;
// // maximum number of slides
// let maxSlide = slides.length - 1;

// // add event listener and navigation functionality
// nextSlide.addEventListener("click", function () {
//   // check if current slide is the last and reset current slide
//   if (curSlide === maxSlide) {
//     curSlide = 0;
//   } else {
//     curSlide++;
//   }

// //   move slide by -100%
//   slides.forEach((slide, indx) => {
//     slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
//   });
// });

// // select prev slide button
// const prevSlide = document.querySelector(".btn-prev");

// // add event listener and navigation functionality
// prevSlide.addEventListener("click", function () {
//   // check if current slide is the first and reset current slide to last
//   if (curSlide === 0) {
//     curSlide = maxSlide;
//   } else {
//     curSlide--
//   }

//   //   move slide by 100%
//   slides.forEach((slide, indx) => {
//     slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
//   });
// });

