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

    // ウィンドウサイズが 769px以上の場合に有効にしたい処理
    if (window.matchMedia( "(min-width: 769px)" ).matches) {
      $('#aboutService').each(function() {
        let aboutServicePosi = $(this).offset().top;

        if (scrollPosi > aboutServicePosi - windowHeight + 400) {
          for(let i=0; i<$aboutServiceText.length; i++) {
            let delayTime = ['0', '500', '1000', '1500'];

            $(`#aboutServiceText${i+1}`).delay(delayTime[i]).queue(function() {
              $(this).addClass('textVisible');
            })
          }
        }
      });

      $('#aboutServiceImg').each(function() {
        let aboutServiceImgPosi = $(this).offset().top;

        if (scrollPosi > aboutServiceImgPosi - windowHeight + 300) {
          $(this).addClass('moveAboutServiceImg');
        }
      });
    }

    $('#aboutService').each(function() {
      let aboutServicePosi = $(this).offset().top,
          bgLogoColor = ['red', 'blue', 'white'];

      if (scrollPosi > aboutServicePosi - windowHeight + 400) {
        for(let i=0; i<bgLogoColor.length; i++) {
          $(`#bgLogo-${bgLogoColor[i]}`).addClass('bgLogoToBig');
        }
      }
    });

    $('#aboutServiceEntryArrow').each(function() {
      let aboutServiceEntryPosi = $(this).offset().top,
          aboutServiceEntryHeight = $(this).height();

      if(scrollPosi > aboutServiceEntryPosi - windowHeight + 100 &&
      scrollPosi < aboutServiceEntryPosi + aboutServiceEntryHeight - (aboutServiceEntryHeight / 2) - 100){
        $('.aboutServiceEntryArrow').addClass('arrowMoveToRight');
      } else {
        $('.aboutServiceEntryArrow').removeClass('arrowMoveToRight');
      }
    });

    $('#entryArrow').each(function() {
      let entryArrowPosi = $(this).offset().top,
      entryArrowHeight = $(this).height();

      if(scrollPosi > entryArrowPosi - windowHeight + 100 &&
      scrollPosi < entryArrowPosi + entryArrowHeight - (entryArrowHeight / 2) - 100){
        $('.entryArrow').addClass('arrowMoveToRight');
      } else {
        $('.entryArrow').removeClass('arrowMoveToRight');
      }
    });

    // ファーストビュー fadeIn, fadeOut
    $('#fluffy_disappear').each(function() {
      let aboutServicePosi = $(this).offset().top,
          windowWidth      = $(window).width(),
          smWidth          = 768;

      if (windowWidth > smWidth) {
        if (startPos+250 < scrollPosi) {
          $(this).addClass('disappear');
        } else {
          $(this).removeClass('disappear');
        }
      }else if (windowWidth <= smWidth) {
        $(this).css({
          opacity: 1,
          transform: 'translateY(0)'
        });
      }
    });

    // ファーストビュー: position fixed 対象範囲
    const firstviewFixed = (function() {
      const $fixed             = $('#fixed'),
            $aboutService      = $('#aboutService'),
            aboutServicePosi   = $aboutService.offset().top,
            aboutServiceHeight = $aboutService.height(),
            aboutServiceWidth = $aboutService.width();

      if(scrollPosi > aboutServicePosi + (aboutServiceHeight / 2) - 100) {
        $fixed.removeClass('fixed');
      } else {
        $fixed.addClass('fixed');
      }

      if (aboutServiceWidth <= 768) {
        if(scrollPosi > aboutServicePosi + (aboutServiceHeight / 2) + 450) {
          $fixed.removeClass('fixed');
        } else {
          $fixed.addClass('fixed');
        }
      }

      // もうちょっと背景色がふわ～っと白に変化するようにしたい
    })();
  });

  // 「案件を見るボタン」：クリックイベント
  $('#toProjectSP').on('click', function() {
    $bodyAndHtml.animate({scrollTop: $('#project').offset().top}, 'swing');
  });

  $('#toProjectPC').on('click', function() {
    $bodyAndHtml.animate({scrollTop: $('#project').offset().top}, 'swing');
  });

  // FAQ：モーダル（PC用）
  let $faqList = $('.p-top-faqPC__answerList');

  for (let i=0; i < $faqList.length; i++) {
    let $faqPCAnswer = $(`#faqPCAnswer${i+1}`),
        $body = $('body');

    $(`#faqPCQuestionList${i+1}`).on('click', function() {
      $faqPCAnswer.fadeIn();
      $body.addClass('nonScroll');
    })

    $(`#faqPCAnswer${i+1}, #footer`).on('click', function() {
      $faqPCAnswer.fadeOut();
      $body.removeClass('nonScroll');
    })
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

  // 案件: スライドショー
  $('.p-top-project__list').slick({
    dots: true,
    slidesToScroll: 1,
    slidesToShow: 3,
    centerMode: true,
    autoplay: true,
    autoplaySpeed: 4000,
    prevArrow: '<button class="slide-arrow prev"></button>',
    nextArrow: '<button class="slide-arrow next"></button>',
    dotsClass: 'slide-dots',
    responsive: [
      {
      breakpoint: 1300,
      settings: {
        slidesToShow: 3,
        centerMode: false,
      }},
      {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
      }},
      {
      breakpoint: 950,
      settings: {
        slidesToShow: 2,
        centerMode: false,
        dots :false,
      }},
      {
      breakpoint: 500,
      settings: {
        slidesToShow: 1,
        centerMode: false,
        dots: false,
      }}
    ],
  });
})