import PerfectScrollbar from 'perfect-scrollbar';
import validation from './form/_validation.js';
import Select from './form/_select.js';
import initializeRange from './form/_range.js';
import insertSelectData from './_insertSelectData.js';
import offScroll from './helpers/_offScroll.js';

const initScrollbar = (item) => {

  new PerfectScrollbar(item, {
    wheelSpeed: 5,
    minScrollbarLength: 60,
    maxScrollbarLength: 60

  });

};

const setValues = (formData) => {

  $.each(formData, (index, item) => {

  	const name = item['name'];
  	const value = item['value'];

  	$(`[data-result="${name}"]`).text(`${value}`);

  });

};

const addListeners = (newForm) => {

  newForm.find('.select').each((index, item) => {

  	new Select(item, '.select').addListeners();

  });

  newForm.find('.range__item').each((index, item) => {

  	const rangeItem = $(item);

    $(item).find('.noUi-base').remove();

  	rangeItem.removeClass('.noUi-target');
  	rangeItem.removeClass('.noUi-ltr');
  	rangeItem.removeClass('.noUi-horizontal');

    const defaultValue = $(item).siblings('.range__value').text().split(' ')[0];
  	initializeRange(item, defaultValue);

  });

  newForm.find('.js-get-options').each((index, item) => {

  	insertSelectData.addListeners(item);

  });

};

$('.js-enable-el').on('click', (e) => {
  let el = $(e.target).data('enabled-el');
  console.log(el);
  if ($('.'+ el).attr('disabled')) {
    $('.'+ el).removeAttr('disabled');
  }

});

$('.js-disable-el').on('click', (e) => {
  let el = $(e.target).data('disabled-el');
  console.log(el);
  if (!$('.'+ el).attr('disabled')) {
    $('.'+ el).attr('disabled', true);
  }
});

$('.js-next-step').on('click', (e) => {

  e.preventDefault();






  const target = e.target || e.srcElement;
  validation.validate(e);

  const form = $(target).closest('form');

  if(form.hasClass('is-error')) return;

  offScroll();

  const formHTML = $(target).closest('.form').html();
  const formData = form.serializeArray();

  const newForm = $('[data-step="form"] > .form');

  newForm.html(formHTML);
  newForm.find('[data-modal-link="step-2"]').remove();

  addListeners(newForm);
  setValues(formData);

  const modal = $(target).data().modalLink;
  $(`[data-modal="${modal}"]`).addClass('is-active');

  $('body').addClass('is-modal-open');

});

$('.js-back-to-step').on('click', (e) => {

  const target = e.target || e.srcElement;

  const formData = $('[data-step="form"] > form').serializeArray();
  setValues(formData);

  $('[data-step="preview"]').toggleClass('is-hidden');
  $('[data-step="form"]').toggleClass('is-hidden');

});
