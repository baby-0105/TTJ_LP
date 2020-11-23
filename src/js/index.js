/* eslint-disable */

import $ from 'jquery'
import 'slick-carousel';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick.min.js';
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

  let $faqList = $('.p-top-faqSP__list');

  // FAQ：モーダル（PC用）
  for (let i=0; i < $faqList.length; i++) {
    $(document).on('click', function(e) {
      let $faqPCAnswer = $(`#faqPCAnswer${i+1}`),
          $body = $('body');

      if($(e.target).is(`#slick-slide0${i+1}`) || $(e.target).is(`#faqPCTitleQuestion${i+1}`)) {
        $body.addClass('nonScroll');
        $faqPCAnswer.toggleClass('show');
      } else if($(e.target).is('.crossIcon')) {
        $body.removeClass('nonScroll');
        $faqPCAnswer.removeClass('show');
      }
    });
  }

  // FAQ：アコーディオン（スマホ用）
  for(let i=0; i < $faqList.length; i++) {
    let $questionMenu = $(`#questionMenu${i+1}`),
        $questionTitle = $(`#questionTitle${i+1}`);

    $questionMenu.on('click', function() {
      $(this).next().stop().slideToggle();
      $questionTitle.toggleClass('arrowTransform');
    });
  }

  // スライドショー
  $('.slick01').slick({
    // asNavFor: 'nav-dots',
    dots: true,
    slidesToShow: 6,
    slidesToScroll: 6,
    prevArrow: '<button class="slide-arrow prev"></button>',
    nextArrow: '<button class="slide-arrow next"></button>',
    dotsClass: 'slide-dots',
  });
})