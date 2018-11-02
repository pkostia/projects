const submit = $('[type="submit"]');
const forms = $('form');

const send = (data) => {

  $.ajax({
    type: 'POST',
    url: './../send.php',
    data: data, // serializes the form's elements.
    success: (data) => {
      location.href = 'thank-you.html';
    }
  });

};

const createSendData = (title, data, callback) => {

  const formData = {};
  formData.title = title;

  let counter = 0;

  $.each(data, (index, item) => {

    for(let key in item) {

      formData[`name${counter}`] = item[`${key}`];
      counter++;

    }

  });

  callback(formData);

};

$.each(submit, (index, item) => {

  $(item).on('click', (e) => {

  	e.preventDefault();
  	const target = e.target || e.srcElement;

    console.log($(item));

  	if($(target).hasClass('js-submit')) return;

  	const form = $(item).closest('form');

  	if(!form.hasClass('is-error')) {

      const sendData = [];

      if($(target).hasClass('js-steps')) {

        const formsWrapper = $(target).closest('.form-result');
        const formTitle = $(formsWrapper).data().formTitle;

        formsWrapper.find('form').each((index, item) => {

          const data = $(item).serializeArray();
          sendData.push(data);

          $(item)[0].reset();

        });

        createSendData(formTitle, sendData, (data) => {
          send(data);
        });

        return;

      } else {

        const formTitle = form.data().formTitle;
        const data = form.serializeArray();

        sendData.push(data);

        $(form)[0].reset();

        createSendData(formTitle, sendData, (data) => {
          send(data);
        });

      }

  	}

  });

});
