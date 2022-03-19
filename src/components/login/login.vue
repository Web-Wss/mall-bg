<template>
  <div class="login-wrap">
    <el-form
      class="login-form"
      label-position="top"
      label-width="80px"
      :model="formdata"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formdata.username"></el-input>
      </el-form-item>
      <el-form-item label="密  码">
        <el-input v-model="formdata.password"></el-input>
      </el-form-item>
      <el-button @click="handleLogin()" class="login-btn" type="primary"
        >登录</el-button
      >
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formdata: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    // 登录请求
    async handleLogin() {
      // 希望让异步操作的代码，看起来像同步代码
      // ES7 async+await
      const res = await this.$http.post("login", this.formdata);
      // console.log(res);
      const {
        data,
        meta: { msg, status }
      } = res.data;
      if (status === 200) {
        // 登录成功
        // 1.跳转home
        this.$router.push({ name: "home" });
        // 2.提示成功
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
      // 不成功
      // 1.提示消息

      // this.$http.post("login", this.formdata).then(res => {
      //   // console.log(res);
      //   const {
      //     data,
      //     meta: { msg, status }
      //   } = res.data;
      //   if (status === 200) {
      //     // 登录成功
      //     // 1.跳转home
      //     this.$router.push({ name: "home" });
      //     // 2.提示成功
      //     this.$message.success(msg);
      //   } else {
      //     this.$message.error(msg);
      //   }
      //   // 不成功
      //   // 1.提示消息
      // });
    }
  }
};
</script>

<style>
.login-wrap {
  height: 100%;
  background-color: #324152;
  /* 弹性盒模型 */
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-wrap .login-form {
  width: 400px;
  background-color: #fff;
  border-radius: 5px;
  padding: 30px;
}
.login-wrap .login-btn {
  width: 100%;
}
</style>
