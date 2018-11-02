const toTopBtn = $('.to-top');

$(document).scroll((e) => {

  let scroll = $(window).scrollTop();

  if((scroll >= 100)&&($(toTopBtn).hasClass('is-visible'))) return;

  (scroll >= 100) ? $(toTopBtn).addClass('is-visible') : $(toTopBtn).removeClass('is-visible');

});

$('.to-top').on('click', () => {

  $('html, body').animate({ scrollTop: 0 }, 'slow');

});
