import noUiSlider from 'nouislider';

const values = {

  'percents' : {
    type: '%',
    val: [5, 10, 20, 30, 40, 50]
  },
  'years' : {

    naming: {
      1: 'год',
      2: 'года',
      3: 'года',
      4: 'года',
      5: 'лет'
    },
    val: [1, 2, 3, 4, 5]
  }  
};

const initRangeValues = (item, type) => {

  const container = $(item).closest('.range').find('.range__values');
  container.html(''); 

  $(values[`${type}`].val).each((index, item) => {

    container.append(`<div class="range__val">${item}</div>`);

  });

};

const initializeRange = (item, startsFrom) => {

  const maxValue = $(item).data('max');
  const minValue = $(item).data('min');
  const step = $(item).data('step');
  const type = $(item).data('type');

  initRangeValues(item, type);

  noUiSlider.create(item, {
    animate: true,
    animationDuration: 300,
    start: startsFrom,
    connect: [true, false],
    step: step,
    range: {
      min: minValue,
      max: maxValue
    }
  });

  item.noUiSlider.on('update', ( value, handle ) => {

    let val = parseInt(value);
    let txt = null;

    if(type === 'percents') {

      if(val === 0) {
        val = 5;
      }
      txt = values['percents'].type;

    } else {

      txt = values['years'].naming[`${val}`];

    }
    
    const rangeWrapp = $(item).closest('.range');
    rangeWrapp.find('.range__value').html(`${val} <span>${txt}</span>`);
    rangeWrapp.find('input').attr('value', `${val} ${txt}`);

  }); 

};

$('.range__item').each((index, item) => {

  const startsFrom = $(item).data('start');
  initializeRange(item, startsFrom);

});

module.exports = initializeRange;
