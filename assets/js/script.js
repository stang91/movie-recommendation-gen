$(document).ready(function () {
  $('.tabs').tabs({
    swipeable: true,
    responsiveThreshold: Infinity
  });

  // Select all slides
  const slides = document.querySelectorAll(".slide");

  // loop through slides and set each slides translateX property to index * 100% 
  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${indx * 100}%)`;
  });



  // select next slide button
  const nextSlide = document.querySelector(".btn-next");

  // current slide counter
  let curSlide = 0;
  // maximum number of slides
  let maxSlide = slides.length - 1;

  // add event listener and navigation functionality
  nextSlide.addEventListener("click", function () {
    // check if current slide is the last and reset current slide
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    //   move slide by -100%
    slides.forEach((slide, indx) => {
      slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
    });
  });

  // select prev slide button
  const prevSlide = document.querySelector(".btn-prev");

  // add event listener and navigation functionality
  prevSlide.addEventListener("click", function () {
    // check if current slide is the first and reset current slide to last
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }

    //   move slide by 100%
    slides.forEach((slide, indx) => {
      slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
    });
  });
});
$(".dropdown-trigger").dropdown();
//materialize suggested this code for dropdown//




//https://github.com/Dogfalo/materialize/issues/4148
//from CiccaGuru
$(function () {
  resizeTab();
  $(window).resize(function () { resizeTab(); });
});
function resizeTab() {
  var maxHeight = 0;
  $('.carousel-item').each(function () {
    if ($(this).height() > maxHeight) maxHeight = $(this).height();
  });
  $(".tabs-content").css('height', maxHeight + 'px');
}

//materialize template for carousel -- recently viewed
$(document).ready(function () {
  $('.carousel').carousel();
});

// nav slidebar
$(document).ready(function () {
  $('.sidenav').sidenav();
});

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