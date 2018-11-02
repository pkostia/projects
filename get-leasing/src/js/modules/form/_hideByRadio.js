$('.js-hideRadio').each((index, item) => {

  $(item).on('click', (e) => {

  	$('.js-hide-element').each((index, item) => {

  		$(item).css('display', 'block');

  	});

  	const selector = $(item).data().hide;
  	const radioBtn = $(item).find('input[type="radio"]');

  	if(radioBtn.is(':checked')) {
  		
  		$(`[data-hide-element="${selector}"]`).css('display', 'none');

  	} else {

  		$(`[data-hide-element="${selector}"]`).css('display', 'block');
  		
  	}

  });

});
