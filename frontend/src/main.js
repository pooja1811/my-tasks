import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from "./axios";
import toast from "./plugins/mini-toastr.js";

Vue.config.productionTip = false;
Vue.prototype.axios = axios;

new Vue({
  toast,
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
