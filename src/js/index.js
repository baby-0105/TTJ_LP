/* eslint-disable */

import $ from 'jquery'
import 'slick-carousel';
import 'slick-carousel/slick/slick.min.js';
import router from './modules/Router'
import '../scss/app.scss'

$(() => {

  let $bodyAndHtml = $('body, html'),
      startPos     = $(window).scrollTop(); // 元の位置を取得


  // スクロールイベント
  $(window).scroll(function() {
    let windowHeight  = $(this).height(),
        scrollPosi    = $(this).scrollTop(),
        $aboutServiceText = $('.p-top-aboutService__text');

    $('#aboutService').each(function() {
      let aboutServicePosi = $(this).offset().top;

      if (scrollPosi > aboutServicePosi - windowHeight + 600) {
        for(let i=0; i<$aboutServiceText.length; i++) {
          let delayTime = ['0', '500', '1000', '1500'];

          $(`#aboutServiceText${i+1}`).delay(delayTime[i]).queue(function() {

            $(this).addClass('textVisible');
          })
        }

        $('#aboutServiceImg').addClass('moveAboutServiceImg');
      }
    });

    $('#aboutServiceEntryArrow').each(function() {
      let aboutServiceEntryBlockPosi = $(this).offset().top;

      if (scrollPosi > aboutServiceEntryBlockPosi - windowHeight + 150) {
        $(this).addClass('extendArrow1');
        $(this).delay(1200).queue(function() {
          $(this).addClass('extendArrow2');
        })
      }
    });

    // ファーストビュー fadeIn&fadeOut
    $('#fluffy_disappear').each(function() {
      let aboutServicePosi = $(this).offset().top;

      if (startPos+400 < scrollPosi) {
        $(this).addClass('disappear');
      } else {
        $(this).removeClass('disappear');
      }
    });
  });

  // 「案件を見るボタン」：クリックイベント
  $('#toProject').on('click', function() {
    $bodyAndHtml.animate({scrollTop: $('#project').offset().top}, 'swing');
  });


  // FAQ：モーダル（PC用）
  let $faqList = $('.p-top-faqSP__list');

  for (let i=0; i < $faqList.length; i++) {
    $(document).on('click', function(e) {
      let $faqPCAnswer = $(`#faqPCAnswer${i+1}`),
          $body = $('body');

      if($(e.target).is(`#slick-slide0${i+1}`) || $(e.target).is(`#faqPCTitleQuestion${i+1}`)) {
        $body.addClass('nonScroll');
        $faqPCAnswer.toggleClass('show');
      } else if($(e.target).is(`#bgBlack`) || $(e.target).is(`.l-footer`)
      || $(e.target).is(`.p-top-faqPC__crossIcon`) || $(e.target).is(`.crossIcon`)) { // ※リファクタリングの余地あり
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

  // 案件 スライドショー
  $('.p-top-project__list').slick({
    dots: true,
    slidesToScroll: 1,
    slidesToShow: 3,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 4000,
    // swipe: true,
    prevArrow: '<button class="slide-arrow prev"></button>',
    nextArrow: '<button class="slide-arrow next"></button>',
    dotsClass: 'slide-dots',
    responsive: [
      {
      breakpoint: 950,
      settings: {
          slidesToShow: 2,
      }},
      {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      }}
    ],
  });
})