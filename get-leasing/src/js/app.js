import svg4everybody from 'svg4everybody';
import Promise from 'promise-polyfill';

svg4everybody();

if (!window.Promise) {
  window.Promise = Promise;
}

import './modules/animations/index';
import './modules/form/index';
import './modules/base/index';
import './modules/index';
