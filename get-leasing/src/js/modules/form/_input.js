import './../lib/jquery.maskedinput.min.js';
/*reset form elements (firefox saves it)*/
// window.addEventListener('DOMContentLoaded', () => {
//   var inputs = document.querySelectorAll('input[type=text]');

//   for(var i = 0; i < inputs.length; i++) {

//     document.getElementsByTagName('input')[i].value = '';
//   }
//   var textareas = document.getElementsByTagName('textarea');
//   for(var i = 0; i < textareas.length; i++) {
//     document.getElementsByTagName('textarea')[i].value = '';
//   }
// });

const telephoneMask = '+7 (999) 999 99 99';

$('[name="Телефон"]').each((index, item) => {

  $(item).mask(telephoneMask, {autoclear: false});

});

$('form input').each((index, item) => {

  const input = $(item);

  input.focusout(() => {

    const val = input.val();
    input.attr('value', val);

    input.removeClass('is-active');

    if (input.attr('name') === 'Телефон') {
      if (!val.match(/\+?(\d{1})\s+\((\d{3})\)\s+(\d{3})\s(\d{2})\s(\d{2})/)) {
        input
          .removeAttr('valid')
          .removeClass('is-filled')
          .addClass('is-error');
      }
      else {
        input
          .removeClass('is-error')
          .addClass('is-filled');
      }
    }


  });

});

$('input').each((index, item) => {

  const input = $(item);

  input.focus(() => {
    input.addClass('is-active');

  });

});



// $('form').each(function() {

//   $(this).submit(function() {
//     console.log('test');
//   });

// });

