<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4" class="logo"
          ><div class="grid-content bg-purple">
            <img src="http://massz.shop/img/LOGO.png" alt="无法显示图片" /></div
        ></el-col>
        <el-col :span="18" class="middle"
          ><div class="grid-content bg-purple-light">
            电商后台管理系统
          </div></el-col
        >
        <el-col :span="2"
          ><div class="grid-content bg-purple">
            <a href="#" class="loginout" @click.prevent="handleSignout()"
              >退出</a
            >
          </div></el-col
        >
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <!-- 开启路由模式 -->
        <el-menu :router="true" :unique-opened="true">
          <el-submenu
            :index="'' + item1.order"
            v-for="(item1, index) in menus"
            :key="index"
          >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item1.authName }}</span>
            </template>
            <!-- 通过index的值跳转到指定路径 -->
            <el-menu-item
              :index="item2.path"
              v-for="(item2, index) in item1.children"
              :key="index"
            >
              <i class="el-icon-location"></i>
              <span>{{ item2.authName }}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menus: []
    };
  },
  // newVue之前自动触发
  beforeCreate() {
    // 获取token
    const token = localStorage.getItem("token");
    // if token没有-->登录
    if (!token) {
      // 通过路由跳转到登录页面
      this.$router.push({ name: "login" });
    }
    // if token有-->继续渲染
  },
  created() {
    this.getMenus();
  },
  methods: {
    // 获取导航数据
    async getMenus() {
      const res = await this.$http.get(`menus`);
      console.log(res);
      this.menus = res.data.data;
    },
    // 退出登录事件
    handleSignout() {
      //清除token
      localStorage.clear();
      // 提示退出登录
      this.$message.success("退出成功");
      // 跳转到login组件
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style>
.container {
  height: 100%;
}
.header {
  background-color: #ececec;
}
.header .logo img {
  width: 130px;
  height: 60px;
}
.aside {
  background-color: #ffffff;
}
.main {
  background-color: #e4e4e4;
}
/* 头部样式 */
.middle {
  text-align: center;
  line-height: 60px;
}
.loginout {
  line-height: 60px;
  text-decoration: none;
}
</style>
