<template>
    <div class="table" v-loading="loading">
        <div class="container">
            <div class="handle-box">
                <el-select class="handle-select mr10" v-model="form.to_category" placeholder="接受对象"
                           @change="categoryChange">
                    <el-option key="0" label="全部" value></el-option>
                    <template v-for="(item,index) in categorys">
                        <el-option :key="index" :label="item" :value="index"></el-option>
                    </template>
                </el-select>
                <el-select v-model="select_cate" placeholder="筛选条件" class="handle-select mr10">
                    <el-option key="1" label="视障用户账号" value="fromName"></el-option>
                    <el-option key="2" label="接收帐号" value="toName"></el-option>
                </el-select>
                <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
                <el-date-picker class="handle-date" type="date" placeholder="开始日期"
                                v-model="form.date.start"></el-date-picker>
                <el-date-picker class="handle-date" type="date" placeholder="结束日期"
                                v-model="form.date.end"></el-date-picker>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
            </div>
            <el-table :data="data" border style="width: 100%" ref="multipleTable">
                <el-table-column prop="fromName" label="视障用户账号"></el-table-column>
                <el-table-column prop="toName" label="接收账号"></el-table-column>
                <el-table-column prop="toCategory" label="接收对象" :formatter="categoryFormat"></el-table-column>
                <el-table-column prop="createTime" label="通话时间"></el-table-column>
                <el-table-column prop="duration" label="通话时长" :formatter="durationFormat"></el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    @current-change="handleCurrentChange"
                    layout="prev, pager, next"
                    :total="total"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="pageSize"
                    :current-page="pageNum"
                ></el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                loading: false,
                categorys: {
                    "2": "亲属",
                    "4": "志愿者",
                    "6": "亲属和志愿者",
                    "8": "客服"
                },
                form: {
                    date: {
                        start: null,
                        end: null
                    },
                    to_category: "8"
                },
                selectUrl: "/travelhelper/admin/private/message/page",
                tableData: [],
                total: 10,
                select_cate: "fromName",
                select_word: "",
                is_search: false,
                pageSize: 10,
                pageNum: 1
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
            categoryChange() {
                this.pageNum = 1;
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
                if(!val){
                    return '全部';
                }
                return this.categorys[val];
            },
            meanFormat(row) {
                let mean = parseFloat(row.duration) / row.count;
                return this.durationFormat(null, null, mean);
            },
            durationFormat(row, column, val) {
                return this.secondToDate(val);
            },
            // 分页导航
            handleCurrentChange(val) {
                this.pageNum = val;
                this.getData();
            },
            // 获取 easy-mock 的模拟数据
            getData() {
                let url =
                    this.selectUrl +
                    "?pageSize=" +
                    this.pageSize +
                    "&pageNum=" +
                    this.pageNum;
                let queryField = this.handleQueryDate();
                let _this = this;
                this.loading = true;
                this.$axios.post(url + "", queryField).then(res => {
                    this.loading = false;
                    if (!_this.validateCode(res)) {
                        _this.error(res.data.header.resultMsg);
                        return;
                    }
                    _this.tableData = res.data.data.list;
                    _this.total = res.data.data.total;
                }).catch(error => {
                    this.loading = false;
                });
            },
            search() {
                this.pageNum = 1;
                this.is_search = true;
                this.getData();
            },
            handleQueryDate() {
                let queryField = {};
                switch (this.select_cate) {
                    case "all":
                        queryField = {};
                        break;
                    case "fromName":
                        queryField = {fromName: this.select_word};
                        break;
                    case "toName":
                        queryField = {toName: this.select_word};
                        break;
                    default:
                        queryField = {};
                        break;
                }
                queryField["start"] = this.dateFormat(this.form.date.start, "yyyy-MM-dd hh:mm:ss");
                queryField["end"] = this.dateFormat(this.form.date.end, "yyyy-MM-dd hh:mm:ss");
                queryField["toCategory"] = this.form.to_category;
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
