import { createApp, version } from 'vue'
import App from './App.vue'
import router from './router'

import Toast from "vue-toastification";
import Notifications from '@kyvg/vue3-notification'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import "@egjs/flicking/dist/flicking.css"; // Supports IE10+, using CSS flex
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import myPlugin from './config.js'
import InfiniteLoading from "v3-infinite-loading";
import "v3-infinite-loading/lib/style.css";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'



/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faShirt,faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons'


library.add(faShirt,faFileInvoiceDollar)


console.log(version)
const app = createApp(App)
app.use(Notifications);
app.component('VueDatePicker', VueDatePicker);
app.component('font-awesome-icon', FontAwesomeIcon);
app.component("infinite-loading", InfiniteLoading);
app.use(VueCookies, { expire: '7d' });
app.use(VueAxios, axios)
app.use(myPlugin, {})
app.use(router).use(Toast).mount('#app')


