/* eslint-disable */

import $ from 'jquery'
import router from './modules/Router'
import '../scss/app.scss'

$(() => {
  // var $bodyAndHtml = $('body, html'),
  //     $body = $('body');

  // スクロールイベント
  $(window).scroll(function() {
    let windowHeight = $(window).height(),
        scrollPosi = $(window).scrollTop();

    // ①underline：伸びる ②TTJロゴ：fadeIn ③bgcolor：大きく濃くなる
    $('#aboutService').each(function() {
      let aboutServicePosi = $(this).offset().top;

      if (scrollPosi > aboutServicePosi - windowHeight + 150){
        $('#extendUnderline').addClass('extendUnderline');

        for(let i=0; i<3; i++) {
          let delayTime = ['0', '500', '1000'];

          $(`#fadeLogoInitial${i+1}`).delay(delayTime[i]).queue(function() {
            $(this).addClass('fadeLogoInitial');
          })
        }

        $(this).addClass('toDarkBgColor');
      }
    })
  });

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
