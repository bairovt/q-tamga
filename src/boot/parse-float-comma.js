import AsyncComputed from 'vue-async-computed';

// modify window.parseFloat to treat , as .
// case https://ru.vuejs.org/v2/guide/forms.html#number

export default ({}) => {
  const originalParseFloat = parseFloat;
  window.parseFloat = function(val) {
    let newVal = val;
    if (typeof val === 'string') {
      newVal = val.replace(/,/, '.');
    }
    return originalParseFloat(newVal);
  };
};
