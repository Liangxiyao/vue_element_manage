<template>
  <el-pagination class="pagination"
                
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
    handleCurrentChange(val) {
      this.$emit("changePage",val)
    },
  },

}
</script>

<style lang="scss" scoped>
</style>