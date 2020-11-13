import $ from 'jquery'
import router from './modules/Router'
import '../scss/app.scss'

$(() => {
  $('#fade-in-up').css('visibility','hidden');
$(window).scroll(function(){
 var windowHeight = $(window).height(),
     topWindow    = $(window).scrollTop();

 $('#fade-in-up').each(function(){
  var targetPosition = $(this).offset().top;
  
  if(topWindow > targetPosition - windowHeight + 100){
   $(this).addClass("fadeInDown");
  }
 });
});
})
