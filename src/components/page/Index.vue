<template>
  <div class="page-index">
    <el-row :gutter="10" class="module1">
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>实时抽奖</span>
          </div>
          <div class="card-item">
            <span class="name">今日参与人数</span>
            <span class="number">{{ dataItem.dayNumber }}</span>
          </div>
          <div class="card-item">
            <span class="name">今日抽奖金额</span>
            <span class="number">{{ dataItem.dayAmount }}</span>
          </div>
          <div class="card-item">
            <span class="name">本周参与人数</span>
            <span class="number">{{ dataItem.weekNumber }}</span>
          </div>
          <div class="card-item">
            <span class="name">本周抽奖金额</span>
            <span class="number">{{ dataItem.weekAmount }}</span>
          </div>
          <div class="card-item">
            <span class="name">本月参与人数</span>
            <span class="number">{{ dataItem.monthNumber }}</span>
          </div>
          <div class="card-item">
            <span class="name">本月抽奖金额</span>
            <span class="number">{{ dataItem.monthAmount }}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>平均类</span>
          </div>
          <div class="card-item">
            <span class="name">平均今日获得活力红包金额</span>
            <span class="number">{{ dataItem.dayVigourAverage }}</span>
          </div>
          <div class="card-item">
            <span class="name">达星红包金额</span>
            <span class="number">{{ dataItem.dayStandardAverage }}</span>
          </div>
          <div class="card-item">
            <span class="name">平均本周获得活力红包金额</span>
            <span class="number">{{ dataItem.weekVigourAverage }}</span>
          </div>
          <div class="card-item">
            <span class="name">达星红包金额</span>
            <span class="number">{{ dataItem.weekStandardAverage }}</span>
          </div>
          <div class="card-item">
            <span class="name">平均本月获得活力红包金额</span>
            <span class="number">{{ dataItem.monthVigourAverage }}</span>
          </div>
          <div class="card-item">
            <span class="name">达星红包金额</span>
            <span class="number">{{ dataItem.monthStandardAverage }}</span>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card" shadow="hover">
          <div slot="header" class="clearfix">
            <span>剩余库存</span>
          </div>
          <div class="card-item">
            <span class="name">剩余金额</span>
            <span class="number">{{ dataItem.leftAmount }}</span>
          </div>
          <div class="card-item">
            <span class="name">预计剩余可参与人数</span>
            <span class="number">{{ dataItem.leftNumber }}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card class="box-card module2" shadow="hover">
      <div slot="header" class="clearfix">最近7天参与量统计</div>
      <div
        id="myChart"
        ref="myChart"
        :style="{ width: '100%', height: '360px' }"
      ></div>
    </el-card>
  </div>
</template>

<script>
import { apiIndexInfo } from '@/utils/api'

let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')

export default {
  data() {
    return {
      dataItem: {},
    }
  },
  mounted() {
    this._getData()
  },
  methods: {
    _getData() {
      apiIndexInfo()
        .then((result) => {
          this.dataItem = result.data
          this.drawLine()
        })
        .catch((err) => {
          console.log(err.message)
        })
    },
    drawLine() {
      let sevenDayMap = this.dataItem.sevenDayMap.reverse()
      let xData = sevenDayMap.map((item) => item.date)
      let yData = sevenDayMap.map((item) => item.count)
      //初始化echarts实例
      let myChart = echarts.init(this.$refs.myChart)
      // 绘制图表
      myChart.setOption({
        xAxis: {
          data: xData,
        },
        yAxis: {
          type: 'value',
          name: '人数',
        },
        axisLabel: {
          color: '#666',
        },
        series: [
          {
            type: 'line',
            data: yData,
            itemStyle: {
              color: '#409EFF',
            },
            label: {
              show: true,
            },
          },
        ],
      })
    },
  },
}
</script>

<style scoped>
.box-card >>> .el-card__header {
  padding: 15px 20px 0;
  border-bottom: none;
  font-size: 18px;
  font-weight: 600;
}
.box-card >>> .card-item {
  display: flex;
  line-height: 25px;
  font-size: 14px;
}
.box-card >>> .card-item:nth-of-type(2n) {
  margin-bottom: 30px;
}
.box-card .name {
  flex: 1;
}
.box-card .number {
  text-align: left;
  width: 30%;
  margin-left: 10%;
}
.module2 {
  margin-top: 10px;
}
.module2 >>> .el-card__body {
  max-width: 800px;
}
</style>
