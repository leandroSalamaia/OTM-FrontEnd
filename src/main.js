import Vue from 'vue'
import App from './App.vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import VueRouter from './router'
import VueAxios from 'vue-axios'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas  } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
const Loader = {
  showLoader: false
};

Vue.mixin({ 
  data(){
    return{
      Loader
    }
  }
});
Vue.use(VueMaterial)
Vue.use(VueAxios)
Vue.use(VueSweetalert2);

new Vue({
  router : VueRouter,
  render: h => h(App),
}).$mount('#app')
