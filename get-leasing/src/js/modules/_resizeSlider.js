import slick from 'slick-carousel';
import breakpoints from './_consts.js';

let slickSlider = null;

const sliderWrapper = $('.slider_icons .slider__in');

const sizing = {
  max: {
  	total: '20',
  	inRow: '5'
  },
  medium: {
  	total: '12',
  	inRow: '3'
  },
  small: {
  	total: '10',
  	inRow: '5'
  }
};

const generateSlides = (items, size, callback) => {

  const pages = Math.ceil(items.length / size.total);
  const html = document.createElement('div');

  let currentCount = 0;
  let total = parseInt(size.total);

  for (let i = pages - 1; i >= 0; i--) {

  	const slide = $('<div></div>');
  	$(slide).addClass('slider__slide');
  	$(slide).append('<div class="icons-slide"></div>');

  	const wrapper = $(slide).find('.icons-slide');

  	for (let k = total - 1; k >= 0; k--) {

  		wrapper.append(items[currentCount]);
  		currentCount++;

  		if(k === 1) {

  			$(slide).append(wrapper);
  			$(html).append(slide);

  		}

      if(currentCount === items.length) {

        $(slide).append(wrapper);
        $(html).append(slide);

        sliderWrapper.html('');
        sliderWrapper.html(html.innerHTML);
        
        callback();

        return false;
      }

  	}

  }

};

const getAndSetSliderData = (callback) => {

  if(slickSlider !== null) {
  	slickSlider.slick('unslick');
  }

  const documentWidth = $(document).width();

  if(documentWidth <= breakpoints[2]) return;

  const items = $('* .icons-slide__item');
  

  // .slider__slide > .icons-slide > items
  // first - slide

  if(documentWidth <= breakpoints[1]) {

  	generateSlides(items, sizing['small'], callback);

  } else if (documentWidth <= breakpoints[0]) {

  	generateSlides(items, sizing['medium'], callback);

  } else {

  	generateSlides(items, sizing['max'], callback);

  }

};

const initSlider = () => {

  const currentItem = $('.slider_icons');
  const slider = currentItem.find('.slider__in');
  const arrowNext = currentItem.find('.slider__arrow_next');
  const arrowPrev = currentItem.find('.slider__arrow_prev');

  slickSlider = $(slider).slick({
    prevArrow: arrowNext,
    nextArrow: arrowPrev
  });

};

const resizeSlider = (e) => {

  getAndSetSliderData(() => {
  	initSlider();
  });

};

const addListeners = () => {

  $.each(breakpoints, (index, item) => {

    (window.matchMedia(`(max-width: ${item}px)`)).addListener(resizeSlider);

  });

};

getAndSetSliderData(() => {
  initSlider();
});
addListeners();
