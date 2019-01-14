<template>
    <div class="table">
        <div class="container">
            <div class="handle-box">
                <el-button type="primary" icon="add" class="handle-del mr10" @click="handleSave()">新增</el-button>
                <el-select v-model="select_cate" placeholder="筛选条件" class="handle-select mr10">
                    <el-option key="1" label="全部" value="all"></el-option>
                    <el-option key="3" label="帐号" value="account"></el-option>
                    <el-option key="5" label="角色" value="roleName"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="data" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="name" label="用户名称" width="150">
                </el-table-column>
                <el-table-column prop="account" label="用户帐号" width="120">
                </el-table-column>
                <el-table-column prop="roleName" label="用户角色" width="120">
                </el-table-column>
                <el-table-column prop="createDate" label="创建时间" width="120">
                </el-table-column>
                <el-table-column prop="createBy" label="创建人" width="120">
                </el-table-column>
                <el-table-column label="操作" width="240">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
                        <el-button size="small" @click="restPassword(scope.$index, scope.row)">重置密码</el-button>
                        <el-button size="small" type="danger" @click="handleFrozen(scope.$index, scope.row)" v-if="scope.row.status === 1">凍結</el-button>
                        <el-button size="small" type="danger" @click="handleActive(scope.$index, scope.row)" v-if="scope.row.status === 0">激活</el-button>
                        <el-button size="small" type="danger" @click="handleActive(scope.$index, scope.row)" v-if="scope.row.status === 2">激活</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="10" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" :current-page="pageNum">
                </el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible">
            <el-form ref="form" :rules="rules" :model="form" label-width="50px">
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="form.name" placeholder="1-10个字符"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="roleId">
                    <el-select v-model="form.roleId" placeholder="请选择">
                        <el-option
                            v-for="item in roleList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="帐号" v-if="save" prop="account">
                    <el-input v-model="form.account" placeholder="1-10个字符，支持中文，英文，下划线"></el-input>
                </el-form-item>
                <el-form-item label="密码" v-if="save" prop="password">
                    <el-input type="password" v-model="form.password" placeholder="6-16个字符，支持任意字符"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">是否确定冻结？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="delVisible = false">取 消</el-button>
                <el-button type="primary" @click="frozenUser">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="提示" :visible.sync="activeVisible" width="300px" center>
            <div class="del-dialog-cnt">是否确定激活？</div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="activeVisible = false">取 消</el-button>
                <el-button type="primary" @click="activeUser">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                selectUrl: '/travelhelper/admin/private/user/page',
                deleteUrl: '/travelhelper/admin/private/user/delete',
                deleteBatchUrl: '/travelhelper/admin/private/user/delete/batch',
                saveOrUpdateUrl: '/travelhelper/admin/private/user',
                selectRoleUrl: '/travelhelper/admin/private/role',
                tableData: [],
                roleList: [],
                save: true,
                cur_page: 1,
                select_cate: '',
                select_word: '',
                is_search: false,
                editVisible: false,
                delVisible: false,
                activeVisible: false,
                updateUser: {},
                pageSize: 10,
                pageNum: 1,
                form: {
                    name: '',
                    account: '',
                    createDate: '',
                    createBy: '',
                    roleName: '',
                    dept: ''
                },
                idx: -1,

                rules: {
                    name: [
                        { required: true, message: '请输入姓名', trigger: 'blur' }
                    ],
                    roleId: [
                        { required: true, message: '请选择角色', trigger: 'change' }
                    ],
                    account: [
                        { required: true, message: '请输入帐号', trigger: 'blur' },
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                    ]

                }
            }
        },
        created() {
            this.getData();
        },
        computed: {
            data() {
                return this.tableData
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
                let url = this.selectUrl + '?pageSize=' + this.pageSize + '&pageNum=' + this.pageNum
                let queryField = this.handleQueryDate()
                let _this = this
                this.$axios.post(url + '', queryField).then((res) => {
                    if (!_this.validateCode(res)) {
                        _this.error(res.data.header.resultMsg);
                        return ;
                    }
                    _this.tableData = res.data.data.list;
                })
            },
            getRoleData() {
                this.$axios.get(this.selectRoleUrl).then((res) => {
                    this.roleList = res.data.data;
                })
            },
            search() {
                this.is_search = true;
                this.getData()
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleSave() {
                this.save = true
                this.form = { }
                this.getRoleData()
                this.editVisible = true;
            },
            handleFrozen(index, row) {
                this.updateUser = this.tableData[index]
                this.updateUser.index = index
                this.delVisible = true;
            },
            handleActive(index, row) {
                this.updateUser = this.tableData[index]
                this.updateUser.index = index
                this.activeVisible = true;
            },
            handleEdit(index, row) {
                this.idx = index;
                this.save = false
                this.getRoleData()
                const item = this.tableData[index];
                this.form = {
                    'id': item.id,
                    'name': item.name,
                    'roleId': item.roleId,
                    'dept': item.dept
                }
                this.editVisible = true;
            },
            handleQueryDate() {
                let queryField = {}
                switch (this.select_cate) {
                    case 'all' : queryField = { }; break;
                    case 'name' : queryField = { name : this.select_word }; break;
                    case 'account' : queryField = { account : this.select_word }; break;
                    case 'dept' : queryField = { dept : this.select_word }; break;
                    case 'roleName' : queryField = { roleName : this.select_word }; break;
                    default: queryField = { }; break;
                }
                return queryField
            },
            // 保存编辑
            saveEdit() {
                let _this = this
                this.$axios.post(this.saveOrUpdateUrl, this.form).then((res) => {
                    if (!_this.validateCode(res)) {
                        _this.$message.error(res.data.data.message);
                        return ;
                    }
                    this.handleResData(res)
                    this.editVisible = false;

                })
            },
            frozenUser() {
                let _this = this
                this.$axios.post("/travelhelper/admin/private/user/frozen?username=" + this.updateUser.account).then((res) => {
                    if (!_this.validateCode(res)) {
                        _this.$message.error(res.data.data.message);
                        return ;
                    }
                    _this.$message.success("操作成功");
                    _this.tableData[_this.updateUser.index].status = 2
                    this.delVisible = false;

                })
            },
            activeUser() {
                let _this = this
                this.$axios.post("/travelhelper/admin/private/user/active?username="  + this.updateUser.account).then((res) => {
                    if (!_this.validateCode(res)) {
                        _this.$message.error(res.data.data.message);
                        return ;
                    }
                    _this.$message.success("操作成功");
                    _this.tableData[_this.updateUser.index].status = 1
                    this.activeVisible = false;
                })
            },
            handleResData(res) {
                let user = res.data.data
                user.roleName = this.getRoleNameInRoleList(user.roleId);
                if (this.save) {
                    this.tableData.unshift(user)
                    this.$message.success(`新增成功`);
                } else {
                    this.tableData[this.idx].roleId = user.roleId;
                    this.tableData[this.idx].name = user.name;
                    this.tableData[this.idx].dept = user.dept;
                    this.tableData[this.idx].roleName = user.roleName;
                    this.$message.success(`修改第 ${this.idx+1} 行成功`);
                }
            },
            getRoleNameInRoleList(roleId) {
                let roleName = '';
                for (let i = 0; i < this.roleList.length; i++ ) {
                    if (this.roleList[i].id === roleId) {
                        roleName = this.roleList[i].name;
                        break;
                    }
                }
                return roleName;
            },
            restPassword(index, row) {
                let _this = this
                console.log(row)
                this.$axios.post("/travelhelper/admin/private/user/restpassword?id=" + row.id).then((res) => {
                    if (!_this.validateCode(res)) {
                        _this.$message.error(res.data.data.message);
                        return ;
                    }
                    _this.$message.success("操作成功");
                    _this.tableData[_this.updateUser.index].status = 2
                    this.delVisible = false;

                })
            }
        }
    }

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
    .del-dialog-cnt{
        font-size: 16px;
        text-align: center
    }
</style>
