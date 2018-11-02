$('.special-offers__item').on('click', (e) => {

  const target = e.target || e.srcElement;
  const wrapper = $(target).closest('.special-offers__item');

  if($(target).hasClass('js-modal-link')) {
  	return;
  }

  if(wrapper.hasClass('is-active')) {

  	wrapper.removeClass('is-active');
  	return;

  }

  $('.special-offers__item').each((index, item) => {

  	$(item).removeClass('is-active');

  });

  wrapper.addClass('is-active');

});
