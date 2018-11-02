$('.soc-features__link').eq(1).addClass('is--active');
$('.soc-features__link').on('click', function() {
  event.preventDefault();
  if(!$(this).hasClass('is--active')) {
    $('.soc-features__link').removeClass('is--active');
    $(this).addClass('is--active');
  }
});


