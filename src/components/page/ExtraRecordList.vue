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
    <div class="bt"
         v-if="tableData.length">
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
      awardId: 0,
      tableData: [],
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
    }
  },
  activated() {
    this.awardId = this.$route.query.id
    this._getLists()
  },
  methods: {
    _getLists() {
      apiExtraRecordList({
        awardId: this.awardId,
        ...this.pagination
      }).then((result) => {
        this.tableData = result.rows
      }).catch((err) => {
        console.log(err.message)
      });
    },
    changePage(val) {
      this.pagination.pageNum = val
      this._getAwardList()
    },
    //导出数据
    exportData() {
      this.$confirm('确定要导出中奖名单吗？', '', {
        center: true,
        customClass: 'stopDialog'
      }).then(() => {
        apiExportExtraRecord().then((result) => {
          this.$message.success('导出成功')
          console.log(result)
          // window.location.href = result.msg
        }).catch((err) => {
          console.log(err.message)
        });
      })

    },
  }

}
</script>

<style scoped>
@import url(~assets/css/table.css);
</style>