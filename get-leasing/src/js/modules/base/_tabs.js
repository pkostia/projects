$('.js-tab').on('click', (e) => {

  e.preventDefault();
  e.stopPropagation();

  const target = e.target || e.srcElement;
  const wrapper = $(target).closest('.js-tabs-wrapper');

  wrapper.find('> .js-tab').each((index, item) => {
  	$(item).removeClass('is-active');
  });

  const tab = $(target).closest('.js-tab');

  tab.addClass('is-active');

  const tabData = tab.data();
  const blockName = tabData['tab'];
  const blockIndex = tabData['tabIndex'];

  if(blockName === 'transport') {

  	tab.find('.programs__type').each((index, item) => {

  		if(index === 0) {

  			$(item).addClass('is-active');

  			const tabData = $(item).data();
  			const blockName = tabData['tab'];
  			const blockIndex = tabData['tabIndex'];

  			$(`[data-${blockName}]`).each((index, item) => {

  				$(item).removeClass('is-visible');

  			});

  			$(`[data-${blockName}="${blockIndex}"]`).addClass('is-visible');

  		} else {

  			$(item).removeClass('is-active');
        
  		}

  	});

  }

  $(`[data-${blockName}]`).each((index, item) => {

  	$(item).removeClass('is-visible');

  });

  $(`[data-${blockName}="${blockIndex}"]`).addClass('is-visible');

});
