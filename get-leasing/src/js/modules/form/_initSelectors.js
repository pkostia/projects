import Select from './_select.js';
import PerfectScrollbar from 'perfect-scrollbar';

const initSelectors = () => {

  const selects = document.querySelectorAll('.select');
  Array.from(selects).forEach((item) => {

  	new Select(item, '.select').init();

  });
};

module.exports = initSelectors;
