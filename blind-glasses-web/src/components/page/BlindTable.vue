<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <el-select v-model="select_cate" placeholder="筛选条件" class="handle-select mr10">
          <el-option key="1" label="全部" value="all"></el-option>
          <el-option key="2" label="姓名" value="name"></el-option>
          <el-option key="3" label="帐号" value="username"></el-option>
        </el-select>
        <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
      </div>
      <el-table :data="data" border style="width: 100%" ref="multipleTable">
        <el-table-column prop="username" label="视障用户账号" width="200"></el-table-column>
        <el-table-column prop="nickname" label="视障用户昵称" width="200"></el-table-column>
        <el-table-column prop="relatives" label="亲属关联"></el-table-column>
        <el-table-column prop="lastLoginTime" label="最近登录时间"></el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :total="10"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          :current-page="pageNum"
        ></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
      <el-form ref="form" :rules="rules" :model="form" label-width="50px">
        <el-form-item label="remark" prop="name">
          <el-input v-model="form.remark" placeholder="1-10个字符"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectUrl: "/travelhelper/admin/private/glassesuser/blind/page",
      saveOrUpdateUrl: "/travelhelper/admin/private/glassesuser/update",
      tableData: [],
      roleList: [],
      stompClient: null,
      save: true,
      cur_page: 1,
      select_cate: "",
      select_word: "",
      is_search: false,
      editVisible: false,
      delVisible: false,
      pageSize: 10,
      pageNum: 1,
      form: {
        remark: ""
      },
      idx: -1,
      rules: {
        remark: [{ required: true, message: "请输入备注", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getData();
  },
  computed: {
    data() {
      return this.tableData;
    }
  },
  methods: {
    // 分页导航
    handleCurrentChange(val) {
      this.cur_page = val;
      this.getData();
    },
    // 获取 easy-mock 的模拟数据
    getData() {
      let _this = this;
      let url =
        this.selectUrl +
        "?pageSize=" +
        this.pageSize +
        "&pageNum=" +
        this.pageNum;
      let queryField = this.handleQueryDate();
      this.$axios.post(url + "", queryField).then(res => {
        if (_this.validateCode(res)) {
          this.tableData = res.data.data.list;
        }
      });
    },
    search() {
      this.is_search = true;
      this.getData();
    },
    filterTag(value, row) {
      return row.tag === value;
    },
    handleSave() {
      this.save = true;
      this.form = {};
      this.editVisible = true;
    },
    handleQueryDate() {
      let queryField = {};
      switch (this.select_cate) {
        case "all":
          queryField = {};
          break;
        case "name":
          queryField = { name: this.select_word };
          break;
        case "username":
          queryField = { username: this.select_word };
          break;
        default:
          queryField = {};
          break;
      }
      return queryField;
    },
    // 保存编辑
    saveEdit() {
      let _this = this;
      this.$axios.post(this.saveOrUpdateUrl, this.form).then(
        res => {
          if (!_this.validateCode(res)) {
            _this.error(res.data.header.resultMsg);
            return;
          }
          this.editVisible = false;
          this.$message.success(`修改第 ${this.idx + 1} 行成功`);
        },
        function() {
          _this.systemError();
        }
      );
    }
  }
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.del-dialog-cnt {
  font-size: 16px;
  text-align: center;
}
</style>
