$('.graphic__content').eq(2).addClass('is--active');
$('.graphic__build').eq(2).addClass('is--active');
$('.graphic__build').on('click', function() {
  if (!$(this).hasClass('is--active')) {
  	var index = $(this).index();
  	$('.graphic__build').removeClass('is--active');
  	$(this).addClass('is--active');
  	$('.graphic__content').removeClass('is--active');
  	$('.graphic__content').eq(index).addClass('is--active');
  }
});
