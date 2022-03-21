<template>
  <el-card class="box-card">
    <my-bread level1="商品管理" level2="商品列表"></my-bread>
    <!-- 搜索框 -->
    <el-row class="searchArea">
      <el-col :span="24">
        <el-input
          v-model="query"
          class="searchInput"
          clearable
          placeholder="请输入要搜索的内容"
        >
          <el-button
            @click="handleSearch()"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
        <el-button
          @click="$router.push({ name: 'goodsadd' })"
          type="success"
          plain
          >添加商品</el-button
        >
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table height="675px" :data="list">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="300px"
      ></el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格(元)"
        width="150"
      ></el-table-column>
      <el-table-column
        prop="goods_weight"
        label="商品重量"
        width="150"
      ></el-table-column>
      <el-table-column label="创建日期" width="150">
        <template slot-scope="scope">
          {{ scope.row.add_time | fmtdate }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-row>
            <el-button
              size="mini"
              plain
              type="primary"
              icon="el-icon-edit"
              circle
              @click="showEditUserDia(scope.row)"
            ></el-button>
            <el-button
              size="mini"
              plain
              type="danger"
              icon="el-icon-delete"
              circle
              @click="showDeleUserMsgBox(scope.row.id)"
            ></el-button>
            <el-button
              size="mini"
              plain
              type="success"
              icon="el-icon-check"
              circle
              @click="showSetUseerRoleDia(scope.row)"
            ></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      // 搜索数据
      searchValue: "",
      // 表格数据
      list: [],
      // 查询参数
      query: "",
      // 当前页面
      pagenum: 1,
      // 每一页的数据个数
      pagesize: 10,
      // 总数
      total: -1
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      // this.pagenum = 1;
      this.getGoodsList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getGoodsList();
    },
    // 搜索
    handleSearch() {
      this.getGoodsList();
    },
    // 获取商品列表
    async getGoodsList() {
      const res = await this.$http.get(
        `goods?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      console.log(res);
      const {
        meta: { status, msg },
        data: { goods, total }
      } = res.data;
      if (status === 200) {
        // 给表格数据赋值
        this.list = goods;
        // 给总数赋值
        this.total = total;
        // 提示
        this.$message.success(msg);
      } else {
        // 提示
        this.$message.warning(msg);
      }
    }
  }
};
</script>

<style>
.box-card {
  height: 99%;
}
.searchInput {
  width: 300px;
}
.searchArea {
  margin-top: 20px;
}
</style>
