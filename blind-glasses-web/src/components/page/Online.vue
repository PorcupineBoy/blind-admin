<template>
    <div class="table" v-loading="recent.loading">
        <div class="container">
            <div class="handle-box">
                <el-select class="handle-select mr10" v-model="form.category" placeholder="接受对象"
                           @change="categoryChange">
                    <el-option key="0" label="全部" value></el-option>
                    <template v-for="(item,index) in categorys">
                        <el-option :key="index" :label="item" :value="index"></el-option>
                    </template>
                </el-select>
                <el-select v-model="select_cate" placeholder="筛选条件" class="handle-select mr10">
                    <el-option key="0" label="帐号" value="username"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-date-picker class="handle-date" type="date" placeholder="开始日期"
                                v-model="form.date.start"></el-date-picker>
                <el-date-picker class="handle-date" type="date" placeholder="结束日期"
                                v-model="form.date.end"></el-date-picker>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="recentData" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="username" label="账号"></el-table-column>
                <el-table-column prop="category" label="账号对象" :formatter="categoryFormat"></el-table-column>
                <el-table-column prop="onlineTime" label="最新上线时间"></el-table-column>
                <el-table-column prop="offlineTime" label="最新下线时间"></el-table-column>
                <el-table-column prop="workingTime" label="在线总时长" :formatter="durationFormat"></el-table-column>
                <el-table-column label="操作" width="240">
                    <template slot-scope="scope">
                        <el-button size="small" @click="handleOnlineDetail(scope.$index, scope.row)">查看在线详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    @current-change="handleRecentChange"
                    layout="prev, pager, next"
                    :total="recent.total"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="recent.pageSize"
                    :current-page="recent.pageNum"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog :title="onlineDetailTitle" :visible.sync="onlineDetailVisible" >
            <div v-loading="detail.loading">
                <el-table :data="detailData" border style="width: 100%" ref="multipleTable" >
                    <el-table-column prop="onlineTime" label="上线时间"></el-table-column>
                    <el-table-column prop="offlineTime" label="下线时间"></el-table-column>
                    <el-table-column prop="workingTime" label="在线时长" :formatter="durationFormat"></el-table-column>
                    <el-table-column prop="serviceCount" label="协助次数"></el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                        @current-change="handleDetailChange"
                        layout="prev, pager, next"
                        :total="detail.total"
                        :page-sizes="[10, 20, 30, 40]"
                        :page-size="detail.pageSize"
                        :current-page="detail.pageNum"
                    ></el-pagination>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        props: {
            width: {
                type: String,
                default: "100%"
            },
            height: {
                type: String,
                default: "100%"
            }
        },
        data() {
            return {
                onlineDetailTitle: '在线详情',
                onlineDetailVisible: false,
                categorys: {
                    "1": "盲人",
                    "2": "亲属",
                    "4": "志愿者",
                    "6": "亲属和志愿者",
                    "8": "客服"
                },
                form: {
                    username:'',
                    category: '',
                    date: {
                        start: null,
                        end: null
                    },
                },
                recent:{
                    loading: false,
                    url:'/travelhelper/admin/private/online/recent',
                    tableData:[],
                    total: 10,
                    pageSize: 10,
                    pageNum: 1
                },
                detail:{
                    loading: false,
                    url:'/travelhelper/admin/private/online/page',
                    tableData:[],
                    total: 10,
                    pageSize: 5,
                    pageNum: 1
                },
                select_cate: "username",
                select_word: "",
                is_search: false,

            };
        },
        created() {
            this.getData();
        },
        computed: {
            recentData() {
                return this.recent.tableData;
            },
            detailData() {
                return this.detail.tableData;
            }
        },
        methods: {
            durationFormat(row, column, val) {
                return this.secondToDate(val);
            },
            getDetail(){
                let url =
                    this.detail.url +
                    "?pageSize=" +
                    this.detail.pageSize +
                    "&pageNum=" +
                    this.detail.pageNum;
                let queryField = this.handleQueryDate();
                queryField["username"] = this.form.username;
                let _this = this;
                this.detail.loading = true;
                this.$axios.post(url + "", queryField).then(res => {
                    this.detail.loading = false;
                    if (!_this.validateCode(res)) {
                        _this.error(res.data.header);
                        return;
                    }
                    _this.detail.tableData = res.data.data.list;
                    _this.detail.total = res.data.data.total;
                });
            },
            dateFormat(date, fmt) {
                if (date) {
                    function padLeftZero(str) {
                        return ("00" + str).substr(str.length);
                    }

                    if (/(y+)/.test(fmt)) {
                        fmt = fmt.replace(
                            RegExp.$1,
                            (date.getFullYear() + "").substr(4 - RegExp.$1.length)
                        );
                    }
                    let o = {
                        "M+": date.getMonth() + 1,
                        "d+": date.getDate(),
                        "h+": date.getHours(),
                        "m+": date.getMinutes(),
                        "s+": date.getSeconds()
                    };
                    for (let k in o) {
                        if (new RegExp(`(${k})`).test(fmt)) {
                            let str = o[k] + "";
                            fmt = fmt.replace(
                                RegExp.$1,
                                RegExp.$1.length === 1 ? str : padLeftZero(str)
                            );
                        }
                    }
                    return fmt;
                }
                return date;
            },
            handleOnlineDetail(index, row) {
                this.onlineDetailVisible = true;
                this.form.username = row.username;
                this.detail.pageNum = 1;
                this.detail.total = 10;
                this.getDetail();
            },
            categoryChange() {
                this.recent.pageNum = 1;
                this.getData();
            },
            secondToDate(msd) {
                var time = msd;
                if (null != time && "" != time) {
                    if (time > 60 && time < 60 * 60) {
                        time =
                            parseInt(time / 60.0) +
                            " 分钟 " +
                            parseInt((parseFloat(time / 60.0) - parseInt(time / 60.0)) * 60) +
                            " 秒 ";
                    } else if (time >= 60 * 60 && time < 60 * 60 * 24) {
                        time =
                            parseInt(time / 3600.0) +
                            " 小时 " +
                            parseInt(
                                (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
                            ) +
                            " 分钟 " +
                            parseInt(
                                (parseFloat(
                                    (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
                                    ) -
                                    parseInt(
                                        (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
                                    )) *
                                60
                            ) +
                            " 秒 ";
                    } else if (time >= 60 * 60 * 24) {
                        time =
                            parseInt(time / 3600.0 / 24) +
                            " 天 " +
                            parseInt(
                                (parseFloat(time / 3600.0 / 24) - parseInt(time / 3600.0 / 24)) *
                                24
                            ) +
                            " 小时 " +
                            parseInt(
                                (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
                            ) +
                            " 分钟 " +
                            parseInt(
                                (parseFloat(
                                    (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
                                    ) -
                                    parseInt(
                                        (parseFloat(time / 3600.0) - parseInt(time / 3600.0)) * 60
                                    )) *
                                60
                            ) +
                            " 秒 ";
                    } else {
                        time = parseInt(time) + " 秒 ";
                    }
                }
                return time;
            },
            categoryFormat(row, column, val) {
                return this.categorys[val];
            },
            durationFormat(row, column, val) {
                return this.secondToDate(val);
            },
            // 分页导航
            handleRecentChange(val) {
                this.recent.pageNum = val;
                this.getData();
            },
            handleDetailChange(val){
                this.detail.pageNum = val;
                this.getDetail();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                let url =
                    this.recent.url +
                    "?pageSize=" +
                    this.recent.pageSize +
                    "&pageNum=" +
                    this.recent.pageNum;
                let queryField = this.handleQueryDate();
                let _this = this;
                this.recent.loading = true;
                this.$axios.post(url + "", queryField).then(res => {
                    this.recent.loading = false;
                    if (!_this.validateCode(res)) {
                        _this.error(res.data.header.resultMsg);
                        return;
                    }
                    _this.recent.tableData = res.data.data.list;
                    _this.recent.total = res.data.data.total;
                });
            },
            search() {
                this.is_search = true;
                this.recent.pageNum = 1;
                this.getData();
            },
            handleQueryDate() {
                let queryField = {};
                switch (this.select_cate) {
                    case "all":
                        queryField = {};
                        break;
                    case "username":
                        queryField = {username: this.select_word};
                        break;
                    default:
                        queryField = {};
                        break;
                }
                queryField["start"] = this.dateFormat(this.form.date.start, "yyyy-MM-dd hh:mm:ss");
                queryField["end"] = this.dateFormat(this.form.date.end, "yyyy-MM-dd hh:mm:ss");
                queryField["category"] = this.form.category;
                return queryField;
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
