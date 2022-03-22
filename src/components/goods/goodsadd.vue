<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <my-bread level1="商品管理" level2="商品列表"></my-bread>
    <!-- 提示 -->
    <el-alert
      class="alert"
      title="添加商品信息"
      type="success"
      center
      show-icon
    ></el-alert>
    <!-- 步骤条 -->
    <el-steps
      :active="1 * active"
      finish-status="success"
      simple
      style="margin-top: 20px"
    >
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- tab -->
    <!-- 最外层是el-form -->
    <el-form label-position="top" label-width="80px" :model="form" class="form">
      <el-tabs @tab-click="tabChange()" v-model="active" tab-position="left">
        <el-tab-pane name="1" label="基本信息">
          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <!-- 级联选择器 -->
            {{ selectedOptions }}
            <el-cascader
              clearable
              v-model="selectedOptions"
              :options="options"
              expand-trigger="hover"
              :props="defaultProp"
              @change="handleChange"
            ></el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="2" label="商品参数">
          <!-- 显示的是该三级分类的商品参数 -->
        </el-tab-pane>
        <el-tab-pane name="3" label="商品属性">商品属性</el-tab-pane>
        <el-tab-pane name="4" label="商品图片">商品图片</el-tab-pane>
        <el-tab-pane name="5" label="商品内容">商品内容</el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      active: "1",
      // 添加商品的表单数据
      form: {
        goods_name: "",
        goods_cat: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        pics: "",
        attrs: ""
        //  goods_name       商品名称
        //  goods_cat        以为','分割的分类列表  级联选择器绑定的selectedOptions
        //  goods_price      价格
        //  goods_number     数量
        //  goods_weight     重量
        //  goods_introduce  介绍
        //  pics             上传的图片临时路径（对象）
        //  attrs            商品参数（数组）
      },
      // 级联选择器数据
      selectedOptions: [],
      options: [],
      defaultProp: {
        label: "cat_name",
        value: "cat_id",
        children: "children"
      },
      // 动态参数数据数组
      arrDyparams: []
    };
  },
  created() {
    this.getGoodCate();
  },
  methods: {
    // 点击不同的tab时
    async tabChange() {
      // 如果点击的是第二个tab 同时三级分类要有值
      if (this.active === "2") {
        if (this.selectedOptions.length !== 3) {
          // 提示
          this.$message.warning("请先选择商品的三级分类");
          return;
        }
        // 获取数据
        // categories/:id/attributes?sel=many
        // id -> 分类id
        const res = await this.$http.get(
          `categories/${this.selectedOptions[2]}/attributes?sel=many`
        );
        console.log(res);
        // attr_name 和 attr_vals
        this.arrDyparams = res.data.data;
      }
    },
    // 级联选择器方法
    handleChange() {},
    // 获取商品数据列表
    async getGoodCate() {
      const res = await this.$http.get(`categories?type=3`);
      console.log(res);
      this.options = res.data.data;
    }
  }
};
</script>

<style>
.box-card {
  height: 99%;
}
.alert {
  margin-top: 20px;
}
.form {
  /* height: 400px; */
  overflow: auto;
}
</style>
