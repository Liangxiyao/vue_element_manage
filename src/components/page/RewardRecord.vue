<template>
  <div class="record">
    <div class="options-box">
      <div class="select">
        <el-select v-model="query.name"
                   placeholder="选择活动名称"
                   class="handle-select mr20">
          <template v-for="(item,i) in nameOptions">
            <el-option :key="i"
                       :label="item.label"
                       :value="item.value"></el-option>
          </template>
        </el-select>
        <el-select v-model="query.curOption"
                   placeholder="选择查看顺序"
                   class="handle-select ">
          <template v-for="(item,i) in options">
            <el-option :key="i"
                       :label="item.label"
                       :value="item.value"></el-option>
          </template>
        </el-select>
      </div>
      <el-date-picker v-if="query.curOption == 1"
                      v-model="query.date"
                      type="date"
                      placeholder="选择日期"
                      class="handle-input mr20">
      </el-date-picker>
      <el-input v-if="query.curOption == 2"
                v-model="query.num"
                placeholder="输入员工工号"
                class="handle-input mr20"></el-input>
      <el-button v-if="query.curOption == 1 || query.curOption == 2"
                 type="primary"
                 icon="el-icon-search"
                 @click="handleSearch">搜索</el-button>
    </div>
    <el-table :data="tableData"
              class="mytable"
              border
              style="width: 100%">
      <el-table-column type="index"
                       label="编号"
                       width="80">
      </el-table-column>
      <el-table-column prop="name"
                       label="活动名称">
      </el-table-column>
      <el-table-column prop="agentCode"
                       label="员工工号">
      </el-table-column>
      <el-table-column prop="vigourAmount"
                       label="活力红包">
      </el-table-column>
      <el-table-column prop="standardAmount"
                       label="达星红包">
      </el-table-column>
      <el-table-column prop="createTime"
                       label="日期">
      </el-table-column>
    </el-table>
    <my-pagination :pagination="pagination"></my-pagination>
  </div>
</template>

<script>
import { apiRecordList } from '@/utils/api';
import MyPagination from '@/components/common/Pagination';

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
      nameOptions: [],
      query: {
        name: '',
        curOption:"1",
        num: '',
        date: ''
      },
      tableData: [{
        name: '激励红包',
        createTime: '2016.1.1 12:20:20',
        agentCode: '001',
        vigourAmount: '100',
        standardAmount: '200'
      }],
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      }
    }
  },
  mounted() {
    this._getList();
  },
  methods: {
    _getList() {
      let { pageNum, pageSize } = this.pagination
      apiRecordList({
        pageNum,
        pageSize,
      }).then((result) => {
        if (result.code === 200) {
          let { total, rows } = result
          this.pagination.total = total
          this.tableData = rows
          //活动名称
          this.nameOptions = rows.map((item, index) => {
            return {
              label: item.name,
              value: index
            }
          })
        }
      }).catch((err) => {
        console.log(err.message)
      });

    },
    //搜索
    handleSearch() {

    }
  }
}
</script>

<style scoped>
.options-box {
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
.mr20 {
  margin-right: 20px;
}
.pagination {
  margin: 30px auto;
}
</style>