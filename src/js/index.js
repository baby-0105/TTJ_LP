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
  $(window).on('scroll', function() {
    const windowHeight        = $(this).height(),
          scrollPosi          = $(this).scrollTop(),
          $aboutServiceText   = $('.p-top-aboutService__text');

    // ウィンドウサイズが 769px以上の場合に有効にしたい処理
    if (window.matchMedia( "(min-width: 769px)" ).matches) {
      $('#aboutService').each(function() {
        const aboutServicePosi = $(this).offset().top;

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
        const aboutServiceImgPosi = $(this).offset().top;

        if (scrollPosi > aboutServiceImgPosi - windowHeight + 300) {
          $(this).addClass('moveAboutServiceImg');
        }
      });
    }

    $('#aboutService').each(function() {
      const aboutServicePosi = $(this).offset().top,
            bgLogoColor      = ['red', 'blue', 'white'];

      if (scrollPosi > aboutServicePosi - windowHeight + 400) {
        for(let i=0; i<bgLogoColor.length; i++) {
          $(`#bgLogo-${bgLogoColor[i]}`).addClass('bgLogoToBig');
        }
      }
    });

    $('#aboutServiceEntryArrow').each(function() {
      const aboutServiceEntryPosi   = $(this).offset().top,
            aboutServiceEntryHeight = $(this).height();

      if(scrollPosi > aboutServiceEntryPosi - windowHeight + 100 &&
      scrollPosi < aboutServiceEntryPosi + aboutServiceEntryHeight - (aboutServiceEntryHeight / 2) - 100){
        $('.aboutServiceEntryArrow').addClass('arrowMoveToRight');
      } else {
        $('.aboutServiceEntryArrow').removeClass('arrowMoveToRight');
      }
    });

    $('#entryArrow').each(function() {
      const entryArrowPosi   = $(this).offset().top,
            entryArrowHeight = $(this).height();

      if(scrollPosi > entryArrowPosi - windowHeight + 100 &&
      scrollPosi < entryArrowPosi + entryArrowHeight - (entryArrowHeight / 2) - 100){
        $('.entryArrow').addClass('arrowMoveToRight');
      } else {
        $('.entryArrow').removeClass('arrowMoveToRight');
      }
    });

    // ファーストビュー fadeIn, fadeOut
    $('#fluffyDisappear').each(function() {
      const aboutServicePosi = $(this).offset().top,
            windowWidth      = $(window).width(),
            spWidth          = 768;

      if (windowWidth > spWidth) {
        if (startPos+500 < scrollPosi) {
          $(this).addClass('disappear');
        } else {
          $(this).removeClass('disappear');
        }
      }else if (windowWidth <= spWidth) {
        $(this).css({
          opacity: 1,
          transform: 'translateY(0)'
        });
      }
    });

    $('#fixed').each(function() {
      const $fixed       = $(this),
            fixPosi      = $fixed.offset().top,
            flowUpPosi   = $('#flowUpToWork').offset().top;

      if (scrollPosi > flowUpPosi - windowHeight + 1200) {
        $fixed.removeClass('fixed');
      } else {
        $fixed.addClass('fixed');
      }
    });
  }); // スクロールイベント終了


  // 「案件を見るボタン」：クリックイベント
  const toProject = (function() {
    const handleClick = (function() {
      $bodyAndHtml.animate({scrollTop: $('#project').offset().top}, 'swing');
    });

    $('#toProjectSP').on('click',handleClick);

    $('#toProjectPC').on('click',handleClick);
  })();

  // FAQ：モーダル（PC用)
  const occurModalEvent = (function() {
    const $faqList = $('.c-modal-faqPC__answerList'),
          $projectModal = $('#projectModal'),
          $bgBlack = $('#bgBlack');

    for (let i = 0; i < $faqList.length; i++) {
      const $faqPCAnswer = $(`#faqPCAnswer${i+1}`),
            $body        = $('body');

      nonScroll(i, $faqPCAnswer, $body);
      scroll(i, $faqPCAnswer, $body);
    }

    // 案件グラフ：モーダル
    for (let i=0; i < 3; i++) {
      let $body = $('body');

      $(`#openPie${i+1}`).on('click',function() {
        $(`#pieFadeIn${i+1}`).fadeIn();
        $projectModal.fadeIn();
        $bgBlack.fadeIn();
        $body.addClass('nonScroll');
      });

      $(`#pieFadeIn${i+1}`).on('click', function() {
        $projectModal.fadeOut();
        $(this).fadeOut();
        $bgBlack.fadeOut();
        $body.removeClass('nonScroll');
      })
    }

    function nonScroll(loop, answer, body) {
      $(`#faqPCQuestionList${loop+1}`).on('click', function() {
        answer.fadeIn();
        $bgBlack.fadeIn();
        $(`#faqPCAnswer`).fadeIn();
        body.addClass('nonScroll');
      });
    }

    function scroll(loop, answer, body) {
      $(`#faqPCAnswer`).on('click', function() {
        answer.fadeOut();
        $bgBlack.fadeOut();
        $(`#faqPCAnswer`).fadeOut();
        body.removeClass('nonScroll');
      })
    }
  })();

  // FAQ：アコーディオン（スマホ用）
  const accordion = (function() {
    const $faqList = $('.c-modal-faqPC__answerList');

    for(let i=0; i < $faqList.length; i++) {
      const $questionMenu  = $(`#questionMenu${i+1}`),
            $questionTitle = $(`#questionTitle${i+1}`);

      arrowTransform($questionMenu, $questionTitle);
    }

    function arrowTransform(menu, title) {
      menu.on('click', function() {
        menu.next().stop().slideToggle();
        title.toggleClass('arrowTransform');
      });
    }
  })();


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