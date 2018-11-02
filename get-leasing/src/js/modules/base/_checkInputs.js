const addFocusoutListener = (element, type) => {

  $(element).focusout((e) => {

    const target = e.target || e.srcElement;
    const value = $(target).val();

    if(type) {

      const inpWrapper = $(target).closest(`.${type}`);

      if((value)&&(value !== '+7 (___) ___ __ __')) {
        inpWrapper.addClass('is-filled');
        $(e.target).removeClass('is-error');

      } else {
        inpWrapper.removeClass('is-filled');
      }

      if ($(e.target).attr('name') === 'Телефон') {
        if (value.match(/\+?(\d{1})\s+\((\d{3})\)\s+(\d{3})\s(\d{2})\s(\d{2})/)) {
          inpWrapper.addClass('is-filled');
          $(e.target).removeClass('is-error');
        }
        else if (value === '+7 (___) ___ __ __') {
          $(e.target).removeClass('is-error');
          inpWrapper.removeClass('is-filled');
        }
        else {
          inpWrapper.removeClass('is-filled');
          $(e.target).addClass('is-error').removeClass('is-required');
        }
      }

      if ($(e.target).attr('name') === 'Email') {

        if (value.match(/^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-0-9A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u)) {
          inpWrapper.addClass('is-filled');
          $(e.target).removeClass('is-error');
        }
        else {
          inpWrapper.removeClass('is-filled');
          if (value) {
            $(e.target).addClass('is-error').removeClass('is-required');
          }
          else {
            $(e.target).removeClass('is-error');
          }
        }

      }

    } else {

      if(value) {
        $(target).addClass('is-filled');
        $(e.target).removeClass('is-error');
      } else {
        $(target).removeClass('is-filled');
      }

    }

  });

};

const checkInputs = () => {

  const inputs = $('.input__field');
  const textareas = $('textarea');
  const heroInputs = $('.hero__input');

  $.each(heroInputs, (index, item) => {

    addFocusoutListener(item);

  });

  $.each(inputs, (index, item) => {

    addFocusoutListener(item, 'input');

  });

  $.each(textareas, (index, item) => {

    addFocusoutListener(item, 'textarea');

  });

};

module.exports = checkInputs;
