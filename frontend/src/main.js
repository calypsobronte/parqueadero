import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';


Vue.config.productionTip = false
Vue.use(VueSweetalert2);

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')