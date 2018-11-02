let HEIGHT = parseInt($('.js-hidden-content').css('min-height'));

$('.js-hidden-content').each((index, item) => {

  const currentHeight = $(item).height();

  if(currentHeight > HEIGHT) {

    $(item).addClass('is-hidden');
    $(item).next('.js-show-more').addClass('is-visible');

  } else {

    $(item).removeClass('is-hidden');
    $(item).next('.js-show-more').removeClass('is-visible');

  }

});

$('.js-show-more').on('click', (e) => {

  e.preventDefault();

  const target = e.target || e.srcElement;

  const link = $(target).closest('.js-show-more a');
  const content = $(target).closest('.js-show-more').prev('.js-hidden-content');

  let linkText = link.text().toUpperCase();    
    
  if(linkText === 'ЧИТАТЬ ВЕСЬ ОТЗЫВ') {

    const height = content.prop('scrollHeight');

    linkText = 'Скрыть';
    content.css('height', height);
    
  } else {

    linkText = 'Читать весь отзыв';
    content.css('height', `${HEIGHT}px`);

  };    

  link.text(linkText);

});
