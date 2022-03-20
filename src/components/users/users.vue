<template>
  <el-card class="box-card">
    <!-- 面包屑 -->
    <!-- /首页 / 用户管理 / 用户列表/ -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
    <el-row class="searchRow">
      <el-col>
        <el-input
          @clear="loadUserList()"
          placeholder="请输入内容"
          v-model="query"
          class="inputSearch"
          clearable
        >
          <el-button
            @click="searchUser()"
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
        <el-button type="success" @click="showAddUserDia()">添加用户</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="userlist" style="width: 100%">
      <el-table-column type="index" label="#" width="60"> </el-table-column>
      <el-table-column prop="username" label="姓名" width="80">
      </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <!-- <el-table-column prop="create_time | fmtdate" label="创建时间">
      </el-table-column> -->
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.create_time | fmtdate }}
        </template>
      </el-table-column>
      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch
            @change="changeMsState(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
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
      :page-sizes="[2, 4, 6, 8]"
      :page-size="6"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 对话框 -->
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="100px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑用户的对话框 -->
    <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          <el-input
            disabled
            v-model="form.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
        <el-button type="primary" @click="EditUser()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色对话框 -->
    <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRol">
      <el-form :model="form">
        <el-form-item label="用户名" label-width="100px">
          {{ currUsername }}
        </el-form-item>
        <el-form-item label="角色" label-width="100px">
          <!-- 如果select绑定的数据的值和option的value一样 就会显示该option的value值 -->
          <el-select v-model="currRoleId">
            <el-option label="请选择" :value="-1"></el-option>
            <el-option
              :label="item.roleName"
              :value="item.id"
              v-for="(item, i) in roles"
              :key="i"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleRol = false">取 消</el-button>
        <el-button type="primary" @click="setRole()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      // 表格绑定的数据
      userlist: [],
      // 分页相关数据
      // 当前页面
      pagenum: 1,
      // 每一页的数据个数
      pagesize: 6,
      // 数据总数
      total: -1,
      // 添加用户对话框 的属性
      dialogFormVisibleAdd: false,
      // 编辑用户对话框 的属性
      dialogFormVisibleEdit: false,
      // 分配角色对话框 的属性
      dialogFormVisibleRol: false,
      // 添加用户的表单数据
      form: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 分配角色
      currRoleId: -1,
      currUserId: -1,
      currUsername: "",
      // 保存所有的角色数据
      roles: []
    };
  },
  // 在实例创建完后立即调用
  created() {
    this.getUsersList();
  },

  methods: {
    // 分配角色 --发送请求
    async setRole() {
      const res = await this.$http.put(`users/${this.currUserId}/role`, {
        rid: this.currRoleId
      });
      console.log(res);
      // 关闭对话框
      this.dialogFormVisibleRol = false;
    },

    // 分配角色，打开对话框
    async showSetUseerRoleDia(user) {
      this.currUsername = user.username;
      // 给currUserId赋值
      this.currUserId = user.id;
      // 获取所有的角色
      const res1 = await this.$http.get(`roles`);
      this.roles = res1.data.data;
      // 获取当前用户的角色id->rid
      const res = await this.$http.get(`users/${user.id}`);
      this.currRoleId = res.data.data.rid;
      this.dialogFormVisibleRol = true;
    },

    // 修改状态
    async changeMsState(user) {
      // 发送请求
      const res = await this.$http.put(
        `users/${user.id}/state/${user.mg_state}`
      );
      console.log(res);
    },

    // 编辑用户 发送请求
    async EditUser() {
      const res = await this.$http.put(`users/${this.form.id}`, this.form);
      // console.log(res);
      // 关闭对话框
      this.dialogFormVisibleEdit = false;
      // 更新视图
      this.getUsersList();
    },

    // 编辑用户，显示对话框
    showEditUserDia(user) {
      this.form = user;
      this.dialogFormVisibleEdit = true;
    },

    // 删除用户--打开消息盒子
    showDeleUserMsgBox(userId) {
      this.$confirm("删除用户?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 发送删除的请求 :id-->用户id
          // data中找userId   X
          // 把userId以参数形式传过来
          const res = await this.$http.delete(`users/${userId}`);
          console.log(res);
          if (res.data.meta.status === 200) {
            this.pagenum = 1;
            // 更新视图
            this.getUsersList();
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 添加用户功能
    async addUser() {
      // 关闭对话框
      this.dialogFormVisibleAdd = false;
      const res = await this.$http.post(`users`, this.form);
      console.log(res);
      const {
        meta: { status, msg },
        data
      } = res.data;
      if (status === 201) {
        // 提示成功
        this.$message.success(msg);
        // 更新视图
        this.getUsersList();
        // 清空文本框
        this.form = {};
      } else {
        this.$$message.warning(msg);
      }
    },

    // 显示对话框
    showAddUserDia() {
      this.form = {};
      this.dialogFormVisibleAdd = true;
    },
    // 清空搜索框
    loadUserList() {
      this.getUsersList();
    },
    // 搜索用户
    searchUser() {
      // 按照input绑定的query参数，发送请求
      this.getUsersList();
    },

    // 分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      // this.pagenum = 1;
      this.getUsersList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.getUsersList();
    },

    // 获取用户列表的请求
    async getUsersList() {
      // query 查询参数  可以为空
      // pagenum  当前页码  不能为空
      // pagesize  每页显示条数  不能为空
      // // 需要授权的API，必须在请求头中使用Authorization 字段提供 token令牌
      // const AUTH_TOKEN = localStorage.getItem("token");
      // // 将token加在请求头中
      // this.$http.defaults.headers.common["Authorization"] = AUTH_TOKEN;
      const res = await this.$http.get(
        `users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`
      );
      console.log(res);
      const {
        meta: { status, msg },
        data: { users, total }
      } = res.data;
      if (status === 200) {
        // 给表格数据赋值
        this.userlist = users;
        // 给总数赋值
        this.total = total;
        // 提示
        // this.$message.success(msg);
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

.inputSearch {
  width: 300px;
}
.searchRow {
  margin-top: 20px;
}
</style>
