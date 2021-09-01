import Vue from 'vue'
import App from './App.vue'
import router from 'router'
import 'assets/font/iconfont.css'
import 'assets/font/iconfont.js'
import vant from 'vant'
import 'vant/lib/index.css'
import store from './store'
// import 'jquery/dist/jquery.min'
// import 'bootstrap/dist/css/bootstrap.css'
// import ElementUI from 'element-ui';

// import { Calendar } from 'vant';
Vue.use(vant);
Vue.config.productionTip = false

new Vue({
    render: h => h(App),
    store,
    router
}).$mount('#app')