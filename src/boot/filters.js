export default ({ Vue }) => {
  Vue.filter('orderStatus', function(val) {
    const statuses = {
      NEW: 'НОВЫЙ',
      TAKEN: 'ПРИНЯТ'
    };
    return statuses[val];
  });
};
