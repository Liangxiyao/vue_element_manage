<template>
  <el-pagination class="pagination"
                 @size-change="handleSizeChange"
                 @current-change="handleCurrentChange"
                 :current-page.sync="pagination.pageNum"
                 :page-size="pagination.pageSize"
              
                 background
                 layout="prev, pager, next, jumper"
                 :total="pagination.total">
  </el-pagination>
</template>

<script>
export default {
  props: {
    pagination: {
      pageNum: 1,
      pageSize: 10,
      total: 0
    },
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },

}
</script>

<style lang="scss" scoped>
</style>