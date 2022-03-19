// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import ElementUI from "element-ui";
import MyServerHttp from "@/plugins/http";
import moment from "moment";
// 不要忘记引入css文件
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/css/reset.css";
import router from "./router";

// 使用vue插件
Vue.use(ElementUI);
Vue.use(MyServerHttp);

// 全局过滤器--处理日期
Vue.filter("fmtdate", v => {
  return moment(v).format("YYYY-MM-DD");
});
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
