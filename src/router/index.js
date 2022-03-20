import Vue from "vue";
import Router from "vue-router";
// import Login from "../components/login/login.vue";
// @ 会自动找到src文件夹
import Login from "@/components/login/login.vue";
import Home from "@/components/home/home.vue";
import Users from "@/components/Users/Users.vue";
import Right from "@/components/rights/right.vue";
import Role from "@/components/rights/role.vue";

Vue.use(Router);

export default new Router({
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
          path: "users",
          component: Users
        },
        {
          name: "right",
          path: "right",
          component: Right
        },
        {
          name: "role",
          path: "role",
          component: Role
        }
      ]
    }
  ]
});
