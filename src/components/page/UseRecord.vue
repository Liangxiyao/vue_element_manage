<template>
  <div class="useRecord">
    <el-table :data="tableData"
              class="mytable"
              border
              style="width: 100%">
      <el-table-column prop="date"
                       label="操作日期"
                       width="120">
      </el-table-column>
      <el-table-column prop="id"
                       label="账号ID"
                       width="160">
      </el-table-column>
      <el-table-column prop="name"
                       label="姓名"
                       width="160">
      </el-table-column>
      <el-table-column prop="info"
                       label="操作">
      </el-table-column>
    </el-table>
    <my-pagination :pagination="pagination"></my-pagination>
  </div>
</template>

<script>
import MyPagination from '@/components/common/Pagination';
export default {
  components: {
    MyPagination,
  },
  data() {
    return {
      tableData: [{
        date: '2010.02.02',
        id: '1525356521',
        name: '张三',
        info: '红包追加操作'
      }],
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 0,
      },
    }
  },


  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },

}
</script>

<style scoped>
</style>