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
                <el-table-column prop="username" label="志愿者账号">
                </el-table-column>
                <el-table-column prop="name" label="志愿者姓名">
                </el-table-column>
                <el-table-column prop="nickname" label="志愿者昵称">
                </el-table-column>
                <el-table-column prop="lastLoginTime" label="最近登录时间"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination @current-change="handleCurrentChange" layout="prev, pager, next" :total="10" :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" :current-page="pageNum">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                selectUrl: '/travelhelper/admin/private/glassesuser/volunteer/page',
                saveOrUpdateUrl: '/travelhelper/admin/private/glassesuser/update',
                tableData: [],
                roleList: [],
                stompClient: null,
                save: true,
                cur_page: 1,
                select_cate: '',
                select_word: '',
                is_search: false,
                editVisible: false,
                delVisible: false,
                pageSize: 10,
                pageNum: 1,
                idx: -1
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
                let _this = this
                let url = this.selectUrl + '?pageSize=' + this.pageSize + '&pageNum=' + this.pageNum
                let queryField = this.handleQueryDate()
                this.$axios.post(url + '', queryField).then((res) => {
                    if (!_this.validateCode(res)) {
                        _this.error(res.data.header.resultMsg);
                        return ;
                    }
                    this.tableData = res.data.data.list;


                })
            },
            search() {
                this.is_search = true;
                this.getData()
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleQueryDate() {
                let queryField = {}
                switch (this.select_cate) {
                    case 'all' : queryField = { }; break;
                    case 'name' : queryField = { name : this.select_word }; break;
                    case 'username' : queryField = { username : this.select_word }; break;
                    default: queryField = { }; break;
                }
                return queryField
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
