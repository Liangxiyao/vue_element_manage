<template>
  <div class="page-index">
    <el-row :gutter="10"
            class="module1">
      <el-col :span="8">
        <el-card class="box-card"
                 shadow="hover">
          <div slot="header"
               class="clearfix">
            <span>实时抽奖</span>
          </div>
          <div v-for="o in 4"
               :key="o"
               class="card-item">
            <span class="name">今日参与人数</span>
            <span class="number">200</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-card class="box-card module2"
             shadow="hover">
      <div slot="header"
           class="clearfix">
        最近一周参与量统计
      </div>

        <div id="myChart" ref="myChart"
             :style="{width: '100%', height: '360px'}"></div>

    </el-card>
  </div>
</template>

<script>
//import {  } from '@/utils/api';

let echarts = require('echarts/lib/echarts')
require('echarts/lib/chart/line')


export default {
  data() {
    return {
      dataItem: [
        {
          title: '实时抽奖',
          content: []
        }
      ]
    }
  },
  mounted () {
    this.drawLine();

  },
  methods: {
    drawLine() {
      //初始化echarts实例
      let myChart = echarts.init(this.$refs.myChart);
      // 绘制图表
      myChart.setOption({
        xAxis: {
          data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        },
        yAxis: {
          type:'value',
          name:'人数',
        },
        axisLabel:{
          color:'#666'
        },
        series: [{
          type: 'line',
          data: [150, 20, 300, 100, 210, 120, 100],
          itemStyle:{
            color:'#409EFF'
          },
          label:{
            show:true
          }
        }]
      });
    }
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
.module2 >>> .el-card__body{
  max-width:800px;
}
</style>