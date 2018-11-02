import PerfectScrollbar from 'perfect-scrollbar';
import saveData from './helpers/_saveData.js';
import getData from './base/_getData.js';
import initSelectors from './form/_initSelectors.js';
import Select from './form/_select.js';

const DATA = new saveData();

const types = {

  values: [
    'regions',
    'equipment',
    'special-equipment',
    'special-equipment-models'
  ],
  keys: [
    'cars',
    'transport'
  ]

};

const insertData = {

  values: (data, type) => {

    $(`select[data-name="${type}"]`).each((index, item) => {

      $.each(data[`${type}`], (index, option) => {

        $(item).append(`
          <option value="${option}">${option}</option>
        `);

      });

    });

    $(`select[data-name="${type}"]`).prepend('<option value="" selected="selected"> </option>');

  },

  keys: (data, type) => {

    const select = $(`select[data-name="${type}"]`);

    $(select).each((index, item) => {

      for(let key in data) {

        $(item).append(`
          <option value="${key}">${key}</option>
        `);

      };

    });

    $(`select[data-name="${type}"]`).prepend('<option value="" selected="selected"> </option>');

  },

  updateOptions: (element, value, type) => {

    const select = element.find('select');
    const container = element.find('.select__options');
    container.html('');
    select.html('');

    const data = DATA.getData()[`${type}`];
    const options = data[`${value}`];

    $.each(options, (index, item) => {

      select.append(`<option value="${item}">${item}</option>`);
      container.append(`<li class="select__option" data-value="${item.toUpperCase()}">${item}</li>`);

    });

    // select.prepend('<option value="" selected="selected"> </option>');

  },

  frp: (element, value) => {

    const currentElement = $(element);

    const select = currentElement.find('select');
    const container = currentElement.find('.select__options');

    const data = DATA.getData()['frp'];

    for(let key in data) {

      select.append(`<option disabled>${key}</option>`);
      container.append(`<li class="select__option select__option_disabled">${key}</li>`);

      const options = data[key];

      $.each(options, (index, item) => {

        select.append(`<option value="${item}">${item}</option>`);
        container.append(`<li class="select__option" data-value="${item.toUpperCase()}">${item}</li>`);

      });

    }

    select.prepend('<option value="" selected="selected"> </option>');

    return;

  }

};

const insertOptions = () => {

  const data = DATA.getData();

  types['values'].forEach((item) => {

    insertData.values(data, item);

  });

  types['keys'].forEach((item) => {

    const currentList = data[`${item}`];
    insertData.keys(currentList, item);

  });

};

getData((data) => {

  DATA.setData(data);
  insertOptions();
  initSelectors();

});

const addListeners = (item) => {

  $(item).bind('DOMNodeInserted', (e) => {

    if(!$(item).hasClass('is-selected')) return;

    const header = $(item).data().selectType;
    const dataType = $(item).data().select;
    const value = $(item).find('option:selected').val();

    const insertElement = $(`[data-set-options="${dataType}"]`);

    insertElement.removeClass('is-selected');
    insertElement.find('.select__header').text(header);
    insertElement.find('select').html(`
      <option default disabled="true">${header}</option>
    `);

    insertData.updateOptions(insertElement, value, dataType);

  });

};

$('.js-get-options').each((index, item) => {

  addListeners(item);

});

const hideInput = $('.input_hide')[0].outerHTML;
const hideSelect = $('.select_hide')[0].outerHTML;

$('.js-special-offer').on('click', (e) => {

  const target = e.target || e.srcElement;
  const data = $(target).data();

  const title = data.modalHeader;
  const type = data.modalSelect;
  const offerType = data.offerType;

  const modal = $("[data-modal='special-offer']");
  modal.find('.modal__content .title_h4').text(`Спецпрограмма для ${title}`);

  const form = modal.find('.form');
  const formInner = form.find('.form__in');

  form.find('.select_hide').remove();
  form.find('.input_hide').remove();

  if(offerType === 'none') {

    $(formInner).prepend(`${hideInput}`);
    return;

  }
  $(formInner).prepend(`${hideSelect}`);

  const select = $(`select[data-name="${type}"]`).closest('.select');
  const selectElem = document.querySelector(`select[data-name="${type}"]`).parentElement;

  new Select(selectElem, '.select').init();

  if(offerType === 'frp') {

    insertData.frp(select, offerType);
    return;

  }

  select.removeClass('is-selected');
  select.removeClass('is-active');

  select.find('.select__header').text('Выбрать');
  insertData.updateOptions(select, offerType, type);

});

const insertSelectData = {
  addListeners
};

module.exports = insertSelectData;
