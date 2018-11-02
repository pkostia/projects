const formValidation = {

  showError: (element) => { $(element).addClass('is-error'); },

  resetForms: () => {

    $('form').each((index, item) => {

      $(item).removeClass('is-error');

    });

  },

  checkSelects: (index, item, form) => {

    if(($(item).prop('required')) && (!$(item).closest('.select').hasClass('is-selected'))) {

      form.addClass('is-error');
      $(item).closest('.select').addClass('is-error');

    } else {
      $(item).closest('.select').removeClass('is-error');
    }

  },

  checkFields: (index, item, form) => {

    if(($(item).hasClass('js-required')) && ($(item).val().length === 0)) {


      form.addClass('is-error');
      $(item).addClass('is-error is-required');

    }
    else {


      if ($(item).attr('name') === 'Телефон') {
        if (!$(item).val().match(/\+?(\d{1})\s+\((\d{3})\)\s+(\d{3})\s(\d{2})\s(\d{2})/)) {
          $(item).addClass('is-invalid');
        }
      }

      if ($(item).attr('name') === 'Email') {

        if (!$(item).val().match(/^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-0-9A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/u)) {
          $(item).addClass('is-invalid');
        }
      }
    }

  }

};

const validate = (e) => {

  formValidation.resetForms();

  const form = $(e.target).closest('form');

  $(form).find('input').each((index, item) => formValidation.checkFields(index, item, form));
  $(form).find('select').each((index, item) => formValidation.checkSelects(index, item, form));
  $(form).find('textarea').each((index, item) => formValidation.checkFields(index, item, form));

};

$('[type="submit"]').each((index, item) => {

  $(item).on('click', (e) => {

    validate(e);

  });

});

const validation = {
  validate
};

module.exports = validation;
