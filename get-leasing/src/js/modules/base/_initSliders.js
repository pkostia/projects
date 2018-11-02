import slick from 'slick-carousel';

const initSliders = () => {

  const sliders = $('.slider');

  $.each(sliders, (index, item) => {

    if($(item).hasClass('slider_icons')) return;

    const currentItem = $(item);
  	const slider = currentItem.find('.slider__in');
  	const arrowNext = currentItem.find('.slider__arrow_next');
  	const arrowPrev = currentItem.find('.slider__arrow_prev');

  	$(slider).slick({
  		prevArrow: arrowNext,
  		nextArrow: arrowPrev
  	});

  });
	
};

module.exports = initSliders;
