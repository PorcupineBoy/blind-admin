<template>
    <div class="table" v-loading="loading">
        <div class="container">
            <div class="handle-box">
                <!-- <el-select v-model="select_cate" placeholder="筛选条件" class="handle-select mr10">
                  <template v-for="(item,index) in headers">
                    <el-option :key="index" :label="item" :value="index"></el-option>
                  </template>
                </el-select>-->
                <el-date-picker
                    class="handle-date"
                    type="date"
                    placeholder="开始日期"
                    v-model="form.date.start"
                ></el-date-picker>
                <el-date-picker class="handle-date" type="date" placeholder="结束日期"
                                v-model="form.date.end"></el-date-picker>
                <el-button type="primary" icon="search" @click="search">搜索</el-button>
                <el-row class="row">
                    <el-radio-group @change="changType" v-model="form.type">
                        <el-radio label="表格"></el-radio>
                        <el-radio label="图表"></el-radio>
                    </el-radio-group>
                </el-row>
            </div>
            <div v-show="is_chart">
                <div class="chart" :style="{height: height,width: width}" ref="multipleTable"></div>
            </div>
            <div v-show="is_table">
                <el-table :data="tableData" border style="width: 100%" ref="multipleTable">
                    <el-table-column prop="header" label="时间"></el-table-column>
                    <template v-for="(item,index) in constants">
                        <el-table-column :key="index" :prop="index" :label="item"></el-table-column>
                    </template>
                </el-table>
            </div>
        </div>
    </div>
</template>

<script>
    import echarts from "echarts";
    import "echarts/theme/macarons";

    export default {
        props: {
            width: {
                type: String,
                default: "100%"
            },
            height: {
                type: String,
                default: "380px"
            },
            autoResize: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                loading: false,
                durationCountUrl: "/travelhelper/admin/private/statistics/stageCount",
                is_search: false,
                is_chart: true,
                is_table: false,
                is_first: true,
                chart: null,
                originData: null,
                chartData: {
                    title: {
                        text: '各个时段统计',
                        subtext: ''
                    },
                    header: [],
                    series: []
                },
                tableData: null,
                headers: ["时", "日", "月", "年"],
                legend: [],
                constants: {
                    call: "拨打次数",
                    success: "成功次数",
                    fail: "失败次数",
                    customer: "客服接听次数",
                    online: "在线客服"
                },
                select_cate: 0,
                form: {
                    date: {
                        start: null,
                        end: null
                    },
                    type: "表格"
                }
            };
        },
        created() {
        },
        mounted() {
            this.init();
            this.is_chart = false;
            this.is_table = true;
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
            loadLegend() {
                for (let i in this.constants) {
                    this.legend.push(this.constants[i]);
                }
            },
            init() {
                window.start = this.start;
                this.chart = echarts.init(this.$el.querySelector(".chart"));
                this.getData();
                this.loadLegend();
            },
            getData() {
                this.chart.clear();
                this.tableData = null;
                this.chartData = {
                    title:{
                        text: '各个时段统计',
                        subtext: ''
                    },
                    header: [],
                    series: []
                };
                let queryField = this.handleQueryDate();
                let _this = this;
                this.loading = true;
                this.$axios.post(this.durationCountUrl, queryField).then(res => {
                    this.loading = false;
                    if (!_this.validateCode(res)) {
                        _this.error(res.data.header.resultMsg);
                        return;
                    }
                    this.originData = res.data.data;
                    if (this.originData && this.originData.length > 0) {
                        let count = {};
                        for(let i in this.constants){
                            count[i] = []
                        }
                        if(!this.is_first){
                            this.chartData.title.text =  '各个时段统计(' + this.dateFormat(this.form.date.start,'yyyy-MM-dd') + ' ~ ' + this.dateFormat(this.form.date.end,'yyyy-MM-dd') + ')';
                        }
                        this.originData.forEach((v, i) => {
                            if(_this.is_first || !this.form.date.start){
                                _this.chartData.title.text = '各个时段统计(' + this.dateFormat(new Date(v.start),'yyyy-MM-dd') + " ~ " + this.dateFormat(new Date(v.end),'yyyy-MM-dd') + ')';
                                this.is_first = false;
                            }
                            v.header = v.header + " " + _this.headers[_this.select_cate];
                            _this.chartData.header.push(v.header);
                            for(let ii in this.constants){
                                count[ii].push(v[ii]);
                            }
                        });
                        for(let i in count){
                            this.chartData.series.push({
                                name: this.constants[i],
                                type: "line",
                                smooth: true,
                                data: count[i]
                            });
                        }
                    }
                    this.loadTable();
                });
            },
            loadTable() {
                if (this.is_chart) {
                    this.setChartOptions(this.chartData);
                } else {
                    this.tableData = this.originData;
                }
            },
            handleQueryDate() {
                let queryField = {
                    header: this.select_cate,
                    start: this.dateFormat(this.form.date.start, "yyyy-MM-dd hh:mm:ss"),
                    end: this.dateFormat(this.form.date.end, "yyyy-MM-dd hh:mm:ss")
                };
                return queryField;
            },
            changType(valType) {
                this.is_chart = !this.is_chart;
                this.is_table = !this.is_table;
                this.loadTable();
            },
            search() {
                this.is_search = true;
                this.getData();
            },
            setChartOptions(data) {
                var option = {
                    title: {
                        text: this.chartData.title.text,
                        subtext: this.chartData.title.subtext
                    },
                    tooltip: {
                        trigger: "axis"
                    },
                    legend: {
                        top: '7%',
                        data: this.legend
                    },
                    grid: {
                        left: "3%",
                        right: "4%",
                        bottom: "3%",
                        containLabel: true
                    },
                    xAxis: {
                        type: "category",
                        boundaryGap: false,
                        data: data.header
                    },
                    yAxis: {
                        type: "value"
                    },
                    series: data.series
                };
                this.chart.setOption(option, true, true);
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

    .handle-date {
        width: 130px;
        cursor: pointer;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .del-dialog-cnt {
        font-size: 16px;
        text-align: center;
    }

    .row {
        left: 5px;
        top: 10px;
    }
</style>
