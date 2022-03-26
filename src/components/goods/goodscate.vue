<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-bread level1="商品管理" level2="商品分类"></my-bread>
    <!-- 搜索框 -->
    <el-row>
      <el-col :span="24" class="searchArea">
        <el-button type="success" @click="addGoodsCate()">添加分类</el-button>
      </el-col>
    </el-row>
    <!-- 添加分类的对话框 -->
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      pagenum: "",
      pagesize: "",
      list: []
    };
  },
  created() {
    this.getGoodsCate();
  },
  methods: {
    // 添加分类  发送请求
    async addCate() {},
    // 添加分类-显示对话框
    async addGoodsCate() {},
    // 获取所有分类
    async getGoodsCate() {
      const res = await this.$http.get(
        `categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      this.list = res.data.data;
      console.log(res);
    }
  }
};
</script>

<style></style>
