import Vue from "vue";
import Router from "vue-router";
// import Login from "../components/login/login.vue";
// @ 会自动找到src文件夹
import Login from "@/components/login/login.vue";
import Home from "@/components/home/home.vue";
import Users from "@/components/Users/Users.vue";
import Rights from "@/components/rights/rights.vue";
import Roles from "@/components/rights/roles.vue";
import Goods from "@/components/goods/goodslist.vue";
import GoodsAdd from "@/components/goods/goodsadd.vue";
import Params from "@/components/goods/cateparams";
import Goodscate from "@/components/goods/Goodscate";

import { Message } from "element-ui";

Vue.use(Router);

const router = new Router({
  routes: [
    {
      name: "login",
      path: "/login",
      component: Login
    },
    {
      name: "home",
      path: "/",
      component: Home,
      children: [
        {
          name: "users",
          path: "/users",
          component: Users
        },
        {
          name: "rights",
          path: "/rights",
          component: Rights
        },
        {
          name: "roles",
          path: "/roles",
          component: Roles
        },
        {
          name: "goods",
          path: "/goods",
          component: Goods
        },
        {
          name: "goodsadd",
          path: "/goodsadd",
          component: GoodsAdd
        },
        {
          name: "params",
          path: "/params",
          component: Params
        },
        {
          name: "categories",
          path: "/categories",
          component: Goodscate
        }
      ]
    }
  ]
});

//
router.beforeEach((to, from, next) => {
  //
  if (to.path === "/login") {
    next();
  } else {
    // 判断token
    const token = localStorage.getItem("token");
    if (!token) {
      Message.warning("请先登录");
      router.push({
        name: "login"
      });
      return;
    }
    next();
  }
});

export default router;
