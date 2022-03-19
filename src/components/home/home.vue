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
      <el-aside class="aside" width="200px">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {};
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
