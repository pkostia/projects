import PerfectScrollbar from 'perfect-scrollbar';
import offScroll from './../helpers/_offScroll.js';

const modalActions = {

  open: (modal) => {
    modal.addClass('is-active');
    offScroll();
  },
  close: (modal) => {
    modal.removeClass('is-active');
    $(window).unbind('scroll');
  }

};

const initScrollbars = () => {

  const container = $('.modal');

  $.each(container, (index, item) => {

    new PerfectScrollbar(item, {
      wheelSpeed: 5,
      minScrollbarLength: 200,
      maxScrollbarLength: 400
    });

  });

};

const modals = () => {

  const modalLinks = $('.js-modal-link');

  $.each(modalLinks, (index, item) => {

    const currentItem = $(item);

  	currentItem.on('click', (e) => {

  		e.preventDefault();

	    const currentModal = $(`[data-modal="${$(item).data().modallink}"]`);
	    modalActions.open(currentModal);

      $('body').addClass('is-modal-open');

    });

  });

  const closeModals = $('.modal__close');

  $.each(closeModals, (index, item) => {

    const currentItem = $(item);

  	currentItem.on('click', (e) => {

  		e.preventDefault();

  		const target = e.target || e.srcElement;
  		const currentModal = $(target).closest('.modal');

  		modalActions.close(currentModal);

      $('body').removeClass('is-modal-open');

  	});

  });

};

const initModals = () => {

  modals();
  initScrollbars();

};
// jQuery(function($) {
//   $(document).mouseup(function(e) { // событие клика по веб-документу
//     var div = $('.modal__content'); // тут указываем ID элемента
//     if (!div.is(e.target) // если клик был не по нашему блоку
//         && div.has(e.target).length === 0) { // и не по его дочерним элементам
//       div.hide(); // скрываем его
//     }
//   });
// });
module.exports = initModals;
