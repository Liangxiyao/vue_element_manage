<template>
  <div class="useRecord">
    <el-table :data="tableData"
              class="mytable"
              border>
      <el-table-column prop="operTime"
                       label="操作日期"
                       width="200">
      </el-table-column>
      <el-table-column prop="userName"
                       label="账号ID"
                       width="160">
      </el-table-column>
      <el-table-column prop="nickName"
                       label="姓名"
                       width="180">
      </el-table-column>
      <el-table-column prop="operContent"
                       label="操作"> </el-table-column>
    </el-table>
    <my-pagination :pagination="pagination"
                   @changePage="changePage"></my-pagination>
  </div>
</template>

<script>
import MyPagination from '@/components/common/Pagination'
import { apiLogList } from '@/utils/api'

export default {
  components: {
    MyPagination,
  },
  data() {
    return {
      tableData: [
        {
          operTime: '2010.02.02',
          userName: '1525356521',
          nickName: '张三',
          operContent: '红包追加操作',
        },
      ],
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
    }
  },

  mounted() {
    this._getLogs()
  },
  methods: {
    _getLogs() {
      let data = this.pagination
      apiLogList(data).then((result) => {
        let { total, rows } = result
        this.pagination.total = total
        this.tableData = rows
      }).catch((err) => {
        console.log(err.message)
      })
    },
    changePage(val) {
      this.pagination.pageNum = val
      this._getLogs()
    },
  },
}
</script>

<style scoped></style>
