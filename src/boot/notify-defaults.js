import { Notify } from 'quasar';

Notify.setDefaults({
  position: 'top',
  timeout: 0,
  multiLine: true,
  actions: [{ icon: 'close', color: 'white' }]
});
