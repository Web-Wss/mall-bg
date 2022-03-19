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
            <a href="#" class="loginout">退出</a>
          </div></el-col
        >
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <el-menu unique-opened>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-location"></i>
              <span>选项一</span>
            </el-menu-item>
          </el-submenu>
          <!-- 2 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-location"></i>
              <span>选项一</span>
            </el-menu-item>
          </el-submenu>
          <!-- 3 -->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-location"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="1-1">
              <i class="el-icon-location"></i>
              <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="1-1">
              <i class="el-icon-location"></i>
              <span>商品分类</span>
            </el-menu-item>
          </el-submenu>
          <!-- 4 -->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-location"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu>
          <!-- 5 -->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-location"></i>
              <span>选项一</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  // newVue之前自动触发
  beforeCreate() {
    // token没有 登录
    // 获取token
    const token = localStorage.getItem("token");
    // if token 没有  登录
    if (!token) {
      this.$router.push({ name: "login" });
    }
    // if token有 继续渲染
  }
};
</script>

<style>
.container {
  height: 100%;
}
.header {
  background-color: #b3c0d1;
}
.header .logo img {
  width: 50%;
  height: 60px;
}
.aside {
  background-color: #d3dce6;
}
.main {
  background-color: #e9eef3;
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
