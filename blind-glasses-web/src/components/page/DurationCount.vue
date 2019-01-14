<template>
  <div class="table">
    <div class="container">
      <div class="handle-box">
        <el-select v-model="select_cate" placeholder="筛选条件" class="handle-select mr10">
          <template v-for="(item,index) in headers">
            <el-option :key="index" :label="item" :value="index"></el-option>
          </template>
        </el-select>
        <el-date-picker
          class="handle-date"
          type="date"
          placeholder="开始日期"
          v-model="form.date.start"
        ></el-date-picker>
        <el-date-picker class="handle-date" type="date" placeholder="结束日期" v-model="form.date.end"></el-date-picker>
        <el-button type="primary" icon="search" @click="search">搜索</el-button>
        <el-row class="row">
          <el-radio-group @change="changType" v-model="form.type">
            <el-radio label="图表"></el-radio>
            <el-radio label="表格"></el-radio>
          </el-radio-group>
        </el-row>
      </div>
      <div v-show="is_chart">
        <div class="chart" :style="{height: height,width: width}"></div>
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
      durationCountUrl: "/travelhelper/admin/private/statistics/duration/count",
      is_search: false,
      is_chart: true,
      is_table: false,
      chart: null,
      originData: null,
      headers: ["时", "日", "月", "年"],
      legend: [],
      constants: {
        blind: "盲人",
        relatives: "亲属",
        volunteer: "志愿者",
        relativesAndVolunteer: "亲属和志愿者",
        customer: "客服"
      },
      tableData: null,
      select_cate: 0,
      form: {
        date: {
          start: null,
          end: null
        },
        type: "图表"
      }
    };
  },
  created() {},
  mounted() {
    this.init();
  },
  computed: {
    data() {
      return this.countData;
    }
  },
  beforeDestroy() {
    this.chart && this.autoResize
      ? window.removeEventListener("resize", this.chartResizeHandle)
      : null;

    const sidebarElm = document.getElementsByClassName("el-aside")[0];
    sidebarElm
      ? sidebarElm.removeEventListener("transitionend", this.chartResizeHandle)
      : null;
    this.chart.dispose();
    this.chart = null;
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setChartOptions(val);
      }
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
      let queryField = this.handleQueryDate();
      let _this = this;
      this.$axios.post(this.durationCountUrl, queryField).then(res => {
        if (!_this.validateCode(res)) {
          _this.error(res.data.header.resultMsg);
          return;
        }
        this.originData = res.data.data;
        this.originData.header.forEach((v, i) => {
          _this.originData.header[i] =
            v + " " + _this.headers[_this.select_cate];
        });
        this.loadTable();
      });
    },
    loadTable() {
      if (this.is_chart) {
        this.setChartOptions(this.originData);
      } else {
        var data = [];
        for (var i = 0; i < this.originData.header.length; i++) {
          var row = {
            header: this.originData.header[i]
          };
          for (var j in this.constants) {
            row[j] = this.originData[j][i];
          }
          data.push(row);
        }
        this.tableData = data;
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
          text: "使用统计"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: this.legend
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {},
            magicType: { type: ["line", "bar"] },
            restore: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: data.header
        },
        yAxis: {
          type: "value"
        },
        series: []
      };
      for (var i in this.constants) {
        option.series.push({
          name: this.constants[i],
          type: "line",
          smooth: true,
          data: data[i]
        });
      }
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