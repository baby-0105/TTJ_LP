/* eslint-disable */

import $ from 'jquery'
import router from './modules/Router'
import '../scss/app.scss'

$(() => {
  let $bodyAndHtml = $('body, html');

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