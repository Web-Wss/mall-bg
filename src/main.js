// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
// 引入element-ui
import ElementUI from "element-ui";
// 导入MyBread组件
import Mybread from "@/components/cuscom/Mybread";
import MyServerHttp from "@/plugins/http";
import moment from "moment";
// 引入element-ui的样式文件
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/css/reset.css";
import router from "./router";

// 使用vue插件
// 使用elementUI组件
Vue.use(ElementUI);
// 使用MyServerHttp插件
Vue.use(MyServerHttp);

// 全局过滤器--处理日期
Vue.filter("fmtdate", v => {
  return moment(v).format("YYYY-MM-DD");
});
Vue.config.productionTip = false;
// 全局自定义组件
Vue.component(Mybread.name, Mybread);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});
