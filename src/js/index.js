/* eslint-disable */
import Switcher from './plugins/switcher';
import Modal from './plugins/modal';

import elementClosest from 'element-closest';

// Build svg sprite
function requireAll(r) {
  r.keys().forEach(r);
}
requireAll(require.context('../assets/images/icons/sprite-simple', true, /\.svg$/));
requireAll(require.context('../assets/images/icons/sprite-complex', true, /\.svg$/));

window.onload = () => {
  const switcher = new Switcher();
  const modal = new Modal();
}
