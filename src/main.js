import Vue from 'vue'
import App from './App.vue'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueRouter from "vue-router";
import routes from './router'
import axios from 'axios';
Vue.use(axios);
Vue.prototype.$http = axios;
Vue.use(VueRouter);
library.add(faSearch);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

// Just Pass in routes, no need for value and key pair
// Will Save you countless hours
const router = new VueRouter({
    routes,
    mode: 'history'
});

 new Vue({
     router,
     render: h => h(App)
}).$mount('#app');
