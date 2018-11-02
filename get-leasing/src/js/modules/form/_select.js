import PerfectScrollbar from 'perfect-scrollbar';

export default function Select(element, selector) {

  this.element = element;
  this.selector = selector;

  let scroll = null;

  const generateHTML = () => {

  	const wrapper = element;
  	let title = null;

  	wrapper.innerHTML += '<div class="select__header"></div>';
  	wrapper.innerHTML += `
  	<div class="select__container">
  		<ul class="select__options"></ul>
  	</div>`;

  	const header = wrapper.querySelector('.select__header');
  	const optionsWrapper = wrapper.querySelector('.select__options');

  	const options = wrapper.querySelectorAll('option');

  	Array.from(options).forEach((item) => {

  		if(item.disabled) {

        if($(wrapper).find('select').attr('required')) {
          title = item.innerHTML += ' <span>*</span>';
        } else {
          title = item.innerHTML;
        }

  			header.innerHTML = title;
  		} else {

  			let value = item.innerHTML;

        if(value.length <= 1) return;

  			optionsWrapper.innerHTML += `
				<li class="select__option" data-value="${value.toUpperCase()}">${value}</li>
  			`;
  		}

  	});

  };

  const closeAllSelects = () => {

  	const selects = document.querySelectorAll(`${this.selector}`);

  	Array.from(selects).forEach((item) => {
  		item.classList.remove('is-active');
  	});

  };

  const listener = (e) => {

    // check is empty
    if ($(this.element).find('.select__options > *').length === 0) return;

    const target = e.target || e.srcElement;

    if(target.className !== 'ps__thumb-y') {

      if($(this.element).hasClass('is-active')) {

        $(this.element).removeClass('is-active');

      } else {

        closeAllSelects();

        $(this.element).addClass('is-active');
        scroll.update();

      }

      if(target.closest('.select__option')) {

        const value = target.closest('.select__option').innerHTML;

        setOptionToChecked(value);

        const title = element.querySelector('.select__header');

        $(this.element).addClass('is-selected').removeClass('is-error');
        $(title).text(value);

        $(this.element).removeClass('is-active');

      }
    }

  };

  const setOptionToChecked = (option) => {

    const wrapper = $(this.element).find('select');
    $(wrapper).find('> *').each((index, item) => {
      $(item).removeAttr('selected');
    });

    const currentItem = $(wrapper).find(`option[value="${option}"]`);
    $(currentItem).attr('selected', 'selected');
  	$(currentItem).val(option);

  };

  this.addListeners = () => {

    this.element.addEventListener('click', listener);
    document.querySelector('body').addEventListener('click', (e) => {
      if (!e.target.closest(this.selector)) {
        closeAllSelects();
      }
    });

  };

  const removeListeners = () => {
    this.element.removeEventListener('click', listener);
  };

  this.init = () => {

    generateHTML();
    this.addListeners();
    const container = this.element.querySelector('.select__container');

    scroll = new PerfectScrollbar(container, {
      wheelSpeed: 1,
      minScrollbarLength: 60,
      maxScrollbarLength: 60

    });

  };

  this.destroy = (selector) => {

    removeListeners();

  };

};
