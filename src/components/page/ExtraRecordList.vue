<template>
  <div class="useRecord">
    <el-table :data="tableData"
              class="mytable"
              border>
      <el-table-column prop="agentCode"
                       label="员工工号">
      </el-table-column>
      <el-table-column prop="awardName"
                       label="活动名称">
      </el-table-column>
      <el-table-column prop="extraAward"
                       label="奖品">
      </el-table-column>
      <el-table-column prop="createTime"
                       label="抽奖时间">
      </el-table-column>

    </el-table>
    <div class="bt">
      <el-button type="primary"
                 @click="exportData">导出数据</el-button>
      <my-pagination :pagination="pagination"
                     @changePage="changePage"></my-pagination>
    </div>
  </div>
</template>

<script>
import MyPagination from '@/components/common/Pagination';
import { apiExtraRecordList, apiExportExtraRecord } from '@/utils/api';

export default {
  components: {
    MyPagination,
  },
  data() {
    return {
      tableData: [],
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
    }
  },

  mounted() {
    this._getLists();
  },
  methods: {
    _getLists() {
      let data = this.pagination
      apiExtraRecordList(data).then((result) => {
        if (result.code === 200) {
          this.tableData = result.rows
        }
      }).catch((err) => {
        console.log(err.message)
      });
    },
    changePage(val) {
      this.pagination.pageNum = val
      this._getAwardList()
    },
    //跳转添加
    exportData() {
     apiExportExtraRecord().then((result) => {
       if(result.code === 200){
         window.location.href = result.msg
       }
     }).catch((err) => {
       console.log(err.message)
     });
    },
  }

}
</script>

<style scoped>
.bt {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 30px;
}
.bt .el-button {
  width: 160px;
  font-size: 14px;
  height: 46px;
  line-height: 20px;
}
.el-pagination {
  margin-top: 5px;
}
</style>