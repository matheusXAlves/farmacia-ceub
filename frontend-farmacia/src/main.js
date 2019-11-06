import Vue from 'vue'
import App from './App.vue'

import vuetify from './plugins/vuetify';
import "vuetify/dist/vuetify.min.css";

import { router } from "./router";
import store from './store'

Vue.use(vuetify);

//Vue.config.productionTip = false

Vue.directive('money', {
  inserted(el, binding) {
      const amount = parseFloat(el.innerHTML).toFixed(2)
          .replace('.', ',')
          .replace(/(\d)(?=(\d{3})+,)/g, '$1.')
      el.innerHTML = `${binding.value} ${amount}`
  }
})

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
