/* eslint-disable */

import $ from 'jquery'
import router from './modules/Router'
import '../scss/app.scss'

$(() => {
  let $bodyAndHtml = $('body, html');

  // スクロールイベント
  $(window).scroll(function() {
    let windowHeight = $(window).height()   ,
        scrollPosi   = $(window).scrollTop();

    // ①underline：伸びる ②TTJロゴ：fadeIn ③bgcolor：大きく濃くなる
    $('#aboutService').each(function() {
      let aboutServicePosi = $(this).offset().top;

      if (scrollPosi > aboutServicePosi - windowHeight + 150) {
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

  // 「案件を見るボタン」：クリックイベント
  $('#toProject').on('click', function() {
    let headerHeight = $('#header').innerHeight(); //innerHeight() → paddingも含めた高さ

    $bodyAndHtml.animate({scrollTop: $('#project').offset().top - headerHeight}, 'swing');
  });

  // FAQ：アコーディオン
  for(let i=0; i<3; i++) {
    $(`#questionMenu${i+1}`).on('click', function() {
      $(this).next().stop().slideToggle();
      $(`#questionTitle${i+1}`).toggleClass('arrowTransform');
    });
  }

})