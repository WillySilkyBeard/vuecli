import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import Chart from './components/Chart.vue'
Vue.component('app-chart', Chart)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
