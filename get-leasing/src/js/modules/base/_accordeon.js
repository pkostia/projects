const accordeon = () => {

  // const accordeonHeaders = $('.questions__header');
  const accordeonHeaders = $('.js-accordeon-btn');

  accordeonHeaders.each((index, item) => {

    $(item).on('click', (e) => {

    	const target = e.target || e.srcElement;
    	const accordeon = $(target).closest('.js-accordeon');
      const hiddenItem = accordeon.find('.js-accordeon-hidden');
      const header = accordeon.find('.js-accordeon-btn');
      const headerHeight = header.outerHeight();

      if($(item).closest('.questions__item').hasClass('is-active')) {

        $(item).closest('.questions__item').removeClass('is-active');
        accordeon.height(`${headerHeight}px`);
        return;

      }

      const itemHeight = accordeon.outerHeight();
      const hiddenHeight = hiddenItem.outerHeight();
      
      $('.js-accordeon').each((index, item) => {
        
        $(item).removeClass('is-active');
        $(item).height(`${headerHeight}px`);

      });

    	accordeon.addClass('is-active');
      accordeon.height(`${hiddenHeight + itemHeight}px`);

    });

  });

};

module.exports = accordeon;
