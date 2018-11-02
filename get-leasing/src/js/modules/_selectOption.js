$('.js-select-option-wrapper').on('click', (e) => {

  const target = e.target || e.srcElement;
  const element = $(target).closest('.js-select-option');

  if(!element.hasClass('js-select-option')) return;

  const data = element.data();
  const selectHeader = data.selectHeader;
  const selectName = data.selectName;

  const select = $(`[data-select="${selectName}"]`);
  const value = select.find(`li[data-value="${selectHeader.toUpperCase()}"]`).text();
  if(value.length === 0) return;

  select.addClass('is-selected');
  select.find(`li[data-value="${selectHeader.toUpperCase()}"]`).click();

});
