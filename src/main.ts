import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueTyper from 'vue-typer'

Vue.config.productionTip = false
Vue.config.performance = true

Vue.use(VueTyper)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
