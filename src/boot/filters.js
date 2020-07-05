export default ({ Vue }) => {
  Vue.filter('orderStatus', function(val) {
    const statuses = {
      NEW: 'НОВЫЙ',
      TAKEN: 'ПРИНЯТ',
      DONE: 'ЗАВЕРШЕН'
    };
    return statuses[val];
  });
};
