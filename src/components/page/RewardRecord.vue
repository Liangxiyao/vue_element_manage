<template>
  <div class="record">
    <div class="options-box">
      <div class="select">
        <el-select v-model="query.awardId"
                   placeholder="选择活动名称"
                   class="handle-select  awardName mr20"
                   ref="awardName">
          <template v-for="(item,i) in nameOptions">
            <el-option :key="i"
                       :label="item.awardName"
                       :value="item.awardId"></el-option>
          </template>
        </el-select>
        <el-select v-model="query.queryType"
                   placeholder="选择查看顺序"
                   class="handle-select">
          <template v-for="(item,i) in options">
            <el-option :key="i"
                       :label="item.label"
                       :value="item.value"></el-option>
          </template>
        </el-select>
      </div>
      <el-date-picker v-if="query.queryType == 1"
                      v-model="query.createTime"
                      type="date"
                      placeholder="选择日期"
                      value-format="yyyy-MM-dd"
                      class="handle-input mr20"
                      :picker-options="choosePickerOptions">
      </el-date-picker>
      <el-input v-if="query.queryType == 2"
                v-model="query.agentCode"
                placeholder="输入员工工号"
                class="handle-input mr20"></el-input>
      <el-button type="primary"
                 @click="handleSearch">搜索</el-button>
      <!-- <el-button type="info"
                 plain
                 @click="handlerReset">重置</el-button> -->
      <div class="errTip">{{errTip}}</div>
    </div>
    <el-table :data="tableData"
              class="mytable"
              border
              style="width: 100%">
      <el-table-column label="编号"
                       width="80">
        <template v-slot="scope">
          <span>{{scope.$index+(pagination.pageNum - 1) * pagination.pageSize + 1}} </span>
        </template>
      </el-table-column>
      <el-table-column prop="awardName"
                       label="活动名称">
      </el-table-column>
      <el-table-column prop="agentCode"
                       label="员工工号">
      </el-table-column>
      <template v-if="query.queryType == 3 || query.queryType == 4">
        <el-table-column prop="vigourTotal"
                         label="活力红包">
        </el-table-column>
        <el-table-column prop="standardTotal"
                         label="达星红包">
        </el-table-column>
      </template>
      <template v-else>
        <el-table-column prop="vigourAmount"
                         label="活力红包">
        </el-table-column>
        <el-table-column prop="standardAmount"
                         label="达星红包">
        </el-table-column>
      </template>
      <el-table-column prop="createTime"
                       label="日期">
      </el-table-column>
    </el-table>
    <my-pagination :pagination="pagination"
                   @changePage="changePage"></my-pagination>
  </div>
</template>

<script>
import { apiRecordList, apiAwardsInfo } from '@/utils/api';
import MyPagination from '@/components/common/Pagination';
import {getDate} from '@/utils/base.js';
export default {
  components: {
    MyPagination,
  },
  data() {
    return {
      options: [{
        value: '1',
        label: '日期'
      }, {
        value: '2',
        label: '员工工号'
      }, {
        value: '3',
        label: '活力红包'
      }, {
        value: '4',
        label: '达星红包'
      }],
      nameOptions: [{
        awardId: '',
        awardName: ''
      }],
      query: {
        awardId: '',
        queryType: "1",
        agentCode: '',
        createTime: ''
      },
      tableData: [],
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
      optionalDate: {},
      errTip: '',
      choosePickerOptions: {
        disabledDate: (time) => {
          let date = time.getTime()
          let { beginDate, endDate } = this.optionalDate
          let start = new Date(beginDate).getTime()
          let end = new Date(endDate).getTime()
          return date < start || date > end
        }
      }
    }
  },
  mounted() {
    this._getAwardsInfo()
  },
  methods: {
    //获取活动名称
    _getAwardsInfo() {
      apiAwardsInfo().then((result) => {
        if (result.code === 200) {
          this.nameOptions = result.data
          //默认的活动名称
          let { awardId, beginDate, endDate } = result.data[0]
          this.query.awardId = awardId
          this.optionalDate = {
            beginDate,
            endDate
          }
          this._getRecordList()
        }
      }).catch((err) => {
        console.log(err.message)
      });
    },
    //列表数据
    _getRecordList() {
      let data = Object.assign(this.query, this.pagination)
      delete data.total
      apiRecordList(data).then((result) => {
        if (result.code === 200) {
          let { total, rows } = result
          this.pagination.total = total
          this.tableData = rows.map(item=>{

            item.createTime = getDate(item.createTime)
            return item
          })
          console.log(this.tableData)
        }
      }).catch((err) => {
        console.log(err.message)
      });
    },
    handleSearch() {
      let { awardId } = this.query
      if (awardId == '') {
        this.errTip = '请选择活动名称';
        this.$refs.awardName.focus();
        return;
      }
      this._getRecordList()
    },
    changePage(val) {
      this.pagination.pageNum = val
      this._getRecordList()
    },
    handlerReset() {
      this.query = {
        awardId: this.nameOptions[0].awardId,
        queryType: "1",
        agentCode: '',
        createTime: ''
      }
      this.pagination.pageNum = 1
      this._getRecordList()
    }
  }
}
</script>

<style scoped>
.options-box {
  position: relative;
  margin-bottom: 20px;
}
.select {
  display: inline-block;
  font-size: 14px;
  margin-right: 40px;
}
.handle-select {
  width: 140px;
}
.handle-input {
  width: 200px;
  display: inline-block;
}
.errTip {
  position: absolute;
  bottom: -15px;
  left: 5px;
  width: 200px;
  font-size: 12px;
  color: #f56c6c;
}
.mr20 {
  margin-right: 20px;
}
.pagination {
  margin: 30px auto;
}
</style>